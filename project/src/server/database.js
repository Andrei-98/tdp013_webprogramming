const url = 'mongodb://localhost:27017'
const coll = 'users';


function startDbConn(callback) {
  const MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, (err, db) => {
    if (err) {
      throw err;
    }
    dbm = db.db("tdp013");
    callback();
  });
}


/* for testing */
function closeDb() {
  return dbm.s.client.close();
}


function dropColl() {
  return dbm.collection(coll).drop();
}


function add_user(user) {
  return dbm.collection(coll).insertOne(user);
}


function sign_in(user) {
  return dbm.collection(coll).findOne(
    {
      "username": user.username,
      "password": user.password
    });
}


function send_friend_request(sender, target) {
  return dbm.collection(coll).updateOne(
    { "username": sender },
    {
      $push: { "sent_req": target }
    })
    .then(dbm.collection(coll).updateOne(
      { "username": target },
      {
        $push: { "received_req": sender }
      }))
}


function accept_friend(sender, target) {
  return dbm.collection(coll).updateOne({ "username": sender },
                                        { $pull: { "sent_req": target } })

    .then(dbm.collection(coll).updateOne({ "username": target },
                                        { $pull: { "received_req": sender }}))

    .then(dbm.collection(coll).updateOne({ "username": sender },
                                        { $push: { "friends": target }}))
                                        
    .then(dbm.collection(coll).updateOne({ "username": target },
                                        { $push: { "friends": sender }}))
}


/* can only send messages to oneself or friends */
function insert_message(message, user) {
  return dbm.collection(coll).updateOne({ "username": user },
    {
      $push: {
        "messages": {
          $each: [message],
          $position: 0
        }
      }
    });
}


/* access users in different ways */
function get_user(user) {
  return dbm.collection(coll).find(
    { username: { $regex: user, $options: 'i' } }).toArray();
}


function user_exist(user) {
  return dbm.collection(coll).find({ username: user }).toArray();
}


function find_user(user) {
  return dbm.collection(coll).findOne(user);
}


function find_all() {
  return dbm.collection(coll).find({}).toArray();
}


/* dealing with friend request and friend accept  */
function before_sending_request(sender, receiver) {
  return dbm.collection(coll).find(
    {
      username: { $in: [sender, receiver] },
      friends: { $nin: [sender, receiver] },
      received_req: { $nin: [sender, receiver] },
      sent_req: { $nin: [sender, receiver] }
    }).toArray();
}


function before_accepting_request(sender, receiver) {
  return dbm.collection(coll).find(
    {
      username: { $in: [sender, receiver] },
      friends: { $nin: [sender, receiver] },
      $or: [{ received_req: { $in: [sender, receiver] } },
      { sent_req: { $in: [sender, receiver] } }]
    }).toArray();
}


function is_friends(user1, user2) {
  return dbm.collection(coll).find(
    {
      username: { $in: [user2] },
      $or: [{ friends: { $in: [user1, user2] } },
      { username: user1 }]
    }).toArray();
}


module.exports =
{
  startDbConn, closeDb, dropColl, insert_message, user_exist, find_all,
  before_sending_request, is_friends, find_user, sign_in, send_friend_request,
  accept_friend, get_user, add_user, before_accepting_request
};
const url = "mongodb://localhost:27017"
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

async function dropColl() {
  return dbm.collection(coll).drop();
}

/* used in POST /register */
function add_user(user) {
  return dbm.collection(coll).insertOne(user);
}

/* used in POST /login */
function sign_in(user) {
  return dbm.collection(coll).findOne({ "username": user.username, "password": user.password });
}

/* used in POST /find */
function send_friend_request(sender, target) {
  return dbm.collection(coll).updateOne({ "username": sender }, { $push: { "sent_req": target } })
  .then (dbm.collection(coll).updateOne({ "username": target }, { $push: { "received_req": sender } }))
}

/* used in PUT for /find */
function accept_friend(sender, target) {
  return dbm.collection(coll).updateOne({ "username": sender }, { $pull: { "sent_req": target } })
  .then (dbm.collection(coll).updateOne({ "username": target }, { $pull: { "received_req": sender } }))
  .then (dbm.collection(coll).updateOne({ "username": sender }, { $push: { "friends": target } }))
  .then (dbm.collection(coll).updateOne({ "username": target }, { $push: { "friends": sender } }))
}

/* used in Post /profile */
async function insert_message(message, user) {
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
  return dbm.collection(coll).find({username : {$regex : user, $options: 'i' }}).toArray(); 
}

function before_register(user) {
  return dbm.collection(coll).find({username : user}).toArray(); 
}

function find_user(user) {
  return dbm.collection(coll).findOne(user);
}

function find_all() {
  return dbm.collection(coll).find({}).toArray();
}


module.exports = {
  startDbConn, closeDb, dropColl, insert_message, before_register, find_all,  
  find_user, sign_in, send_friend_request, accept_friend, get_user, add_user
};
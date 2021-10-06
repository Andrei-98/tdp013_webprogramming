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


function closeDb() {
  dbm.s.client.close();
}


async function dropColl() {
  return dbm.collection(coll).drop();
}


async function insert_message(message, user) {
  dbm.collection(coll).updateOne({ "username": user }, { $push: { "messages": message } });
}

function add_user(user) {
  dbm.collection(coll).insertOne(user);
}

function sign_in(user) {
  return dbm.collection(coll).findOne({ "username": user.username, "password": user.password });
}

function get_users(user) {
  return dbm.collection(coll).find({username : {$regex : user, $options: 'i' }}).toArray(); 
}

function find_user(username) {
  return dbm.collection(coll).findOne({ "username": username });
}

function send_friend_request(sender, target) {
  dbm.collection(coll).updateOne({ "username": sender }, { $push: { "sent_req": target } });
  dbm.collection(coll).updateOne({ "username": target }, { $push: { "received_req": sender } });
}

function accept_friend(sender, target) {
  dbm.collection(coll).updateOne({ "username": sender }, { $pull: { "sent_req": target } });
  dbm.collection(coll).updateOne({ "username": target }, { $pull: { "received_req": sender } });
  dbm.collection(coll).updateOne({ "username": sender }, { $push: { "friends": target } });
  dbm.collection(coll).updateOne({ "username": target }, { $push: { "friends": sender } });
}

//uses projection to remove inbuilt id from mongodb
async function find_message(query) {
  return dbm.collection(coll).findOne(query, { projection: { _id: 0 } });
}


async function update_message(query, newChange) {
  return dbm.collection(coll).updateOne(query, { $set: newChange });
}


// returns array, uses projection to remove inbuilt id from mongodb
async function find_all() {
  return dbm.collection(coll).find({}, { projection: { _id: 0 } }).toArray();
}


module.exports = {
  startDbConn, closeDb, dropColl, insert_message, find_message,
  update_message, find_all, add_user, find_user, sign_in, send_friend_request, accept_friend, get_users
};
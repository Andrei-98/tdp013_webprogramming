const url = "mongodb://localhost:27017"
const coll = 'messages';


function startDbConn(callback)
{
  const MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, (err, db) => {
    if(err) {
      throw err;
    }
    dbm = db.db("tdp013");
    callback();
  });
}


function closeDb()
{
  return dbm.s.client.close();
}


async function dropColl()
{
  return dbm.collection(coll).drop();
}


function insert_message(message) 
{
  return dbm.collection(coll).insertOne(message);
}
 

//uses projection to remove inbuilt id from mongodb
async function find_message(query) 
{
  return dbm.collection(coll).findOne(query, {projection:{_id:0}});
}


async function update_message(query, newChange) 
{
  return dbm.collection(coll).updateOne(query, {$set: newChange});
}


// returns array, uses projection to remove inbuilt id from mongodb
async function find_all() 
{
  return dbm.collection(coll).find({}, {projection:{_id:0}}).toArray();
}


module.exports = {startDbConn, closeDb, dropColl, insert_message, find_message, update_message, find_all};
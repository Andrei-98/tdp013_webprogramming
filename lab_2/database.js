
let dbm;
const url = "mongodb://localhost:27017"

function startDbConn(callback)
{
  const MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, (err, db) => {
    if(err) {
      return console.log(err);
    }
    dbm = db.db("tdp013");
    callback();
  });
}

function getDb() 
{
  return dbm;
}

function closeDb()
{
  dbm.close();
}

function dropColl()
{
  dbm.collection("messages").drop( (err, delok ) => {
      if (err)
      {
          console.log(err);
      }
      if (delok)
      {
          console.log("Collection deleted");
      }
  } )
}

function get_message(id)
{
  let query = {"id" : id};
  dbm.collection("messages").findOne(query, (err, res) => {
    if (err) 
    {
      return console.log(err);
    }
    return res;
  })
}

module.exports = {startDbConn, getDb, closeDb, dropColl, get_message};
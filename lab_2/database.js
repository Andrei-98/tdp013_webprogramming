
//let dbm;
const url = "mongodb://localhost:27017"

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


function getDb() 
{
  return dbm;
}

function closeDb()
{
  dbm.s.client.close();
}


// delete all entries in the "messages" collection
function dropColl()
{
  dbm.collection("messages").drop( (err, delok ) => {
      if (err)
      {
          throw err
      }
      if (delok)
      {
          console.log("Collection deleted");
      }
  } )
}


module.exports = {startDbConn, getDb, closeDb, dropColl};
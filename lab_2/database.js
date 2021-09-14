
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
    return dbm;
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

module.exports = {startDbConn, getDb, closeDb, dropColl};
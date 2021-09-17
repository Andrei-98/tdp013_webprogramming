
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

// async function get_message(query)
// {
//   let result = await dbm.collection("messages").findOne(query,{projection:{_id:0}}, async (err, res) => {
//     if (err) 
//     {
//       throw err;
//     }

//     return res;
//   })

//   return result;
// }


module.exports = {startDbConn, getDb, closeDb, dropColl};
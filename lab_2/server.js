const express = require('express');
const app = express();
app.use(express.static(__dirname), express.json());
const PORT = 9000;

const databaseHandler = require("./database.js");

//start database by typing in mongo

let db;

databaseHandler.startDbConn(() => {
  app.listen(PORT, () => {
    console.log('listening on ' + PORT);
  });
  db = databaseHandler.getDb();
});


app.post("/messages", (req, rsp) => {
  const id = req.body.id;
  const content = req.body.content;
  const isRead = req.body.isRead;
 
  let message = {"id" : id, "content" : content, "isRead" : isRead}; 
  db.collection('messages').insertOne(message, (err, result) => {
  if (err) {
    return console.log(err);
  }
  rsp.sendStatus(200);
})
});

app.put(/messages\/\d+/, (req,rsp) => {
    const message_id = Number(req.url.split("/").slice(-1).pop());
    const query = {"id" : message_id};
    const new_value = {$set: {"isRead" : true} };
    db.collection('messages').updateOne(query, new_value, (err, result) => {
      if (err) {
        return console.log(err);
      }
      rsp.sendStatus(200);
  })
});


app.get("/messages", (req, rsp) => {
  db.collection('messages').find({}).toArray((err, result) => {
    if (err) {
      return console.log(err);
    }
    rsp.json(result);
  }) 
})

app.get(/messages\/\d+/, (req,rsp) => {
  const message_id = Number(req.url.split("/").slice(-1).pop());
  const query = {"id" : message_id};

  db.collection('messages').findOne(query,(err, result) => {
    if (err) {
      return console.log(err);
    }
    rsp.json(result);
})
}); 
// runServer();
// startDbConn();
// callHTTP();

// let sa = require('superagent');
// sa.post('/messages')
// .send({"id": 1, "content":"Should work", "isRead":true})
// .end(function(err, res) {
//   if(err)
//   {
//     console.log(err);
//   }
//   else
//   {
//     console.log("HALLELUJA");
//   }
// });


// WORKS
// const MongoClient  = require('mongodb').MongoClient; 
// let url = "mongodb://localhost:27017"; 
// MongoClient.connect(url, (err, db) => { 
//     if(err){ throw err; } 
//     let dbo = db.db("tdp013"); 
//     let myobjects = [ 
//       { _id: 7, name: 'Chocolate Heaven'}, 
//       { _id: 8, name: 'Tasty Lemon'}, 
//       { _id: 9, name: 'Vanilla Dream'} 
//     ]; 
//     dbo.collection("products").insertMany(myobjects, (err, res) => { 
//       if (err){ throw err; } 
//       console.log(res); 
//       db.close(); 
//     }) 
//   })


module.exports = app;
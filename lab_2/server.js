//let {start, PI} = require("./my-module");

// const http = require('http') 
// const url = require('url') 
// http.createServer((request, response) => { 
//     response.writeHead(200, {'Content-Type' : 'text/html'}) 
//     let urlParts = url.parse(request.url, true) 
//     let name = urlParts.query['name'] || 'World' 
//     let phone = urlParts.query['phone'] 
//     response.write(`<h1>Hello ${name}!</h1>`) 
//     if(phone){ 
//         response.write(`<p>Is you're phone number ${phone}?</p>`) 
//     } 
//     response.end() 
// }).listen(8889)


// my-module.js 
// let http = require(‘http’); 
// function start(port){ 
//     console.log(`Listening on port ${port}`); 
//     http.createServer((request, response) => { 
//         response.writeHead(200, {'Content-
// Type' : 'text/html'}); 
//         response.write(`<h1>Hello world!</
// h1>`); 
//         response.end(); 
//     }).listen(port); 
// } 
// const PI = 3.14159265358979323846; 
// module.exports = { 
//     start: start, 
//     PI: PI 
// }


//Express

// const express = require('express') 
// const app = express() 
// app.get('/', function (req, res) { 
//   res.send('Hello World!') 
// }); 
// let server = app.listen(3000, () => { 
//   let host = server.address().address 
//   let port = server.address().port 
//   console.log(`Lyssnar på http://${host}:${port}`) 
// })


//MongoDB
// const MongoClient  = require('mongodb').MongoClient; 
// let url = "mongodb://127.0.0.1:27017"; 
// MongoClient.connect(url, (err, db) => { 
//     if(err) { throw err; } 
//     let dbo = db.db("tdp013"); 
//     dbo.collection("movie").find({}).toArray((err, result) => { 
//         if(err){ throw err; } 
//         console.log(result); 
//     }); 
//     // close connection when done with mongo 
//     db.close() 
// });  

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// serve files from the public directory
app.use(express.static(__dirname), express.json());

// connect to the db and start the express server
let db;

// ***Replace the URL below with the URL for your database***
let url = "mongodb://localhost:27017";
// E.g. for option 2) above this will be:
// const url =  'mongodb://localhost:21017/databaseName';


//start database by typing in mongo

MongoClient.connect(url, (err, db) => {
  if(err) {
    return console.log(err);
  }
  let dbo = db.db("tdp013");
  // start the express web server listening on 8080
  app.listen(8080, () => {
    console.log('listening on 8080');
  });

  // serve the homepage
  app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
  });

  app.post('/messages', (req, res) => {
    const id = req.body.id;
    const content = req.body.content;
    const isRead = req.body.isRead;
    console.log(id);

    let message = {"id" : id, "content" : content, "isRead" : isRead}; 
    dbo.collection('messages').insertOne(message, (err, result) => {
    if (err) {
      return console.log(err);
    }
    res.sendStatus(200);
  })
  });
});


function runServer() {

}

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
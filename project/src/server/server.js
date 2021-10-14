const express = require('express');
const app = express();
app.use(express.static(__dirname), express.json());
const PORT = 9070;
const databaseHandler = require("./database.js");
global.TextEncoder = require('util').TextEncoder
global.TextDecoder = require('util').TextDecoder

databaseHandler.startDbConn(() => {
  app.listen(PORT, () => {
    console.log('listening on ' + PORT);
  });
});


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS');
  next();
});  


app.use(require('./routes.js'));


module.exports = app;
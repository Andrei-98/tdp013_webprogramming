const express = require('express');
const { ServerApiVersion } = require('mongodb');
const app = express();
app.use(express.static(__dirname), express.json());

const cors = require('cors');
const PORT = 9070;
const databaseHandler = require("./database.js");


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
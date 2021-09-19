const express = require('express');
const { ServerApiVersion } = require('mongodb');
const app = express();
app.use(express.static(__dirname), express.json());

const PORT = 9070;
const databaseHandler = require("./database.js");


databaseHandler.startDbConn(() => {
  app.listen(PORT, () => {
    console.log('listening on ' + PORT);
  });
});

app.use(require('./routes.js'));

module.exports = app;
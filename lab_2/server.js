const express = require('express');
const { ServerApiVersion } = require('mongodb');
const { connect } = require('superagent');
const app = express();
app.use(express.static(__dirname), express.json());
const PORT = 8050;

const databaseHandler = require("./database.js");

//start database by typing in mongo

//let db;

databaseHandler.startDbConn(() => {
  app.listen(PORT, () => {
    console.log('listening on ' + PORT);
  });
  db = databaseHandler.getDb();
});

app.use((req, res, next) => {
  console.log(req.path)
  console.log(req.method)

  //ERROR HANDLER
  if (req.path == "/messages")
  {
    if (req.method == "POST")
    {
      try {
        JSON.stringify(req.body);
        next()
      }
      catch {
        res.sendStatus(400)
      }
    }
    else if (req.method == "GET")
    {
      next()
    }
    else
    {
      res.sendStatus(405);
    }
  }
  else if (req.path.match(/messages\/\d+/))
  {
    if (req.method == "PUT")
    {
      console.log("here");
      next()
    }
    else if (req.method == "GET")
    {
      next()
    }
    else
    {
      res.sendStatus(405);
    }
  }
  else
  {
    console.log("-----404 sent");
    res.sendStatus(404);
  }
})

function validate_message(id, content, isRead)
{
  let is_ok = false;
  if (typeof id == "number")
  {
    console.log("HEK")
    if (typeof isRead == "boolean")
    {
      console.log("WORKING")
      try
      {
        if (typeof content == "object")
        {
          return is_ok;
        }
        // JSON.parse("{'t':1}") this should not crash
        JSON.parse(content);
      }
      catch 
      {
        is_ok = true;
        // no match = null => false
        // one or more matches = true
        if (!!content.match(/\$\{.*\}/))
        {
          is_ok = false;
        }
      }
    }
  }

  return is_ok;
}

app.post("/messages", (req, rsp) => {
  if(validate_message(req.body.id, req.body.content, req.body.isRead))
  {
    console.log("IS OK");
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
  }
  else
  {
    console.log("ERROR")
    rsp.sendStatus(400);
  }
});

app.put(/messages\/\d+/, (req,rsp) => {
    const message_id = Number(req.url.split("/").slice(-1).pop());
    const query = {"id" : message_id};
    let value = db.collection("messages").findOne({"id":message_id});
    value.then((res, unf) => {
      if(unf)
      {
        return console.log(unf);
      }
      db.collection('messages').updateOne(query, {$set: {"isRead": !(res.isRead)}}, (err, result) => {
        if (err) {
          return console.log(err);
        } 
        rsp.sendStatus(200);
    })
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



module.exports = app;
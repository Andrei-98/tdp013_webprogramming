const express = require('express');
const { ServerApiVersion } = require('mongodb');
const { connect } = require('superagent');
const app = express();
app.use(express.static(__dirname), express.json());
const PORT = 9070;

const databaseHandler = require("./database.js");


databaseHandler.startDbConn(() => {
  app.listen(PORT, () => {
    console.log('listening on ' + PORT);
  });
  db = databaseHandler.getDb();
});


app.use((req, res, next) => {
  console.log("Requested URL: " + req.path)
  console.log("Requested method: " + req.method)

  //ERROR HANDLER
  if (req.path == "/messages")
  {
    if (req.method == "POST")
    {
      next();
    }
    else if (req.method == "GET")
    {
      next();
    }
    else
    {
      // method is known but not supported, example: DELETE
      res.sendStatus(405);
    }
  }
  else if (req.path.match(/messages\/\d+/))
  {
    if (req.method == "PUT")
    {
      next()
    }
    else if (req.method == "GET")
    {
      next()
    }
    else
    {
      // method is known but not supported
      res.sendStatus(405);
    }
  }
  else
  {
    // path is not supported example: /hi
    res.sendStatus(404);
  }
})

/*
 * Function that runs multiple tests on the information the user typed in
 * id = id of the message, should be Integer
 * content = the text, should be a string
 * isRead = should be boolean
 */
function validate_message(id, content, isRead)
{
  let is_ok = false;
  if (typeof id == "number")
  {
    if (typeof isRead == "boolean")
    {
      try
      {
        if (typeof content == "object")
        {
          return is_ok;
        }
        // content could be a JSON object desguised as a string
        // try to turn it into a JSON object, should fail -> catch.
        JSON.parse(content);
      }
      catch 
      {
        is_ok = true;
        // in the string content try to find ${variable}
        // no match = null => false
        // one or more matches = true
        if (!!content.match(/\$\{.*\}/))
          is_ok = false;
      }
    }
  }

  return is_ok;
}


app.post("/messages", (req, rsp) => {
  if(validate_message(req.body.id, req.body.content, req.body.isRead))
  {
    const id = req.body.id;
    const content = req.body.content;
    const isRead = req.body.isRead;
    let message = {"id" : id, "content" : content, "isRead" : isRead};
    db.collection('messages').insertOne(message, (err, result) => {
      if (err) {
        throw(err);
      }
      rsp.sendStatus(200);
    })
  }
  else
  {
    // request is malicious or invalid
    rsp.sendStatus(400);
  }
});


app.put(/\/messages\/\d+/, (req,rsp) => {
    
    const message_id = Number(req.url.split("/").slice(-1).pop());
    const query = {"id" : message_id};
    let value = db.collection("messages").findOne({"id":message_id});

    value.then((res) => {
      // --------------------------------------unf-------------------------------
      // id requested for message that dosent exist in database
      if (res == null)
      {
        rsp.sendStatus(400);
      }
      else 
      {
        // change the isRead value of a specific message based on the id
        db.collection('messages').updateOne(query, {$set: {"isRead": !(res.isRead)}}, (err, result) => {
          if (err) {
            return console.log(err);
          } 
          rsp.sendStatus(200);
          })
      }
    })
});


app.get("/messages", (req, rsp) => {
  // send an array with all messages in database
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

  //find a specific message based on id
  db.collection('messages').findOne(query,(err, result) => {
    if (err) {
      return console.log(err);
    }
    rsp.json(result);
})
}); 


module.exports = app;
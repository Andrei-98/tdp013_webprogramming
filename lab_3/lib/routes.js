let express = require('express');
let router = express.Router();

let errorHandler = require('./errorHandler.js');
let dbHandler = require('./database.js');



router.use((req, res, next) => {
    let requestStatus = errorHandler.validateRequest(req.method, req.path);

    if (requestStatus == 200)
    {
        next();
    }
    else
    {
        res.sendStatus(requestStatus);
    }
})


router.post("/messages", (req, rsp) => {
    if(errorHandler.validate_message(req.body.id, req.body.content, req.body.isRead))
    {
      const id = req.body.id;
      const content = req.body.content;
      const isRead = req.body.isRead;
      let message = {"id" : id, "content" : content, "isRead" : isRead};
      dbHandler.insert_message(message);    
      rsp.sendStatus(200);
    }
    else
    {
      // request is malicious or invalid
      rsp.sendStatus(400);
    }
});
  
  
router.put(/\/messages\/[0-9]+/, (req,rsp) => {
      const message_id = Number(req.url.split("/").slice(-1).pop());
      const query = {"id" : message_id};
      let value = dbHandler.find_message(query); 
      value.then((res) => {
        // id requested for message that dosent exist in database
        if (res == null)
        {
          rsp.sendStatus(400);
        }
        else 
        {
            let new_change = {"isRead": !(res.isRead)};
            let val = dbHandler.update_message(query, new_change);
            val.then((res) => {
                if (res)
                {
                    rsp.sendStatus(200);
                }
            })
        }
    })
});

  
router.get("/messages", (req, rsp) => {
    // send an array with all messages in database
    let value = dbHandler.find_all({});
    value.then((res) => {
        rsp.json(res);
    })
});
  
  
router.get(/messages\/\d+/, (req,rsp) => {
    const message_id = Number(req.url.split("/").slice(-1).pop());
    const query = {"id" : message_id};
  
    //find a specific message based on id
    let value = dbHandler.find_message(query);
    value.then((res) => {
        // if (res == null)
        // {
        //     rsp.sendStatus(400)
        // }
        rsp.json(res);
    })      
});


module.exports = router;
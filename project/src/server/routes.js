let express = require('express');
let router = express.Router();

let errorHandler = require('./errorHandler.js');
let dbHandler = require('./database.js');


router.use((req, res, next) => {
    let requestStatus = errorHandler.validateRequest(req.method, req.path);
    console.log(requestStatus)
    console.log(req.method)
    console.log(req.path)

    if (requestStatus == 200)
    {
        next();
    }
    else
    {
        res.sendStatus(requestStatus);
    }
})


router.post("/register", (req, rsp) => {

    // register
    if (errorHandler.validate_string(req.body.username, req.body.password)) {
        let user_exist = dbHandler.before_register(req.body.username);
        user_exist.then((res) => {
            if (res.length == 0) {
                console.log(res)
                const user = {
                    username: req.body.username, password: req.body.password,
                    "sent_req": [], "received_req": [], "friends": [], "messages": []
                };
                dbHandler.add_user(user);
                rsp.sendStatus(200);
            }
            else {
                rsp.sendStatus(409);
            }
        })
    } else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
});

router.post("/login", (req, rsp) => {
    if (errorHandler.validate_string(req.body.username, req.body.password)) {
        const user = { username: req.body.username, password: req.body.password };
        const status = dbHandler.sign_in(user);
        status.then((res) => {
            if (res != null) {
                rsp.json(res);
            }
            else
                rsp.sendStatus(401);
        })
    } else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
});

router.post("/find", (req, rsp) => {
    if (errorHandler.validate_string(req.body.receiver, req.body.sender)) {
        const friend_target = req.body.receiver;
        const friend_requester = req.body.sender;
        dbHandler.send_friend_request(friend_requester, friend_target);
        rsp.sendStatus(200);
    } else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
});

router.put("/find", (req, rsp) => {
    if (errorHandler.validate_string(req.body.receiver, req.body.sender)) {
        const friend_target = req.body.receiver;
        const friend_requester = req.body.sender;
        dbHandler.accept_friend(friend_requester, friend_target);
        rsp.sendStatus(200);
    } else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
});

router.post(/\/profile\/.+/, (req, rsp) => {
    const to = String(req.url.split("/").slice(-1).pop());
    if (errorHandler.validate_string(to, req.body.from, req.body.content)) {
        const content = req.body.content;
        const from = req.body.from;
        let message = { "content": content, "from": from, "to": to }

        dbHandler.insert_message(message, to)
        rsp.sendStatus(200);
    } else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
});

// Get messages of specific user
router.get(/\/messages\/.+/, (req, rsp) => {
    const user = String(req.url.split("/").slice(-1).pop());
    if (errorHandler.validate_string(user)) {
        let messages = dbHandler.find_user({username : user});
        messages
            .then((res) => {
                rsp.json(res.messages);
            })
    }
    else {
        rsp.sendStatus(400);
    }

});

//Get friends of specific user
router.get(/\/friends\/.+/, (req, rsp) => {
    const friend = String(req.url.split("/").slice(-1).pop());
    if (errorHandler.validate_string(friend)) {
        let friends = dbHandler.find_user({username : friend})
        friends
            .then((res) => {
                if (res != null) {

                    rsp.json(res.friends)
                }
                else {
                    rsp.json([]);
                }
            })
    }
    else {
        rsp.sendStatus(400);
    }
    
});

router.get(/\/profile\/.+/, (req, rsp) => {
    const user = String(req.url.split("/").slice(-1).pop());
    if (errorHandler.validate_string(user)) {
    let result = dbHandler.find_user({username: user});
    result.then((res) => { 
        if(res != null) {
            rsp.json(res);
        }
        else {
            rsp.sendStatus(400);
        }
    } )
    }
    else {
         // request is malicious or invalid
         rsp.sendStatus(400);
    }
}
);

router.get(/\/find\/.*/, (req, rsp) => {

    const user = req.url.split("/").pop();
    console.log(user);
    if (user == "") {
        const found_users = dbHandler.find_all();
        found_users.then((res) => {
            rsp.json(res);
        })
    }
    if (errorHandler.validate_string(user)) {
        const found_users = dbHandler.get_user(user);

        found_users.then((res) => {
            rsp.json(res);
        })
    }
    
    else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
});

router.post("/update", (req, rsp) => {
    if (errorHandler.validate_string(req.body.username)) {
        const user = { username: req.body.username };
        const status = dbHandler.find_user(user);
        status.then((res) => {
            if (res != null) {
                rsp.json(res);
            }
            else
                rsp.sendStatus(400);
        })
    } else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
});

module.exports = router;
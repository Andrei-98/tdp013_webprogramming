//  /login
//  /profile/username
//  /friends
//  /chat

let express = require('express');
let router = express.Router();

let errorHandler = require('./errorHandler.js');
let dbHandler = require('./database.js');


// router.use((req, res, next) => {
//     let requestStatus = errorHandler.validateRequest(req.method, req.path);

//     if (requestStatus == 200)
//     {
//         next();
//     }
//     else
//     {
//         res.sendStatus(requestStatus);
//     }
// })

router.post("/login", (req, rsp) => {
    //console.log(errorHandler.validate_string(req.body.username, req.body.password))

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

router.post("/update", (req, rsp) => {

    // log in
    //const username = req.url.split("/").slice(-1).pop();

    if (errorHandler.validate_string(req.body.username)) {

        const user = { username: req.body.username };
        const status = dbHandler.find_user(user);
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


router.post("/register", (req, rsp) => {

    // register
    if (errorHandler.validate_string(req.body.username, req.body.password)) {
        let user_exist = dbHandler.get_user(req.body.username);

        user_exist.then((res) => {
            console.log(res)
            if (res.length == 0) {
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


router.put("/profile/", (req, rsp) => {
    if (errorHandler.validate_string(req.body.sender, req.body.target)) {
        const sender = req.body.sender
        const target = req.body.target

        dbHandler.accept_friend(sender, target)
    } else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
});

router.get(/\/profile\/.+/, (req, rsp) => {
    //if (errorHandler.validate_string(req.body.sender, req.body.target)) {
    const user = String(req.url.split("/").slice(-1).pop());
    let result = dbHandler.find_user({username: user});
    result.then((res) => { 
        if(res != null) {
            rsp.sendStatus(200);
        }
        else {
            rsp.sendStatus(400);
        }
    } )
});

// Get friend request of specific user.
router.get(/\/fr\/.+/, (req, rsp) => {
    const friend_requests_for = String(req.url.split("/").slice(-1).pop());
    console.log("here")
    console.log(friend_requests_for)
    let requests = dbHandler.get_data_from(friend_requests_for)
    requests
        .then((res) => {
            console.log(res.received_req)
            if (res != null) {

                rsp.json(res.received_req)
            }
            else {
                rsp.json([]);
            }
        })
        .catch((e) => console.log(e))

})


router.post(/\/profile\/.+/, (req, rsp) => {
    // if (errorHandler.validate_string(req.body.sender, req.body.target)) {
        console.log("here")
        const content = req.body.content;
        const from = req.body.from;
        const to = req.body.to;
        let message = { "content": content, "from": from, "to": to }

        dbHandler.insert_message(message, to)
        rsp.sendStatus(200);
    // } else {
        // request is malicious or invalid
        // rsp.sendStatus(400);
    // }
});

router.get(/\/find\/.+/, (req, rsp) => {

    const user = req.url.split("/").pop();
    const found_users = dbHandler.get_users(user);

    found_users.then((res) => {
        rsp.json(res);
    })

})


//Get friends of specific user
router.get(/\/friends\/.+/, (req, rsp) => {
    const friend = String(req.url.split("/").slice(-1).pop());
    let friends = dbHandler.get_data_from(friend)
    friends
        .then((res) => {
            if (res != null) {

                rsp.json(res.friends)
            }
            else {
                rsp.json([]);
            }
        })
        .catch((e) => console.log(e))
    // find friends
});


router.get("/chat", (req, rsp) => {
    // chatting, if time
});

// Get messages of specific user
router.get(/\/messages\/.+/, (req, rsp) => {
    console.log("----fetching messages")
    const user = String(req.url.split("/").slice(-1).pop());
    let messages = dbHandler.get_data_from(user)
    messages
        .then((res) => {
            rsp.json(res.messages)
        })
        .catch((e) => console.log(e))
});


module.exports = router;
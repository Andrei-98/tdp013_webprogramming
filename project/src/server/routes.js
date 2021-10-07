//  /login
//  /profile/username
//  /friends
//  /chat

let express = require('express');
let router = express.Router();

let errorHandler = require('./errorHandler.js');
let dbHandler = require('./database.js');


// router.use((req, res, next) => {
//     // validate request
//     next;
// });

router.post("/login", (req, rsp) => {

    // log in
    //const username = req.url.split("/").slice(-1).pop();

    const user = { username: req.body.username, password: req.body.password };
    const status = dbHandler.sign_in(user);
    status.then((res) => {
        if (res != null) {
            rsp.json(res);
        }
        else
            rsp.sendStatus(401);
    })

});

router.post("/update", (req, rsp) => {

    // log in
    //const username = req.url.split("/").slice(-1).pop();

    const user = { username: req.body.username };
    const status = dbHandler.find_user(user);
    status.then((res) => {
        if (res != null) {
            rsp.json(res);
        }
        else
            rsp.sendStatus(401);
    })

});

router.post("/find", (req, rsp) => {

    const friend_target = req.body.receiver;
    const friend_requester = req.body.sender;


    dbHandler.send_friend_request(friend_requester, friend_target);
    rsp.sendStatus(200);
});

router.post("/register", (req, rsp) => {

    // register

    let user_exist = dbHandler.get_user(req.body.username);
    
    user_exist.then((res) => {
        if (res == null) {
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
});

router.put("/find", (req, rsp) => {

    const friend_target = req.body.receiver;
    const friend_requester = req.body.sender;


    dbHandler.accept_friend(friend_requester, friend_target);
    rsp.sendStatus(200);
});


router.put("/profile/", (req, rsp) => {
    const sender = req.body.sender
    const target = req.body.target

    dbHandler.accept_friend(sender, target)
});


router.get(/\/fr\/.+/, (req, rsp) => {
    const friend_requests_for = String(req.url.split("/").slice(-1).pop());
    let requests = dbHandler.get_data_from(friend_requests_for)
    requests
        .then((res) => {
            if (res != null) {

                rsp.json(res.received_req)
            }
            else {
                rsp.json([]);
            }
        })
        .catch((e) => console.log(e))

})


router.post("/profile", (req, rsp) => {
    const content = req.body.content;
    const from = req.body.from;
    const to = req.body.to;
    let message = { "content": content, "from": from, "to": to }

    dbHandler.insert_message(message, to)
    rsp.sendStatus(200);
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
router.get(/\/messages\/\w+/, (req, rsp) => {
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
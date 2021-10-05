//  /login
//  /profile/username
//  /friends
//  /chat
let ObjectId = require('mongodb').ObjectID

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
        if(res != null){
            rsp.json(res);
        }
        else
            rsp.sendStatus(401);
    })

});

router.put("/profile", (req, rsp) => {

    const friend_target = req.body.receiver;
    const friend_requester = req.body.sender;

    dbHandler.send_friend_request(friend_requester, friend_target);
    rsp.sendStatus(200);
});

router.post("/register", (req, rsp) => {

    // register

    const user = {
        username: req.body.username, password: req.body.password,
        "sent_req": [], "received_req": [], "friends": [], "messages": ["hello", "welcome"]
    };
    dbHandler.add_user(user);
    rsp.sendStatus(200);


});

router.put("/profile/fr", (req, rsp) => {

    const friend_target = req.body.receiver;
    const friend_requester = req.body.sender;

    dbHandler.accept_friend(friend_requester, friend_target);
    rsp.sendStatus(200);

});

router.post("/profile", (req, rsp) => {
    console.log("------------")
    const content = req.body.content;
    const from = req.body.from;
    let message = { "content": content, "from": from }
    dbHandler.insert_message(message, from)

    rsp.sendStatus(200);
});

router.get("/friends", (req, rsp) => {

    // find friends
});


router.get("/chat", (req, rsp) => {
    // chatting, if time
});


router.get("/profile/messages", (req, rsp) => {
});


module.exports = router;
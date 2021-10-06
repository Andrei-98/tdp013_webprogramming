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
        "sent_req": [], "received_req": [], "friends": ["Andrei", "Lala", "Raul", "Bill"], "messages": []
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
    const content = req.body.content;
    const from = req.body.from;
    let message = { "content": content, "from": from }
    console.log(message)
    dbHandler.insert_message(message, from)
    rsp.sendStatus(200);
});

router.get(/\/find\/.+/, (req,rsp) => {
    
    const user = req.url.split("/").pop();
    const found_users = dbHandler.get_users(user);

    found_users.then((res) => {
        // const matches = res.filter(s => s.toLowerCase().includes(user.toLowerCase()));
        console.log(res);
        rsp.json(res);
    })
    
})


//Get friends of specific user
router.get(/\/friends\/.+/, (req, rsp) => {
    console.log("--------fetching friends")
    const friend = String(req.url.split("/").slice(-1).pop());
    let friends = dbHandler.get_data_from(friend)
    friends
    .then((res) => {
        console.log(res.friends)
        rsp.json(res.friends)
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
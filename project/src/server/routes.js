let express = require('express');
let router = express.Router();

let errorHandler = require('./errorHandler.js');
let dbHandler = require('./database.js');

let cryptoJS = require("crypto-js")

const KEYPHRASE = "JiajfiahbbvasfoahfojJIHFASHFUHFhfhf1134124";


router.use((req, res, next) => {
    let requestStatus = errorHandler.validateRequest(req.method, req.path);

    if (requestStatus == 200) {
        next();
    }
    else {
        res.sendStatus(requestStatus);
    }
})


router.post("/register", (req, rsp) => {
    if (errorHandler.validate_string(req.body.username, req.body.password, req.body.password_confirm)) {

        if (!errorHandler.password_confirmation(req.body.password, req.body.password_confirm)) {
            rsp.sendStatus(400);
        }

        let user_exist = dbHandler.user_exist(req.body.username);
        user_exist.then((res) => {
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
    }
    else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
});

// runs after click sign in btn
router.post("/login", (req, rsp) => {
    if (errorHandler.validate_string(req.body.username, req.body.password)) {
        const user = { username: req.body.username, password: req.body.password };
        const status = dbHandler.sign_in(user);
        status.then((res) => {
            if (res != null) {
                const hashedPass = cryptoJS.AES.encrypt(req.body.password, KEYPHRASE).toString(); 
                res.password = hashedPass;
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

// runs after refresh of page
router.post("/checkup", (req, rsp) => {
    if (errorHandler.validate_string(req.body.username, req.body.password)) {
        const decryptPassword = cryptoJS.AES.decrypt(req.body.password, KEYPHRASE);
        const user = { username: req.body.username, password: decryptPassword.toString(cryptoJS.enc.Utf8)};
        const status = dbHandler.sign_in(user);
        status.then((res) => {
            if (res != null) {
                const hashedPass = cryptoJS.AES.encrypt(req.body.password, KEYPHRASE).toString();  
                res.password = hashedPass;
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

        dbHandler.before_sending_request(friend_requester, friend_target)
            .then((res) => {
                if (res.length != 2) {
                    rsp.sendStatus(400)
                }
                else {
                    dbHandler.send_friend_request(friend_requester, friend_target)
                        .then(() => { rsp.sendStatus(200) });
                }
            })
    }
    else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
});

router.put("/find", (req, rsp) => {
    if (errorHandler.validate_string(req.body.receiver, req.body.sender)) {
        const friend_target = req.body.receiver;
        const friend_requester = req.body.sender;
        dbHandler.before_accepting_request(friend_requester, friend_target)
            .then((res) => {
                if (res.length != 2) {
                    rsp.sendStatus(400)
                }
                else {
                    dbHandler.accept_friend(friend_requester, friend_target)
                        .then(() => { rsp.sendStatus(200) });
                }
            })
    }
    else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
});

// Send message to another profile only if self or friends
router.post(/\/profile\/.+/, (req, rsp) => {
    const to = String(req.url.split("/").slice(-1).pop());
    if (errorHandler.validate_string(to, req.body.from, req.body.content)) {
        if (!errorHandler.validate_message(req.body.content)) {
            rsp.sendStatus(400);
        }
        else {
            dbHandler.is_friends(req.body.from, to)
                .then((res) => {
                    // if (res.length == 1) {
                    //     const content = req.body.content;
                    //     const from = req.body.from;
                    //     let message = { "content": content, "from": from, "to": from }
                    //     dbHandler.insert_message(message, from)
                    //     .then(() => {rsp.sendStatus(200)})
                    // }
                    if (res.length != 0) {
                        const rec = res.find(elem => elem.username === to)
                        const content = req.body.content;
                        const from = req.body.from;
                        let message = { "content": content, "from": from, "to": rec.username }
                        dbHandler.insert_message(message, rec.username)
                            .then(() => { rsp.sendStatus(200) })
                    }
                    else {
                        rsp.sendStatus(400)
                    }
                })
        }
    }
    else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
});

// // Get messages of specific user
// router.get(/\/messages\/.+/, (req, rsp) => {
//     const user = String(req.url.split("/").slice(-1).pop());
//     if (errorHandler.validate_string(user)) {
//         dbHandler.user_exist(user)
//         .then ((res) => {
//             if(res.length == 1)
//             {
//                 dbHandler.find_user({username : user})                
//                 .then((res) => {
//                     rsp.json(res.messages);
//                 })
//             }
//             else {
//                 rsp.sendStatus(400);
//             }
//         })
//     }
//     else {
//         rsp.sendStatus(400);
//     }
// });

// //Get friends of specific user
// router.get(/\/friends\/.+/, (req, rsp) => {
//     const friend = String(req.url.split("/").slice(-1).pop());
//     if (errorHandler.validate_string(friend)) {
//         let friends = dbHandler.find_user({username : friend})
//         friends
//             .then((res) => {
//                 if (res != null) {

//                     rsp.json(res.friends)
//                 }
//                 else {
//                     rsp.json([]);
//                 }
//             })
//     }
//     else {
//         rsp.sendStatus(400);
//     }

// });

router.get(/\/profile\/.+/, (req, rsp) => {
    const user = String(req.url.split("/").slice(-1).pop());
    if (errorHandler.validate_string(user)) {
        let result = dbHandler.find_user({ username: user });
        result.then((res) => {
            if (res != null) {
                delete res["password"]
                rsp.json(res);
                // rsp.sendStatus(200);
            }
            else {
                rsp.sendStatus(400);
            }
        })
    }
    else {
        // request is malicious or invalid
        rsp.sendStatus(400);
    }
}
);

router.get(/\/find\/.*/, (req, rsp) => {
    const user = req.url.split("/").pop();
    if (user == "") {
        const found_users = dbHandler.find_all();
        found_users.then((res) => {
            res.forEach(el => { delete el["password"] });
            rsp.json(res);
        })
    }
    if (errorHandler.validate_string(user)) {
        const found_users = dbHandler.get_user(user);

        found_users.then((res) => {
            res.forEach(el => { delete el["password"] });
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
                delete res["username"]
                delete res["password"]
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
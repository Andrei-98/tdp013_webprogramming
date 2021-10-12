const assert = require('assert');
let server = require('../src/server/server.js');
const { exit } = require('process');
let databaseHandler = require('../src/server/database.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

// TODO make manuscript for presentation 

describe('POST for /register', () => {
    it('Should have status code 200 and add one user to database', (done) => {
        let query = { username: "Kasper", password: "123456", password_confirm: "123456" };
        databaseHandler.dropColl();
        chai.request(server)
            .post('/register')
            .send(query)
            .then((res) => {
                res.should.have.status(200);
                let obj = databaseHandler.find_user({ username: query.username });
                obj.then((r) => {
                    r.username.should.be.equal(query.username);
                    r.password.should.be.equal(query.password);
                    done();
                })
            })
    });
});


describe('POST for /register', () => {
    it('Should have status code 200 and add one user to database', (done) => {
        let query = { username: "Andrei", password: "Hello" , password_confirm: "Hello"};
        chai.request(server)
            .post('/register')
            .send(query)
            .then((res) => {
                res.should.have.status(200);
                let obj = databaseHandler.find_user({ username: query.username });
                obj.then((r) => {
                    r.username.should.be.equal(query.username);
                    r.password.should.be.equal(query.password);
                    done();
                })
            })
    });
});


describe('POST for /register user already exist', () => {
    it('Should have status code 409', (done) => {
        let query = { username: "Andrei", password: "Hello" , password_confirm: "Hello"};
        chai.request(server)
            .post('/register')
            .send(query)
            .then((res) => {
                res.should.have.status(409);
                done();
            })
    });
});


describe('POST for /login', () => {
    it('Should have status code 200 and return correct user', (done) => {
        let query = { username: "Kasper", password: "123456" };
        chai.request(server)
            .post('/login')
            .send(query)
            .then((res) => {
                res.should.have.status(200);
                let obj = databaseHandler.find_user({ username: query.username });
                obj.then((r) => {
                    r.username.should.be.equal(query.username);
                    r.password.should.be.equal(query.password);
                    done();
                })
            })
    });
});


describe('POST for /login wrong password', () => {
    it('Should have status code 401 and return null', (done) => {
        let query = { username: "Kasper", password: "12345" };
        chai.request(server)
            .post('/login')
            .send(query)
            .then((res) => {
                res.should.have.status(401);
                done();
            })
    });
});



describe('POST for /login', () => {
    it('Should have status code 401 and return null', (done) => {
        let query = { username: "Fredrik", password: "123456" };
        chai.request(server)
            .post('/login')
            .send(query)
            .then((res) => {
                res.should.have.status(401);
                let obj = databaseHandler.find_user({ username: query.username });
                obj.then((r) => {
                    assert.equal(r, null);
                    done();
                })
            })
    });
});


describe('POST for /find', () => {
    it('Should have status code 200 and have a pending request for both sender and receiver', (done) => {
        const sender = "Kasper";
        const receiver = "Andrei";
        const fr_req = { "sender": sender, "receiver": receiver }
        chai.request(server)
            .post('/find')
            .send(fr_req)
            .then((res) => {
                res.should.have.status(200);
                let obj = databaseHandler.find_all();
                obj.then((r) => {
                    let user_sender = r.find(elem => elem.username === sender)
                    let user_receiver = r.find(elem => elem.username === receiver)

                    assert.equal(user_sender.sent_req[0], receiver)
                    assert.equal(user_receiver.received_req[0], sender)
                    assert.equal(user_sender.sent_req.length, 1)
                    assert.equal(user_receiver.received_req.length, 1)
                    done();
                })
            })
    });
});

describe('POST for /find in same way as before ' , () => {
    it('Should have status code 400 since sender already sent request', (done) => {
        const sender = "Kasper";
        const receiver = "Andrei";
        const fr_req = { "sender": sender, "receiver": receiver }
        chai.request(server)
            .post('/find')
            .send(fr_req)
            .then((res) => {
                res.should.have.status(400);
                let obj = databaseHandler.find_all();
                obj.then((r) => {
                    let user_sender = r.find(elem => elem.username === sender)
                    let user_receiver = r.find(elem => elem.username === receiver)

                    assert.equal(user_sender.sent_req[0], receiver)
                    assert.equal(user_receiver.received_req[0], sender)
                    assert.equal(user_sender.sent_req.length, 1)
                    assert.equal(user_receiver.received_req.length, 1)
                    done();
                })
            })
    });
});


describe('POST for /find inverted ' , () => {
    it('Should have status code 400 since sender already sent request', (done) => {
        const sender = "Andrei";
        const receiver = "Kasper";
        const fr_req = { "sender": sender, "receiver": receiver }
        chai.request(server)
            .post('/find')
            .send(fr_req)
            .then((res) => {
                res.should.have.status(400);
                let obj = databaseHandler.find_all();
                obj.then((r) => {
                    let user_sender = r.find(elem => elem.username === sender)
                    let user_receiver = r.find(elem => elem.username === receiver)

                    assert.equal(user_sender.received_req[0], receiver)
                    assert.equal(user_receiver.sent_req[0], sender)
                    assert.equal(user_sender.received_req.length, 1)
                    assert.equal(user_receiver.sent_req.length, 1)
                    done();
                })
            })
    });
});


describe('POST for /profile to friend', () => {
    it('Should have status code 400, since they are not friends', (done) => {
        const from = "Kasper";
        const content = "Hello there";
        const message = { content: content, from: from}
        chai.request(server)
            .post('/profile/Andrei')
            .send(message)
            .then((res) => {
                res.should.have.status(400);
                let obj = databaseHandler.find_user({ username: "Andrei" });
                obj.then((r) => {
                    r.username.should.be.equal("Andrei");
                    r.messages.length.should.be.equal(0);
                    done();
                })
            })
    });
})


describe('POST for /profile to non existent user', () => {
    it('Should have status code 400, since that user dosent exist', (done) => {
        const from = "Kasper";
        const content = "Hello there";
        const message = { content: content, from: from}
        chai.request(server)
            .post('/profile/Cleo')
            .send(message)
            .then((res) => {
                res.should.have.status(400);
                let obj = databaseHandler.find_user({ username: "Cleo" });
                obj.then((r) => {
                    assert.equal(r, null);
                    done();
                })
            })
    });
})


describe('PUT for /find', () => {
    it('Should have status code 200, remove requests from list and add friends', (done) => {
        const sender = "Kasper";
        const receiver = "Andrei";
        const fr_req = { "sender": sender, "receiver": receiver }
        chai.request(server)
            .put('/find')
            .send(fr_req)
            .then((res) => {
                res.should.have.status(200);
                let obj = databaseHandler.find_all();
                obj.then((r) => {
                    let user_sender = r.find(elem => elem.username === sender)
                    let user_receiver = r.find(elem => elem.username === receiver)

                    assert.equal(user_sender.friends[0], receiver)
                    assert.equal(user_receiver.friends[0], sender)
                    assert.equal(user_sender.sent_req.length, 0)
                    assert.equal(user_receiver.received_req.length, 0)
                    done();
                })
            })
    });
});


describe('POST for /profile to friend', () => {
    it('Should have status code 200, since they are now friends', (done) => {
        const from = "Kasper";
        const content = "Hello there";
        const message = { content: content, from: from}
        chai.request(server)
            .post('/profile/Andrei')
            .send(message)
            .then((res) => {
                res.should.have.status(200);
                let obj = databaseHandler.find_user({ username: "Andrei" });
                obj.then((r) => {
                    r.username.should.be.equal("Andrei");
                    r.messages.length.should.be.equal(1);
                    assert.equal(r.messages[0].from, from);
                    assert.equal(r.messages[0].to, "Andrei");
                    assert.equal(r.messages[0].content, content);
                    done();
                })
            })
    });
})


describe('POST for /find after already friends' , () => {
    it('Should have status code 400 since sender already friends with receiver', (done) => {
        const sender = "Andrei";
        const receiver = "Kasper";
        const fr_req = { "sender": sender, "receiver": receiver }
        chai.request(server)
            .post('/find')
            .send(fr_req)
            .then((res) => {
                res.should.have.status(400);
                let obj = databaseHandler.find_all();
                obj.then((r) => {
                    let user_sender = r.find(elem => elem.username === sender)
                    let user_receiver = r.find(elem => elem.username === receiver)

                    assert.equal(user_sender.friends[0], receiver)
                    assert.equal(user_receiver.friends[0], sender)
                    assert.equal(user_sender.received_req.length, 0)
                    assert.equal(user_receiver.sent_req.length, 0)
                    done();
                })
            })
    });
});


describe('PUT for /find same as before', () => {
    it('Should have status code 400,since they are already friends', (done) => {
        const sender = "Kasper";
        const receiver = "Andrei";
        const fr_req = { "sender": sender, "receiver": receiver }
        chai.request(server)
            .put('/find')
            .send(fr_req)
            .then((res) => {
                res.should.have.status(400);
                let obj = databaseHandler.find_all();
                obj.then((r) => {
                    let user_sender = r.find(elem => elem.username === sender)
                    let user_receiver = r.find(elem => elem.username === receiver)

                    assert.equal(user_sender.friends[0], receiver)
                    assert.equal(user_receiver.friends[0], sender)
                    assert.equal(user_receiver.friends.length, 1)
                    assert.equal(user_receiver.friends.length, 1)
                    assert.equal(user_sender.sent_req.length, 0)
                    assert.equal(user_receiver.received_req.length, 0)
                    done();
                })
            })
    });
});


describe('POST for /profile to self', () => {
    it('Should have status code 200, add message to Kasper', (done) => {
        const from = "Kasper";
        const content = "Hello there";
        const message = { content: content, from: from}
        chai.request(server)
            .post('/profile/Kasper')
            .send(message)
            .then((res) => {
                res.should.have.status(200);
                let obj = databaseHandler.find_user({ username: from });
                obj.then((r) => {
                    r.username.should.be.equal(from);
                    r.messages.length.should.be.equal(1);
                    assert.equal(r.messages[0].from, from);
                    assert.equal(r.messages[0].to, from);
                    assert.equal(r.messages[0].content, content);
                    done();
                })
            })
    });
});


describe('POST for /profile to self with 0 chars', () => {
    it('Should have status code 400', (done) => {
        const from = "Kasper";
        const content = "";
        const message = { content: content, from: from}
        chai.request(server)
            .post('/profile/Kasper')
            .send(message)
            .then((res) => {
                res.should.have.status(400);
                done();
            })
    });
});



describe('POST for /profile to self with more than 140 chars', () => {
    it('Should have status code 400', (done) => {
        const from = "Kasper";
        const content = "HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello";
        const message = { content: content, from: from}
        chai.request(server)
            .post('/profile/Kasper')
            .send(message)
            .then((res) => {
                res.should.have.status(400);
                done();
            })
    });
});


describe('POST for /profile to friend', () => {
    it('Should have status code 200, add message to Andrei', (done) => {
        const from = "Kasper";
        const content = "Hello there";
        const message = { content: content, from: from}
        chai.request(server)
            .post('/profile/Andrei')
            .send(message)
            .then((res) => {
                res.should.have.status(200);
                let obj = databaseHandler.find_user({ username: "Andrei" });
                obj.then((r) => {
                    console.log(r)
                    r.username.should.be.equal("Andrei");
                    r.messages.length.should.be.equal(2);
                    assert.equal(r.messages[0].from, from);
                    assert.equal(r.messages[0].to, "Andrei");
                    assert.equal(r.messages[0].content, content);
                    done();
                })
            })
    });
})


// describe('GET for /messages/Andrei', () => {
//     it('Should respond with all messages that Andrei has', (done) => {
//         chai.request(server)
//             .get('/messages/Andrei')
//             .then((res) => {
//                 assert.equal(res.body[0].from, "Kasper");
//                 assert.equal(res.body[0].to, "Andrei");
//                 assert.equal(res.body[0].content, "Hello there");
//                 done()
//             })
//     });
// })


// describe('GET for /messages/Andrei', () => {
//     it('Should respond with all messages that Andrei has', (done) => {
//         chai.request(server)
//             .get('/messages/Andrei')
//             .then((res) => {
//                 assert.equal(res.body[0].from, "Kasper");
//                 assert.equal(res.body[0].to, "Andrei");
//                 assert.equal(res.body[0].content, "Hello there");
//                 done()
//             })
//     });
// })


// describe('GET for /friends/Kasper', () => {
//     it('Should respond with all friends that Kasper has', (done) => {
//         chai.request(server)
//             .get('/friends/Kasper')
//             .then((res) => {
//                 assert.equal(res.body.length, 1);
//                 assert.equal(res.body[0], "Andrei");
//                 done();
//             })
//     });
// })


// describe('GET for /friends/UNKNOWN', () => {
//     it('Should respond with all friends that UNKNOWN has', (done) => {
//         chai.request(server)
//             .get('/friends/UNKNOWN')
//             .then((res) => {
//                 assert.equal(res.body.length, 0);
//                 done();
//             })
//     });
// })


describe('GET for /profile/Kasper', () => {
    it('Should respond with Json object of user Kasper', (done) => {
        chai.request(server)
            .get('/profile/Kasper')
            .then((res) => {
                let obj = databaseHandler.find_user({ username: "Kasper" });
                obj.then((r) => {
                    assert.equal(res.body.username, r.username);
                    assert.equal(res.body._id, r._id);
                    done();
                })
            })
    });
})


describe('GET for /profile/UNKNOWN', () => {
    it('Should respond status code 401 since no user with that username', (done) => {
        chai.request(server)
            .get('/profile/UNKNOWN')
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


describe('GET for /find/Kasper', () => {
    it('Should return Kasper user', (done) => {
        chai.request(server)
            .get('/find/Kasper')
            .then((res) => {
                assert.equal(res.body[0].username, "Kasper");
                assert.equal(res.body.length, 1);
                done();
            })
    })
});


describe('GET for /find/kasper', () => {
    it('Should return Kasper user', (done) => {
        chai.request(server)
            .get('/find/kasper')
            .then((res) => {
                assert.equal(res.body[0].username, "Kasper");
                assert.equal(res.body.length, 1);
                done();
            })
    })
});


describe('GET for /find/k', () => {
    it('Should return Kasper user', (done) => {
        chai.request(server)
            .get('/find/k')
            .then((res) => {
                assert.equal(res.body[0].username, "Kasper");
                assert.equal(res.body.length, 1);
                done();
            })
    })
});


describe('GET for /find/a', () => {
    it('Should return [Kasper, Andrei] user', (done) => {
        chai.request(server)
            .get('/find/a')
            .then((res) => {
                assert.equal(res.body[0].username, "Kasper");
                assert.equal(res.body[1].username, "Andrei");
                assert.equal(res.body.length, 2);
                done();
            })
    })
});


describe('GET for /find/none', () => {
    it('Should return empty array', (done) => {
        chai.request(server)
            .get('/find/none')
            .then((res) => {
                assert.equal(res.body.length, 0);
                done();
            })
    })
});


describe('GET for /find/', () => {
    it('Should return all users', (done) => {
        chai.request(server)
            .get('/find/')
            .then((res) => {
                databaseHandler.find_all()
                .then((r) => {
                    assert.equal(res.body.length, r.length);
                    done();
                })
                
            })
    })
});


describe('POST for /update', () => {
    it('Should return a JSON object of requested username', (done) => {
        chai.request(server)
            .post('/update')
            .send({username : "Kasper"})
            .then((res) => {
                let obj = databaseHandler.find_user({ username: "Kasper" });
                obj.then((r) => {
                    assert.equal(res.body._id, r._id);
                    done();
                })
            })
    })
});


describe('POST for /update', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .post('/update')
            .send({username : "Pål"})
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


describe('Illegal function delete', () => {
    it('Should return status code 405', (done) => {
        chai.request(server)
            .delete('/find')
            .send({username : "Pål"})
            .then((res) => {
                assert.equal(res.status, 405);
                done();
            })
    })
});


describe('POST Wrong URL', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .post('/ERROR')
            .send({username : "Pål"})
            .then((res) => {
                assert.equal(res.status, 404);
                done();
            })
    })
});


describe('GET Wrong URL', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .get('/ERROR')
            .then((res) => {
                assert.equal(res.status, 404);
                done();
            })
    })
});


describe('PUT Wrong URL', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .put('/ERROR')
            .then((res) => {
                assert.equal(res.status, 404);
                done();
            })
    })
});


describe('POST /profile json object', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .post('/profile/Kasper')
            .send({from : "Andrei", content: {json : true}, to: "Kasper"})
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


describe('POST /profile json object', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .post('/profile/Kasper')
            .send({from : "Andrei", content: {json : true}, to: "Kasper"})
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


describe('POST /profile string json object', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .post('/profile/Kasper')
            .send({from : "Andrei", content: '{"json" : "true"}', to: "Kasper"})
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


describe('POST /profile json object', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .post('/profile/Kasper')
            .send({from : "Andrei", content: null, to: "Kasper"})
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


describe('POST /profile json object', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .post('/profile/Kasper')
            .send({from : "Andrei", content: "${error}", to: "Kasper"})
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


describe('POST /register user where password done match', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .post('/register')
            .send({username: "Kasper", password: "hello" , password_confirm: "ERROR"})
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


describe('POST /register sending in json object as password', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .post('/register')
            .send({ username: "Lovisa", password: {json: true}, password_confirm: {json: true} })
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


describe('POST /login sending in json object as password', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .post('/login')
            .send({username: "Lovisa", password: {json: true}})
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


describe('POST /find sending in json object as friend-request receiver', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .post('/find')
            .send({sender: "Kasper", receiver: {json: true}})
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


describe('PUT /find sending in json object as friend-accept receiver', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .put('/find')
            .send({sender: "Kasper", receiver: {json: true}})
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


// describe('GET /messages/ and null object as user', () => {
//     it('Should return status code 400', (done) => {
//         chai.request(server)
//             .get('/messages/' + null)
//             .then((res) => {
//                 assert.equal(res.status, 400);
//                 done();
//             })
//     })
// });


// describe('GET /friends/ and null object as user', () => {
//     it('Should return status code 400', (done) => {
//         chai.request(server)
//             .get('/friends/' + null)
//             .then((res) => {
//                 assert.equal(res.status, 400);
//                 done();
//             })
//     })
// });


describe('GET /profile/ and null object as user', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .get('/profile/' + null)
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


describe('GET /find/ and null object as user', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .get('/find/' + null)
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});



describe('POST /update json-object as username', () => {
    it('Should return status code 400', (done) => {
        chai.request(server)
            .post('/update')
            .send({username : {JSON: true}})
            .then((res) => {
                assert.equal(res.status, 400);
                done();
            })
    })
});


// close database and exit app
after(() => {
    databaseHandler.closeDb()
    .then(exit());
});





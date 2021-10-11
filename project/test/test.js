const assert = require('assert');
let server = require('../src/server/server.js');
const { exit } = require('process');
let databaseHandler = require('../src/server/database.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);


describe('POST for /register', () => {
    it('Should have status code 200 and add one user to database', (done) => {
        let query = { username: "Kasper", password: "123456" };
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
        let query = { username: "Andrei", password: "Hello" };
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
                    assert.equal(user_sender.sent_req.length, 1)
                    done();
                })
            })
    });
});


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


describe('POST for /profile to self', () => {
    it('Should have status code 200, add message to John', (done) => {
        const from = "Kasper";
        const content = "Hello there";
        const message = { content: content, from: from, to: from }
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


describe('POST for /profile to friend', () => {
    it('Should have status code 200, add message to Andrei', (done) => {
        const from = "Kasper";
        const content = "Hello there";
        const to = "Andrei";
        const message = { content: content, from: from, to: to }

        chai.request(server)
            .post('/profile/Andrei')
            .send(message)
            .then((res) => {
                res.should.have.status(200);
                let obj = databaseHandler.find_user({ username: to });
                obj.then((r) => {
                    r.username.should.be.equal(to);
                    r.messages.length.should.be.equal(1);
                    assert.equal(r.messages[0].from, from);
                    assert.equal(r.messages[0].to, to);
                    assert.equal(r.messages[0].content, content);
                    done();
                })
            })
    });
})


describe('GET for /messages/Andrei', () => {
    it('Should respond with all messages that Andrei has', (done) => {
        chai.request(server)
            .get('/messages/Andrei')
            .then((res) => {
                assert.equal(res.body[0].from, "Kasper");
                assert.equal(res.body[0].to, "Andrei");
                assert.equal(res.body[0].content, "Hello there");
                done()
            })
    });
})


describe('GET for /messages/Andrei', () => {
    it('Should respond with all messages that Andrei has', (done) => {
        chai.request(server)
            .get('/messages/Andrei')
            .then((res) => {
                assert.equal(res.body[0].from, "Kasper");
                assert.equal(res.body[0].to, "Andrei");
                assert.equal(res.body[0].content, "Hello there");
                done()
            })
    });
})


describe('GET for /friends/Kasper', () => {
    it('Should respond with all friends that Kasper has', (done) => {
        chai.request(server)
            .get('/friends/Kasper')
            .then((res) => {
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0], "Andrei");
                done();
            })
    });
})


describe('GET for /friends/UNKNOWN', () => {
    it('Should respond with all friends that UNKNOWN has', (done) => {
        chai.request(server)
            .get('/friends/UNKNOWN')
            .then((res) => {
                assert.equal(res.body.length, 0);
                done();
            })
    });
})


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


describe('POST for /update', () => {
    it('Should return a JSON object of requested username', (done) => {
        chai.request(server)
            .post('/update')
            .send({username : "Kasper"})
            .then((res) => {
                assert.equal(res.body.username, "Kasper")
                done();
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
// TODO TESTS

// test to post to nonexistet user --fail
// test for post to nonfriend --ok
// test for post with 0 chars --fail
// register user with nonmatching passwords --fail
// register user with username already take --fail
// ? test to post to a friend profile as a different person
// ----client side 
// log in to existing user but wrong password
// log in to non-existing user

// close database and exit app
after(() => {
    databaseHandler.closeDb();
    exit();
});





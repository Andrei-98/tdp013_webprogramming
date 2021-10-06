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
                let obj = databaseHandler.find_user(query.username);
                obj.then((r) => {
                    console.log(r);
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
                let obj = databaseHandler.find_user(query.username);
                obj.then((r) => {
                    console.log(r)
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
                let obj = databaseHandler.find_user(query.username);
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
                let obj = databaseHandler.find_user(query.username);
                obj.then((r) => {
                    console.log(r);
                    assert.equal(r,null);
                    done();
                })
            })
    });
});

describe('PUT for /profile', () => {
    it('Should have status code 200 and have a pending request for both sender and receiver', (done) => {
        const sender = "Kasper";
        const receiver = "Andrei";
        const fr_req = {"sender" : sender, "receiver" : receiver}
        chai.request(server)
            .put('/profile')
            .send(fr_req)
            .then((res) => {
                res.should.have.status(200);
                done();
            })
    });
});

describe('PUT for /profile/fr', () => {
    it('Should have status code 200, remove requests from list and add friends', (done) => {
        const sender = "Kasper";
        const receiver = "Andrei";
        const fr_req = {"sender" : sender, "receiver" : receiver}
        chai.request(server)
            .put('/profile/fr')
            .send(fr_req)
            .then((res) => {
                res.should.have.status(200);
                done();
            })
    });
});


describe('POST for /profile from logged in user', () => {
    it('Should have status code 200, add message to John', (done) => {
        const from = "John";
        const content = "Hello there";

        const message = {content: content, from: from}

        chai.request(server)
            .post('/profile')
            .send(message)
            .then((res) => {
                res.should.have.status(200);
                let obj = databaseHandler.find_user(from);
                obj.then((r) => {
                    r.username.should.be.equal(from);
                    r.messages.should.be.equal(message)
                    console.log(r.messages)
                    done();
                })
                //databaseHandler.dropColl()
                done();
            })
    });
});


// describe('POST to friend /profile/Andrei from user logged in as John', () => {
//     it('Should have status code 200, add message to John', (done) => {
//         const from = "John";
//         const content = "Hello there";

//         const message = {content: content, from: from}

//         chai.request(server)
//             .post('/profile')
//             .send(message)
//             .then((res) => {
//                 res.should.have.status(200);
//                 let obj = databaseHandler.find_user(from);
//                 obj.then((r) => {
//                     r.username.should.be.equal(from);
//                     r.messages.should.be.equal(message)
//                     console.log(r.messages)
//                     done();
//                 })
//                 //databaseHandler.dropColl()
//                 done();
//             })
//     });
// })

// TODO TESTS
// test get friends
// test get messages 
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





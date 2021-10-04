const assert = require('assert');
let server = require('../src/server/server');
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
                    r.username.should.be.equal(query.username);
                    r.password.should.be.equal(query.password);
                    done();
                })
            })
    });
});

describe('POST for /', () => {
    it('Should have status code 200 and return correct user', (done) => {
        let query = { username: "Kasper", password: "123456" };
        chai.request(server)
            .post('/')
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

describe('POST for /', () => {
    it('Should have status code 401 and return null', (done) => {
        let query = { username: "Fredrik", password: "123456" };
        chai.request(server)
            .post('/')
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

// close database and exit app
after(() => {
    databaseHandler.closeDb();
    exit();
});





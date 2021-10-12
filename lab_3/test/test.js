const assert = require('assert'); 
let server = require('../lib/server.js');
const { exit } = require('process');
let databaseHandler = require('../lib/database.js');

const chai = require('chai')
const chaiHttp = require('chai-http');
const { copyFileSync } = require('fs');
chai.should()
chai.use(chaiHttp)

describe("all tests", () => {

    before((done) => {
        server.use(async () => {
            await databaseHandler.dropColl();
            done();
        })
    })
});

describe('POST for /messages', () => { 
    it('Should have status code 200 and add one message to database', (done) => {
        let query = {"id" : 10, "content" : "Yes", "isRead" : false}
        chai.request(server)
        .post( '/messages' )
        .send(query)
        .then((res) => {
            res.should.have.status(200);
            chai.request(server)
            .get('/messages/10')
            .then(res2 => {
                String(query).should.be.equal(String(res2.body));
                done();
            })
        })
    });
});
    

describe('PUT for /messages{id}', () => { 
    it('Should have status code 200 and change isRead to true', (done) => {
        let query ={"id" : 10};
        chai.request(server)
        .put( "/messages/" + query.id)
        .then(res1 => {
            res1.should.have.status(200);
            chai.request(server)
             .get('/messages/' + query.id)
             .then(res2 => {
                res2.body.isRead.should.be.equal(true);
                done();
             })
        })
    })
});


describe('PUT for /messages{id} again same id', () => { 
    it('Should have status code 200 and change isRead to false', (done) => {
        let query ={"id" : 10};
        chai.request(server)
        .put( "/messages/" + query.id)
        .then(res1 => {
            res1.should.have.status(200);
            chai.request(server)
             .get('/messages/' + query.id)
             .then(res2 => {
                res2.body.isRead.should.be.equal(false);
                done();
             })
        })
    })
});


describe('POST /messages, add 3 messages and find them in database', () => { 
    describe('add first message', () => {
        it('visible in database and only one message is stored', (done) => {
            let query = {"id" : 1, "content" : "One", "isRead" : false}
            let val = databaseHandler.dropColl();
            val.then(() => {
                chai.request(server)
                .post("/messages")
                .send(query)
                .then(res => {
                    res.should.have.status(200);
                    chai.request(server)
                    .get("/messages")
                    .then((res2) => {
                        String(query).should.be.equal(String(res2.body[0]));
                        res2.body.length.should.be.equal(1);
                        done();
                    })
                })
            })
        })
     });
    describe('add second message', () => {
        it('visible in database and two messages is stored', (done) => {
            let query = {"id" : 2, "content" : "Two", "isRead" : false}
            chai.request(server)
            .post("/messages")
            .send(query)
            .then(res => {
                res.should.have.status(200);
                chai.request(server)
                .get("/messages")
                .then((res2) => {
                    String(query).should.be.equal(String(res2.body[1]));
                    res2.body.length.should.be.equal(2);
                    done();
                })
            })
        })
    });
    describe('add third message', () => {
        it('visible in database and three messages is stored', (done) => {
            let query = {"id" : 3, "content" : "Three", "isRead" : false}
            chai.request(server)
            .post("/messages")
            .send(query)
            .then(res => {
                res.should.have.status(200);
                chai.request(server)
                .get("/messages")
                .then((res2) => {
                    String(query).should.be.equal(String(res2.body[2]));
                    res2.body.length.should.be.equal(3);
                    done();
                })
            })
        })
    });
});


describe('PUT for /messages{id}, only one message is changed', () => { 
    it('Should have status code 200 and only one message in database has isRead changed', (done) => {
        chai.request(server)
        .put( "/messages/" + 1 )
        .then(res => {
            res.should.have.status(200);
            chai.request(server)
            .get("/messages")
            .then((res2) => {
                res2.body[0].isRead.should.be.equal(true);
                res2.body[1].isRead.should.be.equal(false);
                res2.body[2].isRead.should.be.equal(false);
                done();
            })
        })
    })
});


describe('PUT for /messages{id}, trying to change isRead on message that doesnt exist', () => { 
    it('Should return status code 400 and no message in database is changed', (done) => {
        chai.request(server)
        .put( "/messages/" + 4)
        .then(res => {
            res.should.have.status(400);
            chai.request(server)
            .get("/messages")
            .then((res2) => {
                res2.body[0].isRead.should.be.equal(true);
                res2.body[1].isRead.should.be.equal(false);
                res2.body[2].isRead.should.be.equal(false);
                done();
            })
        })
    })
});


describe('POST for /messages, requesting message in wrong format, wrong keys in json', () => { 
    it('Should have status code 400 and not exist in database', (done) => {
        let query = {"id" : 10, "content" : "Yes", "WRONG" : false};
        chai.request(server)
        .post( '/messages' )
        .send(query)
        .then(res => {
            res.should.have.status(400);
            chai.request(server)
            .get("/messages/" + query.id)
            .then((res2) => {
                assert.equal(res2.body, null);
                done();
            })
        })
    })
});


describe('POST for /messages, requesting message in wrong format as string', () => { 
    it('Should have status code 400', (done) => {
        chai.request(server)
        .post( '/messages' )
        .send( "hello")
        .then(res => {
            res.should.have.status(400);
            done();
        })
    })
});


describe('PUT for /messages, request url is wrong', () => { 
    it('Should have status code 400', (done) => {
        chai.request(server)
        .put( '/WRONG' )
        .then(res => {
            res.should.have.status(404);
            done();
        })
    })
});


describe('POST for /messages, requesting message in wrong format, wrong value', () => { 
    it('Should have status code 400 and not exist in database', (done) => {
        let query = {"id" : 10, "content" : "Yes", "WRONG" : false};
        chai.request(server)
        .post( '/messages' )
        .send(query)
        .then(res => {
            res.should.have.status(400);
            chai.request(server)
            .get("/messages/" + query.id)
            .then((res2) => {
                assert.equal(res2.body, null);
                done();
            })
        })
    })
});


describe('POST for /messages, requesting message in wrong format, wrong value', () => { 
    it('Should have status code 400 and not exist in database', (done) => {
        let query = {"id" : 10, "content" : "Yes", "isRead" : {"WRONG" : false}};
        chai.request(server)
        .post( '/messages' )
        .send(query)
        .then(res => {
            res.should.have.status(400);
            chai.request(server)
            .get("/messages/" + query.id)
            .then((res2) => {
                assert.equal(res2.body, null);
                done();
            })
        })
    })
});


describe('Using wrong request-method', () => { 
    it('Should have status code 405', (done) => {
        chai.request(server)
        .delete('/messages')
        .then(res => {
            res.should.have.status(405);
            done();
        })
    })
});


describe('Using wrong request-method', () => { 
    it('Should have status code 405', (done) => {
        chai.request(server)
        .delete('/messages/1')
        .then(res => {
            res.should.have.status(405);
            done();
        })
    })
});


describe('Using wrong request-url', () => { 
    it('Should have status code 404', (done) => {
        chai.request(server)
        .post('/mess')
        .then(res => {
            res.should.have.status(404);
            done();
        })
    })
});


describe('POST malicious msg with content as JSON object', () => { 
    it('Should have status code 400, Bad request', (done) => {
        let malicious_query = {"id" : 9991, "content" : {"hacking" : true}, "isRead" : false};
        chai.request(server)
        .post('/messages')
        .send(malicious_query)
        .then(res => {
            res.should.have.status(400)
            done();
        })
    })
});


describe('POST malicious msg with content as JSON object', () => { 
    it('Should have status code 400, Bad request', (done) => {  
        let malicious_query = {"id" : 9991, "content" : "${console.log(exploit)}", "isRead" : false};
        chai.request(server)
        .post('/messages')
        .send(malicious_query)
        .then(res => {
            res.should.have.status(400)
            done();
        })
    })
});


describe('GET on non-existent function /hi', () => { 
    it('Should return status 404, Not found', (done) => {
        chai.request(server)
        .get( '/hi' )
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    })
});

/*
FROM SERVER:
    'Access-Control-Allow-Origin'  = '*'
    'Access-Control-Allow-Headers' = 'Origin, X-Requested-With, Content-Type, Accept'
    'Access-Control-Allow-Methods' = 'POST, GET, PUT, OPTIONS'
*/

describe('Check that cors-headers are equal to servers configuration', () => { 
    it('Headers should have same preset', (done) => {
        chai.request(server)
        .post( '/messages' )
        .send({"id" : 99, "content" : "1234", "isRead" : false})
        .end((err, res) => {
            assert.equal('*', res.header['access-control-allow-origin']);
            assert.equal('Origin, X-Requested-With, Content-Type, Accept', res.header['access-control-allow-headers']);
            assert.equal('POST, GET, PUT, OPTIONS', res.header['access-control-allow-methods']); 
            done();
        });
    })
});


// close database and exit app
after(() => {
    databaseHandler.closeDb()
    .then(() => {exit()});
});

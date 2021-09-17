const assert = require('assert'); 
let server = require('../server.js');
let databaseHandler = require('../database.js');

const chai = require('chai')
const chaiHttp = require('chai-http');
const { exit } = require('process');

chai.should()
chai.use(chaiHttp)

// POST PUT KASPER
// GET ANDREI


describe('POST for /messages', () => { 
    it('Should have status code 200 and add one message to database', (done) => {
        databaseHandler.dropColl();
        chai.request(server)
        .post( '/messages' )
        .send( {"id" : 10, "content" : "Yes", "isRead" : false})
        .then(res => {
            let query = {"id" : 10, "content" : "Yes", "isRead" : false};
            res.should.have.status(200);
            db.collection("messages").findOne(query,{projection:{_id:0}}, (err, result) => {
                if (err) 
                {
                    done(err);
                }
                String(query).should.be.equal(String(result));
                done();
            })
            })
        .catch(err => {
            done(err);
        })
    })
});
    
describe('PUT for /messages{id}', () => { 
    it('Should have status code 200 and change isRead to true', (done) => {
        chai.request(server)
        .put( "/messages/" + 10 )
        .then(res => {
            let query = {"id" : 10}
            res.should.have.status(200);
            db.collection("messages").findOne(query, (err, result) => {
                if (err)
                {
                    done(err);
                }
                result.isRead.should.be.equal(true);
                done();
            })
        })
        .catch(err => {
            done(err);
        })
        
    })
});

describe('PUT for /messages{id} again sam id', () => { 
    it('Should have status code 200 and change isRead to false', (done) => {
        chai.request(server)
        .put( "/messages/" + 10 )
        .then(res => {
            let query = {"id" : 10}
            res.should.have.status(200);
            db.collection("messages").findOne(query, (err, result) => {
                if (err)
                {
                    done(err);
                }
                result.isRead.should.be.equal(false);
                done();
            })
        })
        .catch(err => {
            done(err);
        })
    })
});

describe('POST /messages, add 3 messages and find them in database', () => { 
    describe('add first message', () => {
        it('visible in database and only one message is stored', (done) => {
            databaseHandler.dropColl();
            chai.request(server)
            .post("/messages")
            .send({"id" : 1, "content" : "One", "isRead" : false})
            .then(res => {
                let query = {"id" : 1, "content" : "One", "isRead" : false};
                res.should.have.status(200);
                db.collection("messages").find(query,{projection:{_id:0}}).toArray((err, result)=> {
                    if (err) 
                    {
                        done(err);
                    }
                    String(query).should.be.equal(String(result[0]));
                    result.length.should.be.equal(1);
                    done();
                })
            })
            .catch(err => {
                done(err);
            })
        })
    });
    describe('add second message', () => {
        it('visible in database and two messages is stored', (done) => {
            chai.request(server)
            .post("/messages")
            .send({"id" : 2, "content" : "Two", "isRead" : false})
            .then(res => {
                let query = {"id" : 2, "content" : "Two", "isRead" : false};
                res.should.have.status(200);
                db.collection("messages").find({},{projection:{_id:0}}).toArray((err, result)=> {
                    if (err) 
                    {
                        done(err);
                    }
                    String(query).should.be.equal(String(result[1]));
                    result.length.should.be.equal(2);
                    done();
                })
            })
            .catch(err => {
                done(err);
            })
        })
    });
    describe('add third message', () => {
        it('visible in database and three messages is stored', (done) => {
            chai.request(server)
            .post("/messages")
            .send({"id" : 3, "content" : "Three", "isRead" : false})
            .then(res => {
                let query = {"id" : 2, "content" : "Three", "isRead" : false};
                res.should.have.status(200);
                db.collection("messages").find({},{projection:{_id:0}}).toArray((err, result)=> {
                    if (err) 
                    {
                        done(err);
                    }
                    String(query).should.be.equal(String(result[2]));
                    result.length.should.be.equal(3);
                    done();
                })
            })
            .catch(err => {
                done(err);
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
            db.collection("messages").find({}).toArray((err, result) => {
                if (err)
                {
                    done(err);
                }
                result[0].isRead.should.be.equal(true);
                result[1].isRead.should.be.equal(false);
                result[2].isRead.should.be.equal(false);
                done();
            })
        })
        .catch(err => {
            done(err);
        })
    })
});


describe('PUT for /messages{id}, trying to change isRead on message that doesnt exist', () => { 
    it('Should return status code 400 and no message in database is changed', (done) => {
        chai.request(server)
        .put( "/messages/" + 4)
        .then(res => {
            res.should.have.status(400);
            db.collection("messages").find({}).toArray((err, result) => {
                if (err)
                {
                    done(err);
                }
                result[0].isRead.should.be.equal(true);
                result[1].isRead.should.be.equal(false);
                result[2].isRead.should.be.equal(false);
                done();
            })
        })
        .catch(err => {
            done(err);
        })
    })
});

describe('POST for /messages, requesting message in wrong format, wrong keys in json', () => { 
    it('Should have status code 400 and not exist in database', (done) => {
        chai.request(server)
        .post( '/messages' )
        .send( {"id" : 10, "content" : "Yes", "WRONG" : false})
        .then(res => {
            let query = {"id" : 10, "content" : "Yes", "WRONG" : false};
            res.should.have.status(400);
            db.collection("messages").findOne(query,{projection:{_id:0}}, (err, result) => {
                if (err) 
                {
                    done(err);
                }
                assert.equal(result,null);
                done();
            })
            })
        .catch(err => {
            done(err);
        })
    })
});

describe('POST for /messages, requesting message in wrong format as string', () => { 
    it('Should have status code 400 and not exist in database', (done) => {
        chai.request(server)
        .post( '/messages' )
        .send( "hello")
        .then(res => {
            let query = {"id" : 120, "content" : {"not": 1}, "isRead" : false};
            res.should.have.status(400);
            db.collection("messages").findOne(query,{projection:{_id:0}}, (err, result) => {
                if (err) 
                {
                    done(err);
                }
                assert.equal(result, null);
                done();
            })
            })
        .catch(err => {
            done(err);
        })
    })
});

describe('POST for /messages, requesting message in wrong format, wrong value', () => { 
    it('Should have status code 400 and not exist in database', (done) => {
        chai.request(server)
        .post( '/messages' )
        .send( {"id" : 10, "content" : "Yes", "WRONG" : false})
        .then(res => {
            let query = {"id" : 10, "content" : "Yes", "isRead" : {"WRONG" : false}};
            res.should.have.status(400);
            db.collection("messages").findOne(query,{projection:{_id:0}}, (err, result) => {
                if (err) 
                {
                    done(err);
                }
                assert.equal(result,null);
                done();
            })
            })
        .catch(err => {
            done(err);
        })
    })
});

describe('POST for /messages, requesting message in wrong format, wrong value', () => { 
    it('Should have status code 400 and not exist in database', (done) => {
        chai.request(server)
        .post( '/messages' )
        .send( {"id" : 10, "content" : "Yes", "WRONG" : false})
        .then(res => {
            let query = {"id" : 10, "content" : "Yes", "isRead" : {"WRONG" : false}};
            res.should.have.status(400);
            db.collection("messages").findOne(query,{projection:{_id:0}}, (err, result) => {
                if (err) 
                {
                    done(err);
                }
                assert.equal(result,null);
                done();
            })
            })
        .catch(err => {
            done(err);
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
        .catch(err => {
            done(err);
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
        .catch(err => {
            done(err);
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
        .catch(err => {
            done(err);
        })
    })
});

after(() => {
    databaseHandler.closeDb(); 
    exit();
})
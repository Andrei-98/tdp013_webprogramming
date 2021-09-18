const assert = require('assert'); 
let server = require('../server.js');
const { exit } = require('process');
let databaseHandler = require('../database.js');

const chai = require('chai')
const chaiHttp = require('chai-http');

chai.should()
chai.use(chaiHttp)


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


describe('POST malicious msg with content as JSON object', () => { 
    it('Should have status code 400, Bad request', (done) => {
        let db = databaseHandler.getDb();
        db.collection("messages").drop();
        
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
        let db = databaseHandler.getDb();
        db.collection("messages").drop();
        
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


describe('GET all /messages', () => { 
    it('Should return an array with 2 messages', (done) => {
        let db = databaseHandler.getDb();
        db.collection("messages").drop();
        
        let query1 = {"id" : 1, "content" : "Msg1", "isRead" : false};
        let query2 = {"id" : 1, "content" : "Msg2", "isRead" : false};

        db.collection('messages').insertOne(query1);
        db.collection('messages').insertOne(query2);

        chai.request(server)
        .get( '/messages' )
        .end(function(err, res) {
            res.should.have.status(200);

            db.collection("messages").find({}).toArray()
                .then(result => {
                    assert.equal(2, result.length);
                    done();

                })
                .catch(err => {
                    done(err);
                })

        
          });
        
    })
});


describe('GET on non-existent function /hi', () => { 
    it('Should return status 404, Not found', (done) => {
        chai.request(server)
        .get( '/hi' )
        .end(function(err, res) {
            res.should.have.status(404);
            done();
            });
    })
});


describe('GET on specific MSG id', () => { 
    it('Should return status 200, OK', (done) => {
        chai.request(server)
        .get( '/messages/1' )
        .end(function(err, res) {
            res.should.have.status(200);

            let msg1_id = res.body.id;
            let msg1_content = res.body.content;

            assert.equal(msg1_id,1);
            assert.equal(msg1_content, "Msg1");

            console.log(msg1_content);
            done();
            });
    })
});

// close database
after(() => {
    databaseHandler.closeDb(); 
    exit();
});
  

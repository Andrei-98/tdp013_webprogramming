// const assert = require('assert') 
// describe('Array', () => { 
//   describe('#indexOf()', () => { 
//     it('should return -1 when the value is not present', () => { 
//       assert.equal([1, 2, 3].indexOf(4), -1) 
//     }) 
//   }) 
// })

// describe('Array', () => { 
//     describe('#indexOf()', () => { 
//       it('should return -1 when the value is not present', (done) => { 
//         assert.equal([1, 2, 3].indexOf(4), -1); 
//         done(); 
//       }) 
//     }) 
//   })

// const should = require('should') 
 
// describe("should", () => {
//     let user = { 
//         name: "John", 
//         pets: ["Jane", "Pete", "Mary"] 
//     } 
//    it("should", () => {
//     assert(user.should.have.property("name", "John"))
//     assert(user.should.have.property("pets").with.lengthOf(3))
// })
// })

const assert = require('assert'); 
let server = require('../server.js');
const { exit } = require('process');
let databaseHandler = require('../database.js');

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

// POST PUT KASPER
// GET ANDREI

describe('POST for /messages', () => { 
    it('Should have status code 200 and add message to database', (done) => {
        chai.request(server)
        .post( '/messages' )
        .send( {"id" : 10, "content" : "Yes", "isRead" : false})
        .then(res => {
            let db = databaseHandler.getDb();
            let query = {"id" : 10, "content" : "Yes", "isRead" : false};
            res.should.have.status(200);
            db.collection("messages").findOne(query,{projection:{_id:0}}, (err, result) => {
            if (err) 
            {
                done(err);
            }
                assert.equal(String(query),String(result));
                done();
            })
         })
        .catch(err => {
            done(err);
        })
    })
});

// describe('PUT for /messages{id}', () => { 
//     it('Should have status code 200 and change isRead to true', () => {
//         return chai.request(server)
//         .put( "/messages/" + 10 )
//         .then(res => {
//             let db = databaseHandler.getDb();
//             let query = {"id" : 10};
//             res.should.have.status(200);
//             db.collection("messages").findOne(query,{projection:{_id:0}}, (err, result) => {
//             if (err) 
//             {
//                 return console.log(err);
//             }
//                 assert.equal(result.isRead, true);
//                 return result;
//             })
//         })
//         .catch(err => {
//             throw err;
//         })
//     })
// });


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
            //let msg1_isRead = res.body.isRead;

            assert.equal(msg1_id,1);
            assert.equal(msg1_content, "Msg1");
            //assert.equal()

            console.log(msg1_content);
            done();
            });
    })
});







// describe('GET on non-existent function "/hi', () => { 
    
// });


after(() => {
    databaseHandler.closeDb(); 
    exit();
  });
  
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
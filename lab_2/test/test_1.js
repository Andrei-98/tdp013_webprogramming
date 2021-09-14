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


//const databaseHandler = require('../database.js');
const assert = require('assert'); 
let server = require('../server.js');
let databaseHandler = require('../database.js');
// test/registration.spec.js
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

let db;

console.log(db);
//let db = server.db;
describe('POST for /messages', () => { 
    it('Should add message to database', () => {
        databaseHandler.dropColl();
        return chai.request(server)
        .post( '/messages' )
        .send( {"id" : 2, "content" : "Yes", "isRead" : false})
        .then(res => {
            res.should.have.status(200);
        })
        .catch(err => {
            throw err;
        })
    })
});
        // .try {
        //     superagent
        //         .post( '/messages' )
        //         .accept('application/json')
        //         .field('data', JSON.stringify({
        //             "id" : 1,
        //             "content":"HEY",
        //             "isRead":true
        //         }));
        // }
        // catch ( ex ) {
        //     // .catch() stuff
        // }
    //     let message = db.collection("messages").find({
    //         "id" : 1,
    //         "content":"HEY",
    //         "isRead":true
    //     })
    // assert.equal(message, {
    //     "id" : 1,
    //     "content":"HEY",
    //     "isRead":true
    // } ) 
    // }) 
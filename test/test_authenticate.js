let mongoose = require('mongoose');
let User = require('../models/User');

// Dev Dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let assert = chai.assert;

chai.use(chaiHttp);

describe('API authentication', () => {
    /*
    ** Testing the signin /POST route
    */
    it('it should sign in an existing user', (done) => {
        const newUser = new User({
            username: "test",
            password: "test"
        })

        newUser.save()
            .then(() => {
                chai.request(server)
                    .post('/api/signin')
                    .send({
                        username: "test",
                        password: "test"
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property("message").eql("User authentication successful");
                        res.body.should.have.property("token");
                        done();
                    })
            })
    })
})
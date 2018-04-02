const mongoose = require('mongoose');
const moment = require('moment');
const User = require('../models/User');

// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const assert = chai.assert;

chai.use(chaiHttp);

describe('API authentication', () => {
    /*
    ** Testing the signin /POST route
    */
    it('POST /api/signin should send back a token if successful', (done) => {
        const newUser = new User({
            username: "test",
            password: "test",
            name: "test",
            joined: moment().format()
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
let mongoose = require('mongoose');
let User = require('../models/User');

// Dev Dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let assert = chai.assert;

chai.use(chaiHttp);

describe('API endpoint: /api/sensors', () => {
    /*
    ** Testing the user /POST route
    */
    it('it should POST an user', (done) => {
        const newUserProps = {
            username: "test",
            password: "test"
        }

        User.count()
            .then(count => {
                chai.request(server)
                    .post('/api/user')
                    .send(newUserProps)
                    .end(() => {
                        User.count().then(newCount => {
                            assert(count + 1 === newCount);
                            done();
                        })
                    })
            })
    })

    /*
    ** Testing the user /GET route
    */
    it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message").eql("GET all users request successful");
                done();
            })
    })

    it('it should GET an user by username', (done) => {
        const newUser = new User({
            username: 'test',
            password: 'test'
        })

        newUser.save()
            .then(() => {
                chai.request(server)
                    .get('/api/user/test')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property("message").eql("GET user by username request successful");
                        res.body.user.should.have.property("username").eql("test");
                        done();
                    })
            })
    })

    /*
    ** Testing the user /DELETE route
    */
    it('it should DELETE an existing username', (done) => {
        const newUser = new User({
            username: 'test',
            password: 'test'
        })

        newUser.save()
            .then(() => {
                chai.request(server)
                    .delete(`/api/user/${newUser._id}`)
                    .end(() => {
                        User.findOne({ _id: newUser._id})
                            .then((user) => {
                                assert(user === null);
                                done()
                            })
                    })
            })
    })
})
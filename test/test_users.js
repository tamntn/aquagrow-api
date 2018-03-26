const mongoose = require('mongoose');
const User = mongoose.model('users');
const System = mongoose.model('system');

// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const assert = chai.assert;

chai.use(chaiHttp);

describe('API endpoint: /api/users', () => {
    /*
    ** Testing the user /POST route
    */
    it('POST /api/user should create a new user', (done) => {
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
    it('GET /api/users should get a list of all users', (done) => {
        const newUser = new User({
            username: "test",
            password: "test"
        });

        newUser.save()
            .then(() => {
                chai.request(server)
                    .get('/api/users')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property("message").eql("GET all users request successful");
                        res.body.users.should.have.lengthOf(1);
                        res.body.users.should.not.have.property("password");
                        done();
                    })
            })
    })

    it('GET /api/user/:username should get a user', (done) => {
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
    it('DELETE /api/user/:id should delete an existing user', (done) => {
        const newUser = new User({
            username: 'test',
            password: 'test'
        })

        newUser.save()
            .then(() => {
                chai.request(server)
                    .delete(`/api/user/${newUser._id}`)
                    .end(() => {
                        User.findOne({ _id: newUser._id })
                            .then((user) => {
                                assert(user === null);
                                done()
                            })
                    })
            })
    })

    it('DELETE /api/user/:id should also delete the system associated with that user', (done) => {
        const newUser = new User({
            username: "test",
            password: "test"
        })

        const newSystem = new System()
        newSystem.user = newUser;

        Promise.all([
            newUser.save(),
            newSystem.save()
        ]).then(() => {
            chai.request(server)
                .delete(`/api/user/${newUser._id}`)
                .end(() => {
                    System.findOne({ _id: newSystem._id })
                        .then((system) => {
                            assert(system === null);
                            done();
                        })
                })
        })
    })
})
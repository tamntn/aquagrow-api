const mongoose = require('mongoose');
const moment = require('moment');
const System = mongoose.model('system');
const User = mongoose.model('users');
const Sensor = mongoose.model('sensors');

// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const assert = chai.assert;

chai.use(chaiHttp);

describe('API endpoint: /api/system', () => {
    let newUser, newSystem, newSensorData;

    // Create a new system associated with an user and have one sensor data
    beforeEach((done) => {
        newUser = new User({
            username: "test",
            password: "test",
            name: "test",
            joined: moment().format()
        })

        newSystem = new System()

        newSensorData = new Sensor({
            airTemp: '123',
            airHumidity: '456',
            lightIntensity: '85',
            waterTemp: '75'
        })

        newSystem.user = newUser;
        newSystem.sensorData.push(newSensorData);

        Promise.all([
            newUser.save(),
            newSensorData.save(),
            newSystem.save()
        ]).then(() => done())
    })

    /*
    ** Testing system association
    */
    it('A system should have relations with a user and sensor data', (done) => {
        System.findOne({ _id: newSystem._id })
            .populate('user', 'username') // Only fetch username from user
            .populate('sensorData')
            .then((system) => {
                assert(system.user.username === 'test');
                assert(system.sensorData[0].airTemp === '123');
                done();
            })
    })

    /*
    ** Testing the user /GET route
    */
    it('GET /api/system/:username should return system information associated with an existing user', (done) => {
        chai.request(server)
            .get(`/api/system/${newUser.username}`)
            .end((err, response) => {
                response.body.should.have.property('message').eql('System GET request successful');
                done();
            })
    })

    /*
    ** Testing the user /POST route
    */
    it('POST /api/system should create a new system and assign it to an existing user', (done) => {
        const joe = new User({
            username: 'joe',
            password: 'joe',
            name: 'joe',
            joined: moment().format()
        })

        // Save Joe and then create new system and assign it to Joe
        joe.save()
            .then(() => {
                System.count()
                    .then(count => {
                        chai.request(server)
                            .post('/api/system')
                            .send({ username: joe.username })
                            .end((err, response) => {
                                assert(response.body.data.user.username === 'joe')
                                System.count().then(newCount => {
                                    assert(count + 1 === newCount);
                                    done();
                                })
                            })
                    })
            })
    })

    /*
    ** Testing the user /PUT route
    */
    it('PUT /api/system/:username should update an existing system', (done) => {
        chai.request(server)
            .put(`/api/system/${newUser.username}`)
            .send({
                growLight: true,
                waterPump: true,
                heatingMat: true
            })
            .end((err, response) => {
                System.findOne({ _id: newSystem._id })
                    .then((system) => {
                        assert(system.growLight === true);
                        assert(system.waterPump === true);
                        assert(system.heatingMat === true);
                        done();
                    })
            })
    })
})
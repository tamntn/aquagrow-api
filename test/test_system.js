const mongoose = require('mongoose');
const System = mongoose.model('system');
const User = mongoose.model('users');
const Sensor = mongoose.model('sensors');

// Dev Dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let assert = chai.assert;

chai.use(chaiHttp);

describe('API endpoint: /api/system', () => {
    let newUser, newSystem, newSensorData;

    // Create a new system associated with an user and have one sensor data
    beforeEach((done) => {
        newUser = new User({
            username: "test",
            password: "test"
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
    ** Testing the user /GET route
    */
    it('it should GET system information that is associated to an user', (done) => {
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
    it('it should POST an new system', (done) => {
        const joe = new User({
            username: 'joe',
            password: 'joe'
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

    it('it should save relations between system, sensor and user', (done) => {
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
    ** Testing the user /PUT route
    */
    it('it should UPDATE an existing system', (done) => {
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
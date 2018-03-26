const mongoose = require('mongoose');
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

describe('API endpoint: /api/sensors', () => {
    // beforeEach((done) => {
    //     Sensor.remove({}, (err) => {
    //         done();
    //     })
    // });

    /*
    ** Testing the sensor /GET route
    */
    it('GET request to /api/sensors should be unauthorized without a JWT', (done) => {
        chai.request(server)
            .get('/api/sensors')
            .end((err, res) => {
                res.should.have.status(401);
                done();
            })
    })

    /*
    ** Testing the sensor /POST route
    */
    it('POST request to /api/sensors should return an error without all required fields', (done) => {
        let sensor = {
            airTemp: "34",
            airHumidity: "56",
            lightIntensity: "300"
        }
        chai.request(server)
            .post('/api/sensors')
            .send(sensor)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done();
            });
    });

    it('POST request to /api/sensors should be successful with all required fields', (done) => {
        let sensor = {
            airTemp: "15.75",
            airHumidity: "84.5",
            lightIntensity: "235",
            waterTemp: "11.5"
        }
        chai.request(server)
            .post('/api/sensors')
            .send(sensor)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Sensors POST request successful');
                res.body.data.should.have.property('airTemp');
                res.body.data.should.have.property('airHumidity');
                res.body.data.should.have.property('lightIntensity');
                res.body.data.should.have.property('waterTemp');
                done();
            });
    });

    it('POST request to /api/sensors/:systemId should save sensor data and push sensor data to a system', (done) => {
        let newUser = new User({
            username: "test",
            password: "test"
        })

        let newSystem = new System()
        newSystem.user = newUser;

        Promise.all([
            newUser.save(),
            newSystem.save()
        ]).then(() => {
            let sensor = {
                airTemp: "15.75",
                airHumidity: "84.5",
                lightIntensity: "235",
                waterTemp: "11.5"
            }

            chai.request(server)
                .post(`/api/sensors/${newSystem._id}`)
                .send(sensor)
                .end(() => {
                    System.findOne({ _id: newSystem._id })
                        .then((system) => {
                            assert(system.sensorData[0]._id === sensor._id);
                            done();
                        })
                })
        })
    })

    /*
    ** Testing the sensor /DELETE route
    */
    it('DELETE request to /api/sensors/:id should delete an existing sensor data', (done) => {
        let newSensorData = new Sensor({
            airTemp: "15.75",
            airHumidity: "84.5",
            lightIntensity: "235",
            waterTemp: "11.5"
        })
        newSensorData.save()
            .then(() => {
                chai.request(server)
                    .delete(`/api/sensors/${newSensorData._id}`)
                    .end(() => {
                        Sensor.findOne({ _id: newSensorData._id })
                            .then((sensor) => {
                                assert(sensor === null);
                                done();
                            })
                    })
            })
    })
})
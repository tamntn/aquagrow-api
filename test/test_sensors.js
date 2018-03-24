let mongoose = require('mongoose');
let Sensor = require('../models/Sensor');

// Dev Dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let assert = chai.assert;

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
    it('it should not GET all the sensors without the JWT', (done) => {
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
    it('it should not POST the sensors data without all required fields', (done) => {
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

    it('it should POST the sensor data with all required fields', (done) => {
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

    /*
    ** Testing the sensor /DELETE route
    */
    it('it should DELETE the sensor data', (done) => {
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
// Setting the env variable to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Sensor = require('../models/Sensor');

// Dev Dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

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
    describe('/GET Sensors', () => {
        it('it should GET all the sensors', (done) => {
            chai.request(server)
                .get('/api/sensors')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
    });

    /*
    ** Testing the sensor /POST route
    */
    describe('/POST Sensors', () => {
        it('it should not POST the sensors data without all required fields', () => {
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
                    // done();
                });
        });

        it('it should POST the sensor data ', (done) => {
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
    })
})
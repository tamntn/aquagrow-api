process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Sensor = require('../models/sensor');

// Dev Dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Sensors', () => {
    // beforeEach((done) => {
    //     Sensor.remove({}, (err) => {
    //         done();
    //     })
    // });

    /*
    ** Test the sensor /GET route
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
   })
})
// Setting the env variable to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Sensor = require('../models/sensor');

// Dev Dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('API endpoint: /Invalid_path', () => {
    /*
    ** Testing any invalid route
    */
    describe('/GET 404', () => {
        it('it should return status 404', (done) => {
            chai.request(server)
                .get('/INVALID_PATH')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
    })
})
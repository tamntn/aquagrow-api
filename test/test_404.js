// Setting the env variable to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('API endpoint: /Invalid_path', () => {
    /*
    ** Testing any invalid route
    */
    it('GET /invalid route should return status 404', (done) => {
        chai.request(server)
            .get('/INVALID_PATH')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
    })
})
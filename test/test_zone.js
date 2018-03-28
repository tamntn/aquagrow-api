const mongoose = require('mongoose');
const Zone = mongoose.model('zone');

// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const assert = chai.assert;

chai.use(chaiHttp);

describe('API endpoint: /api/zone', () => {
    /*
    ** GET All Route
    */
    it('GET /api/zone should return a list of all available zones', (done) => {
        chai.request(server)
            .get('/api/zone')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                res.body.data.should.have.lengthOf(18);
                done();
            })
    })

    /* 
    ** GET Zone from Zipcode
    */
    it('GET /api/zone/:zipcode should return an error if zipcode does not exist', (done) => {
        chai.request(server)
            .get('/api/zone/99999')
            .end((err, res) => {
                res.body.should.have.property("error").eql("Zipcode not available");
                done();
            })
    })

    it('GET /api/zone/:zipcode should return an a zone if zipcode exists', (done) => {
        chai.request(server)
            .get('/api/zone/38655')
            .end((err, res) => {
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                res.body.data.should.have.property("zipcode");
                done();
            })
    })
})
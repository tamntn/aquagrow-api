const mongoose = require('mongoose');
const Fish = mongoose.model('fish');

// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const assert = chai.assert;

chai.use(chaiHttp);

describe('API endpoint: /api/fish', () => {
    /*
    ** TEST GET Route
    */
    it('GET /api/fish should return a array of fish', (done) => {
        chai.request(server)
            .get('/api/fish')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                done();
            })
    })

    /*
    ** TEST POST Route
    */
    it('POST /api/fish should create a new fish record', (done) => {
        const newFishProps = {
            name: "test",
            type: "test",
            description: "test",
            feeding: "test",
            diet: "test",
            tempLow: 5,
            tempHigh: 7,
            harvestRange: "test",
            picture: "test",
        }

        chai.request(server)
            .post('/api/fish')
            .send(newFishProps)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                res.body.data.should.have.property("name").eql("test");
                done();
            })
    })
})
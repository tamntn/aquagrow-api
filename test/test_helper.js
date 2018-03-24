const mongoose = require('mongoose');
const databaseConfig = require('../config/db');

before(done => {
    mongoose.connect(databaseConfig.testURI);

    mongoose.connection
        .once('open', () => {
            console.log('Test connection established!')
            done()
        })
        .on('error', err => {
            console.warn('Warning', err);
        })
});

// beforeEach(done => {
    
// });
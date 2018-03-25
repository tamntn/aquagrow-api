const mongoose = require('mongoose');
const databaseConfig = require('../config/db');
const User = mongoose.model('users');
const Sensor = mongoose.model('sensors');
const System = mongoose.model('system');

before(done => {
    // Setting the env variable to test
    process.env.NODE_ENV = 'test';

    mongoose.Promise = global.Promise;
    mongoose.connect(databaseConfig.testURI);

    mongoose.connection
        .once('open', () => {
            console.log('Successfully connected to test database!\n')
            done()
        })
        .on('error', err => {
            console.warn('Warning', err);
        })
});

// Clear all documents from each collections before each test
beforeEach(done => {
    Promise.all([
        Sensor.remove({}),
        User.remove({}),
        System.remove({})
    ])
        .then(() => done())
        .catch(() => done())
});
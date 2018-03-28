const mongoose = require('mongoose');
const fs = require('fs');
const databaseConfig = require('../../config/db');
const Zone = require('../../models/Zone');

// Mongoose connection setup
mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig.devURI);

// Read Zone data file
// Clear all current Zone documents in the database
// Insert all new zone data into the database
fs.readFile('../dataset/zone.json', function (err, data) {
    data = JSON.parse(data);
    Zone.remove({})
        .then(() => Zone.insertMany(data))
        .then((results) => {
            console.log("Imported zone dataset.")
            mongoose.disconnect();
        })
        .catch((err) => console.log(err))
})
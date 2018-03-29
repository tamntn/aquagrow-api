const mongoose = require('mongoose');
const fs = require('fs');
const databaseConfig = require('../../config/db');
const Plant = require('../../models/Plant');

// Mongoose connection setup
mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig.devURI);

// Read Fish data file
// Clear all current Fish documents in the database
// Insert all new fish data into the database
fs.readFile('../dataset/uf_data_final.json', function (err, data) {
    data = JSON.parse(data);
    Plant.remove({})
        .then(() => Plant.insertMany(data))
        .then((results) => {
            console.log("Imported plant dataset.")
            mongoose.disconnect();
        })
        .catch((err) => console.log(err))
})
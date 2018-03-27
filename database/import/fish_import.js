const mongoose = require('mongoose');
const fs = require('fs');
const databaseConfig = require('../../config/db');
const Fish = require('../../models/Fish');

mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig.devURI);

// Read Fish data file
// Remove all current Fish documents in the database
// Insert all new fish data into the database
fs.readFile('../dataset/fish.json', function (err, data) {
    data = JSON.parse(data);
    Fish.remove({})
        .then(() => Fish.insertMany(data))
        .then((results) => {
            console.log("Imported fish dataset.")
            mongoose.disconnect();
        })
        .catch((err) => console.log(err))
})
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating a Schema for plant data
const plantSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    zones: { type: [String], required: true }
})

const Plant = mongoose.model('plants', plantSchema);

module.exports = Plant;
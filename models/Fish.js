const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    feeding: {
        type: String,
        required: true
    },
    diet: {
        type: String,
        required: true
    },
    tempLow: {
        type: Number,
        required: true
    },
    tempHigh: {
        type: Number,
        required: true
    },
    harvestRange: {
        type: String
    },
    picture: {
        type: String,
        required: true
    },
})

const Fish = mongoose.model('fish', FishSchema);

module.exports = Fish;
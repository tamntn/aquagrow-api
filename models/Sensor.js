var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating a Schema for sensor data
const SensorSchema = new Schema({
    timestamp: Date,
    airTemp: {
        type: String,
        required: true
    },
    airHumidity: {
        type: String,
        required: true
    },
    lightIntensity: {
        type: String,
        required: true
    },
    waterTemp: {
        type: String,
        required: true
    },
    upperWaterLevel: {
        type: Boolean,
        // required: true
    },
    lowerWaterLevel: {
        type: Boolean,
        // required: true
    },
    pH: {
        type: String,
        // required: true
    }
});

const Sensor = mongoose.model('sensors', SensorSchema);

module.exports = Sensor;
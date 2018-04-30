var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating a Schema for sensor data
const SensorSchema = new Schema({
    timestamp: Date,
    // -40 - 80 Celcius
    airTemp: {
        type: String,
        required: true
    },
    // 0 - 100 %
    airHumidity: {
        type: String,
        required: true
    },
    // 1 - 65535 lux
    lightIntensity: {
        type: String,
        required: true
    },
    // -55 - 125 Celcius
    waterTemp: {
        type: String,
        required: true
    },
    upperWaterLevel: {
        type: Boolean
    },
    lowerWaterLevel: {
        type: Boolean
    },
    // 0 - 14
    pH: {
        type: String
    }
});

const Sensor = mongoose.model('sensors', SensorSchema);

module.exports = Sensor;
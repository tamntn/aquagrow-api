var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating a Schema for sensor data
const sensorSchema = new Schema({
    time: Date,
    airTemp: { type: String, required: true },
    airHumidity: { type: String, required: true },
    lightIntensity: { type: String, required: true },
    waterTemp: { type: String, required: true }
});

var Sensor = mongoose.model('sensors', sensorSchema);

module.exports = Sensor;

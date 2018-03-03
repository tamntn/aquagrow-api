var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const sensorSchema = new Schema({
    time: Date,
    airTemp: String,
    airHumidity: String,
    lightIntensity: String,
    waterTemp: String
});

var Sensor = mongoose.model('sensors', sensorSchema);

module.exports = Sensor;

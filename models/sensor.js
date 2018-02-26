var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const sensorSchema = new Schema({
    time: Date,
    temp: String,
    humidity: String
});

var Sensor = mongoose.model('sensors', sensorSchema);

module.exports = Sensor;

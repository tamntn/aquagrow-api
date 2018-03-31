const mongoose = require('mongoose');
const Sensor = require('./Sensor')
const Schema = mongoose.Schema;

const SystemSchema = new Schema({
    growLight: {
        type: Boolean,
        required: true,
        default: false
    },
    waterPump: {
        type: Boolean,
        required: true,
        default: false
    },
    phPumpLow: {
        type: Boolean,
        required: true,
        default: false
    },
    phPumpHigh: {
        type: Boolean,
        required: true,
        default: false
    },
    heatingMat: {
        type: Boolean,
        required: true,
        default: false
    },
    sensorData: [{
        type: Schema.Types.ObjectId,
        ref: 'sensors'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

// Before removing a system, also remove all the Sensors associated with it
SystemSchema.pre('remove', function (next) {
    const Sensor = mongoose.model('sensors');

    // Using the ```in``` modifier
    // Go through all of our Sensors, look at their ids,
    // if the id is in this (the system's) list of sensorData, remove it
    Sensor.remove({ _id: { $in: this.sensorData } })
        .then(() => next());
})

const System = mongoose.model('system', SystemSchema);

module.exports = System;
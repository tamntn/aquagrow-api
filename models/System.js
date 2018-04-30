const mongoose = require('mongoose');
const Sensor = require('./Sensor')
const Schema = mongoose.Schema;

const SystemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    growLight: {
        type: Boolean,
        required: true,
        default: false
    },
    waterPump: {
        type: Number,
        required: true,
        default: 255
    },
    waterPumpSetIntensity: {
        type: Number,
        required: true,
        default: 100
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
    airTempRange: {
        type: [Number],
        required: true,
        default: [20, 30]
    },
    airTempNotification: {
        type: Boolean,
        required: true,
        default: false
    },
    airHumidityRange: {
        type: [Number],
        required: true,
        default: [40, 60]
    },
    airHumidityNotification: {
        type: Boolean,
        required: true,
        default: false
    },
    lightIntensityRange: {
        type: [Number],
        required: true,
        default: [5000, 15000]
    },
    lightIntensityNotification: {
        type: Boolean,
        required: true,
        default: false
    },
    waterTempRange: {
        type: [Number],
        required: true,
        default: [20, 25]
    },
    waterTempNotification: {
        type: Boolean,
        required: true,
        default: false
    },
    phLevelRange: {
        type: [Number],
        required: true,
        default: [6.5, 8.0]
    },
    phLevelNotification: {
        type: Boolean,
        required: true,
        default: false
    },
    upperWaterLevelConsecutiveTrigger: {
        type: Number,
        required: true,
        default: 0
    },
    upperWaterLevelNotification: {
        type: Boolean,
        required: true,
        default: false
    },
    lowerWaterLevelConsecutiveTrigger: {
        type: Number,
        required: true,
        default: 0
    },
    lowerWaterLevelNotification: {
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
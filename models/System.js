const mongoose = require('mongoose');
const Sensor = require('./Sensor')
const Schema = mongoose.Schema;

const systemSchema = new Schema({
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

const System = mongoose.model('system', systemSchema);

module.exports = System;
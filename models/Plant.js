var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating a Schema for plant data
const plantSchema = new Schema({
    product: {
        type: String,
        required: true
    },
    product_url: {
        type: String,
        required: true
    },
    main: {
        type: String,
        required: true
    },
    main_url: {
        type: String,
        required: true
    },
    main_pic: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pH_range: {
        type: [String]
    },
    zones: {
        type: [String]
    },
    germination: {
        type: [String]
    },
    botanicalName: {
        type: String
    },
    daysToMaturity: {
        type: String
    },
    breed: {
        type: String
    },
    lifeCycle: {
        type: String
    },
    sowDepth: {
        type: String
    },
    growingConditions: {
        type: String
    },
    sowMethod: {
        type: String
    },
    diseaseResistance: {
        type: String
    },
    fruitColor: {
        type: String
    },
    plantSpacing: {
        type: String
    },
    rowSpacing: {
        type: String
    },
    maturity: {
        type: String
    },
    fruit: {
        type: String
    },
    plantHeight: {
        type: String
    },
    sun: {
        type: String
    },
    additionalCharacteristics: {
        type: String
    },
    carrotWeight: {
        type: String
    },
    endiveHeadType: {
        type: String
    },
    cornHeight: {
        type: String
    },
    eggplantType: {
        type: String
    },
    garlicType: {
        type: String
    }
})

const Plant = mongoose.model('plant', plantSchema);

module.exports = Plant;
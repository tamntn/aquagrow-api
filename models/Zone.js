var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ZoneSchema = new Schema({
    zone: {
        type: String,
        required: true,
        unique: true
    },
    range: {
        type: String,
        required: true
    },
    zipcodes: {
        type: [String],
        required: true
    }
})

const Zone = mongoose.model('zone', ZoneSchema);

module.exports = Zone;
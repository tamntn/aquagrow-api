var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const zoneSchema = new Schema({
    zone: { type: String, required: true, unique: true },
    description: { type: String }
})

const Zone = mongoose.model('zones', zoneSchema);

module.exports = Zone;
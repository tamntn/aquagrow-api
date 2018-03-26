var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ZoneSchema = new Schema({
    zone: { type: String, required: true, unique: true },
    description: { type: String }
})

const Zone = mongoose.model('zones', ZoneSchema);

module.exports = Zone;
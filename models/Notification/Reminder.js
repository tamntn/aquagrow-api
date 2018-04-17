const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
    createdAt: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

module.exports = ReminderSchema;
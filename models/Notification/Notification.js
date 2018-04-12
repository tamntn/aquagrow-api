const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    createdAt: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    aspect: {
        type: String,
        required: true
    }
})

module.exports = NotificationSchema;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationTypeSchema = new Schema({
    type: {
        type: String,
        required: true
    }
})

const NotificationAspectSchema = new Schema({
    aspect: {
        type: String,
        required: true
    }
})

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
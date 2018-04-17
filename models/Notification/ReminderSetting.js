'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const Twilio = require('twilio');
const { accountSid, authToken, sendingNumber } = require('../../config/twilio');
const { notificationRepeatDifferenceInMinutes } = require('../../config/notification');

// Reminder SETTINGS Schema
// TODO: Think of a way to call phone number from User model
// If user changes phone number, storing phone number here would not update
// However, doing it this way will make the operation less expensive since 
// We don't have to query for a user's number everytime we send reminders
const ReminderSettingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timeZone: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        index: true
    },
    repeat: {
        type: Boolean,
        required: true
    },
    repeatDuration: String // hourly, daily, weekly, biweekly
});

// Mongoose Methods and Statics Reference:
// http://mongoosejs.com/docs/guide.html#methods
ReminderSettingSchema.methods.requiresNotification = function (date) {
    const currentTime = moment(date).utc();
    const setTime = moment(this.time).tz(this.timeZone).utc();
    const differenceInMinutes = Math.round(currentTime.diff(setTime, 'minutes', true));
    // console.log(currentTime);
    // console.log(setTime);
    // console.log(differenceInMinutes);

    if (differenceInMinutes < 0) {
        console.log('Too Early');
        return false;
    } else if (differenceInMinutes === 0) {
        console.log('First Hit');
        return true;
    } else if (this.repeat && differenceInMinutes % notificationRepeatDifferenceInMinutes[this.repeatDuration.toUpperCase()] === 0) {
        console.log('Repeated Hit');
        return true;
    } else {
        console.log('No Hit');
        return false;
    }
};

ReminderSettingSchema.statics.sendNotifications = function (callback) {
    // now
    const searchDate = new Date();

    // Find all apointments that are scheduled at the current time.
    ReminderSetting
        .find({})
        .then(function (reminderSettings) {
            reminderSettings = reminderSettings.filter(function (reminderSetting) {
                return reminderSetting.requiresNotification(searchDate);
            });
            if (reminderSettings.length > 0) {
                sendNotifications(reminderSettings);
            }
        });

    /**
    * Send messages to all owners that have set up reminders via Twilio
    * @param {array} reminderSettings List of reminderSettings.
    */
    function sendNotifications(reminderSettings) {
        console.log('Sending notifications...');
        const client = new Twilio(accountSid, authToken);
        reminderSettings.forEach(function (reminderSetting) {
            // Create options to send the message
            const options = {
                to: `+1${reminderSetting.phoneNumber}`,
                from: sendingNumber,
                /* eslint-disable max-len */
                body: `Nemo 🐟: \nHi ${reminderSetting.name}. Just a reminder from AquaGrow.`,
                /* eslint-enable max-len */
            };

            // Send the message!
            client.messages.create(options, function (err, response) {
                if (err) {
                    // Just log it for now
                    console.error(err);
                } else {
                    // Log the last few digits of a phone number
                    let masked = reminderSetting.phoneNumber.substr(0,
                        reminderSetting.phoneNumber.length - 4);
                    masked += '****';
                    console.log(`Message sent to ${masked}`);
                }
            });
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
            callback.call();
        }
    }
};

const ReminderSetting = mongoose.model('reminder', ReminderSettingSchema);

module.exports = ReminderSetting;
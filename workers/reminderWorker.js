'use strict';

const Reminder = require('../models/Notification/ReminderSetting');

const reminderWorkerFactory = function () {
    return {
        run: function () {
            Reminder.sendNotifications();
        },
    };
};

module.exports = reminderWorkerFactory();
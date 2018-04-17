'use strict';

const CronJob = require('cron').CronJob;
const reminderWorker = require('./workers/reminderWorker');
const moment = require('moment');

const schedulerFactory = function () {
    console.log('Scheduler has been started.')

    return {
        start: function () {
            // Job is run every minute
            new CronJob('00 * * * * *', function () {
                console.log('Running Reminder Worker for ' +
                    moment().format("ddd, MMMM Do YYYY, h:mm:ss a"));
                reminderWorker.run();
            }, null, true, '');
        },
    };
};

module.exports = schedulerFactory();
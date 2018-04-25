'use strict';

const express = require('express');
const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const ReminderSetting = require('../../models/Notification/ReminderSetting');
const router = express.Router();

const getTimeZones = function () {
    return momentTimeZone.tz.names();
};

// GET: /reminderSetting
router.get('/api/reminderSetting/:username', function (req, res, next) {
    ReminderSetting.find({ username: req.params.username })
        .then((reminders) => {
            res.send({
                message: "GET Reminder Settings request successful",
                data: reminders
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
});

// POST: /reminderSetting
router.post('/api/reminderSetting/:username', function (req, res, next) {
    const username = req.params.username;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const message = req.body.message;
    const timeZone = req.body.timeZone;
    const time = momentTimeZone.tz(req.body.time, 'MM-DD-YYYY hh:mm a', timeZone).utc();
    const repeat = req.body.repeat;
    const repeatDuration = req.body.repeatDuration;

    const reminderSetting = new ReminderSetting({
        username,
        name,
        phoneNumber,
        message,
        timeZone,
        time,
        repeat,
        repeatDuration
    });

    reminderSetting.save()
        .then((result) => {
            res.send({
                message: "POST Reminder Setting request successful",
                data: reminderSetting
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        });
});

// PUT: UPDATE One ReminderSetting
router.put('/api/reminderSetting/:id', function (req, res, next) {
    const reminderSettingId = req.params.id;
    req.body.time = momentTimeZone.tz(req.body.time, 'MM-DD-YYYY hh:mm a', timeZone).utc();

    ReminderSetting.findByIdAndUpdate(reminderSettingId, req.body)
        .then((result) => {
            res.send({
                message: "UPDATE Reminder Setting request successful",
                data: result
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

// DELETE: DELETE One ReminderSetting
router.delete('/api/reminderSetting/:id', function (req, res, next) {
    const reminderSettingId = req.params.id;

    ReminderSetting.findByIdAndRemove(reminderSettingId)
        .then((result) => {
            res.send({
                message: "DELETE single reminder setting request successful",
                data: result
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

module.exports = router;
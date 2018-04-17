const express = require('express');
const moment = require('moment');
const router = express.Router();
const User = require('../../models/User');

/*
** /GET Route - get all received reminders of a user
*/
router.get('/api/reminder/:username', (req, res) => {
    const username = req.params.username;

    User.findOne({ username: username })
        .select('reminders')
        .then((user) => {
            if (user) {
                res.send({
                    message: "GET reminders request successful",
                    data: user.reminders
                })
            } else {
                res.send({
                    error: "Username doesn't exist"
                })
            }
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

/*
** /POST Route - create new reminder and push to user
*/
router.post('/api/reminder/:username', (req, res) => {
    const username = req.params.username;
    const newReminder = {
        createdAt: moment().format(),
        message: req.body.message
    }

    User.findOneAndUpdate({ username: username }, { $push: { reminders: newReminder } })
        .select("reminders")
        .then((user) => {
            if (user) {
                res.send({
                    message: "POST reminder request successful",
                    data: user.reminders
                })
            } else {
                res.send({
                    error: "Username doesn't exist"
                })
            }
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

/*
** /DELETE Route - delete ONE reminder
*/
router.delete('/api/reminder/:username/:id', (req, res) => {
    const username = req.params.username;
    const reminderId = req.params.id;
    User.findOneAndUpdate({ username: username }, { $pull: { reminders: { _id: reminderId } } })
        .select("reminders")
        .then((user) => {
            res.send({
                message: "DELETE single reminder request successful",
                data: user.reminders
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

/*
** /DELETE Route - delete ALL reminders
*/
router.delete('/api/reminder/:username', (req, res) => {
    const username = req.params.username;
    User.findOneAndUpdate({ username: username }, { reminders: [] })
        .select("reminders")
        .then((user) => {
            if (user) {
                res.send({
                    message: "DELETE all reminders request successful",
                    data: user.reminders
                })
            } else {
                res.send({
                    error: "Username doesn't exist"
                })
            }
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

module.exports = router;
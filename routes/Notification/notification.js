const express = require('express');
const moment = require('moment');
const router = express.Router();
const User = require('../../models/User');
const notificationConfig = require('../../config/notification');
const { notificationTypes, notificationAspects } = notificationConfig;

/*
** /GET Route - get all notifications of a user
*/
router.get('/api/notification/:username', (req, res) => {
    const username = req.params.username;

    User.findOne({ username: username })
        .select('notifications')
        .then((user) => {
            if (user) {
                res.send({
                    message: "GET notification request successful",
                    data: user.notifications
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
** /POST Route - create new notification and push to user
*/
router.post('/api/notification', (req, res) => {
    if (!(req.body.type in notificationTypes)) {
        res.send({
            error: "Invalid notification types"
        })
    } else if (!(req.body.aspect in notificationAspects)) {
        res.send({
            error: "Invalid notification aspects"
        })
    } else {
        const username = req.body.username;
        const newNotification = {
            createdAt: moment().format(),
            message: req.body.message,
            type: notificationTypes[req.body.type],
            aspect: notificationAspects[req.body.aspect]
        }

        User.findOneAndUpdate({ username: username }, { $push: { notifications: newNotification } })
            .select("notifications")
            .then((user) => {
                if (user) {
                    res.send({
                        message: "POST notification request successful",
                        data: user.notifications
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
    }
})

/*
** /DELETE Route - delete ONE notification
*/
router.delete('/api/notification/:username/:id', (req, res) => {
    const username = req.params.username;
    const notificationId = req.params.id;
    User.findOneAndUpdate({ username: username }, { $pull: { notifications: { _id: notificationId } } })
        .select("notifications")
        .then((user) => {
            res.send({
                message: "DELETE single notification request successful",
                data: user.notifications
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

/*
** /DELETE Route - delete ALL notifications
*/
router.delete('/api/notification/:username', (req, res) => {
    const username = req.params.username;
    User.findOneAndUpdate({ username: username }, { notifications: [] })
        .select("notifications")
        .then((user) => {
            if (user) {
                res.send({
                    message: "DELETE all notifications request successful",
                    data: user.notifications
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
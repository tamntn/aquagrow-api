const express = require('express');
const router = express.Router();
const System = require('../models/System');
const User = require('../models/User');

/*
** /GET Route - Get system information associated with an user
*/
router.get('/api/system/:username', function (req, res) {
    User.findOne({ username: req.params.username })
        .then((user) => {
            System.findOne({ user: user._id })
                .populate('user', 'username')
                .populate('sensorData')
                .then((system) => {
                    res.send({
                        message: "System GET request successful",
                        data: system
                    })
                })
                .catch((err) => {
                    res.send({
                        error: err.message
                    })
                })
        })
})

/*
** /POST Route - Create new system and assign to an user
*/
router.post('/api/system', function (req, res) {
    // Get username passed from request body
    User.findOne({ username: req.body.username })
        .then((user) => {
            const newSystem = new System();
            newSystem.user = user;

            newSystem.save()
                .then((system) => {
                    res.send({
                        message: "System POST request successful",
                        data: system
                    })
                })
                .catch((err) => {
                    res.send({
                        error: err.message
                    })
                })
        })
})

/*
** /PUT Route - Update system information associated with an user
*/
router.put('/api/system/:username', function (req, res) {
    User.findOne({ username: req.params.username })
        .then((user) => {
            System.findOneAndUpdate({ user: user._id }, req.body)
                .populate('user', 'username')
                .populate('sensorData')
                .then((system) => {
                    res.send({
                        message: "System PUT request successful",
                        data: system
                    })
                })
                .catch((err) => {
                    res.send({
                        error: err.message
                    })
                })
        })
})

module.exports = router;
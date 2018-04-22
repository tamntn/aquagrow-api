const express = require('express');
const router = express.Router();
const System = require('../models/System');
const User = require('../models/User');

/*
** /GET Route - Get system status associated with an user
*/
router.get('/api/system/:username', function (req, res) {
    User.findOne({ username: req.params.username })
        .then((user) => {
            System.findOne({ user: user._id })
                .populate('user', 'username')
                .select('-sensorData')
                .then((system) => {
                    res.send({
                        message: "System status GET request successful",
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
** /GET Route - Get system sensor data
*/
router.get('/api/system/data/:username', function (req, res) {
    User.findOne({ username: req.params.username })
        .then((user) => {
            System.findOne({ user: user._id })
                .populate('sensorData')
                .then((system) => {
                    res.send({
                        message: "System data GET request successful",
                        data: system.sensorData
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
            const newSystem = new System({
                name: req.body.systemName
            });
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
                .select('-sensorData')
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
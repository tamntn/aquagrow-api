const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const moment = require('moment');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Sensor = require('../models/Sensor');
const System = require('../models/System');
const User = require('../models/User');
const { accountSid, authToken, sendingNumber } = require('../config/twilio');
const client = require('twilio')(accountSid, authToken);
const notificationConfig = require('../config/notification');
const { notificationTypes, notificationAspects } = notificationConfig;

// Convert incoming data to Object
// Use in case incoming data is a string of format 'key=value&key=value'
function stringToObject(input) {
    let result = _.fromPairs(input.split('&').map(s => s.split('=')))
    console.log(result);
}

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

/*
** /GET Route
*/
router.get('/api/sensors', passport.authenticate('jwt', { session: false }), function (req, res) {
    Sensor.find({})
        .limit(100)
        .then((sensors) => {
            res.send({
                message: "Sensors GET request successful",
                data: sensors
            });
        })
        .catch((err) => {
            res.send({
                error: err.message
            });
        })
})

/*
** /POST Route
*/
// POST to sensors collection only
router.post('/api/sensors', function (req, res) {
    // Create a new instance of the Sensor Schema
    const newSensor = new Sensor({
        timestamp: moment().format(),
        airTemp: req.body.airTemp,
        airHumidity: req.body.airHumidity,
        lightIntensity: req.body.lightIntensity,
        waterTemp: req.body.waterTemp
    });

    // Add new sensor data
    newSensor.save()
        .then((sensor) => {
            res.send({
                message: "Sensors POST request successful",
                data: sensor
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            });
        })
});

// POST to sensors collection
// Then push the sensor data to an existing system
router.post('/api/sensors/:systemId', function (req, res) {
    // Create a new instance of the Sensor Schema
    const newSensor = new Sensor({
        timestamp: moment().format(),
        airTemp: req.body.airTemp,
        airHumidity: req.body.airHumidity,
        lightIntensity: req.body.lightIntensity,
        waterTemp: req.body.waterTemp,
        upperWaterLevel: req.body.upperWaterLevel,
        lowerWaterLevel: req.body.lowerWaterLevel,
        pH: req.body.pH
    });

    checkIncomingSensorData(req.body, req.params.systemId, (message) => {
        req.app.io.emit("newNotification", message);
    });

    // Add new sensor data
    newSensor.save()
        .then((sensor) => {
            System.findByIdAndUpdate({ _id: req.params.systemId }, { $push: { sensorData: sensor } })
                .then(() => {
                    // Emit Event To The Server
                    req.app.io.emit("newData");
                    res.send({
                        message: "Sensors POST request & saved to system successful",
                        data: sensor
                    })
                })
                .catch((err) => {
                    res.send({
                        error: err.message
                    });
                })
        })
        .catch((err) => {
            res.send({
                error: err.message
            });
        })
})

/*
** /DELETE Route
*/
router.delete('/api/sensors/:id', function (req, res) {
    if (req.params.id) {
        Sensor.findByIdAndRemove(req.params.id)
            .then((sensor) => {
                res.send({
                    message: "Sensors DELETE request successful",
                    data: sensor
                });
            })
            .catch((err) => {
                res.send({
                    error: err.message
                });
            })
    } else {
        res.send({
            error: "Sensors DELETE request failed"
        });
    }
})

/*
** FUNCTION to process incoming data to see whether or not to send notifications
*/
function checkIncomingSensorData(incomingData, systemId, callback) {
    const incomingAirTemp = incomingData.airTemp;
    const incomingAirHumidity = incomingData.airHumidity;
    const incomingLightIntensity = incomingData.lightIntensity;
    const incomingWaterTemp = incomingData.waterTemp;
    const incomingPhLevel = incomingData.pH;
    const incomingUpperWaterLevel = incomingData.upperWaterLevel;
    const incomingLowerWaterLevel = incomingData.lowerWaterLevel;

    System.findById(systemId)
        .select("-sensorData")
        .populate('user')
        .then((res) => {
            const {
                airTempRange,
                airHumidityRange,
                lightIntensityRange,
                waterTempRange,
                phLevelRange,
                upperWaterLevelConsecutiveTrigger,
                lowerWaterLevelConsecutiveTrigger
            } = res;

            const phoneNumber = res.user.phone;
            const username = res.user.username;

            if (res.airTempNotification) {
                handleAirTempNotification(incomingAirTemp, airTempRange, phoneNumber, username, callback);
            }
            if (res.airHumidityNotification) {
                handleAirHumidityNotification(incomingAirHumidity, airHumidityRange, phoneNumber, username, callback);
            }
            if (res.lightIntensityNotification) {
                handleLightIntensityNotification(incomingLightIntensity, lightIntensityRange, phoneNumber, username, callback)
            }
            if (res.waterTempNotification) {
                handleWaterTempNotification(incomingWaterTemp, waterTempRange, phoneNumber, username, callback);
            }
            if (res.phLevelNotification) {
                handlePhLevelNotification(incomingPhLevel, phLevelRange, phoneNumber, username, callback);
            }
        })
}

function handleAirTempNotification(value, range, phoneNumber, username, callback) {
    if (parseFloat(value) < range[0] || parseFloat(value) > range[1]) {
        const message = `The air temperature is currently out of your desired range 😕`;
        // Send message
        client.messages
            .create({
                to: `+1${phoneNumber}`,
                from: sendingNumber,
                body: message
            })
            .then(message => {
                console.log("Notification sent");
            })
            .catch(err => {
                console.log(err);
            })
        // Add notifications to user
        const newNotification = {
            createdAt: moment().format(),
            message: message,
            type: notificationTypes["WARNING"],
            aspect: notificationAspects["TEMPERATURE"]
        }
        User.findOneAndUpdate({ username: username }, { $push: { notifications: newNotification } })
            .then((user) => {
                callback(message);
                // Update notifications value to not repeat (turn off for now)
                return System.findOneAndUpdate({ user: user._id }, {
                    airTempNotification: false
                })
            })
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

function handleAirHumidityNotification(value, range, phoneNumber, username, callback) {
    if (parseFloat(value) < range[0] || parseFloat(value) > range[1]) {
        const message = `The air humidity is currently out of your desired range 💦`;
        // Send message
        client.messages
            .create({
                to: `+1${phoneNumber}`,
                from: sendingNumber,
                body: message
            })
            .then(message => {
                console.log("Notification sent");
            })
            .catch(err => {
                console.log(err);
            })
        // Add notifications to user
        const newNotification = {
            createdAt: moment().format(),
            message: message,
            type: notificationTypes["WARNING"],
            aspect: notificationAspects["HUMIDITY"]
        }
        User.findOneAndUpdate({ username: username }, { $push: { notifications: newNotification } })
            .then((user) => {
                callback(message);
                // Update notifications value to not repeat (turn off for now)
                return System.findOneAndUpdate({ user: user._id }, {
                    airHumidityNotification: false
                })
            })
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

function handleLightIntensityNotification(value, range, phoneNumber, username, callback) {
    if (parseInt(value) < range[0] || parseInt(value) > range[1]) {
        const message = `The grow light intensity is currently out of your desired range 💡`;
        // Send message
        client.messages
            .create({
                to: `+1${phoneNumber}`,
                from: sendingNumber,
                body: message
            })
            .then(message => {
                console.log("Notification sent");
            })
            .catch(err => {
                console.log(err);
            })
        // Add notifications to user
        const newNotification = {
            createdAt: moment().format(),
            message: message,
            type: notificationTypes["ERROR"],
            aspect: notificationAspects["LIGHT"]
        }
        User.findOneAndUpdate({ username: username }, { $push: { notifications: newNotification } })
            .then((user) => {
                callback(message);
                // Update notifications value to not repeat (turn off for now)
                return System.findOneAndUpdate({ user: user._id }, {
                    lightIntensityNotification: false
                })
            })
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

function handleWaterTempNotification(value, range, phoneNumber, username, callback) {
    if (parseFloat(value) < range[0] || parseFloat(value) > range[1]) {
        const message = `The water temperature is currently out of your desired range 💧`;
        // Send message
        client.messages
            .create({
                to: `+1${phoneNumber}`,
                from: sendingNumber,
                body: message
            })
            .then(message => {
                console.log("Notification sent");
            })
            .catch(err => {
                console.log(err);
            })
        // Add notifications to user
        const newNotification = {
            createdAt: moment().format(),
            message: message,
            type: notificationTypes["WARNING"],
            aspect: notificationAspects["WATER"]
        }
        User.findOneAndUpdate({ username: username }, { $push: { notifications: newNotification } })
            .then((user) => {
                callback(message);
                // Update notifications value to not repeat (turn off for now)
                return System.findOneAndUpdate({ user: user._id }, {
                    waterTempNotification: false
                })
            })
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

function handlePhLevelNotification(value, range, phoneNumber, username, callback) {
    if (parseFloat(value) < range[0] || parseFloat(value) > range[1]) {
        const message = `The pH level is currently out of your desired range ️☠. Don't let Nemo 🐟 die!`;
        // Send message
        client.messages
            .create({
                to: `+1${phoneNumber}`,
                from: sendingNumber,
                body: message
            })
            .then(message => {
                console.log("Notification sent");
            })
            .catch(err => {
                console.log(err);
            })
        // Add notifications to user
        const newNotification = {
            createdAt: moment().format(),
            message: message,
            type: notificationTypes["ERROR"],
            aspect: notificationAspects["pHLEVEL"]
        }
        User.findOneAndUpdate({ username: username }, { $push: { notifications: newNotification } })
            .then((user) => {
                callback(message);
                // Update notifications value to not repeat (turn off for now)
                return System.findOneAndUpdate({ user: user._id }, {
                    phLevelNotification: false
                })
            })
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

function handleUpperWaterLevelNotification(value, range) {

}

function handleLowerWaterLevelNotification(value, range) {

}

module.exports = router
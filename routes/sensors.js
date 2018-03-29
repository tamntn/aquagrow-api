const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const moment = require('moment');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Sensor = require('../models/Sensor');
const System = require('../models/System');

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
        waterTemp: req.body.waterTemp
    });

    // Add new sensor data
    newSensor.save()
        .then((sensor) => {
            System.findByIdAndUpdate({ _id: req.params.systemId }, { $push: { sensorData: sensor } })
                .then(() => {
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

module.exports = router
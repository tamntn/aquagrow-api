var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var Sensor = require('../models/Sensor');

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
    Sensor.find({}, (err, sensors) => {
        if (err) {
            res.send({
                error: "Sensors GET request failed"
            });
        }
        res.send({
            message: "Sensors GET request successful",
            data: sensors
        });
    })
})

/*
** /POST Route
*/
router.post('/api/sensors', function (req, res) {
    // Create a new instance of the Sensor Schema
    const newSensor = Sensor({
        time: moment().format(),
        airTemp: req.body.airTemp,
        airHumidity: req.body.airHumidity,
        lightIntensity: req.body.lightIntensity,
        waterTemp: req.body.waterTemp
    });

    // Add new sensor data
    newSensor.save(function (err, sensor) {
        if (err) {
            res.send({
                error: "Sensors POST request failed"
            });
        };
        res.send({
            message: "Sensors POST request successful",
            data: sensor
        });
    })
});

/*
** /DELETE Route
*/
router.delete('/api/sensors/:id', function (req, res) {
    if (req.params.id) {
        Sensor.findByIdAndRemove(req.params.id, (err, sensor) => {
            if (err) {
                res.send({
                    error: "Sensors DELETE request failed"
                });
            };
            res.send({
                message: "Sensors DELETE request successful",
                data: sensor
            });
        })
    } else {
        res.send({
            error: "Sensors DELETE request failed"
        });
    }
})

module.exports = router
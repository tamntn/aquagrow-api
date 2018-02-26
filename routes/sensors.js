var bodyParser = require('body-parser');
var moment = require('moment');
var Sensor = require('../models/sensor');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/sensors', function (req, res) {
        Sensor.find({}, (err, sensors) => {
            res.json(sensors);
        })
    })

    app.post('/api/sensors', function (req, res) {
        // Add new sensor data
        const newSensor = Sensor({
            time: moment().format(),
            temp: req.body.temp,
            humidity: req.body.humidity
        });

        newSensor.save(function (err, sensor) {
            if (err) throw err;
            console.log(sensor);
            res.send('Sensors Data Added');
        })
    });

    app.delete('/api/sensors/', function (req, res) {
        if (req.body.id) {
            Sensor.findByIdAndRemove(req.body.id, err => {
                if(err) throw err;
                res.send(`Sensors Data At id: ${req.body.id} Deleted.`);
            })
        } else {
            res.json({
                err: "Delete request failed."
            })
        }
    })
}
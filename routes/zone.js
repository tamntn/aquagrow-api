const express = require('express');
const router = express.Router();
const Zone = require('../models/Zone');

/*
** /GET All Routes - Get all zones and their temperature ranges
*/
router.get('/api/zone', function (req, res) {
    Zone.find({})
        .select('zone range')
        .sort({ zone: 1 })
        .then((zones) => {
            res.send({
                message: "Zone GET request successful",
                data: zones
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

/*
** GET One Route - Get a zone based on a zipcode
*/
router.get('/api/zone/zip/:zipcode', function (req, res) {
    Zone.findOne({ zipcodes: req.params.zipcode })
        .select('zone range')
        .then((zone) => {
            if (zone) {
                // Clone result and assign zipcode property
                let output = Object.assign({}, zone._doc);
                output.zipcode = req.params.zipcode;
                res.send({
                    message: "Zone GET request successful",
                    data: output
                })
            }
            else {
                res.send({
                    error: "Zipcode not available",
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
** GET One Route - Get a zone based on the zone's number
*/
router.get('/api/zone/:zone', function (req, res) {
    Zone.findOne({ zone: req.params.zone.toUpperCase() })
        .select('zone range')
        .then((zone) => {
            if (zone) {
                res.send({
                    message: "Zone GET request successful",
                    data: zone
                })
            }
            else {
                res.send({
                    error: "Zone not found",
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
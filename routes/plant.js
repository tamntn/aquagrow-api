const express = require('express');
const router = express.Router();
const titleCase = require('title-case');
const Plant = require('../models/Plant');

/*
** /GET Route - Get list of plants by categories
*/
router.get('/api/:category', function (req, res) {
    const category = titleCase(req.params.category);
    Plant.find({ category: category })
        .then((plants) => {
            if (plants.length > 0) {
                res.send({
                    message: `${category} GET request successful`,
                    data: plants
                })
            } else {
                res.send({
                    error: `${category} is not a valid category`
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
** /GET Route - Get list of plants by main product
*/
router.get('/api/plants/:main', function (req, res) {
    const main = titleCase(req.params.main)
    Plant.find({ main: main })
        .then((plants) => {
            if (plants.length > 0) {
                res.send({
                    message: `${main} GET request successful`,
                    data: plants
                })
            } else {
                res.send({
                    error: `${main} is not a valid main product`
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
const express = require('express');
const router = express.Router();
const Fish = require('../models/Fish');

/*
** /GET Route - Get all fish data
*/
router.get('/api/fish', function (req, res) {
    Fish.find({})
        .then((fish) => {
            res.send({
                message: "Fish GET request successful",
                data: fish
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

/*
** /POST Route - Import a new type of fish
*/
router.post('/api/fish', function (req, res) {
    const newFish = new Fish({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        feeding: req.body.feeding,
        diet: req.body.diet,
        tempLow: req.body.tempLow,
        tempHigh: req.body.tempHigh,
        harvestRange: req.body.harvestRange,
        picture: req.body.picture
    })

    newFish.save()
        .then((fish) => {
            res.send({
                message: "POST fish request successful",
                data: fish
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

module.exports = router;
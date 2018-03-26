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

})

module.exports = router;
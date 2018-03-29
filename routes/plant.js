const express = require('express');
const router = express.Router();
const titleCase = require('title-case');
const Plant = require('../models/Plant');

/*
** /GET Route - Get list of all available categories
*/
router.get('/api/plants/category', function (req, res) {
    Plant.distinct('category')
        .then((categories) => {
            res.send({
                message: `Plant categories GET request successful`,
                data: categories
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

/*
** /GET Route - Get list of all available main products
*/
router.get('/api/plants/main', function (req, res) {
    Plant.distinct('main')
        .sort()
        .then((mains) => {
            res.send({
                message: `Plant main products GET request successful`,
                data: mains
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

/*
** /GET Route - Get list of plants by categories
*/
router.get('/api/plants/category/:category', function (req, res) {
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
router.get('/api/plants/main/:main', function (req, res) {
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

/*
** /GET Route - Get list of plants by grow zone
*/
router.get('/api/plants/zone/:zone', function (req, res) {
    const zone = req.params.zone;
    Plant.find({ zones: zone })
        .then((plants) => {
            if (plants.length > 0) {
                res.send({
                    message: `GET Plant by zone request successful`,
                    zone: zone,
                    data: plants
                })
            } else {
                res.send({
                    error: `${zone} is not a valid zone`
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
** /GET Route - Get an individual plant from a Plant Id
*/
router.get('/api/plants/:id', function (req, res) {
    Plant.findById(req.params.id)
        .then((plant) => {
            res.send({
                message: `GET Plant by Id request successful`,
                data: plant
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

module.exports = router;
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var databaseConfig = require('../config/db');

/*
** /POST Route
** Authenticate via username and password
*/
router.post('/api/signin', (req, res) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                res.status(401).send({
                    error: "User authentication failed: user doesn't exist!"
                })
            } else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), databaseConfig.secret);
                    res.send({
                        message: "User authentication successful",
                        token: "JWT " + token
                    })
                } else {
                    res.status(401).send({
                        error: "User authentication failed: wrong password!"
                    })
                }
            }
        })
        .catch((err) => {
            res.status(401).send({
                error: "User authentication failed"
            })
        })
})

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const databaseConfig = require('../config/db');

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
                    const token = jwt.sign(user.toJSON(), databaseConfig.secret);
                    // Remove password from user object before sending it back with the respond
                    let returnUserData = Object.assign({}, user._doc);
                    delete returnUserData['password'];
                    res.send({
                        message: "User authentication successful",
                        user: returnUserData,
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
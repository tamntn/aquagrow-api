const express = require('express');
const moment = require('moment');
const router = express.Router();
const User = require('../../models/User');

/*
** /GET Route - get all received messages of a user
*/
router.get('/api/message/:username', (req, res) => {
    const username = req.params.username;

    User.findOne({ username: username })
        .select('messages')
        .then((user) => {
            if (user) {
                res.send({
                    message: "GET messages request successful",
                    data: user.messages
                })
            } else {
                res.send({
                    error: "Username doesn't exist"
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
** /POST Route - create new message and push to user
*/
router.post('/api/message', (req, res) => {
    const username = req.body.username;
    const newMessage = {
        createdAt: moment().format(),
        sender: req.body.sender,
        message: req.body.message
    }

    User.findOneAndUpdate({ username: username }, { $push: { messages: newMessage } })
        .select("messages")
        .then((user) => {
            if (user) {
                res.send({
                    message: "POST message request successful",
                    data: user.messages
                })
            } else {
                res.send({
                    error: "Username doesn't exist"
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
** /DELETE Route - delete ONE message
*/
router.delete('/api/message/:username/:id', (req, res) => {
    const username = req.params.username;
    const messageId = req.params.id;
    User.findOneAndUpdate({ username: username }, { $pull: { messages: { _id: messageId } } })
        .select("messages")
        .then((user) => {
            res.send({
                message: "DELETE single message request successful",
                data: user.messages
            })
        })
        .catch((err) => {
            res.send({
                error: err.message
            })
        })
})

/*
** /DELETE Route - delete ALL messages
*/
router.delete('/api/message/:username', (req, res) => {
    const username = req.params.username;
    User.findOneAndUpdate({ username: username }, { messages: [] })
        .select("messages")
        .then((user) => {
            if (user) {
                res.send({
                    message: "DELETE all messages request successful",
                    data: user.messages
                })
            } else {
                res.send({
                    error: "Username doesn't exist"
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
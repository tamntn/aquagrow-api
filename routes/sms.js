const express = require('express');
const router = express.Router();
const { accountSid, authToken, sendingNumber } = require('../config/twilio');
const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//         to: '+16623715507',
//         from: '+16622004204',
//         body: 'Hi from Twilio'
//     })
//     .then(message => console.log(message.sid));

/*
** /POST Route - send welcome SMS after welcome form submission
*/
router.post('/api/sms/welcome', function (req, res) {
    const receivingNumber = `+1${req.body.phone}`;
    const name = req.body.name.split(" ")[0];

    client.messages
        .create({
            to: receivingNumber,
            from: sendingNumber,
            body: `Hi ${name}, I'm Nemo 🐟 - your AquaGrow assistant. I'll be keeping you up to date with your aquaponics system.\n\nCheers! 🎉`
        })
        .then(message => {
            res.send({
                message: 'SMS welcome message sent'
            })
        })
        .catch(err => {
            res.send({
                error: err.message
            })
        })
})

module.exports = router;
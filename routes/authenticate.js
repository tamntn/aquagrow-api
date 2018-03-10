var bcrypt = require('bcryptjs');
var User = require('../models/User');

module.exports = function (app) {
    /*
    ** /POST Route
    ** Authenticate via username and password
    */
    app.post('/api/authenticate', (req, res) => {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                res.send({
                    error: "User authentication failed"
                })
            } else if (!user) {
                res.send({
                    error: "User authentication failed: user doesn't exist!"
                })
            } else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.send({
                        message: "User authentication successful"
                    })
                } else {
                    res.send({
                        error: "User authentication failed: wrong password!"
                    })
                }
            }
        })
    })
}
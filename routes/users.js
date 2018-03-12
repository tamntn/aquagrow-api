var bcrypt = require('bcryptjs');
var User = require('../models/User');

var salt = bcrypt.genSaltSync(10);

module.exports = function (app) {
	/*
	** /GET Route (All)
	*/
	app.get('/api/users', (req, res) => {
		User.find({}, (err, users) => {
			if (err) {
				res.send({
					error: "GET all users request failed"
				})
			}
			res.send({
				message: "GET all users request successful",
				users: users
			})
		})
	})

	/*
	** /GET Route (By id)
	*/
	// app.get('/api/user/:id', (req, res) => {
	// 	User.findById(req.params.id, (err, user) => {
	// 		if (err) {
	// 			console.log(err);
	// 			res.send({
	// 				error: "GET user by id request failed"
	// 			});
	// 		} else {
	// 			res.send({
	// 				message: "GET user by id request successful",
	// 				user: user
	// 			})
	// 		}
	// 	})
	// })

	/*
	** /GET Route (By username)
	*/
	app.get('/api/user/:username', (req, res) => {
		User.findOne({ username: req.params.username }, (err, user) => {
			if (err) {
				res.send({
					error: "GET user by username request failed"
				});
			} else if (!user) {
				res.send({
					error: "GET user by username request failed: username not found!"
				})
			} else {
				res.send({
					message: "GET user by username request successful",
					user: user
				})
			}
		})
	})

	/*
	** /POST Route
	*/
	app.post('/api/user', (req, res) => {
		const newUser = User({
			username: req.body.username,
			password: req.body.password
		})

		newUser.save((err, user) => {
			if (err) {
				console.log(err);
				res.send({
					error: "POST user request failed"
				})
			}
			res.send({
				message: "POST user request successful",
				user: user
			})
		})
	})

	/*
	** /DELETE Route (By username)
	*/
	app.delete('/api/user/:username', (req, res) => {
		if (req.params.username) {
			User.findOneAndRemove({ username: req.params.username }, (err, user) => {
				if (err) {
					res.send({
						error: "DELETE user request failed"
					});
				};
				res.send({
					message: "DELETE user request successful",
					user: user
				});
			})
		} else {
			res.send({
				error: "DELETE user request failed"
			})
		}
	})
}

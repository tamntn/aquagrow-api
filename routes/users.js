const express = require('express');
const moment = require('moment');
const router = express.Router();
const User = require('../models/User');
const Zone = require('../models/Zone');

/*
** /POST Route
*/
router.post('/api/user', (req, res) => {
	const newUser = new User({
		username: req.body.username,
		password: req.body.password,
		name: req.body.name,
		joined: moment().format()
	})

	newUser.save()
		.then((user) => {
			res.send({
				message: "POST user request successful",
				data: user
			})
		})
		.catch((err) => {
			res.send({
				error: err.message
			})
		})
})

/*
** /GET Route (All)
*/
router.get('/api/users', (req, res) => {
	User.find({})
		.select('username')
		.then((users) => {
			res.send({
				message: "GET all users request successful",
				data: users
			})
		})
		.catch((err) => {
			res.send({
				error: err.message
			})
		})
})

/*
** /GET Route (By username)
*/
router.get('/api/user/:username', (req, res) => {
	User.findOne({ username: req.params.username })
		.select('-password')
		.then((user) => {
			if (!user) {
				res.send({
					error: "GET user by username request failed: username not found!"
				})
			} else {
				res.send({
					message: "GET user by username request successful",
					data: user
				})
			}
		})
		.catch((err) => {
			res.send({
				error: err.message
			});
		})
})

/*
** /PUT Route
*/
router.put('/api/user/:username', (req, res) => {
	let updateValues;
	// If user update their zone, we need to reference the zone object
	if (req.body.zone) {
		Zone.findOne({ zone: req.body.zone })
			.then((zone) => {
				updateValues = {
					zipCode: req.body.zipCode,
					zone: zone,
					phone: req.body.phone,
					pictureUrl: req.body.pictureUrl
				}
				User.findOneAndUpdate({ username: req.params.username }, updateValues)
					.then((user) => {
						if (!user) {
							res.send({
								error: "User does not exist"
							})
						} else {
							res.send({
								message: "UPDATE user request successful",
								data: user
							})
						}
					})
					.catch((err) => {
						res.send({
							error: err.message
						})
					})
			})
	} else {
		updateValues = req.body;
		User.findOneAndUpdate({ username: req.params.username }, updateValues)
			.then((user) => {
				if (!user) {
					res.send({
						error: "User does not exist"
					})
				} else {
					res.send({
						message: "UPDATE user request successful",
						data: user
					})
				}
			})
			.catch((err) => {
				res.send({
					error: err.message
				})
			})
	}
})

/*
** /DELETE Route (By Id)
*/
router.delete('/api/user/:id', (req, res) => {
	if (req.params.id) {
		// We're using this method instead of FindOneAndRemove
		// So we can reference user id during pre remove hook
		User.findOne({ _id: req.params.id })
			.then((user) => user.remove())
			.then((user) => {
				res.send({
					message: "DELETE user request successful",
					data: user
				});
			})
			.catch((err) => {
				res.send({
					error: err.message
				});
			})
	} else {
		res.send({
			error: "DELETE user request failed"
		})
	}
})

module.exports = router;
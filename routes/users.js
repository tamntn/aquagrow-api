const express = require('express');
const moment = require('moment');
const router = express.Router();
const User = require('../models/User');

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
router.get('/api/user/:username', (req, res) => {
	User.findOne({ username: req.params.username })
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
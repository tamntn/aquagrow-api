'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
var databaseConfig = require('./config/db');
require('./config/passport-jwt')(passport);

var index = require('./routes/index');

// api controllers
var users = require('./routes/users');
var system = require('./routes/system');
var sensors = require('./routes/sensors');
var authenticate = require('./routes/authenticate');
var plant = require('./routes/plant');
var fish = require('./routes/fish');
var zone = require('./routes/zone');
var upload = require('./routes/upload');
var sms = require('./routes/sms');
var notification = require('./routes/Notification/notification');
var message = require('./routes/Notification/message');

// reminder setup
const reminderSetting = require('./routes/Notification/reminderSetting');
const reminder = require('./routes/Notification/reminder');
const scheduler = require('./scheduler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (process.env.NODE_ENV !== 'test') {
	app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var allowCrossDomain = function (req, res, next) {
	var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://app.aquagrow.life'];
	var origin = req.headers.origin;
	if (allowedOrigins.indexOf(origin) > -1) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	// res.header('Access-Control-Allow-Origin', "http://localhost:3001, https://app.aquagrow.life");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
}

app.use(allowCrossDomain);

// public folder setup
// the root is at the 'public' folder itself
app.use('/public', express.static(path.join(__dirname, 'public')));

app.locals.moment = require('moment'); // TODO: Reminder Setup

mongoose.Promise = global.Promise;

// Connect to mongoDB database
if (process.env.NODE_ENV !== 'test') {
	mongoose.connect(databaseConfig.devURI);
}

// Initialize passport
app.use(passport.initialize());

// Redirect App to secure routes in deployment
if (process.env.NODE_ENV !== 'test') {
	app.use(redirectToHTTPS([/localhost:(\d{4})/], []))
}

app.use('/', index);
app.use('/', authenticate);
app.use('/', system);
app.use('/', sensors);
app.use('/', users);
app.use('/', fish);
app.use('/', zone);
app.use('/', upload);
app.use('/', sms);
app.use('/', notification);
app.use('/', reminderSetting); // TODO: Reminder Setup
app.use('/', reminder);
app.use('/', message);
app.use('/', plant); // Plant controller is last due to /api/:category

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('404');
});

scheduler.start(); // TODO: Reminder Setup

module.exports = app;
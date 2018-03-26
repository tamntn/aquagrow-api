'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var databaseConfig = require('./config/db');
require('./config/passport-jwt')(passport);

var index = require('./routes/index');

// api controllers
var users = require('./routes/users');
var system = require('./routes/system');
var sensors = require('./routes/sensors');
var authenticate = require('./routes/authenticate');
var fish = require('./routes/fish');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (process.env.NODE_ENV !== 'test') {
	app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// public folder setup
// the root is at the 'public' folder itself
app.use('/public', express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;

// Connect to mongoDB database
if (process.env.NODE_ENV !== 'test') {
	mongoose.connect(databaseConfig.devURI);
}

// Initialize passport
app.use(passport.initialize());

app.use('/', index);
app.use('/', authenticate);
app.use('/', system);
app.use('/', sensors);
app.use('/', users);
app.use('/', fish);

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

module.exports = app;

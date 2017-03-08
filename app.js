var express = require('express');
var http = require('http');
var path = require('path');
// var passport = require('passport');
var morgan = require('morgan');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');

// var session = require('express-session');
// var fs = require('fs');


// var config = require('./config/config')[env];
// require('./config/passport')(passport, config);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session(
//   {
//     resave: true,
//     saveUninitialized: true,
//     secret: 'this shit hits'
//   }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cookieParser());

// routes
// require('./config/routes')(app, config);
require('./config/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, function () {
  console.log('Hangman is up and running');
});

module.exports = app;

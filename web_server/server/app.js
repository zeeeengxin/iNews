var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');

var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');

var app = express();

var config = require('./config/config.json');
require('./models/main.js').connect(config.mongoDbUri);

app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade'); // no meaning, just need to set view engine
app.use('/static',
	express.static(path.join(__dirname, '../client/build/static/')));
app.use('/favicon.png', express.static('../client/build/favicon.png'));
// TODO: remove this after development is done.
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-with");
  next();
});

app.use(bodyParser.json());
// load passport strategies
app.use(passport.initialize());
var localSignupStrategy = require('./auth/signup_passport'); 
var localLoginStrategy = require('./auth/login_passport'); 
passport.use('local-signup',localSignupStrategy);
passport.use('local-login',localLoginStrategy);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/news', require('./auth/auth_checker'));
app.use('/news', newsRouter);

app.use(function(req, res, next) {
  res.status(404);
});

module.exports = app;

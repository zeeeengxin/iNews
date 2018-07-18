var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');

var app = express();

app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade'); // no meaning, just need to set view engine
app.use('/static',
	express.static(path.join(__dirname, '../client/build/static/')));

// TODO: remove this after development is done.
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-with");
  next();
});

app.use('/', indexRouter);
app.use('/news', newsRouter);

app.use(function(req, res, next) {
  res.status(404);
});

module.exports = app;

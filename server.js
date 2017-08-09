var express = require('express');
var cors = require('cors')
var path = require('path');
var app = express();

// Enable all cors for now
app.use(cors());

// Publish images
app.use(express.static(path.join(__dirname, 'public')));

// Add the route
var routes = require('./routes');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;

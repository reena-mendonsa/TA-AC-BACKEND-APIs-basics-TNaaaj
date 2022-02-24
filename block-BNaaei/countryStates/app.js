var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Requiring the Routers
var v1IndexRouter = require('./routes/index');
var v1CountriesRouter = require('./routes/countries');
var v1StatesRouter = require('./routes/states');

// Connecting to Database
mongoose.connect(
  'mongodb://localhost/countries-API',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log('Connected to database: ', err ? false : true);
  }
);

// Instantiating the application
var app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Using Routers
app.use('/api', v1IndexRouter);
app.use('/api/v1/countries', v1CountriesRouter);
app.use('/api/v1/states', v1StatesRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
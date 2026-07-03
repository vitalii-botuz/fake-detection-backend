var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var policy = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoute');
var siteToken = require('./routes/siteToken');
var checksRouter = require('./routes/checkRoute')
var transactionsRouter = require('./routes/transactionRoute')
var subscriptionsRouter = require('./routes/subscriptionRoute')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(policy({
  origin: 'http://localhost:4444',
  credentials: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/site', siteToken);
app.use('/checks', checksRouter)
app.use('/transactions', transactionsRouter);
app.use('/subscriptions', subscriptionsRouter)

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

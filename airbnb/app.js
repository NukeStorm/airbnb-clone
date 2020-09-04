var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const SessionManager = require("./Util/SessionManager");
const manager = new SessionManager();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {

  if(!res.locals.manager)
  res.locals.manager = manager;

  let userid=null;
  if (req.cookies["EXPRESS_SESSION"]) {
    console.log("current page cookie :" + req.cookies["EXPRESS_SESSION"]);
    try {
      userid = res.locals.manager.getSessionInfo(req.cookies["EXPRESS_SESSION"])["id"];
    } catch {}
  }

  userid? res.locals.session=userid : res.locals.session=null;

  next();
});

app.use('/', indexRouter);
//app.use('/users', usersRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

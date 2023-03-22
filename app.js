//@
//@
//@
//@
//@ start








//@
//@
//@
//@
//@ require
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser'); 
const session = require('express-session');
const app_config = require('./configs/config');
const app = express();
















//@
//@
//@
//@
//@ server
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({secret: process.env.session_secret,saveUninitialized: true,resave: true,  rolling: true, cookie: {httpOnly: true, maxAge: 1*60*60*1000}}));






//@
//@
//@
//@
//@ tao server localhost


//@
//@
//@
//@ router
app.use('/', require('./routes/' + app_config.router_version + '/index'));
app.use('/api/app/v5/', require('./api/app/v5/routers/routers-index-app'));
app.use('/api/web/v5/', require('./api/web/v5/routers/routers-index-web'));
app.use('/api/appdalacom/v5/', require('./api/appdalacom/v5/routers/routers-index-appdalacom'));









//@
//@
//@
//@
//@ Linh tinh
app.get('/app_version', function(req, res){

  version = {
    "version" : "5.0.3",
    "versionCode" : "5003",
    "android" : {
      "version" : "5.0.3",
      "versionCode" : "5003"
    },
    "ios" : {
      "version" : "5.0.3",
      "versionCode" : "5003"
    },
    "maintenance" : 0
  }
  
  res.json(version);
});




//@
//@
//@
//@
//@ Linh tinh
app.use(function(req, res, next) {
  next(createError(404));
});









//@
//@
//@
//@
//@ error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//@
//@
//@
//@
//@ export
module.exports = app;






//@
//@
//@
//@
//@ file end








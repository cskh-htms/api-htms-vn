var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser'); 
const session = require('express-session');
const app_config = require('./configs/config');
const ojs_shares = require('./models/ojs-shares');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({secret: 'dalaappSession@2020',saveUninitialized: true,resave: true,  rolling: true, cookie: {httpOnly: true, maxAge: 1*60*60*1000}}));

// tao server localhost

var localHttp = require('http');
var localServer = localHttp.createServer(app);
localServer.listen(2021,'localhost');


//router
app.use('/',ojs_shares.check_meaintenance,  require('./routes/' + app_config.router_version + '/index'));
app.use('/api/v0/', require('./api/v0/routers/routers-index'));
//app.use('/api/v1/', require('./api/v1/routers/routers-index'));
app.use('/api/v2/', require('./api/v2/routers/routers-index'));
app.use('/api/v4/', require('./api/v4/routers/routers-index'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


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

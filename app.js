var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var register = require('./routes/register');
var login = require('./routes/login');
var home = require('./routes/home');
var addcommodities = require('./routes/addcommodities');
var carts = require('./routes/carts')
var logout = require('./routes/logout')
var users = require('./routes/users');

var session = require('express-session');
/* 数据库连接*/
var mongoose = require('mongoose')
global.accessDb = require('./common/accessDB');
mongoose.connect("mongodb://localhost/onlineshop");

var app = express();


// 中间件是全局的，注册监听的事件，由app.use(function)引入
app.use(session({ // 配置session
    secret:'secret',
    cookie:{ // cookie过期时间ms
        maxAge:1000*60*30 
    },
    resave:false,
    saveUninitialized:true
    
}));
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',index);
app.use('/register', register);
app.use('/login', login);
app.use('/home',home);
app.use('/addcommodity',addcommodities)
app.use('/cart',carts);
app.use('/logout',logout);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

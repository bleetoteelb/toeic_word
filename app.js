var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var validator = require('express-validator');

var index = require('./routes/index');
var users = require('./routes/users');
var amazon = require('./routes/amazon');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jq', express.static(__dirname + '/node_modules/jquery/dist'));

app.use(session({
	secret: '@#@$bleetosession@#@$',
	resave: false,
	saveUninitialized: false
}));

app.use('/', index);
app.use('/amazon',amazon);
app.use('/users', users);

app.use('/penalty',function(req,res,next){
  res.render('penalty',{title:'벌금내역'});
});
app.use('/make_test',function(req,res,next){
  res.render('make_test',{title:'테스트 만들기'});
});
app.use('/test',function(req,res,next){
  res.render('test',{title:'테스트'});
});
app.use('/answer',function(req,res,next){
  res.render('answer',{title:'답안지'});
});
app.use('/admin_check',function(req,res,next){
  res.render('admin_check',{title:'관리자 로그인'});
});
app.use('/admin_page',function(req,res,next){
  res.render('admin_page',{title:'관리자페이지'});
});
app.use('/word_view',function(req,res,next){
  res.render('word_view',{title:'단어 보기'});
});
app.use('/make_review',function(req,res,next){
  res.render('make_review',{title:'복습 단어 추가하기'});
});
app.use('/search',function(req,res,next){
  res.render('search',{title:'복습 단어 추가하기'});
});
app.use('/test_word',function(req,res,next){
  res.render('test_word',{title:'모아 보기'});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

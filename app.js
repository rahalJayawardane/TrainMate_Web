var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// *****************    All Routes Files    ************************************
var admin = require('./routes/admin');
var blog = require('./routes/blog');

// *****************    All Routes Files    ************************************

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret:"trainMATEs3c43tK3y",resave:false,saveUninitialized:true}));
app.use(express.static(path.join(__dirname, 'public')));



// ************ direct route Files ******************************
app.use('/admin', admin);
app.use('/', blog);

// ************ direct route Files ******************************


// ************ set session globe ******************************

app.use(function(req, res, next) {
    res.locals.username = req.session.user;
    res.locals.userid = req.session.id;
    res.locals.userpos = req.session.pos;
    next();
});

// ************ set session globe ******************************


app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send('<h1><center>Coming Soon! <br> Site is still under development!! </center></h1> <p><center> go to admin panel use localhost:3000/admin </center> </p>');
//    res.redirect('/views/blog/index');
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

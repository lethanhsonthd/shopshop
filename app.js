var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cartRouter = require('./routes/cart')
var session = require('express-session')
var cookie = require('cookie-parser')
var passport = require('passport')
var flash = require('express-flash')
var validator = require('validator')
var mongoStore = require('connect-mongo')(session)
var config = require('./config/dbs')
var app = express();
mongoose.connect(config.dbURL,(err)=>{
  if (err) console.log(err)
  console.log('Connect to database successfully')
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'suppersecret',
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({
    url: config.dbURL
  })
}))
app.use(cookie({
  name: 'session',
  keys: [],
  maxAge: 24*60*60*100
}))
app.use(passport.initialize())
app.use(passport.session())
app.use((req,res,next)=>{
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/add-to-cart',cartRouter)
app.use(flash())
app.use(session({
  cookie: {maxAge: 60000},
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}))
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

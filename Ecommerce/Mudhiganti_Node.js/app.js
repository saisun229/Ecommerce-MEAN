var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var router = require('./routes/router');
var fileUpload = require('express-fileupload');
var cors = require('cors');

var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(session({
  secret: 'keyboard cat',
  cookie: {}
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
// app.use('/test', index);
// app.use('/test1', index);

app.use('/login', router);
app.use('/signup', router);
app.use('/updateuser', router);
app.use('/rateseller', router);
app.get('/getuser', router);
app.get('/getallusers', router);


app.use('/addcategory', router);
app.use('/getcategories', router);
app.use('/deletecategory', router);

app.use('/addproduct', router);
app.use('/getproduct', router);
app.use('/searchproducts', router);
app.use('/updateproduct', router);
app.use('/getavailableproducts', router);
app.use('/getsoldproducts', router);
app.use('/deleteproduct', router);
app.use('/buyproduct', router);

app.use('/getunreadcount', router);
app.use('/getmessages', router);
app.use('/sendMesage', router);
app.use('/setasread', router);

app.use('/uploadimage', router);
app.use('/downloadimage', router);



app.use(express.static('routes'));


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

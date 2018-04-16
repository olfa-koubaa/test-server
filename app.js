var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var cors = require('cors');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);



app.post('/upload',(req, res, next)=> {
    console.log(req);
    let videoFile = req.files.file;

    videoFile.mv(`${__dirname}/public/${req.body.filename}.mp4`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json({file: `public/${req.body.filename}.mp4`});


    })
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('not found');
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

    app.listen(8000, ()=> {
        console.log('8000');
    });

module.exports = app;

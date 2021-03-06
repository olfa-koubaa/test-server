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
const fs = require("fs");
import path from 'path';

const staticFiles = express.static(path.join(__dirname, '../../test-client/build'));


var app = express();
app.use(staticFiles);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());

//app.use(bodyParser.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '30Mb'}));
app.use(bodyParser.urlencoded({limit: '30Mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);



app.post('/upload',(req, res, next)=> {
    console.log(req);
    let videoFile = req.files.file;
    videoFile.mv(`${__dirname}/videos/${req.body.filename}.mp4`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json({file: `videos/${req.body.filename}.mp4`});


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

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var multer  = require('multer');

/*var index = require('./routes/index');
var users = require('./routes/users');*/
var publicPath = path.join(__dirname, 'public');
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
app.use(express.static(publicPath));

//var upload = multer({ dest: path.join(publicPath, 'uploads') });

// start the server
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'production';

/*app.use('/', index);
app.use('/users', users);*/

require('./routes')(app);

app.listen(function(err) {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});

module.exports = app;

var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");

var poll = require("./routes/poll");
var auth = require("./routes/auth");
var app = express();

var mongoose = require("mongoose");

mongoose.Promise = require("bluebird");
mongoose.connect(process.env.DB_URI, {promiseLibrary: require("bluebird")})
        .then(() => console.log("connection to DB succesful"))
        .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'build')));


//allow calls from Client
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api/poll', poll);
app.use('/api/auth', auth);

//Catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error Handler
app.use(function(err, req, res, next){
    //set locals, provide error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

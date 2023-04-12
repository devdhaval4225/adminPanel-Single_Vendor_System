// var createError = require('http-errors');
var express = require('express');
require("./database/connection");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
var app = express();


app.use(session({
    secret: 'SecretStringForCookies',
    cookie: {
        maxAge: 60000
    }, //60seconds
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

var userRouter = require('./routes/user.routes');
var adminRouter = require('./routes/admin.routes');
var itemRouter = require('./routes/item.routes');
var categoryRouter = require('./routes/category.routes');
var contectusRouter = require('./routes/contectus.routes');
var testimonialRouter = require('./routes/testimonial.routes');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/item', itemRouter);
app.use('/category', categoryRouter);
app.use('/contect', contectusRouter);
app.use('/testimonial', testimonialRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

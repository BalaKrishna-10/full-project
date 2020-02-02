var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const multer = require('multer');
const uuid = require('uuid');
const Path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const fileStorage = multer.diskStorage({
  destination: function(req,file,cb){
      cb(null,'images')
  },
  filename: function(req,file,cb){
      cb(null, uuid() + '-' +file.originalname);
  }
});
const filter = (req,file,cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
      cb(null , true)
  }
  else {
      cb(null , false )
  }
};


app.use(bodyParser.json());

app.use(multer({storage:fileStorage , fileFilter : filter}).single('image'));
app.use('/images' , express.static(Path.join(__dirname,'images')));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods' , 'GET,POST,DELETE,PUT,OPTIONS,PATCH');
    res.setHeader('Access-Control-Allow-Headers' , 'Content-Type, Authorization');
    next();
})

app.use('/user', userRoutes);

app.use((error,req,res,next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message:message , data:data});
});

// catch 404 and forward to error handler


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
mongoose.connect('mongodb+srv://bala:bala123@cluster0-e5rqd.mongodb.net/userdata?retryWrites=true&w=majority')


module.exports = app;

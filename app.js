var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const $ = require('jquery');
const mongoose = require('mongoose');


const app = express();

// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const server = http.listen(3010, () => {
//   console.log("Server is listening on port", server.address().port);
// });

const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('a user connected');
});

var indexRouter = require('./routes/index');
var chatsRouter = require('./routes/chat')(io);
const { error } = require('console');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/chat', chatsRouter);

// jquery
app.use(function (req, res, next) {
  res.locals.jquery = $;
  next();
});

// mongodb
mongoose.connect('mongodb://localhost:27017/chatApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB', error.message);
})

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

httpServer.listen(3010, () => {
  console.log('listening on *:3010');
});

module.exports = app;

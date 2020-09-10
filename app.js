const debug = require('debug')('blog-api:server');
const morgan = require('morgan');
const createError = require('http-errors');
const helmet = require('helmet');
const env = require('./.env.config');
const express = require('express');
const cors = require('cors');
const initDB = require('./lib/db').initDB;

const app = express();

app.use(
  cors({
    origin: ['https://igorashs.github.io']
  })
);

// init DB
initDB();

// wearing the helmet
app.use(
  helmet({
    hidePoweredBy: { setTo: 'Hidden Wizard' }
  })
);

// get our routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');

// set our routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/posts', postRouter);
app.use('/posts/:postID/comments', commentRouter);

// log our request in a fancy way
app.use(morgan('dev'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  const message = err.message;
  const error = env.NODE_ENV === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ message, error });
});

// listening to port
const server = app.listen(env.PORT || 3000);

// handle server errors
server.on('error', (err) => {
  switch (err.code) {
    case 'EACCES':
      debug('Permission denied');
      process.exit(1);
    case 'EADDRINUSE':
      debug('Address already in use');
      process.exit(1);
    default:
      throw err;
  }
});

server.on('listening', () => {
  debug(`Listening on ${server.address().port}`);
});

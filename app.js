const debug = require('debug')('blog-api:server');
const mongoose = require('mongoose');
const morgan = require('morgan');
const createError = require('http-errors');
const helmet = require('helmet');
const env = require('./.env.config');
const express = require('express');

const app = express();

// handle initial connection errors
(async () => {
  try {
    await mongoose.connect(env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    debug(mongoose.connection.readyState === 1 && 'db connected');
  } catch (connectionErr) {
    debug(connectionErr);
  }
})();

const db = mongoose.connection;

// wearing the helmet
app.use(
  helmet({
    hidePoweredBy: { setTo: 'Hidden Wizard' }
  })
);

// init
app.get('/', (req, res) => {
  res.json({ message: 'Hello There' });
});

// handle errors after initial connection
db.on('error', (err) => {
  debug(err);
});

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

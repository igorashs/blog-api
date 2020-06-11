const debug = require('debug')('blog-api:db');
const mongoose = require('mongoose');
const mongoDB = require('../.env.config').mongoDB;

exports.initDB = () => {
  // handle initial connection errors
  (async () => {
    try {
      await mongoose.connect(mongoDB, {
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

  // handle errors after initial connection
  db.on('error', (err) => {
    debug(err);
  });
};

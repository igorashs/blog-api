const debug = require('debug')('blog-api:userController');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../.env.config').JWT_KEY;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
// const Joi = require('@hapi/joi');

exports.postUserLogin = async (req, res, next) => {
  // TODO Validation

  // fetch our user from db
  const user = await User.findOne({ username: req.body.username });

  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const payload = { username: user.username };

    jwt.sign(payload, JWT_KEY, (err, token) => {
      if (err) {
        debug(err);
        next(createError(403));
      }

      res.json(token);
    });
  } else {
    next(createError(401));
  }
};

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader) {
    const bearerToken = bearerHeader.split(' ')[1];

    jwt.verify(bearerToken, JWT_KEY, (err, data) => {
      if (err) {
        debug(err);
        next(createError(403));
      }

      debug(data);
      next();
    });
  } else {
    next(createError(401));
  }
};

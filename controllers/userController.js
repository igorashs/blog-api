/* eslint-disable no-useless-escape */
const debug = require('debug')('blog-api:userController');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../.env.config').JWT_KEY;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  username: Joi.string().max(30).alphanum().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9\_\.]{3,30}$/)
    .required()
});

exports.postUserLogin = async (req, res, next) => {
  const { error, value } = await userSchema.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    debug(error);
    res.json({ validationError: 'Invalid username or password' });
  } else {
    try {
      // fetch our user from db
      const user = await User.findOne({ username: value.username });

      if (user) {
        // compare our passwords
        const isValid = await bcrypt.compare(value.password, user.password);

        if (isValid) {
          const payload = { username: user.username };

          // sign the token
          jwt.sign(payload, JWT_KEY, (err, token) => {
            if (err) {
              debug(err);
              next(createError(403));
            }

            res.json(token);
          });
        } else {
          res.json({ validationError: 'Invalid password' });
        }
      } else {
        res.json({ validationError: 'Invalid username' });
      }
    } catch (err) {
      debug(err);
      next(createError(401));
    }
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

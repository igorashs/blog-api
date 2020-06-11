const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BCRYPT_SALT = +require('../.env.config').BCRYPT_SALT;
const initDB = require('./db').initDB;

const userCredentials = {
  username: process.argv[2],
  password: process.argv[3]
};

// here we go
(async () => {
  try {
    // init DB connection
    initDB();

    // encrypt the password
    const encryptedPassword = await bcrypt.hash(
      userCredentials.password,
      BCRYPT_SALT
    );

    // create new user
    const user = new User({ ...userCredentials, password: encryptedPassword });

    // save in db
    await user.save();

    // verify
    const fetchedUser = await User.findOne({ username: user.username });

    // display res
    console.log('New User:', user);
    console.log('DB User:', fetchedUser);
  } catch (err) {
    console.error(err);
  }
})();

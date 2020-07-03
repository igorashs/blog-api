const router = require('express').Router();
const mongoose = require('mongoose');

// GET Status
router.get('/', (req, res) => {
  const error =
    mongoose.connection.readyState === 1 ? null : new Error('DB Disconnected');
  res.json({ message: 'Connected to Blog-Api!', error });
});

module.exports = router;

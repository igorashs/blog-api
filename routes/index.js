const router = require('express').Router();

// GET Status
router.get('/', (req, res) => {
  res.json({ message: 'Connected to Blog-Api!' });
});

module.exports = router;

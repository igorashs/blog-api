const router = require('express').Router();
const app = require('express');
const userController = require('../controllers/userController');

router.use(app.urlencoded({ extended: true }));
router.use(app.json());

router.post('/login', userController.postUserLogin);

module.exports = router;

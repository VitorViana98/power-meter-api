const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/register', usersController.createUser);
router.post('/login', usersController.login);

module.exports = router;

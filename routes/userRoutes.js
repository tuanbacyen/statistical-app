const express = require('express');
const userController = require('../controllers/userController')
var router = express.Router();

// => router user
router.get('/login', userController.user_login);

module.exports = router;

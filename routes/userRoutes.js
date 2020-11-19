const express = require('express');
const userController = require('../controllers/userController')
var router = express.Router();

// => router user
router.get('/login', userController.user_login);
router.post('/sign_in', userController.user_sign_in);

module.exports = router;

const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authenticateController')
var router = express.Router();
const { isLogin, isNotLogin } = require('./checkLogin');

router.get('/login', isNotLogin, authController.login);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));
router.delete('/logout', isLogin, authController.logout);

module.exports = router;

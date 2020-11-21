const express = require('express');
const userController = require('../controllers/userController')
var router = express.Router();

const { isLogin } = require('./checkLogin');

router.get('/', isLogin, userController.user_index);
// router.get('/new', isLogin, userController.user_new);
// router.get('/edit/:id', isLogin, userController.user_edit);
// router.post('/create', isLogin, userController.user_create);
// router.post('/update', isLogin, userController.user_update);
// router.get('/delete/:id', isLogin, userController.user_delete);
// router.get('/delete', isLogin, userController.user_delete_all);

module.exports = router;

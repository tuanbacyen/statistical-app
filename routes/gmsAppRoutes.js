const express = require('express');
const gmsAppController = require('../controllers/gmsAppController')
var router = express.Router();

const { isLogin } = require('./checkLogin');

router.get('/', isLogin, gmsAppController.ga_index);
router.get('/new', isLogin, gmsAppController.ga_new);
router.get('/edit/:id', isLogin, gmsAppController.ga_edit);
router.post('/create', isLogin, gmsAppController.ga_create);
router.post('/update', isLogin, gmsAppController.ga_update);
router.get('/delete/:id', isLogin, gmsAppController.ga_delete);
router.get('/delete', isLogin, gmsAppController.ga_delete_all);
router.get('/import', isLogin, gmsAppController.ga_import);
router.post('/create_with_file', isLogin, gmsAppController.ga_create_with_file);

module.exports = router;

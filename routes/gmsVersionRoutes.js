const express = require('express');
const gmsVersionController = require('../controllers/gmsVersionController')
var router = express.Router();

const { isLogin } = require('./checkLogin');

router.get('/', isLogin, gmsVersionController.gv_index);
router.get('/new', isLogin, gmsVersionController.gv_new);
router.get('/edit/:id', isLogin, gmsVersionController.gv_edit);
router.post('/create', isLogin, gmsVersionController.gv_create);
router.post('/update', isLogin, gmsVersionController.gv_update);
router.get('/delete/:id', isLogin, gmsVersionController.gv_delete);
router.get('/delete', isLogin, gmsVersionController.gv_delete_all);

module.exports = router;

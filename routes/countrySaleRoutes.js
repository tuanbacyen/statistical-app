const express = require('express');
const countrySaleController = require('../controllers/countrySaleController')
var router = express.Router();

const { isLogin } = require('./checkLogin');

router.get('/', isLogin, countrySaleController.cs_index);
router.get('/new', isLogin, countrySaleController.cs_new);
router.get('/edit/:id', isLogin, countrySaleController.cs_edit);
router.post('/create', isLogin, countrySaleController.cs_create);
router.post('/update', isLogin, countrySaleController.cs_update);
router.get('/delete/:id', isLogin, countrySaleController.cs_delete);
router.get('/delete', isLogin, countrySaleController.cs_delete_all);
router.get('/import', isLogin, countrySaleController.cs_import);
router.post('/create_with_file', isLogin, countrySaleController.cs_create_with_file);

module.exports = router;

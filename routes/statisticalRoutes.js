const express = require('express');
const statisticalController = require('../controllers/statisticalController')
var router = express.Router();

const { isLogin } = require('./checkLogin');

// => router statistical
router.get('/', isLogin, statisticalController.statistical_index);
// router.post('/read_dir', isLogin, statisticalController.read_dir);
router.post('/check', isLogin, statisticalController.statistical_check);

module.exports = router;

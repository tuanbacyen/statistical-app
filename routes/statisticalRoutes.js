const express = require('express');
const statisticalController = require('../controllers/statisticalController')
var router = express.Router();

// => router statistical
router.get('/', statisticalController.statistical_index);
router.post('/read_dir', statisticalController.read_dir);
router.post('/check', statisticalController.statistical_check);

module.exports = router;

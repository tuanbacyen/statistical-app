const express = require('express');
const statisticalController = require('../controllers/statisticalController')
var router = express.Router();

// => router statistical
router.get('/', statisticalController.statistical_index);

module.exports = router;

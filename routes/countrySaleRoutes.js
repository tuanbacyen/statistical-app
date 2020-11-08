const express = require('express');
const countrySaleController = require('../controllers/countrySaleController')
var router = express.Router();

// => router cs
router.get('/', countrySaleController.cs_index);
router.get('/new', countrySaleController.cs_new);
router.get('/edit/:id', countrySaleController.cs_edit);
router.post('/create', countrySaleController.cs_create);
router.post('/update', countrySaleController.cs_update);
router.get('/delete/:id', countrySaleController.cs_delete);
router.get('/delete', countrySaleController.cs_delete_all);
router.get('/import', countrySaleController.cs_import);
router.post('/create_with_file', countrySaleController.cs_create_with_file);

module.exports = router;

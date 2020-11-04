const express = require('express');
const sdtController = require('../controllers/sdtController')
var router = express.Router();

// => router sdt
router.get('/', sdtController.sdt_index);
router.get('/new', sdtController.sdt_new);
router.get('/edit/:id', sdtController.sdt_edit);
router.post('/create', sdtController.sdt_create);
router.post('/update', sdtController.sdt_update);
router.get('/delete/:id', sdtController.sdt_delete);

module.exports = router;

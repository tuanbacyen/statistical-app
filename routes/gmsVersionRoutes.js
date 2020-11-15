const express = require('express');
const gmsVersionController = require('../controllers/gmsVersionController')
var router = express.Router();

// => router gv
router.get('/', gmsVersionController.gv_index);
router.get('/new', gmsVersionController.gv_new);
router.get('/edit/:id', gmsVersionController.gv_edit);
router.post('/create', gmsVersionController.gv_create);
router.post('/update', gmsVersionController.gv_update);
router.get('/delete/:id', gmsVersionController.gv_delete);
router.get('/delete', gmsVersionController.gv_delete_all);

module.exports = router;

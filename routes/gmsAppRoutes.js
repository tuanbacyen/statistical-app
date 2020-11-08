const express = require('express');
const gmsAppController = require('../controllers/gmsAppController')
var router = express.Router();

// => router ga
router.get('/', gmsAppController.ga_index);
router.get('/new', gmsAppController.ga_new);
router.get('/edit/:id', gmsAppController.ga_edit);
router.post('/create', gmsAppController.ga_create);
router.post('/update', gmsAppController.ga_update);
router.get('/delete/:id', gmsAppController.ga_delete);
router.get('/delete', gmsAppController.ga_delete_all);
router.get('/import', gmsAppController.ga_import);
router.post('/create_with_file', gmsAppController.ga_create_with_file);

module.exports = router;

const express = require('express');
var mongoose = require("mongoose");
var router = express.Router();

//================== router ==================

router.get('/', (req, res) => {
  res.render("statistical/index")
});

module.exports = router;

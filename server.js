// require('./models/db');
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

const statisticalController = require('./controllers/statisticalController');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/mainLayout');

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('some time server running');
});

app.use('/', statisticalController);

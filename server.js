require('./models/db');
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require('path');
const bodyParser = require('body-parser');

const statisticalRoutes = require('./routes/statisticalRoutes');
const sdtRoutes = require('./routes/sdtRoutes');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server start');
});

app.use('/', statisticalRoutes);
app.use('/sdt', sdtRoutes);

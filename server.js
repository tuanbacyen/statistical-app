if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

require('./models/db');
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const statisticalRoutes = require('./routes/statisticalRoutes');
const countrySaleRoutes = require('./routes/countrySaleRoutes');
const gmsAppRoutes = require('./routes/gmsAppRoutes');
const gmsVersionRoutes = require('./routes/gmsVersionRoutes');
const userRoutes = require('./routes/userRoutes');
const authenticateRoutes = require('./routes/authenticateRoutes');

const initializePassport = require('./services/passport-config');
initializePassport(passport);

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET || 'randomstring',
  saveUninitialized: true,
  cookie: { sameSite: true, maxAge: 1000 * 60 * 60 * 2 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server start');
});

app.use('/', statisticalRoutes);
app.use('/', authenticateRoutes);
app.use('/user', userRoutes);
app.use('/country_sale', countrySaleRoutes);
app.use('/gms_app', gmsAppRoutes);
app.use('/gms_version', gmsVersionRoutes);

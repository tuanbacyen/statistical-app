var mongoose = require("mongoose");
var URL_MONGO_LOCALE = "mongodb://localhost:27017/statistical-student";

mongoose.connect(process.env.MONGODB_URI || URL_MONGO_LOCALE, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if (!error) {
    console.log('Mongodb connection successes');
  } else {
    console.log('fails', error.message);
  }
});

mongoose.set('useFindAndModify', false);

require('./country_sale.model');
require('./gms_app.model')
require('./gms_version.model');

var mongoose = require("mongoose");
var URL_MONGO_LOCALE = "mongodb://localhost:27017/statistical-student";

mongoose.connect(process.env.MONGODB_URI || URL_MONGO_LOCALE, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if (!error) {
    console.log('Mongodb connection successs');
  } else {
    console.log('fails', error.message);
  }
});

mongoose.set('useFindAndModify', false);

require('./sdt.model');
require('./cts.model');

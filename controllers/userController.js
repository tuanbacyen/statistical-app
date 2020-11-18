var mongoose = require("mongoose");
const User = mongoose.model('User');

const user_login = (req, res) => {
  res.render('user/login', {
    flash: "XXXXX"
  });
  // GmsApp.find().sort({ _id: -1 }).lean().exec((error, docs) => {
  //   if (error) {
  //     console.log('list error: ', error);
  //     return;
  //   }

  //   res.render('gms_app/index', {
  //     list: docs
  //   });
  // });
}

module.exports = {
  user_login,
};

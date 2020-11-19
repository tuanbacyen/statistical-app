var mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

const user_login = async (req, res) => {
  const user = await User.findOne({ username: 'admin' });
  if (user === null) {
    console.log('create admin');
    var u = new User();
    u.username = 'admin';
    u.password = await bcrypt.hash('123456', 10);
    u.save();
  }
  res.render('user/login');
}

const user_sign_in = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(req.body);
  console.log(hashedPassword);
  res.redirect('/login')
}



module.exports = {
  user_login,
  user_sign_in,
};

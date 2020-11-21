var mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const user = await User.findOne({ username: 'admin' });
  if (user === null) {
    console.log('create admin');
    var u = new User();
    u.username = 'admin';
    u.password = await bcrypt.hash('111111', 10);
    u.save();
  }
  res.render('login/login');
}

const logout = (req, res) => {
  req.logout();
  res.redirect('/login');
}

module.exports = {
  login,
  logout,
};


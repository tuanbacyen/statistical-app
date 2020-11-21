var mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    const user = await User.findOne({ username: username });
    if (user === null) {
      return done(null, false, { message: 'Username hoặc mật khẩu không đúng!' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Username hoặc mật khẩu không đúng!' });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    return done(null, await User.findOne({ _id: id }))
  });
}

module.exports = initialize;

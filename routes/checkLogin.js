const isLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

const isNotLogin = (req, res, next) => {
  if (req.isUnauthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = {
  isLogin,
  isNotLogin,
};

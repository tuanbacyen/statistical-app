var mongoose = require("mongoose");
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

const user_index = (req, res) => {
  User.find().sort({ created_at: -1 }).lean().exec((error, docs) => {
    if (error) {
      console.log('list error: ', error);
      return;
    }

    res.render('user/index', { list: docs, current_user: req.user });
  });
}

const user_new = (req, res) => {
  res.render("user/new");
}

const user_detail = (req, res) => { }

const user_edit = (req, res) => {
  User.findOne({ _id: req.params.id, role: 'user' }).lean().exec((err, doc) => {
    if (!err) {
      res.render("user/edit", {
        user: doc,
        flash: req.flash('user_edit'),
      });
    }
  });
}

const user_create = async (req, res) => {
  var user = new User();
  user.username = req.body.username.trim();
  user.password = await bcrypt.hash(req.body.password.trim(), 10);

  user.save((error, doc) => {
    if (error) {
      console.log('Save error: ', error);
      res.render('/user/new', { flash: `Have a error ${error}` });
    } else {
      res.redirect('/user');
    }
  });
}

const user_update = async (req, res) => {
  const user_id = req.body._id;
  const new_pass = await bcrypt.hash(req.body.password.trim(), 10);
  User.findOneAndUpdate({ _id: user_id, role: 'user' }, { password: new_pass }, { new: true }, (error, doc) => {
    if (error) {
      req.flash('user_edit', `Không đổi được mật khẩu ${error}`);
      res.redirect(`/user/edit/${user_id}`);
    } else {
      res.redirect('/user');
    }
  });
}

const user_delete = (req, res) => {
  User.findOne({ _id: req.params.id, role: 'user' }).deleteOne().exec((error, doc) => {
    if (error) {
      console.log('Delete error: ', error);
    }
    res.redirect('/user');
  });
}

module.exports = {
  user_index,
  user_new,
  user_edit,
  user_create,
  user_update,
  user_delete,
};

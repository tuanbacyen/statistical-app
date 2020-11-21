var mongoose = require("mongoose");
const User = mongoose.model('User');

const user_index = (req, res) => {
  User.find().sort({ created_at: -1 }).lean().exec((error, docs) => {
    if (error) {
      console.log('list error: ', error);
      return;
    }

    res.render('user/index', {
      list: docs
    });
  });
}

// const user_new = (req, res) => {
//   res.render("gms_version/new");
// }

// const user_detail = (req, res) => { }

// const user_edit = (req, res) => {
//   GmsVersion.findById(req.params.id).lean().exec((err, doc) => {
//     if (!err) {
//       res.render("gms_version/edit", {
//         gms_version: doc
//       });
//     }
//   });
// }

// const user_create = (req, res) => {
//   var gv = new GmsVersion();
//   gv.version = req.body.version.trim();

//   gv.save((error, doc) => {
//     if (error) {
//       console.log('Save error: ', error);
//       res.redirect('/gms_version/new', { doc: gv, flash: `Have a error ${error.toString()}` });
//     } else {
//       res.redirect('/gms_version');
//     }
//   });
// }

// const user_update = (req, res) => {
//   const gvId = req.body._id;
//   GmsVersion.findOneAndUpdate({ _id: gvId }, req.body, { new: true }, (error, doc) => {
//     if (error) {
//       console.log('Update error: ', error);
//       res.redirect(`/gms_version/edit/${csId}`, { gms_version: doc, flash: `Have a error ${error.toString()}` });
//     } else {
//       res.redirect('/gms_version');
//     }
//   });
// }

// const user_delete = (req, res) => {
//   GmsVersion.findByIdAndRemove(req.params.id, (error, doc) => {
//     if (error) {
//       console.log('Delete error: ', error);
//       return;
//     }
//     res.redirect('/gms_version');
//   });
// }

// const user_delete_all = (req, res) => {
//   GmsVersion.deleteMany({}, (error, doc) => {
//     if (error) {
//       console.log('Delete all error: ', error);
//       return;
//     }
//     res.redirect('/gms_version');
//   });
// }

module.exports = {
  user_index,
  // user_new,
  // user_edit,
  // user_create,
  // user_update,
  // user_delete,
  // user_delete_all,
};

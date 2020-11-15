var mongoose = require("mongoose");
const GmsVersion = mongoose.model('GmsVersion');

const gv_index = (req, res) => {
  GmsVersion.find().sort({ created_at: -1 }).lean().exec((error, docs) => {
    if (error) {
      console.log('list error: ', error);
      return;
    }

    res.render('gms_version/index', {
      list: docs
    });
  });
}

const gv_new = (req, res) => {
  res.render("gms_version/new");
}

const gv_detail = (req, res) => { }

const gv_edit = (req, res) => {
  GmsVersion.findById(req.params.id).lean().exec((err, doc) => {
    if (!err) {
      res.render("gms_version/edit", {
        gms_version: doc
      });
    }
  });
}

const gv_create = (req, res) => {
  var gv = new GmsVersion();
  gv.version = req.body.version.trim();

  gv.save((error, doc) => {
    if (error) {
      console.log('Save error: ', error);
      res.redirect('/gms_version/new', { doc: gv, flash: `Have a error ${error.toString()}` });
    } else {
      res.redirect('/gms_version');
    }
  });
}

const gv_update = (req, res) => {
  const gvId = req.body._id;
  GmsVersion.findOneAndUpdate({ _id: gvId }, req.body, { new: true }, (error, doc) => {
    if (error) {
      console.log('Update error: ', error);
      res.redirect(`/gms_version/edit/${csId}`, { gms_version: doc, flash: `Have a error ${error.toString()}` });
    } else {
      res.redirect('/gms_version');
    }
  });
}

const gv_delete = (req, res) => {
  GmsVersion.findByIdAndRemove(req.params.id, (error, doc) => {
    if (error) {
      console.log('Delete error: ', error);
      return;
    }
    res.redirect('/gms_version');
  });
}

const gv_delete_all = (req, res) => {
  GmsVersion.deleteMany({}, (error, doc) => {
    if (error) {
      console.log('Delete all error: ', error);
      return;
    }
    res.redirect('/gms_version');
  });
}

module.exports = {
  gv_index,
  gv_new,
  gv_edit,
  gv_create,
  gv_update,
  gv_delete,
  gv_delete_all,
};

var mongoose = require("mongoose");
const GmsApp = mongoose.model('GmsApp');
const { csv_file } = require('../services/reading_file');
const fs = require('fs');

const ga_index = (req, res) => {
  GmsApp.find().sort({ _id: -1 }).lean().exec((error, docs) => {
    if (error) {
      console.log('list error: ', error);
      return;
    }

    res.render('gms_app/index', {
      list: docs
    });
  });
}

const ga_new = (req, res) => {
  res.render("gms_app/new");
}

const ga_detail = (req, res) => { }

const ga_edit = (req, res) => {
  GmsApp.findById(req.params.id).lean().exec((err, doc) => {
    if (!err) {
      res.render("gms_app/edit", {
        gms_app: doc
      });
    }
  });
}

const ga_create = (req, res) => {
  var cs = new GmsApp();
  cs.apk = req.body.apk.trim();
  cs.packages = req.body.packages.trim();
  cs.code_name = req.body.code_name.trim();
  cs.code_version = req.body.code_version.trim();

  cs.save((error, doc) => {
    if (error) {
      console.log('Save error: ', error);
      res.redirect('/gms_app/new', { doc: cs, flash: `Have a error ${error.toString()}` });
    } else {
      res.redirect('/gms_app');
    }
  });
}

const ga_update = (req, res) => {
  const gaId = req.body._id;
  GmsApp.findOneAndUpdate({ _id: gaId }, req.body, { new: true }, (error, doc) => {
    if (error) {
      console.log('Update error: ', error);
      res.redirect(`/gms_app/edit/${gaId}`, { gms_app: doc, flash: `Have a error ${error.toString()}` });
    } else {
      res.redirect('/gms_app');
    }
  });
}

const ga_delete = (req, res) => {
  GmsApp.findByIdAndRemove(req.params.id, (error, doc) => {
    if (error) {
      console.log('Delete error: ', error);
      return;
    }
    res.redirect('/gms_app');
  });
}

const ga_delete_all = (req, res) => {
  GmsApp.deleteMany({}, (error, doc) => {
    if (error) {
      console.log('Delete all error: ', error);
      return;
    }
    res.redirect('/gms_app');
  });
}

const ga_import = (req, res) => {
  res.render("gms_app/import");
}

const ga_create_with_file = (req, res) => {
  const { tempFilePath } = req.files.ga_file;
  const cToK = { A: 'apk', B: 'packages', C: 'code_name', D: 'code_version' };
  const data_csv = csv_file(tempFilePath, "Sheet1", cToK);
  var data_full = [];
  data_csv.forEach((ga) => {
    ga.full_code = ga.code_name + "/" + ga.code_version;
    data_full.push(ga);
  })
  fs.unlinkSync(tempFilePath);
  GmsApp.insertMany(data_full, function (error, docs) {
    if (error) {
      console.log('Save error: ', error);
      res.redirect('/gms_app/import', { flash: `Have a error ${error.toString()}` });
    } else {
      res.redirect('/gms_app');
    }
  });
}

module.exports = {
  ga_index,
  ga_new,
  ga_edit,
  ga_create,
  ga_update,
  ga_delete,
  ga_delete_all,
  ga_import,
  ga_create_with_file,
};

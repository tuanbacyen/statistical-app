var mongoose = require("mongoose");
const Sdt = mongoose.model('Sdt');
const ReadDir = require('../services/reading_file');
const fs = require('fs');

const sdt_index = (req, res) => {
  Sdt.find().sort({ _id: -1 }).lean().exec((error, docs) => {
    if (error) {
      console.log('list error: ', error);
      return;
    }

    res.render('sdt/index', {
      list: docs
    });
  });
}

const sdt_new = (req, res) => {
  res.render("sdt/new");
}

const sdt_detail = (req, res) => { }

const sdt_edit = (req, res) => {
  Sdt.findById(req.params.id).lean().exec((err, doc) => {
    if (!err) {
      res.render("sdt/edit", {
        sdt: doc
      });
    }
  });
}

const sdt_create = (req, res) => {
  var sdt = new Sdt();
  sdt.country = req.body.country
  sdt.sale_code = req.body.sale_code

  sdt.save((error, doc) => {
    if (error) {
      console.log('Save error: ', error);
      res.redirect('/sdt/new', { doc: sdt, flash: `Have a error ${error.toString()}` });
    } else {
      res.redirect('/sdt');
    }
  });
}

const sdt_update = (req, res) => {
  const sdtId = req.body._id;
  Sdt.findOneAndUpdate({ _id: sdtId }, req.body, { new: true }, (error, doc) => {
    if (error) {
      console.log('Update error: ', error);
      res.redirect(`/sdt/edit/${sdtId}`, { doc: sdt, flash: `Have a error ${error.toString()}` });
    } else {
      res.redirect('/sdt');
    }
  });
}

const sdt_delete = (req, res) => {
  Sdt.findByIdAndRemove(req.params.id, (error, doc) => {
    if (error) {
      console.log('Delete error: ', error);
      return;
    }
    res.redirect('/sdt');
  });
}

const sdt_delete_all = (req, res) => {
  Sdt.deleteMany({}, (error, doc) => {
    if (error) {
      console.log('Delete all error: ', error);
      return;
    }
    res.redirect('/sdt');
  });
}

const sdt_import = (req, res) => {
  res.render("sdt/import");
}

const sdt_create_with_file = (req, res) => {
  const { tempFilePath } = req.files.sdt_file;
  const cToK = { A: 'country', B: 'sale_code' };
  const data_csv = ReadDir.csv_file(tempFilePath, "Sheet1", cToK);
  Sdt.insertMany(data_csv, function (error, docs) {
    fs.unlinkSync(tempFilePath);
    if (error) {
      console.log('Save error: ', error);
      res.redirect('/sdt/import', { doc: sdt, flash: `Have a error ${error.toString()}` });
    } else {
      res.redirect('/sdt');
    }
  });
}

module.exports = {
  sdt_index,
  sdt_new,
  sdt_edit,
  sdt_create,
  sdt_update,
  sdt_delete,
  sdt_delete_all,
  sdt_import,
  sdt_create_with_file,
};

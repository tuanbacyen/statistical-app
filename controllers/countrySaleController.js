var mongoose = require("mongoose");
const CountrySale = mongoose.model('CountrySale');
const ReadDir = require('../services/reading_file');
const fs = require('fs');

const cs_index = (req, res) => {
  CountrySale.find().sort({ _id: -1 }).lean().exec((error, docs) => {
    if (error) {
      console.log('list error: ', error);
      return;
    }

    res.render('country_sale/index', {
      list: docs
    });
  });
}

const cs_new = (req, res) => {
  res.render("country_sale/new");
}

const cs_detail = (req, res) => { }

const cs_edit = (req, res) => {
  CountrySale.findById(req.params.id).lean().exec((err, doc) => {
    if (!err) {
      res.render("country_sale/edit", {
        country_sale: doc
      });
    }
  });
}

const cs_create = (req, res) => {
  var cs = new CountrySale();
  cs.country = req.body.country
  cs.sale_code = req.body.sale_code

  cs.save((error, doc) => {
    if (error) {
      console.log('Save error: ', error);
      res.redirect('/country_sale/new', { doc: cs, flash: `Have a error ${error.toString()}` });
    } else {
      res.redirect('/country_sale');
    }
  });
}

const cs_update = (req, res) => {
  const csId = req.body._id;
  CountrySale.findOneAndUpdate({ _id: csId }, req.body, { new: true }, (error, doc) => {
    if (error) {
      console.log('Update error: ', error);
      res.redirect(`/country_sale/edit/${csId}`, { country_sale: doc, flash: `Have a error ${error.toString()}` });
    } else {
      res.redirect('/country_sale');
    }
  });
}

const cs_delete = (req, res) => {
  CountrySale.findByIdAndRemove(req.params.id, (error, doc) => {
    if (error) {
      console.log('Delete error: ', error);
      return;
    }
    res.redirect('/country_sale');
  });
}

const cs_delete_all = (req, res) => {
  CountrySale.deleteMany({}, (error, doc) => {
    if (error) {
      console.log('Delete all error: ', error);
      return;
    }
    res.redirect('/country_sale');
  });
}

const cs_import = (req, res) => {
  res.render("country_sale/import");
}

const cs_create_with_file = (req, res) => {
  const { tempFilePath } = req.files.cs_file;
  const cToK = { A: 'country', B: 'sale_code' };
  const data_csv = ReadDir.csv_file(tempFilePath, "Sheet1", cToK);
  fs.unlinkSync(tempFilePath);
  CountrySale.insertMany(data_csv, function (error, docs) {
    if (error) {
      console.log('Save error: ', error);
      res.redirect('/country_sale/import', { flash: `Have a error ${error.toString()}` });
    } else {
      res.redirect('/country_sale');
    }
  });
}

module.exports = {
  cs_index,
  cs_new,
  cs_edit,
  cs_create,
  cs_update,
  cs_delete,
  cs_delete_all,
  cs_import,
  cs_create_with_file,
};

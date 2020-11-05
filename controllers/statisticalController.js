var mongoose = require("mongoose");
const ReadDir = require('../services/reading_file');
const Sdt = mongoose.model('Sdt');
const Cts = mongoose.model('Cts');

const statistical_index = async (req, res) => {
  const sdt_checks = await Sdt.find().select('country sale_code');
  const data_sdt = sdt_checks.map(function (x) { return { country: x.country.toUpperCase(), sale_code: x.sale_code.toUpperCase() }; });
  res.render("statistical/index", { sdt_checks: data_sdt });
}

const read_dir = (req, res) => {
  let data = [];
  const data_sdt_xml = ReadDir.xml_file();
  data_sdt_xml.forEach((path) => { data.push(get_sdt(path)) });
  res.json({ "data": data });
}

function get_sdt(file_data) {
  const node = file_data.note.TestPackage.filter((i) => { return i.$.name === "getprop"; })[0];
  let data = {};
  node.Test.forEach((icheck) => {
    if (icheck.$.name.includes("country_code")) {
      data.country = icheck.$.value.toUpperCase();
    } else if (icheck.$.name.includes("sale_code")) {
      data.sale_code = icheck.$.value.toUpperCase();
    }
  });
  return data;
}

module.exports = {
  statistical_index,
  read_dir
};

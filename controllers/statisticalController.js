var mongoose = require("mongoose");
const { xml_file } = require('../services/reading_file');
const CountrySale = mongoose.model('CountrySale');
const GmsApp = mongoose.model('GmsApp');
const GmsVersion = mongoose.model('GmsVersion');

const statistical_index = async (req, res) => {
  const data_gv = await GmsVersion.findOne().sort({ created_at: -1 }).select('version');
  const cs_checks = await CountrySale.find().select('country sale_code');
  const ga_checks = await GmsApp.find().select('packages full_code');
  const data_cs = cs_checks.map(function (x) { return { country: x.country.toUpperCase(), sale_code: x.sale_code.toUpperCase() }; });
  const data_ga = ga_checks.map(function (x) { return { packages: x.packages.toLowerCase(), full_code: x.full_code.toLowerCase() }; });
  res.render("statistical/index", { data_gv: data_gv, cs_checks: data_cs, ga_checks: data_ga });
}

const read_dir = (req, res) => {
  let data = [];
  const data_cs_xml = xml_file(req.body.directory);
  data_cs_xml.forEach((file_data) => {
    data.push(get_cs(file_data));
  });
  res.json({ "data": data });
}

function get_cs(file_data) {
  // gms app version
  let file_name = file_data.file_name;
  const origin_data = file_data.data.SDTResult;
  let fingerprint = origin_data.BuildInfo[0].$.fingerprint;
  let tss_model = origin_data.SDTResult_checker[0].TSS[0].$.status;
  let country_sale = {};
  let gms_version = "";
  let gms_apps = [];
  const gps = origin_data.TestPackage.filter((i) => { return i.$.name === "Getprop"; })[0];
  const gas = origin_data.TestPackage.filter((i) => { return i.$.name === "gms"; })[0];
  gps.Test.forEach((gp) => {
    let key_name = gp.$.name;
    if (key_name.includes("ro.csc.country_code")) {
      country_sale.country = gp.$.value.toUpperCase();
    } else if (key_name.includes("ro.csc.sales_code")) {
      country_sale.sale_code = gp.$.value.toUpperCase();
    } else if (key_name.includes("ro.com.google.gmsversion")) {
      gms_version = gp.$.value.toUpperCase();
    }
  });
  gas.Test.forEach((ga) => {
    if (ga.$.value != -1) {
      gms_apps.push({ name: ga.$.name, value: ga.$.value });
    }
  });
  return {
    country_sale: country_sale,
    fingerprint: fingerprint,
    tss_model: tss_model,
    gms_version: gms_version,
    gms_apps: gms_apps,
    file_name: file_name
  };
}

module.exports = {
  statistical_index,
  read_dir
};

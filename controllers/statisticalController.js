var mongoose = require("mongoose");
const Sdt = mongoose.model('Sdt');
const Cts = mongoose.model('Cts');

const statistical_index = (req, res) => {
  res.render("statistical/index")
}

module.exports = {
  statistical_index,
};

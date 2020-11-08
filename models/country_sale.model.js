var mongoose = require("mongoose");

var countrySaleSchema = new mongoose.Schema({
  country: {
    type: String,
    required: 'Field required!'
  },
  sale_code: {
    type: String,
    required: 'Field required!'
  },
},
  { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } }
);

mongoose.model('CountrySale', countrySaleSchema);

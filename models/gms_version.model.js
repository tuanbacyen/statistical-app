var mongoose = require("mongoose");

var gmsVersion = new mongoose.Schema({
  version: {
    type: String,
    required: 'Field required!'
  }
},
  { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } }
);

mongoose.model('GmsVersion', gmsVersion);

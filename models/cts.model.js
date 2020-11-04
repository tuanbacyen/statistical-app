var mongoose = require("mongoose");

var ctsSchema = new mongoose.Schema({
  app_id: {
    type: String,
    required: 'Field required!'
  },
  version: {
    type: String,
    required: 'Field required!'
  }
},
  { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } }
);

mongoose.model('Cts', ctsSchema);

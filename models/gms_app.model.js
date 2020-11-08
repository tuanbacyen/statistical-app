var mongoose = require("mongoose");

var gmsAppSchema = new mongoose.Schema({
  apk: {
    type: String,
    required: 'Field required!'
  },
  packages: {
    type: String,
    required: 'Field required!'
  },
  code_name: {
    type: String,
    required: 'Field required!'
  },
  code_version: {
    type: String,
    required: 'Field required!'
  },
  full_code: {
    type: String,
  }
},
  { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } }
).plugin(function (schema, options) {
  schema.pre('save', function (next) {
    this.full_code = this.code_name + "/" + this.code_version;
    next();
  });
  schema.pre('findOneAndUpdate', function (next) {
    const docToUpdate = this.getUpdate();
    this.updateOne({ full_code: docToUpdate.code_name + "/" + docToUpdate.code_version })
    next();
  });
});


mongoose.model('GmsApp', gmsAppSchema);

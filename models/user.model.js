var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Field required!'
  },
  password: {
    type: String,
    required: 'Field required!'
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: "user",
    required: 'Field required!'
  },
},
  { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } }
);

mongoose.model('User', userSchema);

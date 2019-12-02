const mongoose = require("mongoose");

const { Schema } = mongoose;

const loginSchema = new Schema({
  user_id: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'role'
  }


});

const Login = mongoose.model("login", loginSchema);
module.exports = Login;

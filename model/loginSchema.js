const mongoose = require('mongoose');

const {
   Schema
} = mongoose;

const loginSchema = new Schema({
   user_id: {
      type: String,
      unique: true,
      required: true,
   },
   email: {
      type: String,
      unique: true,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   company: {
      type: String,
      required: true,
   },
})

const Login = mongoose.model('login', loginSchema);
module.exports = Login;
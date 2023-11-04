const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  password: String, // Be sure to hash the password before saving
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  lastlogintime: { type: Date, default: Date.now },
  online: { type: Boolean, default: false },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

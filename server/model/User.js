const mongoose = require('mongoose');
const PostSchema = require('./Post');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  age: Number,
  pfp: String,
  city: String,
});

module.exports = mongoose.model('User', UserSchema);
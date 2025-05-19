const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const urlRegex = /^(https?:\/\/)(www\.)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?#?$/i;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    match: [urlRegex, 'Please enter a valid URL for the avatar'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Incorrect email or password');
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new Error('Incorrect email or password');
  }

  return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
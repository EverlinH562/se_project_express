const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
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
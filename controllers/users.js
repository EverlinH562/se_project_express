const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');

const registerUser = async (req, res) => {
    try {
      const { name, avatar, email, password } = req.body;
  
      if (!email || !password) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ message: 'Email and password are required.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, avatar, email, password: hashedPassword });
  
      return res
        .status(HTTP_STATUS.CREATED)
        .json({ message: 'User created successfully', userId: newUser._id });
  
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(HTTP_STATUS.CONFLICT)
          .json({ message: 'Email already in use.' });
      }
  
      if (error.name === 'ValidationError') {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ message: 'Invalid user data.', details: error.message });
      }

      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.INTERNAL_ERROR, error: error.message });
    }
  };

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(HTTP_STATUS.OK).send({ token });
  } catch (err) {
    if (err.message === 'Incorrect email or password') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).send({ message: err.message });
    }

    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send({ message: ERROR_MESSAGES.INTERNAL_ERROR, error: err.message });
  }
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(HTTP_STATUS.OK).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      if (err.name === 'CastError') {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_USER_ID });
      }

      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR, error: err.message });
    });
};

const updateUserProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (avatar !== undefined) updates.avatar = avatar;

  User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((updatedUser) => res.status(HTTP_STATUS.OK).send(updatedUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: err.message });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(HTTP_STATUS.NOT_FOUND).send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGES.INTERNAL_ERROR, error: err.message });
    });
};

module.exports = {
  registerUser,
  login,
  getCurrentUser,
  updateUserProfile,
};
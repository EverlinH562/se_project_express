const User = require("../models/user");
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(HTTP_STATUS.OK).send(users))
    .catch((err) => {
      console.error(err);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGES.INTERNAL_ERROR, error: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(HTTP_STATUS.CREATED).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: err.message });
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGES.INTERNAL_ERROR, error: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(HTTP_STATUS.OK).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(HTTP_STATUS.NOT_FOUND).send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: ERROR_MESSAGES.INVALID_USER_ID });
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGES.INTERNAL_ERROR, error: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
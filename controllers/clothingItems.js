const clothingItemSchema = require("../models/clothingItem");
const { HTTP_STATUS, ERROR_MESSAGES } = require("../utils/constants");


const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  
  req.user = { _id: "507f1f77bcf86cd799439011" };

  clothingItemSchema
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(HTTP_STATUS.CREATED).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.CREATE_ITEM_ERROR });
      }
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

const getItems = (req, res) => {
  clothingItemSchema
    .find({})
    .then((items) => res.send(items)) 
    .catch(() => {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.GET_ITEMS_ERROR });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItemSchema
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) =>
      res
        .status(HTTP_STATUS.OK)
        .send({ message: "Item deleted successfully", data: item })
    )
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.ITEM_NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_ITEM_ID });
      }
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};


const likeItem = (req, res) => {
  const { itemId } = req.params;

  
  req.user = { _id: "507f1f77bcf86cd799439011" };

  clothingItemSchema
    .findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.ITEM_NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_ITEM_ID });
      }
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};


const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  req.user = { _id: "507f1f77bcf86cd799439011" };

  clothingItemSchema
    .findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.ITEM_NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_ITEM_ID });
      }
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};

const clothingItemSchema = require('../models/clothingItem');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');

const createItem = (req, res) => {
  const { name, weather, imageURL, owner  } = req.body;

  clothingItemSchema.create({name, weather, imageURL, owner})
    .then((item) => res.status(HTTP_STATUS.CREATED).send({ data: item }))
    .catch((e) => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGES.CREATE_ITEM_ERROR, error: e.message });
    });
};

const getItems = (req, res) => {
  clothingItemSchema.find({})
    .then((items) => res.status(HTTP_STATUS.OK).send(items))
    .catch((e) => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGES.GET_ITEMS_ERROR, error: e.message });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  clothingItemSchema.findByIdAndUpdate(itemId, { $set: { imageURL } }, { new: true })
    .orFail()
    .then((item) => res.status(HTTP_STATUS.OK).send({ data: item }))
    .catch((e) => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGES.UPDATE_ITEM_ERROR, error: e.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItemSchema.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(HTTP_STATUS.NO_CONTENT).send())
    .catch((e) => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGES.DELETE_ITEM_ERROR, error: e.message });
    });
};

module.exports = { createItem, getItems, updateItem, deleteItem };
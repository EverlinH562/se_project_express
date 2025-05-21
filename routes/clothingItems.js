const express = require('express');
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require('../controllers/clothingItems');

const publicRoutes = express.Router();
const protectedRoutes = express.Router();

publicRoutes.get('/', getItems);

protectedRoutes.post('/', createItem);
protectedRoutes.delete('/:itemId', deleteItem);
protectedRoutes.put('/:itemId/likes', likeItem);
protectedRoutes.delete('/:itemId/likes', dislikeItem);

module.exports = {
  publicRoutes,
  protectedRoutes,
};

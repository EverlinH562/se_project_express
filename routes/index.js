const router = require("express").Router();
const clothingItems = require('./clothingItems');
const userRouter = require("./users");
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');


router.use("/items", clothingItems); 
router.use("/users", userRouter);    


router.use((req, res) => {
    res.status(HTTP_STATUS.NOT_FOUND).send({ message: ERROR_MESSAGES.ROUTE_NOT_FOUND });
  });
  
  module.exports = router;
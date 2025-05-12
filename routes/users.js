const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");


router.get("/test", (req, res) => {
  res.send("User router is working!");
});


router.get("/", getUsers);
router.post("/", createUser);


router.get("/:userId", getUser);

module.exports = router;
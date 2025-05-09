const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

// 👇 Add test/debug routes or specific endpoints FIRST
router.get("/test", (req, res) => {
  res.send("User router is working!");
});


router.get("/", getUsers);
router.post("/", createUser);


router.get("/:user_Id", getUser);

module.exports = router;
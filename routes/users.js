const router = require("express").Router();
const {
  getCurrentUser,
  updateUserProfile,
} = require("../controllers/users");

router.get("/test", (req, res) => {
  res.send("User router is working!");
});

router.get("/me", getCurrentUser);

router.patch("/me", updateUserProfile);

module.exports = router;

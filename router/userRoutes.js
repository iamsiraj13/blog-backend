const {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
} = require("../controllers/userController");
const authGuard = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);
router.put("/update-profile", authGuard, updateProfile);

module.exports = router;

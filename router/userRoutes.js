const {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
} = require("../controllers/userController");
const authGuard = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);
router.put("/update-profile", authGuard, updateProfile);
router.put("/update-profile-picture", authGuard, updateProfilePicture);

module.exports = router;

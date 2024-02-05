const { registerUser } = require("../controllers/userController");

const router = require("express").Router();

router.get("/register", registerUser);

module.exports = router;

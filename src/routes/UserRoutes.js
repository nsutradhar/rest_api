const express = require("express");
const router = express.Router();
const user = require("../controller/user_controller");

router.post("/signup", user.signup);

router.post("/login", user.login);

router.delete("/:userId", user.delete);

module.exports = router;

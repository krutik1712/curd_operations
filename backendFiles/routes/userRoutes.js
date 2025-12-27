const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const userController = require("../controllers/userController");

router.post("/register", upload.single("photo"), userController.register);
router.post("/login", userController.login);
router.get("/profile/:email", userController.profile);

module.exports = router;
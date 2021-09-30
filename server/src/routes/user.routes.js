const express = require('express');
const router = express.Router();
const respond = require('./respond');
const cont = require("../controllers/user.controllers");
const { authUser } = require('../middleware/auth');

router.get("/", respond(cont.getAllUsers));
router.get("/me", authUser, respond(cont.getLoggedInUser));
router.get("/:userId", respond(cont.getUserById));
router.post("/refresh", respond(cont.refreshAccessToken));
router.post("/register", respond(cont.createUser));
router.post("/login", respond(cont.loginUser));
router.post("/logout", respond(cont.logoutUser));

module.exports = router;
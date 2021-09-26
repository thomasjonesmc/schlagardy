const express = require('express');
const router = express.Router();
const respond = require('./respond');
const cont = require("../controllers/user.controllers");
const { auth } = require('../middleware/auth');

router.get("/", respond(cont.getAllUsers));
router.get("/me", auth, respond(cont.getLoggedInUser));
router.get("/:userId", respond(cont.getUserById));
router.post("/", respond(cont.createUser));

module.exports = router;
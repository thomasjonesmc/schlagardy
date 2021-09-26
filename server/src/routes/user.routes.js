const express = require('express');
const router = express.Router();
const respond = require('./respond');
const cont = require("../controllers/user.controllers");

router.get("/", respond(cont.getAllUsers));
router.get("/:id", respond(cont.getUserById));
router.post("/", respond(cont.createUser));

module.exports = router;
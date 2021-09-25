const express = require('express');
const router = express.Router();
const User = require('../models/User');
const respond = require('./respond');
const cont = require("../controllers/user.controllers");
const { auth } = require('../middleware/auth');

router.get("/", auth, respond(cont.getAllUsers));

router.get("/:id", respond(cont.getUserById));

router.post("/", async (req, res) => {

    let { email, username, displayName, password, passwordCheck } = req.body;

    try {
        const { dataValues } = await User.create({
            email, username, displayName, password
        });

        // ignore the password
        const { password: _, ...response } = dataValues;

        res.json(response);
    } catch (err) {
        res.json({
            error: "error creating user"
        })
    }

});

module.exports = router;
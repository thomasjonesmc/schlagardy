const User = require('../models/User');

function getAllUsers() {
    return User.findAll({
        attributes: {
            exclude: ["password"]
        }
    });
}

function getUserById(id) {
    return User.findByPk(id, {
        attributes: {
            exclude: ["password"]
        }
    });
}

// function createUser({username, email, password})

module.exports = {
    getAllUsers,
    getUserById
}
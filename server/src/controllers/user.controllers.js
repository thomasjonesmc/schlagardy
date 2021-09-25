const serv = require("../services/user.services");

const getAllUsers = (req, res) => {
    return serv.getAllUsers();
}

const getUserById = (req, res) => {
    const { id } = req.params;

    return serv.getUserById(id);
}

module.exports = {
    getAllUsers,
    getUserById
}
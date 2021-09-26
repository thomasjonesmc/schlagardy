const serv = require("../services/user.services");

const getAllUsers = (req, res) => {
    return serv.getAllUsers();
}

const getUserById = (req, res) => {
    const { id } = req.params;

    return serv.getUserById(id);
}

const createUser = (req, res) => {
    const user = req.body;

    return serv.createUser(user);
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser
}
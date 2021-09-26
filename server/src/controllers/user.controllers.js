const serv = require("../services/user.services");
const vld = require("../validation/user.validation");

const getAllUsers = (req, res) => {
    return serv.getAllUsers();
}

const getUserById = (req, res) => {
    const { userId } = req.params;

    return serv.getUserById(userId);
}

const getLoggedInUser = (req, res) => {
    const { userId } = req;

    console.log("\n\n", userId, "\n\n");

    return serv.getUserById(userId);
}

const createUser = async (req, res) => {
    const user = req.body;

    await vld.createUser.validate(user);

    return serv.createUser(user);
}

module.exports = {
    getAllUsers,
    getUserById,
    getLoggedInUser,
    createUser
}
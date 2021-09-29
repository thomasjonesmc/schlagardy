const serv = require("../services/user.services");
const { __day_in_ms } = require("../util/constants");
const vld = require("../validation/user.validation");

const getAllUsers = (req, res) => {
    return serv.getAllUsers();
}

const getUserById = async (req, res) => {
    const { userId } = req.params;

    await vld.userId.validate(userId);

    return serv.getUserById(userId);
}

const getLoggedInUser = async (req, res) => {
    const { userId } = req;

    await vld.userId.validate(userId);

    return serv.getUserById(userId);
}

const createUser = async (req, res) => {
    const user = req.body;

    await vld.createUser.validate(user);

    const { refreshToken, ...createdUser } = await serv.createUser(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: __day_in_ms * 365 * 5,
        sameSite: "strict"
    });

    return createdUser;
}

const loginUser = async (req, res) => {
    const user = req.body;

    await vld.loginUser.validate(user);

    const { refreshToken, ...createdUser } = await serv.loginUser(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: __day_in_ms * 365 * 5,
        sameSite: "strict"
    });

    return createdUser;
}

const logoutUser = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    res.clearCookie("refreshToken");

    return serv.logoutUser(refreshToken);
}

const refreshAccessToken = async (req, res) => {

    const refreshToken = req.cookies?.refreshToken;

    return serv.refreshAccessToken(refreshToken);
}

module.exports = {
    getAllUsers,
    getUserById,
    getLoggedInUser,
    createUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}
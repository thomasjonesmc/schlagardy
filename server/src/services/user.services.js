const { Op } = require("sequelize");
const User = require("../models/User");
const { error } = require("../util/error");
const auth = require("../util/auth");

const getAllUsers = async () => {
    return User.findAll({
        attributes: {
            exclude: ["password"]
        }
    });
}

const getUserById = async (id) => {
    return User.findByPk(id, {
        attributes: {
            exclude: ["password"]
        }
    });
}

const createUser = async ({email, username, displayName, password}) => {
    
    const [ user, created ] = await User.findOrCreate({
        where: {
            [Op.or]: [
                { email },
                { username }
            ]
        },
        defaults: {
            email, username, displayName, password
        }
    });

    if (!created) error("User already exists");

    const accessToken = auth.generateAccessToken(user.id);
    const refreshToken = auth.generateRefreshToken(user.id);

    auth.setRefreshToken(refreshToken);

    // take the password out of the response so its not visible
    const { password: _, ...response } = user.toJSON();

    return {
        refreshToken,
        ...accessToken,
        ...response
    };
}

const refreshAccessToken = async (token) => {

    if (!token) error("No token sent", 401);

    const refreshToken = await auth.getRefreshToken(token);

    if (!refreshToken) error("No refresh token found", 403);

    const { userId } = await auth.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);

    return auth.generateAccessToken(userId);
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    refreshAccessToken
}
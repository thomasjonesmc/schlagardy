const { Op } = require("sequelize");
const User = require("../models/User");
const { error } = require("../util/error");
const auth = require("../util/auth");
const bcrypt = require("bcrypt");

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
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const [ user, created ] = await User.findOrCreate({
        where: {
            [Op.or]: [
                // ignore case when finding email and username
                { email: { [Op.iLike]: email } },
                { username: { [Op.iLike]: username } }
            ]
        },
        defaults: {
            email, username, displayName, password: hashedPassword
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

const loginUser = async ({identifier, password}) => {

    const identifierType = identifier.includes("@") ? "email" : "username";

    const user = await User.findOne({
        where: {
            // ignore case for emails, don't ignore case for usernames
            // this is because emails are case insensitive but we can enforce sensitivity on usernames for more security
            [identifierType]: identifierType === "email" 
                ? { [Op.iLike]: identifier }
                : identifier
        }
    });

    if (!user) error("Invalid Credentials", 400);
    
    // take the password out of the response so its not visible
    const { password: foundPassword, ...response } = user.toJSON();

    const passwordsMatch = await bcrypt.compare(password, foundPassword);
    if (!passwordsMatch) error("Invalid Credentials", 400);

    const accessToken = auth.generateAccessToken(user.id);
    const refreshToken = auth.generateRefreshToken(user.id);

    auth.setRefreshToken(refreshToken);

    return {
        refreshToken,
        ...accessToken,
        ...response
    };
}

const logoutUser = async (token) => {
    const deleted = await auth.deleteRefreshToken(token);
    return { deleted };
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
    loginUser,
    logoutUser,
    refreshAccessToken
}
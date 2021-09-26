const { Op } = require("sequelize");
const User = require("../models/User");
const { error } = require("../util/error");
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET);

    console.log(token);

    // take the password out of the response so its not visible
    const { password: _, ...response } = user.toJSON();

    return response;
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser
}
const User = require('../models/User');

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
    const { dataValues } = await User.create({
        email, username, displayName, password
    });

    // ignore the password
    const { password: _, ...response } = dataValues;

    return response;
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser
}
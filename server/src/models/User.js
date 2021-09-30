const { STRING } = require('sequelize');
const db = require('../config/db');

const User = db.define('users', {
    username: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    displayName: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: STRING,
        allowNull: false
    }
}, {
    db,
    timestamps: true
});

User.sync().then(() => {
    console.log('users table synced');
});

module.exports = User;
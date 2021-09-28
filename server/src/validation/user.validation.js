const yup = require("yup");
require("./reusable");

const createUser = yup.object({
    username: 
        yup.string()
        .required()
        .min(1)
        .max(15)
        .matches(/^[a-zA-Z0-9_]{1,15}$/, "username can only contain letters, numbers, and underscores"),
    email: 
        yup.string()
        .email("invalid email")
        .required(),
    displayName: 
        yup.string()
        .label("display name")
        .required()
        .min(1)
        .max(50),
    password: 
        yup.string()
        .required()
        .min(8)
        .max(250),
    passwordCheck: 
        yup.string()
        .label("password check")
        .required()
        .equalTo(yup.ref("password"))
});

const userId = yup.number().required().positive().integer().label("userId");

module.exports = {
    createUser,
    userId
}
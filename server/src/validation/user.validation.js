const yup = require("yup");
require("./reusable");

const createUser = yup.object({
    username: 
        yup.string()
        .required("required")
        .min(3, "minimum of 3 characters")
        .max(15, "max of 15 characters"),
    email: 
        yup.string()
        .email("invalid email")
        .required("required"),
    displayName: 
        yup.string()
        .required("required")
        .min(2, "minimum of 2 characters")
        .max(50, "max of 50 characters"),
    password: 
        yup.string()
        .required("required")
        .min(8, "minimum of 8 characters")
        .max(250, "max of 250 characters"),
    passwordCheck: 
        yup.string()
        .required("required")
        .equalTo(yup.ref("password"), "doesn't match password")
})

module.exports = {
    createUser
}
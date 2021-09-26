const { error } = require("../util/error");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // testing that errorhandler catches middleware errors
    // error("error in authentication middleware");

    const header = req.headers.authorization;

    if (!header) error("Invalid Header", 401);

    const [ , token ] = header.split(' ');

    if (!token) error("Invalid Token", 401);

    console.log(token);

    jwt.verify(token, process.env.JWT_SECRET, (err, { userId }) => {
        if (err) error("Token verification failed", 403);
        req.userId = userId;
    })

    next();
}

module.exports = {
    auth
}
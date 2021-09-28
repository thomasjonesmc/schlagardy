const { error } = require("../util/error");
const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader) error("Invalid Header", 401);

    const [ , token ] = authHeader.split(' ');
    
    if (!token) error("Invalid Access Token", 401);

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, data) => {

        if (!data || err) error("Invalid Access Token", 403);

        const { userId } = data;

        req.userId = userId;
        next();
    });
}

module.exports = {
    authUser
}
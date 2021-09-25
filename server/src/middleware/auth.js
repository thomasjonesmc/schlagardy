const error = require("../util/error");

const auth = (req, res, next) => {
    // testing that errorhandler catches middleware errors
    // error("error in authentication middleware");

    next();
}

module.exports = {
    auth
}
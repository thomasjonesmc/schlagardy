const { __dev, __error } = require("../util/constants");
const { formatYupError } = require("../util/error");

const errorHandler = (err, req, res, next) => {

    if (__dev) {
        console.log("\nERROR CAUGHT IN HANDLER:");
        console.log("------------------------");
        console.log(err.name);
        console.log(`${err.message ?? "UNKNOWN ERROR"}\n`);
    }

    let error = __error;

    if (err.name === "ValidationError") {
        error = formatYupError(err);
    } else if (err.userCreatedError) {
        error = err.userCreatedError
    }

    res.status(err.httpStatusCode || 500).json({
        error
    });
}

module.exports = errorHandler;
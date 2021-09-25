const { __dev, __error } = require("../util/constants");

const errorHandler = (err, req, res, next) => {

    if (__dev) {
        console.log("\nERROR CAUGHT IN HANDLER:");
        console.log("------------------------");
        console.log(`${err?.message ?? "UNKNOWN ERROR"}\n`);
    }

    res.status(err?.httpStatusCode || 500).json({
        error: err?.userCreatedError ?? __error
    });
}

module.exports = errorHandler;
const { __dev } = require("../util/constants");

const errorHandler = (err, req, res, next) => {

    if (__dev) {
        console.log("\nERROR CAUGHT IN HANDLER:");
        console.log("------------------------");
        console.log(err.name);
        console.log(`${err.message ?? "UNKNOWN ERROR"}\n`);
    }

    let error = "Unknown Error";

    if (err.userCreated || err.name === "ValidationError") {
        error = err.message;
    }

    res.status(err.httpStatusCode || 500).json({ error });
}

module.exports = errorHandler;
const { __error } = require("../util/constants");

// custom error function
// we use this to check if our errors have a status
// if an error has a status property, we know WE created it
// if it doesn't have a status is an an unknown/unexpected error and we may need to react differently
const error = (error, code=500) => {

    let userCreatedError = __error;

    if (typeof error === "string") {


        userCreatedError = {
            field: null,
            message: error
        }
    }

    else if (typeof error === "object") {
        userCreatedError = {
            field: error?.field ?? null,
            message: error?.message ?? "Unknown Error"
        }
    }

    const err = new Error(userCreatedError.message);

    err.httpStatusCode = code;
    err.userCreatedError = userCreatedError;

    throw err;
}

const formatYupError = (err) => {
    return {
        field: err.path,
        message: err.message
    }
}

module.exports = {
    error,
    formatYupError
}
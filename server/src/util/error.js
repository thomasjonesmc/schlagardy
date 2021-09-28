// custom error function
// we use this to check if our errors have a status
// if an error has a userCreated property, we know we created it
// if it doesn't have a status is an an unknown/unexpected error and we may need to react differently
const error = (message, code=500) => {

    const err = new Error(message);

    err.httpStatusCode = code;
    err.userCreated = true;

    throw err;
}

module.exports = {
    error
}
console.log(process.env.NODE_ENV, "WOW");

// double underscores is a convention for globals. __dirname and __filename are like this in node.js
const __dev = process.env.NODE_ENV === "development";
const __prod = process.env.NODE_ENV === "production";
const __test = process.env.NODE_ENV === "test";

// a default error message
const __error = {
    field: null,
    message: "Unknown Error"
}

module.exports = {
    __dev,
    __prod,
    __test,
    __error
}
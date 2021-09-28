// double underscores is a convention for globals. __dirname and __filename are like this in node.js
const __dev = process.env.NODE_ENV === "development";
const __prod = process.env.NODE_ENV === "production";
const __test = process.env.NODE_ENV === "test";
const __day_in_ms = 1000 * 60 * 60 * 24;
const __week_in_ms = __day_in_ms * 7;

module.exports = {
    __dev,
    __prod,
    __test,
    __day_in_ms,
    __week_in_ms
}
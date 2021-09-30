const jwt = require("jsonwebtoken");
const redis = require("../config/redis");

const generateAccessToken = (userId) => {

    // token expiration time in seconds
    const EXPIRE_TIME = 30;

    const accessToken = jwt.sign(
        { userId }, 
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: `${EXPIRE_TIME}s` }
    );

    return {
        accessToken,
        expiresIn: EXPIRE_TIME
    }
}

const generateRefreshToken = (userId) => {
    return jwt.sign(
        {userId}, 
        process.env.JWT_REFRESH_SECRET
    );
}

const setRefreshToken = async (token) => {
    return redis.set(`refresh:${token}`, token);
}

const getRefreshToken = async (token) => {
    return redis.get(`refresh:${token}`);
}

// returns 
const deleteRefreshToken = async (token) => {
    const success = await redis.del(`refresh:${token}`);
    return Boolean(success);
}

const verifyToken = async (token, key) => {
    if(!token) return {};
    return new Promise((resolve,reject) =>
        jwt.verify(token, key, (err, decoded) => {
            if (err) reject(err)
            resolve(decoded)
        })
    );
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    setRefreshToken,
    getRefreshToken,
    deleteRefreshToken,
    verifyToken
}
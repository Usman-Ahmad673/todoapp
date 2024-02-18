const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // Set the Bearer token in the Authorization header
    res.setHeader('Authorization', `Bearer ${token}`);



    // console.log(`Token from JWTToken.js: ${token}`);

    res.status(statusCode).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;

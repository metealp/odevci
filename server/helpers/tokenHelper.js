const JWT = require('jsonwebtoken');

const getUserIdViaToken = function (token) {
    const decodedToken = JWT.decode(token, { complete: true });
    return decodedToken.payload.sub._id;
};

module.exports = getUserIdViaToken;
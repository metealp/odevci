const JWT = require('jsonwebtoken');

module.exports = {
    decodeToken: (token) => { JWT.decode(token, { complete: true }); },
};

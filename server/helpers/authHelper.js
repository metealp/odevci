const Joi = require('joi');
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../configuration')
module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate({email: req.body.email, password: req.body.password});
            if (result.error)
                return res.status(400).json(result.error);

            if (!req.value) req.value = {};
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        signInSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required()
        }),
        signUpSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required(),
        })
    },
    signToken: (userid) => {
        return JWT.sign({
            iss: 'Kelam',
            sub: userid,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getTime() + 1)
        }, JWT_SECRET);
    },
    
    verifyToken: (token) => {
        return JWT.verify(token, JWT_SECRET);
    },
    
    decodeToken: (token) => {
        return JWT.decode(token, { complete: true });
    }

}
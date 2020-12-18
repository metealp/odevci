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
            exp: new Date().setDate(new Date().getDate() + 1)
        }, JWT_SECRET);
    },
    
    verifyToken: async (req, res, next) => {
        try {
            JWT.verify(req.headers.authorization.split(" ")[1], JWT_SECRET, function(error, decoded){
                if (!error){
                    console.log("decoded.sub._id", decoded.sub._id);
                    res.locals.userid = decoded.sub._id;
                    next();
                } else {
                    console.log("Server did not verify the token", error)
                    res.status(500).json({isSuccess: false, message: error})
                    return
                }
            });
        } catch (error) {
            console.log("Could not verify token", error)
            res.status(500).json({isSuccess: false, message: error})
            return
        }
    },
    
    decodeToken: (token) => {
        return JWT.decode(token, { complete: true });
    }

}
const config = require('../configuration');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config.oauth.google.clientID);
const User = require('../models/user');

module.exports = async function(req, res, next) {
    const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: config.oauth.google.clientID,
    });
    const payload = await ticket.getPayload();
    const userid = payload['sub'];
    if(payload.azp != config.oauth.google.clientID || payload.aud != config.oauth.google.clientID ) {
        res.status(400).json({isSuccess: false, message: "Token issuer is not this app."});
        return
    } else if(!payload.email_verified) {
        res.status(400).json({isSuccess: false, message: "Email is not verified."});
        return;
    }
    req.locals = payload;

    const isExistingUser = await User.findOne({'google.id': userid }).exec();
    console.log(isExistingUser)
    if(!isExistingUser){
        const newUser = await User.create({
            method: 'google',
            name: payload.name,
            country: payload.locale,
            google: {
                id: userid,
                email: payload.email,
            }
        })
        // await newUser.save(function(err){
        //     if(err) {
        //         console.log('user saving error');
        //         return
        //     }
        // })
        req.user = newUser;
    } else {
        req.user = isExistingUser;
    }
    next();
}

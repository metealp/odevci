// import Router from 'express-promise-router';
const express = require('express');

const passport = require('passport');
require('../middlewares/passport');

const { validateBody, schemas } = require('../helpers/authHelper');
const authController = require('../controllers/auth');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const googleMW = require('../middlewares/googleAuth')
const authRoutes = express.Router()
const facebookMW = require('../middlewares/facebookAuth');

// sign up with email
authRoutes.post('/signup',
    validateBody(schemas.signUpSchema),
    authController.signUp
);

// signin with email
authRoutes.post( '/signin',
    [validateBody(schemas.signInSchema),
    passportSignIn, 
    ],
    authController.signIn
);

  //signin with google auth
authRoutes.post('/google',
    googleMW,
    authController.googleOAuth
);

//signin with facebook auth
authRoutes.post('/facebook',
    // [passport.authenticate('facebookToken', { session: false }),],
    facebookMW,
    authController.facebookOAuth
);

authRoutes.get('/secret',
    [passportJWT,],
    authController.secret
);

module.exports = authRoutes;
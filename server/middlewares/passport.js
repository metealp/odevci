const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require('bcryptjs');

const config = require('../configuration/index');
const User = require('../models/user');

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
    }, function(payload, done) {
        User.findOne({id: payload.sub}, function(err, user){
            if (err){
                return done(err, false);
            }
            if (user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }
));

// Local Strategy
passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
    try {
        // Find the user given the email
        const user = await User.findOne({ "local.email": email });
    
        // If user doesn't exist, null means no error , false means no user
        if (!user) return done(null, false);
    
        // Compare entered password with the one in the database
        const passwordInDB = user.local.password;
        const isMatch = await bcrypt.compare(password, passwordInDB);
        if (!isMatch) {
            // null means no error , false means no user
            return done(null, false);
        }
        // null means no error , user means no user
        done(null, user);
    } catch (error) {
        //error means error , false means no user
        done(error, false);
    }
}));

// GOOGLE STRATEGY
passport.use(new GoogleStrategy({
        clientID: config.oauth.google.clientID,
        clientSecret: config.oauth.google.clientSecret,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log("accessToken", accessToken)
        console.log("refreshToken", refreshToken)
        console.log("profile", profile)

        try {
            const existingUser = User.findOne({ google: { id: profile.id} }, function (err, user) {
                return done(err, user);
            });
            if (existingUser){
                return(done(null, existingUser))
            }
            const newUser = new User({
                method: 'google',
                google: {
                    id: profile.id,
                    email: profile.emails[0].value
                },
                name: profile.displayName
            });

            newUser.save();
            console.log('successfully saved user', JSON.stringify(newUser))
            done(null, newUser);
        } catch (err){
            done(err, false, "cannot create user");
        }
    }
));

// FACEBOOK STRATEGY
passport.use(new FacebookStrategy({
        clientID: config.oauth.facebook.clientID,
        clientSecret: config.oauth.facebook.clientSecret,
        callbackURL: "http://localhost:8080/"
    },
    async function(accessToken, refreshToken, profile, done) {
        try {
            const existingUser = await User.findOne({ 'facebook.id': profile.id }) 
            if (existingUser){
                return done(null, existingUser)
            }
            const newUser = new User({
                method: 'facebook',
                facebook: {
                    id: profile.id,
                    email: profile.emails[0].value
                },
                name: profile.displayName,
            })
            await newUser.save();
            return done(null, newUser);
        } catch (err){
            done(err, false, error.message)
        }
    }
));

module.exports = passport;
const bcrypt = require('bcryptjs');

const User = require('../models/user')
const { signToken } = require('../helpers/authHelper')


module.exports = {
    signUp: async (req, res, next) => {
        const { email, password, name } = req.value.body;
    
        // Check if there is a user with the entered email
        const foundUser = await User.findOne({ "local.email": email });
        if (foundUser) {
            return res.status(403).json({ error: 'Email is already in use' });
        }
    
        // Create a new user
        const newUser = new User({
            method: 'local',
            local: {
            email: email,
            password: password
            },
            name
        });
  
        // Generate a salt for passsword
        const salt = await bcrypt.genSalt(10);
        // Hash a password with salt all together
        const passwordHash = await bcrypt.hash(newUser.local.password, salt);
        // Append hashed password to user;
        newUser.local.password = passwordHash;
        //save newUser with hashed password
        await newUser.save();
        // Generate a token and respond with it
        const token = signToken(newUser);
        res.status(200).json({ token });
    },
  
    signIn: async (req, res, next) => {
        // Generate a token and respond with it
        const token = signToken(req.user);
        const message = { 'isSuccess': true };
        const userid = req.user._id;

        res.status(200).json({ token, message, userid });
    },
  
    googleOAuth: async (req, res, next) => {
        // Generate a token and respond with it
        // const token = signToken(req.user);
        const message = { 'isSuccess': true };
        res.status(200).json({ message });
    },
  
    facebookOAuth: async (req, res, next) => {
        // Generate a token and respond with it
        // const token = signToken(req.user);
        const message = { 'isSuccess': true };
        res.status(200).json({ token, message });
    },
  
    secret: async (req, res, next) => {
        console.log("name",req.user.name)
        res.json({ secret: req.user.name });
    }
}
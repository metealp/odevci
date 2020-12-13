const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    userType: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    name: String,
    biddings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bid"
        }
    ],
    rates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rate"
        }
    ],
    hwPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HWPost"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    undertakens: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "HWPost"
    }],
    country: String,
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        },
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
    }

});

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;
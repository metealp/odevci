const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hwPostSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    deadline: {type: Date, required: true},
    // files: {
    //     type: file,
    //     required: false,
    // },
    postedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    contractor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

// Create a model
const HWPost = mongoose.model('HWPost', hwPostSchema);

// Export the model
module.exports = HWPost;
// best bid calculated prop
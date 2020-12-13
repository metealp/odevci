const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hwPostSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    files: {
        type: file,
        required: false,
    },
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
    }]
})

// Create a model
const HWPost = mongoose.model('hwpost', hwPostSchema);

// Export the model
module.exports = HWPost;
// best bid calculated prop
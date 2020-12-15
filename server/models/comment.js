const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentText: String,
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    commentedOnPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HWPost"
    }
})

// Create a model
const Comment = mongoose.model('Comment', commentSchema);

// Export the model
module.exports = Comment;
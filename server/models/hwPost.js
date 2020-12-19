const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');
const Bid = require('./bid');

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
        ref: "Bid",
        autopopulate: true,
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        autopopulate: true,
    }],
    contractor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        autopopulate: true,
    },
    contractedBid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
        autopopulate: true,
    } 
})
//return all comments and bids by default
hwPostSchema.plugin(require('mongoose-autopopulate'));

//before removing a post, remove all related comments and bids
hwPostSchema.pre('findOneAndRemove', {document:true, query: false}, async function(next){
    // const docToDelete = await this.model.findOne(this.getFilter());
    const hwId = this._id;
    await Comment.deleteMany({commentedOnPost: hwId});
    await Bid.deleteMany({bidOnPost: hwId});
    next();
})
// Create a model
const HWPost = mongoose.model('HWPost', hwPostSchema);

// Export the model
module.exports = HWPost;
// best bid calculated prop
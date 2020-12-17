const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidSchema = new Schema({
    amount: Number,
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bidOnPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HWPost"
    },
    isContractedBid: {
        type: Boolean,
        default: false,
    }
})

// Create a model
const Bid = mongoose.model('Bid', bidSchema);

// Export the model
module.exports = Bid;
//bidder rate calculated prop
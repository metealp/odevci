const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = new Schema({
    rate: Number,
    rater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ratedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

// Create a model
const Rate = mongoose.model('Rate', rateSchema);

// Export the model
module.exports = Rate;
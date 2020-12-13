const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = new Schema({
    rate: Int,
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
const Rate = mongoose.model('rate', rateSchema);

// Export the model
module.exports = Rate;
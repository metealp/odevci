const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = mongoose.connect(
    process.env.MONGODB_URL,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }, 
    (err) => {
        if (err) throw err;
        console.log("Successfully connected to database.")
    }
)

module.exports = db;
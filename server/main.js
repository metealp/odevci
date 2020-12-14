if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    dotenv.config();
}

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth')
const hwRoutes = require('./routes/hwpost')

// const postRoutes = require('./routes/hwpost')
const morgan = require('morgan')

const db = require('./db/connection');
const app = express();
app.use(morgan('dev'));
app.use(cors(
    // { origin: process.env.BACK_ORIGIN }
));
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(passport.initialize());

// initialize passport
app.get('/', (req, res)=>{
    res.json(
        {
            message: " Hello World"
        }
    )
})
// app.use(app.router);
// routes.initialize(app);

app.use('/auth', authRoutes);
app.use('/posts', hwRoutes);

app.use(function(req, res, next){
    req.db = db;
    next();
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is runnnig on port ${PORT}`)
})
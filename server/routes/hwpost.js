const express = require('express');

const ownerMW = require('../middlewares/owner');
const authHelper = require('../helpers/authHelper');
const hwController = require('../controllers/hwpost');
const commRoutes = require('./comment')
const bidRoutes = require('./bid')

const hwRoutes = express.Router();
hwRoutes.use('/:postid/comment', commRoutes);
hwRoutes.use('/:postid/bid', bidRoutes);

hwRoutes.get('/',
    hwController.retrieveAllHWPosts
);

hwRoutes.post('/new', 
    authHelper.verifyToken,
    hwController.createHWPost
);

hwRoutes.get('/:postid/',
    hwController.retrieveOneHWPost,
)

hwRoutes.put('/:postid/',
    [authHelper.verifyToken,
    ownerMW.allowPostOwner],
    hwController.updateHWPost
)

hwRoutes.delete('/:postid/',
    [authHelper.verifyToken,
    ownerMW.allowPostOwner],
    hwController.deleteHWPost
)

module.exports = hwRoutes;

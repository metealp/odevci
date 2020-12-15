const express = require('express');

const ownerMW = require('../middlewares/owner');
const authHelper = require('../helpers/authHelper');
const commController = require('../controllers/comment');

const commRoutes = express.Router({mergeParams: true});

commRoutes.post('/new/', 
    [authHelper.verifyToken,],
    commController.createComment,
)

commRoutes.put('/:commentid/', 
    [authHelper.verifyToken,
    ownerMW.allowCommentOwner],
    commController.updateComment,
)

commRoutes.delete('/:commentid/', 
    [authHelper.verifyToken,
    ownerMW.allowCommentOwner],
    commController.deleteComment,
)

module.exports = commRoutes;
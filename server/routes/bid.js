const express = require('express');

const ownerMW = require('../middlewares/owner');
const authHelper = require('../helpers/authHelper');
const bidController = require('../controllers/bid');

const bidRoutes = express.Router({mergeParams: true});

bidRoutes.post('/new/',
    [authHelper.verifyToken,
    ownerMW.rejectPostOwner],
    bidController.createBid
)

bidRoutes.put('/:bidid/',
    [authHelper.verifyToken,
    ownerMW.allowBidOwner],
    bidController.updateBid
)

bidRoutes.delete('/:bidid/',
    [authHelper.verifyToken,
    ownerMW.allowBidOwner],
    bidController.deleteBid
)

bidRoutes.post('/:bidid/delegate',
    [authHelper.verifyToken,
    ownerMW.allowPostOwner],
    bidController.delegateBidder
)

module.exports = bidRoutes;

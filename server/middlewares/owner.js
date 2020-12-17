const HWPost = require('../models/hwPost');
const Comment = require('../models/comment');
const Rate = require('../models/rate');
const Bid = require('../models/bid');
const getUserIdViaToken = require('../helpers/tokenHelper');

const rejectPostOwner = async function (req, res, next) {
    const foundPost = await HWPost.findOne({_id: req.params.postid}).exec();
    const postOwnerId = foundPost.postedUser;
    const requestOwnerId = res.locals.userid;
    if (requestOwnerId == postOwnerId) {
        res.status(403).json({isSuccess: false, message: 'Owner of post'});
        return
    }
    next();
}
const allowCommentOwner = async function (req, res, next) {
    const foundComment = await Comment.findOne({_id: req.params.commentid}).exec();
    const commentOwnerId = foundComment.commenter;
    const requestOwnerId = res.locals.userid;
    if (requestOwnerId != commentOwnerId) {
        res.status(401).json({isSuccess: false, message: 'Only owner can alter.'});
        return
    }
    next();
}
const allowPostOwner = async function (req, res, next) {
    const foundPost = await HWPost.findOne({_id: req.params.postid}).exec();
    const postOwnerId = foundPost.postedUser;
    const requestOwnerId = res.locals.userid;
    if (requestOwnerId != postOwnerId) {
        res.status(401).json({isSuccess: false, message: 'Only owner can alter.'});
        return
    }
    next();
}
const allowRateOwner = async function (req, res, next) {
    const foundRate = await Rate.findOne({_id: req.params.rateid}).exec();
    const rateOwner = foundRate.rater;
    const requestOwnerToken = req.headers.authorization.split(" ")[1];
    
    if (getUserIdViaToken(requestOwnerToken) != rateOwner._id) {
        res.status(401).json({isSuccess: false, message: 'Only owner can alter.'});
        return
    }
    next();
}
const allowBidOwner = async function (req, res, next) {
    const foundBid = await Bid.findOne({_id: req.params.bidid}).exec();
    const bidOwnerId = foundBid.bidder;
    const requestOwnerId = res.locals.userid;
    if (requestOwnerId != bidOwnerId) {
        res.status(401).json({isSuccess: false, message: 'Only owner can alter.'});
        return
    }
    next();
}
module.exports = { 
    rejectPostOwner, allowCommentOwner, allowPostOwner, allowRateOwner, allowBidOwner
}
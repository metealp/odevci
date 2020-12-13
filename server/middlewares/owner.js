import HWPost from '../models/hwPost';
import Comment from '../models/comment';
import Rate from '../models/rate';
import Bid from '../models/bid';
import { getUserIdViaToken } from '../helpers/tokenHelper';

const rejectPostOwner = function (req, res, next) {
    const foundPost = HWPost.findOne({_id: req.params.postid});
    const postOwner = foundPost.postedUser;
    const requestOwnerToken = req.headers.authorization.split(" ")[1];
    
    if (getUserIdViaToken(requestOwnerToken) == postOwner._id) {
        res.status(403).json({isSuccess: false, message: 'Owner of post'});
        return
    }
    next();
}
const allowCommentOwner = function (req, res, next) {
    const foundComment = Comment.findOne({_id: req.params.commentid});
    const commentOwner = foundComment.commentedUser;
    const requestOwnerToken = req.headers.authorization.split(" ")[1];
    
    if (getUserIdViaToken(requestOwnerToken) != commentOwner._id) {
        res.status(401).json({isSuccess: false, message: 'Only owner can alter.'});
        return
    }
    next();
}
const allowPostOwner = function (req, res, next) {
    const foundPost = Comment.findOne({_id: req.params.commentid});
    const postOwner = foundPost.postedUser;
    const requestOwnerToken = req.headers.authorization.split(" ")[1];
    
    if (getUserIdViaToken(requestOwnerToken) != postOwner._id) {
        res.status(401).json({isSuccess: false, message: 'Only owner can alter.'});
        return
    }
    next();
}
const allowRateOwner = function (req, res, next) {
    const foundRate = Rate.findOne({_id: req.params.commentid});
    const rateOwner = foundRate.rater;
    const requestOwnerToken = req.headers.authorization.split(" ")[1];
    
    if (getUserIdViaToken(requestOwnerToken) != rateOwner._id) {
        res.status(401).json({isSuccess: false, message: 'Only owner can alter.'});
        return
    }
    next();
}
const allowBidOwner = function (req, res, next) {
    const foundBid = Bid.findOne({_id: req.params.commentid});
    const bidOwner = foundBid.bidder;
    const requestOwnerToken = req.headers.authorization.split(" ")[1];
    
    if (getUserIdViaToken(requestOwnerToken) != bidOwner._id) {
        res.status(401).json({isSuccess: false, message: 'Only owner can alter.'});
        return
    }
    next();
}
module.exports = { 
    rejectPostOwner, allowCommentOwner, allowPostOwner, allowRateOwner, allowBidOwner
}
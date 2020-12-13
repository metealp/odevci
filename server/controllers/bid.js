import Bid from '../models/bid';
import HWPost from '../models/hwPost';
import User from '..//models/user';
import { getUserIdViaToken } from '../helpers/tokenHelper';

const createBid = async function( req, res ) {
    //finding post to add bid
    const targetPost = await HWPost.findOne({_id: req.params.postid});

    //finding bidder
    const requestOwnerToken = req.headers.authorization.split(" ")[1];
    const bidder = await User.findOne({_id: getUserIdViaToken(requestOwnerToken)});

    //push bid to post
    await targetPost.bids.push({ amount: req.body.price, bidder: bidder})

    //then save
    await targetPost.save( function(error){
        if (error){
            res.status(500).json({isSuccess: false, message: 'Server could not save the bid.'});
        }
    });
    res.status(200).json({isSuccess: true, message: 'saved user'})
};

const updateBid = async function( req, res ) {
    await Bid.findOneAndUpdate(
        { _id: req.params.bidid }, //query
        { amount: req.body.amount }, //update
        function (error){ //callback
            res.status(500).json({isSuccess: false, message: 'Server could not update the bid.'});
        });
    const targetBid = await Bid.findById(req.params.bidid);
    // targetBid.save();
    res.status(200).json({ isSuccess: true, message: 'Updated the bid.', targetBid });
};

const deleteBid = async function( req, res ) {
    await Bid.findOneAndRemove(
        { _id: req.params.bidid }, //query
        function (error){ //callback
            res.status(500).json({isSuccess: false, message: 'Server could not delete the bid.'});
        }
    );
    res.status(200).json({ isSuccess: true, message: 'Deleted the bid.' });

};

module.exports = { createBid, updateBid, deleteBid }
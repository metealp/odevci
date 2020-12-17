const Bid = require('../models/bid');
const HWPost = require('../models/hwPost');
const User = require('..//models/user');

const createBid = async function( req, res ) {
    try {
        //finding post to add bid
        const targetPost = await HWPost.findOne({_id: req.params.postid}).exec();
        //finding bidder
        const bidder = await User.findOne({_id: res.locals.userid}).exec();
        const newBid = await Bid.create({ amount: req.body.price, bidder: bidder});
        //push bid to post
        await targetPost.bids.push(newBid._id);
    
        //then save
        await targetPost.save( function(error){
            if (error){
                res.status(500).json({isSuccess: false, message: 'Server could not save the bid.'});
                return
            }
        });
        res.status(200).json({isSuccess: true, message: 'saved bid'})
    } catch (error) {
        res.status(500).json({isSuccess: false, message: 'Server could not create the bid.', error});
        console.log(error);
    }
};

const updateBid = async function( req, res ) {
    try {
        const updatedBid = await Bid.findOneAndUpdate(
            { _id: req.params.bidid }, //query
            { amount: req.body.price }, //update
            {new: true}    
        );
        res.status(200).json({ isSuccess: true, message: 'Updated the bid.', updatedBid });
    } catch (error) {
        res.status(500).json({isSuccess: false, message: 'Server could not update the bid.', error});
        
    }
};

const deleteBid = async function( req, res ) {
    Bid.findOneAndRemove(
        { _id: req.params.bidid }, //query
        function (error, doc ){ //callback
            if (error) {
                res.status(500).json({isSuccess: false, message: 'Server could not delete the bid.'});
                return
            } else {
                res.status(200).json({ isSuccess: true, message: 'Deleted the bid.' });
            }
        }
    );

};

const delegateBidder = async function( req, res ) {
    
    try {
        const contractedBid = await Bid.findOneAndUpdate(
            { _id: req.params.bidid }, //query
            { isContractedBid: true }, //update
            {new: true}    
            );
        const targetPost = await HWPost.findOneAndUpdate(
            {_id: req.params.postid},
            {contractedBid: contractedBid._id},
            {new: true} //update
        );
        //============================== send email to bidder here ==============================
        res.status(200).json({ isSuccess: true, message: 'Delegated the bidder.',targetPost });
    } catch (error) {
        console.log(error)
    }
};

module.exports = { createBid, updateBid, deleteBid, delegateBidder }
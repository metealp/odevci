import Bid from '../models/bid';
import HWPost from '../models/hwPost';
import User from '..//models/user';
import { getUserIdViaToken } from '../helpers/tokenHelper';

const createBid = async function( req, res ) {
    //finding post to add bid
    const targetPost = HWPost.findOne({_id: req.params.postid},
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not find the post.', error});
        }
    );

    //finding bidder
    const requestOwnerToken = req.headers.authorization.split(" ")[1];
    const bidder = User.findOne({_id: getUserIdViaToken(requestOwnerToken)},
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not f,nd the user.', error});
        }
    );

    //push bid to post
    targetPost.bids.push({ amount: req.body.price, bidder: bidder}, 
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not save the bid.', error});
        }
    )

    //then save
    targetPost.save( function(error){
        if (error){
            res.status(500).json({isSuccess: false, message: 'Server could not save the bid.'});
            return
        }
    });
    res.status(200).json({isSuccess: true, message: 'saved user'})
};

const updateBid = async function( req, res ) {
    Bid.findOneAndUpdate(
        { _id: req.params.bidid }, //query
        { amount: req.body.amount }, //update
        function (error){ //callback
            res.status(500).json({isSuccess: false, message: 'Server could not update the bid.'});
            return
        });
    const targetBid = Bid.findById(req.params.bidid, 
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not find the bid after saving.', error});
        }
    );
    // targetBid.save();
    res.status(200).json({ isSuccess: true, message: 'Updated the bid.', targetBid });
};

const deleteBid = async function( req, res ) {
    Bid.findOneAndRemove(
        { _id: req.params.bidid }, //query
        function (error){ //callback
            res.status(500).json({isSuccess: false, message: 'Server could not delete the bid.'});
            return
        }
    );
    res.status(200).json({ isSuccess: true, message: 'Deleted the bid.' });

};

module.exports = { createBid, updateBid, deleteBid }
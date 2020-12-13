import Rate from '../models/rate';
import HWPost from '../models/hwPost';
import User from '..//models/user';
import { getUserIdViaToken } from '../helpers/tokenHelper';

const createRate = async function( req, res ) {
    //finding post to add bid
    const targetPost = HWPost.findOne({_id: req.params.postid}, 
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not find the post.', error});
            return
        }
    );
    const newRate = await targetPost.contractor.rates.create({rate: req.body.rate},
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not save the rate.', error});
            return
        }
    );
    res.status(200).json({isSuccess: true, message: 'Server saved the rate.', newRate})
};

const updateRate = async function( req, res ) {
    Rate.findOneAndUpdate(
        { _id: req.params.rateid }, //query
        { rate: req.body.rate }, //update
        function (error){ //callback
            res.status(500).json({isSuccess: false, message: 'Server could not update the rate.', error});
            return
        });
    const targetRate = await Comment.findById(req.params.rateid, 
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not find the rate after saving.', error});
        }
    );
    res.status(200).json({ isSuccess: true, message: 'Updated the comment.', targetRate });
};

module.exports = { createRate, updateRate }
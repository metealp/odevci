const Comment = require('../models/comment');
const HWPost = require('../models/hwPost');
const User = require('../models/user');
// import { getUserIdViaToken } from '../helpers/tokenHelper';

const createComment = async function( req, res ) {
    //finding post to add bid
    // console.log(req.params.postid);
    //push bid to post
    try {
        const targetPost = await HWPost.findOne({_id: req.params.postid}).exec();
        //finding bidder
        const commenter = await User.findOne({_id: res.locals.userid}).exec();
        const newComment = await Comment.create({ commentText: req.body.commentText, commenter: commenter._id})
        await targetPost.comments.push(newComment._id);
        //then save
        await targetPost.save( function(error){
            if (error){
                res.status(500).json({isSuccess: false, message: 'Server could not save the comment.'});
                return
            }
        });
        res.status(200).json({isSuccess: true, message: 'Server saved the comment.'})
        
    } catch (error) {
        console.log(error)
    }
};

const updateComment = async function( req, res ) {
    try {
        const updatedComm = await Comment.findOneAndUpdate(
            { _id: req.params.commentid }, //query
            { commentText: req.body.commentText }, //update
            {new: true} 
        );
        
        res.status(200).json({ isSuccess: true, message: 'Updated the comment.', updatedComm });

    } catch (error) {
        res.status(500).json({isSuccess: false, message: 'Server could not find the comment after saving.', error});
    }
};

const deleteComment = async function( req, res ) {
    Comment.findOneAndRemove(
        { _id: req.params.commentid }, //query
        function (error, doc){ //callback
            if(error){
                res.status(500).json({isSuccess: false, message: 'Server could not delete the comment.'});
                return
            } else {
                res.status(200).json({ isSuccess: true, message: 'Deleted the comment.' });
            }
        }
    );

};

module.exports = { createComment, updateComment, deleteComment }
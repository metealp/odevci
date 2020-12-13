import Comment from '../models/comment';
import HWPost from '../models/hwPost';
import User from '..//models/user';
import { getUserIdViaToken } from '../helpers/tokenHelper';

const createComment = async function( req, res ) {
    //finding post to add bid
    const targetPost = await HWPost.findOne({_id: req.params.postid});

    //finding bidder
    const requestOwnerToken = req.headers.authorization.split(" ")[1];
    const commenter = await User.findOne({_id: getUserIdViaToken(requestOwnerToken)});

    //push bid to post
    await targetPost.comments.push({ commentText: req.body.commentText, commenter: commenter})

    //then save
    await targetPost.save( function(error){
        if (error){
            res.status(500).json({isSuccess: false, message: 'Server could not save the comment.'});
        }
    });
    res.status(200).json({isSuccess: true, message: 'Server saved the comment.'})
};

const updateComment = async function( req, res ) {
    await Comment.findOneAndUpdate(
        { _id: req.params.commentid }, //query
        { commentText: req.body.commentText }, //update
        function (error){ //callback
            res.status(500).json({isSuccess: false, message: 'Server could not update the comment.'});
        });
    const targetComment = await Comment.findById(req.params.commentid);
    // targetBid.save();
    res.status(200).json({ isSuccess: true, message: 'Updated the comment.', targetComment });
};

const deleteComment = async function( req, res ) {
    await Comment.findOneAndRemove(
        { _id: req.params.commentid }, //query
        function (error){ //callback
            res.status(500).json({isSuccess: false, message: 'Server could not delete the comment.'});
        }
    );
    res.status(200).json({ isSuccess: true, message: 'Deleted the comment.' });

};

module.exports = { createComment, updateComment, deleteComment }
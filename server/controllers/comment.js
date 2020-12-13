import Comment from '../models/comment';
import HWPost from '../models/hwPost';
import User from '..//models/user';
import { getUserIdViaToken } from '../helpers/tokenHelper';

const createComment = async function( req, res ) {
    //finding post to add bid
    const targetPost = HWPost.findOne({_id: req.params.postid}, 
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not find the post.', error});
        }
    );

    //finding bidder
    const requestOwnerToken = req.headers.authorization.split(" ")[1];
    const commenter = User.findOne({_id: getUserIdViaToken(requestOwnerToken)},
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not find the user.', error});
        }
    );

    //push bid to post
    targetPost.comments.push({ commentText: req.body.commentText, commenter: commenter}, 
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not save the comment.', error});
        }
    );

    //then save
    targetPost.save( function(error){
        if (error){
            res.status(500).json({isSuccess: false, message: 'Server could not save the comment.'});
            return
        }
    });
    res.status(200).json({isSuccess: true, message: 'Server saved the comment.'})
};

const updateComment = async function( req, res ) {
    Comment.findOneAndUpdate(
        { _id: req.params.commentid }, //query
        { commentText: req.body.commentText }, //update
        function (error){ //callback
            res.status(500).json({isSuccess: false, message: 'Server could not update the comment.'});
            return
        });
    const targetComment = Comment.findById(req.params.commentid, 
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not find the comment after saving.', error});
        }
    );
    // targetBid.save();
    res.status(200).json({ isSuccess: true, message: 'Updated the comment.', targetComment });
};

const deleteComment = async function( req, res ) {
    Comment.findOneAndRemove(
        { _id: req.params.commentid }, //query
        function (error){ //callback
            res.status(500).json({isSuccess: false, message: 'Server could not delete the comment.'});
            return
        }
    );
    res.status(200).json({ isSuccess: true, message: 'Deleted the comment.' });

};

module.exports = { createComment, updateComment, deleteComment }
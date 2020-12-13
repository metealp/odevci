import HWPost from '../models/hwPost';
import User from '..//models/user';
import { getUserIdViaToken } from '../helpers/tokenHelper';

const retrieveAllHWPosts = async function(req, res) {
    const posts = HWPost.find({}, ['title', 'description'], function(error){
        res.status(500).json({isSuccess: false, message: 'Server could not retrieve posts.', error});
        return
    });
    res.status(200).json({isSuccess: true, message: 'Server has returned all posts.', posts });
};

const retrieveOneHWPost = async function(req, res) {
    const targetPost = HWPost.findOne({_id = req.params.postid }, 
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not retrieve the post.', error});
        }
    )
    res.status(200).json({isSuccess: true, message: 'Server has returned the post.', targetPost });
};

const createHWPost = async function( req, res ) {
    const requestOwnerToken = req.headers.authorization.split(" ")[1];
    const creatorId = getUserIdViaToken(requestOwnerToken);
    const creator = User.findOne({_id: creatorId}, 
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not save the user.', error});
        }
    );
    const newPost = new HWPost({
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        postedUser: creator,
        files: req.body.files,
    });
    newPost.save(
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not save the post.', error});
        }
    )

    res.status(200).json({isSuccess: true, message: 'Server has saved the post.', newPost })
};

const updateHWPost = async function( req, res ) {
    HWPost.findOneAndUpdate(
        { _id: req.params.postid }, //query
        { 
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            files: req.body.files,
        }, //update
        function (error){ //callback
            res.status(500).json({isSuccess: false, message: 'Server could not update the post.'});
            return
        }
    );
    const targetPost = HWPost.findById(req.params.postid, 
        function(error){
            res.status(500).json({isSuccess: false, message: 'Server could not find the post.', error});
        }
    );
    res.status(200).json({ isSuccess: true, message: 'Updated the post.', targetPost });
};

const deleteHWPost = async function( req, res ) {
    HWPost.findOneAndRemove(
        { _id: req.params.postid }, //query
        function (error){ //callback
            res.status(500).json({isSuccess: false, message: 'Server could not delete the post.', error});
            return
        }
    );
    res.status(200).json({ isSuccess: true, message: 'Deleted the post.' });

};

module.exports = { retrieveAllHWPosts, retrieveOneHWPost, createHWPost, updateHWPost, deleteHWPost }
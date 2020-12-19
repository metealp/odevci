const HWPost = require('../models/hwPost');
const User = require('..//models/user');
const getUserIdViaToken = require('../helpers/tokenHelper');

const retrieveAllHWPosts = async function(req, res) {
    const posts = await HWPost.find({},['title', 'description']).exec();
    res.status(200).json({isSuccess: true, message: 'Server has returned all posts.', posts });
};

const retrieveOneHWPost = async function(req, res) {
    const postID = req.params.postid;
    try {
        const targetPost = await HWPost.findOne({_id: postID }).exec(); 
        if (targetPost){
            res.status(200).json({isSuccess: true, message: 'Server has returned the post.', targetPost });
        } else {
            res.status(500).json({isSuccess: false, message: 'Server could not find the post.', error});
            return;
        }
    } catch (error) {
        res.status(500).json({isSuccess: false, message: 'Server could not cast the post id.', error});
        return;
    }
};

const createHWPost = async function( req, res ) {
    try {
        const creator = await User.findOne({_id: res.locals.userid}).exec(); 
        const newPost = new HWPost({
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            postedUser: creator,
            // files: req.body.files,
        });
        await newPost.save();
        res.status(200).json({isSuccess: true, message: 'Server has saved the post.', newPost })
    } catch (error) {
        res.status(500).json({isSuccess: false, message: 'Server could not add the new post.', error});
    }
};

const updateHWPost = async function( req, res ) {
    try {
        const updatedDoc = await HWPost.findOneAndUpdate({ _id: req.params.postid }, //query
            { 
                title: req.body.title,
                description: req.body.description,
                deadline: req.body.deadline,
                // files: req.body.files,
            }, 
            {new: true}) //update
        res.status(200).json({ isSuccess: true, message: 'Updated the post.', updatedDoc });
            
    } catch (error) {
        res.status(502).json({ isSuccess: false, message: error });
        return;
    }
};

const deleteHWPost = async function( req, res ) {
    HWPost.findOneAndRemove(
        { _id: req.params.postid }, //query
        function (error, doc){ //callback
            if (error) {
                res.status(500).json({isSuccess: false, message: 'Server could not delete the post.', error: error.message });
                return
            } else {

                res.status(200).json({ isSuccess: true, message: 'Deleted the post.', doc });
            }
        }
    );

};

module.exports = { retrieveAllHWPosts, retrieveOneHWPost, createHWPost, updateHWPost, deleteHWPost }
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import axios from 'axios';
import router from '../router/index';

// const qs = require('querystring');

export default {
    namespaced: true,
    state() {
        return {
            browsedPosts: {},
            subjectPost: {},
            postList: [],
        };
    },
    mutations: {
        cachePost(state, post) {
            state.browsedPosts[post._id] = post;
        },
        savePostList(state, payload) {
            console.log(payload);
            state.postList = payload;
        },
        setSubjectPost(state, post) {
            state.subjectPost = post;
        },
    },
    actions: {
        async fetchAllPosts(context) {
            try {
                await axios.get('http://localhost:3000/posts/')
                .then((res) => {
                   context.commit("savePostList", res.data.posts);
                });
            } catch (error) {
                return error;
            }
        },
        async fetchOnePost(context, postid) {
            try {
                if (context.state.browsedPosts[postid]) {
                    console.log(postid);
                    await context.commit('setSubjectPost', context.state.browsedPosts[postid]);
                    return;
                }
                axios.get(`http://localhost:3000/posts/${postid}`)
                .then(async (res) => {
                    await context.commit('setSubjectPost', res.data.targetPost);
                    await context.commit('cachePost', res.data.targetPost);
                });
            } catch (error) {
                return error;
            }
        },
        async updatePost(context, postid) {
            try {
                axios.put(`http://localhost:3000/posts/${postid}`)
                .then((res) => {
                    if (res.data.isSuccess) {
                        router.push(`/posts/${postid}`);
                    }
                });
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        async deletePost(context, postid) {
            try {
                axios.delete(`http://localhost:3000/posts/${postid}`)
                .then((res) => {
                    if (res.data.isSuccess) {
                        router.push(`/posts/`);
                    }
                });
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
};

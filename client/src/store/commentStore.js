/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import axios from 'axios';
import router from '../router/index';

export default {
    namespaced: true,
    state() {
        return {

        };
    },
    mutations: {
    },
    actions: {
        async createComment(context, payload) {
            try {
                axios.post(`http://localhost:3000/posts/${payload.postid}/comment/new`, payload)
                .then(async (res) => {
                    if (res.data.isSuccess) {
                        // await context.commit('setSubjectPost', res.data.newPost);
                        // router.push(`/posts/${res.data.newPost._id}`);
                        router.push(`/posts/`);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        async updateComment(context, payload) {
            console.log(payload);
            try {
                axios.put(`http://localhost:3000/posts/${payload.postid}/comment/${payload.commentid}`, payload)
                .then(async (res) => {
                    if (res.data.isSuccess) {
                        // console.log(res.data.updatedDoc);
                        // await context.commit('setSubjectPost', res.data.updatedDoc);
                        // router.push(`/posts/${context.state.subjectPost._id}`);
                        router.push(`/posts/`);
                    }
                });
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        async deleteComment(context, payload) {
            try {
                axios.delete(`http://localhost:3000/posts/${payload.postid}/comment/${payload.commentid}`)
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

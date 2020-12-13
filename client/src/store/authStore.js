import axios from 'axios';

const JWT = require('jsonwebtoken');
const qs = require('querystring');

export const authStore = {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
      userid: '',
    };
  },
  mutations: {
    setUser(state, payload) {
      state.isLoggedIn = true;
      state.userid = payload.userid;
      console.log(state.userid);
      console.log(state.isLoggedIn);
    },
    setUserTimeout(state, expireIn) {
      setTimeout(() => {
        state.userid = '';
        state.isLoggedIn = false;
        localStorage.setItem('token', "");
      }, expireIn);
    },
    unsetUser(state) {
      state.isLoggedIn = false;
      state.userid = '';
      localStorage.setItem('token', "");
      console.log(state);
    },
  },
  actions: {
    async authViaGoogle(context, googleUser) {
      try {
        // eslint-disable-next-line no-undef
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        // console.log("getBasicProfile", googleUser.getBasicProfile());
        // console.log("getAuthResponse", googleUser.getAuthResponse());
        const idToken = googleUser.getAuthResponse().id_token;
        axios.post('http://localhost:3000/auth/google', { idToken })
        .then((response) => {
          console.log(response);
          if (!response.data.message.isSuccess) {
            return (error) => { throw new Error(error.message); };
          }
        })
        .then(() => {
          const userid = googleUser.Ca;
          context.commit('setUser', { userid, idToken });
          context.commit('setUserTimeout', googleUser.xc.expires_in * 1000);
        })
        .catch((error) => {
            console.log(error);
        });
        return null;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async authViaLocal(context, payload) {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      axios.post('http://localhost:3000/auth/signin', qs.stringify(payload), config)
      .then((response) => {
        console.log(response);
        if (!response.data.message.isSuccess) {
          return (error) => { throw new Error(error.message); };
        }
        const userid = response.data.userid;
        const token = response.data.token;
        console.log(JWT.decode(token, { complete: true }));
        context.commit('setUser', { userid, token });
      })
      .catch((error) => { throw new Error(error.message); });
    },
    async authViaFacebook(context, payload) {
      if (payload.status === 'connected') {
        const userid = payload.authResponse.userID;
        const token = payload.authResponse.signedRequest;
        context.commit('setUser', { userid, token });
        context.commit('setUserTimeout', payload.authResponse.expiresIn * 1000);
      }
    },
    signUserOut(context) {
      context.commit('unsetUser');
    },
  },
  // getters: {
  // },
};

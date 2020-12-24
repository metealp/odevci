import axios from 'axios';
import JWT from 'jsonwebtoken';

const qs = require('querystring');

export const authStore = {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
      userid: '',
      userToken: '',
    };
  },
  mutations: {
    setUser(state, payload) {
      state.isLoggedIn = true;
      state.userid = payload.userid;
      state.userToken = payload.token;
      localStorage.setItem('access_token', payload.token);
    },
    setUserTimeout(state, expireIn) {
      setTimeout(() => {
        state.userid = '';
        state.isLoggedIn = false;
        localStorage.setItem('access_token', "");
      }, expireIn);
    },
    unsetUser(state) {
      state.isLoggedIn = false;
      state.userid = '';
      localStorage.setItem('access_token', "");
    },
  },
  actions: {
    async authViaGoogle(context, googleUser) {
      try {
        // eslint-disable-next-line no-undef
        if (!googleUser) {
          return null;
        }
        // console.log("getBasicProfile", googleUser.getBasicProfile());
        // console.log("getAuthResponse", googleUser.getAuthResponse());
        const idToken = googleUser.getAuthResponse().id_token;
        axios.post('http://localhost:3000/auth/google', { idToken })
        .then((response) => {
          if (!response.data.message.isSuccess) {
            return (error) => { throw new Error(error.message); };
          }
          const userid = response.data.userid;
          const token = response.data.token;
          context.commit('setUser', { userid, token });
          // context.commit('setUserTimeout', googleUser.xc.expires_in * 1000);
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
        // console.log(response);
        if (!response.data.message.isSuccess) {
          return (error) => { throw new Error(error.message); };
        }
        const userid = response.data.userid;
        const token = response.data.token;
        // console.log(JWT.decode(token, { complete: true }));
        context.commit('setUser', { userid, token });
          // context.commit('setUserTimeout', payload.authResponse.expiresIn * 1000);
      })
      .catch((error) => { console.log(error); });
    },
    async authViaFacebook(context, payload) {
      if (payload.status === 'connected') {
        const fbtoken = payload.authResponse.signedRequest;
        let userid = payload.authResponse.userID;
        const accessToken = payload.authResponse.accessToken;
        axios.post('http://localhost:3000/auth/facebook', { fbtoken, userid, accessToken })
        .then((response) => {
          // console.log(response);
          userid = response.data.userid;
          const token = response.data.token;
          context.commit('setUser', { userid, token });
          context.commit('setUserTimeout', payload.authResponse.expiresIn * 1000);
        })
        .catch((error) => { throw new Error(error.message); });
      }
    },
    signUserOut(context) {
      context.commit('unsetUser');
    },
    checkLocalStorage(context) {
      if (localStorage.getItem('access_token')) {
        const decodedToken = JWT.decode(localStorage.getItem('access_token'));
        if (decodedToken.iss == "Kelam") {
          if (decodedToken.exp > new Date().getTime()) {
            context.commit('setUser', { userid: decodedToken.sub._id, token: localStorage.getItem('access_token') });
          } else {
            context.commit('unsetUser');
          }
        }
      }
    },
  },
  // getters: {
  // },
};

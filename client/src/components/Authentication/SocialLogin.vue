<template>
<div class="signup-buttons">
  <!-- <fb:login-button
  scope="public_profile,email"
  onlogin="checkLoginState();">
  </fb:login-button> -->
  <!-- <div
    class="fb-login-button"
    data-size="large"
    data-button-type="continue_with"
    data-layout="default"
    data-auto-logout-link="false" data-use-continue-as="false"
    data-width=""></div> -->
  <div id="fb-root"></div>
  <button class="google-signup" @click="googleSignin">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
      Google
  </button>
  <facebookLogin> </facebookLogin>
  <div
  class="fb-like"
  data-share="true"
  data-width="450"
  data-show-faces="true">
  </div>
<!-- <button @click="handleClickGetAuthCode"
:disabled="!Vue3GoogleOauth.isInit">get authCode</button> -->
<div id="fb-root"></div>
</div>

</template>

<script>
import { inject, toRefs } from "vue";
// import { useStore } from 'vuex';
import axios from 'axios';
import facebookLogin from './FacebookLogin.vue';

export default {
  name: 'SocialLogin',
  components: {
    facebookLogin,
  },
  methods: {
    async googleSignin() {
      const googleUser = await this.$gAuth.signIn();
      this.$store.dispatch('authStore/authViaGoogle', googleUser);
    },
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        // console.log("googleUser", googleUser);
        // console.log("getId", this.user);
        // console.log("getBasicProfile", googleUser.getBasicProfile());
        // console.log("getAuthResponse", googleUser.getAuthResponse());
        // console.log(
        //   "getAuthResponse",
        //   this.$gAuth.instance.currentUser.get().getAuthResponse(),
        // );
        // const authUser = JSON.stringify(googleUser.getBasicProfile());
        // const userMail = googleUser.getBasicProfile().getEmail();
        const idToken = googleUser.getAuthResponse().id_token;
        axios.post('http://localhost:3000/auth/google', { idToken })
        .then((response) => {
          console.log(response);
          if (!response.data.message.isSuccess) {
            return (error) => { throw new Error(error.message); };
          }
        })
        .then(() => {
            localStorage.token = idToken;
            console.log("successfully stored token");
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
    async handleClickGetAuthCode() {
      try {
        const authCode = await this.$gAuth.getAuthCode();
        console.log("authCode", authCode);
        return authCode;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
        this.user = "";
        return true;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    handleClickDisconnect() {
      window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
    },
  },
  setup(props) {
    const { isSignIn } = toRefs(props);
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    // const store = useStore();

    return {
      Vue3GoogleOauth,
      // googleSignin,
      isSignIn,
    };
  },
};

</script>

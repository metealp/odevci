<template>
  <div>
    <button class="fbbutton" @click="logInWithFacebook"> Login with Facebook</button>
    <h3>current login status {{ loginStatus }}</h3>
  </div>
</template>
<script>
/* eslint-disable */
// import { fbStatusHandler } from '../../helpers/fbStatusChecker';
// import { useStore } from '../store'
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name:"facebookLogin",
  setup(){
    const store = useStore();
    const loginStatus = computed(() => store.state.authStore.isLoggedIn);

    const logInWithFacebook = async function() {

      window.FB.login(function(response) {
        if (response.authResponse) {
            // console.log(response);
            // fbStatusHandler(response)
            store.dispatch('authStore/authViaFacebook', response);
          // Now you can redirect the user or do an AJAX request to
          // a PHP script that grabs the signed request from the cookie.
        } else {
          alert("User cancelled login or did not fully authorize.");
        }
      }, {scope: 'public_profile,email'});
      return false;
    };

    return {
        store,
        logInWithFacebook,
        loginStatus,
    }
  },
  methods: {

  }
};
</script>
<style>
.fbbutton{
  color:white;
  min-width: 150px;
  background-color: #000000a1;
  height: 2.5rem;
  border-radius: 2rem;
  font-weight: 400;
  font-size: 0.8rem;
}
</style>
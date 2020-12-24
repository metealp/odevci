<template>
  <div id="app-wrapper">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Header> </Header>
    <router-view/>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Header from './components/LayoutPartials/Header.vue';

export default {
  components: {
    Header,
  },
  created() {
    this.$store.dispatch('authStore/checkLocalStorage');
  },
  // mounted() {
  //   // eslint-disable-next-line no-undef
  //   FB.getLoginStatus((response) => {
  //   console.log(response);
  //   });
  // },
};

</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

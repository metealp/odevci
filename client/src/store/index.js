/* eslint-disable */ 
import { createStore } from 'vuex';
import { authStore } from './authStore.js';

export default createStore({
  modules: {
    authStore,
  },
});

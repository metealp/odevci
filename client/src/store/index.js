/* eslint-disable */ 
import { createStore } from 'vuex';
import { authStore } from './authStore.js';
import hwStore from './hwStore.js';


export const store = createStore({
  namespaced: true,
  modules: {
    hwStore,
    authStore,
  },
});

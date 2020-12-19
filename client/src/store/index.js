/* eslint-disable */ 
import { createStore } from 'vuex';
import { authStore } from './authStore.js';
import hwStore from './hwStore.js';
import bidStore from './bidStore.js';
import commentStore from './commentStore.js';



export const store = createStore({
  namespaced: true,
  modules: {
    hwStore,
    authStore,
    bidStore,
    commentStore,
  },
});

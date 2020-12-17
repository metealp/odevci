import { createApp } from 'vue';
import GAuth from 'vue3-google-oauth2';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
// eslint-disable-next-line import/extensions
import { store } from './store';
import './assets/theme.module.css';
import 'primevue/resources/themes/vela-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import { jwtInterceptor } from './helpers/jwtInterceptor';

const gauthOption = {
  clientId: '772542476633-mcdtvmpmfigje4u8ummt2gkro86889so.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
};

// Vue.prototype.$primevue = {ripple: true};
jwtInterceptor();

export default createApp(App).use(store).use(router).use(GAuth, gauthOption)
.mount('#app');

import axios from 'axios';
// import { useStore } from 'vuex';
import { store } from '../store';

export function jwtInterceptor() {
    axios.interceptors.request.use((request) => {
        // add auth header with jwt if account is logged in and request is to the api url
        // const store = useStore();
        const isLoggedIn = store.state.authStore.isLoggedIn;
        const userToken = store.state.authStore.userToken;
        const isApiUrl = request.url.startsWith('http://localhost:3000/posts/');

        if (isLoggedIn && isApiUrl) {
            // eslint-disable-next-line no-param-reassign
            request.headers.Authorization = `Bearer ${userToken}`;
        }

        return request;
    });
}

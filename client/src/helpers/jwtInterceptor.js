import axios from 'axios';
import { useStore } from 'vuex';

export function jwtInterceptor() {
    axios.interceptors.request.use((request) => {
        // add auth header with jwt if account is logged in and request is to the api url
        const store = useStore();
        const userToken = store.state.authStore.isLoggedIn;
        const isLoggedIn = store.state.authStore.userToken;
        const isApiUrl = request.url.startsWith(process.env.VUE_APP_API_URL);

        if (isLoggedIn && isApiUrl) {
            // eslint-disable-next-line no-param-reassign
            request.headers.common.Authorization = `Bearer ${userToken}`;
        }

        return request;
    });
}

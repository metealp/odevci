import router from '../router/index';
import { decodeToken } from './handleToken';

export function authGuard(to) {
    const storedToken = localStorage.token;
    // create localStorage.signType and parse user id according to that
    const savedUserOnLS = decodeToken(storedToken).userID;
    if (savedUserOnLS) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    router.push({ path: '/login', query: { returnUrl: to.fullPath } });
    return false;
}

    // create localStorage.signType and parse expiration and log out call according to that

// let authenticateTimeout;

// function startAuthenticateTimer() {
//     // parse json object from base64 encoded jwt token
//     const jwtToken = JSON.parse(atob(accountSubject.value.token.split('.')[1]));

//     // set a timeout to re-authenticate with the api one minute before the token expires
//     const expires = new Date(jwtToken.exp * 1000);
//     const timeout = expires.getTime() - Date.now() - (60 * 1000);
//     const { accessToken } = FB.getAuthResponse();
//     authenticateTimeout = setTimeout(() => apiAuthenticate(accessToken), timeout);
// }

// function stopAuthenticateTimer() {
//     // cancel timer for re-authenticating with the api
//     clearTimeout(authenticateTimeout);
// }

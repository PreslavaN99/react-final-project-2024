import axios from 'axios'
import {API_URL, USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ROLES, USER_TOKEN} from '../constants/Constants'
import {jwtDecode} from 'jwt-decode'

export function authJwtService(username, password) {
    return axios.post(`${API_URL}/authenticate`, {username, password})
}

export function login(username, token) {
    let decoded = jwtDecode(token);
    let roles = decoded['roles'];
    roles = roles.map(x => x).join(' ');

    sessionStorage.setItem(USER_NAME_SESSION_ROLES, roles.toString());
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem(USER_TOKEN, token);
}

export function logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ROLES);
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(USER_TOKEN);
}

export function isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
}

export function getLoggedInUserName() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
}

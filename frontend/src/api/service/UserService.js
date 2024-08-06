import {API_URL} from '../constants/Constants'

export function onRegister({username, password, email}) {

    let user = {username, password, email};

    return fetch(`${API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function getUserByUsername(username) {

    return fetch(`${API_URL}/account/:${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });
}


export function getAllUsersBySimilarUsername(username) {
    return fetch(`${API_URL}/:${username}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
}

export function removeRoleOnUser(username) {
    return fetch(`${API_URL}/role/:${username}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });
}

export function upgradeRoleOnUser(username) {
    return fetch(`${API_URL}/role-admin/:${username}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });
}

export function deleteUser(username) {
    return fetch(`${API_URL}/user/:${username}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });
}


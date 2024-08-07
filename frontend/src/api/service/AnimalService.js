import {API_URL} from '../constants/Constants'
import axios from "axios";

export function onCreate(form) {
  return fetch(`${API_URL}/animal`, {
    method: 'POST',
    body: form,
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  });
}

export function onAddComment({info, animalId, ownerOfComment}) {
  let comment = {info, animalId, ownerOfComment};
  return fetch(`${API_URL}/add/comment/:${animalId}`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  });
}

export function onDeleteComment(id) {
  return fetch(`${API_URL}/delete/comment/:${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  });
}

export function addLike(username, id) {
  return fetch(`${API_URL}/add/like/:${id}/:${username}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  });
}

export function getAnimalByUsername() {
  let username = sessionStorage.getItem('authenticatedUser');
  return fetch(`${API_URL}/animal-manage/:${username}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
}

export function getAnimalById(id) {
  return fetch(`${API_URL}/animal/:${id}`,
      {
        method: 'GET',
        headers: {
          'info-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
}

export function editAnimalById(form, id) {
  return fetch(`${API_URL}/animal/:${id}`,
      {
        method: 'PUT',
        body: form,
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
}

export function deleteAnimalById({id}) {
  return fetch(`${API_URL}/animal/:${id}`,
      {
        method: 'DELETE',
        headers: {
          'info-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
}

export function getLastThreeAnimals() {
  return fetch(`${API_URL}/lastTheeAnimals`, {
    method: 'GET',
  });
}

export function getAnimalsFromDbByspecies(species) {
  return fetch(`${API_URL}/animal_by_species/:${species}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
}

export function getAnimalByMostLikes() {
  return fetch(`${API_URL}/animal-by-most-likes`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
}

export function getFavouritesAnimalByUsername(username) {
  return fetch(`${API_URL}/favourites/:${username}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
}

export function addFavouriteAnimalToUser(username, id) {
  return fetch(`${API_URL}/favourite/:${id}/:${username}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  });
}

export function deleteFavAnimalByUsernameAndId(username, id) {
  return fetch(`${API_URL}/favourite/:${id}/:${username}`, {
    method: 'DELETE',
    headers: {
      'info-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  });
}

export function getAllAnimal() {
  return fetch(`${API_URL}/find-all`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
}

export function getCommentedAnimalByUsername(username) {
  return fetch(`${API_URL}/animal-by-comments/:${username}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
}

export function adoptAnimalByUser(username, animalId) {
  let data = {username, animalId};
  return fetch(`${API_URL}/adopt`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
}

export function removeAnimalFromUser(username, animalId) {
  let data = {username, animalId};
  return fetch(`${API_URL}/remove_adopt`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
}

export function findAllUsersWhoWantToAdoptByAnimalId(animalId) {
  return fetch(`${API_URL}/users_wanted_to_adopt/${animalId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
}
package com.animals.service;

import com.animals.models.entities.Animal;
import com.animals.models.entities.Favourites;
import com.animals.models.entities.User;
import com.animals.repositories.AnimalRepository;
import com.animals.repositories.FavouritesRepository;
import com.animals.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavouritesService {

  private final FavouritesRepository favouritesRepository;
  private final UserRepository userRepository;
  private final AnimalRepository animalRepository;

  public ResponseEntity<?> addFavouriteToAnimal(String id, String username) {
    Favourites already = this.favouritesRepository.findByUsernameAndId(username, id);
    ResponseEntity<?> result = checkForAuthorAndAnimalExists(id, username);
    if (result != null) {
      return result;
    }
    if (already != null) {
      return ResponseEntity.status(403).build();
    }

    Favourites favourites = new Favourites();
    favourites.setUsername(username);
    favourites.setAnimalId(id);

    this.favouritesRepository.save(favourites);
    return ResponseEntity.status(200).build();
  }

  private ResponseEntity<?> checkForAuthorAndAnimalExists(String id, String username) {
    Optional<Animal> animal = this.animalRepository.findById(id);
    Optional<User> user = this.userRepository.findByUsername(username);
    if (animal.isEmpty() || user.isEmpty()) {
      return ResponseEntity.status(404).build();
    }
    return null;
  }

  public ResponseEntity<?> getFavouritesAnimalsByUsername(String username) {
    List<String> animalIds = this.favouritesRepository.findAllByUsername(username);
    List<Animal> animals = new ArrayList<>();

    if (animalIds.isEmpty()) {
      return ResponseEntity.status(200).build();
    }

    for (String id : animalIds) {
      Animal animal = this.animalRepository.findById(id).get();
      animals.add(animal);
    }
    return ResponseEntity.status(200).body(animals);
  }

  public ResponseEntity<?> deleteFavouritesByUsernameAndAnimalId(String username, String id) {
    ResponseEntity<?> result = checkForAuthorAndAnimalExists(id, username);
    if (result != null) {
      return result;
    }

    Favourites already = this.favouritesRepository.findByUsernameAndId(username, id);
    if (already != null) {
      this.favouritesRepository.delete(already);
      return ResponseEntity.status(200).body(already);
    }

    return ResponseEntity.status(200).build();
  }
}

package com.animals.service;

import com.animals.models.entities.Animal;
import com.animals.models.entities.Likes;
import com.animals.repositories.AnimalRepository;
import com.animals.repositories.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {

  private final AnimalRepository animalRepository;
  private final LikeRepository likeRepository;

  @Transactional
  public ResponseEntity<?> addLikeByIdAndUsername(String Id, String username) {
    Optional<Animal> animal = this.animalRepository.findById(Id);
    if (animal.isEmpty()) {
      return ResponseEntity.status(404).build();
    }
    if (animal.get().getLikes().stream()
        .anyMatch(e -> e.getOwnerOfLike().equalsIgnoreCase(username))) {
      return ResponseEntity.status(200).build();
    }
    Likes like = new Likes();
    like.setOwnerOfLike(username);
    like.setAnimal(animal.get());

    this.likeRepository.save(like);
    return ResponseEntity.status(200).build();
  }
}

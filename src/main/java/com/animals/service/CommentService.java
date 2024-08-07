package com.animals.service;

import com.animals.models.dto.CommentDto;
import com.animals.models.entities.Animal;
import com.animals.models.entities.Comment;
import com.animals.repositories.AnimalRepository;
import com.animals.repositories.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CommentService {

  private final CommentRepository commentRepository;
  private final AnimalRepository animalRepository;
  private final ModelMapper modelMapper;

  public List<Animal> getCommentedAnimalByUsername(String username) {
    List<Animal> animals = new ArrayList<>();
    Set<String> ids = this.commentRepository.findAnimalIdsByCommentsByUsername(username);
    for (String id : ids) {
      Animal byId = this.animalRepository.findById(id).get();
      animals.add(byId);
    }
    return animals;
  }

  public Comment addCommentToAnimal(String animalId, CommentDto commentDto) {
    Animal animal = this.animalRepository.findById(animalId).get();
    Comment comment = this.modelMapper.map(commentDto, Comment.class);
    comment.setAnimal(animal).setCreatedAt(LocalDateTime.now())
        .setContent(commentDto.getInfo());
    commentRepository.save(comment);
    return comment;
  }

  public ResponseEntity<?> deleteCommentById(String id) {
    Optional<Comment> comment = this.commentRepository.findById(id);
    if (comment.isEmpty()) {
      return ResponseEntity.status(401).build();
    }
    String principal = SecurityContextHolder.getContext().getAuthentication().getName();
    if (!principal.equals(comment.get().getOwnerOfComment())) {
      return ResponseEntity.status(401).build();
    }

    this.commentRepository.deleteById(id);
    return ResponseEntity.status(200).body(comment);
  }
}

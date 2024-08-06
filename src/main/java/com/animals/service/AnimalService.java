package com.animals.service;

import com.animals.models.dto.AdoptDto;
import com.animals.models.dto.AnimalDto;
import com.animals.models.dto.UserWantedToAdoptDto;
import com.animals.models.entities.Animal;
import com.animals.models.entities.Comment;
import com.animals.models.entities.SpeciesEnum;
import com.animals.models.entities.User;
import com.animals.repositories.AnimalRepository;
import com.animals.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnimalService {

  private final UserService userService;
  private final ModelMapper modelMapper;
  private final AnimalRepository animalRepository;
  private final CloudinaryService cloudinaryService;
  private final UserRepository userRepository;

  @Transactional
  @SneakyThrows
  public Animal createAnimal(AnimalDto animalDto) {
    Optional<User> user = this.userService.findByUsername(animalDto.getUsername());
    if (user.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
    final String imageUrl = cloudinaryService.uploadImage(animalDto.getFile());
    Animal animal = this.modelMapper.map(animalDto, Animal.class);
    animal.setCreatedBy(user.get().getUsername());
    animal.setCreatedAt(LocalDateTime.now());
    animal.setImageUrl(imageUrl);
    this.animalRepository.save(animal);
    return animal;
  }

  public List<Animal> findAllAnimalsByUsername(String username) {
    return this.animalRepository.findAllByUsername(username);
  }

  public Animal getAnimalById(String id) {
    Optional<Animal> animal = this.animalRepository.findById(id);
    if (animal.isPresent()) {
      List<Comment> collect = animal.get().getComments()
          .stream().sorted(Comparator.comparing(Comment::getCreatedAt))
          .collect(Collectors.toList());
      animal.get().setComments(collect);
      return animal.get();
    }
    return null;
  }

  public Optional<Animal> getById(String id) {
    return this.animalRepository.findById(id);
  }

  @SneakyThrows
  public Animal editAnimal(Animal animal, AnimalDto animalEditDto) {
    Optional<User> user = this.userService.findByUsername(animalEditDto.getUsername());
    if (user.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
    MultipartFile file = animalEditDto.getFile();
    if (file != null && !file.isEmpty()) {
      final String imageUrl = cloudinaryService.uploadImage(file);
      animal.setImageUrl(imageUrl);
    }
    SpeciesEnum species = animalEditDto.getSpecies();
    if (species != null) {
      animal.setSpecies(species.name());
    }
    String info = animalEditDto.getInfo();
    if (info != null && !info.isEmpty()) {
      animal.setInfo(info);
    }
    String name = animalEditDto.getName();
    if (name != null && !name.isEmpty()) {
      animal.setName(name);
    }
    this.animalRepository.save(animal);
    return animal;
  }

  public void deleteById(String id) {
    this.animalRepository.deleteById(id);
  }

  public List<Animal> getLastThreeAddedAnimals() {
    return this.animalRepository.findLastThree()
        .stream()
        .sorted(Comparator.comparing(Animal::getCreatedAt).reversed())
        .limit(3).collect(Collectors.toList());
  }

  public List<Animal> getAnimalBySpecies(String species) {
    return this.animalRepository.findAllBySpecies(species)
        .stream()
        .sorted(Comparator.comparing(Animal::getCreatedAt))
        .collect(Collectors.toList());
  }

  public List<Animal> getAnimalByMostLikes() {
    return this.animalRepository.findAnimalWithMostLikes()
        .stream().limit(1).collect(Collectors.toList());
  }

  public List<Animal> findAllAnimals() {
    return this.animalRepository.findAll();
  }

  @Transactional
  public boolean adoptAnimalByUser(AdoptDto adoptDto) {
    Optional<User> userOpt = userService.findByUsername(adoptDto.username());
    if (userOpt.isEmpty()) {
      return false;
    }
    Optional<Animal> animalOpt = animalRepository.findById(adoptDto.animalId());
    if (animalOpt.isEmpty()) {
      return false;
    }

    User user = userOpt.get();
    Animal animal = animalOpt.get();
    if (animal.getUsers().stream().anyMatch(e -> e.getUsername().equals(adoptDto.username()))) {
      return false;
    }
    animal.getUsers().add(user);
    user.getAnimals().add(animal);
    animalRepository.save(animal);
    userRepository.save(user);

    return true;
  }

  @Transactional
  public boolean removeAdoptAnimalByUser(AdoptDto adoptDto) {
    Optional<User> userOpt = userService.findByUsername(adoptDto.username());
    if (userOpt.isEmpty()) {
      return false;
    }
    Optional<Animal> animalOpt = animalRepository.findById(adoptDto.animalId());
    if (animalOpt.isEmpty()) {
      return false;
    }
    User user = userOpt.get();
    Animal animal = animalOpt.get();
    if (animal.getUsers().stream().noneMatch(e -> e.getUsername().equals(adoptDto.username()))) {
      return false;
    }
    animal.getUsers().remove(user);
    user.getAnimals().remove(animal);
    animalRepository.save(animal);
    userRepository.save(user);

    return true;
  }

  @Transactional
  public List<UserWantedToAdoptDto> findAllUsersWhoWantToAdoptByAnimalId(String animalId) {
    Optional<Animal> animal = animalRepository.findById(animalId);
    if (animal.isEmpty()) {
      return Collections.emptyList();
    }
    String createdBy = animal.get().getCreatedBy();
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    if (!createdBy.equals(username)) {
      return Collections.emptyList();
    }

    return animal.map(value -> value.getUsers().stream()
        .map(e -> new UserWantedToAdoptDto(e.getId(), animalId, e.getUsername(), e.getEmail()))
        .toList()).orElse(Collections.emptyList());
  }
}

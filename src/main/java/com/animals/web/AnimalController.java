package com.animals.web;

import com.animals.configuration.security.annotations.OwnerUser;
import com.animals.models.dto.AdoptDto;
import com.animals.models.dto.AnimalDto;
import com.animals.models.dto.ErrorDto;
import com.animals.models.entities.*;
import com.animals.service.AnimalService;
import com.animals.service.CommentService;
import com.animals.service.FavouritesService;
import jakarta.validation.Valid;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Transactional
public class AnimalController {

  private final AnimalService animalService;
  private final FavouritesService favouritesService;
  private final CommentService commentService;

  @PostMapping(value = "/animal")
  @PreAuthorize("isAuthenticated()")
  @Transactional
  public ResponseEntity<?> createAnimal(
      @RequestParam(value = "file") MultipartFile file,
      @RequestParam(value = "species") String species,
      @RequestParam(value = "info") String info,
      @RequestParam(value = "name") String name,
      @RequestParam(value = "username") String username) {
    if (Arrays.stream(SpeciesEnum.values()).noneMatch(e -> e.name().equalsIgnoreCase(species))) {
      ErrorDto errorDto = new ErrorDto();
      errorDto.setCause("Not valid species.");
      errorDto.setMessage("Not valid species.");
      errorDto.setCode(400);
      return ResponseEntity.status(400).body(errorDto);
    }
    AnimalDto animalDto = new AnimalDto();
    animalDto.setSpecies(SpeciesEnum.valueOf(species.toUpperCase()));
    animalDto.setInfo(info);
    animalDto.setName(name);
    animalDto.setFile(file);
    animalDto.setUsername(username);

    Animal animal = this.animalService.createAnimal(animalDto);
    return ResponseEntity.status(200).body(animal);
  }

  private ErrorDto getErrors(BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      ErrorDto errorDto = new ErrorDto();
      List<FieldError> errors = bindingResult.getFieldErrors();
      List<String> message = new ArrayList<>();
      errorDto.setCode(401);
      for (FieldError e : errors) {
        message.add(e.getDefaultMessage());
      }

      errorDto.setMessage("Create of Animal failed");
      errorDto.setCause(message.toString());
      return errorDto;
    }
    return null;
  }

  @GetMapping("/animal-manage/:{username}")
  @OwnerUser
  @Transactional
  public ResponseEntity<List<Animal>> getAnimalsByUsername(@PathVariable String username) {
    List<Animal> animals = this.animalService.findAllAnimalsByUsername(username);
    return ResponseEntity.status(200).body(animals);
  }


  @GetMapping("/animal/:{id}")
  @PreAuthorize("isAuthenticated()")
  @Transactional
  public ResponseEntity<Animal> getAnimalById(@PathVariable String id) {
    Animal animalById = this.animalService.getAnimalById(id);
    return ResponseEntity.status(200).body(animalById);
  }

  @PutMapping("/animal/:{id}")
  @PreAuthorize("isAuthenticated()")
  @Transactional
  public ResponseEntity<?> editAnimalById(
      @PathVariable String id,
      @RequestParam(value = "file", required = false) MultipartFile file,
      @RequestParam(value = "species", required = false) String species,
      @RequestParam(value = "info", required = false) String info,
      @RequestParam(value = "name", required = false) String name,
      @RequestParam(value = "username", required = false) String username) {
    Optional<Animal> animalById = this.animalService.getById(id);
    ResponseEntity<Animal> result = checkForAuthor(animalById);
    if (result != null) {
      return ResponseEntity.status(403).body(result);
    }
    if (Arrays.stream(SpeciesEnum.values()).noneMatch(e -> e.name().equalsIgnoreCase(species))) {
      ErrorDto errorDto = new ErrorDto();
      errorDto.setCause("Not valid species.");
      errorDto.setMessage("Not valid species.");
      errorDto.setCode(400);
      return ResponseEntity.status(403).body(errorDto);
    }

    AnimalDto animalDto = new AnimalDto();
    animalDto.setSpecies(SpeciesEnum.valueOf(species.toUpperCase()));
    animalDto.setInfo(info);
    animalDto.setName(name);
    animalDto.setFile(file);
    animalDto.setUsername(username);

    Animal animal = this.animalService.editAnimal(animalById.get(), animalDto);
    return ResponseEntity.status(200).body(animal);
  }

  @DeleteMapping("/animal/:{id}")
  @PreAuthorize("isAuthenticated()")
  @Transactional
  public ResponseEntity<?> deleteAnimalById(@PathVariable String id) {
    Optional<Animal> animalById = this.animalService.getById(id);
    ResponseEntity<Animal> result = checkForAuthor(animalById);
    if (result != null) {
      return result;
    }

    this.animalService.deleteById(id);
    return ResponseEntity.status(200).build();
  }

  @GetMapping("/lastTheeAnimals")
  @Transactional
  public ResponseEntity<List<Animal>> getLastThree() {
    List<Animal> lastThree = this.animalService.getLastThreeAddedAnimals();
    return ResponseEntity.status(200).body(lastThree);
  }


  @GetMapping("/animal_by_species/:{species}")
  @PreAuthorize("isAuthenticated()")
  @Transactional
  public ResponseEntity<List<Animal>> getAnimalsBySpecies(@PathVariable String species) {
    List<Animal> lastThree = this.animalService.getAnimalBySpecies(species);
    return ResponseEntity.status(200).body(lastThree);
  }

  @GetMapping("/animal-by-most-likes")
  @PreAuthorize("isAuthenticated()")
  @Transactional
  public ResponseEntity<List<Animal>> getAnimalByMostLikes() {
    List<Animal> animal = this.animalService.getAnimalByMostLikes();
    return ResponseEntity.status(200).body(animal);
  }

  @PostMapping("/favourite/:{id}/:{username}")
  @OwnerUser
  @Transactional
  public ResponseEntity<?> addAnimalToFavourite(@PathVariable String id,
      @PathVariable String username) {
    return this.favouritesService.addFavouriteToAnimal(id, username);
  }

  @GetMapping("/favourites/:{username}")
  @OwnerUser
  @Transactional
  public ResponseEntity<?> getAllFavouritesByUsername(@PathVariable String username) {
    return this.favouritesService.getFavouritesAnimalsByUsername(username);
  }

  @DeleteMapping("/favourite/:{id}/:{username}")
  @OwnerUser
  @Transactional
  public ResponseEntity<?> deleteFavAnimal(@PathVariable String id, @PathVariable String username) {
    return this.favouritesService.deleteFavouritesByUsernameAndAnimalId(username, id);
  }


  @GetMapping("/find-all")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> findAllAnimals() {
    List<Animal> animals = this.animalService.findAllAnimals();
    return ResponseEntity.status(200).body(animals);
  }

  @GetMapping("/animal-by-comments/:{username}")
  @OwnerUser
  @Transactional
  public List<Animal> getAnimalCommentsByUsername(@PathVariable String username) {
    return this.commentService.getCommentedAnimalByUsername(username);
  }

  private ResponseEntity<Animal> checkForAuthor(Optional<Animal> animal) {
    String principal = SecurityContextHolder.getContext().getAuthentication().getName();
    if (animal.isPresent()) {
      if (!principal.equals(animal.get().getCreatedBy())) {
        return ResponseEntity.status(403).build();
      }
    }
    return null;
  }

  @PostMapping("/adopt")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> addAdoptToUser(@Valid @RequestBody AdoptDto adoptDto) {
    boolean result = animalService.adoptAnimalByUser(adoptDto);
    if (!result) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @PostMapping("/remove_adopt")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> removeAdoptFromUser(@Valid @RequestBody AdoptDto adoptDto) {
    boolean result = animalService.removeAdoptAnimalByUser(adoptDto);
    if (!result) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }


  @GetMapping("/users_wanted_to_adopt/{animalId}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> getUsersWantedToAdoptAnimal(@PathVariable String animalId) {
    var users = animalService.findAllUsersWhoWantToAdoptByAnimalId(animalId);
    return ResponseEntity.ok(users);
  }
}

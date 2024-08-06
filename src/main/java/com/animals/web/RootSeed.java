package com.animals.web;

import com.animals.models.entities.Animal;
import com.animals.models.entities.SpeciesEnum;
import com.animals.models.entities.User;
import com.animals.repositories.AnimalRepository;
import com.animals.repositories.UserRepository;
import com.animals.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RootSeed implements CommandLineRunner {

  private final UserRepository userRepository;
  private final AnimalRepository animalRepository;
  private final RoleService roleService;
  private final PasswordEncoder passwordEncoder;

  private static final String USERNAME = "leonkov";
  private static final String EMAIL = "leo@abv.bg";
  private static final String PASSWORD = "333";

  @Override
  @Transactional
  public void run(String... args) {
    if (this.userRepository.count() == 0) {
      this.roleService.seedRolesInDb();
      User user = new User();
      user
          .setAuthorities(roleService.findAllRoles())
          .setUsername(USERNAME)
          .setCreatedAt(LocalDateTime.now())
          .setEmail(EMAIL)
          .setPassword(this.passwordEncoder.encode(PASSWORD));
      this.userRepository.save(user);

      Animal animal = new Animal();
      animal
          .setCreatedAt(LocalDateTime.now())
          .setInfo("This white cat is a sweet baby who search for a new home.")
          .setCreatedBy("leonkov")
          .setSpecies(SpeciesEnum.CAT.name())
          .setImageUrl("https://static.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg")
          .setName("Sam");

      Animal animalS = new Animal();
      animalS
          .setCreatedAt(LocalDateTime.now())
          .setInfo("My need is Tornado and I'm big boy.")
          .setCreatedBy("leonkov")
          .setSpecies(SpeciesEnum.CAT.name())
          .setImageUrl("https://upload.wikimedia.org/wikipedia/commons/9/9b/Photo_of_a_kitten.jpg")
          .setName("Tornado");

      Animal animalT = new Animal();
      animalT
          .setCreatedAt(LocalDateTime.now())
          .setInfo("If you want a good company, Rocky is the choose.")
          .setSpecies(SpeciesEnum.DOG.name())
          .setCreatedBy("leonkov")
          .setImageUrl("http://www.dogwallpapers.net/wallpapers/lovely-jack-russell-terrier-dog-wallpaper.jpg")
          .setName("Rocky");

      List<Animal> animals = List.of(animal, animalT, animalS);
      this.animalRepository.saveAll(animals);
    }
  }
}

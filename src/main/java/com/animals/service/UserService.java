package com.animals.service;

import com.animals.models.dto.CreateUserDto;
import com.animals.models.dto.SuccessDto;
import com.animals.models.dto.UserDto;
import com.animals.models.entities.Role;
import com.animals.models.entities.User;
import com.animals.repositories.RoleRepository;
import com.animals.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final ModelMapper modelMapper;
  private final PasswordEncoder bCryptPasswordEncoder;
  private final RoleRepository roleRepository;

  private SuccessDto getSuccessUpgradeRole(String username, RoleRepository roleRepository,
      UserRepository userRepository) {
    SuccessDto successDto = new SuccessDto();
    String principalUser = SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getName();

    if (principalUser.equals(username)) {
      successDto.setCode(401);
      successDto.setMessage("You can't modify yourself!");
      return successDto;
    }

    Role role = roleRepository.findByAuthority("ROLE_ADMIN");
    Optional<User> user = userRepository.findByUsername(username);
    if (user.isEmpty()) {
      successDto.setCode(401);
      successDto.setMessage("Given username don't exist!");
      return successDto;
    }

    Set<Role> tryRemoveRole = new HashSet<>(user.get().getAuthorities());

    if (tryRemoveRole.contains(role)) {
      successDto.setMessage("User already have admin role!");
      successDto.setCode(401);
      return successDto;
    }
    user.get().getAuthorities().add(role);
    userRepository.save(user.get());

    successDto.setMessage("User updated successful!");
    successDto.setCode(200);
    return successDto;
  }

  private SuccessDto getSuccessDeleteUser(String username, UserRepository userRepository) {
    SuccessDto successDto = new SuccessDto();
    String principalUser = SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getName();

    if (principalUser.equals(username)) {
      successDto.setCode(401);
      successDto.setMessage("You can't delete yourself!");
      return successDto;
    }
    Optional<User> user = userRepository.findByUsername(username);
    if (user.isEmpty()) {
      successDto.setCode(401);
      successDto.setMessage("Given username don't exist!");
      return successDto;
    }
    if (user.get().getUsername().equals("leonkov")) {
      successDto.setCode(401);
      successDto.setMessage("Forbidden action!");
      return successDto;
    }

    userRepository.delete(user.get());

    successDto.setCode(200);
    successDto.setMessage("User with " + username + " deleted!");
    return successDto;
  }

  public Optional<User> findByUsername(String username) {
    return this.userRepository.findByUsername(username);
  }

  public Optional<User> findById(String id) {
    return this.userRepository.findById(id);
  }

  public void registerUser(CreateUserDto userData) {
    Role role = this.roleRepository.findByAuthority("ROLE_USER");
    User user = new User();
    user.setUsername(userData.username())
        .setPassword(this.bCryptPasswordEncoder.encode(userData.password()))
        .setAuthorities(Set.of(role))
        .setCreatedAt(LocalDateTime.now())
        .setEmail(userData.email());
    this.userRepository.save(user);
  }


  public UserDto getUserByUsername(String username) {
    Optional<User> byUsername = this.userRepository.findByUsername(username);
    return this.modelMapper.map(byUsername.get(), UserDto.class);
  }

  public List<String> findAllBySimilarUsername(String username) {
    try {
      return this.userRepository.findAllBySimilarUsername(username).get();
    } catch (ExecutionException | InterruptedException err) {
      return null;
    }
  }

  public SuccessDto removeRoleOnUser(String username) {
    SuccessDto successDto = new SuccessDto();
    String principalUser = SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getName();

    if (principalUser.equals(username)) {
      successDto.setCode(401);
      successDto.setMessage("You can't modify yourself!");
      return successDto;
    }

    Role role = this.roleRepository.findByAuthority("ROLE_ADMIN");
    Optional<User> user = this.userRepository.findByUsername(username);
    if (user.isEmpty()) {
      successDto.setCode(401);
      successDto.setMessage("Given username don't exist!");
      return successDto;
    }

    Set<Role> tryRemoveRole = new HashSet<>(user.get().getAuthorities());

    if (!tryRemoveRole.contains(role)) {
      successDto.setMessage("User don't have admin role!");
      successDto.setCode(401);
      return successDto;
    }
    if (user.get().getUsername().equals("leonkov")) {
      successDto.setCode(401);
      successDto.setMessage("Forbidden action!");
      return successDto;
    }

    user.get().getAuthorities().remove(role);
    this.userRepository.save(user.get());

    successDto.setMessage("User updated successful!");
    successDto.setCode(200);
    return successDto;
  }

  public SuccessDto upgradeRoleOnUser(String username) {
    return getSuccessUpgradeRole(username, this.roleRepository, this.userRepository);
  }

  public SuccessDto deleteUser(String username) {
    return getSuccessDeleteUser(username, this.userRepository);
  }

  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }
}

package com.animals.web;

import com.animals.configuration.security.annotations.Admin;
import com.animals.configuration.security.annotations.OwnerUser;
import com.animals.models.dto.CreateUserDto;
import com.animals.models.dto.ErrorDto;
import com.animals.models.dto.SuccessDto;
import com.animals.models.dto.UserDto;
import com.animals.models.entities.User;
import com.animals.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody @Valid CreateUserDto userData,
      BindingResult bindingResult) {
    Optional<User> tryUser = this.userService.findByUsername(userData.username());
    if (tryUser.isPresent()) {
      ErrorDto errorDto = new ErrorDto();
      errorDto.setMessage("Username is already taken!");
      errorDto.setCause("Username is already taken!");
      errorDto.setCode(401);
      return ResponseEntity.status(401).body(errorDto);
    }

    Optional<User> userByEmail = this.userService.findByEmail(userData.email());
    if (userByEmail.isPresent()) {
      ErrorDto errorDto = new ErrorDto();
      errorDto.setMessage("Email is already taken!");
      errorDto.setCause("Email is already taken!");
      errorDto.setCode(401);
      return ResponseEntity.status(401).body(errorDto);
    }

    ErrorDto errorDto = getErrorRest(bindingResult);
    if (errorDto != null) {
      return ResponseEntity.badRequest().body(errorDto);
    }

    try {
      this.userService.registerUser(userData);
      SuccessDto successDto = new SuccessDto();
      successDto.setCode(200);
      successDto.setMessage("Successful register!");
      return ResponseEntity.ok(successDto);
    } catch (Exception exc) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Register failed!", exc);
    }
  }

  private ErrorDto getErrorRest(BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      ErrorDto errorDto = new ErrorDto();
      List<FieldError> errors = bindingResult.getFieldErrors();
      List<String> message = new ArrayList<>();
      errorDto.setCode(401);
      for (FieldError e : errors) {
        message.add(e.getDefaultMessage());
      }
      errorDto.setMessage("Update Failed");
      errorDto.setCause(message.toString());
      return errorDto;
    }
    return null;
  }

  @GetMapping("/account/:{username}")
  @OwnerUser
  public UserDto getUserByUsername(@PathVariable String username) {
    return this.userService.getUserByUsername(username);
  }


  @GetMapping("/:{username}")
  @Admin
  public List<String> getUsersByUsername(@PathVariable String username) {
    return this.userService.findAllBySimilarUsername(username);
  }

  @PutMapping("/role/:{username}")
  @Admin
  public SuccessDto removeRoleOnUser(@PathVariable String username) {
    return this.userService.removeRoleOnUser(username);
  }


  @PutMapping("/role-admin/:{username}")
  @Admin
  public SuccessDto upgradeRoleOnUser(@PathVariable String username) {
    return this.userService.upgradeRoleOnUser(username);
  }


  @DeleteMapping("/user/:{username}")
  @Admin
  public SuccessDto deleteUser(@PathVariable String username) {
    return this.userService.deleteUser(username);
  }
}

package com.animals.models.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.animals.models.entities.Animal;
import com.animals.models.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@JsonPropertyOrder({"id", "username", "email", "authorities"})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

  private String id;
  private String username;
  private String email;
  private LocalDateTime createdAt = LocalDateTime.now();
  private Set<Role> authorities;
  private List<Animal> animals;
}

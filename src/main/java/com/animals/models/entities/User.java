package com.animals.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@Entity
@Accessors(chain = true)
@Table(name = "users")
public class User extends BaseEntity {

  @Column(name = "username", nullable = false, unique = true)
  @Length(min = 5, max = 100, message = "Username must be between five and one hundred symbols")
  @NotNull(message = "Username has to be filled!")
  private String username;

  @Column(name = "email", nullable = false, unique = true)
  @Email(message = "Enter valid email!")
  @Length(min = 3, max = 100, message = "Provide email between 3 and 100 symbols.")
  private String email;

  @Column(name = "password", nullable = false)
  @Length(min = 5, max = 100, message = "Password must be between five and one hundred symbols")
  @NotNull(message = "Password has to be filled!")
  private String password;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @ManyToMany(targetEntity = Role.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JoinTable(name = "users_roles",
      joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
  private Set<Role> authorities;

  @ManyToMany(cascade = CascadeType.ALL)
  @JsonIgnore
  @JoinTable(name = "users_animals",
      joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "animal_id", referencedColumnName = "id"))
  private List<Animal> animals;
}
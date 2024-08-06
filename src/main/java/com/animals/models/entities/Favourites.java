package com.animals.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "favourites")
public class Favourites extends BaseEntity {

  @Column(name = "username", nullable = false)
  private String username;

  @Column(name = "animal_id", nullable = false)
  private String animalId;
}

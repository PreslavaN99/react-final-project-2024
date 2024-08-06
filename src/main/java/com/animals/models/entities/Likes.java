package com.animals.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Entity
@Accessors(chain = true)
@Table(name = "likes")
public class Likes extends BaseEntity {

  @ManyToOne(targetEntity = Animal.class)
  @JsonIgnore
  private Animal animal;

  @Column(name = "owner_of_like", nullable = false)
  private String ownerOfLike;
}

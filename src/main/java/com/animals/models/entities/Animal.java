package com.animals.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Accessors(chain = true)
@Table(name = "animals")
public class Animal extends BaseEntity {

  @Column(name = "name", nullable = false)
  @NotNull(message = "Enter valid title!")
  @Length(min = 3, max = 100, message = "Enter at least 3 and maximum 100 symbols for title!")
  private String name;

  @Column(name = "info", columnDefinition = "MEDIUMTEXT", nullable = false)
  @NotNull(message = "Enter valid content!")
  @Length(min = 3, message = "Enter at least 3 symbols for content!")
  private String info;

  @Column(name = "species", nullable = false)
  private String species;

  @Column(name = "image_url", nullable = false)
  private String imageUrl;

  @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL)
  private List<Comment> comments;

  @Column(name = "created_by", nullable = false)
  private String createdBy;

  @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL)
  private List<Likes> likes;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @ManyToMany(mappedBy = "animals")
  private List<User> users;
}
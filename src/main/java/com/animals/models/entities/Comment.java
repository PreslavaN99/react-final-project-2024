package com.animals.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Accessors(chain = true)
@Table(name = "comments")
public class Comment extends BaseEntity {

  @Column(name = "content", columnDefinition = "TEXT", nullable = false)
  private String content;

  @ManyToOne
  @JsonIgnore
  private Animal animal;

  @Column(name = "owner_of_comment", nullable = false)
  private String ownerOfComment;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();
}

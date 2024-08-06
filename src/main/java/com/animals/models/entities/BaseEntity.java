package com.animals.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.hibernate.annotations.UuidGenerator;

@Getter
@MappedSuperclass
public abstract class BaseEntity {

  @Id
  @UuidGenerator
  @Column(name = "id", nullable = false)
  private String id;
}

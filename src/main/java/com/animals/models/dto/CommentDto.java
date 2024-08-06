package com.animals.models.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.hibernate.validator.constraints.Length;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class CommentDto {

  private String id;

  @NotNull(message = "Please provide at least 2 symbols to comment")
  @Length(min = 2, max = 2000, message = "Enter at least 2 symbols for content!")
  private String info;

  @NotNull(message = "Owner of comment is required.")
  private String ownerOfComment;

  @NotNull(message = "Animal id is required.")
  private String animalId;
}

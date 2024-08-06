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
public class AnimalEditDto {

  @NotNull(message = "Enter valid name!")
  @Length(min = 3, max = 100, message = "Enter at least 3 and maximum 100 symbols for name!")
  private String name;

  @NotNull(message = "Enter valid info!")
  @Length(min = 3, max = 2000, message = "Enter at least 3 symbols for info!")
  private String info;

  @NotNull
  private String id;

  @NotNull(message = "Enter valid species!")
  private String species;
}

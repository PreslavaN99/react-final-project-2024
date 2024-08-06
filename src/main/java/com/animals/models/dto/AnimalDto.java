package com.animals.models.dto;

import com.animals.models.entities.SpeciesEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

@CustomAnnotation
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnimalDto {

  @NotNull(message = "Enter valid title!")
  @Length(min = 3, max = 100, message = "Enter at least 3 and maximum 100 symbols for title!")
  private String name;

  @NotNull(message = "Enter valid content!")
  @Length(min = 3, max = 2000, message = "Enter at least 3 symbols for content!")
  private String info;

  @NotBlank(message = "username is required")
  @Length(min = 2, max = 100, message = "Enter at least 3 symbols for username!")
  private String username;

  @Length(min = 3, max = 100, message = "Keyword must be at least 3 and maximum 100 symbols.")
  @NotNull(message = "Enter valid keyword!")
  private SpeciesEnum species;

  @NotNull(message = "File is required.")
  private MultipartFile file;
}

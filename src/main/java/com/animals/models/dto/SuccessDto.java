package com.animals.models.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SuccessDto {

  private int code;
  private String message;
}
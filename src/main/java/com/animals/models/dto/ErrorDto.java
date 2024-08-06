package com.animals.models.dto;

import lombok.Data;

@Data
public class ErrorDto {

  private int code;
  private String message;
  private String cause;
}
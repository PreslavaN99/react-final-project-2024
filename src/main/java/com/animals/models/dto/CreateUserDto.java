package com.animals.models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record CreateUserDto(
    @Length(min = 5, max = 100, message = "Username must be between five and one hundred symbols")
    @NotNull(message = "Username has to be filled!")
    String username,

    @Email(message = "Enter valid email!")
    @Length(min = 3, max = 100, message = "Provide email between 3 and 100 symbols.")
    String email,

    @Length(min = 5, max = 100, message = "Password must be between five and one hundred symbols")
    @NotNull(message = "Password has to be filled!")
    String password) {

}

package com.animals.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.SecureRandom;

@EnableAsync
@Configuration
public class AppConfiguration {

  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }

  @Bean
  public PasswordEncoder encoder() {
    SecureRandom random = new SecureRandom();
    byte[] salt = new byte[20];
    random.nextBytes(salt);
    random.generateSeed(20);
    return new BCryptPasswordEncoder(8, random);
  }
}

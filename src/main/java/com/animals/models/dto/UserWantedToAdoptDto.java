package com.animals.models.dto;

public record UserWantedToAdoptDto(
    String userId,
    String animalId,
    String username,
    String email) {}

package com.animals.models.dto;

import jakarta.validation.constraints.NotNull;

public record AdoptDto(@NotNull String username, @NotNull String animalId) {}

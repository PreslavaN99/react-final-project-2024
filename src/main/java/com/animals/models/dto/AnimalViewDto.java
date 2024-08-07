package com.animals.models.dto;

public record AnimalViewDto(
    String name,
    String info,
    String species,
    String imageUrl,
    String createdBy) {

}

package com.animals.repositories;

import com.animals.models.entities.Favourites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouritesRepository extends JpaRepository<Favourites, String> {

  @Query("select f.animalId from Favourites as f where f.username = :username")
  List<String> findAllByUsername(String username);

  @Query("select f from Favourites as f where f.animalId = :id and f.username = :username")
  Favourites findByUsernameAndId(@Param("username") String username, @Param("id") String id);
}

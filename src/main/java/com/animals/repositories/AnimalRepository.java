package com.animals.repositories;

import com.animals.models.entities.Animal;
import com.animals.models.entities.SpeciesEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, String> {

  @Query("select j from  Animal  as j where  j.createdBy = :username order by j.createdAt desc ")
  List<Animal> findAllByUsername(String username);

  @Query("select j from  Animal  as j order by j.createdAt desc")
  List<Animal> findLastThree();

  @Query("select j from Animal as j where j.species like %:species%")
  List<Animal> findAllBySpecies(String species);

  @Query("select j from Animal as j order by size(j.likes) desc ")
  List<Animal> findAnimalWithMostLikes();
}

package com.animals.repositories;

import com.animals.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.Future;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

  Optional<User> findByUsername(String username);

  @Async
  @Transactional(readOnly = true)
  @Query(value = "select u.username from users as u where u.username like %:username%",
      nativeQuery = true)
  Future<List<String>> findAllBySimilarUsername(@Param("username") String username);

  Optional<User> findByEmail(String email);
}

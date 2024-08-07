package com.animals.repositories;

import com.animals.models.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Set;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {

  @Query("select c.animal.id from Comment as c where c.ownerOfComment = :username")
  Set<String> findAnimalIdsByCommentsByUsername(@Param("username") String username);
}

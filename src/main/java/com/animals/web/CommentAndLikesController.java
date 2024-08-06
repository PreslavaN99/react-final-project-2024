package com.animals.web;

import com.animals.configuration.security.annotations.OwnerUser;
import com.animals.models.dto.CommentDto;
import com.animals.models.dto.ErrorDto;
import com.animals.models.entities.Comment;
import com.animals.service.CommentService;
import com.animals.service.LikeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentAndLikesController {

  private final LikeService likeService;
  private final CommentService commentService;

  @PostMapping("/add/comment/:{animalId}")
  @PreAuthorize("isAuthenticated()")
  @Transactional
  public ResponseEntity<?> addCommentToAnimal(@PathVariable String animalId,
      @RequestBody @Valid CommentDto commentDto, BindingResult bindingResult) {
    ErrorDto errors = new ErrorDto();
    ErrorDto owner = checkForOwner(commentDto, errors);
    if (owner != null) {
      return ResponseEntity.status(403).body(owner);
    }

    ErrorDto errorDto = getErrors(bindingResult, errors);
    if (errorDto != null) {
      return ResponseEntity.status(400).body(errorDto);
    }

    Comment comment = this.commentService.addCommentToAnimal(animalId, commentDto);
    return ResponseEntity.status(200).body(comment);
  }

  private ErrorDto getErrors(BindingResult bindingResult, ErrorDto errorDto) {
    if (bindingResult.hasErrors()) {
      List<FieldError> errors = bindingResult.getFieldErrors();
      List<String> message = new ArrayList<>();
      for (FieldError e : errors) {
        message.add(e.getDefaultMessage());
      }
      errorDto.setCode(400);
      errorDto.setMessage("Adding comment Failed");
      errorDto.setCause(message.toString());
      return errorDto;
    }
    return null;
  }

  @DeleteMapping("/delete/comment/:{id}")
  @PreAuthorize("isAuthenticated()")
  @Transactional
  public ResponseEntity<?> deleteCommentById(@PathVariable String id) {
    return this.commentService.deleteCommentById(id);
  }

  @PostMapping("/add/like/:{id}/:{username}")
  @OwnerUser
  @Transactional
  public ResponseEntity<?> addLike(@PathVariable String id, @PathVariable String username) {
    return this.likeService.addLikeByIdAndUsername(id, username);
  }

  private ErrorDto checkForOwner(CommentDto commentDto, ErrorDto errorDto) {
    String principal = SecurityContextHolder.getContext().getAuthentication().getName();
    if (!principal.equals(commentDto.getOwnerOfComment())) {
      errorDto.setCode(402);
      errorDto.setMessage("Adding comment Failed");
      errorDto.setCause("Failed adding!");
      return errorDto;
    }
    return null;
  }
}

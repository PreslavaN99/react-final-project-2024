package com.animals.web;

import com.animals.exceptions.AuthenticationException;
import com.animals.models.dto.JwtTokenRequest;
import com.animals.models.dto.JwtTokenResponse;
import com.animals.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

  @Value("${jwt.http.request.header}")
  private String tokenHeader;

  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final UserDetailsService jwtUserDetailsService;

  @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
  public ResponseEntity<?> login(@RequestBody JwtTokenRequest request)
      throws AuthenticationException {
    authenticate(request.username(), request.password());
    final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(request.username());
    return ResponseEntity.ok(new JwtTokenResponse(jwtService.generateToken(userDetails)));
  }

  @RequestMapping(value = "/refresh", method = RequestMethod.GET)
  public ResponseEntity<?> refreshToken(HttpServletRequest request) {
    String authToken = request.getHeader(tokenHeader);
    final String token = authToken.substring(7);
    if (jwtService.canTokenBeRefreshed(token)) {
      String refreshedToken = jwtService.refreshToken(token);
      return ResponseEntity.ok(new JwtTokenResponse(refreshedToken));
    }

    return ResponseEntity.badRequest().build();
  }

  @ExceptionHandler({AuthenticationException.class})
  public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
  }

  private void authenticate(String username, String password) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(password);
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(username, password));
    } catch (Exception e) {
      throw new AuthenticationException("Not valid credentials", e);
    }
  }
}


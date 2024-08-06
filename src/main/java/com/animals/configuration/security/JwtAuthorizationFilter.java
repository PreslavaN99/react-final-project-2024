package com.animals.configuration.security;

import com.animals.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

  private final UserDetailsService userDetailsService;
  private final JwtService jwtService;

  @Value("${jwt.http.request.header}")
  private String header;

  @Override
  @SuppressWarnings("NullableProblems")
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain chain) throws IOException {
    try {
      authenticate(request);
      chain.doFilter(request, response);
    } catch (Exception e) {
      response.setStatus(401);
      response.getWriter().print(e.getMessage());
      response.getWriter().flush();
    }
  }

  private void authenticate(HttpServletRequest request) {
    final String header = request.getHeader(this.header);
    if (header != null && header.startsWith("Bearer ")) {
      var jwtToken = header.substring(7);
      var username = jwtService.getUsernameFromToken(jwtToken);
      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        if (jwtService.validateToken(jwtToken, userDetails)) {
          var usernamePasswordAuthenticationToken =
              new UsernamePasswordAuthenticationToken(userDetails, null,
                  userDetails.getAuthorities());
          usernamePasswordAuthenticationToken.setDetails(
              new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext()
              .setAuthentication(usernamePasswordAuthenticationToken);
        }
      }
    }
  }
}



package com.animals.service;

import com.animals.models.entities.User;
import com.animals.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> userOpt = userRepository.findByUsername(username);
    return userOpt
        .map(this::map)
        .orElseThrow(() -> new UsernameNotFoundException("No user " + username));
  }

  private UserDetails map(User user) {
    List<GrantedAuthority> authorities = user.
        getAuthorities().
        stream().
        map(r -> new SimpleGrantedAuthority(r.getAuthority())).
        collect(Collectors.toList());

    return new org.springframework.security.core.userdetails.User(
        user.getUsername(),
        user.getPassword() != null ? user.getPassword() : "",
        authorities);
  }
}



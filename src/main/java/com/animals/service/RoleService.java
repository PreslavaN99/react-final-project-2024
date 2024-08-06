package com.animals.service;

import com.animals.models.entities.Role;
import com.animals.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoleService {

  private final RoleRepository roleRepository;

  @Transactional
  public void seedRolesInDb() {
    if (this.roleRepository.count() == 0) {
      this.roleRepository.save(new Role("ROLE_ADMIN"));
      this.roleRepository.save(new Role("ROLE_USER"));
      this.roleRepository.save(new Role("ROLE_ROOT"));
    }
  }

  @Transactional
  public Set<Role> findAllRoles() {
    return new HashSet<>(this.roleRepository.findAll());
  }
}

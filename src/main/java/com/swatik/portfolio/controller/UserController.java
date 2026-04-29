package com.swatik.portfolio.controller;
import com.swatik.portfolio.entity.User;
import com.swatik.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/users")
public class UserController {
    @Autowired private UserRepository repo;
    @GetMapping @PreAuthorize("hasAnyRole('ADMIN','MANAGER')") public ResponseEntity<List<User>> getAll() { return ResponseEntity.ok(repo.findAll()); }
    @GetMapping("/{id}") @PreAuthorize("hasAnyRole('ADMIN','MANAGER')") public ResponseEntity<User> getById(@PathVariable Long id) { return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }
    @PutMapping("/{id}/role") @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<User> updateRole(@PathVariable Long id, @RequestParam User.Role role) {
        return repo.findById(id).map(u -> { u.setRole(role); return ResponseEntity.ok(repo.save(u)); }).orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}/status") @PreAuthorize("hasAnyRole('ADMIN','MANAGER')") public ResponseEntity<User> updateStatus(@PathVariable Long id, @RequestParam User.UserStatus status) {
        return repo.findById(id).map(u -> { u.setStatus(status); return ResponseEntity.ok(repo.save(u)); }).orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Void> delete(@PathVariable Long id) { repo.deleteById(id); return ResponseEntity.noContent().build(); }
}

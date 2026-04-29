package com.swatik.portfolio.controller;
import com.swatik.portfolio.entity.Experience;
import com.swatik.portfolio.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/experiences")
public class ExperienceController {
    @Autowired private ExperienceRepository repo;
    @GetMapping public ResponseEntity<List<Experience>> getAll() { return ResponseEntity.ok(repo.findAllByOrderByDisplayOrderAsc()); }
    @PostMapping @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Experience> create(@RequestBody Experience e) { return ResponseEntity.ok(repo.save(e)); }
    @PutMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Experience> update(@PathVariable Long id, @RequestBody Experience e) { e.setId(id); return ResponseEntity.ok(repo.save(e)); }
    @DeleteMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Void> delete(@PathVariable Long id) { repo.deleteById(id); return ResponseEntity.noContent().build(); }
}

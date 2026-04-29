package com.swatik.portfolio.controller;
import com.swatik.portfolio.entity.Project;
import com.swatik.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/projects")
public class ProjectController {
    @Autowired private ProjectRepository repo;
    @GetMapping public ResponseEntity<List<Project>> getAll() { return ResponseEntity.ok(repo.findAllByOrderByDisplayOrderAsc()); }
    @GetMapping("/featured") public ResponseEntity<List<Project>> getFeatured() { return ResponseEntity.ok(repo.findByFeaturedTrueOrderByDisplayOrderAsc()); }
    @GetMapping("/{id}") public ResponseEntity<Project> getById(@PathVariable Long id) { return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }
    @PostMapping @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Project> create(@RequestBody Project p) { return ResponseEntity.ok(repo.save(p)); }
    @PutMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Project> update(@PathVariable Long id, @RequestBody Project p) { p.setId(id); return ResponseEntity.ok(repo.save(p)); }
    @DeleteMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Void> delete(@PathVariable Long id) { repo.deleteById(id); return ResponseEntity.noContent().build(); }
}

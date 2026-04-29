package com.swatik.portfolio.controller;
import com.swatik.portfolio.entity.Skill;
import com.swatik.portfolio.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/skills")
public class SkillController {
    @Autowired private SkillRepository repo;
    @GetMapping public ResponseEntity<List<Skill>> getAll() { return ResponseEntity.ok(repo.findAllByOrderByDisplayOrderAsc()); }
    @PostMapping @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Skill> create(@RequestBody Skill s) { return ResponseEntity.ok(repo.save(s)); }
    @PutMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Skill> update(@PathVariable Long id, @RequestBody Skill s) { s.setId(id); return ResponseEntity.ok(repo.save(s)); }
    @DeleteMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Void> delete(@PathVariable Long id) { repo.deleteById(id); return ResponseEntity.noContent().build(); }
}

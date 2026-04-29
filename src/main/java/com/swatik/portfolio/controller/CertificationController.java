package com.swatik.portfolio.controller;
import com.swatik.portfolio.entity.Certification;
import com.swatik.portfolio.repository.CertificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/certifications")
public class CertificationController {
    @Autowired private CertificationRepository repo;
    @GetMapping public ResponseEntity<List<Certification>> getAll() { return ResponseEntity.ok(repo.findAllByOrderByDisplayOrderAsc()); }
    @PostMapping @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Certification> create(@RequestBody Certification c) { return ResponseEntity.ok(repo.save(c)); }
    @DeleteMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Void> delete(@PathVariable Long id) { repo.deleteById(id); return ResponseEntity.noContent().build(); }
}

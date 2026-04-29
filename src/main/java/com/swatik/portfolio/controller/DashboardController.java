package com.swatik.portfolio.controller;
import com.swatik.portfolio.repository.*;
import com.swatik.portfolio.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController @RequestMapping("/dashboard")
@PreAuthorize("isAuthenticated()")
public class DashboardController {
    @Autowired private UserRepository userRepo;
    @Autowired private ProjectRepository projectRepo;
    @Autowired private SkillRepository skillRepo;
    @Autowired private ContactMessageRepository msgRepo;
    @GetMapping("/stats")
    public ResponseEntity<Map<String,Object>> getStats() {
        Map<String,Object> stats = new LinkedHashMap<>();
        stats.put("totalUsers", userRepo.count());
        stats.put("activeUsers", userRepo.findByStatus(User.UserStatus.ACTIVE).size());
        stats.put("totalProjects", projectRepo.count());
        stats.put("totalSkills", skillRepo.count());
        stats.put("unreadMessages", msgRepo.countByReadFalse());
        return ResponseEntity.ok(stats);
    }
}

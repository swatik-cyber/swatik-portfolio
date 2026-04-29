package com.swatik.portfolio.controller;

import com.swatik.portfolio.dto.*;
import com.swatik.portfolio.entity.User;
import com.swatik.portfolio.repository.UserRepository;
import com.swatik.portfolio.security.JwtUtils;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired private AuthenticationManager authManager;
    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder encoder;
    @Autowired private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        logger.info("Login attempt for user: {}", req.getUsername());
        try {
            Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = jwtUtils.generateToken(auth);
            User user = userRepo.findByUsername(req.getUsername()).orElseThrow();
            user.setLastLogin(java.time.LocalDateTime.now());
            user.setStatus(User.UserStatus.ACTIVE);
            userRepo.save(user);
            logger.info("Login successful for: {}", req.getUsername());
            return ResponseEntity.ok(new JwtResponse(token, user.getId(), user.getUsername(),
                user.getEmail(), user.getFullName(), user.getRole().name(), user.getAvatarInitials()));
        } catch (BadCredentialsException e) {
            logger.warn("Login failed for: {}", req.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new MessageResponse("Invalid username or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (userRepo.existsByUsername(req.getUsername()))
            return ResponseEntity.badRequest().body(new MessageResponse("Username already taken"));
        if (userRepo.existsByEmail(req.getEmail()))
            return ResponseEntity.badRequest().body(new MessageResponse("Email already in use"));
        User user = User.builder()
            .username(req.getUsername()).email(req.getEmail())
            .password(encoder.encode(req.getPassword()))
            .fullName(req.getFullName())
            .role(User.Role.VIEWER)
            .status(User.UserStatus.ACTIVE)
            .department(req.getDepartment())
            .build();
        userRepo.save(user);
        logger.info("Registered new user: {}", req.getUsername());
        return ResponseEntity.ok(new MessageResponse("User registered successfully"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        User user = userRepo.findByUsername(auth.getName()).orElseThrow();
        return ResponseEntity.ok(new JwtResponse(null, user.getId(), user.getUsername(),
            user.getEmail(), user.getFullName(), user.getRole().name(), user.getAvatarInitials()));
    }
}

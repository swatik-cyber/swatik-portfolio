package com.swatik.portfolio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @NotBlank @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String password;

    @NotBlank
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime lastLogin;
    private String avatarInitials;
    private String department;

    public User() {}

    public User(Long id, String username, String email, String password, String fullName,
                Role role, UserStatus status, LocalDateTime createdAt, LocalDateTime lastLogin,
                String avatarInitials, String department) {
        this.id = id; this.username = username; this.email = email; this.password = password;
        this.fullName = fullName; this.role = role; this.status = status;
        this.createdAt = createdAt; this.lastLogin = lastLogin;
        this.avatarInitials = avatarInitials; this.department = department;
    }

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        if (status == null) status = UserStatus.ACTIVE;
        if (avatarInitials == null && fullName != null) {
            String[] parts = fullName.split(" ");
            avatarInitials = parts.length >= 2
                ? String.valueOf(parts[0].charAt(0)) + parts[1].charAt(0)
                : fullName.substring(0, Math.min(2, fullName.length())).toUpperCase();
        }
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getFullName() { return fullName; }
    public Role getRole() { return role; }
    public UserStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getLastLogin() { return lastLogin; }
    public String getAvatarInitials() { return avatarInitials; }
    public String getDepartment() { return department; }

    public void setId(Long v) { this.id = v; }
    public void setUsername(String v) { this.username = v; }
    public void setEmail(String v) { this.email = v; }
    public void setPassword(String v) { this.password = v; }
    public void setFullName(String v) { this.fullName = v; }
    public void setRole(Role v) { this.role = v; }
    public void setStatus(UserStatus v) { this.status = v; }
    public void setCreatedAt(LocalDateTime v) { this.createdAt = v; }
    public void setLastLogin(LocalDateTime v) { this.lastLogin = v; }
    public void setAvatarInitials(String v) { this.avatarInitials = v; }
    public void setDepartment(String v) { this.department = v; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id; private String username, email, password, fullName, avatarInitials, department;
        private Role role; private UserStatus status;
        private LocalDateTime createdAt, lastLogin;

        public Builder id(Long v) { id = v; return this; }
        public Builder username(String v) { username = v; return this; }
        public Builder email(String v) { email = v; return this; }
        public Builder password(String v) { password = v; return this; }
        public Builder fullName(String v) { fullName = v; return this; }
        public Builder role(Role v) { role = v; return this; }
        public Builder status(UserStatus v) { status = v; return this; }
        public Builder createdAt(LocalDateTime v) { createdAt = v; return this; }
        public Builder lastLogin(LocalDateTime v) { lastLogin = v; return this; }
        public Builder avatarInitials(String v) { avatarInitials = v; return this; }
        public Builder department(String v) { department = v; return this; }
        public User build() { return new User(id, username, email, password, fullName, role, status, createdAt, lastLogin, avatarInitials, department); }
    }

    public enum Role { ADMIN, MANAGER, REVIEWER, VIEWER }
    public enum UserStatus { ACTIVE, IDLE, OFFLINE }
}

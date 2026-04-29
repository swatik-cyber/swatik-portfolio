package com.swatik.portfolio.dto;

public class JwtResponse {
    private String token;
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String role;
    private String avatarInitials;

    public JwtResponse(String token, Long id, String username, String email, String fullName, String role, String avatarInitials) {
        this.token = token; this.id = id; this.username = username;
        this.email = email; this.fullName = fullName; this.role = role; this.avatarInitials = avatarInitials;
    }

    public String getToken() { return token; }
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public String getRole() { return role; }
    public String getAvatarInitials() { return avatarInitials; }
}

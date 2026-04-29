package com.swatik.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank private String username;
    @NotBlank private String password;

    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public void setUsername(String v) { this.username = v; }
    public void setPassword(String v) { this.password = v; }
}

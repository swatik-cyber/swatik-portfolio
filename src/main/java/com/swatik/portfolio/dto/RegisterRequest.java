package com.swatik.portfolio.dto;

import jakarta.validation.constraints.*;

public class RegisterRequest {
    @NotBlank @Size(min=3, max=50) private String username;
    @NotBlank @Email private String email;
    @NotBlank @Size(min=8) private String password;
    @NotBlank private String fullName;
    private String department;

    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getFullName() { return fullName; }
    public String getDepartment() { return department; }

    public void setUsername(String v) { this.username = v; }
    public void setEmail(String v) { this.email = v; }
    public void setPassword(String v) { this.password = v; }
    public void setFullName(String v) { this.fullName = v; }
    public void setDepartment(String v) { this.department = v; }
}

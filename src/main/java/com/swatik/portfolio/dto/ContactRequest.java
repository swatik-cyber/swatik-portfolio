package com.swatik.portfolio.dto;

import jakarta.validation.constraints.*;

public class ContactRequest {
    @NotBlank private String senderName;
    @NotBlank @Email private String senderEmail;
    @NotBlank private String subject;
    @NotBlank private String message;

    public String getSenderName() { return senderName; }
    public String getSenderEmail() { return senderEmail; }
    public String getSubject() { return subject; }
    public String getMessage() { return message; }

    public void setSenderName(String v) { this.senderName = v; }
    public void setSenderEmail(String v) { this.senderEmail = v; }
    public void setSubject(String v) { this.subject = v; }
    public void setMessage(String v) { this.message = v; }
}

package com.swatik.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String senderName;

    @Column(nullable = false)
    private String senderEmail;

    @Column(nullable = false)
    private String subject;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Column(updatable = false)
    private LocalDateTime sentAt;

    @Column(name = "is_read", nullable = false)
    private boolean read;

    public ContactMessage() {}

    public ContactMessage(Long id, String senderName, String senderEmail, String subject, String message, LocalDateTime sentAt, boolean read) {
        this.id = id; this.senderName = senderName; this.senderEmail = senderEmail;
        this.subject = subject; this.message = message; this.sentAt = sentAt; this.read = read;
    }

    @PrePersist
    public void prePersist() { sentAt = LocalDateTime.now(); read = false; }

    public Long getId() { return id; }
    public String getSenderName() { return senderName; }
    public String getSenderEmail() { return senderEmail; }
    public String getSubject() { return subject; }
    public String getMessage() { return message; }
    public LocalDateTime getSentAt() { return sentAt; }
    public boolean isRead() { return read; }

    public void setId(Long id) { this.id = id; }
    public void setSenderName(String v) { this.senderName = v; }
    public void setSenderEmail(String v) { this.senderEmail = v; }
    public void setSubject(String v) { this.subject = v; }
    public void setMessage(String v) { this.message = v; }
    public void setSentAt(LocalDateTime v) { this.sentAt = v; }
    public void setRead(boolean v) { this.read = v; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id; private String senderName, senderEmail, subject, message;
        private LocalDateTime sentAt; private boolean read;
        public Builder id(Long v) { id = v; return this; }
        public Builder senderName(String v) { senderName = v; return this; }
        public Builder senderEmail(String v) { senderEmail = v; return this; }
        public Builder subject(String v) { subject = v; return this; }
        public Builder message(String v) { message = v; return this; }
        public Builder sentAt(LocalDateTime v) { sentAt = v; return this; }
        public Builder read(boolean v) { read = v; return this; }
        public ContactMessage build() { return new ContactMessage(id, senderName, senderEmail, subject, message, sentAt, read); }
    }
}

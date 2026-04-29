package com.swatik.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "certifications")
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String issuer;

    private String credentialId;
    private String credentialUrl;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private String icon;
    private int displayOrder;

    public Certification() {}

    public Certification(Long id, String name, String issuer, String credentialId, String credentialUrl,
                         LocalDate issueDate, LocalDate expiryDate, String icon, int displayOrder) {
        this.id = id; this.name = name; this.issuer = issuer; this.credentialId = credentialId;
        this.credentialUrl = credentialUrl; this.issueDate = issueDate; this.expiryDate = expiryDate;
        this.icon = icon; this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getIssuer() { return issuer; }
    public String getCredentialId() { return credentialId; }
    public String getCredentialUrl() { return credentialUrl; }
    public LocalDate getIssueDate() { return issueDate; }
    public LocalDate getExpiryDate() { return expiryDate; }
    public String getIcon() { return icon; }
    public int getDisplayOrder() { return displayOrder; }

    public void setId(Long v) { this.id = v; }
    public void setName(String v) { this.name = v; }
    public void setIssuer(String v) { this.issuer = v; }
    public void setCredentialId(String v) { this.credentialId = v; }
    public void setCredentialUrl(String v) { this.credentialUrl = v; }
    public void setIssueDate(LocalDate v) { this.issueDate = v; }
    public void setExpiryDate(LocalDate v) { this.expiryDate = v; }
    public void setIcon(String v) { this.icon = v; }
    public void setDisplayOrder(int v) { this.displayOrder = v; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id; private String name, issuer, credentialId, credentialUrl, icon;
        private LocalDate issueDate, expiryDate; private int displayOrder;
        public Builder id(Long v) { id = v; return this; }
        public Builder name(String v) { name = v; return this; }
        public Builder issuer(String v) { issuer = v; return this; }
        public Builder credentialId(String v) { credentialId = v; return this; }
        public Builder credentialUrl(String v) { credentialUrl = v; return this; }
        public Builder issueDate(LocalDate v) { issueDate = v; return this; }
        public Builder expiryDate(LocalDate v) { expiryDate = v; return this; }
        public Builder icon(String v) { icon = v; return this; }
        public Builder displayOrder(int v) { displayOrder = v; return this; }
        public Certification build() { return new Certification(id, name, issuer, credentialId, credentialUrl, issueDate, expiryDate, icon, displayOrder); }
    }
}

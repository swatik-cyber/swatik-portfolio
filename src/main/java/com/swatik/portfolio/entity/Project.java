package com.swatik.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String tag;
    private String githubUrl;
    private String liveUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_tech_stack", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "tech")
    private List<String> techStack;

    private LocalDate startDate;
    private LocalDate endDate;
    private boolean featured;
    private int displayOrder;

    public Project() {}

    public Project(Long id, String title, String description, String tag, String githubUrl, String liveUrl,
                   List<String> techStack, LocalDate startDate, LocalDate endDate, boolean featured, int displayOrder) {
        this.id = id; this.title = title; this.description = description; this.tag = tag;
        this.githubUrl = githubUrl; this.liveUrl = liveUrl; this.techStack = techStack;
        this.startDate = startDate; this.endDate = endDate; this.featured = featured; this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getTag() { return tag; }
    public String getGithubUrl() { return githubUrl; }
    public String getLiveUrl() { return liveUrl; }
    public List<String> getTechStack() { return techStack; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getEndDate() { return endDate; }
    public boolean isFeatured() { return featured; }
    public int getDisplayOrder() { return displayOrder; }

    public void setId(Long v) { this.id = v; }
    public void setTitle(String v) { this.title = v; }
    public void setDescription(String v) { this.description = v; }
    public void setTag(String v) { this.tag = v; }
    public void setGithubUrl(String v) { this.githubUrl = v; }
    public void setLiveUrl(String v) { this.liveUrl = v; }
    public void setTechStack(List<String> v) { this.techStack = v; }
    public void setStartDate(LocalDate v) { this.startDate = v; }
    public void setEndDate(LocalDate v) { this.endDate = v; }
    public void setFeatured(boolean v) { this.featured = v; }
    public void setDisplayOrder(int v) { this.displayOrder = v; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id; private String title, description, tag, githubUrl, liveUrl;
        private List<String> techStack; private LocalDate startDate, endDate;
        private boolean featured; private int displayOrder;
        public Builder id(Long v) { id = v; return this; }
        public Builder title(String v) { title = v; return this; }
        public Builder description(String v) { description = v; return this; }
        public Builder tag(String v) { tag = v; return this; }
        public Builder githubUrl(String v) { githubUrl = v; return this; }
        public Builder liveUrl(String v) { liveUrl = v; return this; }
        public Builder techStack(List<String> v) { techStack = v; return this; }
        public Builder startDate(LocalDate v) { startDate = v; return this; }
        public Builder endDate(LocalDate v) { endDate = v; return this; }
        public Builder featured(boolean v) { featured = v; return this; }
        public Builder displayOrder(int v) { displayOrder = v; return this; }
        public Project build() { return new Project(id, title, description, tag, githubUrl, liveUrl, techStack, startDate, endDate, featured, displayOrder); }
    }
}

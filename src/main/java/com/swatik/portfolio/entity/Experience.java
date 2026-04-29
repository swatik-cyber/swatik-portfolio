package com.swatik.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "experiences")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "experience_highlights", joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "highlight", columnDefinition = "TEXT")
    private List<String> highlights;

    private LocalDate startDate;
    private LocalDate endDate;
    private boolean current;
    private int displayOrder;

    @Enumerated(EnumType.STRING)
    private ExperienceType type;

    public Experience() {}

    public Experience(Long id, String title, String company, String location, String description,
                      List<String> highlights, LocalDate startDate, LocalDate endDate,
                      boolean current, int displayOrder, ExperienceType type) {
        this.id = id; this.title = title; this.company = company; this.location = location;
        this.description = description; this.highlights = highlights; this.startDate = startDate;
        this.endDate = endDate; this.current = current; this.displayOrder = displayOrder; this.type = type;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getCompany() { return company; }
    public String getLocation() { return location; }
    public String getDescription() { return description; }
    public List<String> getHighlights() { return highlights; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getEndDate() { return endDate; }
    public boolean isCurrent() { return current; }
    public int getDisplayOrder() { return displayOrder; }
    public ExperienceType getType() { return type; }

    public void setId(Long v) { this.id = v; }
    public void setTitle(String v) { this.title = v; }
    public void setCompany(String v) { this.company = v; }
    public void setLocation(String v) { this.location = v; }
    public void setDescription(String v) { this.description = v; }
    public void setHighlights(List<String> v) { this.highlights = v; }
    public void setStartDate(LocalDate v) { this.startDate = v; }
    public void setEndDate(LocalDate v) { this.endDate = v; }
    public void setCurrent(boolean v) { this.current = v; }
    public void setDisplayOrder(int v) { this.displayOrder = v; }
    public void setType(ExperienceType v) { this.type = v; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id; private String title, company, location, description;
        private List<String> highlights; private LocalDate startDate, endDate;
        private boolean current; private int displayOrder; private ExperienceType type;
        public Builder id(Long v) { id = v; return this; }
        public Builder title(String v) { title = v; return this; }
        public Builder company(String v) { company = v; return this; }
        public Builder location(String v) { location = v; return this; }
        public Builder description(String v) { description = v; return this; }
        public Builder highlights(List<String> v) { highlights = v; return this; }
        public Builder startDate(LocalDate v) { startDate = v; return this; }
        public Builder endDate(LocalDate v) { endDate = v; return this; }
        public Builder current(boolean v) { current = v; return this; }
        public Builder displayOrder(int v) { displayOrder = v; return this; }
        public Builder type(ExperienceType v) { type = v; return this; }
        public Experience build() { return new Experience(id, title, company, location, description, highlights, startDate, endDate, current, displayOrder, type); }
    }

    public enum ExperienceType { INTERNSHIP, FULLTIME, PARTTIME, CONTRACT }
}

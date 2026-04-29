package com.swatik.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private int proficiency;

    @Enumerated(EnumType.STRING)
    private SkillCategory category;

    private String icon;
    private int displayOrder;

    public Skill() {}

    public Skill(Long id, String name, int proficiency, SkillCategory category, String icon, int displayOrder) {
        this.id = id; this.name = name; this.proficiency = proficiency;
        this.category = category; this.icon = icon; this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public int getProficiency() { return proficiency; }
    public SkillCategory getCategory() { return category; }
    public String getIcon() { return icon; }
    public int getDisplayOrder() { return displayOrder; }

    public void setId(Long v) { this.id = v; }
    public void setName(String v) { this.name = v; }
    public void setProficiency(int v) { this.proficiency = v; }
    public void setCategory(SkillCategory v) { this.category = v; }
    public void setIcon(String v) { this.icon = v; }
    public void setDisplayOrder(int v) { this.displayOrder = v; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id; private String name, icon;
        private int proficiency, displayOrder; private SkillCategory category;
        public Builder id(Long v) { id = v; return this; }
        public Builder name(String v) { name = v; return this; }
        public Builder proficiency(int v) { proficiency = v; return this; }
        public Builder category(SkillCategory v) { category = v; return this; }
        public Builder icon(String v) { icon = v; return this; }
        public Builder displayOrder(int v) { displayOrder = v; return this; }
        public Skill build() { return new Skill(id, name, proficiency, category, icon, displayOrder); }
    }

    public enum SkillCategory { PROGRAMMING, MACHINE_LEARNING, DEEP_LEARNING, LIBRARIES, TOOLS, DATABASE, CONCEPTS }
}

package com.swatik.portfolio.repository;
import com.swatik.portfolio.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByCategoryOrderByDisplayOrderAsc(Skill.SkillCategory category);
    List<Skill> findAllByOrderByDisplayOrderAsc();
}

package com.swatik.portfolio.repository;
import com.swatik.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByFeaturedTrueOrderByDisplayOrderAsc();
    List<Project> findAllByOrderByDisplayOrderAsc();
}

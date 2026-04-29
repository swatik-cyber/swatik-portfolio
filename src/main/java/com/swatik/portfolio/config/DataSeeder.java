package com.swatik.portfolio.config;

import com.swatik.portfolio.entity.*;
import com.swatik.portfolio.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    @Autowired private UserRepository userRepo;
    @Autowired private ProjectRepository projectRepo;
    @Autowired private SkillRepository skillRepo;
    @Autowired private ExperienceRepository expRepo;
    @Autowired private CertificationRepository certRepo;
    @Autowired private PasswordEncoder encoder;

    @Override
    public void run(String... args) {
        if (userRepo.count() == 0) seedUsers();
        if (skillRepo.count() == 0) seedSkills();
        if (expRepo.count() == 0) seedExperiences();
        if (projectRepo.count() == 0) seedProjects();
        if (certRepo.count() == 0) seedCerts();
        logger.info("Data seeding complete.");
    }

    private void seedUsers() {
        userRepo.saveAll(Arrays.asList(
            User.builder().username("swatik").email("2003swatikbarik@gmail.com").password(encoder.encode("Admin@123")).fullName("Swatik Barik").role(User.Role.ADMIN).status(User.UserStatus.ACTIVE).department("AI / ML").avatarInitials("SB").build(),
            User.builder().username("hr_manager").email("hr@infosys.com").password(encoder.encode("Manager@123")).fullName("HR Manager").role(User.Role.MANAGER).status(User.UserStatus.ACTIVE).department("Human Resources").avatarInitials("HR").build(),
            User.builder().username("tech_lead").email("lead@revature.com").password(encoder.encode("Reviewer@123")).fullName("Tech Lead").role(User.Role.REVIEWER).status(User.UserStatus.IDLE).department("Engineering").avatarInitials("TL").build(),
            User.builder().username("guest").email("guest@portfolio.dev").password(encoder.encode("Guest@123")).fullName("Guest User").role(User.Role.VIEWER).status(User.UserStatus.OFFLINE).department("External").avatarInitials("GU").build()
        ));
        logger.info("Seeded {} users", userRepo.count());
    }

    private void seedSkills() {
        skillRepo.saveAll(Arrays.asList(
            Skill.builder().name("Python").proficiency(95).category(Skill.SkillCategory.PROGRAMMING).displayOrder(1).build(),
            Skill.builder().name("Java").proficiency(80).category(Skill.SkillCategory.PROGRAMMING).displayOrder(2).build(),
            Skill.builder().name("SQL").proficiency(88).category(Skill.SkillCategory.PROGRAMMING).displayOrder(3).build(),
            Skill.builder().name("Scikit-learn").proficiency(90).category(Skill.SkillCategory.MACHINE_LEARNING).displayOrder(4).build(),
            Skill.builder().name("TensorFlow").proficiency(87).category(Skill.SkillCategory.MACHINE_LEARNING).displayOrder(5).build(),
            Skill.builder().name("PyTorch").proficiency(78).category(Skill.SkillCategory.MACHINE_LEARNING).displayOrder(6).build(),
            Skill.builder().name("NLP").proficiency(87).category(Skill.SkillCategory.DEEP_LEARNING).displayOrder(7).build(),
            Skill.builder().name("Neural Networks").proficiency(85).category(Skill.SkillCategory.DEEP_LEARNING).displayOrder(8).build(),
            Skill.builder().name("Pandas").proficiency(92).category(Skill.SkillCategory.LIBRARIES).displayOrder(9).build(),
            Skill.builder().name("NumPy").proficiency(91).category(Skill.SkillCategory.LIBRARIES).displayOrder(10).build(),
            Skill.builder().name("Matplotlib").proficiency(85).category(Skill.SkillCategory.LIBRARIES).displayOrder(11).build(),
            Skill.builder().name("Spring Boot").proficiency(80).category(Skill.SkillCategory.TOOLS).displayOrder(12).build(),
            Skill.builder().name("Angular").proficiency(75).category(Skill.SkillCategory.TOOLS).displayOrder(13).build(),
            Skill.builder().name("Streamlit").proficiency(88).category(Skill.SkillCategory.TOOLS).displayOrder(14).build(),
            Skill.builder().name("Power BI").proficiency(82).category(Skill.SkillCategory.TOOLS).displayOrder(15).build(),
            Skill.builder().name("MySQL").proficiency(88).category(Skill.SkillCategory.DATABASE).displayOrder(16).build(),
            Skill.builder().name("ETL Pipelines").proficiency(85).category(Skill.SkillCategory.CONCEPTS).displayOrder(17).build()
        ));
    }

    private void seedExperiences() {
        expRepo.saveAll(Arrays.asList(
            Experience.builder().title("AI & Data Intern").company("Infosys").location("Bhubaneswar, India")
                .highlights(Arrays.asList("Developed AI-based analytics solutions using Python and machine learning","Built dashboards using Power BI and integrated SQL databases","Automated data workflows and improved data processing efficiency","Worked with enterprise datasets and applied data preprocessing techniques"))
                .startDate(LocalDate.of(2025,7,1)).current(true).type(Experience.ExperienceType.INTERNSHIP).displayOrder(1).build(),
            Experience.builder().title("Data Engineer Intern").company("Revature").location("Remote")
                .highlights(Arrays.asList("Built ETL pipelines using Python, Pandas, and SQL","Performed data cleaning, transformation, and validation","Conducted exploratory data analysis and feature engineering","Developed structured pipelines for scalable data processing"))
                .startDate(LocalDate.of(2025,2,1)).endDate(LocalDate.of(2025,7,1)).current(false).type(Experience.ExperienceType.INTERNSHIP).displayOrder(2).build()
        ));
    }

    private void seedProjects() {
        projectRepo.saveAll(Arrays.asList(
            Project.builder().title("AI-Powered Health Assistant").tag("AI / NLP").description("NLP-based AI assistant using TensorFlow and Python with deep learning models for symptom prediction. Features an interactive Streamlit web interface with real-time symptom analysis.")
                .techStack(Arrays.asList("Python","TensorFlow","NLP","Streamlit","Deep Learning","Scikit-learn")).githubUrl("https://github.com/swatik-cyber").featured(true).displayOrder(1).build(),
            Project.builder().title("Recovery Companion Dashboard").tag("ETL / ANALYTICS").description("AI-powered analytics dashboard with ETL pipeline for structured data processing. Implements data visualization using Matplotlib and Pandas with a scalable modular AI architecture.")
                .techStack(Arrays.asList("Python","Streamlit","Matplotlib","Pandas","ETL","SQL")).githubUrl("https://github.com/swatik-cyber").liveUrl("#").featured(true).displayOrder(2).build(),
            Project.builder().title("Portfolio Management System").tag("FULL STACK").description("Full-stack application with Java Spring Boot backend, Angular frontend, and MySQL database. Features multi-user access control, role-based authentication, and JWT security.")
                .techStack(Arrays.asList("Java","Spring Boot","Angular","MySQL","JWT","REST API")).githubUrl("https://github.com/swatik-cyber").featured(true).displayOrder(3).build(),
            Project.builder().title("ML Model Accuracy Tracker").tag("DATA SCIENCE").description("Python-based system to track ML model performance over time with automated reporting and visualization dashboards integrated with Matplotlib and Pandas.")
                .techStack(Arrays.asList("Python","Scikit-learn","Matplotlib","Pandas","NumPy")).githubUrl("https://github.com/swatik-cyber").featured(false).displayOrder(4).build(),
            Project.builder().title("Data Pipeline Automation").tag("DATA ENGINEERING").description("End-to-end automated ETL pipeline with data validation, transformation, and quality checks. Built using Python and integrated with MySQL for structured storage.")
                .techStack(Arrays.asList("Python","SQL","MySQL","Pandas","ETL","Data Validation")).githubUrl("https://github.com/swatik-cyber").featured(false).displayOrder(5).build()
        ));
    }

    private void seedCerts() {
        certRepo.saveAll(Arrays.asList(
            Certification.builder().name("AWS Machine Learning Foundations").issuer("Amazon Web Services").icon("☁️").issueDate(LocalDate.of(2024,6,1)).displayOrder(1).build(),
            Certification.builder().name("Google Data Analytics Professional Certificate").issuer("Google").icon("📊").issueDate(LocalDate.of(2024,3,1)).displayOrder(2).build(),
            Certification.builder().name("Oracle Cloud Database Services Certification").issuer("Oracle").icon("🔶").issueDate(LocalDate.of(2024,9,1)).displayOrder(3).build()
        ));
    }
}

package com.swatik.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class PortfolioApplication {

    private static final Logger logger = LoggerFactory.getLogger(PortfolioApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
        logger.info("======================================================");
        logger.info("   Swatik Barik Portfolio Backend - STARTED");
        logger.info("   API running at: http://localhost:8080/api");
        logger.info("======================================================");
    }
}

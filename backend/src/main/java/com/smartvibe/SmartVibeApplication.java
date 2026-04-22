package com.smartvibe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class SmartVibeApplication {
    private static final Logger logger = LoggerFactory.getLogger(SmartVibeApplication.class);

    public static void main(String[] args) {
        System.out.println("==========================================================");
        System.out.println("   SmartVibe Application is starting at " + new java.util.Date());
        System.out.println("==========================================================");

        SpringApplication.run(SmartVibeApplication.class, args);

        logger.info("SmartVibe Application started successfully!");
    }
}

package com.dpdgroup.cms.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.logging.Logger;

@EnableWebMvc
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    Logger logger = Logger.getLogger(CorsConfig.class.getName());

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        logger.info("Adding CORS mappings...");
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

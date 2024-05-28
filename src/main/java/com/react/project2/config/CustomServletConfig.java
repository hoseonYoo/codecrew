package com.react.project2.config;

import com.react.project2.controller.formatter.LocalDateTimeFormatter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CustomServletConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        // LocalDateTime 타입을 변환할 포매터 추가
        // registry 통해 만든 포매터 추가
        registry.addFormatter(new LocalDateTimeFormatter());
    }
}

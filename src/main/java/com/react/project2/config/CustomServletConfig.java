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
        // registry 통해 만든 포매터 추가
        registry.addFormatter(new LocalDateTimeFormatter());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 요청에 대해
                .allowedOrigins("*") // 허용할 오리진
                .allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 메소드
                .maxAge((300)) // 캐싱시간
                .allowedHeaders("Authorization", "Cache-Control", "Content-Type");
    }
}

package com.react.project2.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
@Slf4j
public class TestController {

    // 해당 API 주소에 필요 권한 부여
    @PreAuthorize("hasAnyAuthority('ROLE_USER')")
    @GetMapping("/test")
    public Map<String, String> test() {

        return Map.of("RESULT", "SUCCESS");
    }
}

package com.react.project2.controller;

import com.react.project2.domain.Category;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@ToString
@RestController
@RequestMapping("/api")
public class CategoryController {

    @GetMapping("/categories")
    public Category[] getCategories() {
        log.info("~~~~~~~~~~~~~응답!");
        return Category.values();
    }
}




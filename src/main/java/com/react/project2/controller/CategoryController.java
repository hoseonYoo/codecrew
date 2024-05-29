package com.react.project2.controller;

import com.react.project2.domain.Category;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@ToString
@RestController
@RequestMapping("/api")
public class CategoryController {

    @GetMapping("/categories")
    public Map<String, String> getCategoryMap() {
        Map<String, String> categoryMap = new HashMap<>();
        for (Category category : Category.values()) {
            categoryMap.put(category.name(), category.getValue());
        }
        return categoryMap;
    }
}




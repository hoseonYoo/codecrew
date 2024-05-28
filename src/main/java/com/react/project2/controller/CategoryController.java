package com.react.project2.controller;

import com.react.project2.domain.Category;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {
    @GetMapping("/categories")
    public Category[] getCategories(){
        return Category.values();
    }
}

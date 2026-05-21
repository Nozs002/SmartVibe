package com.smartvibe.modules.product.controller;

import com.smartvibe.modules.cart.dto.CategoryDTO;
import com.smartvibe.modules.product.service.CategoryService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import com.smartvibe.common.response.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/all")
    public ApiResponse<List<CategoryDTO>> getAllCategories() {
        ApiResponse<List<CategoryDTO>> response = new ApiResponse<>();
        response.setResult(categoryService.getAllCategories());
        return response;
    }
}

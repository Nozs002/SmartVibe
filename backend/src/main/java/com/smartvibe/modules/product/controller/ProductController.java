package com.smartvibe.modules.product.controller;

import com.smartvibe.modules.product.entity.Product;
import com.smartvibe.modules.product.service.ProductService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import com.smartvibe.modules.product.dto.ProductDTO;
import com.smartvibe.common.response.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/all")
    public ApiResponse<List<ProductDTO>> getAllProducts() {
        ApiResponse<List<ProductDTO>> response = new ApiResponse<>();
        response.setResult(productService.getAllProducts());
        return response;
    }
}

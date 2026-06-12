package com.smartvibe.modules.product.controller;

import com.smartvibe.modules.product.entity.Product;
import com.smartvibe.modules.product.service.ProductService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;
import com.smartvibe.modules.product.dto.ProductDTO;
import com.smartvibe.modules.inventory.dto.InventoryDTO;
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

    @GetMapping("/{id}")
    public ApiResponse<List<InventoryDTO>> getProductById(@PathVariable Long id) {
        ApiResponse<List<InventoryDTO>> response = new ApiResponse<>();
        response.setResult(productService.getProductById(id));
        return response;
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ROLE_SYSTEM_ADMIN') or hasAuthority('ROLE_STAFF')")
    public ApiResponse<Product> createProduct(@RequestBody Product request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        
        ApiResponse<Product> response = new ApiResponse<>();
        response.setResult(productService.createProduct(request, username));
        return response;
    }
}

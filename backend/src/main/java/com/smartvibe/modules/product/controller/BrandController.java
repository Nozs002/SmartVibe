package com.smartvibe.modules.product.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.product.dto.BrandDTO;
import com.smartvibe.modules.product.service.BrandService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/brands")
@CrossOrigin("*")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService brandService;

    @GetMapping
    public ApiResponse<List<BrandDTO>> getAllBrands() {
        ApiResponse<List<BrandDTO>> response = new ApiResponse<>();
        response.setResult(brandService.getAllBrands());
        return response;
    }
}
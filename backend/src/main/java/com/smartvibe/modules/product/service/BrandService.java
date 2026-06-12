package com.smartvibe.modules.product.service;

import com.smartvibe.modules.product.dto.BrandDTO;
import com.smartvibe.modules.product.entity.Brand;
import com.smartvibe.modules.product.repository.BrandRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BrandService {
    
    private final BrandRepository brandRepository;

    public List<BrandDTO> getAllBrands() {
        return brandRepository.findAll().stream()
                .map(brand -> BrandDTO.builder()
                        .id(brand.getId())
                        .name(brand.getName())
                        .logoUrl(brand.getLogoUrl())
                        .build())
                .collect(Collectors.toList());
    }
}
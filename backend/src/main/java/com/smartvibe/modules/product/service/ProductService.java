package com.smartvibe.modules.product.service;

import com.smartvibe.modules.product.entity.Product;
import com.smartvibe.modules.product.entity.Product;
import com.smartvibe.modules.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import com.smartvibe.modules.product.dto.ProductDTO;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> ProductDTO.builder().id(product.getId()).sku(product.getSku()).name(product.getName())
                        .categoryId(product.getCategoryId()).brandId(product.getBrandId())
                        .isSerialized(product.isSerialized()).description(product.getDescription())
                        .basePrice(product.getBasePrice()).warrantyMonths(product.getWarrantyMonths())
                        .specifications(product.getSpecifications()).thumbnail(product.getThumbnail())
                        .status(product.getStatus()).build())
                .toList();
    }
}

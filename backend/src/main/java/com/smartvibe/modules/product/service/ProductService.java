package com.smartvibe.modules.product.service;

import com.smartvibe.modules.product.entity.Product;
import com.smartvibe.modules.inventory.dto.ProductInventory;
import com.smartvibe.modules.inventory.dto.InventoryDTO;
import com.smartvibe.modules.inventory.repository.InventoryRepository;
import com.smartvibe.modules.product.repository.ProductRepository;
import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import com.smartvibe.modules.product.dto.ProductDTO;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    public List<ProductDTO> getAllProducts() {
        List<ProductInventory> productInventoryList = inventoryRepository.getAllProductInventory();
        List<Product> productList = productRepository.findAll();

        Map<Long, Long> productStockMap = new HashMap<>();

        for (ProductInventory inv : productInventoryList) {
            Long key = inv.getProductId();
            Long value = inv.getQuantityAvailable();

            productStockMap.put(key, value);
        }

        return productList.stream().map(product -> {
            return ProductDTO.builder().id(product.getId()).sku(product.getSku()).name(product.getName())
                    .categoryId(product.getCategoryId()).brandId(product.getBrandId())
                    .isSerialized(product.isSerialized()).description(product.getDescription())
                    .price(product.getPrice()).warrantyMonths(product.getWarrantyMonths())
                    .specifications(product.getSpecifications()).thumbnail(product.getThumbnail())
                    .status(product.getStatus()).stock(productStockMap.getOrDefault(product.getId(), 0L)).build();
        }).toList();
    }

    public List<InventoryDTO> getProductById(Long id) {
        Optional<Product> productOpt = productRepository.findById(id);
        if (productOpt.isEmpty()) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }
        Product product = productOpt.get();
        List<InventoryDTO> stock = inventoryRepository.getAvailableStockByProductId(product.getId());
        return stock;
    }
}

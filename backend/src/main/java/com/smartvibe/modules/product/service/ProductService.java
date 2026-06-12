package com.smartvibe.modules.product.service;

import com.smartvibe.modules.product.entity.Product;
import com.smartvibe.modules.inventory.dto.ProductInventory;
import com.smartvibe.modules.inventory.dto.InventoryDTO;
import com.smartvibe.modules.inventory.entity.Inventory;
import com.smartvibe.modules.inventory.repository.InventoryRepository;
import com.smartvibe.modules.product.repository.ProductRepository;
import com.smartvibe.modules.branch.entity.Branch;
import com.smartvibe.modules.branch.repository.BranchRepository;
import com.smartvibe.modules.auth.service.AuthService;
import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.modules.product.dto.ProductDTO;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    private final BranchRepository branchRepository;
    private final AuthService authService;

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

    // Tạo sản phẩm mới
    @Transactional(rollbackFor = Exception.class)
    public Product createProduct(Product request, String username) {
        authService.verifyHeadManagerOrAdmin(username);

        if (request.getStatus() == null) {
            request.setStatus("inactive");
        }

        Product savedProduct = productRepository.save(request);
        List<Branch> allBranches = branchRepository.findAll();

        if (!allBranches.isEmpty()) {
            List<Inventory> newInventories = allBranches.stream()
                    .map(branch -> Inventory.builder()
                            .branchId(branch.getId())
                            .productId(savedProduct.getId())
                            .quantityAvailable(0L) 
                            .build())
                    .collect(Collectors.toList());

            inventoryRepository.saveAll(newInventories);
        }
        return savedProduct;
    }
}

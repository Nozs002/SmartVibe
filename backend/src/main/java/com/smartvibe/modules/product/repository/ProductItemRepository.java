package com.smartvibe.modules.product.repository;

import com.smartvibe.modules.product.entity.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;

import com.smartvibe.modules.product.entity.ProductItem;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductItemRepository extends JpaRepository<ProductItem, Long> {
    // Pageable để tự động limit số lượng cần tìm
    List<ProductItem> findByProductIdAndStatus(Long productId, String status, Pageable pageable);

    Optional<ProductItem> findBySerial(String serial);
}

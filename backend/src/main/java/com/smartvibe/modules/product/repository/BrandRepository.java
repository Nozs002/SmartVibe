package com.smartvibe.modules.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartvibe.modules.product.entity.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {
}
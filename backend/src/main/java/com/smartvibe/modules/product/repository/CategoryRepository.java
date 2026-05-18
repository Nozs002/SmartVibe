package com.smartvibe.modules.product.repository;

import com.smartvibe.modules.product.entity.Category;

import com.smartvibe.modules.product.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}

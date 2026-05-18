package com.smartvibe.modules.product.service;

import com.smartvibe.modules.product.dto.CategoryDTO;
import com.smartvibe.modules.product.entity.Category;
import com.smartvibe.modules.product.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(category -> CategoryDTO.builder().id(category.getId()).name(category.getName())
                .parentId(category.getParentId()).build()).collect(Collectors.toList());
    }
}

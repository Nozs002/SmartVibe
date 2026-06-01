package com.smartvibe.modules.product.dto;

import java.math.BigDecimal;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String sku;
    private String name;

    private Long categoryId;

    private Long brandId;
    
    @JsonProperty("isSerialized")
    private boolean isSerialized;

    private String description;
    private BigDecimal price;
    private int warrantyMonths;
    private Map<String, Object> specifications;
    private String thumbnail;
    private String status;
    private Long stock;

    public ProductDTO(Long id, String sku, String name, Long categoryId, Long brandId, 
                      Boolean isSerialized, String description, java.math.BigDecimal price, 
                      Integer warrantyMonths, java.util.Map<String, Object> specifications, 
                      String thumbnail, String status) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.categoryId = categoryId;
        this.brandId = brandId;
        this.isSerialized = isSerialized;
        this.description = description;
        this.price = price;
        this.warrantyMonths = warrantyMonths;
        this.specifications = specifications;
        this.thumbnail = thumbnail;
        this.status = status;
    }
}

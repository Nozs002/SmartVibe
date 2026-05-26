package com.smartvibe.modules.product.dto;

import java.math.BigDecimal;
import java.util.Map;

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
    private boolean isSerialized;

    private String description;
    private BigDecimal price;
    private int warrantyMonths;
    private Map<String, Object> specifications;
    private String thumbnail;
    private String status;
    private Long stock;
}

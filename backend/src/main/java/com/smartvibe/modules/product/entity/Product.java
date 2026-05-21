package com.smartvibe.modules.product.entity;

import java.math.BigDecimal;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;

import java.util.Map;

import org.hibernate.type.SqlTypes;
import org.hibernate.annotations.JdbcTypeCode;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sku", unique = true, nullable = false)
    private String sku;

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "brand_id")
    private Long brandId;

    @Column(name = "is_serialized", nullable = false)
    private boolean isSerialized;

    private String description;

    @Column(name = "base_price", nullable = false)
    private BigDecimal basePrice;

    @Column(name = "warranty_months", nullable = false)
    private int warrantyMonths;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "specifications", columnDefinition = "JSON")
    private Map<String, Object> specifications;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "status", columnDefinition = "ENUM('active', 'inactive', 'discontinued')")
    private String status;
}

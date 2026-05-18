package com.smartvibe.modules.product.entity;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.*;
import com.smartvibe.modules.branch.entity.*;

@Entity
@Table(name = "product_items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductItem {
    @Id
    @Column(name = "serial", unique = true, nullable = false)
    private String serial;

    @Column(name = "status", columnDefinition = "ENUM('in stock', 'sold', 'defective')")
    private String status;

    @JoinColumn(name = "product_id")
    private Long productId;

    @JoinColumn(name = "branch_id")
    private Long branchId;
}

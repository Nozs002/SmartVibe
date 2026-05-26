package com.smartvibe.modules.online_order.entity;

import lombok.*;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "order_details")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long quantity;

    private BigDecimal price;

    private Long orderId;

    private Long productId;

    @Column(name = "product_serial")
    private String productSerial;
}

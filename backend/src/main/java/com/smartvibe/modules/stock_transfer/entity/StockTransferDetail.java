package com.smartvibe.modules.stock_transfer.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stock_transfer_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockTransferDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity", nullable = false)
    private Long quantity;

    @Column(name = "transfer_id", nullable = false)
    private Long transferId;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "product_itemSerial")
    private String productItemSerial;
}
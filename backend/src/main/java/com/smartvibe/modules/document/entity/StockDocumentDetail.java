package com.smartvibe.modules.document.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "stock_document_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockDocumentDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity", nullable = false)
    private Long quantity;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    // Map chuẩn theo cột product_itemSerial trong ảnh của bạn
    @Column(name = "product_itemSerial")
    private String productItemSerial;

    @Column(name = "document_id", nullable = false)
    private Long documentId;
}

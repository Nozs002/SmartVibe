package com.smartvibe.modules.stock_transfer.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockTransferDetailResponseDTO {
    private Long id;
    private Long productId;
    private String productName; 
    private Long quantity;
    private String productItemSerial;
}

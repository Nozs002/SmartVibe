package com.smartvibe.modules.pos.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class PosOrderItemRequest {
    private Long productId;
    private int quantity;
    private BigDecimal price;
    private String productSerial; 
}

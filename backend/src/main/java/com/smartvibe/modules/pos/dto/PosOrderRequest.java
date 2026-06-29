package com.smartvibe.modules.pos.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class PosOrderRequest {
    private Long staffId; 
    private Long customerId; 
    private Long branchId; 
    private String paymentMethod; 
    private BigDecimal discountPercent; 
    private String note;
    
    private List<PosOrderItemRequest> items; 
}


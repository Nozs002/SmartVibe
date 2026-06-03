package com.smartvibe.modules.inventory_transaction.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryTransactionDTO {
    private Long id;
    private String transactionType;
    private Long quantityChanged;    
    private String referenceType;    
    private Long referenceId;        
    private LocalDateTime createdAt;
    private Long productId;
    private String productName;
    private Long branchId;
    private String branchName;
}

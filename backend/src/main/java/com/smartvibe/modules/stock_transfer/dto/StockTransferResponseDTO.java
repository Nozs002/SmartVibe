package com.smartvibe.modules.stock_transfer.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockTransferResponseDTO {
    private Long id;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    
    private Long fromBranchId;
    private String fromBranchName;
    
    private Long toBranchId;
    private String toBranchName;
}

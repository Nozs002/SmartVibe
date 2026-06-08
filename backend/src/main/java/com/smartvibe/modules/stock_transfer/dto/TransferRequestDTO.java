package com.smartvibe.modules.stock_transfer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

@Data
public class TransferRequestDTO {
    private Long staffBranchId;
    private Long fromBranchId;
    private Long toBranchId;
    private List<TransferItemDTO> items;

    @Data
    public static class TransferItemDTO {
        private Long productId;
        private Long quantity;
        
        @JsonProperty("isSerialized")
        private boolean isSerialized;
        private List<String> serials;
    }
}

package com.smartvibe.modules.inventory.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImportRequestDTO {
    private Long branchId;
    private Long staffId;
    private List<ImportItemDTO> items;
    private String note;

    @Data
    public static class ImportItemDTO {
        private Long productId;
        private Long quantity;
        private BigDecimal price;
        
        @com.fasterxml.jackson.annotation.JsonProperty("isSerialized")
        private boolean isSerialized; 
        private List<String> serials; 
    }
}
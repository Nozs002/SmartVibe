package com.smartvibe.modules.inventory.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductInventory {
    private Long productId;
    private Long quantityAvailable;
}

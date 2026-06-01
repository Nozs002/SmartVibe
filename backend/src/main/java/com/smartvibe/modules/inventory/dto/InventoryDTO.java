package com.smartvibe.modules.inventory.dto;

import com.smartvibe.modules.branch.dto.BranchDTO;
import com.smartvibe.modules.product.dto.ProductDTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryDTO {
    private Long id;
    private Long quantityAvailable;
    private BranchDTO branch;
    private ProductDTO product;
}
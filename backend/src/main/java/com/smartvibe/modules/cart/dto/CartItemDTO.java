package com.smartvibe.modules.cart.dto;

import java.time.LocalDateTime;

import com.smartvibe.modules.product.dto.ProductDTO;

import lombok.Data;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemDTO {
    private Long id;
    private Long cartId;
    private ProductDTO productDTO;
    private Integer quantity;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

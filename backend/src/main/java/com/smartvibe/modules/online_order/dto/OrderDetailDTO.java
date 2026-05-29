package com.smartvibe.modules.online_order.dto;

import java.math.BigDecimal;
import java.util.List;

import com.smartvibe.modules.customer.dto.CustomerDTO;
import com.smartvibe.modules.product.dto.ProductDTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailDTO {
    private Long id;
    private Long quantity;
    private BigDecimal price;
    private String productName;
}

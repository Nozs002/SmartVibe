package com.smartvibe.modules.online_order.dto;

import com.smartvibe.modules.customer.dto.CustomerDTO;
import com.smartvibe.modules.cart.dto.CartItemDTO;

import java.math.BigDecimal;

import lombok.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OnlineOrder {
    private Long id;
    private String type = "online";
    private String note;
    private String deliveryLocation;
    private String phone;
    private String orderStatus;
    private String deliveryStatus;
    private String accountPayment;
    private String paymentMethod;
    private String paymentStatus;
    private BigDecimal discountPercent;
    private CustomerDTO customer;
    private String customerName;
    private String shippingProvider;
    private String trackingCode;
    private BigDecimal shippingFee;
    private List<CartItemDTO> cartItemDTO;
}

package com.smartvibe.modules.online_order.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.smartvibe.modules.branch.dto.BranchDTO;
import com.smartvibe.modules.customer.dto.CustomerDTO;
import com.smartvibe.modules.online_order.dto.OrderDetailDTO;
import com.smartvibe.modules.staff.dto.StaffDTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
    private Long id;
    private LocalDateTime createdAt;
    private String type;
    private String note;
    private String deliveryLocation;
    private String phone;
    private String orderStatus;
    private String deliveryStatus;
    private String accountPayment;
    private String paymentMethod;
    private String paymentStatus;
    private BigDecimal discountPercent;
    private StaffDTO staff;
    private CustomerDTO customer;
    private BranchDTO branch;
    private String customerName;
    private String shippingProvider;
    private String trackingCode;
    private BigDecimal shippingFee;
    private List<OrderDetailDTO> orderDetailDTO;

    public OrderResponse(Long id, LocalDateTime createdAt, String type, String note, String deliveryLocation, String phone, String orderStatus, String deliveryStatus, String accountPayment, String paymentMethod, String paymentStatus, BigDecimal discountPercent,StaffDTO staff, CustomerDTO customer, BranchDTO branch, String customerName, String shippingProvider, String trackingCode, BigDecimal shippingFee) {
        this.id = id;
        this.createdAt = createdAt;
        this.type = type;
        this.note = note;
        this.deliveryLocation = deliveryLocation;
        this.phone = phone;
        this.orderStatus = orderStatus;
        this.deliveryStatus = deliveryStatus;
        this.accountPayment = accountPayment;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.discountPercent = discountPercent;
        this.staff = staff;
        this.customer = customer;
        this.branch = branch;
        this.customerName = customerName;
        this.shippingProvider = shippingProvider;
        this.trackingCode = trackingCode;
        this.shippingFee = shippingFee;
    }
}

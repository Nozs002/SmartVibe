package com.smartvibe.modules.online_order.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "type", columnDefinition = "ENUM('online', 'POS')")
    private String type;

    private String note;

    @Column(name = "delivery_location")
    private String deliveryLocation;

    private String phone;

    @Column(name = "order_status", columnDefinition = "ENUM('pending', 'confirmed', 'completed', 'cancelled')")
    private String orderStatus;

    // not shipped là chưa giao hàng
    @Column(name = "delivery_status", columnDefinition = "ENUM('not shipped','shipping','delivered', 'failed')")
    private String deliveryStatus;

    @Column(name = "account_payment")
    private String accountPayment;

    @Column(name = "payment_method", columnDefinition = "ENUM('cash','bank')")
    private String paymentMethod;

    @Column(name = "payment_status", columnDefinition = "ENUM('unpaid', 'paid', 'refunded')")
    private String paymentStatus;

    // chỉ áp dụng với đơn mua trực tiếp, do nhân viên gán tự động vào các ngày có
    // sự kiện, hoặc dành cho khách hàng vip
    @Column(name = "discount_percent")
    private BigDecimal discountPercent;

    private Long staffId;

    private Long customerId;

    private Long branchId;

    // đơn vị vận chuyển
    @Column(name = "shipping_provider")
    private String shippingProvider;

    // mã vận đơn
    @Column(name = "tracking_code")
    private String trackingCode;

    // phí vận chuyển
    @Column(name = "shipping_fee")
    private BigDecimal shippingFee;

    @Column(name = "customer_name")
    private String customerName;
}

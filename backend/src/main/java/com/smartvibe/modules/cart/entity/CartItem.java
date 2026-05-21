package com.smartvibe.modules.cart.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart_items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long cartId;
    private Long productId;
    private Integer quantity;

    @CreationTimestamp // tu dong lay gio hien tai khi tao moi
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp // tu dong lay gio hien tai khi cap nhat
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

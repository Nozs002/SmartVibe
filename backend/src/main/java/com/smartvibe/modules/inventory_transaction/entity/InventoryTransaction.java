package com.smartvibe.modules.inventory_transaction.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Table(name = "inventory_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_type", columnDefinition = "ENUM('import', 'export', 'transfer in', 'transfer out', 'sale', 'adjustment', 'return')")
    private String transactionType;

    @Column(name = "quantity_changed", nullable = false)
    private Long quantityChanged;

    @Column(name = "reference_type")
    private String referenceType;

    @Column(name = "reference_id", nullable = false)
    private Long referenceId;

    @Column(name = "inventory_id", nullable = false)
    private Long inventoryId;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}

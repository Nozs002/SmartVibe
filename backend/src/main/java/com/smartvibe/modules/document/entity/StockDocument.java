package com.smartvibe.modules.document.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "status", columnDefinition = "ENUM('pending', 'completed', 'cancelled')")
    private String status;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "type", nullable = false, columnDefinition = "ENUM('import', 'export')")
    private String type;

    @Column(name = "branch_id", nullable = false)
    private Long branchId;

    @Column(name = "staff_id", nullable = false)
    private Long staffId;

    private String note;
}

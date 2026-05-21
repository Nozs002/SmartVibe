package com.smartvibe.modules.staff.entity;

import lombok.*;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "staffs")
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", columnDefinition = "ENUM('manager', 'sales', 'warehouse', 'technical')")
    private String type;

    @Column(name = "work_status", columnDefinition = "ENUM('working', 'resigned', 'on_leave')")
    private String workStatus;

    private String description;

    @Column(name = "basic_salary")
    private BigDecimal basicSalary;

    private BigDecimal allowance;
    private BigDecimal bonus;
    private BigDecimal deduction;

    private Long userId;
    private Long branchId;
}

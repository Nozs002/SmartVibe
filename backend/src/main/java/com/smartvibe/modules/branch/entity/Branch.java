package com.smartvibe.modules.branch.entity;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "branches")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String email;

    @Column(name = "operating_status", columnDefinition = "ENUM('open', 'close', 'maintenance')")
    private String operatingStatus;

    @Column(name = "number_of_staff", nullable = false)
    private Long numberOfStaff;

    @Column(nullable = false)
    private Long capacity;
 
    @Column(columnDefinition = "ENUM('retail_branch', 'head_warehouse')")
    private String type;
}

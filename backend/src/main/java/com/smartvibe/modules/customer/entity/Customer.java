package com.smartvibe.modules.customer.entity;

import lombok.*;

import jakarta.persistence.*;

@Entity
@Table(name = "customers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", columnDefinition = "ENUM('normal', 'vip', 'gold', 'diamond')")
    private String type;

    private Long userId;
}

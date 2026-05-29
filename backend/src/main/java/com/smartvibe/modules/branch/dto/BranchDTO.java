package com.smartvibe.modules.branch.dto;

import java.math.BigDecimal;
import java.util.Map;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BranchDTO {
    private Long id;
    private String name;
    private String address;
    private String phone, email, operatingStatus, type;
    private Long numberOfStaff, capacity;
}

package com.smartvibe.modules.staff.dto;

import java.math.BigDecimal;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffResponse {
    private Long id;
    private Long userId;
    private String username;
    private String fullname;
    private String email;
    private String phone;
    private String type;
    private String workStatus;
    private BigDecimal basicSalary;
    private BigDecimal allowance;
    private BigDecimal deduction;
    private String description;
    private Long branchId;
}

package com.smartvibe.modules.staff.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffDTO {
    private Long id;
    private String type;
    private String workStatus;
    private String description;
    private BigDecimal basicSalary;
    private BigDecimal allowance;
    private BigDecimal bonus;
    private BigDecimal deduction;
    private Long userId;
    private Long branchId;

    public StaffDTO(Long id, String type, String workStatus) {
        this.id = id;
        this.type = type;
        this.workStatus = workStatus;
    }
}

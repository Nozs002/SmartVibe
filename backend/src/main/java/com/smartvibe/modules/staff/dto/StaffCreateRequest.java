package com.smartvibe.modules.staff.dto;

import lombok.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffCreateRequest {
    @NotBlank(message = "Username is required")
    private String username;
    
    @NotBlank(message = "Password is required")
    private String password;
    
    @NotBlank(message = "Email is required")
    private String email;
    
    private String phone;
    
    @NotNull(message = "Bắt buộc chọn chi nhánh")
    private Long branchId;
    
    @NotBlank(message = "Chức vụ không được để trống")
    private String staffType;
}

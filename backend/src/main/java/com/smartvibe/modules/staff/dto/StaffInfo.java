package com.smartvibe.modules.staff.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffInfo {
    private Long id;
    private String name;
    private String phone;
    private String email;
    private String role;
}
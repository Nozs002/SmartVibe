package com.smartvibe.modules.customer.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponse {
    private Long id;
    private Long userId;
    private String username;
    private String fullname;
    private String email;
    private String phone;
    private String sex;
    private String type;
}
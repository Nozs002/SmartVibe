package com.smartvibe.modules.auth.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserLoginResponse {
    private String username;
    private String role;
    private String address;
    private LocalDate birthday;
    private String email;
    private String description;
    private String avt_url;
    private String personal_img;
    private String phone;
    private String sex;
    private String identifyCode;
    private LocalDateTime createdAt;
    private String accountStatus;
}

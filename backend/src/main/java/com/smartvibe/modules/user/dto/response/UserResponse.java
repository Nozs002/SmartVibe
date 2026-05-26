package com.smartvibe.modules.user.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private long id;
    private String username;
    private String password;
    private String fullname;
    private String role;
    private String address;
    private LocalDate birthday;
    private String email;
    private String description;
    private String avtUrl;
    private String personalImg;
    private String phone;
    private String sex;
    private String identifyCode;
    private String accountStatus;
    private LocalDateTime createdAt;
}

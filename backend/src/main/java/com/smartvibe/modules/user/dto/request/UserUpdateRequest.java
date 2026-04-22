package com.smartvibe.modules.user.dto.request;

import lombok.*;

import java.time.LocalDate;
import java.util.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    private String address;
    private LocalDate birthday;
    private String email;
    private String description;
    private String phone;
    private String sex;
    private String identifyCode;
    private String avtUrl;
    private String personalImg;
}

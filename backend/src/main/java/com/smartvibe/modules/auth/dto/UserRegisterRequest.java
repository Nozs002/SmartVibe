package com.smartvibe.modules.auth.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRegisterRequest {
    @NotBlank(message = "USERNAME_BLANK")
    @Size(min = 3, message = "USERNAME_INVALID")
    private String username;

    @NotBlank(message = "PASSWORD_BLANK")
    @Size(min = 8, message = "INVALID_PASSWORD")
    private String password;

    @NotBlank(message = "CONF_PASSWORD_BLANK")
    @Size(min = 8, message = "INVALID_CONFIRM_PASSWORD")
    private String confirmPassword;

    @NotBlank(message = "EMAIL_BLANK")
    @Email(message = "INVALID_EMAIL")
    private String email;

    private String role = "customer";

    private String phone;

    private String sex;
}

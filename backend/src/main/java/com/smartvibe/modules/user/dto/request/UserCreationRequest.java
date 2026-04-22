package com.smartvibe.modules.user.dto.request;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.smartvibe.common.exception.ErrorCode;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCreationRequest {
    @NotBlank(message = "USERNAME_BLANK")
    @Size(min = 3, message = "USERNAME_INVALID")
    private String username;

    @NotBlank(message = "PASSWORD_BLANK")
    @Size(min = 8, message = "INVALID_PASSWORD")
    private String password;

    @NotBlank(message = "EMAIL_BLANK")
    @Email(message = "INVALID_EMAIL")
    private String email;

    private String phone;
}

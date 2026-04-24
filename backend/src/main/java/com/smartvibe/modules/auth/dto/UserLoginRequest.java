package com.smartvibe.modules.auth.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserLoginRequest {
    @NotNull(message = "Username is required")
    @NotBlank(message = "Username is required")
    private String username;

    @NotNull(message = "Password is required")
    @NotBlank(message = "Password is required")
    private String password;
}

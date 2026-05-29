package com.smartvibe.modules.auth.controller;

import org.springframework.web.bind.annotation.*;
import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.auth.dto.UserLoginRequest;
import com.smartvibe.modules.user.dto.response.UserResponse;
import com.smartvibe.modules.auth.dto.UserRegisterRequest;

import java.util.Optional;
import com.smartvibe.modules.auth.service.AuthService;
import com.smartvibe.modules.user.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;
import com.smartvibe.common.response.AuthenticationResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor // Thay thế hoàn toàn cho @Autowired
public class AuthController {

    // Bắt buộc phải có chữ "final"
    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> login(@RequestBody @Valid UserLoginRequest request) {
        AuthenticationResponse result = authService.login(request);
        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
    }

    @PostMapping("/register")
    public ApiResponse<UserResponse> register(@RequestBody @Valid UserRegisterRequest request) {
        UserResponse result = authService.register(request);
        return ApiResponse.<UserResponse>builder().result(result).build();
    }
}

package com.smartvibe.modules.auth.controller;

import org.springframework.web.bind.annotation.*;
import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.auth.dto.UserLoginRequest;
import com.smartvibe.modules.auth.dto.UserLoginResponse;
import com.smartvibe.modules.auth.dto.UserRegisterRequest;

import java.util.Optional;
import com.smartvibe.modules.auth.service.AuthService;
import com.smartvibe.modules.user.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ApiResponse<UserLoginResponse> login(@RequestBody @Valid UserLoginRequest request) {
        UserLoginResponse userLoginResponse = authService.login(request);
        ApiResponse<UserLoginResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userLoginResponse);
        return apiResponse;
    }

    @PostMapping("/register")
    public ApiResponse<User> register(@RequestBody @Valid UserRegisterRequest request) {
        User user = authService.register(request);
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(user);
        return apiResponse;
    }
}

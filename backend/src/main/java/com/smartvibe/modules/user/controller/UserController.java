package com.smartvibe.modules.user.controller;

import java.util.*;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.user.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.user.dto.response.UserResponse;

@RestController
@RequestMapping("/api/users")
// tự động sinh ra constructor cho tất cả các biến được khai báo với từ khóa
// final
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    @GetMapping("/all")
    public ApiResponse<List<UserResponse>> getAllUsers() {
        ApiResponse<List<UserResponse>> response = new ApiResponse<>();
        response.setResult(userService.getAllUsers());
        return response;
    }
}
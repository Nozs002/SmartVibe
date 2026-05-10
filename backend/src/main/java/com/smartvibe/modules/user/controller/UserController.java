package com.smartvibe.modules.user.controller;

import java.util.*;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.user.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import com.smartvibe.common.response.ApiResponse;

@RestController
@RequestMapping("/api/users")
// tự động sinh ra constructor cho tất cả các biến được khai báo với từ khóa
// final

@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    @GetMapping("/all")
    public ApiResponse<List<User>> getAllUsers() {
        ApiResponse<List<User>> response = new ApiResponse<>();
        response.setResult(userService.getAllUsers());
        return response;
    }
}
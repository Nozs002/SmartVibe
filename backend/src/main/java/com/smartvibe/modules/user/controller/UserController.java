package com.smartvibe.modules.user.controller;

import java.util.*;

import org.springframework.web.bind.annotation.*;

import com.smartvibe.modules.user.dto.request.UserCreationRequest;
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

    @PostMapping("")
    ApiResponse<User> createUser(@RequestBody @Valid UserCreationRequest request) {
        User newUser = userService.createUser(request);
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(newUser);
        return apiResponse;
    }

    @GetMapping("")
    ApiResponse<List<User>> getAllUsers() {
        ApiResponse<List<User>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getAllUsers());
        return apiResponse;
    }

    @GetMapping("/{id}")
    ApiResponse<User> getUser(@PathVariable("id") long id) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getUser(id));
        return apiResponse;
    }

    @GetMapping("/username/{username}")
    ApiResponse<User> getUserByUsername(@PathVariable("username") String username) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getUser(username));
        return apiResponse;
    }
}
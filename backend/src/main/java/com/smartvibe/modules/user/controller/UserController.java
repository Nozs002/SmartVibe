package com.smartvibe.modules.user.controller;

import java.util.*;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.user.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.staff.dto.StaffCreateRequest;
import com.smartvibe.modules.user.dto.response.UserResponse;

@RestController
@RequestMapping("/api/users")
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

    @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUser(@PathVariable("id") Long id, @RequestBody UserResponse userResponse) {
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setResult(userService.updateUser(id, userResponse));
        return response;
    }

    @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
    }

    @PreAuthorize("hasAnyRole('SYSTEM_ADMIN', 'MANAGER')")
    @PostMapping("/staff")
    public ApiResponse<UserResponse> createStaff(@RequestBody @Valid StaffCreateRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createStaff(request))
                .build();
    }

    @PreAuthorize("hasAnyRole('SYSTEM_ADMIN', 'MANAGER')")
    @PatchMapping("/{id}/status")
    public ApiResponse<UserResponse> updateAccountStatus(
            @PathVariable("id") Long id, 
            @RequestParam String status) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.approveAccount(id, status))
                .build();
    }
}
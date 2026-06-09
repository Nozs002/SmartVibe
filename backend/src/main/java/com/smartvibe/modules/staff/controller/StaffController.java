package com.smartvibe.modules.staff.controller;

import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.staff.dto.StaffInfo;
import com.smartvibe.modules.staff.dto.StaffResponse;
import com.smartvibe.modules.staff.service.StaffService;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/staff")
@RequiredArgsConstructor
public class StaffController {
    private final StaffService staffService;

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/{id}")
    public ApiResponse<StaffInfo> getStaffById(@PathVariable("id") Long id) {
        ApiResponse<StaffInfo> response = new ApiResponse<>();
        
        StaffInfo staffInfo = staffService.getStaffById(id);
        response.setResult(staffInfo);
        return response;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SYSTEM_ADMIN', 'MANAGER')")
    public ApiResponse<List<StaffResponse>> getAllStaffs() {
        String username = getCurrentUsername();
        return ApiResponse.<List<StaffResponse>>builder()
                .result(staffService.getAllStaffs(username))
                .build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SYSTEM_ADMIN', 'MANAGER')")
    public ApiResponse<StaffResponse> updateStaff(@PathVariable("id") Long id, @RequestBody StaffResponse request) {
        String username = getCurrentUsername();
        return ApiResponse.<StaffResponse>builder()
                .result(staffService.updateStaff(id, request, username))
                .build();
    }
}
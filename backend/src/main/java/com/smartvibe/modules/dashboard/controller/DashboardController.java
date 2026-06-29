package com.smartvibe.modules.dashboard.controller;

import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.dashboard.dto.AdminDashboard;
import com.smartvibe.modules.dashboard.dto.ManagerDashboard;
import com.smartvibe.modules.dashboard.dto.StaffDashboard;
import com.smartvibe.modules.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService dashboardService;

    @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    @GetMapping("/admin")
    public ApiResponse<AdminDashboard> getAdminDashboardData() {
        AdminDashboard stats = dashboardService.getAdminDashboardStats();
        ApiResponse<AdminDashboard> apiResponse = new ApiResponse<>();
        apiResponse.setResult(stats);
        return apiResponse;
    }

    @PreAuthorize("hasRole('WAREHOUSE')")
    @GetMapping("/staff")
    public ApiResponse<StaffDashboard> getStaffDashboardData(@RequestParam("branchId") Long branchId) {
        StaffDashboard stats = dashboardService.getStaffDashboardStats(branchId);
        ApiResponse<StaffDashboard> apiResponse = new ApiResponse<>();
        apiResponse.setResult(stats);
        return apiResponse;
    }

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/manager")
    public ApiResponse<ManagerDashboard> getManagerDashboardData(@RequestParam("branchId") Long branchId) {
        ManagerDashboard stats = dashboardService.getManagerDashboardStats(branchId);
        ApiResponse<ManagerDashboard> apiResponse = new ApiResponse<>();
        apiResponse.setResult(stats);
        
        return apiResponse;
    }
}
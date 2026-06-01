package com.smartvibe.modules.staff.controller;

import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.staff.dto.StaffInfo;
import com.smartvibe.modules.staff.service.StaffService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/staff")
@RequiredArgsConstructor
public class StaffController {
    private final StaffService staffService;

    @GetMapping("/{id}")
    public ApiResponse<StaffInfo> getStaffById(@PathVariable("id") Long id) {
        ApiResponse<StaffInfo> response = new ApiResponse<>();
        
        StaffInfo staffInfo = staffService.getStaffById(id);
        response.setResult(staffInfo);
        return response;
    }
}
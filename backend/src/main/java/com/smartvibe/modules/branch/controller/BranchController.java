package com.smartvibe.modules.branch.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.branch.dto.BranchDTO;
import com.smartvibe.modules.branch.entity.Branch;
import com.smartvibe.modules.branch.service.BranchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/branches")
@CrossOrigin("*")
@RequiredArgsConstructor
public class BranchController {

    private final BranchService branchService;

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    // lấy toàn bộ danh sách chi nhánh
    @GetMapping
    public ApiResponse<List<BranchDTO>> getAllBranches() {
        ApiResponse<List<BranchDTO>> response = new ApiResponse<>();
        response.setResult(branchService.getAllBranches());
        return response;
    }

    // Lấy các chi nhánh đang hoạt động
    @GetMapping("/active")
    public ApiResponse<List<BranchDTO>> getActiveBranches() {
        ApiResponse<List<BranchDTO>> response = new ApiResponse<>();
        response.setResult(branchService.getActiveBranches());
        return response;
    }

    // Tạo chi nhánh mới
    @PostMapping
    @PreAuthorize("hasAnyRole('SYSTEM_ADMIN', 'MANAGER')")
    public ApiResponse<Branch> createBranch(@RequestBody Branch request) {
        ApiResponse<Branch> response = new ApiResponse<>();
        response.setResult(branchService.createBranch(request, getCurrentUsername()));
        return response;
    }

    // 4. Cập nhật chi nhánh
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SYSTEM_ADMIN', 'MANAGER')")
    public ApiResponse<Branch> updateBranch(@PathVariable("id") Long id, @RequestBody Branch request) {
        ApiResponse<Branch> response = new ApiResponse<>();
        response.setResult(branchService.updateBranch(id, request, getCurrentUsername()));
        return response;
    }
}
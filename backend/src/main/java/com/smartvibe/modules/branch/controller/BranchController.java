package com.smartvibe.modules.branch.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.branch.dto.BranchDTO;
import com.smartvibe.modules.branch.service.BranchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/branches")
@CrossOrigin("*")
@RequiredArgsConstructor
public class BranchController {

    private final BranchService branchService;

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
}
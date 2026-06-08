package com.smartvibe.modules.branch.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.smartvibe.modules.branch.dto.BranchDTO;
import com.smartvibe.modules.branch.repository.BranchRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BranchService {

    private final BranchRepository branchRepository;

    public List<BranchDTO> getAllBranches() {
        return branchRepository.findAll().stream()
                .map(branch -> BranchDTO.builder()
                        .id(branch.getId())
                        .name(branch.getName())
                        .address(branch.getAddress())
                        .phone(branch.getPhone())
                        .email(branch.getEmail())
                        .operatingStatus(branch.getOperatingStatus())
                        .numberOfStaff(branch.getNumberOfStaff())
                        .capacity(branch.getCapacity())
                        .type(branch.getType())
                        .build())
                .collect(Collectors.toList());
    }

    public List<BranchDTO> getActiveBranches() {
        return branchRepository.findByOperatingStatus("open").stream()
                .map(branch -> BranchDTO.builder()
                        .id(branch.getId())
                        .name(branch.getName())
                        .address(branch.getAddress())
                        .phone(branch.getPhone())
                        .email(branch.getEmail())
                        .operatingStatus(branch.getOperatingStatus())
                        .numberOfStaff(branch.getNumberOfStaff())
                        .capacity(branch.getCapacity())
                        .type(branch.getType())
                        .build())
                .collect(Collectors.toList());
    }
}
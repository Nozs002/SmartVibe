package com.smartvibe.modules.staff.service;

import org.springframework.stereotype.Service;

import com.smartvibe.modules.staff.repository.StaffRepository;
import com.smartvibe.modules.user.repository.UserRepository;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.modules.staff.dto.StaffDTO;
import com.smartvibe.modules.staff.dto.StaffInfo;
import com.smartvibe.modules.staff.dto.StaffResponse;
import com.smartvibe.modules.staff.entity.Staff;
import com.smartvibe.modules.user.entity.User;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import com.smartvibe.common.exception.AppException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StaffService {
    private final StaffRepository staffRepository;
    private final UserRepository userRepository;

    private StaffResponse mapToResponse(Staff staff) {
        User user = userRepository.findById(staff.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return StaffResponse.builder()
                .id(staff.getId())
                .userId(user.getId())
                .username(user.getUsername())
                .fullname(user.getFullname())
                .email(user.getEmail())
                .phone(user.getPhone())
                .type(staff.getType())
                .workStatus(staff.getWorkStatus())
                .basicSalary(staff.getBasicSalary())
                .allowance(staff.getAllowance())
                .deduction(staff.getDeduction())
                .description(staff.getDescription())
                .branchId(staff.getBranchId())
                .build();
    }

    // Lấy thông tin nhân viên theo ID
    public StaffInfo getStaffById(Long id) {
        Optional<StaffInfo> staffInfoOpt = staffRepository.findStaffInfoById(id);
        if (staffInfoOpt.isEmpty()) {
            throw new AppException(ErrorCode.STAFF_NOT_FOUND_BY_USER_ID);
        }
        return staffInfoOpt.get();
    }

    // Lấy danh sách tất cả nhân viên
    public List<StaffResponse> getAllStaffs(String username) {
        User loggedInUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if ("system admin".equals(loggedInUser.getRole())) {
            return staffRepository.findAll().stream().map(this::mapToResponse).toList();
        }

        if ("staff".equals(loggedInUser.getRole())) {
            Staff currentStaff = staffRepository.findByUserId(loggedInUser.getId())
                    .orElseThrow(() -> new AppException(ErrorCode.STAFF_NOT_FOUND_BY_USER_ID));

            if ("manager".equals(currentStaff.getType())) {
                if (currentStaff.getBranchId() == 1L) {
                    return staffRepository.findAll().stream().map(this::mapToResponse).toList();
                } else {
                    return staffRepository.findByBranchId(currentStaff.getBranchId())
                            .stream().map(this::mapToResponse).toList();
                }
            }
        }
        // Các Role khác bị chặn
        throw new AppException(ErrorCode.UNAUTHORIZED);
    }

    // Cập nhật thông tin nhân viên
    @Transactional(rollbackFor = Exception.class)
    public StaffResponse updateStaff(Long targetStaffId, StaffResponse request, String username) {
        User loggedInUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Staff targetStaff = staffRepository.findById(targetStaffId)
                .orElseThrow(() -> new AppException(ErrorCode.STAFF_NOT_FOUND_BY_USER_ID));
        User targetUser = userRepository.findById(targetStaff.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Kiểm tra quyền
        if ("staff".equals(loggedInUser.getRole())) {
            Staff currentStaff = staffRepository.findByUserId(loggedInUser.getId())
                    .orElseThrow(() -> new AppException(ErrorCode.STAFF_NOT_FOUND_BY_USER_ID));

            if ("manager".equals(currentStaff.getType())) {
                if (currentStaff.getBranchId() != 1L) {
                    // Cấm sửa nhân sự chi nhánh khác
                    if (!targetStaff.getBranchId().equals(currentStaff.getBranchId())) {
                        throw new AppException(ErrorCode.FORBIDDEN);
                    }
                    // Cấm tự ý đổi chi nhánh (điều chuyển)
                    if (request.getBranchId() != null && !request.getBranchId().equals(targetStaff.getBranchId())) {
                        throw new AppException(ErrorCode.FORBIDDEN_TO_EDIT_SYSTEM_ADMIN);
                    }
                }
            } else {
                throw new AppException(ErrorCode.FORBIDDEN);
            }
        } else if (!"system admin".equals(loggedInUser.getRole())) {
            throw new AppException(ErrorCode.FORBIDDEN);
        }

        if (request.getFullname() != null) {
            targetUser.setFullname(request.getFullname());
        }
        
        if (request.getPhone() != null && !request.getPhone().equals(targetUser.getPhone())) {
            if (userRepository.existsByPhoneAndRole(request.getPhone(), "staff")) {
                throw new AppException(ErrorCode.PHONE_EXISTED);
            }
            targetUser.setPhone(request.getPhone());
        }
        userRepository.save(targetUser);

        if (request.getBranchId() != null) targetStaff.setBranchId(request.getBranchId());
        if (request.getType() != null) targetStaff.setType(request.getType());
        if (request.getWorkStatus() != null) targetStaff.setWorkStatus(request.getWorkStatus());
        if (request.getBasicSalary() != null) targetStaff.setBasicSalary(request.getBasicSalary());
        if (request.getAllowance() != null) targetStaff.setAllowance(request.getAllowance());
        if (request.getDeduction() != null) targetStaff.setDeduction(request.getDeduction());
        if (request.getDescription() != null) targetStaff.setDescription(request.getDescription());
        staffRepository.save(targetStaff);

        return mapToResponse(targetStaff);
    }
}

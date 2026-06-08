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

    // Tạo nhân viên khi quản trị viên phê duyệt tài khoản nhân viên mới
    public StaffDTO createStaffDefautl(Long userId) {
        Optional<Staff> staffOpt = staffRepository.findByUserId(userId);
        Staff staff = new Staff();
        if (staffOpt.isEmpty()) {
            staff = Staff.builder().type("sales").workStatus("working").userId(userId).build();
            staff = staffRepository.save(staff);

        } else {
            staff = staffOpt.get();
        }
        return StaffDTO.builder().id(staff.getId()).type(staff.getType()).workStatus(staff.getWorkStatus())
                .description(staff.getDescription()).basicSalary(staff.getBasicSalary()).allowance(staff.getAllowance())
                .bonus(staff.getBonus()).deduction(staff.getDeduction()).userId(staff.getUserId())
                .branchId(staff.getBranchId()).build();
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
    public List<StaffResponse> getAllStaffs() {
        return staffRepository.findAll().stream().map(staff -> {
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
        }).toList();
    }

    // Cập nhật thông tin nhân viên
    @Transactional(rollbackFor = Exception.class)
    public StaffResponse updateStaff(Long staffId, StaffResponse request) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new AppException(ErrorCode.STAFF_NOT_FOUND_BY_USER_ID));

        User user = userRepository.findById(staff.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (request.getFullname() != null) user.setFullname(request.getFullname());
        if (request.getPhone() != null){
            if (userRepository.existsByPhoneAndRole(request.getPhone(), "staff")) {
                throw new AppException(ErrorCode.PHONE_EXISTED);
            }
            user.setPhone(request.getPhone());
            userRepository.save(user);
        }

        if (request.getBranchId() != null) staff.setBranchId(request.getBranchId());
        if (request.getType() != null) staff.setType(request.getType());
        if (request.getWorkStatus() != null) staff.setWorkStatus(request.getWorkStatus());
        if (request.getBasicSalary() != null) staff.setBasicSalary(request.getBasicSalary());
        if (request.getAllowance() != null) staff.setAllowance(request.getAllowance());
        if (request.getDeduction() != null) staff.setDeduction(request.getDeduction());
        if (request.getDescription() != null) staff.setDescription(request.getDescription());
        staffRepository.save(staff);

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
}

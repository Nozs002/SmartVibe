package com.smartvibe.modules.staff.service;

import org.springframework.stereotype.Service;

import com.smartvibe.modules.staff.repository.StaffRepository;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.modules.staff.dto.StaffDTO;
import com.smartvibe.modules.staff.dto.StaffInfo;
import com.smartvibe.modules.staff.entity.Staff;
import java.util.*;
import com.smartvibe.common.exception.AppException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StaffService {
    private final StaffRepository staffRepository;

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
}

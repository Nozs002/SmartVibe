package com.smartvibe.modules.staff.service;

import org.springframework.stereotype.Service;

import com.smartvibe.modules.staff.repository.StaffRepository;
import com.smartvibe.modules.staff.dto.StaffDTO;
import com.smartvibe.modules.staff.entity.Staff;
import java.util.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StaffService {
    private final StaffRepository staffRepository;

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
}

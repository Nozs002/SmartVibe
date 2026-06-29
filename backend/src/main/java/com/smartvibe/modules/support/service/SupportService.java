package com.smartvibe.modules.support.service;

import com.smartvibe.modules.support.dto.ContactInfoDTO;
import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SupportService {

    private final UserRepository userRepository;

    public ContactInfoDTO getManagerContactForBranch(Long branchId) {
        Optional<User> managerOpt = userRepository.findManagerByBranchId(branchId);

        if (managerOpt.isPresent()) {
            User manager = managerOpt.get();
            return ContactInfoDTO.builder()
                    .name(manager.getFullname() != null ? manager.getFullname() : "Quản lý Chi nhánh")
                    .phone(manager.getPhone() != null ? manager.getPhone() : "Chưa cập nhật SĐT")
                    .build();
        }

        return ContactInfoDTO.builder()
                .name("Quản lý Hệ thống")
                .phone("Đang cập nhật...")
                .build();
    }
}
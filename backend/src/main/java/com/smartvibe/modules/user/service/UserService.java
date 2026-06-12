package com.smartvibe.modules.user.service;

import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.user.repository.UserRepository;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.RequiredArgsConstructor;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.modules.customer.service.CustomerService;
import com.smartvibe.modules.staff.dto.StaffCreateRequest;
import com.smartvibe.modules.staff.entity.Staff;
import com.smartvibe.modules.staff.service.StaffService;
import com.smartvibe.modules.staff.repository.StaffRepository;
import com.smartvibe.modules.customer.repository.CustomerRepository;

import com.smartvibe.modules.user.dto.response.UserResponse;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StaffRepository staffRepository;
    private final CustomerRepository customerRepository;

    // Lấy danh sách tất cả user
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> UserResponse.builder().id(user.getId()).username(user.getUsername()).role(user.getRole())
                        .address(user.getAddress()).birthday(user.getBirthday()).email(user.getEmail())
                        .description(user.getDescription()).avtUrl(user.getAvtUrl()).personalImg(user.getPersonalImg())
                        .phone(user.getPhone()).sex(user.getSex()).identifyCode(user.getIdentifyCode())
                        .accountStatus(user.getAccountStatus()).fullname(user.getFullname())
                        .createdAt(user.getCreatedAt()).build())
                .toList();
    }

    // Cập nhật thông tin user
    @Transactional(rollbackFor = Exception.class)
    public UserResponse updateUser(Long id, UserResponse userResponse) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }

        User user = userOpt.get();

        if (userResponse.getUsername() != null && !userResponse.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(userResponse.getUsername()))
                throw new AppException(ErrorCode.USER_EXISTED);
            user.setUsername(userResponse.getUsername());
        }
        if (userResponse.getEmail() != null && !userResponse.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userResponse.getEmail()))
                throw new AppException(ErrorCode.EMAIL_EXISTED);
            user.setEmail(userResponse.getEmail());
        }

        if (userResponse.getFullname() != null)
            user.setFullname(userResponse.getFullname());
        if (userResponse.getAccountStatus() != null) {
            user.setAccountStatus(userResponse.getAccountStatus());
        }
        if (userResponse.getPhone() != null)
            user.setPhone(userResponse.getPhone());
        if (userResponse.getAddress() != null)
            user.setAddress(userResponse.getAddress());
        if (userResponse.getSex() != null)
            user.setSex(userResponse.getSex());
        if (userResponse.getBirthday() != null)
            user.setBirthday(userResponse.getBirthday());
        if (userResponse.getDescription() != null)
            user.setDescription(userResponse.getDescription());
        if (userResponse.getIdentifyCode() != null)
            user.setIdentifyCode(userResponse.getIdentifyCode());

        User updatedUser = userRepository.save(user);

        return UserResponse.builder().id(updatedUser.getId()).username(updatedUser.getUsername())
                .fullname(updatedUser.getFullname()).email(updatedUser.getEmail()).role(updatedUser.getRole())
                .accountStatus(updatedUser.getAccountStatus()).phone(updatedUser.getPhone())
                .address(updatedUser.getAddress()).sex(updatedUser.getSex()).birthday(updatedUser.getBirthday())
                .description(updatedUser.getDescription()).avtUrl(updatedUser.getAvtUrl())
                .personalImg(updatedUser.getPersonalImg()).identifyCode(updatedUser.getIdentifyCode())
                .createdAt(updatedUser.getCreatedAt()).build();
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        try {
            if ("staff".equals(user.getRole()) || "system admin".equals(user.getRole())) {
                staffRepository.findByUserId(id).ifPresent(staffRepository::delete);
            } else if ("customer".equals(user.getRole())) {
                customerRepository.findByUserId(id).ifPresent(customerRepository::delete);
            }
            userRepository.deleteById(id);

        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.USER_IN_USE);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public UserResponse createStaff(StaffCreateRequest request) {
        String role = "staff";

        if (userRepository.existsByUsername(request.getUsername())) throw new AppException(ErrorCode.USER_EXISTED);
        if (userRepository.existsByEmail(request.getEmail())) throw new AppException(ErrorCode.EMAIL_EXISTED);
        
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .phone(request.getPhone())
                .sex("other")
                .role(role)
                .accountStatus("inactive")
                .build();

        user = userRepository.save(user);

        Staff staff = Staff.builder()
                .userId(user.getId())
                .branchId(request.getBranchId())
                .type(request.getStaffType())
                .workStatus("working")
                .build();
        staffRepository.save(staff);

        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .accountStatus(user.getAccountStatus())
                .build();
    }

    @Transactional(rollbackFor = Exception.class)
    public UserResponse approveAccount(Long userId, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
                
        user.setAccountStatus(status);
        user = userRepository.save(user);
        
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .accountStatus(user.getAccountStatus())
                .build();
    }
}
package com.smartvibe.modules.user.service;

import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.user.repository.UserRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.modules.customer.service.CustomerService;
import com.smartvibe.modules.staff.service.StaffService;

import com.smartvibe.modules.user.dto.response.UserResponse;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final CustomerService customerService;
    private final StaffService staffService;

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
        if (userResponse.getRole() != null)
            user.setRole(userResponse.getRole());
        if (userResponse.getAccountStatus() != null) {
            if (userResponse.getAccountStatus().equals("active") && user.getAccountStatus().equals("inactive"))
                createObj(user);
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

    public void createObj(User user) {
        if (user.getRole().equals("customer")) {
            customerService.createCustomer(user.getId());
        } else if (user.getRole().equals("staff")) {
            staffService.createStaffDefautl(user.getId());
        }
    }

    public void deleteUser(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        userRepository.deleteById(id);
    }
}
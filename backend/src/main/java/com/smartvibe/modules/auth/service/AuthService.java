package com.smartvibe.modules.auth.service;

import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.user.repository.UserRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartvibe.modules.auth.dto.UserLoginRequest;
import com.smartvibe.modules.auth.dto.UserLoginResponse;
import com.smartvibe.modules.auth.dto.UserRegisterRequest;

import lombok.RequiredArgsConstructor;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public UserLoginResponse login(UserLoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(request.getPassword())) {
            throw new AppException(ErrorCode.INVALID_LOGIN);
        }
        User user = userOpt.get();
        UserLoginResponse response = UserLoginResponse.builder().username(user.getUsername()).role(user.getRole())
                .address(user.getAddress()).birthday(user.getBirthday()).email(user.getEmail())
                .description(user.getDescription()).avt_url(user.getAvtUrl()).personal_img(user.getPersonalImg())
                .phone(user.getPhone()).sex(user.getSex()).identifyCode(user.getIdentifyCode())
                .createdAt(user.getCreatedAt()).accountStatus(user.getAccountStatus()).build();
        return response;
    }

    public User register(UserRegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
        }
        User user = User.builder().username(request.getUsername()).password(request.getPassword())
                .email(request.getEmail()).role(request.getRole() != null ? request.getRole() : "customer")
                .phone(request.getPhone()).accountStatus("inactive")
                .sex(request.getSex() != null ? request.getSex() : "other").build();
        return userRepository.save(user);
    }
}
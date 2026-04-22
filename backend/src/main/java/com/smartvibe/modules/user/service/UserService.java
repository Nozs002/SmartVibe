package com.smartvibe.modules.user.service;

import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.user.repository.UserRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.smartvibe.modules.user.dto.request.UserCreationRequest;

import lombok.RequiredArgsConstructor;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private void check(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
        if (request.getPhone() != null && !request.getPhone().trim().isEmpty()) {
            if (userRepository.existsByPhone(request.getPhone())) {
                throw new AppException(ErrorCode.PHONE_EXISTED);
            }
        }
    }

    public User createUser(UserCreationRequest request) {
        check(request);
        User user = User.builder().username(request.getUsername()).password(request.getPassword())
                .email(request.getEmail()).phone(request.getPhone()).role("customer").accountStatus("active").build();
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUser(long id) {
        return userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }
}
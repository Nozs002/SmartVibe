package com.smartvibe.modules.user.service;

import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.user.repository.UserRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.modules.user.dto.response.UserResponse;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> UserResponse.builder().id(user.getId()).username(user.getUsername())
                        .password(user.getPassword()).role(user.getRole()).address(user.getAddress())
                        .birthday(user.getBirthday()).email(user.getEmail()).description(user.getDescription())
                        .avtUrl(user.getAvtUrl()).personalImg(user.getPersonalImg()).phone(user.getPhone())
                        .sex(user.getSex()).identifyCode(user.getIdentifyCode()).accountStatus(user.getAccountStatus())
                        .createdAt(user.getCreatedAt()).build())
                .toList();
    }
}
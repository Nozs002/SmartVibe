package com.smartvibe.modules.user.service;

import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.user.repository.UserRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
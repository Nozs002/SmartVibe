package com.smartvibe.modules.customer.service;

import com.smartvibe.modules.customer.dto.CustomerDTO;
import com.smartvibe.modules.customer.dto.CustomerResponse;
import com.smartvibe.modules.customer.entity.Customer;
import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.customer.repository.CustomerRepository;
import com.smartvibe.modules.user.repository.UserRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll().stream().map(customer -> {
            User user = userRepository.findById(customer.getUserId())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            return CustomerResponse.builder()
                    .id(customer.getId())
                    .userId(user.getId())
                    .username(user.getUsername())
                    .fullname(user.getFullname())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .sex(user.getSex())
                    .type(customer.getType())
                    .build();
        }).toList();
    }

    @Transactional(rollbackFor = Exception.class)
    public CustomerResponse updateCustomer(Long customerId, CustomerResponse request) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin khách hàng!"));

        User user = userRepository.findById(customer.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (request.getType() != null) {
            customer.setType(request.getType());
            customerRepository.save(customer);
        }

        return CustomerResponse.builder()
                .id(customer.getId())
                .userId(user.getId())
                .username(user.getUsername())
                .fullname(user.getFullname())
                .email(user.getEmail())
                .phone(user.getPhone())
                .sex(user.getSex())
                .type(customer.getType())
                .build();
    }
}

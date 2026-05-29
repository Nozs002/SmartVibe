package com.smartvibe.modules.customer.service;

import com.smartvibe.modules.customer.dto.CustomerDTO;
import com.smartvibe.modules.customer.entity.Customer;
import com.smartvibe.modules.customer.repository.CustomerRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerDTO createCustomer(Long userId) {
        Optional<Customer> customerOpt = customerRepository.findByUserId(userId);
        Customer customer = new Customer();
        if (customerOpt.isEmpty()) {
            customer = Customer.builder().type("normal").userId(userId).build();
        } else {
            customer = customerOpt.get();
        }
        customer = customerRepository.save(customer);
        return CustomerDTO.builder().id(customer.getId()).type(customer.getType()).userId(customer.getUserId()).build();
    }
}

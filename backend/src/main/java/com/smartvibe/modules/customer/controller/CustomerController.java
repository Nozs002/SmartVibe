package com.smartvibe.modules.customer.controller;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.customer.dto.CustomerResponse;
import com.smartvibe.modules.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin("*")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @GetMapping
    @PreAuthorize("hasAnyRole('SYSTEM_ADMIN', 'MANAGER', 'SALES')")
    public ApiResponse<List<CustomerResponse>> getAllCustomers() {
        return ApiResponse.<List<CustomerResponse>>builder()
                .result(customerService.getAllCustomers())
                .build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SYSTEM_ADMIN', 'MANAGER')")
    public ApiResponse<CustomerResponse> updateCustomer(@PathVariable("id") Long id, @RequestBody CustomerResponse request) {
        return ApiResponse.<CustomerResponse>builder()
                .result(customerService.updateCustomer(id, request))
                .build();
    }
}
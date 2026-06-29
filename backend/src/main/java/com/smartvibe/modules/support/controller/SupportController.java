package com.smartvibe.modules.support.controller;

import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.support.dto.ContactInfoDTO;
import com.smartvibe.modules.support.service.SupportService;
import com.smartvibe.modules.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/support")
@CrossOrigin("*")
@RequiredArgsConstructor
public class SupportController {

    private final SupportService supportService;

    @GetMapping("/manager-contact")
    public ApiResponse<ContactInfoDTO> getManagerContact() {
        ContactInfoDTO contact = supportService.getManagerContactForBranch(1L);

        ApiResponse<ContactInfoDTO> response = new ApiResponse<>();
        response.setResult(contact);
        
        return response;
    }
}
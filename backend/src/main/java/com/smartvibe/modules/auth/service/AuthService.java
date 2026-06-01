package com.smartvibe.modules.auth.service;

import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.user.repository.UserRepository;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartvibe.modules.auth.dto.UserLoginRequest;
import com.smartvibe.modules.user.dto.response.UserResponse;
import com.smartvibe.modules.staff.dto.StaffDTO;
import com.smartvibe.modules.customer.dto.CustomerDTO;
import com.smartvibe.modules.auth.dto.UserRegisterRequest;

import lombok.RequiredArgsConstructor;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.common.response.AuthenticationResponse;
import com.smartvibe.common.security.JwtAuthenticationFilter;
import com.smartvibe.modules.customer.repository.CustomerRepository;
import com.smartvibe.modules.staff.repository.StaffRepository;
import com.smartvibe.modules.customer.entity.Customer;
import com.smartvibe.modules.staff.entity.Staff;

import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepository;

    // Goi ham bam mat khau
    private final PasswordEncoder passwordEncoder;
    private final CustomerRepository customerRepository;
    private final StaffRepository staffRepository;

    // Chia khoa tao Token
    protected static final String SIGNER_KEY = "Daylakhoabimatcododaitoithiru64bitdekyTokenJWTchohethongSMARTVIBE";

    public AuthenticationResponse login(UserLoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isEmpty()) {
            throw new AppException(ErrorCode.INVALID_LOGIN);
        }
        User user = userOpt.get();

        // kiem tra mat khau
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.INVALID_LOGIN);
        }

        UserResponse userResponse = UserResponse.builder().username(user.getUsername()).fullname(user.getFullname())
                .role(user.getRole()).address(user.getAddress()).birthday(user.getBirthday()).email(user.getEmail())
                .description(user.getDescription()).avtUrl(user.getAvtUrl()).personalImg(user.getPersonalImg())
                .phone(user.getPhone()).sex(user.getSex()).identifyCode(user.getIdentifyCode())
                .createdAt(user.getCreatedAt()).accountStatus(user.getAccountStatus()).build();

        StaffDTO staff = new StaffDTO();
        CustomerDTO customer = new CustomerDTO();
        if (user.getRole().equals("staff")) {
            Optional<Staff> staffOpt = staffRepository.findByUserId(user.getId());
            if (!staffOpt.isEmpty()) {
                staff = StaffDTO.builder().id(staffOpt.get().getId()).type(staffOpt.get().getType())
                        .branchId(staffOpt.get().getBranchId()).workStatus(staffOpt.get().getWorkStatus())
                        .description(staffOpt.get().getDescription()).basicSalary(staffOpt.get().getBasicSalary())
                        .allowance(staffOpt.get().getAllowance()).bonus(staffOpt.get().getBonus())
                        .deduction(staffOpt.get().getDeduction()).userId(staffOpt.get().getUserId()).build();
            }
        } else if (user.getRole().equals("customer")) {
            Optional<Customer> customerOpt = customerRepository.findByUserId(user.getId());
            if (!customerOpt.isEmpty()) {
                customer = CustomerDTO.builder().id(customerOpt.get().getId()).type(customerOpt.get().getType())
                        .userId(customerOpt.get().getUserId()).build();
            }
        }

        //tao token xac dinh nguoi dung
        String token = generateToken(user, staff, customer);

        return AuthenticationResponse.builder().token(token).authenticated(true).user(userResponse).staff(staff)
                .customer(customer).build();
    }

    // Đăng ký
    public UserResponse register(UserRegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
        }

        // Bam mat khau
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = User.builder().username(request.getUsername()).password(encodedPassword).email(request.getEmail())
                .role(request.getRole() != null ? request.getRole() : "customer").phone(request.getPhone())
                .accountStatus("inactive").sex(request.getSex() != null ? request.getSex() : "other").build();
        userRepository.save(user);
        return UserResponse.builder().username(user.getUsername()).role(user.getRole()).address(user.getAddress())
                .birthday(user.getBirthday()).email(user.getEmail()).description(user.getDescription())
                .avtUrl(user.getAvtUrl()).personalImg(user.getPersonalImg()).phone(user.getPhone()).sex(user.getSex())
                .identifyCode(user.getIdentifyCode()).createdAt(user.getCreatedAt())
                .accountStatus(user.getAccountStatus()).build();
    }

    // ham tao token
    private String generateToken(User user, StaffDTO staff, CustomerDTO customer) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        String role = user.getRole();
        if(role.equals("staff")) {
            role = staff.getType();
        }
        // subject: Lưu user.getUsername()
        // issuer: Nguồn phát hành là smartvibe.com.
        // issueTime: Thời điểm tạo token.
        // expirationTime: Thời điểm hết hạn (1 giờ sau khi tạo).
        // scope: Lưu user.getRole().
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder().subject(user.getUsername()).issuer("smartvibe.com")
                .issueTime(new Date()).expirationTime(new Date(Instant.now().plus(8, ChronoUnit.HOURS).toEpochMilli()))
                .claim("userId", user.getId()).claim("email", user.getEmail()).claim("scope", role).build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }
}
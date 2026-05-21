package com.smartvibe.common.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import com.smartvibe.modules.customer.dto.CustomerDTO;
import com.smartvibe.modules.auth.dto.UserResponse;
import com.smartvibe.modules.staff.dto.StaffDTO;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    private String token;
    private boolean authenticated;
    private CustomerDTO customer;
    private UserResponse user;
    private StaffDTO staff;
}

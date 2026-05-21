package com.smartvibe.modules.customer.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private Long id;
    private String type;
    private Long userId;
}

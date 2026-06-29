package com.smartvibe.modules.support.dto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ContactInfoDTO {
    private String name;
    private String phone;
}
package com.smartvibe.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL) // tu dong gan private vao tat ca cac bien co gia tri null ra json
public class ApiResponse<T> {
    @Builder.Default // neu khong co gia tri thi gan la 1000
    int code = 1000;

    String message;
    T result;
    
}

package com.smartvibe.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.smartvibe.common.response.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j // tạo ra một biến ngầm là log để in log ra console khi có lỗi xảy ra
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class) // bắt tất cả các lỗi exception
    ResponseEntity<ApiResponse> handlingRuntimeException(Exception exception) {
        log.error("Exception: ", exception); // in log ra console khi lỗi xảy ra
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(9999);
        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());

        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingValidation(MethodArgumentNotValidException exception) {
        String enumKey = exception.getBindingResult().getFieldError().getDefaultMessage();

        // 1. Khởi tạo một mã lỗi mặc định (ví dụ: INVALID_KEY - 1001)
        ErrorCode errorCode = ErrorCode.INVALID_KEY;

        // 2. Thử map chuỗi message sang Enum. Nếu sai hoặc không khớp, dùng mã mặc
        // định.
        try {
            errorCode = ErrorCode.valueOf(enumKey);
        } catch (IllegalArgumentException e) {
            // Log lại để biết bạn đang thiếu Key nào trong ErrorCode enum
            log.warn("Validation key '{}' not found in ErrorCode enum", enumKey);
        }

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.status(errorCode.getStatusCode()) // Dùng đúng Status từ Enum (400)
                .body(apiResponse);
    }
}

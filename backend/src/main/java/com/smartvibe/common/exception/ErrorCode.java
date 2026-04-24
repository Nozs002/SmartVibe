package com.smartvibe.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "Tên đăng nhập đã tồn tại trong hệ thống!", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Tên đăng nhập phải có ít nhất 3 ký tự!", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password phải có ít nhất 8 ký tự!", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "Tài khoản không tồn tại!", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Bạn chưa đăng nhập!", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN),
    EMAIL_EXISTED(1008, "Email đã tồn tại trong hệ thống!", HttpStatus.BAD_REQUEST),
    PHONE_EXISTED(1009, "Số điện thoại đã tồn tại trong hệ thống!", HttpStatus.BAD_REQUEST),
    USERNAME_BLANK(1010, "Tên đăng nhập không thể để trống!", HttpStatus.BAD_REQUEST),
    PASSWORD_BLANK(1011, "Password không thể để trống!", HttpStatus.BAD_REQUEST),
    EMAIL_BLANK(1012, "Email không thể để trống!", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL(1013, "Email không đúng định dạng!", HttpStatus.BAD_REQUEST),
    INVALID_LOGIN(1014, "Tên đăng nhập hoặc mật khẩu không đúng!", HttpStatus.BAD_REQUEST),
    PASSWORD_NOT_MATCH(1015, "Xác nhận mật khẩu không khớp!", HttpStatus.BAD_REQUEST),;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}

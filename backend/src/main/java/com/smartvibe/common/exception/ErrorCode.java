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
    PASSWORD_NOT_MATCH(1015, "Xác nhận mật khẩu không khớp!", HttpStatus.BAD_REQUEST),
    CART_ALREADY_EXISTS(1016, "Giỏ hàng đã tồn tại!", HttpStatus.BAD_REQUEST),
    CART_NOT_FOUND(1017, "Giỏ hàng không tồn tại!", HttpStatus.NOT_FOUND),
    CUSTOMER_NOT_FOUND(1018, "Customer không tồn tại!", HttpStatus.NOT_FOUND),
    STAFF_NOT_FOUND(1019, "Staff không tồn tại!", HttpStatus.NOT_FOUND),
    CART_ITEM_NOT_FOUND(1020, "CartItem không tồn tại!", HttpStatus.NOT_FOUND),
    PRODUCT_STOCK_NOT_ENOUGH(1021, "Số lượng sản phẩm không đủ!", HttpStatus.BAD_REQUEST),
    CART_ITEMS_EMPTY(1022, "Giỏ hàng trống!", HttpStatus.BAD_REQUEST),
    NOT_ENOUGH_SERIALS(1023, "Không đủ sản phẩm serial!", HttpStatus.NOT_FOUND),
    INVENTORY_NOT_FOUND(1024, "Inventory không tồn tại!", HttpStatus.NOT_FOUND),
    PRODUCT_NOT_FOUND(1025, "Sản phẩm không tồn tại!", HttpStatus.NOT_FOUND),
    STAFF_NOT_FOUND_BY_USER_ID(1026, "Không tìm thấy nhân viên theo userId!", HttpStatus.NOT_FOUND),
    ORDER_NOT_FOUND(1027, "Đơn hàng không tồn tại!", HttpStatus.NOT_FOUND),
    SERIAL_QUANTITY_MISMATCH(1028, "Số lượng serial không khớp với số lượng sản phẩm!", HttpStatus.BAD_REQUEST),
    SERIAL_ALREADY_EXISTS(1029, "Serial đã tồn tại trong hệ thống!", HttpStatus.BAD_REQUEST),
    INVALID_PRODUCT_ITEM_STATUS(1030, "Sản phẩm serial không hợp lệ!", HttpStatus.BAD_REQUEST),
    DOCUMENT_NOT_FOUND(1031, "Chứng từ không tồn tại!", HttpStatus.NOT_FOUND),
    INVALID_DOCUMENT_STATUS(1032, "Trạng thái chứng từ không hợp lệ!", HttpStatus.BAD_REQUEST);

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}

# SmartVibe Coding Rules

## 1. Mục tiêu chung

Code phải:

- rõ ràng
- dễ đọc
- dễ sửa
- phù hợp với một người làm dự án một mình
- ưu tiên chạy được và dễ debug

## 2. Quy tắc cho frontend

- dùng React JavaScript
- ưu tiên component đơn giản
- không lạm dụng tối ưu quá sớm
- đặt tên component rõ nghĩa
- tách page và component nếu cần
- gọi API bằng fetch hoặc axios theo một cách thống nhất
- luôn xử lý loading và lỗi cơ bản

## 3. Quy tắc cho backend

- dùng Spring Boot
- tổ chức theo kiểu:
  - controller
  - service
  - repository
  - entity
- không viết toàn bộ logic vào controller
- service xử lý nghiệp vụ
- repository chỉ truy cập dữ liệu

## 4. Quy tắc database

- dùng MySQL
- database chạy bằng Docker
- tên bảng và cột phải rõ nghĩa
- khóa ngoại phải hợp lý
- tránh thiết kế quá phức tạp trong MVP

## 5. Quy tắc cho tồn kho

- mọi thay đổi tồn kho nên đi qua logic nghiệp vụ rõ ràng
- không cập nhật số lượng trực tiếp một cách tùy tiện
- cần kiểm tra số lượng trước khi bán
- không để tồn kho âm

## 6. Quy tắc khi hỏi AI về code

Khi yêu cầu AI hỗ trợ code, nên nêu rõ:

- module đang làm
- file hiện có
- mục tiêu cụ thể
- đầu ra mong muốn

## 7. Quy tắc ưu tiên

Thứ tự ưu tiên:

1. database đúng
2. API chạy được
3. frontend gọi được API
4. giao diện đủ dùng
5. tối ưu và làm đẹp sau

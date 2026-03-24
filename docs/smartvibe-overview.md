# SmartVibe Overview

## 1. Giới thiệu dự án

SmartVibe là một ứng dụng web quản lý tập trung cho chuỗi cửa hàng bán đồ điện tử có nhiều chi nhánh và kho tổng.

Hệ thống hỗ trợ các hoạt động chính:

- quản lý tài khoản và phân quyền người dùng
- quản lý chi nhánh, kho tổng, nhân viên và khách hàng
- quản lý sản phẩm, serial sản phẩm và trạng thái bán online
- quản lý tồn kho theo từng vị trí lưu trữ
- nhập kho, xuất kho, điều chỉnh tồn kho và điều chuyển hàng
- bán hàng tại quầy (POS)
- bán hàng online
- hỗ trợ kỹ thuật, bảo trì, đổi trả
- hỗ trợ gợi ý nhập hàng và điều phối hàng hóa

## 2. Mục tiêu dự án

Mục tiêu của SmartVibe là xây dựng một hệ thống quản lý tập trung giúp:

- theo dõi sản phẩm và tồn kho theo từng chi nhánh và kho tổng
- hỗ trợ bán hàng trực tiếp tại cửa hàng
- hỗ trợ bán hàng online cho khách hàng
- hỗ trợ quản lý nhân viên, khách hàng và hoạt động vận hành của chuỗi cửa hàng
- hỗ trợ xử lý hỗ trợ kỹ thuật, bảo trì và đổi trả sản phẩm
- hỗ trợ ra quyết định nhập thêm hàng hoặc phân phối hàng hợp lý giữa kho tổng và các chi nhánh

## 3. Bối cảnh sử dụng

SmartVibe phù hợp với mô hình chuỗi cửa hàng điện tử có nhiều chi nhánh như:

- CellphoneS
- GearVN
- HACOM

Hệ thống được xây dựng theo mô hình dữ liệu tập trung:

- người dùng có thể truy cập từ nhiều máy tính khác nhau
- dữ liệu được lưu trữ thống nhất tại một cơ sở dữ liệu trung tâm
- hệ thống phục vụ đồng thời cho người dùng nội bộ và khách hàng mua online

## 4. Đối tượng sử dụng chính

Các đối tượng sử dụng chính của hệ thống gồm:

- User (actor trừu tượng)
- System Admin
- Manager
- Sales Staff
- Warehouse Staf
- Technical Staff
- Customer

Trong đó:

- User dùng chung cho các chức năng cơ bản như đăng nhập, đổi mật khẩu, đăng xuất
- System Admin quản lý tài khoản, phân quyền và lịch sử hoạt động
- Manager quản lý vận hành, sản phẩm, tồn kho, điều phối, báo cáo
- Sales Staff xử lý bán hàng tại quầy, khách hàng và đề xuất nhập hàng tại chi nhánh
- Warehouse Staff xử lý nhập kho, xuất kho, kiểm kê và điều chỉnh tồn kho
- Technical Staff xử lý phiếu hỗ trợ, bảo trì, đổi trả
- Customer mua hàng online, quản lý thông tin cá nhân và gửi yêu cầu hỗ trợ

## 5. Định hướng triển khai

SmartVibe được thiết kế theo hướng chia module rõ ràng để:

- dễ phát triển từng phần
- dễ bảo trì
- dễ mở rộng về sau
- phù hợp với cách làm theo từng giai đoạn

## 6. Mục tiêu kỹ thuật

Frontend: React JavaScript
Backend: Spring Boot
Database: MySQL chạy bằng Docker
Hệ thống được xây dựng theo hướng:

- dễ cài đặt
- dễ debug
- phù hợp cho người mới học full-stack
- phát triển rõ ràng theo module

## 7. Mục tiêu học tập và thực hành

Dự án được xây dựng bởi một sinh viên theo hướng vừa học vừa làm thực tế.
Mục tiêu không chỉ là tạo ra một hệ thống chạy được, mà còn để rèn luyện:

- phân tích nghiệp vụ
- thiết kế module
- thiết kế cơ sở dữ liệu
- xây dựng API bằng Spring Boot
- xây dựng giao diện bằng React
- tổ chức code theo hướng dễ đọc, dễ sửa, dễ mở rộng

## 8. Nguyên tắc phát triển

SmartVibe ưu tiên:

- đúng nghiệp vụ trước
- dữ liệu đúng trước
- các luồng kho và bán hàng phải rõ ràng
- không để tồn kho âm
- mọi thay đổi tồn kho đi qua nghiệp vụ rõ ràng
- ưu tiên hệ thống chạy ổn định và dễ debug hơn là tối ưu quá sớm

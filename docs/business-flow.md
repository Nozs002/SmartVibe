# SmartVibe MVP Scope

## 1. Mục tiêu của MVP

Xây dựng một hệ thống web quản lý tập trung cho chuỗi cửa hàng điện tử.

Hệ thống hỗ trợ quản lý sản phẩm, kho, nhân viên, khách hàng, bán hàng tại quầy, bán hàng online, hỗ trợ kỹ thuật và gợi ý nhập / điều phối hàng.

Hệ thống được thiết kế theo hướng có thể triển khai trước phần lõi và mở rộng dần theo module.

## 2. Các actor chính

- User (actor trừu tượng)
- System Admin
- Manager
- Sales Staff
- Warehouse Staff
- Technical Staff
- Customer

## 3. Chức năng bắt buộc trong MVP

## 3.1. Account and Security

- đăng nhập
- đổi mật khẩu
- đăng xuất
- quản lý người dùng
- phân quyền cơ bản
- xem lịch sử hoạt động

## 3.2. Organization Management

- quản lý chi nhánh
- quản lý kho tổng
- quản lý nhân viên
- quản lý khách hàng

## 3.3. Product Management

- quản lý sản phẩm
- quản lý serial sản phẩm
- quản lý trạng thái bán online
- khuyến mãi mức cơ bản

## 3.4. Inventory and Warehouse

- tồn kho theo vị trí lưu trữ
- giao dịch tồn kho
- phiếu nhập
- phiếu xuất
- phiếu điều chỉnh
- yêu cầu bổ sung hàng
- điều chuyển hàng

## 3.5. Sales

- POS order
- online order
- giỏ hàng
- quản lý khách hàng

## 3.6. Technical Support

- phiếu hỗ trợ
- lịch sử bảo trì
- xử lý đổi / trả

## 3.7. Operations and Reporting

- dashboard
- KPI / report
- quản lý tài khoản nhận tiền

## 3.8. AI Suggestion

- gợi ý nhập thêm cho chi nhánh
- gợi ý nhập thêm cho kho tổng
- gợi ý điều chuyển hàng

## 4. Chức năng lõi phải làm trước

- Auth
- User Management
- Product
- Branch
- Warehouse
- Inventory
- Inventory Transaction
- Import
- Export / Transfer
- POS Order
- Online Order
- Giỏ hàng
- Customer Management
- Stock Request
- AI Suggestion cơ bản

## 5. Chức năng mở rộng làm sau

- thanh toán online thật
- phân quyền chi tiết nhiều cấp
- chatbot khách hàng
- machine learning
- đồng bộ realtime phức tạp
- microservices
- báo cáo nâng cao
- quản lý nhà cung cấp đầy đủ
- công nợ nâng cao
- import/export file phức tạp

## 6. Tiêu chí hoàn thành

- có backend Spring Boot chạy ổn định theo module
- có frontend React JavaScript gọi được API
- có MySQL chạy bằng Docker
- dữ liệu tồn kho đúng, không âm
- mọi thay đổi tồn kho đi qua nghiệp vụ rõ ràng
- có thể demo được các luồng lõi:
- quản lý sản phẩm
- quản lý chi nhánh
- nhập kho
- xuất / điều phối kho cơ bản
- bán hàng tại quầy
- đặt hàng online
- đề xuất nhập hàng
- xem gợi ý nhập / điều chuyển cơ bản

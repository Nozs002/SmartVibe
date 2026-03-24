# SmartVibe Project

## 1. Giới thiệu

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

## 3. Phạm vi hệ thống

SmartVibe là ứng dụng web dùng trên máy tính cá nhân.

Người dùng nội bộ và khách hàng có thể truy cập hệ thống qua trình duyệt web, trong khi dữ liệu được lưu tập trung tại một cơ sở dữ liệu trung tâm.

Hệ thống phục vụ cho mô hình chuỗi cửa hàng điện tử có:

- nhiều chi nhánh
- kho tổng
- nhiều loại nhân viên với vai trò khác nhau
- khách hàng mua trực tiếp và mua online

## 4. Actor chính

### 4.1. Actor trừu tượng

- **User**

### 4.2. Actor cụ thể

- **System Admin**
- **Manager**
- **Sales Staff**
- **Warehouse Staff**
- **Technical Staff**
- **Customer**

## 5. Chức năng theo actor

### 5.1. User

- đăng nhập
- đổi mật khẩu
- đăng xuất

### 5.2. System Admin

- quản lý tài khoản người dùng
- phân quyền người dùng
- xem lịch sử hoạt động tài khoản

### 5.3. Manager

- thiết lập mức tồn kho an toàn cho từng vị trí lưu trữ
- quản lý tồn kho toàn hệ thống
- xem gợi ý nhập hàng cho kho tổng
- xem phiếu đề xuất nhập hàng từ các chi nhánh
- duyệt phiếu đề xuất nhập hàng
- tạo phiếu nhập hàng cho chi nhánh
- quản lý chi nhánh
- quản lý sản phẩm
- quản lý trạng thái bán online của sản phẩm
- quản lý tài khoản nhận tiền mua hàng
- xem dashboard, KPI, báo cáo

### 5.4. Sales Staff

- quét hoặc nhập barcode
- tìm kiếm sản phẩm
- áp dụng mã giảm giá
- tạo đơn hàng POS
- tạo phiếu đề xuất nhập hàng
- xem gợi ý nhập hàng tại chi nhánh
- đăng ký khách hàng thành viên mới
- tra cứu lịch sử mua hàng của khách
- xem thông tin khách hàng
- quản lý trạng thái bán tại chi nhánh
- tra cứu sản phẩm đang kinh doanh tại chi nhánh
- tra cứu tồn kho khả dụng để tư vấn khách hàng

### 5.5. Warehouse Staff

- tạo phiếu nhập kho
- tạo phiếu xuất kho từ kho tổng đến chi nhánh
- kiểm kho
- tạo phiếu điều chỉnh tồn kho chờ phê duyệt

### 5.6. Technical Staff

- tiếp nhận phiếu hỗ trợ
- quét serial để xác nhận thiết bị
- xem lịch sử bảo trì
- kiểm tra điều kiện đổi trả
- cập nhật trạng thái phiếu hỗ trợ
- phản hồi nội dung hỗ trợ cho khách hàng
- theo dõi lịch sử xử lý phiếu
- cập nhật lại đơn hàng trong trường hợp đổi trả

### 5.7. Customer

- cập nhật thông tin cá nhân
- quản lý giỏ hàng
- đặt hàng online
- xem thông tin sản phẩm
- tạo phiếu hỗ trợ gắn với serial hoặc order
- đánh giá sản phẩm
- theo dõi đơn hàng của mình
- hủy đơn hoặc yêu cầu trả hàng theo điều kiện hệ thống

## 6. Các nhóm module chính

### 6.1. Account and Security Group

- Auth
- User Management
- Role / Permission
- Activity Log

### 6.2. Organization Management Group

- Branch Management
- Warehouse Management
- Employee Management

### 6.3. Customer and Sales Group

- Customer Management
- POS Order
- Online Order
- Cart

### 6.4. Product Management Group

- Product Management
- Product Serial Management
- Product Online Status
- Promotion

### 6.5. Inventory and Warehouse Group

- Inventory
- Inventory Transaction
- Import Receipt
- Export Receipt
- Adjustment Ticket
- Stock Request
- Stock Transfer / Allocation

### 6.6. Technical Support Group

- Support Ticket
- Maintenance History
- Return / Exchange Handling

### 6.7. Operations and Reporting Group

- Payment Account Configuration
- Dashboard
- KPI / Report

### 6.8. AI Suggestion Group

- Branch Replenishment Suggestion
- Warehouse Replenishment Suggestion
- Transfer Suggestion

## 7. Module lõi bắt buộc triển khai trước

Đây là các module nên ưu tiên làm trước vì là lõi vận hành của hệ thống:

- Auth
- User Management
- Product Management
- Branch Management
- Warehouse Management
- Inventory
- Inventory Transaction
- Import Receipt
- Export Receipt / Transfer
- POS Order
- Online Order
- Cart
- Customer Management
- Stock Request
- AI Suggestion cơ bản

## 8. Module mở rộng triển khai sau

Các module này quan trọng nhưng có thể làm sau lớp lõi:

- Role / Permission chi tiết nhiều cấp
- Product Serial Management nâng cao
- Adjustment Ticket đầy đủ quy trình
- Support Ticket
- Maintenance History
- Return / Exchange Handling
- Payment Account Configuration đầy đủ
- Dashboard / KPI / Report nâng cao
- Product Online Status nâng cao
- Promotion nâng cao

## 9. Quy tắc nghiệp vụ chính

- mỗi đơn hàng chỉ thuộc một chi nhánh xử lý
- một khách hàng có thể có nhiều đơn ở nhiều chi nhánh khác nhau
- một sản phẩm có thể tồn tại tại nhiều vị trí lưu trữ khác nhau như kho tổng và các chi nhánh
- số lượng tồn kho được quản lý riêng theo từng vị trí lưu trữ
- không cho phép tồn kho âm
- không cho phép xóa sản phẩm khi vẫn còn tồn kho
- mỗi product serial chỉ có tối đa một phiếu hỗ trợ đang mở tại một thời điểm
- với sản phẩm không quản lý serial, phiếu hỗ trợ gắn với order hoặc order item
- System Admin không quản lý vận hành kho và bán hàng
- Manager không quản lý tài khoản đăng nhập hệ thống

## 10. Tiêu chí hoàn thành giai đoạn đầu

- có backend Spring Boot chạy ổn định theo module
- có frontend React JavaScript gọi API được
- có MySQL chạy bằng Docker
- dữ liệu tồn kho đúng, không âm
- mọi thay đổi tồn kho đi qua nghiệp vụ rõ ràng
- có thể demo được các luồng chính:
  - quản lý sản phẩm
  - quản lý chi nhánh
  - nhập kho
  - xuất / điều chuyển kho cơ bản
  - bán hàng tại quầy
  - đặt hàng online
  - đề xuất nhập hàng
  - xem gợi ý nhập / điều chuyển cơ bản

## 11. Chức năng chưa ưu tiên ở giai đoạn đầu

- thanh toán online thật
- chatbot khách hàng
- machine learning thật
- đồng bộ realtime phức tạp
- microservices
- quản lý nhà cung cấp đầy đủ
- công nợ nâng cao
- import / export file phức tạp
- báo cáo phân tích nâng cao
- phân quyền nhiều cấp quá chi tiết

## 12. Ghi chú triển khai

- Frontend: React JavaScript
- Backend: Spring Boot
- Database: MySQL chạy bằng Docker
- hệ thống ưu tiên đúng nghiệp vụ và dữ liệu trước khi tối ưu kỹ thuật
- các module được thiết kế theo hướng độc lập tương đối để dễ phát triển và mở rộng

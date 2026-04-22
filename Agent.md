# SmartVibe Agent Guide

Tài liệu này tổng hợp các kiến thức cốt lõi về kiến trúc, quy tắc lập trình và các lệnh quan trọng của dự án SmartVibe để hỗ trợ quá trình phát triển.

**Yêu cầu môi trường**: JDK 21, Maven 3.9+, Docker Desktop.

## 1. Kiến trúc Project (Project Architecture)

Hệ thống được xây dựng theo mô hình **Monolithic** chia module rõ ràng, giúp dễ bảo trì và mở rộng.

### Backend (Spring Boot)

- **Cấu trúc thư mục**: Theo module tại `backend/src/main/java/com/smartvibe/modules`.
- **Mô hình lớp**:
  - `Controller`: Tiếp nhận request, không chứa logic nghiệp vụ.
  - `Service`: Xử lý logic nghiệp vụ chính.
  - `Repository`: Truy cập và thao tác với cơ sở dữ liệu qua JPA.
  - `Entity`: Định nghĩa cấu trúc bảng dữ liệu.
  - `DTO`: Trao đổi dữ liệu giữa các lớp và với API.
- **Common**: Chứa cấu hình (`config`), xử lý lỗi (`exception`), phản hồi chuẩn (`response`), bảo mật (`security`) và tiện ích (`utils`).

### Frontend (React JavaScript)

- **Cấu trúc thư mục**: Theo module tại `frontend/src/modules`.
- **Thành phần chính**:
  - `components`: Các thành phần giao diện dùng chung.
  - `pages`: Các trang chính của hệ thống.
  - `services`: Các hàm gọi API.
  - `hooks`: Các custom hooks xử lý logic giao diện.

### Database (MySQL)

- Dữ liệu tập trung, quản lý qua **Docker Compose**.
- Thiết kế ưu tiên sự rõ ràng và tính toàn vẹn (khóa ngoại, tên cột rõ nghĩa).

---

## 2. Quy tắc lập trình (Code Convention)

Tuân thủ các quy tắc được định nghĩa trong [coding-rules.md](file:///d:/Workspace/Projects/SmartVibe/SmartVibe/docs/coding-rules.md):

### Backend Rules

- Không viết logic trong `Controller`.
- Mọi thao tác thay đổi dữ liệu phải thông qua `Service`.
- Tên hàm, biến theo chuẩn camelCase, rõ nghĩa.

### Frontend Rules

- Ưu tiên component đơn giản, dễ đọc.
- Tách biệt logic và giao diện khi cần thiết.
- Luôn xử lý trạng thái **Loading** và **Error** khi gọi API.

### Inventory Rules (Quan trọng)

- **Không cập nhật trực tiếp**: Mọi thay đổi tồn kho phải đi qua logic nghiệp vụ và ghi nhận giao dịch.
- **Không tồn kho âm**: Luôn kiểm tra số lượng khả dụng trước khi thực hiện các thao tác xuất/bán hàng.

---

## 3. Quy tắc quan trọng (Core Rules)

1. **Thứ tự ưu tiên phát triển**:
   - `Database chuẩn` -> `API hoạt động` -> `Frontend gọi được API` -> `Giao diện đủ dùng` -> `Tối ưu & Làm đẹp`.
2. **Nguyên tắc "Chạy được trước"**: Ưu tiên hoàn thiện luồng nghiệp vụ lõi (MVP) trước khi tối ưu hóa hiệu năng hoặc cấu trúc phức tạp.
3. **Phân quyền**: Tuân thủ các Actor (Admin, Manager, Staff, Customer) như đã định nghĩa trong [smartvibe-overview.md](file:///d:/Workspace/Projects/SmartVibe/SmartVibe/docs/smartvibe-overview.md).

---

## 4. Lệnh Build & Test (Build & Test Commands)

### Thiết lập môi trường (Environment Setup)

1. **Cài đặt JDK 21**: Khuyên dùng [Eclipse Temurin 21](https://adoptium.net/temurin/releases/?version=21).
2. **Cài đặt Maven**: Tải từ [Maven website](https://maven.apache.org/download.cgi) và thêm `bin` vào PATH.
3. **Cài đặt Extension Pack for Java** trong IDE.

### Cơ sở hạ tầng (Infrastructure)

Các script PowerShell nằm tại `infrastructure/scripts/`:

- **Khởi chạy Database**: `./infrastructure/scripts/dev-up.ps1` (Chạy `docker compose up -d`).
- **Dừng Database**: `./infrastructure/scripts/dev-down.ps1` (Chạy `docker compose down`).
- **Reset Database**: `./infrastructure/scripts/reset-db.ps1`.

### Backend (Maven)

- **Build dự án**: `mvn clean install` (hoặc `./mvnw clean install` nếu dùng wrapper)
- **Chạy ứng dụng**: `mvn spring-boot:run`
- **Chạy Tests**: `mvn test`

### Frontend (NPM - Dự kiến)

- **Cài đặt thư viện**: `npm install`
- **Chạy dev server**: `npm start`
- **Build sản phẩm**: `npm run build`

---

## 5. Tài liệu tham khảo nhanh

- [Tổng quan dự án](file:///d:/Workspace/Projects/SmartVibe/SmartVibe/docs/smartvibe-overview.md)
- [Danh sách Module](file:///d:/Workspace/Projects/SmartVibe/SmartVibe/docs/modules.md)
- [Phạm vi MVP](file:///d:/Workspace/Projects/SmartVibe/SmartVibe/docs/mvp-scope.md)
- [Quy tắc Coding](file:///d:/Workspace/Projects/SmartVibe/SmartVibe/docs/coding-rules.md)

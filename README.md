# SmartVibe 🏬⚡

SmartVibe là một ứng dụng web quản lý tập trung cho chuỗi cửa hàng bán đồ điện tử có nhiều chi nhánh và kho tổng. Hệ thống được thiết kế dành cho mô hình chuỗi cửa hàng nhằm theo dõi sản phẩm, tồn kho, và hỗ trợ hoạt động bán hàng trực tiếp (POS) lẫn trực tuyến (Online). Điểm đặc biệt của SmartVibe so với các ứng dụng khác là có hỗ trợ AI trong quá trình quản lý, AI sẽ hỗ trợ quản lý tồn kho, đề xuất nhập hàng, phân phối sản phẩm.

## 🎯 Mục tiêu dự án (MVP)

Dự án được xây dựng với các mục tiêu cốt lõi trong giai đoạn đầu:

- Quản lý tài khoản, phân quyền người dùng và quản trị tổ chức (chi nhánh, kho tổng, nhân viên).
- Quản lý sản phẩm, tồn kho theo từng vị trí lưu trữ khắt khe (không cho phép tồn kho âm).
- Xử lý các luồng nghiệp vụ kho: nhập kho, xuất kho, điều chỉnh tồn kho và điều chuyển hàng.
- Hỗ trợ bán hàng tại quầy (POS) và đặt hàng online.
- Tích hợp AI Suggestion cơ bản để gợi ý nhập/điều chuyển hàng hóa.

## 🛠️ Tech Stack

Dự án ưu tiên các công nghệ dễ cài đặt, dễ debug và phù hợp để phát triển Full-stack:

- **Frontend:** React JavaScript, HTML, CSS (chạy local).
- **Backend:** Spring Boot, Spring Web, Spring Data JPA (chạy local).
- **Database:** MySQL 8.0 (chạy bằng Docker Compose).

## 📁 Cấu trúc dự án

Dự án áp dụng kiến trúc Modular Monolith, chia module rõ ràng để dễ phát triển, bảo trì và mở rộng:

- `/frontend`: Chứa mã nguồn ReactJS.
- `/backend`: Chứa mã nguồn Spring Boot, phân lớp theo `controller`, `service`, `repository`, `entity`.
- `/infrastructure/docker`: Chứa cấu hình `docker-compose.yml` và script khởi tạo Database.
- `/docs`: Chứa tài liệu phân tích nghiệp vụ và yêu cầu hệ thống.

## 🚀 Hướng dẫn chạy dự án (Local Development)

### 1. Khởi động Database

Yêu cầu đã cài đặt Docker. Đi tới thư mục chứa docker-compose:

```bash
cd infrastructure/docker
docker-compose up -d
```

## 📈 GitHub Stats

![Your GitHub Stats](https://github-readme-stats.vercel.app/api?username=Nozs002&show_icons=true&theme=radical)
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=Nozs002&layout=compact&theme=tokyonight)

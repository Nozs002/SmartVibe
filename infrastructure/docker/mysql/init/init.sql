-- SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE smartvibe;
-- -- 2. Table: users (Chuẩn hóa naming và kiểu dữ liệu)
-- CREATE TABLE users (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     username VARCHAR(255) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     role ENUM('staff', 'customer', 'system admin'),
--     address VARCHAR(255),
--     birthday DATE,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     description TEXT,
--     avt_url VARCHAR(255),
--     personal_img VARCHAR(255),
--     phone VARCHAR(255) UNIQUE,
--     sex ENUM('male', 'female', 'other') NOT NULL,
--     identify_code VARCHAR(255),
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     account_status ENUM('active', 'inactive', 'banned') DEFAULT 'active'
-- );
-- -- 3. Table: branches (Đã sửa từ branchs)
-- CREATE TABLE branches (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     name VARCHAR(255) NOT NULL,
--     address VARCHAR(255) NOT NULL,
--     phone VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     operating_status ENUM('open', 'close', 'maintenance') NOT NULL,
--     number_of_staff INT NOT NULL DEFAULT 0,
--     capacity INT NOT NULL,
--     type ENUM('head_warehouse', 'retail_branch') NOT NULL
-- );
-- -- 4. Table: staffs
-- CREATE TABLE staffs (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     type ENUM('manager', 'sales', 'warehouse', 'technical') NOT NULL,
--     work_status ENUM('working', 'resigned', 'on_leave'),
--     description TEXT,
--     basic_salary DECIMAL(20, 2) NOT NULL,
--     allowance DECIMAL(20, 2),
--     bonus DECIMAL(20, 2),
--     deduction DECIMAL(20, 2),
--     user_id BIGINT UNIQUE,
--     branch_id BIGINT NOT NULL,
--     CONSTRAINT fk_staff_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_staff_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- -- 5. Table: customers
-- CREATE TABLE customers (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     type ENUM('normal', 'vip', 'gold', 'diamond') NOT NULL,
--     user_id BIGINT UNIQUE,
--     CONSTRAINT fk_customer_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- -- 6. Table: products
-- CREATE TABLE products (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     name VARCHAR(255) UNIQUE NOT NULL,
--     is_serialized BOOLEAN NOT NULL DEFAULT FALSE,
--     description TEXT,
--     supplier VARCHAR(255)
-- );
-- -- 7. Table: product_items (Đã sửa từ product_item)
-- CREATE TABLE product_items (
--     serial VARCHAR(255) PRIMARY KEY,
--     status ENUM('in stock', 'sold', 'defective') NOT NULL,
--     product_id BIGINT NOT NULL,
--     branch_id BIGINT NOT NULL,
--     CONSTRAINT fk_product_item_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_product_item_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- -- 8. Table: audit_logs
-- CREATE TABLE audit_logs (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     log_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     activity ENUM('log_in', 'log_out', 'change_info') NOT NULL,
--     user_id BIGINT NOT NULL,
--     CONSTRAINT fk_audit_logs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- -- 9. Table: orders
-- CREATE TABLE orders (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     type ENUM('POS', 'online') NOT NULL,
--     note TEXT,
--     delivery_location VARCHAR(255),
--     phone VARCHAR(255),
--     order_status ENUM('pending', 'confirmed', 'completed', 'cancelled') NOT NULL,
--     delivery_status ENUM('not shipped', 'shipping', 'delivered', 'failed') NOT NULL,
--     account_payment VARCHAR(255),
--     payment_method ENUM('bank', 'cash') NOT NULL,
--     payment_status ENUM('unpaid', 'paid', 'refunded') NOT NULL,
--     discount_percent DECIMAL(20, 2),
--     staff_id BIGINT NOT NULL,
--     customer_id BIGINT NOT NULL,
--     shipper_id BIGINT,
--     branch_id BIGINT NOT NULL,
--     CONSTRAINT fk_order_staff FOREIGN KEY (staff_id) REFERENCES staffs(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_order_shipper FOREIGN KEY (shipper_id) REFERENCES shippers(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_order_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- -- 10. Table: order_details
-- CREATE TABLE order_details (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     quantity INT NOT NULL,
--     price DECIMAL(20, 2),
--     order_id BIGINT NOT NULL,
--     product_id BIGINT,
--     product_serial VARCHAR(255) UNIQUE,
--     CONSTRAINT fk_order_details_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_order_details_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_order_details_serial FOREIGN KEY (product_serial) REFERENCES product_items(serial) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- -- 11. Table: support_tickets (Đã sửa từ support_ticket)
-- CREATE TABLE support_tickets (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     status ENUM('pending', 'in progress', 'resolved', 'closed') NOT NULL,
--     description TEXT,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     customer_id BIGINT NOT NULL,
--     product_serial VARCHAR(255),
--     staff_id BIGINT,
--     order_detail_id BIGINT,
--     CONSTRAINT fk_support_ticket_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_support_ticket_serial FOREIGN KEY (product_serial) REFERENCES product_items(serial) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_support_ticket_staff FOREIGN KEY (staff_id) REFERENCES staffs(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_support_ticket_order_detail FOREIGN KEY (order_detail_id) REFERENCES order_details(id) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- -- 12. Table: stock_documents (Đã sửa từ stock_document)
-- CREATE TABLE stock_documents (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     supplier VARCHAR(255),
--     status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     type ENUM('import', 'export') NOT NULL,
--     branch_id BIGINT NOT NULL,
--     staff_id BIGINT NOT NULL,
--     CONSTRAINT fk_stock_document_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_stock_document_staff FOREIGN KEY (staff_id) REFERENCES staffs(id) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- -- 13. Table: stock_document_details
-- CREATE TABLE stock_document_details (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     quantity INT NOT NULL,
--     price DECIMAL(20, 2) NOT NULL,
--     product_id BIGINT NOT NULL,
--     document_id BIGINT NOT NULL,
--     CONSTRAINT fk_doc_details_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_doc_details_document FOREIGN KEY (document_id) REFERENCES stock_documents(id) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- -- 14. Table: adjustment_tickets (Đã sửa từ adjustment_ticket)
-- CREATE TABLE adjustment_tickets (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     status ENUM('pending', 'in progress', 'resolved', 'closed') DEFAULT 'pending',
--     description TEXT,
--     staff_id BIGINT NOT NULL,
--     branch_id BIGINT NOT NULL,
--     CONSTRAINT fk_adjustment_ticket_staff FOREIGN KEY (staff_id) REFERENCES staffs(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_adjustment_ticket_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- -- 15. Table: stock_transfers (Đã sửa từ stock_transfer)
-- CREATE TABLE stock_transfers (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     status ENUM('pending', 'shipping', 'completed', 'cancelled') DEFAULT 'pending',
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     completed_at DATETIME,
--     from_branch_id BIGINT NOT NULL,
--     to_branch_id BIGINT NOT NULL,
--     CONSTRAINT fk_transfer_from_branch FOREIGN KEY (from_branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_transfer_to_branch FOREIGN KEY (to_branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- -- 16. Table: stock_transfer_details
-- CREATE TABLE stock_transfer_details (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     quantity INT NOT NULL,
--     transfer_id BIGINT NOT NULL,
--     product_id BIGINT NOT NULL,
--     CONSTRAINT fk_transfer_details_transfer FOREIGN KEY (transfer_id) REFERENCES stock_transfers(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_transfer_details_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- -- 17. Table: inventories (Đã sửa từ Inventory)
-- CREATE TABLE inventories (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     quantity_available INT NOT NULL DEFAULT 0,
--     branch_id BIGINT NOT NULL,
--     product_id BIGINT NOT NULL,
--     CONSTRAINT fk_inventory_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE NO ACTION ON UPDATE CASCADE,
--     CONSTRAINT unique_inventory UNIQUE(branch_id, product_id)
-- );
-- -- 18. Table: inventory_transactions (Đã sửa từ Inventory_transaction)
-- CREATE TABLE inventory_transactions (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     transaction_type ENUM(
--         'import',
--         'export',
--         'transfer in',
--         'transfer out',
--         'sale',
--         'return',
--         'adjustment'
--     ) NOT NULL,
--     quantity_changed INT NOT NULL,
--     reference_type ENUM(
--         'document',
--         'stock transfer',
--         'adjustment',
--         'order'
--     ),
--     reference_id BIGINT NOT NULL,
--     inventory_id BIGINT NOT NULL,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     CONSTRAINT fk_transaction_inventory FOREIGN KEY (inventory_id) REFERENCES inventories(id) ON DELETE NO ACTION ON UPDATE CASCADE
-- );
-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql:3306
-- Thời gian đã tạo: Th5 14, 2026 lúc 04:02 PM
-- Phiên bản máy phục vụ: 8.0.45
-- Phiên bản PHP: 8.3.26
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Cơ sở dữ liệu: `smartvibe`
--
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `adjustment_tickets`
--
CREATE TABLE `adjustment_tickets` (
    `id` bigint NOT NULL,
    `status` enum('pending', 'in progress', 'resolved', 'closed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
    `description` text COLLATE utf8mb4_unicode_ci,
    `staff_id` bigint NOT NULL,
    `branch_id` bigint NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `adjustment_tickets`
--
INSERT INTO `adjustment_tickets` (
        `id`,
        `status`,
        `description`,
        `staff_id`,
        `branch_id`
    )
VALUES (1, 'resolved', 'Chenh lech do kiem kho', 1, 1),
    (
        2,
        'pending',
        'Thieu hang chua ro nguyen nhan',
        2,
        2
    ),
    (
        3,
        'in progress',
        'Hang hu hong do van chuyen',
        5,
        3
    ),
    (4, 'closed', 'Dieu chinh do cap nhat sai', 5, 4),
    (5, 'resolved', 'Du hang sau kiem ke', 7, 5),
    (6, 'pending', 'Cho quan ly xac nhan', 6, 6),
    (
        7,
        'in progress',
        'Chenh lech ton kho he thong',
        7,
        7
    ),
    (8, 'closed', 'Hang huy do het han', 8, 8),
    (9, 'resolved', 'Cap nhat lai ma hang', 9, 9),
    (
        10,
        'pending',
        'Kiem tra lai dot nhap hang',
        10,
        10
    );
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `audit_logs`
--
CREATE TABLE `audit_logs` (
    `id` bigint NOT NULL,
    `log_date` datetime DEFAULT CURRENT_TIMESTAMP,
    `activity` enum('log_in', 'log_out', 'change_info') COLLATE utf8mb4_unicode_ci NOT NULL,
    `user_id` bigint NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `branches`
--
CREATE TABLE `branches` (
    `id` bigint NOT NULL,
    `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `operating_status` enum('open', 'close', 'maintenance') COLLATE utf8mb4_unicode_ci NOT NULL,
    `number_of_staff` int NOT NULL DEFAULT '0',
    `capacity` int NOT NULL,
    `type` enum('head_warehouse', 'retail_branch') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `branches`
--
INSERT INTO `branches` (
        `id`,
        `name`,
        `address`,
        `phone`,
        `email`,
        `operating_status`,
        `number_of_staff`,
        `capacity`,
        `type`
    )
VALUES (
        1,
        'Kho Tong Mien Bac',
        'Ha Noi',
        '0241111111',
        'khomb@smartvibe.vn',
        'open',
        50,
        10000,
        'head_warehouse'
    ),
    (
        2,
        'Kho Tong Mien Nam',
        'TP HCM',
        '0281111111',
        'khomn@smartvibe.vn',
        'open',
        60,
        15000,
        'head_warehouse'
    ),
    (
        3,
        'Chi Nhanh Cau Giay',
        'Cau Giay, Ha Noi',
        '0242222222',
        'caugiay@smartvibe.vn',
        'open',
        15,
        500,
        'retail_branch'
    ),
    (
        4,
        'Chi Nhanh Dong Da',
        'Dong Da, Ha Noi',
        '0243333333',
        'dongda@smartvibe.vn',
        'open',
        10,
        300,
        'retail_branch'
    ),
    (
        5,
        'Chi Nhanh Quan 1',
        'Quan 1, TP HCM',
        '0282222222',
        'quan1@smartvibe.vn',
        'open',
        20,
        800,
        'retail_branch'
    ),
    (
        6,
        'Chi Nhanh Quan 3',
        'Quan 3, TP HCM',
        '0283333333',
        'quan3@smartvibe.vn',
        'maintenance',
        12,
        400,
        'retail_branch'
    ),
    (
        7,
        'Chi Nhanh Da Nang',
        'Hai Chau, Da Nang',
        '02336111111',
        'danang@smartvibe.vn',
        'open',
        15,
        600,
        'retail_branch'
    ),
    (
        8,
        'Chi Nhanh Can Tho',
        'Ninh Kieu, Can Tho',
        '0292111111',
        'cantho@smartvibe.vn',
        'open',
        10,
        300,
        'retail_branch'
    ),
    (
        9,
        'Chi Nhanh Hai Phong',
        'Le Chan, Hai Phong',
        '0225111111',
        'haiphong@smartvibe.vn',
        'close',
        8,
        200,
        'retail_branch'
    ),
    (
        10,
        'Chi Nhanh Hue',
        'Phu Nhuan, Hue',
        '0234111111',
        'hue@smartvibe.vn',
        'open',
        9,
        250,
        'retail_branch'
    );
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `brands`
--
CREATE TABLE `brands` (
    `id` bigint NOT NULL,
    `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `logo_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `categories`
--
CREATE TABLE `categories` (
    `id` bigint NOT NULL,
    `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `parent_id` bigint DEFAULT NULL COMMENT 'Dùng cho danh mục con',
    `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `customers`
--
CREATE TABLE `customers` (
    `id` bigint NOT NULL,
    `type` enum('normal', 'vip', 'gold', 'diamond') COLLATE utf8mb4_unicode_ci NOT NULL,
    `user_id` bigint DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `customers`
--
INSERT INTO `customers` (`id`, `type`, `user_id`)
VALUES (1, 'vip', 11),
    (2, 'normal', 12),
    (3, 'gold', 13),
    (4, 'diamond', 14),
    (5, 'normal', 15),
    (6, 'vip', 16),
    (7, 'gold', 17),
    (8, 'normal', 18),
    (9, 'diamond', 19),
    (10, 'normal', 20);
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `inventories`
--
CREATE TABLE `inventories` (
    `id` bigint NOT NULL,
    `quantity_available` int NOT NULL DEFAULT '0',
    `branch_id` bigint NOT NULL,
    `product_id` bigint NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `inventories`
--
INSERT INTO `inventories` (
        `id`,
        `quantity_available`,
        `branch_id`,
        `product_id`
    )
VALUES (1, 100, 1, 1),
    (2, 50, 2, 2),
    (3, 30, 3, 3),
    (4, 25, 4, 4),
    (5, 40, 5, 5),
    (6, 15, 6, 6),
    (7, 60, 7, 7),
    (8, 10, 8, 8),
    (9, 80, 9, 9),
    (10, 120, 10, 10);
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `inventory_transactions`
--
CREATE TABLE `inventory_transactions` (
    `id` bigint NOT NULL,
    `transaction_type` enum(
        'import',
        'export',
        'transfer in',
        'transfer out',
        'sale',
        'return',
        'adjustment'
    ) COLLATE utf8mb4_unicode_ci NOT NULL,
    `quantity_changed` int NOT NULL,
    `reference_type` enum('document', 'stock transfer', 'adjustment', 'order') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `reference_id` bigint NOT NULL,
    `inventory_id` bigint NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `inventory_transactions`
--
INSERT INTO `inventory_transactions` (
        `id`,
        `transaction_type`,
        `quantity_changed`,
        `reference_type`,
        `reference_id`,
        `inventory_id`,
        `created_at`
    )
VALUES (
        1,
        'import',
        50,
        'document',
        1,
        1,
        '2026-04-23 09:47:47'
    ),
    (
        2,
        'export',
        -10,
        'stock transfer',
        1,
        1,
        '2026-04-23 09:47:47'
    ),
    (
        3,
        'sale',
        -1,
        'order',
        1,
        1,
        '2026-04-23 09:47:47'
    ),
    (
        4,
        'import',
        30,
        'document',
        2,
        2,
        '2026-04-23 09:47:47'
    ),
    (
        5,
        'transfer in',
        10,
        'stock transfer',
        1,
        3,
        '2026-04-23 09:47:47'
    ),
    (
        6,
        'adjustment',
        -2,
        'adjustment',
        3,
        4,
        '2026-04-23 09:47:47'
    ),
    (
        7,
        'sale',
        -1,
        'order',
        2,
        5,
        '2026-04-23 09:47:47'
    ),
    (
        8,
        'transfer out',
        -5,
        'stock transfer',
        10,
        5,
        '2026-04-23 09:47:47'
    ),
    (
        9,
        'return',
        1,
        'order',
        6,
        6,
        '2026-04-23 09:47:47'
    ),
    (
        10,
        'import',
        100,
        'document',
        10,
        10,
        '2026-04-23 09:47:47'
    );
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `orders`
--
CREATE TABLE `orders` (
    `id` bigint NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `type` enum('POS', 'online') COLLATE utf8mb4_unicode_ci NOT NULL,
    `note` text COLLATE utf8mb4_unicode_ci,
    `delivery_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `order_status` enum('pending', 'confirmed', 'completed', 'cancelled') COLLATE utf8mb4_unicode_ci NOT NULL,
    `delivery_status` enum('not shipped', 'shipping', 'delivered', 'failed') COLLATE utf8mb4_unicode_ci NOT NULL,
    `account_payment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `payment_method` enum('bank', 'cash') COLLATE utf8mb4_unicode_ci NOT NULL,
    `payment_status` enum('unpaid', 'paid', 'refunded') COLLATE utf8mb4_unicode_ci NOT NULL,
    `discount_percent` decimal(20, 2) DEFAULT NULL,
    `staff_id` bigint NOT NULL,
    `customer_id` bigint NOT NULL,
    `branch_id` bigint NOT NULL,
    `shipping_provider` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'VD: GHTK, GHN, ViettelPost',
    `tracking_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Mã vận đơn',
    `shipping_fee` decimal(20, 2) DEFAULT '0.00' COMMENT 'Phí giao hàng'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `orders`
--
INSERT INTO `orders` (
        `id`,
        `created_at`,
        `type`,
        `note`,
        `delivery_location`,
        `phone`,
        `order_status`,
        `delivery_status`,
        `account_payment`,
        `payment_method`,
        `payment_status`,
        `discount_percent`,
        `staff_id`,
        `customer_id`,
        `branch_id`,
        `shipping_provider`,
        `tracking_code`,
        `shipping_fee`
    )
VALUES (
        1,
        '2026-04-23 09:47:47',
        'online',
        'Giao buoi sang',
        'Ha Noi',
        '0701111111',
        'completed',
        'delivered',
        'ACC001',
        'bank',
        'paid',
        5.00,
        3,
        1,
        3,
        NULL,
        NULL,
        0.00
    ),
    (
        2,
        '2026-04-23 09:47:47',
        'POS',
        NULL,
        'Tai cua hang',
        '0701111112',
        'completed',
        'delivered',
        NULL,
        'cash',
        'paid',
        0.00,
        5,
        2,
        5,
        NULL,
        NULL,
        0.00
    ),
    (
        3,
        '2026-04-23 09:47:47',
        'online',
        'Goi truoc khi giao',
        'Da Nang',
        '0701111113',
        'pending',
        'not shipped',
        NULL,
        'cash',
        'unpaid',
        10.00,
        7,
        3,
        7,
        NULL,
        NULL,
        0.00
    ),
    (
        4,
        '2026-04-23 09:47:47',
        'online',
        NULL,
        'Can Tho',
        '0701111114',
        'confirmed',
        'shipping',
        'ACC002',
        'bank',
        'paid',
        15.00,
        9,
        4,
        9,
        NULL,
        NULL,
        0.00
    ),
    (
        5,
        '2026-04-23 09:47:47',
        'POS',
        'Khach quen',
        'Tai cua hang',
        '0701111115',
        'completed',
        'delivered',
        NULL,
        'cash',
        'paid',
        0.00,
        3,
        5,
        3,
        NULL,
        NULL,
        0.00
    ),
    (
        6,
        '2026-04-23 09:47:47',
        'online',
        NULL,
        'Ha Noi',
        '0701111116',
        'cancelled',
        'failed',
        NULL,
        'bank',
        'refunded',
        0.00,
        5,
        6,
        5,
        NULL,
        NULL,
        0.00
    ),
    (
        7,
        '2026-04-23 09:47:47',
        'POS',
        NULL,
        'Tai cua hang',
        '0701111117',
        'completed',
        'delivered',
        'ACC003',
        'bank',
        'paid',
        5.00,
        7,
        7,
        7,
        NULL,
        NULL,
        0.00
    ),
    (
        8,
        '2026-04-23 09:47:47',
        'online',
        'Giao hang gio hanh chinh',
        'Da Nang',
        '0701111118',
        'pending',
        'not shipped',
        NULL,
        'cash',
        'unpaid',
        0.00,
        9,
        8,
        9,
        NULL,
        NULL,
        0.00
    ),
    (
        9,
        '2026-04-23 09:47:47',
        'online',
        NULL,
        'Can Tho',
        '0701111119',
        'completed',
        'delivered',
        'ACC004',
        'bank',
        'paid',
        20.00,
        3,
        9,
        3,
        NULL,
        NULL,
        0.00
    ),
    (
        10,
        '2026-04-23 09:47:47',
        'POS',
        NULL,
        'Tai cua hang',
        '0701111120',
        'completed',
        'delivered',
        NULL,
        'cash',
        'paid',
        0.00,
        5,
        10,
        5,
        NULL,
        NULL,
        0.00
    );
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `order_details`
--
CREATE TABLE `order_details` (
    `id` bigint NOT NULL,
    `quantity` int NOT NULL,
    `price` decimal(20, 2) DEFAULT NULL,
    `order_id` bigint NOT NULL,
    `product_id` bigint DEFAULT NULL,
    `product_serial` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `order_details`
--
INSERT INTO `order_details` (
        `id`,
        `quantity`,
        `price`,
        `order_id`,
        `product_id`,
        `product_serial`
    )
VALUES (1, 1, 30000000.00, 1, 1, 'SN-DELL-001'),
    (2, 1, 35000000.00, 2, 2, 'SN-MAC-001'),
    (3, 2, 2000000.00, 3, 3, 'SN-KEY-001'),
    (4, 1, 2500000.00, 4, 4, 'SN-LOG-001'),
    (5, 1, 10000000.00, 5, 5, 'SN-LG-001'),
    (6, 1, 8000000.00, 6, 6, 'SN-SONY-001'),
    (7, 3, 1500000.00, 7, 7, 'SN-IKEA-001'),
    (8, 1, 40000000.00, 8, 8, 'SN-HERM-001'),
    (9, 2, 2500000.00, 9, 9, 'SN-SAM-001'),
    (10, 4, 1500000.00, 10, 10, 'SN-COR-001');
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `products`
--
CREATE TABLE `products` (
    `id` bigint NOT NULL,
    `sku` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `category_id` bigint DEFAULT NULL,
    `brand_id` bigint DEFAULT NULL,
    `is_serialized` tinyint(1) NOT NULL DEFAULT '0',
    `description` text COLLATE utf8mb4_unicode_ci,
    `base_price` decimal(20, 2) NOT NULL DEFAULT '0.00' COMMENT 'Giá bán lẻ niêm yết',
    `warranty_months` int NOT NULL DEFAULT '12' COMMENT 'Số tháng bảo hành',
    `specifications` json DEFAULT NULL COMMENT 'Thông số kỹ thuật: RAM, CPU, Pin...',
    `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Ảnh đại diện',
    `status` enum('active', 'inactive', 'discontinued') COLLATE utf8mb4_unicode_ci DEFAULT 'active' COMMENT 'Trạng thái kinh doanh'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `products`
--
INSERT INTO `products` (
        `id`,
        `sku`,
        `name`,
        `category_id`,
        `brand_id`,
        `is_serialized`,
        `description`,
        `base_price`,
        `warranty_months`,
        `specifications`,
        `thumbnail`,
        `status`
    )
VALUES (
        1,
        'SKU-1',
        'Laptop Dell XPS 15',
        NULL,
        NULL,
        1,
        'Laptop cao cap',
        0.00,
        12,
        NULL,
        NULL,
        'active'
    ),
    (
        2,
        'SKU-2',
        'MacBook Pro M2',
        NULL,
        NULL,
        1,
        'Apple Laptop',
        0.00,
        12,
        NULL,
        NULL,
        'active'
    ),
    (
        3,
        'SKU-3',
        'Ban Phim Co Keychron',
        NULL,
        NULL,
        0,
        'Ban phim co khong day',
        0.00,
        12,
        NULL,
        NULL,
        'active'
    ),
    (
        4,
        'SKU-4',
        'Chuot Logitech MX Master 3',
        NULL,
        NULL,
        0,
        'Chuot van phong cao cap',
        0.00,
        12,
        NULL,
        NULL,
        'active'
    ),
    (
        5,
        'SKU-5',
        'Man Hinh LG 27 inch',
        NULL,
        NULL,
        1,
        'Man hinh 4K',
        0.00,
        12,
        NULL,
        NULL,
        'active'
    ),
    (
        6,
        'SKU-6',
        'Tai nghe Sony WH-1000XM5',
        NULL,
        NULL,
        1,
        'Tai nghe chong on',
        0.00,
        12,
        NULL,
        NULL,
        'active'
    ),
    (
        7,
        'SKU-7',
        'Ban lam viec IKEA',
        NULL,
        NULL,
        0,
        'Ban go cong nghiep',
        0.00,
        12,
        NULL,
        NULL,
        'active'
    ),
    (
        8,
        'SKU-8',
        'Ghe Cong Thai Hoc Herman Miller',
        NULL,
        NULL,
        0,
        'Ghe cao cap',
        0.00,
        12,
        NULL,
        NULL,
        'active'
    ),
    (
        9,
        'SKU-9',
        'O cung SSD Samsung 1TB',
        NULL,
        NULL,
        1,
        'SSD NVMe',
        0.00,
        12,
        NULL,
        NULL,
        'active'
    ),
    (
        10,
        'SKU-10',
        'Ram Corsair 16GB',
        NULL,
        NULL,
        1,
        'Ram DDR4',
        0.00,
        12,
        NULL,
        NULL,
        'active'
    );
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `product_images`
--
CREATE TABLE `product_images` (
    `id` bigint NOT NULL,
    `product_id` bigint NOT NULL,
    `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `display_order` int DEFAULT '0' COMMENT 'Thứ tự hiển thị'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `product_items`
--
CREATE TABLE `product_items` (
    `serial` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `status` enum('in stock', 'sold', 'defective') COLLATE utf8mb4_unicode_ci NOT NULL,
    `product_id` bigint NOT NULL,
    `branch_id` bigint NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `product_items`
--
INSERT INTO `product_items` (`serial`, `status`, `product_id`, `branch_id`)
VALUES ('SN-COR-001', 'in stock', 10, 10),
    ('SN-DELL-001', 'in stock', 1, 1),
    ('SN-HERM-001', 'in stock', 8, 8),
    ('SN-IKEA-001', 'in stock', 7, 7),
    ('SN-KEY-001', 'in stock', 3, 3),
    ('SN-LG-001', 'in stock', 5, 5),
    ('SN-LOG-001', 'defective', 4, 4),
    ('SN-MAC-001', 'sold', 2, 2),
    ('SN-SAM-001', 'sold', 9, 9),
    ('SN-SONY-001', 'sold', 6, 6);
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `staffs`
--
CREATE TABLE `staffs` (
    `id` bigint NOT NULL,
    `type` enum('manager', 'sales', 'warehouse', 'technical') COLLATE utf8mb4_unicode_ci NOT NULL,
    `work_status` enum('working', 'resigned', 'on_leave') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `description` text COLLATE utf8mb4_unicode_ci,
    `basic_salary` decimal(20, 2) NOT NULL,
    `allowance` decimal(20, 2) DEFAULT NULL,
    `bonus` decimal(20, 2) DEFAULT NULL,
    `deduction` decimal(20, 2) DEFAULT NULL,
    `user_id` bigint DEFAULT NULL,
    `branch_id` bigint NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `staffs`
--
INSERT INTO `staffs` (
        `id`,
        `type`,
        `work_status`,
        `description`,
        `basic_salary`,
        `allowance`,
        `bonus`,
        `deduction`,
        `user_id`,
        `branch_id`
    )
VALUES (
        1,
        'manager',
        'working',
        'Quan ly kho',
        15000000.00,
        2000000.00,
        500000.00,
        0.00,
        NULL,
        1
    ),
    (
        2,
        'warehouse',
        'working',
        'Thu kho',
        8000000.00,
        500000.00,
        200000.00,
        0.00,
        NULL,
        2
    ),
    (
        3,
        'sales',
        'working',
        'Nhan vien ban hang',
        7000000.00,
        500000.00,
        1000000.00,
        0.00,
        NULL,
        3
    ),
    (
        4,
        'technical',
        'resigned',
        'Ky thuat vien',
        10000000.00,
        1000000.00,
        0.00,
        0.00,
        NULL,
        4
    ),
    (
        5,
        'manager',
        'working',
        'Cua hang truong',
        12000000.00,
        1500000.00,
        500000.00,
        100000.00,
        NULL,
        5
    ),
    (
        6,
        'warehouse',
        'on_leave',
        'Nhan vien kho',
        7500000.00,
        500000.00,
        0.00,
        0.00,
        NULL,
        6
    ),
    (
        7,
        'sales',
        'working',
        'Nhan vien ban hang',
        7000000.00,
        500000.00,
        800000.00,
        0.00,
        NULL,
        7
    ),
    (
        8,
        'technical',
        'working',
        'Ky thuat vien',
        10000000.00,
        1000000.00,
        500000.00,
        0.00,
        NULL,
        8
    ),
    (
        9,
        'sales',
        'working',
        'Nhan vien ban hang',
        7000000.00,
        500000.00,
        1500000.00,
        0.00,
        NULL,
        9
    ),
    (
        10,
        'manager',
        'working',
        'Cua hang truong',
        12000000.00,
        1500000.00,
        1000000.00,
        0.00,
        NULL,
        10
    );
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `stock_documents`
--
CREATE TABLE `stock_documents` (
    `id` bigint NOT NULL,
    `supplier_id` bigint DEFAULT NULL,
    `status` enum('pending', 'completed', 'cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `type` enum('import', 'export') COLLATE utf8mb4_unicode_ci NOT NULL,
    `branch_id` bigint NOT NULL,
    `staff_id` bigint NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `stock_documents`
--
INSERT INTO `stock_documents` (
        `id`,
        `supplier_id`,
        `status`,
        `created_at`,
        `type`,
        `branch_id`,
        `staff_id`
    )
VALUES (
        1,
        NULL,
        'completed',
        '2026-04-23 09:47:47',
        'import',
        1,
        1
    ),
    (
        2,
        NULL,
        'pending',
        '2026-04-23 09:47:47',
        'import',
        2,
        2
    ),
    (
        3,
        NULL,
        'completed',
        '2026-04-23 09:47:47',
        'export',
        1,
        1
    ),
    (
        4,
        NULL,
        'completed',
        '2026-04-23 09:47:47',
        'import',
        3,
        5
    ),
    (
        5,
        NULL,
        'cancelled',
        '2026-04-23 09:47:47',
        'export',
        2,
        2
    ),
    (
        6,
        NULL,
        'completed',
        '2026-04-23 09:47:47',
        'import',
        5,
        5
    ),
    (
        7,
        NULL,
        'pending',
        '2026-04-23 09:47:47',
        'import',
        7,
        7
    ),
    (
        8,
        NULL,
        'completed',
        '2026-04-23 09:47:47',
        'import',
        9,
        9
    ),
    (
        9,
        NULL,
        'completed',
        '2026-04-23 09:47:47',
        'export',
        1,
        1
    ),
    (
        10,
        NULL,
        'completed',
        '2026-04-23 09:47:47',
        'import',
        10,
        10
    );
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `stock_document_details`
--
CREATE TABLE `stock_document_details` (
    `id` bigint NOT NULL,
    `quantity` int NOT NULL,
    `price` decimal(20, 2) NOT NULL,
    `product_id` bigint NOT NULL,
    `document_id` bigint NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `stock_document_details`
--
INSERT INTO `stock_document_details` (
        `id`,
        `quantity`,
        `price`,
        `product_id`,
        `document_id`
    )
VALUES (1, 50, 25000000.00, 1, 1),
    (2, 30, 30000000.00, 2, 2),
    (3, 10, 25000000.00, 1, 3),
    (4, 100, 1500000.00, 4, 4),
    (5, 20, 30000000.00, 2, 5),
    (6, 50, 6000000.00, 6, 6),
    (7, 20, 1000000.00, 7, 7),
    (8, 10, 30000000.00, 8, 8),
    (9, 5, 25000000.00, 9, 9),
    (10, 100, 1000000.00, 10, 10);
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `stock_transfers`
--
CREATE TABLE `stock_transfers` (
    `id` bigint NOT NULL,
    `status` enum('pending', 'shipping', 'completed', 'cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `completed_at` datetime DEFAULT NULL,
    `from_branch_id` bigint NOT NULL,
    `to_branch_id` bigint NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `stock_transfers`
--
INSERT INTO `stock_transfers` (
        `id`,
        `status`,
        `created_at`,
        `completed_at`,
        `from_branch_id`,
        `to_branch_id`
    )
VALUES (
        1,
        'completed',
        '2026-04-23 09:47:47',
        NULL,
        1,
        3
    ),
    (2, 'shipping', '2026-04-23 09:47:47', NULL, 2, 5),
    (3, 'pending', '2026-04-23 09:47:47', NULL, 1, 4),
    (
        4,
        'completed',
        '2026-04-23 09:47:47',
        NULL,
        2,
        6
    ),
    (
        5,
        'cancelled',
        '2026-04-23 09:47:47',
        NULL,
        1,
        7
    ),
    (
        6,
        'completed',
        '2026-04-23 09:47:47',
        NULL,
        1,
        8
    ),
    (7, 'shipping', '2026-04-23 09:47:47', NULL, 2, 9),
    (8, 'pending', '2026-04-23 09:47:47', NULL, 2, 10),
    (
        9,
        'completed',
        '2026-04-23 09:47:47',
        NULL,
        3,
        4
    ),
    (
        10,
        'completed',
        '2026-04-23 09:47:47',
        NULL,
        5,
        6
    );
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `stock_transfer_details`
--
CREATE TABLE `stock_transfer_details` (
    `id` bigint NOT NULL,
    `quantity` int NOT NULL,
    `transfer_id` bigint NOT NULL,
    `product_id` bigint NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `stock_transfer_details`
--
INSERT INTO `stock_transfer_details` (`id`, `quantity`, `transfer_id`, `product_id`)
VALUES (1, 10, 1, 1),
    (2, 5, 2, 2),
    (3, 20, 3, 3),
    (4, 15, 4, 4),
    (5, 10, 5, 5),
    (6, 8, 6, 6),
    (7, 12, 7, 7),
    (8, 5, 8, 8),
    (9, 20, 9, 9),
    (10, 50, 10, 10);
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `suppliers`
--
CREATE TABLE `suppliers` (
    `id` bigint NOT NULL,
    `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `contact_person` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `support_tickets`
--
CREATE TABLE `support_tickets` (
    `id` bigint NOT NULL,
    `status` enum('pending', 'in progress', 'resolved', 'closed') COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` text COLLATE utf8mb4_unicode_ci,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `customer_id` bigint NOT NULL,
    `product_serial` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `staff_id` bigint DEFAULT NULL,
    `order_detail_id` bigint DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `support_tickets`
--
INSERT INTO `support_tickets` (
        `id`,
        `status`,
        `description`,
        `created_at`,
        `customer_id`,
        `product_serial`,
        `staff_id`,
        `order_detail_id`
    )
VALUES (
        1,
        'resolved',
        'Loi man hinh da duoc thay the',
        '2026-04-23 09:47:47',
        1,
        'SN-DELL-001',
        4,
        1
    ),
    (
        2,
        'in progress',
        'Pin tut nhanh',
        '2026-04-23 09:47:47',
        2,
        'SN-MAC-001',
        8,
        2
    ),
    (
        3,
        'pending',
        'Loi ket noi bluetooth',
        '2026-04-23 09:47:47',
        3,
        'SN-KEY-001',
        NULL,
        3
    ),
    (
        4,
        'closed',
        'Chuot bi double click, da doi moi',
        '2026-04-23 09:47:47',
        4,
        'SN-LOG-001',
        4,
        4
    ),
    (
        5,
        'resolved',
        'Ho tro lap dat',
        '2026-04-23 09:47:47',
        5,
        'SN-LG-001',
        8,
        5
    ),
    (
        6,
        'pending',
        'Tai nghe bi re',
        '2026-04-23 09:47:47',
        6,
        'SN-SONY-001',
        NULL,
        6
    ),
    (
        7,
        'resolved',
        'Thieu oc vit da bo sung',
        '2026-04-23 09:47:47',
        7,
        'SN-IKEA-001',
        4,
        7
    ),
    (
        8,
        'in progress',
        'Ghe keu cot ket',
        '2026-04-23 09:47:47',
        8,
        'SN-HERM-001',
        8,
        8
    ),
    (
        9,
        'closed',
        'Khong nhan o cung, da bao hanh',
        '2026-04-23 09:47:47',
        9,
        'SN-SAM-001',
        4,
        9
    ),
    (
        10,
        'pending',
        'Ram khong dung bus',
        '2026-04-23 09:47:47',
        10,
        'SN-COR-001',
        NULL,
        10
    );
-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `users`
--
CREATE TABLE `users` (
    `id` bigint NOT NULL,
    `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `role` enum('staff', 'customer', 'system admin') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `birthday` date DEFAULT NULL,
    `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` text COLLATE utf8mb4_unicode_ci,
    `avt_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `personal_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `sex` enum('male', 'female', 'other') COLLATE utf8mb4_unicode_ci NOT NULL,
    `identify_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `account_status` enum('active', 'inactive', 'banned') COLLATE utf8mb4_unicode_ci DEFAULT 'active'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Đang đổ dữ liệu cho bảng `users`
--
INSERT INTO `users` (
        `id`,
        `username`,
        `password`,
        `role`,
        `address`,
        `birthday`,
        `email`,
        `description`,
        `avt_url`,
        `personal_img`,
        `phone`,
        `sex`,
        `identify_code`,
        `created_at`,
        `account_status`
    )
VALUES (
        1,
        'admin',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'system admin',
        NULL,
        NULL,
        'admin@gmail.com',
        NULL,
        NULL,
        NULL,
        '0333444555',
        'male',
        NULL,
        '2026-04-24 23:23:53',
        'active'
    ),
    (
        3,
        'staff3',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'staff',
        'Da Nang',
        '1992-03-03',
        'staff3@gmail.com',
        'Nhan vien 3',
        NULL,
        NULL,
        '0801111113',
        'male',
        'ID003',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        4,
        'staff4',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'staff',
        'Can Tho',
        '1993-04-04',
        'staff4@gmail.com',
        'Nhan vien 4',
        NULL,
        NULL,
        '0801111114',
        'female',
        'ID004',
        '2026-04-23 09:47:47',
        'inactive'
    ),
    (
        5,
        'staff5',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'staff',
        'Hai Phong',
        '1994-05-05',
        'staff5@gmail.com',
        'Nhan vien 5',
        NULL,
        NULL,
        '0801111115',
        'male',
        'ID005',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        6,
        'staff6',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'staff',
        'Ha Noi',
        '1995-06-06',
        'staff6@gmail.com',
        'Nhan vien 6',
        NULL,
        NULL,
        '0801111116',
        'female',
        'ID006',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        7,
        'staff7',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'staff',
        'TP HCM',
        '1996-07-07',
        'staff7@gmail.com',
        'Nhan vien 7',
        NULL,
        NULL,
        '0801111117',
        'male',
        'ID007',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        8,
        'staff8',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'staff',
        'Da Nang',
        '1997-08-08',
        'staff8@gmail.com',
        'Nhan vien 8',
        NULL,
        NULL,
        '0801111118',
        'female',
        'ID008',
        '2026-04-23 09:47:47',
        'banned'
    ),
    (
        9,
        'staff9',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'staff',
        'Can Tho',
        '1998-09-09',
        'staff9@gmail.com',
        'Nhan vien 9',
        NULL,
        NULL,
        '0801111119',
        'male',
        'ID009',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        10,
        'staff10',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'staff',
        'Hai Phong',
        '1999-10-10',
        'staff10@gmail.com',
        'Nhan vien 10',
        NULL,
        NULL,
        '0801111120',
        'female',
        'ID010',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        11,
        'customer1',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'customer',
        'Ha Noi',
        '2000-01-01',
        'cus1@gmail.com',
        'Khach hang 1',
        NULL,
        NULL,
        '0701111111',
        'male',
        'ID011',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        12,
        'customer2',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'customer',
        'TP HCM',
        '2001-02-02',
        'cus2@gmail.com',
        'Khach hang 2',
        NULL,
        NULL,
        '0701111112',
        'female',
        'ID012',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        13,
        'customer3',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'customer',
        'Da Nang',
        '2002-03-03',
        'cus3@gmail.com',
        'Khach hang 3',
        NULL,
        NULL,
        '0701111113',
        'male',
        'ID013',
        '2026-04-23 09:47:47',
        'inactive'
    ),
    (
        14,
        'customer4',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'customer',
        'Can Tho',
        '2003-04-04',
        'cus4@gmail.com',
        'Khach hang 4',
        NULL,
        NULL,
        '0701111114',
        'female',
        'ID014',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        15,
        'customer5',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'customer',
        'Hai Phong',
        '2004-05-05',
        'cus5@gmail.com',
        'Khach hang 5',
        NULL,
        NULL,
        '0701111115',
        'male',
        'ID015',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        16,
        'customer6',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'customer',
        'Ha Noi',
        '1990-11-11',
        'cus6@gmail.com',
        'Khach hang 6',
        NULL,
        NULL,
        '0701111116',
        'female',
        'ID016',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        17,
        'customer7',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'customer',
        'TP HCM',
        '1991-12-12',
        'cus7@gmail.com',
        'Khach hang 7',
        NULL,
        NULL,
        '0701111117',
        'male',
        'ID017',
        '2026-04-23 09:47:47',
        'banned'
    ),
    (
        18,
        'customer8',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'customer',
        'Da Nang',
        '1992-10-10',
        'cus8@gmail.com',
        'Khach hang 8',
        NULL,
        NULL,
        '0701111118',
        'female',
        'ID018',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        19,
        'customer9',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'customer',
        'Can Tho',
        '1993-09-09',
        'cus9@gmail.com',
        'Khach hang 9',
        NULL,
        NULL,
        '0701111119',
        'male',
        'ID019',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        20,
        'customer10',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'customer',
        'Hai Phong',
        '1994-08-08',
        'cus10@gmail.com',
        'Khach hang 10',
        NULL,
        NULL,
        '0701111120',
        'other',
        'ID020',
        '2026-04-23 09:47:47',
        'active'
    ),
    (
        21,
        'stafff',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'customer',
        NULL,
        NULL,
        'p@gmail.com',
        NULL,
        NULL,
        NULL,
        '111111',
        'male',
        NULL,
        '2026-04-24 16:58:27',
        'inactive'
    ),
    (
        22,
        'test1',
        '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky',
        'customer',
        NULL,
        NULL,
        'test1@gmail.com',
        NULL,
        NULL,
        NULL,
        '',
        'female',
        NULL,
        '2026-04-24 17:04:13',
        'inactive'
    );
--
-- Chỉ mục cho các bảng đã đổ
--
--
-- Chỉ mục cho bảng `adjustment_tickets`
--
ALTER TABLE `adjustment_tickets`
ADD PRIMARY KEY (`id`),
    ADD KEY `fk_adjustment_ticket_staff` (`staff_id`),
    ADD KEY `fk_adjustment_ticket_branch` (`branch_id`);
--
-- Chỉ mục cho bảng `audit_logs`
--
ALTER TABLE `audit_logs`
ADD PRIMARY KEY (`id`),
    ADD KEY `fk_audit_logs_user` (`user_id`);
--
-- Chỉ mục cho bảng `branches`
--
ALTER TABLE `branches`
ADD PRIMARY KEY (`id`);
--
-- Chỉ mục cho bảng `brands`
--
ALTER TABLE `brands`
ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `name` (`name`);
--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
ADD PRIMARY KEY (`id`),
    ADD KEY `fk_category_parent` (`parent_id`);
--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `user_id` (`user_id`);
--
-- Chỉ mục cho bảng `inventories`
--
ALTER TABLE `inventories`
ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `unique_inventory` (`branch_id`, `product_id`),
    ADD KEY `fk_inventory_product` (`product_id`);
--
-- Chỉ mục cho bảng `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
ADD PRIMARY KEY (`id`),
    ADD KEY `fk_transaction_inventory` (`inventory_id`);
--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
ADD PRIMARY KEY (`id`),
    ADD KEY `fk_order_staff` (`staff_id`),
    ADD KEY `fk_order_customer` (`customer_id`),
    ADD KEY `fk_order_branch` (`branch_id`);
--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `product_serial` (`product_serial`),
    ADD KEY `fk_order_details_order` (`order_id`),
    ADD KEY `fk_order_details_product` (`product_id`);
--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `name` (`name`),
    ADD UNIQUE KEY `unique_sku` (`sku`),
    ADD KEY `fk_product_category` (`category_id`),
    ADD KEY `fk_product_brand` (`brand_id`);
--
-- Chỉ mục cho bảng `product_images`
--
ALTER TABLE `product_images`
ADD PRIMARY KEY (`id`),
    ADD KEY `fk_product_images` (`product_id`);
--
-- Chỉ mục cho bảng `product_items`
--
ALTER TABLE `product_items`
ADD PRIMARY KEY (`serial`),
    ADD KEY `fk_product_item_product` (`product_id`),
    ADD KEY `fk_product_item_branch` (`branch_id`);
--
-- Chỉ mục cho bảng `staffs`
--
ALTER TABLE `staffs`
ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `user_id` (`user_id`),
    ADD KEY `fk_staff_branch` (`branch_id`);
--
-- Chỉ mục cho bảng `stock_documents`
--
ALTER TABLE `stock_documents`
ADD PRIMARY KEY (`id`),
    ADD KEY `fk_stock_document_branch` (`branch_id`),
    ADD KEY `fk_stock_document_staff` (`staff_id`),
    ADD KEY `fk_stock_doc_supplier` (`supplier_id`);
--
-- Chỉ mục cho bảng `stock_document_details`
--
ALTER TABLE `stock_document_details`
ADD PRIMARY KEY (`id`),
    ADD KEY `fk_doc_details_product` (`product_id`),
    ADD KEY `fk_doc_details_document` (`document_id`);
--
-- Chỉ mục cho bảng `stock_transfers`
--
ALTER TABLE `stock_transfers`
ADD PRIMARY KEY (`id`),
    ADD KEY `fk_transfer_from_branch` (`from_branch_id`),
    ADD KEY `fk_transfer_to_branch` (`to_branch_id`);
--
-- Chỉ mục cho bảng `stock_transfer_details`
--
ALTER TABLE `stock_transfer_details`
ADD PRIMARY KEY (`id`),
    ADD KEY `fk_transfer_details_transfer` (`transfer_id`),
    ADD KEY `fk_transfer_details_product` (`product_id`);
--
-- Chỉ mục cho bảng `suppliers`
--
ALTER TABLE `suppliers`
ADD PRIMARY KEY (`id`);
--
-- Chỉ mục cho bảng `support_tickets`
--
ALTER TABLE `support_tickets`
ADD PRIMARY KEY (`id`),
    ADD KEY `fk_support_ticket_customer` (`customer_id`),
    ADD KEY `fk_support_ticket_serial` (`product_serial`),
    ADD KEY `fk_support_ticket_staff` (`staff_id`),
    ADD KEY `fk_support_ticket_order_detail` (`order_detail_id`);
--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `username` (`username`),
    ADD UNIQUE KEY `email` (`email`),
    ADD UNIQUE KEY `phone` (`phone`);
--
-- AUTO_INCREMENT cho các bảng đã đổ
--
--
-- AUTO_INCREMENT cho bảng `adjustment_tickets`
--
ALTER TABLE `adjustment_tickets`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `audit_logs`
--
ALTER TABLE `audit_logs`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `branches`
--
ALTER TABLE `branches`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `brands`
--
ALTER TABLE `brands`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `inventories`
--
ALTER TABLE `inventories`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `staffs`
--
ALTER TABLE `staffs`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `stock_documents`
--
ALTER TABLE `stock_documents`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `stock_document_details`
--
ALTER TABLE `stock_document_details`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `stock_transfers`
--
ALTER TABLE `stock_transfers`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `stock_transfer_details`
--
ALTER TABLE `stock_transfer_details`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `suppliers`
--
ALTER TABLE `suppliers`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `support_tickets`
--
ALTER TABLE `support_tickets`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 11;
--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
MODIFY `id` bigint NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 26;
--
-- Ràng buộc đối với các bảng kết xuất
--
--
-- Ràng buộc cho bảng `adjustment_tickets`
--
ALTER TABLE `adjustment_tickets`
ADD CONSTRAINT `fk_adjustment_ticket_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_adjustment_ticket_staff` FOREIGN KEY (`staff_id`) REFERENCES `staffs` (`id`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `audit_logs`
--
ALTER TABLE `audit_logs`
ADD CONSTRAINT `fk_audit_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `categories`
--
ALTER TABLE `categories`
ADD CONSTRAINT `fk_category_parent` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE
SET NULL;
--
-- Ràng buộc cho bảng `customers`
--
ALTER TABLE `customers`
ADD CONSTRAINT `fk_customer_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `inventories`
--
ALTER TABLE `inventories`
ADD CONSTRAINT `fk_inventory_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_inventory_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
ADD CONSTRAINT `fk_transaction_inventory` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`id`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
ADD CONSTRAINT `fk_order_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_order_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_order_staff` FOREIGN KEY (`staff_id`) REFERENCES `staffs` (`id`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
ADD CONSTRAINT `fk_order_details_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_order_details_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_order_details_serial` FOREIGN KEY (`product_serial`) REFERENCES `product_items` (`serial`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `products`
--
ALTER TABLE `products`
ADD CONSTRAINT `fk_product_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE
SET NULL,
    ADD CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE
SET NULL;
--
-- Ràng buộc cho bảng `product_images`
--
ALTER TABLE `product_images`
ADD CONSTRAINT `fk_product_images` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
--
-- Ràng buộc cho bảng `product_items`
--
ALTER TABLE `product_items`
ADD CONSTRAINT `fk_product_item_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_product_item_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `staffs`
--
ALTER TABLE `staffs`
ADD CONSTRAINT `fk_staff_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_staff_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `stock_documents`
--
ALTER TABLE `stock_documents`
ADD CONSTRAINT `fk_stock_doc_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
    ADD CONSTRAINT `fk_stock_document_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_stock_document_staff` FOREIGN KEY (`staff_id`) REFERENCES `staffs` (`id`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `stock_document_details`
--
ALTER TABLE `stock_document_details`
ADD CONSTRAINT `fk_doc_details_document` FOREIGN KEY (`document_id`) REFERENCES `stock_documents` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_doc_details_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `stock_transfers`
--
ALTER TABLE `stock_transfers`
ADD CONSTRAINT `fk_transfer_from_branch` FOREIGN KEY (`from_branch_id`) REFERENCES `branches` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_transfer_to_branch` FOREIGN KEY (`to_branch_id`) REFERENCES `branches` (`id`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `stock_transfer_details`
--
ALTER TABLE `stock_transfer_details`
ADD CONSTRAINT `fk_transfer_details_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_transfer_details_transfer` FOREIGN KEY (`transfer_id`) REFERENCES `stock_transfers` (`id`) ON UPDATE CASCADE;
--
-- Ràng buộc cho bảng `support_tickets`
--
ALTER TABLE `support_tickets`
ADD CONSTRAINT `fk_support_ticket_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_support_ticket_order_detail` FOREIGN KEY (`order_detail_id`) REFERENCES `order_details` (`id`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_support_ticket_serial` FOREIGN KEY (`product_serial`) REFERENCES `product_items` (`serial`) ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_support_ticket_staff` FOREIGN KEY (`staff_id`) REFERENCES `staffs` (`id`) ON UPDATE CASCADE;
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
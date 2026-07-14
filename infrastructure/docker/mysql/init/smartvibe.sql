-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql:3306
-- Thời gian đã tạo: Th6 29, 2026 lúc 01:55 PM
-- Phiên bản máy phục vụ: 8.0.45
-- Phiên bản PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `smartvibe`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` bigint NOT NULL,
  `log_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `activity` enum('log_in','log_out','change_info') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `branches`
--

CREATE TABLE `branches` (
  `id` bigint NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `operating_status` enum('open','close','maintenance') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `number_of_staff` bigint NOT NULL,
  `capacity` bigint NOT NULL,
  `type` enum('head_warehouse','retail_branch') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `branches`
--

INSERT INTO `branches` (`id`, `name`, `address`, `phone`, `email`, `operating_status`, `number_of_staff`, `capacity`, `type`) VALUES
(1, 'Kho Tong Mien Bac', 'Ha Noi', '0241111111', 'khomb@smartvibe.vn', 'open', 50, 10000, 'head_warehouse'),
(2, 'Kho Tong Mien Nam', 'TP HCM', '0281111111', 'khomn@smartvibe.vn', 'open', 60, 15000, 'retail_branch'),
(3, 'Chi Nhanh Cau Giay', 'Cau Giay, Ha Noi', '0242222222', 'caugiay@smartvibe.vn', 'close', 15, 500, 'retail_branch'),
(4, 'Chi Nhanh Dong Da', 'Dong Da, Ha Noi', '0243333333', 'dongda@smartvibe.vn', 'open', 10, 300, 'retail_branch'),
(5, 'Chi Nhanh Quan 1', 'Quan 1, TP HCM', '0282222222', 'quan1@smartvibe.vn', 'open', 20, 800, 'retail_branch'),
(6, 'Chi Nhanh Quan 3', 'Quan 3, TP HCM', '0283333333', 'quan3@smartvibe.vn', 'maintenance', 12, 400, 'retail_branch'),
(7, 'Chi Nhanh Da Nang', 'Hai Chau, Da Nang', '0233611111', 'danang@smartvibe.vn', 'open', 15, 600, 'retail_branch'),
(8, 'Chi Nhanh Can Tho', 'Ninh Kieu, Can Tho', '0292111111', 'cantho@smartvibe.vn', 'open', 10, 300, 'retail_branch'),
(9, 'Chi Nhanh Hai Phong', 'Le Chan, Hai Phong', '0225111111', 'haiphong@smartvibe.vn', 'close', 8, 200, 'retail_branch'),
(10, 'Chi Nhanh Hue', 'Phu Nhuan, Hue', '0234111111', 'hue@smartvibe.vn', 'open', 9, 250, 'retail_branch'),
(12, 'Chi Nhánh Tố Hữu', '47 Tố Hữu', '091234567', 'tohuu@gmail.com', 'close', 60, 500, 'retail_branch');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brands`
--

CREATE TABLE `brands` (
  `id` bigint NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `brands`
--

INSERT INTO `brands` (`id`, `name`, `logo_url`) VALUES
(1, 'Apple', 'https://example.com/logos/apple.png'),
(2, 'Samsung', 'https://example.com/logos/samsung.png'),
(3, 'Dell', 'https://example.com/logos/dell.png'),
(4, 'Logitech', 'https://example.com/logos/logitech.png'),
(5, 'Sony', 'https://example.com/logos/sony.png'),
(6, 'LG', 'https://example.com/logos/lg.png'),
(7, 'Keychron', 'https://example.com/logos/keychron.png'),
(8, 'Corsair', 'https://example.com/logos/corsair.png'),
(9, 'IKEA', 'https://example.com/logos/ikea.png'),
(10, 'Herman Miller', 'https://example.com/logos/hermanmiller.png'),
(11, 'Asus', 'https://example.com/logos/asus.png'),
(12, 'Lenovo', 'https://example.com/logos/lenovo.png'),
(13, 'Xiaomi', 'https://example.com/logos/xiaomi.png'),
(14, 'JBL', 'https://example.com/logos/jbl.png'),
(15, 'Marshall', 'https://example.com/logos/marshall.png');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `id` bigint NOT NULL,
  `customer_id` bigint NOT NULL COMMENT 'Mỗi khách hàng chỉ có 1 giỏ hàng active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `carts`
--

INSERT INTO `carts` (`id`, `customer_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2026-06-13 10:52:38', '2026-06-13 10:52:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint NOT NULL,
  `cart_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` bigint NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` bigint DEFAULT NULL COMMENT 'Dùng cho danh mục con',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `parent_id`, `description`) VALUES
(1, 'Máy tính xách tay (Laptop)', NULL, 'Các loại laptop văn phòng, gaming, đồ họa'),
(2, 'Điện thoại & Máy tính bảng', NULL, 'Smartphone, iPad, Tablet các loại'),
(3, 'Thiết bị Âm thanh', NULL, 'Tai nghe, loa bluetooth, soundbar'),
(4, 'Màn hình máy tính', NULL, 'Màn hình làm việc, gaming 144Hz, đồ họa 4K'),
(5, 'Phụ kiện máy tính', NULL, 'Chuột, bàn phím, cáp chuyển đổi, balo'),
(6, 'Linh kiện PC', NULL, 'CPU, RAM, SSD, VGA, Nguồn, Case'),
(7, 'Nội thất & Ergonomic', NULL, 'Bàn ghế công thái học, giá đỡ màn hình'),
(8, 'Laptop Gaming', 1, 'Laptop cấu hình cao chơi game'),
(9, 'Laptop Văn phòng', 1, 'Laptop mỏng nhẹ, pin lâu'),
(10, 'Điện thoại thông minh', 2, 'Smartphone iOS, Android'),
(11, 'Bàn phím cơ', 5, 'Bàn phím cơ switch các loại'),
(12, 'Tai nghe không dây', 3, 'Tai nghe True Wireless, Bluetooth Over-ear');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `id` bigint NOT NULL,
  `type` enum('normal','vip','gold','diamond') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`id`, `type`, `user_id`) VALUES
(1, 'normal', 74),
(2, 'vip', 75),
(3, 'gold', 76),
(4, 'diamond', 77),
(5, 'normal', 78);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `inventories`
--

CREATE TABLE `inventories` (
  `id` bigint NOT NULL,
  `quantity_available` bigint DEFAULT NULL,
  `branch_id` bigint NOT NULL,
  `product_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `inventories`
--

INSERT INTO `inventories` (`id`, `quantity_available`, `branch_id`, `product_id`) VALUES
(1, 10, 1, 1),
(2, 4, 2, 1),
(3, 0, 3, 1),
(4, 0, 4, 1),
(5, 0, 5, 1),
(6, 0, 6, 1),
(7, 0, 7, 1),
(8, 0, 8, 1),
(9, 0, 9, 1),
(10, 0, 10, 1),
(11, 0, 12, 1),
(12, 10, 1, 2),
(13, 0, 2, 2),
(14, 0, 3, 2),
(15, 0, 4, 2),
(16, 0, 5, 2),
(17, 0, 6, 2),
(18, 0, 7, 2),
(19, 0, 8, 2),
(20, 0, 9, 2),
(21, 0, 10, 2),
(22, 0, 12, 2),
(23, 10, 1, 3),
(24, 0, 2, 3),
(25, 0, 3, 3),
(26, 0, 4, 3),
(27, 0, 5, 3),
(28, 0, 6, 3),
(29, 0, 7, 3),
(30, 0, 8, 3),
(31, 0, 9, 3),
(32, 0, 10, 3),
(33, 0, 12, 3),
(34, 10, 1, 4),
(35, 0, 2, 4),
(36, 0, 3, 4),
(37, 0, 4, 4),
(38, 0, 5, 4),
(39, 0, 6, 4),
(40, 0, 7, 4),
(41, 0, 8, 4),
(42, 0, 9, 4),
(43, 0, 10, 4),
(44, 0, 12, 4),
(45, 10, 1, 5),
(46, 0, 2, 5),
(47, 0, 3, 5),
(48, 0, 4, 5),
(49, 0, 5, 5),
(50, 0, 6, 5),
(51, 0, 7, 5),
(52, 0, 8, 5),
(53, 0, 9, 5),
(54, 0, 10, 5),
(55, 0, 12, 5),
(56, 10, 1, 6),
(57, 0, 2, 6),
(58, 0, 3, 6),
(59, 0, 4, 6),
(60, 0, 5, 6),
(61, 0, 6, 6),
(62, 0, 7, 6),
(63, 0, 8, 6),
(64, 0, 9, 6),
(65, 0, 10, 6),
(66, 0, 12, 6),
(67, 10, 1, 7),
(68, 0, 2, 7),
(69, 0, 3, 7),
(70, 0, 4, 7),
(71, 0, 5, 7),
(72, 0, 6, 7),
(73, 0, 7, 7),
(74, 0, 8, 7),
(75, 0, 9, 7),
(76, 0, 10, 7),
(77, 0, 12, 7),
(78, 10, 1, 8),
(79, 0, 2, 8),
(80, 0, 3, 8),
(81, 0, 4, 8),
(82, 0, 5, 8),
(83, 0, 6, 8),
(84, 0, 7, 8),
(85, 0, 8, 8),
(86, 0, 9, 8),
(87, 0, 10, 8),
(88, 0, 12, 8),
(89, 10, 1, 9),
(90, 0, 2, 9),
(91, 0, 3, 9),
(92, 0, 4, 9),
(93, 0, 5, 9),
(94, 0, 6, 9),
(95, 0, 7, 9),
(96, 0, 8, 9),
(97, 0, 9, 9),
(98, 0, 10, 9),
(99, 0, 12, 9),
(100, 10, 1, 10),
(101, 0, 2, 10),
(102, 0, 3, 10),
(103, 0, 4, 10),
(104, 0, 5, 10),
(105, 0, 6, 10),
(106, 0, 7, 10),
(107, 0, 8, 10),
(108, 0, 9, 10),
(109, 0, 10, 10),
(110, 0, 12, 10),
(111, 9, 1, 11),
(112, 1, 2, 11),
(113, 0, 3, 11),
(114, 0, 4, 11),
(115, 0, 5, 11),
(116, 0, 6, 11),
(117, 0, 7, 11),
(118, 0, 8, 11),
(119, 0, 9, 11),
(120, 0, 10, 11),
(121, 0, 12, 11),
(122, 10, 1, 12),
(123, 0, 2, 12),
(124, 0, 3, 12),
(125, 0, 4, 12),
(126, 0, 5, 12),
(127, 0, 6, 12),
(128, 0, 7, 12),
(129, 0, 8, 12),
(130, 0, 9, 12),
(131, 0, 10, 12),
(132, 0, 12, 12),
(133, 10, 1, 13),
(134, 0, 2, 13),
(135, 0, 3, 13),
(136, 0, 4, 13),
(137, 0, 5, 13),
(138, 0, 6, 13),
(139, 0, 7, 13),
(140, 0, 8, 13),
(141, 0, 9, 13),
(142, 0, 10, 13),
(143, 0, 12, 13),
(144, 10, 1, 14),
(145, 0, 2, 14),
(146, 0, 3, 14),
(147, 0, 4, 14),
(148, 0, 5, 14),
(149, 0, 6, 14),
(150, 0, 7, 14),
(151, 0, 8, 14),
(152, 0, 9, 14),
(153, 0, 10, 14),
(154, 0, 12, 14),
(155, 10, 1, 15),
(156, 0, 2, 15),
(157, 0, 3, 15),
(158, 0, 4, 15),
(159, 0, 5, 15),
(160, 0, 6, 15),
(161, 0, 7, 15),
(162, 0, 8, 15),
(163, 0, 9, 15),
(164, 0, 10, 15),
(165, 0, 12, 15),
(166, 10, 1, 16),
(167, 0, 2, 16),
(168, 0, 3, 16),
(169, 0, 4, 16),
(170, 0, 5, 16),
(171, 0, 6, 16),
(172, 0, 7, 16),
(173, 0, 8, 16),
(174, 0, 9, 16),
(175, 0, 10, 16),
(176, 0, 12, 16),
(177, 10, 1, 17),
(178, 0, 2, 17),
(179, 0, 3, 17),
(180, 0, 4, 17),
(181, 0, 5, 17),
(182, 0, 6, 17),
(183, 0, 7, 17),
(184, 0, 8, 17),
(185, 0, 9, 17),
(186, 0, 10, 17),
(187, 0, 12, 17),
(188, 10, 1, 18),
(189, 0, 2, 18),
(190, 0, 3, 18),
(191, 0, 4, 18),
(192, 0, 5, 18),
(193, 0, 6, 18),
(194, 0, 7, 18),
(195, 0, 8, 18),
(196, 0, 9, 18),
(197, 0, 10, 18),
(198, 0, 12, 18),
(199, 10, 1, 19),
(200, 0, 2, 19),
(201, 0, 3, 19),
(202, 0, 4, 19),
(203, 0, 5, 19),
(204, 0, 6, 19),
(205, 0, 7, 19),
(206, 0, 8, 19),
(207, 0, 9, 19),
(208, 0, 10, 19),
(209, 0, 12, 19),
(210, 10, 1, 20),
(211, 0, 2, 20),
(212, 0, 3, 20),
(213, 0, 4, 20),
(214, 0, 5, 20),
(215, 0, 6, 20),
(216, 0, 7, 20),
(217, 0, 8, 20),
(218, 0, 9, 20),
(219, 0, 10, 20),
(220, 0, 12, 20),
(221, 10, 1, 21),
(222, 0, 2, 21),
(223, 0, 3, 21),
(224, 0, 4, 21),
(225, 0, 5, 21),
(226, 0, 6, 21),
(227, 0, 7, 21),
(228, 0, 8, 21),
(229, 0, 9, 21),
(230, 0, 10, 21),
(231, 0, 12, 21),
(232, 10, 1, 22),
(233, 0, 2, 22),
(234, 0, 3, 22),
(235, 0, 4, 22),
(236, 0, 5, 22),
(237, 0, 6, 22),
(238, 0, 7, 22),
(239, 0, 8, 22),
(240, 0, 9, 22),
(241, 0, 10, 22),
(242, 0, 12, 22),
(243, 10, 1, 23),
(244, 0, 2, 23),
(245, 0, 3, 23),
(246, 0, 4, 23),
(247, 0, 5, 23),
(248, 0, 6, 23),
(249, 0, 7, 23),
(250, 0, 8, 23),
(251, 0, 9, 23),
(252, 0, 10, 23),
(253, 0, 12, 23),
(254, 10, 1, 24),
(255, 0, 2, 24),
(256, 0, 3, 24),
(257, 0, 4, 24),
(258, 0, 5, 24),
(259, 0, 6, 24),
(260, 0, 7, 24),
(261, 0, 8, 24),
(262, 0, 9, 24),
(263, 0, 10, 24),
(264, 0, 12, 24),
(265, 10, 1, 25),
(266, 0, 2, 25),
(267, 0, 3, 25),
(268, 0, 4, 25),
(269, 0, 5, 25),
(270, 0, 6, 25),
(271, 0, 7, 25),
(272, 0, 8, 25),
(273, 0, 9, 25),
(274, 0, 10, 25),
(275, 0, 12, 25),
(276, 10, 1, 26),
(277, 0, 2, 26),
(278, 0, 3, 26),
(279, 0, 4, 26),
(280, 0, 5, 26),
(281, 0, 6, 26),
(282, 0, 7, 26),
(283, 0, 8, 26),
(284, 0, 9, 26),
(285, 0, 10, 26),
(286, 0, 12, 26),
(287, 10, 1, 27),
(288, 0, 2, 27),
(289, 0, 3, 27),
(290, 0, 4, 27),
(291, 0, 5, 27),
(292, 0, 6, 27),
(293, 0, 7, 27),
(294, 0, 8, 27),
(295, 0, 9, 27),
(296, 0, 10, 27),
(297, 0, 12, 27),
(298, 10, 1, 28),
(299, 0, 2, 28),
(300, 0, 3, 28),
(301, 0, 4, 28),
(302, 0, 5, 28),
(303, 0, 6, 28),
(304, 0, 7, 28),
(305, 0, 8, 28),
(306, 0, 9, 28),
(307, 0, 10, 28),
(308, 0, 12, 28),
(309, 10, 1, 29),
(310, 0, 2, 29),
(311, 0, 3, 29),
(312, 0, 4, 29),
(313, 0, 5, 29),
(314, 0, 6, 29),
(315, 0, 7, 29),
(316, 0, 8, 29),
(317, 0, 9, 29),
(318, 0, 10, 29),
(319, 0, 12, 29),
(320, 10, 1, 30),
(321, 0, 2, 30),
(322, 0, 3, 30),
(323, 0, 4, 30),
(324, 0, 5, 30),
(325, 0, 6, 30),
(326, 0, 7, 30),
(327, 0, 8, 30),
(328, 0, 9, 30),
(329, 0, 10, 30),
(330, 0, 12, 30),
(331, 10, 1, 31),
(332, 0, 2, 31),
(333, 0, 3, 31),
(334, 0, 4, 31),
(335, 0, 5, 31),
(336, 0, 6, 31),
(337, 0, 7, 31),
(338, 0, 8, 31),
(339, 0, 9, 31),
(340, 0, 10, 31),
(341, 0, 12, 31),
(342, 10, 1, 32),
(343, 0, 2, 32),
(344, 0, 3, 32),
(345, 0, 4, 32),
(346, 0, 5, 32),
(347, 0, 6, 32),
(348, 0, 7, 32),
(349, 0, 8, 32),
(350, 0, 9, 32),
(351, 0, 10, 32),
(352, 0, 12, 32),
(353, 79, 1, 33),
(354, 0, 2, 33),
(355, 0, 3, 33),
(356, 0, 4, 33),
(357, 0, 5, 33),
(358, 0, 6, 33),
(359, 0, 7, 33),
(360, 0, 8, 33),
(361, 0, 9, 33),
(362, 0, 10, 33),
(363, 0, 12, 33),
(364, 10, 1, 34),
(365, 0, 2, 34),
(366, 0, 3, 34),
(367, 0, 4, 34),
(368, 0, 5, 34),
(369, 0, 6, 34),
(370, 0, 7, 34),
(371, 0, 8, 34),
(372, 0, 9, 34),
(373, 0, 10, 34),
(374, 0, 12, 34),
(375, 80, 1, 35),
(376, 0, 2, 35),
(377, 0, 3, 35),
(378, 0, 4, 35),
(379, 0, 5, 35),
(380, 0, 6, 35),
(381, 0, 7, 35),
(382, 0, 8, 35),
(383, 0, 9, 35),
(384, 0, 10, 35),
(385, 0, 12, 35);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `inventory_transactions`
--

CREATE TABLE `inventory_transactions` (
  `id` bigint NOT NULL,
  `transaction_type` enum('import','export','transfer in','transfer out','sale','return','adjustment') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity_changed` bigint NOT NULL,
  `reference_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference_id` bigint NOT NULL,
  `inventory_id` bigint NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `inventory_transactions`
--

INSERT INTO `inventory_transactions` (`id`, `transaction_type`, `quantity_changed`, `reference_type`, `reference_id`, `inventory_id`, `created_at`) VALUES
(1, 'import', 5, 'document', 1, 2, '2026-06-09 07:49:28'),
(2, 'import', 10, 'document', 2, 1, '2026-06-12 18:19:45'),
(3, 'import', 10, 'document', 2, 12, '2026-06-12 18:19:45'),
(4, 'import', 10, 'document', 2, 23, '2026-06-12 18:19:45'),
(5, 'import', 10, 'document', 2, 34, '2026-06-12 18:19:45'),
(6, 'import', 10, 'document', 2, 45, '2026-06-12 18:19:45'),
(7, 'import', 10, 'document', 2, 56, '2026-06-12 18:19:45'),
(8, 'import', 10, 'document', 2, 67, '2026-06-12 18:19:45'),
(9, 'import', 10, 'document', 2, 78, '2026-06-12 18:19:45'),
(10, 'import', 10, 'document', 2, 89, '2026-06-12 18:19:45'),
(11, 'import', 10, 'document', 2, 100, '2026-06-12 18:19:45'),
(12, 'import', 10, 'document', 2, 111, '2026-06-12 18:19:45'),
(13, 'import', 10, 'document', 2, 122, '2026-06-12 18:19:45'),
(14, 'import', 10, 'document', 2, 133, '2026-06-12 18:19:45'),
(15, 'import', 10, 'document', 2, 144, '2026-06-12 18:19:45'),
(16, 'import', 10, 'document', 2, 155, '2026-06-12 18:19:45'),
(17, 'import', 10, 'document', 2, 166, '2026-06-12 18:19:45'),
(18, 'import', 10, 'document', 2, 177, '2026-06-12 18:19:45'),
(19, 'import', 10, 'document', 2, 188, '2026-06-12 18:19:45'),
(20, 'import', 10, 'document', 2, 199, '2026-06-12 18:19:45'),
(21, 'import', 10, 'document', 2, 210, '2026-06-12 18:19:45'),
(22, 'import', 10, 'document', 2, 221, '2026-06-12 18:19:45'),
(23, 'import', 10, 'document', 2, 232, '2026-06-12 18:19:45'),
(24, 'import', 10, 'document', 2, 243, '2026-06-12 18:19:45'),
(25, 'import', 10, 'document', 2, 254, '2026-06-12 18:19:45'),
(26, 'import', 10, 'document', 2, 265, '2026-06-12 18:19:45'),
(27, 'import', 10, 'document', 2, 276, '2026-06-12 18:19:45'),
(28, 'import', 10, 'document', 2, 287, '2026-06-12 18:19:45'),
(29, 'import', 10, 'document', 2, 298, '2026-06-12 18:19:45'),
(30, 'import', 10, 'document', 2, 309, '2026-06-12 18:19:45'),
(31, 'import', 10, 'document', 2, 320, '2026-06-12 18:19:45'),
(32, 'import', 10, 'document', 2, 331, '2026-06-12 18:19:45'),
(33, 'import', 10, 'document', 2, 342, '2026-06-12 18:19:45'),
(34, 'import', 80, 'document', 2, 353, '2026-06-12 18:19:45'),
(35, 'import', 10, 'document', 2, 364, '2026-06-12 18:19:45'),
(36, 'import', 80, 'document', 2, 375, '2026-06-12 18:19:45'),
(39, 'transfer out', -1, 'stock transfer', 1, 111, '2026-06-12 19:24:35'),
(40, 'transfer in', 1, 'stock transfer', 1, 112, '2026-06-12 19:34:56'),
(41, 'sale', -1, 'order', 1, 353, '2026-06-13 03:53:09'),
(42, 'sale', -1, 'order', 2, 2, '2026-06-14 16:17:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` bigint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` enum('POS','online') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `delivery_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_status` enum('pending','confirmed','completed','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `delivery_status` enum('not shipped','shipping','delivered','failed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_payment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_method` enum('bank','cash') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_status` enum('unpaid','paid','refunded') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_percent` decimal(38,2) DEFAULT NULL,
  `staff_id` bigint DEFAULT NULL,
  `customer_id` bigint NOT NULL,
  `branch_id` bigint NOT NULL,
  `shipping_provider` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'VD: GHTK, GHN, ViettelPost',
  `tracking_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Mã vận đơn',
  `shipping_fee` decimal(38,2) DEFAULT NULL,
  `customer_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Tên khách hàng đặt trong trường hợp đặt hộ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `created_at`, `type`, `note`, `delivery_location`, `phone`, `order_status`, `delivery_status`, `account_payment`, `payment_method`, `payment_status`, `discount_percent`, `staff_id`, `customer_id`, `branch_id`, `shipping_provider`, `tracking_code`, `shipping_fee`, `customer_name`) VALUES
(1, '2026-06-13 10:53:09', 'online', 'Giao trước 16h chiều', 'Ha Noi', '0123456789', 'pending', 'not shipped', '03647247695 MB Bank', 'bank', 'unpaid', 0.00, NULL, 1, 1, 'GHTK', NULL, 60000.00, 'Khách hàng vãng lai'),
(2, '2026-06-14 23:17:12', 'online', 'Giao hàng trước 16h chiều, gọi điện trước khi giao 30p', 'TP HCM', '', 'confirmed', 'not shipped', '03647247695 MB Bank', 'bank', 'paid', 0.00, NULL, 1, 2, 'ViettelPost', NULL, 80000.00, 'Nguyễn Văn Khách Hàng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint NOT NULL,
  `quantity` bigint DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `product_serial` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `quantity`, `price`, `order_id`, `product_id`, `product_serial`) VALUES
(1, 1, 3590000.00, 1, 33, NULL),
(2, 1, 29990000.00, 2, 1, 'IP15-001');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` bigint NOT NULL,
  `sku` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint DEFAULT NULL,
  `brand_id` bigint DEFAULT NULL,
  `is_serialized` tinyint(1) NOT NULL DEFAULT '0',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `price` decimal(38,2) NOT NULL,
  `warranty_months` int NOT NULL DEFAULT '12' COMMENT 'Số tháng bảo hành',
  `specifications` json DEFAULT NULL COMMENT 'Thông số kỹ thuật: RAM, CPU, Pin...',
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Ảnh đại diện',
  `status` enum('active','inactive','discontinued') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active' COMMENT 'Trạng thái kinh doanh'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `sku`, `name`, `category_id`, `brand_id`, `is_serialized`, `description`, `price`, `warranty_months`, `specifications`, `thumbnail`, `status`) VALUES
(1, 'IPH15PM-256-TI', 'iPhone 15 Pro Max 256GB Titan', 1, 1, 1, 'Siêu phẩm iPhone 15 Pro Max khung Titan siêu nhẹ, chip A17 Pro mạnh mẽ.', 29990000.00, 12, '{\"RAM\": \"8GB\", \"ROM\": \"256GB\", \"Chip\": \"Apple A17 Pro\", \"Màn hình\": \"6.7 inch 120Hz\"}', '', 'active'),
(2, 'SS-S24U-512-BLK', 'Samsung Galaxy S24 Ultra 512GB', 1, 1, 1, 'Điện thoại AI cao cấp nhất của Samsung với bút S-Pen tích hợp và khung viền Titan.', 33490000.00, 12, '{\"Pin\": \"5000 mAh\", \"RAM\": \"12GB\", \"ROM\": \"512GB\", \"Chip\": \"Snapdragon 8 Gen 3\"}', 'https://placehold.co/400x400/2c3e50/ffffff?text=Galaxy+S24+Ultra', 'active'),
(3, 'IPH14-128-BLK', 'iPhone 14 128GB Đen', 10, 1, 1, 'Lựa chọn quốc dân với hiệu năng ổn định, camera kép sắc nét và pin cực trâu.', 18500000.00, 12, '{\"RAM\": \"6GB\", \"ROM\": \"128GB\", \"Chip\": \"Apple A15 Bionic\"}', 'https://placehold.co/400x400/000000/ffffff?text=iPhone+14', 'active'),
(4, 'XIA-14-256-GRN', 'Xiaomi 14 5G 12GB/256GB', 10, 13, 1, 'Siêu phẩm kích thước nhỏ gọn mang sức mạnh khổng lồ với camera hợp tác cùng Leica.', 19990000.00, 12, '{\"RAM\": \"12GB\", \"ROM\": \"256GB\", \"Camera\": \"Leica 50MP\", \"Sạc nhanh\": \"90W\"}', '', 'active'),
(5, 'SS-ZF5-256-BLU', 'Samsung Galaxy Z Fold5 256GB', 1, 2, 1, 'Điện thoại gập cao cấp, bản lề Flex thu gọn khe hở, màn hình lớn như máy tính bảng.', 35990000.00, 12, '{\"Màn hình phụ\": \"6.2 inch\", \"Tần số quét\": \"120Hz\", \"Màn hình chính\": \"7.6 inch\"}', 'https://placehold.co/400x400/2980b9/ffffff?text=Z+Fold+5', 'active'),
(6, 'MBA-M2-8-256-SL', 'MacBook Air M2 8GB/256GB Silver', 2, 1, 1, 'MacBook Air M2 thiết kế mỏng nhẹ, pin trâu phù hợp dân văn phòng và học sinh sinh viên.', 24500000.00, 12, '{\"CPU\": \"Apple M2 8-core\", \"RAM\": \"8GB Unified\", \"Ổ cứng\": \"256GB SSD\"}', 'https://placehold.co/400x400/bdc3c7/2c3e50?text=MacBook+Air+M2', 'active'),
(7, 'MBP14-M3P-18-512', 'MacBook Pro 14 M3 Pro 18GB/512GB', 2, 1, 1, 'Cỗ máy trạm di động hoàn hảo cho coder và designer với chip M3 Pro cực khủng.', 49990000.00, 12, '{\"CPU\": \"M3 Pro 11-core\", \"RAM\": \"18GB\", \"Màn hình\": \"Liquid Retina XDR 120Hz\"}', 'https://placehold.co/400x400/34495e/ffffff?text=MacBook+Pro+M3', 'active'),
(8, 'DELL-XPS15-9530', 'Dell XPS 15 9530 Core i7-13700H', 2, 3, 1, 'Laptop Windows viền mỏng nhất thế giới, thiết kế nhôm nguyên khối sang trọng.', 45000000.00, 12, '{\"CPU\": \"Intel Core i7 13700H\", \"RAM\": \"16GB DDR5\", \"VGA\": \"RTX 4050 6GB\"}', 'https://placehold.co/400x400/7f8c8d/ffffff?text=Dell+XPS+15', 'active'),
(9, 'ROG-G14-2023', 'Asus ROG Zephyrus G14 2023', 2, 11, 1, 'Laptop gaming 14 inch mạnh nhất thế giới, mặt lưng LED AniMe Matrix độc đáo.', 38990000.00, 24, '{\"CPU\": \"Ryzen 9 7940HS\", \"VGA\": \"RTX 4060\", \"Trọng lượng\": \"1.65 kg\"}', 'https://placehold.co/400x400/e74c3c/ffffff?text=ROG+Zephyrus', 'active'),
(10, 'THINK-X1G11', 'Lenovo ThinkPad X1 Carbon Gen 11', 2, 12, 1, 'Huyền thoại laptop doanh nhân, bàn phím gõ sướng nhất thế giới, siêu nhẹ 1.1kg.', 42500000.00, 36, '{\"CPU\": \"Intel i7 vPro\", \"Bảo mật\": \"Vân tay & IR Camera\", \"Chất liệu\": \"Sợi Carbon\"}', 'https://placehold.co/400x400/000000/e74c3c?text=ThinkPad+X1', 'inactive'),
(11, 'AP-PRO-2-USBC', 'AirPods Pro Gen 2 (USB-C)', 4, 1, 1, 'Tai nghe chống ồn chủ động tốt nhất của Apple, phiên bản mới sạc USB-C.', 5890000.00, 12, '{\"Pin\": \"6 giờ (Tai nghe), 30 giờ (Hộp sạc)\", \"Tính năng\": \"Chống ồn ANC, Xuyên âm\"}', 'https://placehold.co/400x400/ffffff/333333?text=AirPods+Pro', 'active'),
(12, 'SNY-WH1000XM5', 'Tai nghe Sony WH-1000XM5', 4, 5, 1, 'Tai nghe chụp tai over-ear chống ồn đỉnh cao, chất âm Hi-Res cực chất.', 7490000.00, 12, '{\"Driver\": \"30mm\", \"Kết nối\": \"Bluetooth 5.2\", \"Trọng lượng\": \"250g\"}', 'https://placehold.co/400x400/f39c12/ffffff?text=Sony+XM5', 'active'),
(13, 'MAR-EMB2-BLK', 'Loa Bluetooth Marshall Emberton II', 4, 15, 1, 'Loa di động phong cách retro cổ điển, âm thanh 360 độ, pin 30 giờ.', 3990000.00, 12, '{\"Pin\": \"30 giờ\", \"Công suất\": \"20W\", \"Chống nước\": \"IP67\"}', 'https://placehold.co/400x400/3e2723/ffffff?text=Marshall+Emberton', 'active'),
(14, 'JBL-CHG5-BLU', 'Loa JBL Charge 5', 4, 14, 1, 'Loa tiệc tùng chống nước bụi bẩn, bass cực mạnh, kiêm sạc dự phòng.', 3290000.00, 12, '{\"Tính năng\": \"PartyBoost\", \"Chống nước\": \"IP67\", \"Dung lượng pin\": \"7500 mAh\"}', 'https://placehold.co/400x400/3498db/ffffff?text=JBL+Charge+5', 'active'),
(15, 'SS-BUDS2P-PURP', 'Samsung Galaxy Buds 2 Pro', 4, 2, 1, 'Tai nghe true wireless chuẩn 24-bit Hi-Fi audio, thiết kế nhỏ gọn ôm tai.', 2990000.00, 12, '{\"Audio\": \"24-bit Hi-Fi\", \"Micro\": \"3 mic/tai\", \"Chống nước\": \"IPX7\"}', 'https://placehold.co/400x400/9b59b6/ffffff?text=Galaxy+Buds', 'active'),
(16, 'LOGI-MXM3S-GRY', 'Chuột không dây Logitech MX Master 3S', 3, 4, 1, 'Chuột làm việc tốt nhất thế giới, click siêu êm, cuộn từ tính MagSpeed 1000 dòng/giây.', 2490000.00, 24, '{\"Pin\": \"70 ngày\", \"Kết nối\": \"Bluetooth / Logi Bolt\", \"Cảm biến\": \"8000 DPI (Kính)\"}', 'https://placehold.co/400x400/7f8c8d/ffffff?text=MX+Master+3S', 'active'),
(17, 'KEY-Q1P-KNOB', 'Bàn phím cơ Keychron Q1 Pro', 3, 7, 1, 'Bàn phím cơ khung nhôm nguyên khối, kết nối không dây, hỗ trợ QMK/VIA.', 4500000.00, 12, '{\"Layout\": \"75%\", \"Switch\": \"Keychron K Pro Banana\", \"Chất liệu\": \"Nhôm CNC\"}', 'https://placehold.co/400x400/2c3e50/ffffff?text=Keychron+Q1', 'active'),
(18, 'LOGI-G102-BLK', 'Chuột Gaming Logitech G102 Lightsync', 3, 4, 1, 'Chuột gaming quốc dân cho học sinh sinh viên, LED RGB đẹp mắt.', 390000.00, 24, '{\"DPI\": \"8000\", \"LED\": \"RGB 16.8 triệu màu\", \"Trọng lượng\": \"85g\"}', 'https://placehold.co/400x400/34495e/ffffff?text=G102', 'active'),
(19, 'DELL-U2723QE', 'Màn hình Dell UltraSharp U2723QE 4K', 3, 3, 1, 'Màn hình đồ họa chuẩn màu 4K IPS Black đỉnh cao, hỗ trợ sạc Type-C 90W.', 14500000.00, 36, '{\"Kết nối\": \"USB-C Hub\", \"Tấm nền\": \"IPS Black\", \"Kích thước\": \"27 inch 4K\"}', 'https://placehold.co/400x400/bdc3c7/2c3e50?text=Dell+UltraSharp', 'active'),
(20, 'APP-TRACKPAD-W', 'Apple Magic Trackpad 3', 3, 1, 1, 'Bàn di chuột không dây chính hãng Apple, hỗ trợ đa điểm mượt mà.', 2990000.00, 12, '{\"Bề mặt\": \"Kính cường lực\", \"Kết nối\": \"Bluetooth\", \"Cổng sạc\": \"Lightning\"}', 'https://placehold.co/400x400/ecf0f1/2c3e50?text=Magic+Trackpad', 'active'),
(21, 'IPAD-PROM4-11-256', 'iPad Pro M4 11-inch 256GB Wifi', 5, 1, 1, 'Máy tính bảng mỏng nhất của Apple, sức mạnh khủng khiếp từ chip M4, màn OLED.', 28500000.00, 12, '{\"Chip\": \"Apple M4\", \"Màn hình\": \"Tandem OLED 120Hz\", \"Độ mỏng\": \"5.1mm\"}', 'https://placehold.co/400x400/95a5a6/ffffff?text=iPad+Pro+M4', 'active'),
(22, 'SS-TABS9-128', 'Samsung Galaxy Tab S9 128GB', 5, 2, 1, 'Máy tính bảng Android cao cấp, chống nước IP68, kèm bút S-Pen xịn xò.', 18990000.00, 12, '{\"Pin\": \"8400 mAh\", \"Màn hình\": \"Dynamic AMOLED 2X\", \"Chống nước\": \"IP68\"}', 'https://placehold.co/400x400/2c3e50/ffffff?text=Galaxy+Tab+S9', 'active'),
(23, 'IPAD-AIR6-128', 'iPad Air 6 M2 11-inch 128GB', 5, 1, 1, 'Bản nâng cấp mạnh mẽ với chip M2, màu sắc trẻ trung, hỗ trợ Apple Pencil Pro.', 16500000.00, 12, '{\"Chip\": \"Apple M2\", \"Camera\": \"Camera ngang\", \"Hỗ trợ\": \"Apple Pencil Pro\"}', 'https://placehold.co/400x400/3498db/ffffff?text=iPad+Air+M2', 'active'),
(24, 'XIA-PAD6-256', 'Xiaomi Pad 6 8GB/256GB', 5, 13, 1, 'Máy tính bảng giải trí siêu ngon bổ rẻ, màn hình 144Hz mượt mà.', 8990000.00, 18, '{\"Pin\": \"8840 mAh\", \"Chip\": \"Snapdragon 870\", \"Màn hình\": \"11 inch 144Hz\"}', 'https://placehold.co/400x400/7f8c8d/ffffff?text=Xiaomi+Pad+6', 'active'),
(25, 'MS-SURF9-I5-256', 'Microsoft Surface Pro 9 Core i5', 5, 6, 1, 'Máy tính bảng lai Laptop chạy Windows hoàn hảo nhất cho công việc.', 26990000.00, 12, '{\"HĐH\": \"Windows 11 Home\", \"Cổng\": \"2x Thunderbolt 4\", \"Màn hình\": \"13 inch PixelSense\"}', 'https://placehold.co/400x400/bdc3c7/2c3e50?text=Surface+Pro+9', 'inactive'),
(26, 'AW-ULTRA2-ALP', 'Apple Watch Ultra 2 Alpine Loop', 6, 1, 1, 'Đồng hồ thông minh nồi đồng cối đá cho dân thể thao mạo hiểm, độ sáng 3000 nits.', 20990000.00, 12, '{\"GPS\": \"Băng tần kép\", \"Độ sáng\": \"3000 nits\", \"Chất liệu\": \"Titanium\"}', 'https://placehold.co/400x400/e67e22/ffffff?text=Watch+Ultra+2', 'active'),
(27, 'SS-GW6-CLASSIC', 'Samsung Galaxy Watch 6 Classic', 6, 2, 1, 'Đồng hồ thông minh có vòng bezel vật lý xoay cực êm, theo dõi sức khỏe chi tiết.', 8490000.00, 12, '{\"Viền\": \"Thép không gỉ\", \"Mặt kính\": \"Sapphire\", \"Tính năng\": \"Đo Huyết Áp, ECG\"}', 'https://placehold.co/400x400/34495e/ffffff?text=Galaxy+Watch', 'active'),
(28, 'GAR-F7X-PRO', 'Garmin Fenix 7X Pro Sapphire Solar', 6, 10, 1, 'Đồng hồ thể thao chuyên nghiệp, pin siêu trâu, có sạc bằng năng lượng mặt trời.', 23500000.00, 12, '{\"Pin\": \"28 ngày (37 ngày với Solar)\", \"Bản đồ\": \"Topo đa lục địa\", \"Tích hợp\": \"Đèn pin LED\"}', 'https://placehold.co/400x400/27ae60/ffffff?text=Garmin+Fenix+7X', 'active'),
(29, 'AW-SE23-40-AL', 'Apple Watch SE 2023 40mm Nhôm', 6, 1, 1, 'Đồng hồ thông minh giá rẻ nhất của Apple, đầy đủ tính năng thiết yếu.', 6290000.00, 12, '{\"Chip\": \"S8 SiP\", \"Tính năng\": \"Phát hiện tai nạn\", \"Chống nước\": \"WR50\"}', 'https://placehold.co/400x400/ecf0f1/2c3e50?text=Watch+SE', 'active'),
(30, 'GAR-FR265-BLK', 'Garmin Forerunner 265', 6, 10, 1, 'Đồng hồ chạy bộ chuyên dụng màn hình AMOLED rực rỡ, đo lường chỉ số đào tạo nâng cao.', 11690000.00, 12, '{\"Pin GPS\": \"Lên tới 20 giờ\", \"Màn hình\": \"AMOLED\", \"Trọng lượng\": \"47g\"}', 'https://placehold.co/400x400/e74c3c/ffffff?text=Forerunner+265', 'discontinued'),
(31, 'MAC-STUDIO-M2M-32-512', 'Apple Mac Studio M2 Max 32GB/512GB', 1, 1, 1, 'Cỗ máy trạm mini siêu mạnh mẽ dành cho dân đồ họa chuyên nghiệp và làm phim, trang bị chip M2 Max.', 49990000.00, 12, '{\"CPU\": \"Apple M2 Max 12-core\", \"GPU\": \"30-core\", \"RAM\": \"32GB\", \"Cổng kết nối\": \"4x Thunderbolt 4\"}', 'https://placehold.co/400x400/ecf0f1/2c3e50?text=Mac+Studio', 'active'),
(32, 'SS-ODYSSEY-G9-49', 'Màn hình cong Samsung Odyssey OLED G9 49 inch', 5, 2, 1, 'Màn hình gaming cong OLED 49 inch siêu rộng tỷ lệ 32:9, tần số quét 240Hz mang lại trải nghiệm đắm chìm tuyệt đối.', 35990000.00, 12, '{\"Tấm nền\": \"OLED cong 1800R\", \"Kích thước\": \"49 inch\", \"Tần số quét\": \"240Hz\", \"Độ phản hồi\": \"0.03ms\"}', 'https://placehold.co/400x400/2c3e50/ffffff?text=Odyssey+G9', 'active'),
(33, 'LOGI-GPX2-WHT', 'Chuột Gaming Logitech G Pro X Superlight 2', 3, 4, 0, 'Chuột gaming không dây siêu nhẹ thế hệ mới dành cho tuyển thủ eSports, switch quang học lai cơ khí.', 3590000.00, 24, '{\"Cảm biến\": \"HERO 2\", \"Polling Rate\": \"2000Hz\", \"DPI tối đa\": \"32000\", \"Trọng lượng\": \"60g\"}', 'https://placehold.co/400x400/ffffff/e74c3c?text=GPX+Superlight+2', 'active'),
(34, 'SNY-WH1000XM4-BLK', 'Tai nghe không dây Sony WH-1000XM4', 4, 5, 1, 'Huyền thoại tai nghe chống ồn chủ động, thiết kế gập gọn tiện lợi, âm thanh Hi-Res Audio cực đỉnh.', 5490000.00, 12, '{\"Pin\": \"30 giờ\", \"Sạc nhanh\": \"10 phút sạc = 5 giờ nghe\", \"Chống ồn\": \"ANC\", \"Trọng lượng\": \"254g\"}', 'https://placehold.co/400x400/000000/ffffff?text=Sony+XM4', 'active'),
(35, 'KEY-K8P-ALU-RGB', 'Bàn phím cơ Keychron K8 Pro Nhôm RGB', 3, 7, 0, 'Bàn phím cơ layout TKL chuẩn Mac/Windows, hỗ trợ hot-swap, QMK/VIA và lót sẵn form tiêu âm cực êm.', 2790000.00, 12, '{\"Pin\": \"4000 mAh\", \"Layout\": \"TKL (87 phím)\", \"Switch\": \"Gateron G Pro Red\", \"Kết nối\": \"Bluetooth 5.1 / Type-C\"}', 'https://placehold.co/400x400/34495e/ffffff?text=Keychron+K8+Pro', 'active');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_items`
--

CREATE TABLE `product_items` (
  `serial` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('in stock','sold','defective','transit') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` bigint NOT NULL,
  `branch_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_items`
--

INSERT INTO `product_items` (`serial`, `status`, `product_id`, `branch_id`) VALUES
('APPRO2-SN01', 'in stock', 11, 2),
('APPRO2-SN02', 'in stock', 11, 1),
('APPRO2-SN03', 'in stock', 11, 1),
('APPRO2-SN04', 'in stock', 11, 1),
('APPRO2-SN05', 'in stock', 11, 1),
('APPRO2-SN06', 'in stock', 11, 1),
('APPRO2-SN07', 'in stock', 11, 1),
('APPRO2-SN08', 'in stock', 11, 1),
('APPRO2-SN09', 'in stock', 11, 1),
('APPRO2-SN10', 'in stock', 11, 1),
('AWSE23-SN01', 'in stock', 29, 1),
('AWSE23-SN02', 'in stock', 29, 1),
('AWSE23-SN03', 'in stock', 29, 1),
('AWSE23-SN04', 'in stock', 29, 1),
('AWSE23-SN05', 'in stock', 29, 1),
('AWSE23-SN06', 'in stock', 29, 1),
('AWSE23-SN07', 'in stock', 29, 1),
('AWSE23-SN08', 'in stock', 29, 1),
('AWSE23-SN09', 'in stock', 29, 1),
('AWSE23-SN10', 'in stock', 29, 1),
('AWULTRA-SN01', 'in stock', 26, 1),
('AWULTRA-SN02', 'in stock', 26, 1),
('AWULTRA-SN03', 'in stock', 26, 1),
('AWULTRA-SN04', 'in stock', 26, 1),
('AWULTRA-SN05', 'in stock', 26, 1),
('AWULTRA-SN06', 'in stock', 26, 1),
('AWULTRA-SN07', 'in stock', 26, 1),
('AWULTRA-SN08', 'in stock', 26, 1),
('AWULTRA-SN09', 'in stock', 26, 1),
('AWULTRA-SN10', 'in stock', 26, 1),
('BUDS2P-SN01', 'in stock', 15, 1),
('BUDS2P-SN02', 'in stock', 15, 1),
('BUDS2P-SN03', 'in stock', 15, 1),
('BUDS2P-SN04', 'in stock', 15, 1),
('BUDS2P-SN05', 'in stock', 15, 1),
('BUDS2P-SN06', 'in stock', 15, 1),
('BUDS2P-SN07', 'in stock', 15, 1),
('BUDS2P-SN08', 'in stock', 15, 1),
('BUDS2P-SN09', 'in stock', 15, 1),
('BUDS2P-SN10', 'in stock', 15, 1),
('DELLU27-SN01', 'in stock', 19, 1),
('DELLU27-SN02', 'in stock', 19, 1),
('DELLU27-SN03', 'in stock', 19, 1),
('DELLU27-SN04', 'in stock', 19, 1),
('DELLU27-SN05', 'in stock', 19, 1),
('DELLU27-SN06', 'in stock', 19, 1),
('DELLU27-SN07', 'in stock', 19, 1),
('DELLU27-SN08', 'in stock', 19, 1),
('DELLU27-SN09', 'in stock', 19, 1),
('DELLU27-SN10', 'in stock', 19, 1),
('DELLXPS-SN01', 'in stock', 8, 1),
('DELLXPS-SN02', 'in stock', 8, 1),
('DELLXPS-SN03', 'in stock', 8, 1),
('DELLXPS-SN04', 'in stock', 8, 1),
('DELLXPS-SN05', 'in stock', 8, 1),
('DELLXPS-SN06', 'in stock', 8, 1),
('DELLXPS-SN07', 'in stock', 8, 1),
('DELLXPS-SN08', 'in stock', 8, 1),
('DELLXPS-SN09', 'in stock', 8, 1),
('DELLXPS-SN10', 'in stock', 8, 1),
('GARF7X-SN01', 'in stock', 28, 1),
('GARF7X-SN02', 'in stock', 28, 1),
('GARF7X-SN03', 'in stock', 28, 1),
('GARF7X-SN04', 'in stock', 28, 1),
('GARF7X-SN05', 'in stock', 28, 1),
('GARF7X-SN06', 'in stock', 28, 1),
('GARF7X-SN07', 'in stock', 28, 1),
('GARF7X-SN08', 'in stock', 28, 1),
('GARF7X-SN09', 'in stock', 28, 1),
('GARF7X-SN10', 'in stock', 28, 1),
('GARFR265-SN01', 'in stock', 30, 1),
('GARFR265-SN02', 'in stock', 30, 1),
('GARFR265-SN03', 'in stock', 30, 1),
('GARFR265-SN04', 'in stock', 30, 1),
('GARFR265-SN05', 'in stock', 30, 1),
('GARFR265-SN06', 'in stock', 30, 1),
('GARFR265-SN07', 'in stock', 30, 1),
('GARFR265-SN08', 'in stock', 30, 1),
('GARFR265-SN09', 'in stock', 30, 1),
('GARFR265-SN10', 'in stock', 30, 1),
('GW6C-SN01', 'in stock', 27, 1),
('GW6C-SN02', 'in stock', 27, 1),
('GW6C-SN03', 'in stock', 27, 1),
('GW6C-SN04', 'in stock', 27, 1),
('GW6C-SN05', 'in stock', 27, 1),
('GW6C-SN06', 'in stock', 27, 1),
('GW6C-SN07', 'in stock', 27, 1),
('GW6C-SN08', 'in stock', 27, 1),
('GW6C-SN09', 'in stock', 27, 1),
('GW6C-SN10', 'in stock', 27, 1),
('IP15-001', 'sold', 1, 2),
('IP15-002', 'in stock', 1, 2),
('IP15-003', 'in stock', 1, 2),
('IP15-004', 'in stock', 1, 2),
('IPADAIR6-SN01', 'in stock', 23, 1),
('IPADAIR6-SN02', 'in stock', 23, 1),
('IPADAIR6-SN03', 'in stock', 23, 1),
('IPADAIR6-SN04', 'in stock', 23, 1),
('IPADAIR6-SN05', 'in stock', 23, 1),
('IPADAIR6-SN06', 'in stock', 23, 1),
('IPADAIR6-SN07', 'in stock', 23, 1),
('IPADAIR6-SN08', 'in stock', 23, 1),
('IPADAIR6-SN09', 'in stock', 23, 1),
('IPADAIR6-SN10', 'in stock', 23, 1),
('IPADM4-SN01', 'in stock', 21, 1),
('IPADM4-SN02', 'in stock', 21, 1),
('IPADM4-SN03', 'in stock', 21, 1),
('IPADM4-SN04', 'in stock', 21, 1),
('IPADM4-SN05', 'in stock', 21, 1),
('IPADM4-SN06', 'in stock', 21, 1),
('IPADM4-SN07', 'in stock', 21, 1),
('IPADM4-SN08', 'in stock', 21, 1),
('IPADM4-SN09', 'in stock', 21, 1),
('IPADM4-SN10', 'in stock', 21, 1),
('IPH14-SN01', 'in stock', 3, 1),
('IPH14-SN02', 'in stock', 3, 1),
('IPH14-SN03', 'in stock', 3, 1),
('IPH14-SN04', 'in stock', 3, 1),
('IPH14-SN05', 'in stock', 3, 1),
('IPH14-SN06', 'in stock', 3, 1),
('IPH14-SN07', 'in stock', 3, 1),
('IPH14-SN08', 'in stock', 3, 1),
('IPH14-SN09', 'in stock', 3, 1),
('IPH14-SN10', 'in stock', 3, 1),
('IPH15PM-SN01', 'in stock', 1, 1),
('IPH15PM-SN02', 'in stock', 1, 1),
('IPH15PM-SN03', 'in stock', 1, 1),
('IPH15PM-SN04', 'in stock', 1, 1),
('IPH15PM-SN05', 'in stock', 1, 1),
('IPH15PM-SN06', 'in stock', 1, 1),
('IPH15PM-SN07', 'in stock', 1, 1),
('IPH15PM-SN08', 'in stock', 1, 1),
('IPH15PM-SN09', 'in stock', 1, 1),
('IPH15PM-SN10', 'in stock', 1, 1),
('JBLCHG5-SN01', 'in stock', 14, 1),
('JBLCHG5-SN02', 'in stock', 14, 1),
('JBLCHG5-SN03', 'in stock', 14, 1),
('JBLCHG5-SN04', 'in stock', 14, 1),
('JBLCHG5-SN05', 'in stock', 14, 1),
('JBLCHG5-SN06', 'in stock', 14, 1),
('JBLCHG5-SN07', 'in stock', 14, 1),
('JBLCHG5-SN08', 'in stock', 14, 1),
('JBLCHG5-SN09', 'in stock', 14, 1),
('JBLCHG5-SN10', 'in stock', 14, 1),
('KEYQ1P-SN01', 'in stock', 17, 1),
('KEYQ1P-SN02', 'in stock', 17, 1),
('KEYQ1P-SN03', 'in stock', 17, 1),
('KEYQ1P-SN04', 'in stock', 17, 1),
('KEYQ1P-SN05', 'in stock', 17, 1),
('KEYQ1P-SN06', 'in stock', 17, 1),
('KEYQ1P-SN07', 'in stock', 17, 1),
('KEYQ1P-SN08', 'in stock', 17, 1),
('KEYQ1P-SN09', 'in stock', 17, 1),
('KEYQ1P-SN10', 'in stock', 17, 1),
('LOGIG102-SN01', 'in stock', 18, 1),
('LOGIG102-SN02', 'in stock', 18, 1),
('LOGIG102-SN03', 'in stock', 18, 1),
('LOGIG102-SN04', 'in stock', 18, 1),
('LOGIG102-SN05', 'in stock', 18, 1),
('LOGIG102-SN06', 'in stock', 18, 1),
('LOGIG102-SN07', 'in stock', 18, 1),
('LOGIG102-SN08', 'in stock', 18, 1),
('LOGIG102-SN09', 'in stock', 18, 1),
('LOGIG102-SN10', 'in stock', 18, 1),
('MACSTUDIO-SN01', 'in stock', 31, 1),
('MACSTUDIO-SN02', 'in stock', 31, 1),
('MACSTUDIO-SN03', 'in stock', 31, 1),
('MACSTUDIO-SN04', 'in stock', 31, 1),
('MACSTUDIO-SN05', 'in stock', 31, 1),
('MACSTUDIO-SN06', 'in stock', 31, 1),
('MACSTUDIO-SN07', 'in stock', 31, 1),
('MACSTUDIO-SN08', 'in stock', 31, 1),
('MACSTUDIO-SN09', 'in stock', 31, 1),
('MACSTUDIO-SN10', 'in stock', 31, 1),
('MAREMB2-SN01', 'in stock', 13, 1),
('MAREMB2-SN02', 'in stock', 13, 1),
('MAREMB2-SN03', 'in stock', 13, 1),
('MAREMB2-SN04', 'in stock', 13, 1),
('MAREMB2-SN05', 'in stock', 13, 1),
('MAREMB2-SN06', 'in stock', 13, 1),
('MAREMB2-SN07', 'in stock', 13, 1),
('MAREMB2-SN08', 'in stock', 13, 1),
('MAREMB2-SN09', 'in stock', 13, 1),
('MAREMB2-SN10', 'in stock', 13, 1),
('MBAM2-SN01', 'in stock', 6, 1),
('MBAM2-SN02', 'in stock', 6, 1),
('MBAM2-SN03', 'in stock', 6, 1),
('MBAM2-SN04', 'in stock', 6, 1),
('MBAM2-SN05', 'in stock', 6, 1),
('MBAM2-SN06', 'in stock', 6, 1),
('MBAM2-SN07', 'in stock', 6, 1),
('MBAM2-SN08', 'in stock', 6, 1),
('MBAM2-SN09', 'in stock', 6, 1),
('MBAM2-SN10', 'in stock', 6, 1),
('MBPM3-SN01', 'in stock', 7, 1),
('MBPM3-SN02', 'in stock', 7, 1),
('MBPM3-SN03', 'in stock', 7, 1),
('MBPM3-SN04', 'in stock', 7, 1),
('MBPM3-SN05', 'in stock', 7, 1),
('MBPM3-SN06', 'in stock', 7, 1),
('MBPM3-SN07', 'in stock', 7, 1),
('MBPM3-SN08', 'in stock', 7, 1),
('MBPM3-SN09', 'in stock', 7, 1),
('MBPM3-SN10', 'in stock', 7, 1),
('MXM3S-SN01', 'in stock', 16, 1),
('MXM3S-SN02', 'in stock', 16, 1),
('MXM3S-SN03', 'in stock', 16, 1),
('MXM3S-SN04', 'in stock', 16, 1),
('MXM3S-SN05', 'in stock', 16, 1),
('MXM3S-SN06', 'in stock', 16, 1),
('MXM3S-SN07', 'in stock', 16, 1),
('MXM3S-SN08', 'in stock', 16, 1),
('MXM3S-SN09', 'in stock', 16, 1),
('MXM3S-SN10', 'in stock', 16, 1),
('ODYSSEYG9-SN01', 'in stock', 32, 1),
('ODYSSEYG9-SN02', 'in stock', 32, 1),
('ODYSSEYG9-SN03', 'in stock', 32, 1),
('ODYSSEYG9-SN04', 'in stock', 32, 1),
('ODYSSEYG9-SN05', 'in stock', 32, 1),
('ODYSSEYG9-SN06', 'in stock', 32, 1),
('ODYSSEYG9-SN07', 'in stock', 32, 1),
('ODYSSEYG9-SN08', 'in stock', 32, 1),
('ODYSSEYG9-SN09', 'in stock', 32, 1),
('ODYSSEYG9-SN10', 'in stock', 32, 1),
('ROGG14-SN01', 'in stock', 9, 1),
('ROGG14-SN02', 'in stock', 9, 1),
('ROGG14-SN03', 'in stock', 9, 1),
('ROGG14-SN04', 'in stock', 9, 1),
('ROGG14-SN05', 'in stock', 9, 1),
('ROGG14-SN06', 'in stock', 9, 1),
('ROGG14-SN07', 'in stock', 9, 1),
('ROGG14-SN08', 'in stock', 9, 1),
('ROGG14-SN09', 'in stock', 9, 1),
('ROGG14-SN10', 'in stock', 9, 1),
('SONYXM4-SN01', 'in stock', 34, 1),
('SONYXM4-SN02', 'in stock', 34, 1),
('SONYXM4-SN03', 'in stock', 34, 1),
('SONYXM4-SN04', 'in stock', 34, 1),
('SONYXM4-SN05', 'in stock', 34, 1),
('SONYXM4-SN06', 'in stock', 34, 1),
('SONYXM4-SN07', 'in stock', 34, 1),
('SONYXM4-SN08', 'in stock', 34, 1),
('SONYXM4-SN09', 'in stock', 34, 1),
('SONYXM4-SN10', 'in stock', 34, 1),
('SONYXM5-SN01', 'in stock', 12, 1),
('SONYXM5-SN02', 'in stock', 12, 1),
('SONYXM5-SN03', 'in stock', 12, 1),
('SONYXM5-SN04', 'in stock', 12, 1),
('SONYXM5-SN05', 'in stock', 12, 1),
('SONYXM5-SN06', 'in stock', 12, 1),
('SONYXM5-SN07', 'in stock', 12, 1),
('SONYXM5-SN08', 'in stock', 12, 1),
('SONYXM5-SN09', 'in stock', 12, 1),
('SONYXM5-SN10', 'in stock', 12, 1),
('SS24U-SN01', 'in stock', 2, 1),
('SS24U-SN02', 'in stock', 2, 1),
('SS24U-SN03', 'in stock', 2, 1),
('SS24U-SN04', 'in stock', 2, 1),
('SS24U-SN05', 'in stock', 2, 1),
('SS24U-SN06', 'in stock', 2, 1),
('SS24U-SN07', 'in stock', 2, 1),
('SS24U-SN08', 'in stock', 2, 1),
('SS24U-SN09', 'in stock', 2, 1),
('SS24U-SN10', 'in stock', 2, 1),
('SURF9-SN01', 'in stock', 25, 1),
('SURF9-SN02', 'in stock', 25, 1),
('SURF9-SN03', 'in stock', 25, 1),
('SURF9-SN04', 'in stock', 25, 1),
('SURF9-SN05', 'in stock', 25, 1),
('SURF9-SN06', 'in stock', 25, 1),
('SURF9-SN07', 'in stock', 25, 1),
('SURF9-SN08', 'in stock', 25, 1),
('SURF9-SN09', 'in stock', 25, 1),
('SURF9-SN10', 'in stock', 25, 1),
('TABS9-SN01', 'in stock', 22, 1),
('TABS9-SN02', 'in stock', 22, 1),
('TABS9-SN03', 'in stock', 22, 1),
('TABS9-SN04', 'in stock', 22, 1),
('TABS9-SN05', 'in stock', 22, 1),
('TABS9-SN06', 'in stock', 22, 1),
('TABS9-SN07', 'in stock', 22, 1),
('TABS9-SN08', 'in stock', 22, 1),
('TABS9-SN09', 'in stock', 22, 1),
('TABS9-SN10', 'in stock', 22, 1),
('THINKX1-SN01', 'in stock', 10, 1),
('THINKX1-SN02', 'in stock', 10, 1),
('THINKX1-SN03', 'in stock', 10, 1),
('THINKX1-SN04', 'in stock', 10, 1),
('THINKX1-SN05', 'in stock', 10, 1),
('THINKX1-SN06', 'in stock', 10, 1),
('THINKX1-SN07', 'in stock', 10, 1),
('THINKX1-SN08', 'in stock', 10, 1),
('THINKX1-SN09', 'in stock', 10, 1),
('THINKX1-SN10', 'in stock', 10, 1),
('TRACKPAD-SN01', 'in stock', 20, 1),
('TRACKPAD-SN02', 'in stock', 20, 1),
('TRACKPAD-SN03', 'in stock', 20, 1),
('TRACKPAD-SN04', 'in stock', 20, 1),
('TRACKPAD-SN05', 'in stock', 20, 1),
('TRACKPAD-SN06', 'in stock', 20, 1),
('TRACKPAD-SN07', 'in stock', 20, 1),
('TRACKPAD-SN08', 'in stock', 20, 1),
('TRACKPAD-SN09', 'in stock', 20, 1),
('TRACKPAD-SN10', 'in stock', 20, 1),
('XIA14-SN01', 'in stock', 4, 1),
('XIA14-SN02', 'in stock', 4, 1),
('XIA14-SN03', 'in stock', 4, 1),
('XIA14-SN04', 'in stock', 4, 1),
('XIA14-SN05', 'in stock', 4, 1),
('XIA14-SN06', 'in stock', 4, 1),
('XIA14-SN07', 'in stock', 4, 1),
('XIA14-SN08', 'in stock', 4, 1),
('XIA14-SN09', 'in stock', 4, 1),
('XIA14-SN10', 'in stock', 4, 1),
('XIAPAD6-SN01', 'in stock', 24, 1),
('XIAPAD6-SN02', 'in stock', 24, 1),
('XIAPAD6-SN03', 'in stock', 24, 1),
('XIAPAD6-SN04', 'in stock', 24, 1),
('XIAPAD6-SN05', 'in stock', 24, 1),
('XIAPAD6-SN06', 'in stock', 24, 1),
('XIAPAD6-SN07', 'in stock', 24, 1),
('XIAPAD6-SN08', 'in stock', 24, 1),
('XIAPAD6-SN09', 'in stock', 24, 1),
('XIAPAD6-SN10', 'in stock', 24, 1),
('ZFOLD5-SN01', 'in stock', 5, 1),
('ZFOLD5-SN02', 'in stock', 5, 1),
('ZFOLD5-SN03', 'in stock', 5, 1),
('ZFOLD5-SN04', 'in stock', 5, 1),
('ZFOLD5-SN05', 'in stock', 5, 1),
('ZFOLD5-SN06', 'in stock', 5, 1),
('ZFOLD5-SN07', 'in stock', 5, 1),
('ZFOLD5-SN08', 'in stock', 5, 1),
('ZFOLD5-SN09', 'in stock', 5, 1),
('ZFOLD5-SN10', 'in stock', 5, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `staffs`
--

CREATE TABLE `staffs` (
  `id` bigint NOT NULL,
  `type` enum('manager','sales','warehouse','technical') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `work_status` enum('working','resigned','on_leave') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `basic_salary` decimal(38,2) DEFAULT NULL,
  `allowance` decimal(38,2) DEFAULT NULL,
  `bonus` decimal(38,2) DEFAULT NULL,
  `deduction` decimal(38,2) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `branch_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `staffs`
--

INSERT INTO `staffs` (`id`, `type`, `work_status`, `description`, `basic_salary`, `allowance`, `bonus`, `deduction`, `user_id`, `branch_id`) VALUES
(1, 'manager', 'working', NULL, 30000000.00, 1000000.00, 500000.00, NULL, 1, 1),
(2, 'manager', 'working', NULL, 15000000.00, 500000.00, NULL, NULL, 2, 1),
(3, 'manager', 'working', NULL, 15000000.00, 500000.00, NULL, NULL, 3, 2),
(4, 'manager', 'working', NULL, 15000000.00, 500000.00, NULL, NULL, 4, 3),
(5, 'manager', 'working', NULL, 15000000.00, 500000.00, NULL, NULL, 5, 4),
(6, 'manager', 'working', NULL, 15000000.00, 500000.00, NULL, NULL, 6, 5),
(7, 'manager', 'working', NULL, 15000000.00, 500000.00, NULL, NULL, 7, 7),
(8, 'manager', 'working', NULL, 15000000.00, 500000.00, NULL, NULL, 8, 10),
(9, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 9, 1),
(10, 'warehouse', 'resigned', NULL, NULL, NULL, NULL, NULL, 10, 1),
(11, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 11, 1),
(12, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 12, 1),
(13, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 13, 1),
(14, 'technical', 'working', NULL, NULL, NULL, NULL, NULL, 14, 1),
(15, 'technical', 'working', NULL, NULL, NULL, NULL, NULL, 15, 1),
(16, 'technical', 'working', NULL, NULL, NULL, NULL, NULL, 16, 1),
(17, 'technical', 'working', NULL, NULL, NULL, NULL, NULL, 17, 1),
(18, 'technical', 'working', NULL, NULL, NULL, NULL, NULL, 18, 1),
(19, 'warehouse', 'working', NULL, 10000000.00, NULL, NULL, NULL, 19, 2),
(20, 'warehouse', 'working', NULL, 10000000.00, NULL, NULL, NULL, 20, 2),
(21, 'warehouse', 'working', NULL, 5000000.00, NULL, NULL, NULL, 21, 2),
(22, 'sales', 'working', NULL, 10000000.00, NULL, NULL, NULL, 22, 2),
(23, 'sales', 'working', NULL, 8000000.00, NULL, NULL, NULL, 23, 2),
(24, 'sales', 'working', NULL, 3000000.00, NULL, NULL, NULL, 24, 2),
(25, 'sales', 'working', NULL, 3000000.00, NULL, NULL, NULL, 25, 2),
(26, 'sales', 'working', NULL, 7000000.00, 500000.00, NULL, NULL, 26, 2),
(27, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 27, 3),
(28, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 28, 3),
(29, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 29, 3),
(30, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 30, 3),
(31, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 31, 3),
(32, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 32, 3),
(33, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 33, 3),
(34, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 34, 3),
(35, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 35, 4),
(36, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 36, 4),
(37, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 37, 4),
(38, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 38, 4),
(39, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 39, 4),
(40, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 40, 4),
(41, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 41, 4),
(42, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 42, 4),
(43, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 43, 5),
(44, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 44, 5),
(45, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 45, 5),
(46, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 46, 5),
(47, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 47, 5),
(48, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 48, 5),
(49, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 49, 5),
(50, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 50, 5),
(51, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 51, 7),
(52, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 52, 7),
(53, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 53, 7),
(54, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 54, 7),
(55, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 55, 7),
(56, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 56, 7),
(57, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 57, 7),
(58, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 58, 8),
(59, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 59, 8),
(60, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 60, 8),
(61, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 61, 8),
(62, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 62, 8),
(63, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 63, 8),
(64, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 64, 8),
(65, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 65, 8),
(66, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 66, 10),
(67, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 67, 10),
(68, 'warehouse', 'working', NULL, NULL, NULL, NULL, NULL, 68, 10),
(69, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 69, 10),
(70, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 70, 10),
(71, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 71, 10),
(72, 'sales', 'working', NULL, NULL, NULL, NULL, NULL, 72, 10);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `stock_documents`
--

CREATE TABLE `stock_documents` (
  `id` bigint NOT NULL,
  `status` enum('pending','completed','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `type` enum('import','export') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `branch_id` bigint NOT NULL,
  `staff_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `stock_documents`
--

INSERT INTO `stock_documents` (`id`, `status`, `created_at`, `type`, `note`, `branch_id`, `staff_id`) VALUES
(1, 'completed', '2026-06-09 07:49:28', 'import', 'Nhập kho tháng 3/2026', 2, 3),
(2, 'completed', '2026-06-12 18:19:25', 'import', 'Nhập kho khởi tạo', 1, 1),
(3, 'pending', '2026-06-14 16:07:38', 'export', '1', 1, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `stock_document_details`
--

CREATE TABLE `stock_document_details` (
  `id` bigint NOT NULL,
  `quantity` bigint NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `product_id` bigint NOT NULL,
  `document_id` bigint NOT NULL,
  `product_item_serial` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `stock_document_details`
--

INSERT INTO `stock_document_details` (`id`, `quantity`, `price`, `product_id`, `document_id`, `product_item_serial`) VALUES
(1, 1, 25000000.00, 1, 1, 'IP15-001'),
(2, 1, 25000000.00, 1, 1, 'IP15-002'),
(3, 1, 25000000.00, 1, 1, 'IP15-003'),
(4, 1, 25000000.00, 1, 1, 'IP15-004'),
(5, 1, 25000000.00, 1, 1, 'IP15-004'),
(6, 1, 29990000.00, 1, 2, 'IPH15PM-SN01'),
(7, 1, 29990000.00, 1, 2, 'IPH15PM-SN02'),
(8, 1, 29990000.00, 1, 2, 'IPH15PM-SN03'),
(9, 1, 29990000.00, 1, 2, 'IPH15PM-SN04'),
(10, 1, 29990000.00, 1, 2, 'IPH15PM-SN05'),
(11, 1, 29990000.00, 1, 2, 'IPH15PM-SN06'),
(12, 1, 29990000.00, 1, 2, 'IPH15PM-SN07'),
(13, 1, 29990000.00, 1, 2, 'IPH15PM-SN08'),
(14, 1, 29990000.00, 1, 2, 'IPH15PM-SN09'),
(15, 1, 29990000.00, 1, 2, 'IPH15PM-SN10'),
(16, 1, 33490000.00, 2, 2, 'SS24U-SN01'),
(17, 1, 33490000.00, 2, 2, 'SS24U-SN02'),
(18, 1, 33490000.00, 2, 2, 'SS24U-SN03'),
(19, 1, 33490000.00, 2, 2, 'SS24U-SN04'),
(20, 1, 33490000.00, 2, 2, 'SS24U-SN05'),
(21, 1, 33490000.00, 2, 2, 'SS24U-SN06'),
(22, 1, 33490000.00, 2, 2, 'SS24U-SN07'),
(23, 1, 33490000.00, 2, 2, 'SS24U-SN08'),
(24, 1, 33490000.00, 2, 2, 'SS24U-SN09'),
(25, 1, 33490000.00, 2, 2, 'SS24U-SN10'),
(26, 1, 18500000.00, 3, 2, 'IPH14-SN01'),
(27, 1, 18500000.00, 3, 2, 'IPH14-SN02'),
(28, 1, 18500000.00, 3, 2, 'IPH14-SN03'),
(29, 1, 18500000.00, 3, 2, 'IPH14-SN04'),
(30, 1, 18500000.00, 3, 2, 'IPH14-SN05'),
(31, 1, 18500000.00, 3, 2, 'IPH14-SN06'),
(32, 1, 18500000.00, 3, 2, 'IPH14-SN07'),
(33, 1, 18500000.00, 3, 2, 'IPH14-SN08'),
(34, 1, 18500000.00, 3, 2, 'IPH14-SN09'),
(35, 1, 18500000.00, 3, 2, 'IPH14-SN10'),
(36, 1, 19990000.00, 4, 2, 'XIA14-SN01'),
(37, 1, 19990000.00, 4, 2, 'XIA14-SN02'),
(38, 1, 19990000.00, 4, 2, 'XIA14-SN03'),
(39, 1, 19990000.00, 4, 2, 'XIA14-SN04'),
(40, 1, 19990000.00, 4, 2, 'XIA14-SN05'),
(41, 1, 19990000.00, 4, 2, 'XIA14-SN06'),
(42, 1, 19990000.00, 4, 2, 'XIA14-SN07'),
(43, 1, 19990000.00, 4, 2, 'XIA14-SN08'),
(44, 1, 19990000.00, 4, 2, 'XIA14-SN09'),
(45, 1, 19990000.00, 4, 2, 'XIA14-SN10'),
(46, 1, 35990000.00, 5, 2, 'ZFOLD5-SN01'),
(47, 1, 35990000.00, 5, 2, 'ZFOLD5-SN02'),
(48, 1, 35990000.00, 5, 2, 'ZFOLD5-SN03'),
(49, 1, 35990000.00, 5, 2, 'ZFOLD5-SN04'),
(50, 1, 35990000.00, 5, 2, 'ZFOLD5-SN05'),
(51, 1, 35990000.00, 5, 2, 'ZFOLD5-SN06'),
(52, 1, 35990000.00, 5, 2, 'ZFOLD5-SN07'),
(53, 1, 35990000.00, 5, 2, 'ZFOLD5-SN08'),
(54, 1, 35990000.00, 5, 2, 'ZFOLD5-SN09'),
(55, 1, 35990000.00, 5, 2, 'ZFOLD5-SN10'),
(56, 1, 24500000.00, 6, 2, 'MBAM2-SN01'),
(57, 1, 24500000.00, 6, 2, 'MBAM2-SN02'),
(58, 1, 24500000.00, 6, 2, 'MBAM2-SN03'),
(59, 1, 24500000.00, 6, 2, 'MBAM2-SN04'),
(60, 1, 24500000.00, 6, 2, 'MBAM2-SN05'),
(61, 1, 24500000.00, 6, 2, 'MBAM2-SN06'),
(62, 1, 24500000.00, 6, 2, 'MBAM2-SN07'),
(63, 1, 24500000.00, 6, 2, 'MBAM2-SN08'),
(64, 1, 24500000.00, 6, 2, 'MBAM2-SN09'),
(65, 1, 24500000.00, 6, 2, 'MBAM2-SN10'),
(66, 1, 49990000.00, 7, 2, 'MBPM3-SN01'),
(67, 1, 49990000.00, 7, 2, 'MBPM3-SN02'),
(68, 1, 49990000.00, 7, 2, 'MBPM3-SN03'),
(69, 1, 49990000.00, 7, 2, 'MBPM3-SN04'),
(70, 1, 49990000.00, 7, 2, 'MBPM3-SN05'),
(71, 1, 49990000.00, 7, 2, 'MBPM3-SN06'),
(72, 1, 49990000.00, 7, 2, 'MBPM3-SN07'),
(73, 1, 49990000.00, 7, 2, 'MBPM3-SN08'),
(74, 1, 49990000.00, 7, 2, 'MBPM3-SN09'),
(75, 1, 49990000.00, 7, 2, 'MBPM3-SN10'),
(76, 1, 45000000.00, 8, 2, 'DELLXPS-SN01'),
(77, 1, 45000000.00, 8, 2, 'DELLXPS-SN02'),
(78, 1, 45000000.00, 8, 2, 'DELLXPS-SN03'),
(79, 1, 45000000.00, 8, 2, 'DELLXPS-SN04'),
(80, 1, 45000000.00, 8, 2, 'DELLXPS-SN05'),
(81, 1, 45000000.00, 8, 2, 'DELLXPS-SN06'),
(82, 1, 45000000.00, 8, 2, 'DELLXPS-SN07'),
(83, 1, 45000000.00, 8, 2, 'DELLXPS-SN08'),
(84, 1, 45000000.00, 8, 2, 'DELLXPS-SN09'),
(85, 1, 45000000.00, 8, 2, 'DELLXPS-SN10'),
(86, 1, 38990000.00, 9, 2, 'ROGG14-SN01'),
(87, 1, 38990000.00, 9, 2, 'ROGG14-SN02'),
(88, 1, 38990000.00, 9, 2, 'ROGG14-SN03'),
(89, 1, 38990000.00, 9, 2, 'ROGG14-SN04'),
(90, 1, 38990000.00, 9, 2, 'ROGG14-SN05'),
(91, 1, 38990000.00, 9, 2, 'ROGG14-SN06'),
(92, 1, 38990000.00, 9, 2, 'ROGG14-SN07'),
(93, 1, 38990000.00, 9, 2, 'ROGG14-SN08'),
(94, 1, 38990000.00, 9, 2, 'ROGG14-SN09'),
(95, 1, 38990000.00, 9, 2, 'ROGG14-SN10'),
(96, 1, 42500000.00, 10, 2, 'THINKX1-SN01'),
(97, 1, 42500000.00, 10, 2, 'THINKX1-SN02'),
(98, 1, 42500000.00, 10, 2, 'THINKX1-SN03'),
(99, 1, 42500000.00, 10, 2, 'THINKX1-SN04'),
(100, 1, 42500000.00, 10, 2, 'THINKX1-SN05'),
(101, 1, 42500000.00, 10, 2, 'THINKX1-SN06'),
(102, 1, 42500000.00, 10, 2, 'THINKX1-SN07'),
(103, 1, 42500000.00, 10, 2, 'THINKX1-SN08'),
(104, 1, 42500000.00, 10, 2, 'THINKX1-SN09'),
(105, 1, 42500000.00, 10, 2, 'THINKX1-SN10'),
(106, 1, 5890000.00, 11, 2, 'APPRO2-SN01'),
(107, 1, 5890000.00, 11, 2, 'APPRO2-SN02'),
(108, 1, 5890000.00, 11, 2, 'APPRO2-SN03'),
(109, 1, 5890000.00, 11, 2, 'APPRO2-SN04'),
(110, 1, 5890000.00, 11, 2, 'APPRO2-SN05'),
(111, 1, 5890000.00, 11, 2, 'APPRO2-SN06'),
(112, 1, 5890000.00, 11, 2, 'APPRO2-SN07'),
(113, 1, 5890000.00, 11, 2, 'APPRO2-SN08'),
(114, 1, 5890000.00, 11, 2, 'APPRO2-SN09'),
(115, 1, 5890000.00, 11, 2, 'APPRO2-SN10'),
(116, 1, 7490000.00, 12, 2, 'SONYXM5-SN01'),
(117, 1, 7490000.00, 12, 2, 'SONYXM5-SN02'),
(118, 1, 7490000.00, 12, 2, 'SONYXM5-SN03'),
(119, 1, 7490000.00, 12, 2, 'SONYXM5-SN04'),
(120, 1, 7490000.00, 12, 2, 'SONYXM5-SN05'),
(121, 1, 7490000.00, 12, 2, 'SONYXM5-SN06'),
(122, 1, 7490000.00, 12, 2, 'SONYXM5-SN07'),
(123, 1, 7490000.00, 12, 2, 'SONYXM5-SN08'),
(124, 1, 7490000.00, 12, 2, 'SONYXM5-SN09'),
(125, 1, 7490000.00, 12, 2, 'SONYXM5-SN10'),
(126, 1, 3990000.00, 13, 2, 'MAREMB2-SN01'),
(127, 1, 3990000.00, 13, 2, 'MAREMB2-SN02'),
(128, 1, 3990000.00, 13, 2, 'MAREMB2-SN03'),
(129, 1, 3990000.00, 13, 2, 'MAREMB2-SN04'),
(130, 1, 3990000.00, 13, 2, 'MAREMB2-SN05'),
(131, 1, 3990000.00, 13, 2, 'MAREMB2-SN06'),
(132, 1, 3990000.00, 13, 2, 'MAREMB2-SN07'),
(133, 1, 3990000.00, 13, 2, 'MAREMB2-SN08'),
(134, 1, 3990000.00, 13, 2, 'MAREMB2-SN09'),
(135, 1, 3990000.00, 13, 2, 'MAREMB2-SN10'),
(136, 1, 3290000.00, 14, 2, 'JBLCHG5-SN01'),
(137, 1, 3290000.00, 14, 2, 'JBLCHG5-SN02'),
(138, 1, 3290000.00, 14, 2, 'JBLCHG5-SN03'),
(139, 1, 3290000.00, 14, 2, 'JBLCHG5-SN04'),
(140, 1, 3290000.00, 14, 2, 'JBLCHG5-SN05'),
(141, 1, 3290000.00, 14, 2, 'JBLCHG5-SN06'),
(142, 1, 3290000.00, 14, 2, 'JBLCHG5-SN07'),
(143, 1, 3290000.00, 14, 2, 'JBLCHG5-SN08'),
(144, 1, 3290000.00, 14, 2, 'JBLCHG5-SN09'),
(145, 1, 3290000.00, 14, 2, 'JBLCHG5-SN10'),
(146, 1, 2990000.00, 15, 2, 'BUDS2P-SN01'),
(147, 1, 2990000.00, 15, 2, 'BUDS2P-SN02'),
(148, 1, 2990000.00, 15, 2, 'BUDS2P-SN03'),
(149, 1, 2990000.00, 15, 2, 'BUDS2P-SN04'),
(150, 1, 2990000.00, 15, 2, 'BUDS2P-SN05'),
(151, 1, 2990000.00, 15, 2, 'BUDS2P-SN06'),
(152, 1, 2990000.00, 15, 2, 'BUDS2P-SN07'),
(153, 1, 2990000.00, 15, 2, 'BUDS2P-SN08'),
(154, 1, 2990000.00, 15, 2, 'BUDS2P-SN09'),
(155, 1, 2990000.00, 15, 2, 'BUDS2P-SN10'),
(156, 1, 2490000.00, 16, 2, 'MXM3S-SN01'),
(157, 1, 2490000.00, 16, 2, 'MXM3S-SN02'),
(158, 1, 2490000.00, 16, 2, 'MXM3S-SN03'),
(159, 1, 2490000.00, 16, 2, 'MXM3S-SN04'),
(160, 1, 2490000.00, 16, 2, 'MXM3S-SN05'),
(161, 1, 2490000.00, 16, 2, 'MXM3S-SN06'),
(162, 1, 2490000.00, 16, 2, 'MXM3S-SN07'),
(163, 1, 2490000.00, 16, 2, 'MXM3S-SN08'),
(164, 1, 2490000.00, 16, 2, 'MXM3S-SN09'),
(165, 1, 2490000.00, 16, 2, 'MXM3S-SN10'),
(166, 1, 4500000.00, 17, 2, 'KEYQ1P-SN01'),
(167, 1, 4500000.00, 17, 2, 'KEYQ1P-SN02'),
(168, 1, 4500000.00, 17, 2, 'KEYQ1P-SN03'),
(169, 1, 4500000.00, 17, 2, 'KEYQ1P-SN04'),
(170, 1, 4500000.00, 17, 2, 'KEYQ1P-SN05'),
(171, 1, 4500000.00, 17, 2, 'KEYQ1P-SN06'),
(172, 1, 4500000.00, 17, 2, 'KEYQ1P-SN07'),
(173, 1, 4500000.00, 17, 2, 'KEYQ1P-SN08'),
(174, 1, 4500000.00, 17, 2, 'KEYQ1P-SN09'),
(175, 1, 4500000.00, 17, 2, 'KEYQ1P-SN10'),
(176, 1, 390000.00, 18, 2, 'LOGIG102-SN01'),
(177, 1, 390000.00, 18, 2, 'LOGIG102-SN02'),
(178, 1, 390000.00, 18, 2, 'LOGIG102-SN03'),
(179, 1, 390000.00, 18, 2, 'LOGIG102-SN04'),
(180, 1, 390000.00, 18, 2, 'LOGIG102-SN05'),
(181, 1, 390000.00, 18, 2, 'LOGIG102-SN06'),
(182, 1, 390000.00, 18, 2, 'LOGIG102-SN07'),
(183, 1, 390000.00, 18, 2, 'LOGIG102-SN08'),
(184, 1, 390000.00, 18, 2, 'LOGIG102-SN09'),
(185, 1, 390000.00, 18, 2, 'LOGIG102-SN10'),
(186, 1, 14500000.00, 19, 2, 'DELLU27-SN01'),
(187, 1, 14500000.00, 19, 2, 'DELLU27-SN02'),
(188, 1, 14500000.00, 19, 2, 'DELLU27-SN03'),
(189, 1, 14500000.00, 19, 2, 'DELLU27-SN04'),
(190, 1, 14500000.00, 19, 2, 'DELLU27-SN05'),
(191, 1, 14500000.00, 19, 2, 'DELLU27-SN06'),
(192, 1, 14500000.00, 19, 2, 'DELLU27-SN07'),
(193, 1, 14500000.00, 19, 2, 'DELLU27-SN08'),
(194, 1, 14500000.00, 19, 2, 'DELLU27-SN09'),
(195, 1, 14500000.00, 19, 2, 'DELLU27-SN10'),
(196, 1, 2990000.00, 20, 2, 'TRACKPAD-SN01'),
(197, 1, 2990000.00, 20, 2, 'TRACKPAD-SN02'),
(198, 1, 2990000.00, 20, 2, 'TRACKPAD-SN03'),
(199, 1, 2990000.00, 20, 2, 'TRACKPAD-SN04'),
(200, 1, 2990000.00, 20, 2, 'TRACKPAD-SN05'),
(201, 1, 2990000.00, 20, 2, 'TRACKPAD-SN06'),
(202, 1, 2990000.00, 20, 2, 'TRACKPAD-SN07'),
(203, 1, 2990000.00, 20, 2, 'TRACKPAD-SN08'),
(204, 1, 2990000.00, 20, 2, 'TRACKPAD-SN09'),
(205, 1, 2990000.00, 20, 2, 'TRACKPAD-SN10'),
(206, 1, 28500000.00, 21, 2, 'IPADM4-SN01'),
(207, 1, 28500000.00, 21, 2, 'IPADM4-SN02'),
(208, 1, 28500000.00, 21, 2, 'IPADM4-SN03'),
(209, 1, 28500000.00, 21, 2, 'IPADM4-SN04'),
(210, 1, 28500000.00, 21, 2, 'IPADM4-SN05'),
(211, 1, 28500000.00, 21, 2, 'IPADM4-SN06'),
(212, 1, 28500000.00, 21, 2, 'IPADM4-SN07'),
(213, 1, 28500000.00, 21, 2, 'IPADM4-SN08'),
(214, 1, 28500000.00, 21, 2, 'IPADM4-SN09'),
(215, 1, 28500000.00, 21, 2, 'IPADM4-SN10'),
(216, 1, 18990000.00, 22, 2, 'TABS9-SN01'),
(217, 1, 18990000.00, 22, 2, 'TABS9-SN02'),
(218, 1, 18990000.00, 22, 2, 'TABS9-SN03'),
(219, 1, 18990000.00, 22, 2, 'TABS9-SN04'),
(220, 1, 18990000.00, 22, 2, 'TABS9-SN05'),
(221, 1, 18990000.00, 22, 2, 'TABS9-SN06'),
(222, 1, 18990000.00, 22, 2, 'TABS9-SN07'),
(223, 1, 18990000.00, 22, 2, 'TABS9-SN08'),
(224, 1, 18990000.00, 22, 2, 'TABS9-SN09'),
(225, 1, 18990000.00, 22, 2, 'TABS9-SN10'),
(226, 1, 16500000.00, 23, 2, 'IPADAIR6-SN01'),
(227, 1, 16500000.00, 23, 2, 'IPADAIR6-SN02'),
(228, 1, 16500000.00, 23, 2, 'IPADAIR6-SN03'),
(229, 1, 16500000.00, 23, 2, 'IPADAIR6-SN04'),
(230, 1, 16500000.00, 23, 2, 'IPADAIR6-SN05'),
(231, 1, 16500000.00, 23, 2, 'IPADAIR6-SN06'),
(232, 1, 16500000.00, 23, 2, 'IPADAIR6-SN07'),
(233, 1, 16500000.00, 23, 2, 'IPADAIR6-SN08'),
(234, 1, 16500000.00, 23, 2, 'IPADAIR6-SN09'),
(235, 1, 16500000.00, 23, 2, 'IPADAIR6-SN10'),
(236, 1, 8990000.00, 24, 2, 'XIAPAD6-SN01'),
(237, 1, 8990000.00, 24, 2, 'XIAPAD6-SN02'),
(238, 1, 8990000.00, 24, 2, 'XIAPAD6-SN03'),
(239, 1, 8990000.00, 24, 2, 'XIAPAD6-SN04'),
(240, 1, 8990000.00, 24, 2, 'XIAPAD6-SN05'),
(241, 1, 8990000.00, 24, 2, 'XIAPAD6-SN06'),
(242, 1, 8990000.00, 24, 2, 'XIAPAD6-SN07'),
(243, 1, 8990000.00, 24, 2, 'XIAPAD6-SN08'),
(244, 1, 8990000.00, 24, 2, 'XIAPAD6-SN09'),
(245, 1, 8990000.00, 24, 2, 'XIAPAD6-SN10'),
(246, 1, 26990000.00, 25, 2, 'SURF9-SN01'),
(247, 1, 26990000.00, 25, 2, 'SURF9-SN02'),
(248, 1, 26990000.00, 25, 2, 'SURF9-SN03'),
(249, 1, 26990000.00, 25, 2, 'SURF9-SN04'),
(250, 1, 26990000.00, 25, 2, 'SURF9-SN05'),
(251, 1, 26990000.00, 25, 2, 'SURF9-SN06'),
(252, 1, 26990000.00, 25, 2, 'SURF9-SN07'),
(253, 1, 26990000.00, 25, 2, 'SURF9-SN08'),
(254, 1, 26990000.00, 25, 2, 'SURF9-SN09'),
(255, 1, 26990000.00, 25, 2, 'SURF9-SN10'),
(256, 1, 20990000.00, 26, 2, 'AWULTRA-SN01'),
(257, 1, 20990000.00, 26, 2, 'AWULTRA-SN02'),
(258, 1, 20990000.00, 26, 2, 'AWULTRA-SN03'),
(259, 1, 20990000.00, 26, 2, 'AWULTRA-SN04'),
(260, 1, 20990000.00, 26, 2, 'AWULTRA-SN05'),
(261, 1, 20990000.00, 26, 2, 'AWULTRA-SN06'),
(262, 1, 20990000.00, 26, 2, 'AWULTRA-SN07'),
(263, 1, 20990000.00, 26, 2, 'AWULTRA-SN08'),
(264, 1, 20990000.00, 26, 2, 'AWULTRA-SN09'),
(265, 1, 20990000.00, 26, 2, 'AWULTRA-SN10'),
(266, 1, 8490000.00, 27, 2, 'GW6C-SN01'),
(267, 1, 8490000.00, 27, 2, 'GW6C-SN02'),
(268, 1, 8490000.00, 27, 2, 'GW6C-SN03'),
(269, 1, 8490000.00, 27, 2, 'GW6C-SN04'),
(270, 1, 8490000.00, 27, 2, 'GW6C-SN05'),
(271, 1, 8490000.00, 27, 2, 'GW6C-SN06'),
(272, 1, 8490000.00, 27, 2, 'GW6C-SN07'),
(273, 1, 8490000.00, 27, 2, 'GW6C-SN08'),
(274, 1, 8490000.00, 27, 2, 'GW6C-SN09'),
(275, 1, 8490000.00, 27, 2, 'GW6C-SN10'),
(276, 1, 23500000.00, 28, 2, 'GARF7X-SN01'),
(277, 1, 23500000.00, 28, 2, 'GARF7X-SN02'),
(278, 1, 23500000.00, 28, 2, 'GARF7X-SN03'),
(279, 1, 23500000.00, 28, 2, 'GARF7X-SN04'),
(280, 1, 23500000.00, 28, 2, 'GARF7X-SN05'),
(281, 1, 23500000.00, 28, 2, 'GARF7X-SN06'),
(282, 1, 23500000.00, 28, 2, 'GARF7X-SN07'),
(283, 1, 23500000.00, 28, 2, 'GARF7X-SN08'),
(284, 1, 23500000.00, 28, 2, 'GARF7X-SN09'),
(285, 1, 23500000.00, 28, 2, 'GARF7X-SN10'),
(286, 1, 6290000.00, 29, 2, 'AWSE23-SN01'),
(287, 1, 6290000.00, 29, 2, 'AWSE23-SN02'),
(288, 1, 6290000.00, 29, 2, 'AWSE23-SN03'),
(289, 1, 6290000.00, 29, 2, 'AWSE23-SN04'),
(290, 1, 6290000.00, 29, 2, 'AWSE23-SN05'),
(291, 1, 6290000.00, 29, 2, 'AWSE23-SN06'),
(292, 1, 6290000.00, 29, 2, 'AWSE23-SN07'),
(293, 1, 6290000.00, 29, 2, 'AWSE23-SN08'),
(294, 1, 6290000.00, 29, 2, 'AWSE23-SN09'),
(295, 1, 6290000.00, 29, 2, 'AWSE23-SN10'),
(296, 1, 11690000.00, 30, 2, 'GARFR265-SN01'),
(297, 1, 11690000.00, 30, 2, 'GARFR265-SN02'),
(298, 1, 11690000.00, 30, 2, 'GARFR265-SN03'),
(299, 1, 11690000.00, 30, 2, 'GARFR265-SN04'),
(300, 1, 11690000.00, 30, 2, 'GARFR265-SN05'),
(301, 1, 11690000.00, 30, 2, 'GARFR265-SN06'),
(302, 1, 11690000.00, 30, 2, 'GARFR265-SN07'),
(303, 1, 11690000.00, 30, 2, 'GARFR265-SN08'),
(304, 1, 11690000.00, 30, 2, 'GARFR265-SN09'),
(305, 1, 11690000.00, 30, 2, 'GARFR265-SN10'),
(306, 1, 49990000.00, 31, 2, 'MACSTUDIO-SN01'),
(307, 1, 49990000.00, 31, 2, 'MACSTUDIO-SN02'),
(308, 1, 49990000.00, 31, 2, 'MACSTUDIO-SN03'),
(309, 1, 49990000.00, 31, 2, 'MACSTUDIO-SN04'),
(310, 1, 49990000.00, 31, 2, 'MACSTUDIO-SN05'),
(311, 1, 49990000.00, 31, 2, 'MACSTUDIO-SN06'),
(312, 1, 49990000.00, 31, 2, 'MACSTUDIO-SN07'),
(313, 1, 49990000.00, 31, 2, 'MACSTUDIO-SN08'),
(314, 1, 49990000.00, 31, 2, 'MACSTUDIO-SN09'),
(315, 1, 49990000.00, 31, 2, 'MACSTUDIO-SN10'),
(316, 1, 35990000.00, 32, 2, 'ODYSSEYG9-SN01'),
(317, 1, 35990000.00, 32, 2, 'ODYSSEYG9-SN02'),
(318, 1, 35990000.00, 32, 2, 'ODYSSEYG9-SN03'),
(319, 1, 35990000.00, 32, 2, 'ODYSSEYG9-SN04'),
(320, 1, 35990000.00, 32, 2, 'ODYSSEYG9-SN05'),
(321, 1, 35990000.00, 32, 2, 'ODYSSEYG9-SN06'),
(322, 1, 35990000.00, 32, 2, 'ODYSSEYG9-SN07'),
(323, 1, 35990000.00, 32, 2, 'ODYSSEYG9-SN08'),
(324, 1, 35990000.00, 32, 2, 'ODYSSEYG9-SN09'),
(325, 1, 35990000.00, 32, 2, 'ODYSSEYG9-SN10'),
(326, 80, 3590000.00, 33, 2, NULL),
(327, 1, 5490000.00, 34, 2, 'SONYXM4-SN01'),
(328, 1, 5490000.00, 34, 2, 'SONYXM4-SN02'),
(329, 1, 5490000.00, 34, 2, 'SONYXM4-SN03'),
(330, 1, 5490000.00, 34, 2, 'SONYXM4-SN04'),
(331, 1, 5490000.00, 34, 2, 'SONYXM4-SN05'),
(332, 1, 5490000.00, 34, 2, 'SONYXM4-SN06'),
(333, 1, 5490000.00, 34, 2, 'SONYXM4-SN07'),
(334, 1, 5490000.00, 34, 2, 'SONYXM4-SN08'),
(335, 1, 5490000.00, 34, 2, 'SONYXM4-SN09'),
(336, 1, 5490000.00, 34, 2, 'SONYXM4-SN10'),
(337, 80, 2790000.00, 35, 2, NULL),
(338, 1, 0.00, 11, 3, 'APPRO2-SN02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `stock_transfers`
--

CREATE TABLE `stock_transfers` (
  `id` bigint NOT NULL,
  `status` enum('pending','shipping','completed','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `completed_at` datetime DEFAULT NULL,
  `from_branch_id` bigint NOT NULL,
  `to_branch_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `stock_transfers`
--

INSERT INTO `stock_transfers` (`id`, `status`, `created_at`, `completed_at`, `from_branch_id`, `to_branch_id`) VALUES
(1, 'shipping', '2026-06-12 18:55:48', '2026-06-13 02:34:57', 1, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `stock_transfer_details`
--

CREATE TABLE `stock_transfer_details` (
  `id` bigint NOT NULL,
  `quantity` bigint NOT NULL,
  `transfer_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `product_item_serial` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `stock_transfer_details`
--

INSERT INTO `stock_transfer_details` (`id`, `quantity`, `transfer_id`, `product_id`, `product_item_serial`) VALUES
(1, 1, 1, 11, 'APPRO2-SN01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `support_tickets`
--

CREATE TABLE `support_tickets` (
  `id` bigint NOT NULL,
  `status` enum('pending','in progress','resolved','closed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customer_id` bigint NOT NULL,
  `product_serial` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `staff_id` bigint DEFAULT NULL,
  `order_detail_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Họ và tên người dùng',
  `role` enum('staff','customer','system admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `avt_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personal_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` enum('male','female','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `identify_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `account_status` enum('active','inactive','banned') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `role`, `address`, `birthday`, `email`, `description`, `avt_url`, `personal_img`, `phone`, `sex`, `identify_code`, `created_at`, `account_status`) VALUES
(1, 'admin', '$2a$10$B/aBvYTYqFTrQTHsaEf2b.bRIR1o7IeIoHxoKdmbLBqvRKpE3PWky', 'Phạm Hồng Sơn', 'system admin', NULL, NULL, 'admin@gmail.com', NULL, NULL, NULL, '0333444555', 'male', NULL, '2026-04-24 23:23:53', 'active'),
(2, 'manager1', '$2a$10$acPHkszuvgAa1VTBtfkTjOD3shFxUwfpcUYkzxt9QihMNypSwiZeO', 'Phạm Sơn', 'staff', NULL, NULL, 'quanly1@smartvibe.com', NULL, NULL, NULL, '0123456789', 'other', NULL, '2026-06-09 14:26:06', 'active'),
(3, 'manager2', '$2a$10$ydT/o1VtBO0e3c90FPqLaeGKb89MmXjHpHUw6max42Y34XUJ.gMC6', 'Quản lý 2', 'staff', NULL, NULL, 'quanly2@smartvibe.com', NULL, NULL, NULL, '01385131541', 'other', NULL, '2026-06-09 14:30:55', 'active'),
(4, 'manager3', '$2a$10$tKhAnGUX85nowGne2GW9K..JbLBNfoXhAwj9qYvAwswDP3dUzCn/u', 'Quản lý 3', 'staff', NULL, NULL, 'quanly3@smartvibe.com', NULL, NULL, NULL, '05614183516', 'other', NULL, '2026-06-09 16:26:03', 'active'),
(5, 'manager4', '$2a$10$DpGkyCMzh3OaVg1pwia1V.yxqQRqWw9Yq.2EB10to/pcv5nluO/Ty', 'Quản lý 4', 'staff', NULL, NULL, 'quanly4@gmail.com', NULL, NULL, NULL, '06548432183', 'other', NULL, '2026-06-09 16:28:03', 'active'),
(6, 'manager5', '$2a$10$osE5tF5Qlu9q4xtKpgG9mOZhtpvrdVAJw/tebYcsi9C.QMMJraQYa', 'Quản lý 5', 'staff', NULL, NULL, 'quanly5@gmail.com', NULL, NULL, NULL, '0782532183', 'other', NULL, '2026-06-09 16:29:50', 'active'),
(7, 'manager6', '$2a$10$YrHE1MzpAW22hx4d4GXBROddxT7XCbdYJWZrdhxyerQ4MBR0gIHc6', 'Quản lý 6', 'staff', NULL, NULL, 'quanly6@gmail.com', NULL, NULL, NULL, '0782532999', 'other', NULL, '2026-06-09 16:36:09', 'active'),
(8, 'manager7', '$2a$10$S24fJFot6eJS6D0pCYLeb.ZUkFT8/kN11YE4D10vUp1snZ6c0MpJ.', 'Quản lý 7', 'staff', NULL, NULL, 'quanly7@gmail.com', NULL, NULL, NULL, '0782658183', 'other', NULL, '2026-06-09 16:37:01', 'active'),
(9, 'kho1cn1', '$2a$10$Lh/96Kh7fnFZKq8TWPunw.sgYjdH2iLHMlvUQYkHdeGilLALkPVjy', NULL, 'staff', NULL, NULL, 'kho1cn1@smartvibe.vn', NULL, NULL, NULL, '0901001001', 'other', NULL, '2026-06-13 00:26:11', 'active'),
(10, 'kho2cn1', '$2a$10$VNJkAE4jTdbFbesZA7VeCuYeiVpydRLPE4kgKAEY3e3fJUadEaYWi', NULL, 'staff', NULL, NULL, 'kho2cn1@smartvibe.vn', NULL, NULL, NULL, '0901001002', 'other', NULL, '2026-06-13 00:26:35', 'active'),
(11, 'kho3cn1', '$2a$10$F0gOaUX/5G3bU5581OQLJePo7vx5rXs97vy91MJ/ABtPQmvWDU686', NULL, 'staff', NULL, NULL, 'kho3cn1@smartvibe.vn', NULL, NULL, NULL, '0901001003', 'other', NULL, '2026-06-13 00:26:45', 'inactive'),
(12, 'kho4cn1', '$2a$10$SxhFn0ZCXMxVxkjyajjIeujiIMwbK5gkwxdFIPt6TNSWOZqKExVrm', NULL, 'staff', NULL, NULL, 'kho4cn1@smartvibe.vn', NULL, NULL, NULL, '0901001004', 'other', NULL, '2026-06-13 00:26:52', 'active'),
(13, 'kho5cn1', '$2a$10$AAb0pZd68OuBuqaaRV3CiOFbBpIPNPkEMYGEhCCaqZY61ZJehBVu2', NULL, 'staff', NULL, NULL, 'kho5cn1@smartvibe.vn', NULL, NULL, NULL, '0901001005', 'other', NULL, '2026-06-13 00:26:59', 'active'),
(14, 'kythuat1cn1', '$2a$10$FkcMNw9HjHngfYH.6EVI9uX4MrOywzwokGPqVfwNVjo9CjufXIZqa', NULL, 'staff', NULL, NULL, 'kythuat1cn1@smartvibe.vn', NULL, NULL, NULL, '0901003001', 'other', NULL, '2026-06-13 00:27:06', 'active'),
(15, 'kythuat2cn1', '$2a$10$1YgZZW5fJSr6YrxaRlbRfODfjDEf2m5wqsl6LCdPMxBEsxoKSLzba', NULL, 'staff', NULL, NULL, 'kythuat2cn1@smartvibe.vn', NULL, NULL, NULL, '0901003002', 'other', NULL, '2026-06-13 00:27:12', 'active'),
(16, 'kythuat3cn1', '$2a$10$nplbC44qWiIH3esxX4HBVu9iB1IaYP1Z9dQGioLU82z978O0gZtsG', NULL, 'staff', NULL, NULL, 'kythuat3cn1@smartvibe.vn', NULL, NULL, NULL, '0901003003', 'other', NULL, '2026-06-13 00:27:23', 'active'),
(17, 'kythuat4cn1', '$2a$10$.wNX8ZXLt4WolMNFETXxmey9x4S8PkKg.ywv3TeWVYCeH31zxALGa', NULL, 'staff', NULL, NULL, 'kythuat4cn1@smartvibe.vn', NULL, NULL, NULL, '0901003004', 'other', NULL, '2026-06-13 00:27:30', 'active'),
(18, 'kythuat5cn1', '$2a$10$gACGmIH8AdYcLlRSqa0U1erHBjwTJCxAXfQISdjgR7YVAG4luYfPi', NULL, 'staff', NULL, NULL, 'kythuat5cn1@smartvibe.vn', NULL, NULL, NULL, '0901003005', 'other', NULL, '2026-06-13 00:27:38', 'banned'),
(19, 'kho1cn2', '$2a$10$Xf2gdshKsdqyF1YzrvFgq.9yiC8eZguvkPO/1029KMNJrx3Eh7bsS', 'Nguyễn Văn A', 'staff', NULL, NULL, 'kho1cn2@smartvibe.vn', NULL, NULL, NULL, '0902001001', 'other', NULL, '2026-06-13 00:28:05', 'active'),
(20, 'kho2cn2', '$2a$10$Blpxc/LbgFYon2w2M9C0u.F72oy3bKPH6dblJcMBtqsWXeUAfUWWm', NULL, 'staff', NULL, NULL, 'kho2cn2@smartvibe.vn', NULL, NULL, NULL, '0902001002', 'other', NULL, '2026-06-13 00:28:12', 'inactive'),
(21, 'kho3cn2', '$2a$10$IoCkUVG5VYcKkUpAMl81Ie/iSfoRXFMAlEE9cbMf28GC3w689F4/O', NULL, 'staff', NULL, NULL, 'kho3cn2@smartvibe.vn', NULL, NULL, NULL, '0902001003', 'other', NULL, '2026-06-13 00:28:18', 'active'),
(22, 'sales1cn2', '$2a$10$s9P6kj7tZiAf7GbdlxlnYejPR8j45Kwu5WEJmfM2vep0ACqJen/yu', NULL, 'staff', NULL, NULL, 'sales1cn2@smartvibe.vn', NULL, NULL, NULL, '0902002001', 'other', NULL, '2026-06-13 00:28:25', 'active'),
(23, 'sales2cn2', '$2a$10$10X2UoLn8xStgzNFmKi6UuRUzZYkHZH2v4jQGu1LErgSmqi7jKcsq', NULL, 'staff', NULL, NULL, 'sales2cn2@smartvibe.vn', NULL, NULL, NULL, '0902002002', 'other', NULL, '2026-06-13 00:28:31', 'active'),
(24, 'sales3cn2', '$2a$10$njsloJElFwQIK8zoBT/SFOpxWQiI9WrS7j/3W6tT5Hj.j3zeczb8q', NULL, 'staff', NULL, NULL, 'sales3cn2@smartvibe.vn', NULL, NULL, NULL, '0902002003', 'other', NULL, '2026-06-13 00:28:38', 'active'),
(25, 'sales4cn2', '$2a$10$E/kL9.H1JbYy16PcCz0qxOxmqcQhQO/6itV7xM2LfMXmZd1pYSzFi', NULL, 'staff', NULL, NULL, 'sales4cn2@smartvibe.vn', NULL, NULL, NULL, '0902002004', 'other', NULL, '2026-06-13 00:28:44', 'active'),
(26, 'sales5cn2', '$2a$10$Mi55woJf/V63hKu9xGZYC.4SlW1LNGZ.gZxZoNFA1UAeSCvuMITCC', NULL, 'staff', NULL, NULL, 'sales5cn2@smartvibe.vn', NULL, NULL, NULL, '0902002005', 'other', NULL, '2026-06-13 00:28:49', 'active'),
(27, 'kho1cn3', '$2a$10$6Y7Q4q74h5aTlYq12eCAn.xoHbajzhLGpAOcAFLQlhaYOwRmA9b4.', NULL, 'staff', NULL, NULL, 'kho1cn3@smartvibe.vn', NULL, NULL, NULL, '0903001001', 'other', NULL, '2026-06-13 00:28:59', 'active'),
(28, 'kho2cn3', '$2a$10$Rs2r5Fpkw.eEBeoBx8dguedO9USm2o6Eobs5SVE9b44RCXMnfI4m2', NULL, 'staff', NULL, NULL, 'kho2cn3@smartvibe.vn', NULL, NULL, NULL, '0903001002', 'other', NULL, '2026-06-13 00:29:06', 'active'),
(29, 'kho3cn3', '$2a$10$wHLn8HbVt/Co/upLEuDxWOXTtnF2GXcAE8GXVhbmslkOaldzBNg7W', NULL, 'staff', NULL, NULL, 'kho3cn3@smartvibe.vn', NULL, NULL, NULL, '0903001003', 'other', NULL, '2026-06-13 00:29:11', 'active'),
(30, 'sales1cn3', '$2a$10$/o0XqfTNvDhg4J.37WMyguTcneAtCVqKCChIGLQ9PlLmF5W7Gk1CK', NULL, 'staff', NULL, NULL, 'sales1cn3@smartvibe.vn', NULL, NULL, NULL, '0903002001', 'other', NULL, '2026-06-13 00:29:17', 'active'),
(31, 'sales2cn3', '$2a$10$vq6xHwGchObCFavN5LJObeGAibgLwGULqdg8/7UqKkI59LCATDjnu', NULL, 'staff', NULL, NULL, 'sales2cn3@smartvibe.vn', NULL, NULL, NULL, '0903002002', 'other', NULL, '2026-06-13 00:29:24', 'active'),
(32, 'sales3cn3', '$2a$10$hjPGAb8oEUpBBfAqzPmeDOd8GO0qcZhHCaXMDgn2DELj6rkuG3o9i', NULL, 'staff', NULL, NULL, 'sales3cn3@smartvibe.vn', NULL, NULL, NULL, '0903002003', 'other', NULL, '2026-06-13 00:29:31', 'active'),
(33, 'sales4cn3', '$2a$10$Z4D23PmkyT4nmdLhmEZcSe3h81b5/vYH.sTqJ9yXWb08jMLkVnmd.', NULL, 'staff', NULL, NULL, 'sales4cn3@smartvibe.vn', NULL, NULL, NULL, '0903002004', 'other', NULL, '2026-06-13 00:29:36', 'active'),
(34, 'sales5cn3', '$2a$10$t6aIKOV4ozwvv/aC7zOsQu.nYJJyqsRyKgt2k21CU8pz.vouT9l22', NULL, 'staff', NULL, NULL, 'sales5cn3@smartvibe.vn', NULL, NULL, NULL, '0903002005', 'other', NULL, '2026-06-13 00:29:42', 'inactive'),
(35, 'kho1cn4', '$2a$10$HA5DTrL9VK0F1pfwOD.N9OCjqP8HNdWM0UDMPnOCmgm92144u02EC', NULL, 'staff', NULL, NULL, 'kho1cn4@smartvibe.vn', NULL, NULL, NULL, '0904001001', 'other', NULL, '2026-06-13 00:29:54', 'active'),
(36, 'kho2cn4', '$2a$10$8mDmc8kCk0vRu4t5yg0GCuGlf24XEBNC8Q7x6IEn.JxsgIqhUR97q', NULL, 'staff', NULL, NULL, 'kho2cn4@smartvibe.vn', NULL, NULL, NULL, '0904001002', 'other', NULL, '2026-06-13 00:29:59', 'active'),
(37, 'kho3cn4', '$2a$10$JfmPfN2dDvjWSnFpH7eFqu6oO3mB79LN7R2qsx5LQz8OBxNbFK782', NULL, 'staff', NULL, NULL, 'kho3cn4@smartvibe.vn', NULL, NULL, NULL, '0904001003', 'other', NULL, '2026-06-13 00:30:04', 'active'),
(38, 'sales1cn4', '$2a$10$6O/fLyNHtieMkg2F/KvTzOw0UpR044OBnZsw2Tru.e8Q17d423Vs2', NULL, 'staff', NULL, NULL, 'sales1cn4@smartvibe.vn', NULL, NULL, NULL, '0904002001', 'other', NULL, '2026-06-13 00:30:09', 'active'),
(39, 'sales2cn4', '$2a$10$laJG4fexytMUmfLukox72ukd3BhvWIM3QkJcbjiaTMDbHQUU24ZrW', NULL, 'staff', NULL, NULL, 'sales2cn4@smartvibe.vn', NULL, NULL, NULL, '0904002002', 'other', NULL, '2026-06-13 00:30:15', 'active'),
(40, 'sales3cn4', '$2a$10$ERSiWBozYI3qwmtEmVnzGuktwr5Mx8uunwVRJpV2kOwUhLpZDgYFG', NULL, 'staff', NULL, NULL, 'sales3cn4@smartvibe.vn', NULL, NULL, NULL, '0904002003', 'other', NULL, '2026-06-13 00:30:19', 'active'),
(41, 'sales4cn4', '$2a$10$YcewH0sin2296aore9USL.p5jmY7cvehJF4Q2H4dRkB.GJUEQ0zB6', NULL, 'staff', NULL, NULL, 'sales4cn4@smartvibe.vn', NULL, NULL, NULL, '0904002004', 'other', NULL, '2026-06-13 00:30:24', 'active'),
(42, 'sales5cn4', '$2a$10$hBx.mCrHr4q5YSOg2hLUyuys.UbYIb8KJ37PxNSCYACXPyXkW9Dg2', NULL, 'staff', NULL, NULL, 'sales5cn4@smartvibe.vn', NULL, NULL, NULL, '0904002005', 'other', NULL, '2026-06-13 00:30:29', 'active'),
(43, 'kho1cn5', '$2a$10$ld0ITePegVliz/qgj9ZyaOCAJf34z3/fsRQ2NVyg4u4jmGw7Qs5X2', NULL, 'staff', NULL, NULL, 'kho1cn5@smartvibe.vn', NULL, NULL, NULL, '0905001001', 'other', NULL, '2026-06-13 00:30:41', 'active'),
(44, 'kho2cn5', '$2a$10$wovL5bpgKFvUdjKth83Zfe1n7wAIm0vXbVS3xQ0dRNbz2U/61W7oW', NULL, 'staff', NULL, NULL, 'kho2cn5@smartvibe.vn', NULL, NULL, NULL, '0905001002', 'other', NULL, '2026-06-13 00:30:48', 'inactive'),
(45, 'kho3cn5', '$2a$10$FcnG.nm4ebJCpvVivmXluu0MwUBXbnYS02Uc8nZvGpC0l8AagrXya', NULL, 'staff', NULL, NULL, 'kho3cn5@smartvibe.vn', NULL, NULL, NULL, '0905001003', 'other', NULL, '2026-06-13 00:30:53', 'active'),
(46, 'sales1cn5', '$2a$10$OVxJ3ktl7ZSJ5nZuDdOgQux47c5D1Vuktq8yXF/aUYLuIJyym7.OC', NULL, 'staff', NULL, NULL, 'sales1cn5@smartvibe.vn', NULL, NULL, NULL, '0905002001', 'other', NULL, '2026-06-13 00:30:57', 'active'),
(47, 'sales2cn5', '$2a$10$FFNr2N5FvNdF3EdSuAGZXesvpZJX.Omj9P7hhekLrh0jnv7uvgoJC', NULL, 'staff', NULL, NULL, 'sales2cn5@smartvibe.vn', NULL, NULL, NULL, '0905002002', 'other', NULL, '2026-06-13 00:31:02', 'active'),
(48, 'sales3cn5', '$2a$10$rrbykIR1rt00lkN5IHsNLeb0EU8q2cydTZXVRI98bjFETjXRHkr2O', NULL, 'staff', NULL, NULL, 'sales3cn5@smartvibe.vn', NULL, NULL, NULL, '0905002003', 'other', NULL, '2026-06-13 00:31:07', 'active'),
(49, 'sales4cn5', '$2a$10$Ej5p4YS.3S5cXRYUXumouOt8pxW/057B4qTcuq7tFhH2f9FsCn4E2', NULL, 'staff', NULL, NULL, 'sales4cn5@smartvibe.vn', NULL, NULL, NULL, '0905002004', 'other', NULL, '2026-06-13 00:31:15', 'active'),
(50, 'sales5cn5', '$2a$10$A/mf5oThf4mbkMOIl8/siOTig7/30cLzo/6/Ungd7taA4vot5g/CK', NULL, 'staff', NULL, NULL, 'sales5cn5@smartvibe.vn', NULL, NULL, NULL, '0905002005', 'other', NULL, '2026-06-13 00:31:21', 'active'),
(51, 'kho1cn7', '$2a$10$6MpsP4ctZgJe57gOer861O0DefH24mDTLO.bBBsCYiq0bGWMbMCa2', NULL, 'staff', NULL, NULL, 'kho1cn7@smartvibe.vn', NULL, NULL, NULL, '0907001001', 'other', NULL, '2026-06-13 00:31:32', 'active'),
(52, 'kho2cn7', '$2a$10$UrJyZVWvixike3ig/WfDi.uZcgHZsp0D7OgGgER8teRSe3YHiaHZW', NULL, 'staff', NULL, NULL, 'kho2cn7@smartvibe.vn', NULL, NULL, NULL, '0907001002', 'other', NULL, '2026-06-13 00:31:42', 'active'),
(53, 'kho3cn7', '$2a$10$dX/2kXmY82Tk7obcC2tYvu1IVyisIaBc9pjktvU2DTDFO2PA0L0Xm', NULL, 'staff', NULL, NULL, 'kho3cn7@smartvibe.vn', NULL, NULL, NULL, '0907001003', 'other', NULL, '2026-06-13 00:31:48', 'active'),
(54, 'sales1cn7', '$2a$10$PlvQi.nI7lOxrjFb4u.ntuUMC8U4bE7kyqSem9Zt7L3lqU5E/DkYW', NULL, 'staff', NULL, NULL, 'sales1cn7@smartvibe.vn', NULL, NULL, NULL, '0907002001', 'other', NULL, '2026-06-13 00:31:55', 'banned'),
(55, 'sales2cn7', '$2a$10$0fVMZamIPe5gfO6qXp8AW.th78WH3kWwdsu9F4xz9x1KzElZNp9T2', NULL, 'staff', NULL, NULL, 'sales2cn7@smartvibe.vn', NULL, NULL, NULL, '0907002002', 'other', NULL, '2026-06-13 00:32:00', 'active'),
(56, 'sales3cn7', '$2a$10$usvwr91pQ.czBWTCeMryKe92lrWxnTEO8EkM4iGQ0R6jjNIki/Loe', NULL, 'staff', NULL, NULL, 'sales3cn7@smartvibe.vn', NULL, NULL, NULL, '0907002003', 'other', NULL, '2026-06-13 00:32:06', 'active'),
(57, 'sales5cn7', '$2a$10$6n5gPLeeJsuPxs1Tg.T0yehTMT9MZlgn.p0GqgF.4vAiLoesBneXq', NULL, 'staff', NULL, NULL, 'sales5cn7@smartvibe.vn', NULL, NULL, NULL, '0907002005', 'other', NULL, '2026-06-13 00:32:21', 'active'),
(58, 'kho1cn8', '$2a$10$neL2fW/JY1YUNPcNRwp1aufSv06iYwjmg/cOmb/uTHts3RFXmTE0e', NULL, 'staff', NULL, NULL, 'kho1cn8@smartvibe.vn', NULL, NULL, NULL, '0908001001', 'other', NULL, '2026-06-13 00:32:30', 'active'),
(59, 'kho2cn8', '$2a$10$O5MaxOl5SFYNiHQUPqS9l.Spu0oWo9K419PWpFdAj3M8GuXhmI0A2', NULL, 'staff', NULL, NULL, 'kho2cn8@smartvibe.vn', NULL, NULL, NULL, '0908001002', 'other', NULL, '2026-06-13 00:32:36', 'active'),
(60, 'kho3cn8', '$2a$10$EgE0rNlDyXDUKm6NxQXRCOrmO1pRWhAhv2QWtxKbcQ4gf6/Vn7RLK', NULL, 'staff', NULL, NULL, 'kho3cn8@smartvibe.vn', NULL, NULL, NULL, '0908001003', 'other', NULL, '2026-06-13 00:32:51', 'active'),
(61, 'sales1cn8', '$2a$10$8lCEvoD4RMeBy4rtGhn6GOqvDIMqWNSEh0vD.MrH3PactA96JSTAO', NULL, 'staff', NULL, NULL, 'sales1cn8@smartvibe.vn', NULL, NULL, NULL, '0908002001', 'other', NULL, '2026-06-13 00:32:57', 'active'),
(62, 'sales2cn8', '$2a$10$OOQ0kR9es9aMbmb7nOMgoOSfDRJV7T7rogKcCtI5yw3iZ.I0UYXaG', NULL, 'staff', NULL, NULL, 'sales2cn8@smartvibe.vn', NULL, NULL, NULL, '0908002002', 'other', NULL, '2026-06-13 00:33:03', 'active'),
(63, 'sales3cn8', '$2a$10$CfAqFLWsmzY2bnmsSF5Uz.TXCtDs0U4mOL/5E.cns2aIGF6Ilcnh.', NULL, 'staff', NULL, NULL, 'sales3cn8@smartvibe.vn', NULL, NULL, NULL, '0908002003', 'other', NULL, '2026-06-13 00:33:11', 'active'),
(64, 'sales4cn8', '$2a$10$.rOD9DJfYV4yy3Sjk/VZYOnY1G0fgVd3dCvdcpKAAKkK5ysSoNgYu', NULL, 'staff', NULL, NULL, 'sales4cn8@smartvibe.vn', NULL, NULL, NULL, '0908002004', 'other', NULL, '2026-06-13 00:33:19', 'active'),
(65, 'sales5cn8', '$2a$10$y.5CkphBc506E6YTfVz3qe3Pra31rGx.0N5wJ6JzDbQ5xNY0CAp5e', NULL, 'staff', NULL, NULL, 'sales5cn8@smartvibe.vn', NULL, NULL, NULL, '0908002005', 'other', NULL, '2026-06-13 00:33:27', 'active'),
(66, 'kho1cn10', '$2a$10$62D44pFR0L7ABX6lfte3cO348TMFeQ9uKQFqTn.4TpGmfn0jEUqvW', NULL, 'staff', NULL, NULL, 'kho1cn10@smartvibe.vn', NULL, NULL, NULL, '0910001001', 'other', NULL, '2026-06-13 00:33:33', 'active'),
(67, 'kho2cn10', '$2a$10$FnXTPLWfwSea6GNsdfR9J.mCqufZ6sHb2IAW96WphzQSG0fPbfaj6', NULL, 'staff', NULL, NULL, 'kho2cn10@smartvibe.vn', NULL, NULL, NULL, '0910001002', 'other', NULL, '2026-06-13 00:33:46', 'banned'),
(68, 'kho3cn10', '$2a$10$Og6YPUuA9kteBYzakDBWjuhVbx7JHon9FTAQzCSBsSBFVd63kMPqG', NULL, 'staff', NULL, NULL, 'kho3cn10@smartvibe.vn', NULL, NULL, NULL, '0910001003', 'other', NULL, '2026-06-13 00:33:52', 'active'),
(69, 'sales1cn10', '$2a$10$jr2F07QLHF6Kk2fgtbHgAO7DBccYHk7jRe/qhuilK9akaPN7x6iOS', NULL, 'staff', NULL, NULL, 'sales1cn10@smartvibe.vn', NULL, NULL, NULL, '0910002001', 'other', NULL, '2026-06-13 00:34:01', 'active'),
(70, 'sales2cn10', '$2a$10$r15wKb9jj55dvFdgyeg/Nuy4PjRTZUZiGDyGzLLjQzBCdtZTHDdQC', NULL, 'staff', NULL, NULL, 'sales2cn10@smartvibe.vn', NULL, NULL, NULL, '0910002002', 'other', NULL, '2026-06-13 00:34:12', 'active'),
(71, 'sales3cn10', '$2a$10$i5NKiULeVHQJLeY2YRQxuOVJTw6EEdBzVh66Kd21.ZZMfYR5YF38u', NULL, 'staff', NULL, NULL, 'sales3cn10@smartvibe.vn', NULL, NULL, NULL, '0910002003', 'other', NULL, '2026-06-13 00:34:21', 'inactive'),
(72, 'sales4cn10', '$2a$10$qWY4TaO0S4zOo.B0DkuxnuXLrPCVAettlvPUUzOcEPyx5YwCgk7fu', NULL, 'staff', NULL, NULL, 'sales4cn10@smartvibe.vn', NULL, NULL, NULL, '0910002004', 'other', NULL, '2026-06-13 00:34:26', 'active'),
(74, 'customer', '$2a$10$R4VgPpBMw6wr08XP3kSXZOiMGi/qZ/YQYQ8nH2iCIYgoCMUZ23AWW', 'Khách hàng vãng lai', 'customer', NULL, NULL, 'khachvanglai@smartvibe.vn', NULL, NULL, NULL, '', 'other', NULL, '2026-06-13 00:50:07', 'active'),
(75, 'khachhang2', '$2a$10$qM0dbh8gh6n0TNCACe5MXOPis/a7ncu1JJknQdM3UCTCZwwDuAxdG', NULL, 'customer', NULL, NULL, 'nguyenvana@gmail.com', NULL, NULL, NULL, '0988000002', 'other', NULL, '2026-06-13 00:59:56', 'active'),
(76, 'khachhang3', '$2a$10$pHA0k7X0iSt3XjK7PwaBD.taB7NhD6Q4KFBM8T5VHEl.9Uv9k/QfW', NULL, 'customer', NULL, NULL, 'tranthibinh@gmail.com', NULL, NULL, NULL, '0988000003', 'other', NULL, '2026-06-13 01:01:10', 'active'),
(77, 'khachhang4', '$2a$10$zQQvHeuD1XPht5dYw1K26uPP.Db92crzEZOm0fh5TxChIaLCUFdIG', NULL, 'customer', NULL, NULL, 'lehoangcuong@gmail.com', NULL, NULL, NULL, '0988000004', 'other', NULL, '2026-06-13 01:01:40', 'active'),
(78, 'khachhang5', '$2a$10$fZVJofjcFxO1xcQsGHdguuMtfvV53QBUfY8o6acMP.MOXTqyPBDvW', NULL, 'customer', NULL, NULL, 'phammaidung@gmail.com', NULL, NULL, NULL, '0988000005', 'other', NULL, '2026-06-13 01:02:04', 'active');

--
-- Chỉ mục cho các bảng đã đổ
--

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
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customer_id` (`customer_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_cart_product` (`cart_id`,`product_id`) COMMENT 'Tránh trùng lặp 1 sản phẩm nhiều dòng trong 1 giỏ',
  ADD KEY `fk_cart_item_product` (`product_id`);

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
  ADD UNIQUE KEY `unique_inventory` (`branch_id`,`product_id`),
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
  ADD KEY `fk_stock_document_staff` (`staff_id`);

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
  ADD KEY `phone` (`phone`) USING BTREE;

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `branches`
--
ALTER TABLE `branches`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=386;

--
-- AUTO_INCREMENT cho bảng `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `staffs`
--
ALTER TABLE `staffs`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT cho bảng `stock_documents`
--
ALTER TABLE `stock_documents`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `stock_document_details`
--
ALTER TABLE `stock_document_details`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=339;

--
-- AUTO_INCREMENT cho bảng `stock_transfers`
--
ALTER TABLE `stock_transfers`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `stock_transfer_details`
--
ALTER TABLE `stock_transfer_details`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `support_tickets`
--
ALTER TABLE `support_tickets`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `fk_audit_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `fk_cart_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_cart_item_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cart_item_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `fk_category_parent` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

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
  ADD CONSTRAINT `fk_product_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

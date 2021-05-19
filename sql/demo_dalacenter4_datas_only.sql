-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th5 19, 2021 lúc 01:51 PM
-- Phiên bản máy phục vụ: 8.0.21
-- Phiên bản PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `dalacenter4`
--

--
-- Đang đổ dữ liệu cho bảng `dala_service_type`
--

INSERT INTO `dala_service_type` (`dala_service_type_ID`, `dala_service_type_name`, `dala_service_type_information`) VALUES
(3, 'speciality', 'dịch vụ bán hàng đặc sản đà lạt'),
(4, 'food-drink', 'dịch vụ ăn uống ăn uông');

--
-- Đang đổ dữ liệu cho bảng `dala_stores`
--

INSERT INTO `dala_stores` (`dala_stores_ID`, `dala_stores_user_id`, `dala_stores_date_created`, `dala_stores_name`, `dala_stores_payment_limit`, `dala_stores_service_type_id`, `dala_stores_adress`, `dala_stores_province`, `dala_stores_district`, `dala_stores_wards`, `dala_stores_status_admin`, `dala_stores_status_stores`, `dala_stores_info_banking`, `dala_stores_local_x`, `dala_stores_local_y`, `dala_stores_local_adress`, `dala_stores_qoute`, `dala_stores_status_update`, `dala_stores_payment_methods`, `dala_stores_payment_time`, `dala_stores_upload_limit_day`, `dala_stores_upload_limit_month`) VALUES
(17, 51, '2021-05-19 15:32:45', 'Cửa hàng đặt sản đà lạt DALA', 10000000, 3, 'asdasdasd', '', '', '', 1, 0, '', '', '', 'asdasdasd', 'asdasdasd', 1, 0, 28, 20, 300);

--
-- Đang đổ dữ liệu cho bảng `dala_users`
--

INSERT INTO `dala_users` (`dala_users_ID`, `dala_users_date_created`, `dala_users_name`, `dala_users_password`, `dala_users_first_name`, `dala_users_last_name`, `dala_users_adress`, `dala_users_phone`, `dala_users_email`, `dala_users_api_version`, `dala_users_router_version`, `dala_users_view_version`, `dala_users_js_css_version`, `dala_users_users_type_id`, `dala_users_shipping_status`, `dala_users_verification_status`, `dala_users_verification_code`, `dala_users_verification_time`) VALUES
(50, '2021-05-19 14:36:30', 'manage-dala', 'a3dcb4d229de6fde0db5686dee47145d', 'manage-dala', 'manage-dala', 'manage-dala', '0948036018', 'htms.group.vn@gmail.com', 'v4', 'v4', 'v4', 'v4', 13, 0, 0, '', NULL),
(51, '2021-05-19 14:37:36', 'dala-store', 'a3dcb4d229de6fde0db5686dee47145d', 'dala-store', 'dala-store', 'dala-store', '09480360101', 'dala-store@gmail.com', 'v4', 'v4', 'v4', 'v4', 14, 0, 0, '', NULL),
(52, '2021-05-19 14:39:27', 'saokim', 'a3dcb4d229de6fde0db5686dee47145d', 'Cua hang', 'Sao Kim', '11 Dang Duc Thuat', '09480360102', 'saokim.team@gmail.com', 'v4', 'v4', 'v4', 'v4', 14, 0, 0, '', NULL),
(55, '2021-05-19 14:45:47', 'tuanbao', 'a3dcb4d229de6fde0db5686dee47145d', 'tuanbao', 'tuanbao', 'tuanbao', '09480360105', 'tuanbao@gmail.com', 'v4', 'v4', 'v4', 'v4', 14, 0, 0, '', NULL),
(56, '2021-05-19 14:47:18', 'custommer', 'a3dcb4d229de6fde0db5686dee47145d', 'custommer', 'custommer', 'custommer', '09480360106', 'custommer@gmail.com', 'v4', 'v4', 'v4', 'v4', 15, 0, 0, '', NULL),
(57, '2021-05-19 14:48:49', 'GuestDalaAll', 'f5ca855650189adb730ef1dedd82dc25', 'GuestDalaAll', 'GuestDalaAll', 'GuestDalaAll', '09480360107', 'GuestDalaAll@gmail.com', 'v4', 'v4', 'v4', 'v4', 16, 0, 0, '', NULL);

--
-- Đang đổ dữ liệu cho bảng `dala_users_type`
--

INSERT INTO `dala_users_type` (`dala_users_type_ID`, `dala_users_type_name`, `dala_users_type_infomation`) VALUES
(13, 'admin', '354aae4c3655725e157156614010b592'),
(14, 'bussiness', '950a14f62033feb91295dcb123d88e06'),
(15, 'customer', 'c20284d123204abaf547da15957b17f8'),
(16, 'default', '319b17162d07a5697a5b2175279a54b0');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

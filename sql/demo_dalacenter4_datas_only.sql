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

INSERT INTO `dala_users` (`dala_users_ID`, `dala_users_date_created`, `dala_users_full_name`, `dala_users_password`, `dala_users_first_name`, `dala_users_last_name`, `dala_users_adress`, `dala_users_phone`, `dala_users_email`, `dala_users_api_version`, `dala_users_router_version`, `dala_users_view_version`, `dala_users_js_css_version`, `dala_users_users_type_id`, `dala_users_shipping_status`, `dala_users_verification_status`, `dala_users_verification_code`, `dala_users_verification_time`) VALUES
(50, '2021-05-19 14:36:30', 'manage-dala', 'a3dcb4d229de6fde0db5686dee47145d', 'manage-dala', 'manage-dala', 'manage-dala', '0948036018', 'htms.group.vn@gmail.com', 'v4', 'v4', 'v4', 'v4', 13, 0, 0, '', NULL),
(51, '2021-05-19 14:37:36', 'dala-store', 'a3dcb4d229de6fde0db5686dee47145d', 'dala-store', 'dala-store', 'dala-store', '09480360101', 'dala-store@gmail.com', 'v4', 'v4', 'v4', 'v4', 14, 0, 0, '', NULL),
(52, '2021-05-19 14:39:27', 'saokim', 'a3dcb4d229de6fde0db5686dee47145d', 'Cua hang', 'Sao Kim', '11 Dang Duc Thuat', '09480360102', 'saokim.team@gmail.com', 'v4', 'v4', 'v4', 'v4', 14, 0, 0, '', NULL),
(55, '2021-05-19 14:45:47', 'tuanbao', 'a3dcb4d229de6fde0db5686dee47145d', 'tuanbao', 'tuanbao', 'tuanbao', '09480360105', 'tuanbao@gmail.com', 'v4', 'v4', 'v4', 'v4', 14, 0, 0, '', NULL),
(56, '2021-05-19 14:47:18', 'custommer', 'a3dcb4d229de6fde0db5686dee47145d', 'custommer', 'custommer', 'custommer', '09480360106', 'custommer@gmail.com', 'v4', 'v4', 'v4', 'v4', 15, 0, 0, '', NULL),
(57, '2021-05-19 14:48:49', 'GuestDalaAll', '412789534f5cd5b263bb574ba2f09585', 'GuestDalaAll', 'GuestDalaAll', 'GuestDalaAll', '09480360107', 'GuestDalaAll@gmail.com', 'v4', 'v4', 'v4', 'v4', 16, 0, 0, '', NULL),
(62, '2021-05-19 14:48:49', 'supper-job', 'e6f6c1856909fd4b527b3ab04d0e99a3', 'supper-job', 'supper-job', 'supper-job', '0889450307', 'supper-job@gmail.com', 'v4', 'v4', 'v4', 'v4', 17, 0, 0, '', NULL);





--
-- Đang đổ dữ liệu cho bảng `dala_users_type`
--

INSERT INTO `dala_users_type` (`dala_users_type_ID`, `dala_users_type_name`, `dala_users_type_infomation`) VALUES
(13, 'admin', '354aae4c3655725e157156614010b592'),
(14, 'bussiness', '950a14f62033feb91295dcb123d88e06'),
(15, 'customer', 'c20284d123204abaf547da15957b17f8'),
(16, 'default', '319b17162d07a5697a5b2175279a54b0'),
(17, 'supper-job', '22e9dfe5055e7e35bd4f754a01c365f7');





--
-- Đang đổ dữ liệu cho bảng `dala_token`
--

INSERT INTO `dala_token` (`dala_token_ID`, `dala_token_key`, `dala_token_value`, `dala_token_date_created`)  VALUES 
(NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJfcm9sZSI6ImRlZmF1bHQiLCJpYXQiOjE2MjMyMjg3NTl9.iQrzkanw_3SAyFT03Kq3GbWLdpcZtvkuswhKaKtsn0M', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJzX3Bob25lIjoiMDk0ODAzNjAxMDciLCJ1c2Vyc19lbWFpbCI6Ikd1ZXN0RGFsYUFsbEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQxMjc4OTUzNGY1Y2Q1YjI2M2JiNTc0YmEyZjA5NTg1IiwidXNlcl9yb2xlIjoiZGVmYXVsdCIsImlhdCI6MTYyMzIyODc1OX0.q5Qv9zG_ynJsnOFFqcB4mDpMftZ9fxHToXbFfuAxXBo', CURRENT_TIMESTAMP),
(NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2VyX3JvbGUiOiJzdXBwZXItam9iIiwiaWF0IjoxNjIzNTUxNTE3fQ.lPM-4c93GPDnmwHwayVp94AXPtG0Zn7oyt5U8djJVwQ', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2Vyc19waG9uZSI6IjA4ODk0NTAzMDciLCJ1c2Vyc19lbWFpbCI6InN1cHBlci1qb2JAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJlNmY2YzE4NTY5MDlmZDRiNTI3YjNhYjA0ZDBlOTlhMyIsInVzZXJfcm9sZSI6InN1cHBlci1qb2IiLCJpYXQiOjE2MjM1NTE1MTd9.S37Ab2vDod4e9YErqdqeLEFTUt18WgEcxMUtsROdC7o', CURRENT_TIMESTAMP);














COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

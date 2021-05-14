-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 14, 2021 at 02:29 AM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dalacenter`
--

-- --------------------------------------------------------


INSERT INTO `dala_service_type` (`dala_service_type_ID`, `dala_service_type_name`, `dala_service_type_information`) VALUES
(3, 'speciality', 'dịch vụ bán hàng đặc sản đà lạt'),
(4, 'food-drink', 'dịch vụ ăn uống ăn uông');




INSERT INTO `dala_users_type` (`dala_users_type_ID`, `dala_users_type_name`, `dala_users_type_infomation`) VALUES
(13, 'admin', '354aae4c3655725e157156614010b592'),
(14, 'bussiness', '950a14f62033feb91295dcb123d88e06'),
(15, 'customer', 'c20284d123204abaf547da15957b17f8'),
(16, 'default', '319b17162d07a5697a5b2175279a54b0');





INSERT INTO `dala_users` (`dala_users_ID`, `dala_users_date_created`, `dala_users_name`, `dala_users_password`, `dala_users_first_name`, `dala_users_last_name`, `dala_users_adress`, `dala_users_phone`, `dala_users_email`, `dala_users_api_version`, `dala_users_router_version`, `dala_users_view_version`, `dala_users_js_css_version`, `dala_users_users_type_id`) VALUES
(47, '2021-03-31 08:06:08', 'manage-dala', '7f82bfc6e3496d56aeae85d2b5e169f4', 'manage-dala', 'manage-dala', 'manage-dala', '0948036018', 'htms.group.vn@gmail.com', 'v4', 'v4', 'v1', 'v1', 13),
(49, '2021-03-31 08:21:33', 'dala-store', '8f4f862bb970727afcd5e3c3aa1149c5', 'dala-store', 'dala-store', 'dala-store', '0948036011', 'dala-store@gmail.com', 'v4', 'v4', 'v1', 'v1', 14),
(51, '2021-04-09 01:32:11', 'demo1', 'cfc092a9a1e05926ef36482624fac88f', 'demo1', 'demo1', 'demo1', '0948036000', 'demo1@gmail.com', 'v4', 'v4', 'v1', 'v1', 14),
(53, '2021-04-10 13:29:13', 'cuahang4', 'a3dcb4d229de6fde0db5686dee47145d', 'cua hàng số 4', 'cua hàng số 4', 'cua hàng số 4', '0948036010', 'cuahangs@gmail.com', 'v4', 'v4', 'v1', 'v1', 14),
(54, '2021-04-10 13:34:33', 'custommer', 'a3dcb4d229de6fde0db5686dee47145d', 'custommer', 'custommer', 'custommer', '0948000009', 'custommer@gmail.com', 'v4', 'v4', 'v1', 'v1', 15),
(55, '2021-04-11 03:55:52', 'saokim', 'cf0ceab4214e7d246c87ef528f1ec72f', 'Cua hang', 'Sao Kim', '11 Dang Duc Thuat', '0909811811', 'saokim.team@gmail.com', 'v4', 'v4', 'v1', 'v1', 14),
(56, '2021-04-13 08:14:56', 'tuanbao', '7f82bfc6e3496d56aeae85d2b5e169f4', 'le', 'bao', '89 khu phố 4, P.Tân Mai, Biên Hòa, Đồng Nai', '0974900903', 'tuanbao92@gmail.com', 'v4', 'v4', 'v4', 'v4', 14);




INSERT INTO `dala_stores` (`dala_stores_ID`, `dala_stores_user_id`, `dala_stores_date_created`, `dala_stores_name`, `dala_stores_payment_limit`, `dala_stores_service_type_id`, `dala_stores_adress`, `dala_stores_province`, `dala_stores_district`, `dala_stores_wards`, `dala_stores_phone`, `dala_stores_status`, `dala_stores_status_stores`, `dala_stores_info_banking`, `dala_stores_local_x`, `dala_stores_local_y`, `dala_stores_local_adress`, `dala_stores_qoute`, `dala_stores_status_update`, `dala_stores_upload_limit_day`, `dala_stores_upload_limit_month`) VALUES
(17, 49, '2021-04-07 16:44:28', 'Cửa hàng đặt sản đà lạt DALA', 10000000, 3, '', 'asdsadasdasd', '', '', '0948036018', 2, 1, '', '', '', '', 'từ chối con cua  he he ok\n\n\ncon cua con', 1, 20, 300);













COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

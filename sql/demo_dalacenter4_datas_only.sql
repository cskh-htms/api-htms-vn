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
(17, 51, '2021-05-19 15:32:45', 'Cửa hàng đặt sản đà lạt DALA', 10000000, 3, 'asdasdasd', '', '', '', 1, 0, '', '', '', 'asdasdasd', 'asdasdasd', 1, 0, 28, 20, 300),
(18, 52, '2021-05-19 15:32:45', 'Cửa hàng sao kim', 10000000, 3, 'asdasdasd', '', '', '', 1, 0, '', '', '', 'asdasdasd', 'asdasdasd', 1, 0, 28, 20, 300);
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
(62, '2021-05-19 14:48:49', 'supper-job', 'e6f6c1856909fd4b527b3ab04d0e99a3', 'supper-job', 'supper-job', 'supper-job', '0889450307', 'supper-job@gmail.com', 'v4', 'v4', 'v4', 'v4', 17, 0, 0, '', NULL),
(63, '2021-05-19 14:48:49', 'shipping 1', 'a3dcb4d229de6fde0db5686dee47145d', 'shipping 1', 'shipping 1', 'shipping 1', '09480360121', 'shipping1@gmail.com', 'v4', 'v4', 'v4', 'v4', 18, 0, 0, '', NULL);




--
-- Đang đổ dữ liệu cho bảng `dala_users_type`
--

INSERT INTO `dala_users_type` (`dala_users_type_ID`, `dala_users_type_name`, `dala_users_type_infomation`) VALUES
(13, 'admin', '354aae4c3655725e157156614010b592'),
(14, 'bussiness', '950a14f62033feb91295dcb123d88e06'),
(15, 'customer', 'c20284d123204abaf547da15957b17f8'),
(16, 'default', '319b17162d07a5697a5b2175279a54b0'),
(17, 'supper-job', '22e9dfe5055e7e35bd4f754a01c365f7'),
(18, 'shipping', 'c18907b28bc58bce8aa0776e8cf0fae9');




--
-- Đang đổ dữ liệu cho bảng `dala_token`
--

INSERT INTO `dala_token` (`dala_token_ID`, `dala_token_key`, `dala_token_value`, `dala_token_date_created`)  VALUES 
(NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJfcm9sZSI6ImRlZmF1bHQiLCJpYXQiOjE2MjMyMjg3NTl9.iQrzkanw_3SAyFT03Kq3GbWLdpcZtvkuswhKaKtsn0M', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJzX3Bob25lIjoiMDk0ODAzNjAxMDciLCJ1c2Vyc19lbWFpbCI6Ikd1ZXN0RGFsYUFsbEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQxMjc4OTUzNGY1Y2Q1YjI2M2JiNTc0YmEyZjA5NTg1IiwidXNlcl9yb2xlIjoiZGVmYXVsdCIsImlhdCI6MTYyMzIyODc1OX0.q5Qv9zG_ynJsnOFFqcB4mDpMftZ9fxHToXbFfuAxXBo', CURRENT_TIMESTAMP),
(NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2VyX3JvbGUiOiJzdXBwZXItam9iIiwiaWF0IjoxNjIzNTUxNTE3fQ.lPM-4c93GPDnmwHwayVp94AXPtG0Zn7oyt5U8djJVwQ', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2Vyc19waG9uZSI6IjA4ODk0NTAzMDciLCJ1c2Vyc19lbWFpbCI6InN1cHBlci1qb2JAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJlNmY2YzE4NTY5MDlmZDRiNTI3YjNhYjA0ZDBlOTlhMyIsInVzZXJfcm9sZSI6InN1cHBlci1qb2IiLCJpYXQiOjE2MjM1NTE1MTd9.S37Ab2vDod4e9YErqdqeLEFTUt18WgEcxMUtsROdC7o', CURRENT_TIMESTAMP);





--
-- Đang đổ dữ liệu cho bảng `dala_category_general_speciality`
--
INSERT INTO `dala_category_general_speciality`(
    `dala_category_general_speciality_ID`,
    `dala_category_general_speciality_date_created`,
    `dala_category_general_speciality_name`,
    `dala_category_general_speciality_category_parent_id`,
    `dala_category_general_speciality_infomation`,
    `dala_category_general_speciality_featured_image`,
    `dala_category_general_speciality_sort_order`,
    `dala_category_general_speciality_show`,
    `dala_category_general_speciality_stores_status`,
    `dala_category_general_speciality_stores_id`,
    `dala_category_general_speciality_update_status`,
    `dala_category_general_speciality_admin_status`,
    `dala_category_general_speciality_type`,
    `dala_category_general_speciality_qoute`
)
VALUES  
(1,CURRENT_TIMESTAMP,'Mứt Đà Lạt','0','Mứt Đà Lạt','https://appdala.com/images/dala-logo.png','','0','1','17','1','1','0',''),
(2,CURRENT_TIMESTAMP,'Trái cây sấy dẻo','0','Trái cây sấy dẻo','https://appdala.com/images/dala-logo.png','','0','1','18','1','1','0',''),
(3,CURRENT_TIMESTAMP,'Trái cây sấy giòn','0','Trái cây sấy giòn','https://appdala.com/images/dala-logo.png','','0','1','17','1','1','0',''),
(4,CURRENT_TIMESTAMP,'Trà Đà Lạt','0','Trà Đà Lạt','https://appdala.com/images/dala-logo.png','','0','1','18','1','1','0',''),

(5,CURRENT_TIMESTAMP,'Kẹo dẻo','1','Kẹo dẻo','https://appdala.com/images/dala-logo.png','','0','1','17','1','1','0',''),
(6,CURRENT_TIMESTAMP,'Mứt Atiso','1','Mứt Atiso','https://appdala.com/images/dala-logo.png','','0','1','17','1','1','0',''),
(7,CURRENT_TIMESTAMP,'Mứt Bán chạy nhất','1','Mứt Bán chạy nhất','https://appdala.com/images/dala-logo.png','','0','1','17','1','1','0',''),

(8,CURRENT_TIMESTAMP,'Bưởi sấy dẻo','2','Bưởi sấy dẻo','https://appdala.com/images/dala-logo.png','','0','1','18','1','1','0',''),
(9,CURRENT_TIMESTAMP,'Cam sấy dẻo','2','Cam sấy dẻo','https://appdala.com/images/dala-logo.png','','0','1','18','1','1','0',''),
(10,CURRENT_TIMESTAMP,'Chuối sấy dẻo','2','Chuối sấy dẻo','https://appdala.com/images/dala-logo.png','','0','1','18','1','1','0',''),


(11,CURRENT_TIMESTAMP,'Chuối sấy giòn','3','Chuối sấy giòn','https://appdala.com/images/dala-logo.png','','0','1','18','1','1','0',''),
(12,CURRENT_TIMESTAMP,'Khoai lang sấy giòn','3','Khoai lang sấy giòn','https://appdala.com/images/dala-logo.png','','0','1','18','1','1','0',''),
(13,CURRENT_TIMESTAMP,'Mít sấy giòn','3','Mít sấy giòn','https://appdala.com/images/dala-logo.png','','0','1','18','1','1','0',''),
(17,CURRENT_TIMESTAMP,'Dâu sấy dẻo','3','Dâu sấy dẻo','https://appdala.com/images/dala-logo.png','','0','1','18','1','1','0',''),

(14,CURRENT_TIMESTAMP,'Trà Atiso','4','Trà Atiso','https://appdala.com/images/dala-logo.png','','0','1','18','1','1','0',''),
(15,CURRENT_TIMESTAMP,'Trà Bán chạy nhất','4','Trà Bán chạy nhất','https://appdala.com/images/dala-logo.png','','0','1','18','1','1','0',''),
(16,CURRENT_TIMESTAMP,'Trà Giảm giá Hót','4','Trà Giảm giá Hót','https://appdala.com/images/dala-logo.png','','0','1','18','1','1','0','');




--
-- Đang đổ dữ liệu cho bảng `dala_brands`
--
INSERT INTO `dala_brands`(
    `dala_brands_ID`,
    `dala_brands_date_created`,
    `dala_brands_name`,
    `dala_brands_featured_image`,
    `dala_brands_information`,
    `dala_brands_excerpt`,
    `dala_brands_status_stores`,
    `dala_brands_status_admin`,
    `dala_brands_status_update`,
    `dala_brands_stores_id`,
    `dala_brands_qoute`
)
VALUES   
(1,CURRENT_TIMESTAMP,'Nông lâm food','https://appdala.com/images/dala-logo.png','Nông lâm food','','1', '1', '1', '17', ''),
(2,CURRENT_TIMESTAMP,'BerryLand','https://appdala.com/images/dala-logo.png','BerryLand','','1', '1', '1', '18', ''),
(3,CURRENT_TIMESTAMP,'Ladophar','https://appdala.com/images/dala-logo.png','Nông lâm food','','1', '1', '1', '17', ''),
(4,CURRENT_TIMESTAMP,'Biofresh','https://appdala.com/images/dala-logo.png','BerryLand','','1', '1', '1', '18', ''),
(5,CURRENT_TIMESTAMP,'Dalat Natural Food','https://appdala.com/images/dala-logo.png','Nông lâm food','','1', '1', '1', '17', ''),
(6,CURRENT_TIMESTAMP,'Quốc Lộc Coffee','https://appdala.com/images/dala-logo.png','BerryLand','','1', '1', '1', '18', ''),
(7,CURRENT_TIMESTAMP,'LaFresh','https://appdala.com/images/dala-logo.png','BerryLand','','1', '1', '1', '18', '');










--
-- Đang đổ dữ liệu cho bảng `dala_options_product_speciality`
--
INSERT INTO `dala_options_product_speciality`(
    `dala_options_product_speciality_ID`,
    `dala_options_product_speciality_name`,
    `dala_options_product_speciality_featured_image`,
    `dala_options_product_speciality_parent_id`,
    `dala_options_product_speciality_stores_id`,
    `dala_options_product_speciality_status_stores`,
    `dala_options_product_speciality_status_admin`,
    `dala_options_product_speciality_status_update`,
    `dala_options_product_speciality_information`,
    `dala_options_product_speciality_date_created`,
    `dala_options_product_speciality_qoute`
)
VALUES 
(1,'Màu Sắc','https://appdala.com/images/dala-logo.png', '0', '17', '1', '1', '1',  'Màu Sắc',  CURRENT_TIMESTAMP, ''),
(2,'Màu đỏ','https://appdala.com/images/dala-logo.png', '1', '17', '1', '1', '1',  'Màu đỏ',  CURRENT_TIMESTAMP, ''),
(3,'Màu xanh','https://appdala.com/images/dala-logo.png', '1', '17', '1', '1', '1',  'Màu xanh',  CURRENT_TIMESTAMP, ''),


(4,'Kích thướt','https://appdala.com/images/dala-logo.png', '0', '18', '1', '1', '1',  'Kích thướt',  CURRENT_TIMESTAMP, ''),
(5,'Size lớn','https://appdala.com/images/dala-logo.png', '4', '18', '1', '1', '1',  'size lớn',  CURRENT_TIMESTAMP, ''),
(6,'Size nhỏ','https://appdala.com/images/dala-logo.png', '4', '18', '1', '1', '1',  'size nhỏ',  CURRENT_TIMESTAMP, '');




--
-- Đang đổ dữ liệu cho bảng `dala_products_speciality`
--
INSERT INTO `dala_products_speciality`(
    `dala_products_speciality_ID`,
    `dala_products_speciality_name`,
    `dala_products_speciality_type`,
    `dala_products_speciality_date_created`,
    `dala_products_speciality_sku`,
    `dala_products_speciality_store_id`,
    `dala_products_speciality_featured_image`,
    `dala_products_speciality_image_slider`,
    `dala_products_speciality_contents`,
    `dala_products_speciality_price`,
    `dala_products_speciality_sale_of_price`,
    `dala_products_speciality_date_start`,
    `dala_products_speciality_date_end`,
    `dala_products_speciality_stock`,
    `dala_products_speciality_brand`,
	`dala_products_speciality_origin`,
    `dala_products_speciality_status_admin`,
    `dala_products_speciality_status_store`,
    `dala_products_speciality_status_update`,
    `dala_products_speciality_variation_option`,
    `dala_products_speciality_excerpt`,
    `dala_products_speciality_qoute`,
    `dala_products_speciality_height`,
    `dala_products_speciality_width`,
    `dala_products_speciality_length`,
    `dala_products_speciality_weight`
)
VALUES 
('1', 'Kẹo dẻo phủ chocolate loại đặc biệt-220gr', '0', CURRENT_TIMESTAMP, 'KD1', '17',
    'https://appdala.com/images/dala-logo.png',
    'https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;',
    ' Kẹo dẻo phủ socola có vị ngọt nhẹ và dai, phủ một lớp socola mỏng, cho ta vị hậu đắng nhẹ tăng thêm độ hoàn hảo và một hương vị đặc trưng của vùng cao nguyên Đà Lạt.\r\n\r\nMàu sắc: Kẹo có màu sắc tự nhiên, phủ bên trên là lớp socola mỏng tạo cái nhìn thiện cảm cho người dùng.\r\nMùi vị: mỗi màu sắc là một vị khác nhau, chua,ngọt trộn với vị hậu đắng nhẹ gây kích thích vị giác.\r\nĂn trực tiếp.\r\nChỉ sử dụng acid citrid để bảo quản và duy trì màu sắc cho sản phẩm. Trẻ em, phụ nữ mang thai có thể sử dụng được.\r\n – Thành phần: Kẹo dẻo trái cây (70%), chocolate đen.\r\n\r\n – KLT: 220g\r\n\r\n – Hướng dẫn sử dụng: Mở bao bì và dùng trực tiếp. Làm kín miệng sau mỗi lần sử dụng.\r\n\r\n – Bảo quản: Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp.\r\n\r\n                      Không sử dụng sản phẩm khi có dấu hiệu ẩm mốc, xuất hiện mùi lạ.\r\n\r\nSản phẩm được phân phối bởi Dala.vn.',
    '70000','65000',  NULL, NULL, NULL,'2', 'Việt Nam','1', '1', '1','',
    '⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\r\n⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\r\n⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\r\n\r\n⇒ Mua số lượng lớn khách hàng ',
    '','10','10','10','200'
),
('2', 'Vỏ bưởi mật ong sấy dẻo-100gram', '0', CURRENT_TIMESTAMP, 'KD1', '18',
    'https://appdala.com/images/dala-logo.png',
    'https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;',
    '	⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng ⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.
		⇒ Mua số lượng lớn khách hàng vui lòng liên hệ Hotline: 0982900100 để có giá tốt nhất.
	',
    '70000','65000',  NULL, NULL, NULL,'2', 'Việt Nam', '1', '1', '1','',
    '⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\r\n⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\r\n⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\r\n\r\n⇒ Mua số lượng lớn khách hàng ',
    '','10','10','10','200'
),
('3', 'Khoai lang Nhật sợi sấy dòn loại Đặc Biệt-100gram', '0', CURRENT_TIMESTAMP, 'CS1', '17',
    'https://appdala.com/images/dala-logo.png',
    'https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;',
    '	
		KHOAI LANG NHẬT SỢI SẤY GIÒN
		Ai trong chúng ta cũng đều biết đến khoai lang, một loại thực phẩm tuy giản dị, thô sơ nhưng lại mang trong mình hàm lượng dinh dưỡng và chất xơ cao đến không ngờ. Nhưng, có chắc rằng bạn biết đến khoai lang ở dạng sợi chưa? Trong hình dáng mới, cọng thuôn dài, độ dài khoảng tầm 7cm, sản phẩm mang lại cho người dùng. một cảm giác ăn thật ngon miệng.
	',
    '35000','29000',  NULL, NULL, NULL,'2', 'Việt Nam','1', '1', '1','',
    '⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\r\n⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\r\n⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\r\n\r\n⇒ Mua số lượng lớn khách hàng ',
    '','10','10','10','200'
),
('4', 'Trà Actisô Túi Lọc Ladophar – 100 túi', '0', CURRENT_TIMESTAMP, 'TRA1', '18',
    'https://appdala.com/images/dala-logo.png',
    'https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;',
    '	
	
	Trà túi lọc Actiso là sản phấm chiết xuất từ thiên nhiên, với hương thơm và vị ngọt hoàn toàn tự nhiên nay được bổ sung thêm thành phần cao Actisô giúp tăng cường hiệu quả phòng ngừa và bảo vệ gan mật.
	Trà túi lọc Actiso được đóng gói theo quy cách 100 túi lọc x 2g, rất dễ dàng sử dụng cũng như bảo quản.
	Trà túi lọc Actiso rất tốt. Với công dụng mát gan, lợi tiểu, thông mật, rất thích hợp cho người bị yếu gan, nổi mề đay, vàng da. Có thể dùng hằng ngày thay nước lọc. 
	
   ',
    '35000','29000',  NULL, NULL, NULL,'2', 'Việt Nam','1', '1', '1','',
    '⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\r\n⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\r\n⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\r\n\r\n⇒ Mua số lượng lớn khách hàng ',
    '','10','10','10','200'
),
('5', 'Dâu tây sấy dẻo-150gr', '0', CURRENT_TIMESTAMP, 'DAU1', '17',
    'https://appdala.com/images/dala-logo.png',
    'https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;',
    '	
	
		Từ lâu, những quả dâu tây đỏ mọng nước đã nổi tiếng là nguồn cung cấp vitamin C dồi dào cho cơ thể, nhưng ít người biết tới loại quả này còn rất giàu các chất chống oxy hóa có lợi. Việc ăn dâu tây mỗi ngày giúp ngăn ngừa lão hóa, tăng cường hệ miễn dịch, giảm chứng viêm khớp, phòng ngừa tiểu đường cũng như sự hình thành và lan rộng của các khối u. Đặc biệt, dâu tây còn giúp cơ thể sản sinh các hormore hạnh phúc (dopamine, serotonin) không chỉ chữa chứng trầm cảm còn giúp thúc đẩy máu mang dưỡng chất tới não.
		Hiểu được được tầm quan trọng của dâu tây đối với sức khỏe, BerryLand đã sử dụng dây chuyền sản xuất hiện đại của mình để mang đến những quả dâu cô đặc đầy dinh dưỡng trong món Dâu Sấy Dẻo nổi tiếng của mình. Được sấy bằng công nghệ cao trong dây chuyền khép kín, Dâu sấy dẻo BerryLand không chỉ giữ được hàm lượng dinh dưỡng của trái cây tươi, mà còn làm giảm độ chua giúp tăng vị ngọt dịu cho những quả dâu thêm phần thơm ngon. Chính vì vậy, món ăn vặt dinh dưỡng này sẽ là lựa chọn phù hợp cho tất cả các đối tượng từ trẻ em, người lớn cho tới các mẹ bầu. Ngoài ra, sản phẩm được đóng gói nhỏ gọn, đẹp mắt phù hợp cho việc đãi khách, mang theo tới văn phòng, hay những chuyến du lịch xa.	
   
   ',
    '140000','120000',  NULL, NULL, NULL,'2', 'Việt Nam','1', '1', '1','',
    '⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\r\n⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\r\n⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\r\n\r\n⇒ Mua số lượng lớn khách hàng ',
    '','10','10','10','200'
),
('6', 'Trà Lado Linh Chi bổ gan mật – Hộp 20 Túi Lọc', '0', CURRENT_TIMESTAMP, 'DAU1', '18',
    'https://appdala.com/images/dala-logo.png',
    'https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;',
    '	
		⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng
		⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt
		⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.
		⇒ Mua số lượng lớn khách hàng vui lòng liên hệ Hotline: 0982900100 để có giá tốt nhất.
   ',
    '20000','17000',  NULL, NULL, NULL,'2', 'Việt Nam','1', '1', '1','',
    '⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\r\n⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\r\n⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\r\n\r\n⇒ Mua số lượng lớn khách hàng ',
    '','10','10','10','200'
);











--
-- Đang đổ dữ liệu cho bảng dala_category_general_speciality_link
--
INSERT INTO `dala_category_general_speciality_link`(
    `dala_category_general_speciality_link_ID`,
    `dala_category_general_speciality_link_product_id`,
    `dala_category_general_speciality_link_category_general_id`
)
VALUES 
(1, '1', '5'),
(2, '2', '8'),

(3, '3', '12'),
(4, '4', '14'),

(5, '5', '17'),
(6, '6', '14');






--
-- Đang đổ dữ liệu cho bảng dala_options_product_speciality_link
--
INSERT INTO `dala_options_product_speciality_link`(
    `dala_options_product_speciality_link_ID`,
    `dala_options_product_speciality_link_product_id`,
    `dala_options_product_speciality_link_option_id`,
    `dala_options_product_speciality_link_variation_type`
)
VALUES 
(1, '1', '2', '0'),
(2, '1', '3', '0'),

(3, '2', '5', '0'),
(4, '2', '6', '0'),

(5, '3', '2', '0'),
(6, '3', '3', '0'),

(7, '4', '5', '0'),
(8, '4', '6', '0');









--
-- Đang đổ dữ liệu cho bảng dala_orders_speciality
--
INSERT INTO `dala_orders_speciality`(
    `dala_orders_speciality_ID`,
    `dala_orders_speciality_user_id`,
    `dala_orders_speciality_date_orders`,
    `dala_orders_speciality_status_orders`,
    `dala_orders_speciality_status_payment`,
    `dala_orders_speciality_adress`,
    `dala_orders_speciality_notes`,
    `dala_orders_speciality_phone`,
    `dala_orders_speciality_email`,
    `dala_orders_speciality_shipping_code`
)
VALUES 
	('1','56',CURRENT_TIMESTAMP,'1','1','Biên hòa','','0948036018','custommers@gmail.com',''),
    ('2','56',CURRENT_TIMESTAMP,'1','1','Đà lạt','','0948036011','custommer2@gmail.com',''),
    ('3','56',CURRENT_TIMESTAMP,'1','1','Đồng nai','','0948036012','custommer3@gmail.com',''),
    ('4','56',CURRENT_TIMESTAMP,'1','1','TP HCM','','0948036013','custommer4@gmail.com','');





--
-- Đang đổ dữ liệu cho bảng dala_orders_details_speciality
--
INSERT INTO `dala_orders_details_speciality`(
    `dala_orders_details_speciality_ID`,
    `dala_orders_details_speciality_order_id`,
    `dala_orders_details_speciality_line_order`,
    `dala_orders_details_speciality_product_id`,
    `dala_orders_details_speciality_qty`,
    `dala_orders_details_speciality_price`,
    `dala_orders_details_medium_text`
)
VALUES 
	( NULL, '1','product','1','2','65000',''),
	( NULL, '1','product','2','2','65000',''),
	( NULL, '1','product','3','2','29000',''),


	( NULL, '2','product','1','2','65000',''),
	( NULL, '2','product','2','5','65000',''),
	( NULL, '2','product','3','1','29000',''),
	( NULL, '2','product','4','3','29000',''),



	( NULL, '3','product','4','2','29000',''),
	( NULL, '3','product','5','5','120000',''),
	( NULL, '3','product','6','1','17000',''),
	( NULL, '3','product','1','3','65000',''),


	( NULL, '4','product','6','3','17000',''),
	( NULL, '4','product','5','3','120000',''),
	( NULL, '4','product','4','5','29000',''),
	( NULL, '4','product','3','3','29000','');





--
-- Đang đổ dữ liệu cho bảng dala_news
--
INSERT INTO `dala_news`(
    `dala_news_ID`,
    `dala_news_title`,
    `dala_news_date_created`,
    `dala_news_featured_image`,
    `dala_news_excerpt`,
    `dala_news_contents`,
    `dala_news_status_admin`
)
VALUES 
	(
	1,'Dala hoàn thành app vào cuối tháng 7', CURRENT_TIMESTAMP,'https://appdala.com/images/dala-logo.png',
    'Dala hoàn thành app vào cuối tháng 7',
    '
	
	<div><img src=\"https://appdala.com/images/dala-logo.png\"/></div>\r\n<br>\r\n
	dala hoàn thành app vào cuối tháng 7, Đội ngủ thiết kế đã hoàn thiện giao diện suất sắc
	
	
	','1'
	),
	(
	2,'Dala hoàn thành API', CURRENT_TIMESTAMP,'https://appdala.com/images/dala-logo.png',
    'Dala hoàn thành API chờ kết nối app',
    '
	
	<div><img src=\"https://appdala.com/images/dala-logo.png\"/></div>\r\n<br>\r\n
	Dala hoàn thành API chờ kết nối app. những màn hình đâu tiên của APP đã xuất hiện, Đội ngủ lập trình đang rất hào hứng
	
	
	','1'
	),
	(
	3,'Dala hoàn thành kết nối API với APP', CURRENT_TIMESTAMP,'https://appdala.com/images/dala-logo.png',
    'Dala hoàn thành kết nối API với APP',
    '
	
	<div><img src=\"https://appdala.com/images/dala-logo.png\"/></div>\r\n<br>\r\n
	Dala hoàn thành kết nối API với APP. những màn hình đâu tiên của APP đã xuất hiện, Đội ngủ lập trình đang rất hào hứng, Cam kết hoàn thành trong tháng 7
	
	
	','1'
	),
	(
	4,'Dala hoàn thành app vào cuối tháng 7', CURRENT_TIMESTAMP,'https://appdala.com/images/dala-logo.png',
    'Dala hoàn thành app vào cuối tháng 7',
    'Dala hoàn thành app vào cuối tháng 7','1'
	),
	(
	5,'Dala hoàn thành API', CURRENT_TIMESTAMP,'https://appdala.com/images/dala-logo.png',
    'Dala hoàn thành API chờ kết nối app',
    'Dala hoàn thành API chờ kết nối app.','1'
	),
	(
	6,'Dala hoàn thành kết nối API với APP', CURRENT_TIMESTAMP,'https://appdala.com/images/dala-logo.png',
    'Dala hoàn thành kết nối API với APP',
    'Dala hoàn thành kết nối API với APP','1'
	);
	
	
	
-- -------------------------------------------------------------------------------------
-- 
-- 





--
-- Đang đổ dữ liệu cho bảng dala_category_news
--
INSERT INTO `dala_category_news`(
    `dala_category_news_ID`,
    `dala_category_news_date_created`,
    `dala_category_news_name`,
    `dala_category_news_parent_id`,
    `dala_category_news_featured_image`,
    `dala_category_news_infomation`,
    `dala_category_news_sort_order`,
    `dala_category_news_show`,
    `dala_category_news_status_admin`
)
VALUES 
	(1, CURRENT_TIMESTAMP, 'Tin Tức', '0', 'https://appdala.com/images/dala-logo.png', 'Tin Tức', '1', '1', '1'),
	(2, CURRENT_TIMESTAMP, 'Tin khuyến mãi', '0', 'https://appdala.com/images/dala-logo.png', 'Tin khuyến mãi', '1', '1', '1'),
	(3, CURRENT_TIMESTAMP, 'Tin Tức App', '0', 'https://appdala.com/images/dala-logo.png', 'Tin Tức App', '1', '1', '1');

-- ------------
-- ----------------------------------------------------------






--
-- Đang đổ dữ liệu cho bảng dala_category_news_link
--
INSERT INTO `dala_category_news_link`(
    `dala_category_news_link_ID`,
    `dala_category_news_link_news_id`,
    `dala_category_news_link_category_news_id`
)
VALUES 
(NULL, '1', '1'),
(NULL, '2', '1'),
(NULL, '3', '1'),
(NULL, '4', '3'),
(NULL, '5', '3'),
(NULL, '6', '3');


-- ------------------------------------------------





--
-- Đang đổ dữ liệu cho bảng dala_shipping_company
--
INSERT INTO `dala_shipping_company`(
    `dala_shipping_company_ID`,
    `dala_shipping_company_name`,
    `dala_shipping_company_information`
)
VALUES 
	( 1, 'DALA company ','Số 11 trương định, Dà lạt'),
	( 2, 'Giao hàng tiết kiệm ','Số 11 quận 8, TP hồ chí minh');


-- ----------------------------------------------------------------------



--
-- Đang đổ dữ liệu cho bảng dala_adress_meta
--
INSERT INTO `dala_adress_meta`(
    `dala_adress_meta_ID`,
    `dala_adress_meta_date_created`,
    `dala_adress_meta_user_id`,
    `dala_adress_meta_province`,
    `dala_adress_meta_district`,
    `dala_adress_meta_wards`,
    `dala_adress_meta_street`,
    `dala_adress_meta_full_adress`,
    `dala_adress_meta_status`
)
VALUES 
	(1,CURRENT_TIMESTAMP, '56', 'TP đà lạt', 'Quận 1', 'Phường 5', 'số 27, hẻm 14/3', 'TP đà lạt, Quận 1, Phường 5, số 27, hẻm 14/3',  '1'),
	(2,CURRENT_TIMESTAMP, '56', 'TP đà lạt', 'Quận 3', 'Phường 7', 'số 33, hẻm 55', 'TP đà lạt, Quận 3, Phường 7, số 33, hẻm 55',  '0'),
	(3,CURRENT_TIMESTAMP, '56', 'TP đà lạt', 'Quận 5', 'Phường 4', 'số 2, hẻm 77', 'TP đà lạt, Quận 5, Phường 4, số 2, hẻm 77',  '0');


-- ----------------------------------------------------------------------






--
-- Đang đổ dữ liệu cho bảng dala_shipping_tracking
--
INSERT INTO `dala_shipping_tracking`(
    `dala_shipping_tracking_ID`,
    `dala_shipping_tracking_date_created`,
    `dala_shipping_tracking_users_id`,
    `dala_shipping_tracking_orders_id`,
    `dala_shipping_tracking_infomation`,
    `dala_shipping_tracking_orders_status`,
    `dala_shipping_tracking_qoute`
)
VALUES 
	(1, CURRENT_TIMESTAMP,'63', '1','giao hàng trong ngày', '0','giao hàng trong ngày'),
	(2, CURRENT_TIMESTAMP,'63', '1','giao hàng trong ngày', '1','giao hàng trong ngày'),
	(3, CURRENT_TIMESTAMP,'63', '1','giao hàng trong ngày', '2','giao hàng trong ngày'),
	(4, CURRENT_TIMESTAMP,'63', '1','giao hàng trong ngày', '3','giao hàng trong ngày'),

	(5, CURRENT_TIMESTAMP,'63', '2','giao hàng trong ngày', '0','giao hàng trong ngày'),
	(6, CURRENT_TIMESTAMP,'63', '2','giao hàng trong ngày', '1','giao hàng trong ngày'),
	(7, CURRENT_TIMESTAMP,'63', '2','giao hàng trong ngày', '2','giao hàng trong ngày');



-- ----------------------------------------------------------------------






--
-- Đang đổ dữ liệu cho bảng dala_reviews_speciality
--
INSERT INTO `dala_reviews_speciality`(
    `dala_reviews_speciality_ID`,
    `dala_reviews_speciality_date_created`,
    `dala_reviews_speciality_user_id`,
    `dala_reviews_speciality_product_id`,
    `dala_reviews_speciality_contents`,
    `dala_reviews_speciality_status_admin`,
    `dala_reviews_speciality_number_star`
)
VALUES 
	(1, CURRENT_TIMESTAMP,'56', '1','Sản phẩm rất tốt, Đã mua và hài lòng vhới chất lượng và dịch vụ', '1', '5'),
	(2, CURRENT_TIMESTAMP,'56', '2','Sản phẩm rất tốt, Đã mua và hài lòng vhới chất lượng và dịch vụ', '1', '4'),
	(3, CURRENT_TIMESTAMP,'56', '3','Sản phẩm rất tốt, Đã mua và hài lòng vhới chất lượng và dịch vụ', '1', '3'),
	(4, CURRENT_TIMESTAMP,'56', '4','Sản phẩm rất tốt, Đã mua và hài lòng vhới chất lượng và dịch vụ', '1', '2');


-- ----------------------------------------------------------------------




--
-- Đang đổ dữ liệu cho bảng dala_comments_speciality
--
INSERT INTO `dala_comments_speciality`(
    `dala_comments_speciality_ID`,
    `dala_comments_speciality_date_created`,
    `dala_comments_speciality_user_id`,
    `dala_comments_speciality_comment_parent_id`,
    `dala_comments_speciality_product_id`,
    `dala_comments_speciality_contents`,
    `dala_comments_speciality_status_admin`
)
VALUES 
	(1 ,  CURRENT_TIMESTAMP, '56', '0', '1','sản phẩm tốt , rất hài lòng', '1'),
	(2 ,  CURRENT_TIMESTAMP, '56', '0', '2','sản phẩm tốt , rất hài lòng', '1'),
	(3 ,  CURRENT_TIMESTAMP, '56', '1', '1','sản phẩm tốt , rất hài lòng', '1'),
	(4 ,  CURRENT_TIMESTAMP, '56', '2', '2','sản phẩm tốt , rất hài lòng', '1'),
	(5 ,  CURRENT_TIMESTAMP, '56', '0', '3','sản phẩm tốt , rất hài lòng', '1');


-- -----------------------------------------------------------------------------




--
-- Đang đổ dữ liệu cho bảng dala_reviews_store_speciality
--
INSERT INTO `dala_reviews_store_speciality`(
    `dala_reviews_store_speciality_ID`,
    `dala_reviews_store_speciality_date_created`,
    `dala_reviews_store_speciality_user_id`,
    `dala_reviews_store_speciality_store_id`,
    `dala_reviews_store_speciality_contents`,
    `dala_reviews_store_speciality_status_admin`,
    `dala_reviews_store_speciality_number_star`
)
VALUES 
	(1, CURRENT_TIMESTAMP, '56', '17', 'Cửa hàng rất tốt- giao hàng nhanh, Chu đáo', '1', '5'),
	(2, CURRENT_TIMESTAMP, '56', '18', 'Cửa hàng rất tốt- giao hàng nhanh, Chu đáo', '1', '4');








--
-- Đang đổ dữ liệu cho bảng dala_like_product
--
INSERT INTO `dala_like_product`(
    `dala_like_product_ID`,
    `dala_like_product_date_created`,
    `dala_like_product_user_id`,
    `dala_like_product_product_id`
)
VALUES 
	(1, CURRENT_TIMESTAMP, '56', '1'),
	(2, CURRENT_TIMESTAMP, '56', '2'),
	(3, CURRENT_TIMESTAMP, '56', '3');








--
-- Đang đổ dữ liệu cho bảng dala_like_store
--
INSERT INTO `dala_like_store`(
    `dala_like_store_ID`,
    `dala_like_store_date_created`,
    `dala_like_store_user_id`,
    `dala_like_store_store_id`
)
VALUES 
	(1, CURRENT_TIMESTAMP, '56', '17');







--
-- Đang đổ dữ liệu cho bảng dala_view_product
--
INSERT INTO `dala_view_product`(
    `dala_view_product_ID`,
    `dala_view_product_date_created`,
    `dala_view_product_user_id`,
    `dala_view_product_product_id`
)
VALUES 
	(1, CURRENT_TIMESTAMP, '56', '1'),
	(2, CURRENT_TIMESTAMP, '56', '2'),
	(3, CURRENT_TIMESTAMP, '56', '3');






--
-- Đang đổ dữ liệu cho bảng dala_discount_program
--
INSERT INTO `dala_discount_program`(
    `dala_discount_program_ID`,
    `dala_discount_program_date_created`,
    `dala_discount_program_name`,
    `dala_discount_program_store_id_created`,
    `dala_discount_program_featured_image`,
    `dala_discount_program_price_created`,
    `dala_discount_program_price_sale`,
    `dala_discount_program_position`,
    `dala_discount_program_status_admin`,
    `dala_discount_program_status_update`,
    `dala_discount_program_price_one_day`,
    `dala_discount_program_price_one_product`,
    `dala_discount_program_limit_product`,
    `dala_discount_program_limit_day`,
    `dala_discount_program_date_star`,
    `dala_discount_program_date_end`,
    `dala_discount_program_information`,
    `dala_discount_program_qoute`
)
VALUES 
	(1, CURRENT_TIMESTAMP, 'flash sale', '17',
    'https://appdala.com/images/dala-logo.png',
    '0', '0','1','1','1', '0', '0', '0', '0', NULL,  NULL, '', 'Chương trình khuyến mãi Flash sale'
	),

	(2, CURRENT_TIMESTAMP, 'Mứt dâu giảm giá 40%', '17',
    'https://appdala.com/images/dala-logo.png',
    '0', '0','1','1','1', '0', '0', '0', '0', NULL,  NULL, '', 'Chương trình khuyến mãi Mứt dâu giảm giá 40%'
	),
	(3, CURRENT_TIMESTAMP, 'Sản phẩm theo mùa', '17',
    'https://appdala.com/images/dala-logo.png',
    '0', '0','1','1','1', '0', '0', '0', '0', NULL,  NULL, '', 'Chương trình khuyến mãi Sản phẩm theo mùa'
	);














-- 
-- 
-- 
-- 
-- 
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

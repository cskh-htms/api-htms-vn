-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 07, 2021 at 03:29 PM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dalacenter4`
--

-- --------------------------------------------------------

--
-- Table structure for table `dala_adress_meta`
--

DROP TABLE IF EXISTS `dala_adress_meta`;
CREATE TABLE IF NOT EXISTS `dala_adress_meta` (
  `dala_adress_meta_ID` int NOT NULL AUTO_INCREMENT,
  `dala_adress_meta_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_adress_meta_user_id` int NOT NULL,
  `dala_adress_meta_province` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_adress_meta_district` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_adress_meta_wards` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_adress_meta_street` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_adress_meta_full_adress` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_adress_meta_status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_adress_meta_ID`),
  KEY `adress_meta_user_id` (`dala_adress_meta_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_brands`
--

DROP TABLE IF EXISTS `dala_brands`;
CREATE TABLE IF NOT EXISTS `dala_brands` (
  `dala_brands_ID` int NOT NULL AUTO_INCREMENT,
  `dala_brands_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_brands_name` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_brands_featured_image` varchar(2000) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `dala_brands_information` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_brands_excerpt` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_brands_status_stores` int NOT NULL DEFAULT '0',
  `dala_brands_status_admin` int NOT NULL DEFAULT '0',
  `dala_brands_status_update` int NOT NULL DEFAULT '0',
  `dala_brands_stores_id` int NOT NULL,
  `dala_brands_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_brands_ID`),
  KEY `brands_stores_id` (`dala_brands_stores_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_brands`
--

INSERT INTO `dala_brands` (`dala_brands_ID`, `dala_brands_date_created`, `dala_brands_name`, `dala_brands_featured_image`, `dala_brands_information`, `dala_brands_excerpt`, `dala_brands_status_stores`, `dala_brands_status_admin`, `dala_brands_status_update`, `dala_brands_stores_id`, `dala_brands_qoute`) VALUES
(1, '2021-07-22 16:32:02', 'Nông lâm food', '', '', '', 1, 1, 1, 17, ''),
(2, '2021-07-22 16:32:16', 'BerryLand', '', '', '', 1, 1, 1, 17, ''),
(3, '2021-07-22 16:32:41', 'Ladophar', '', '', '', 1, 1, 1, 17, ''),
(4, '2021-07-22 16:32:56', 'Biofresh', '', '', '', 1, 1, 1, 17, ''),
(5, '2021-07-22 16:33:12', 'Dalat Natural Food', '', '', '', 1, 1, 1, 17, ''),
(6, '2021-07-22 16:33:36', 'Quốc Lộc Coffee', '', '', '', 1, 1, 1, 17, ''),
(7, '2021-07-22 16:34:01', 'BaolocReal coffee', '', '', '', 1, 1, 1, 17, '');

--
-- Triggers `dala_brands`
--
DROP TRIGGER IF EXISTS `trig_brands_name_insert`;
DELIMITER $$
CREATE TRIGGER `trig_brands_name_insert` BEFORE INSERT ON `dala_brands` FOR EACH ROW BEGIN  





IF(NEW.dala_brands_name  is null or NEW.dala_brands_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_brands_name_name_empty';   
END IF;





END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_brands_name_update`;
DELIMITER $$
CREATE TRIGGER `trig_brands_name_update` BEFORE INSERT ON `dala_brands` FOR EACH ROW BEGIN  





IF(NEW.dala_brands_name  is null or NEW.dala_brands_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_brands_name_name_empty';   
END IF;





END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_general_food_drink`
--

DROP TABLE IF EXISTS `dala_category_general_food_drink`;
CREATE TABLE IF NOT EXISTS `dala_category_general_food_drink` (
  `dala_category_general_food_drink_ID` int NOT NULL AUTO_INCREMENT,
  `dala_category_general_food_drink_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_category_general_food_drink_name` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_general_food_drink_category_parent_id` int NOT NULL DEFAULT '0',
  `dala_category_general_food_drink_infomation` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_general_food_drink_featured_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_general_food_drink_sort_order` int NOT NULL DEFAULT '0',
  `dala_category_general_food_drink_show` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_category_general_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_general_food_drink_link`
--

DROP TABLE IF EXISTS `dala_category_general_food_drink_link`;
CREATE TABLE IF NOT EXISTS `dala_category_general_food_drink_link` (
  `dala_category_general_food_drink_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_category_general_food_drink_link_product_id` int NOT NULL,
  `dala_category_general_food_drink_link_category_general_id` int NOT NULL,
  PRIMARY KEY (`dala_category_general_food_drink_link_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_general_speciality`
--

DROP TABLE IF EXISTS `dala_category_general_speciality`;
CREATE TABLE IF NOT EXISTS `dala_category_general_speciality` (
  `dala_category_general_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_category_general_speciality_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_category_general_speciality_name` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_general_speciality_category_parent_id` int NOT NULL DEFAULT '0',
  `dala_category_general_speciality_infomation` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_general_speciality_featured_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_general_speciality_sort_order` tinyint NOT NULL,
  `dala_category_general_speciality_show` tinyint NOT NULL DEFAULT '0',
  `dala_category_general_speciality_stores_status` tinyint NOT NULL DEFAULT '0',
  `dala_category_general_speciality_stores_id` int NOT NULL,
  `dala_category_general_speciality_update_status` tinyint NOT NULL DEFAULT '0',
  `dala_category_general_speciality_admin_status` tinyint NOT NULL DEFAULT '0',
  `dala_category_general_speciality_type` tinyint NOT NULL DEFAULT '0',
  `dala_category_general_speciality_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_category_general_speciality_ID`),
  KEY `category_general_speciality_stores_id` (`dala_category_general_speciality_stores_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_category_general_speciality`
--

INSERT INTO `dala_category_general_speciality` (`dala_category_general_speciality_ID`, `dala_category_general_speciality_date_created`, `dala_category_general_speciality_name`, `dala_category_general_speciality_category_parent_id`, `dala_category_general_speciality_infomation`, `dala_category_general_speciality_featured_image`, `dala_category_general_speciality_sort_order`, `dala_category_general_speciality_show`, `dala_category_general_speciality_stores_status`, `dala_category_general_speciality_stores_id`, `dala_category_general_speciality_update_status`, `dala_category_general_speciality_admin_status`, `dala_category_general_speciality_type`, `dala_category_general_speciality_qoute`) VALUES
(1, '2021-07-22 16:42:57', 'Mứt Đà Lạt', 0, '', 'https://appdala.net/wp-content/uploads/mut-da-lat.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(2, '2021-07-22 16:43:51', 'Trái cây sấy dẻo', 0, '', 'https://appdala.net/wp-content/uploads/Cam-say-deo-mieng-dd.png', 0, 0, 1, 17, 1, 1, 0, ''),
(3, '2021-07-22 16:44:36', 'Trái cây sấy giòn', 0, '', 'https://appdala.net/wp-content/uploads/da3728fda069e59045a35f2690f54473.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(4, '2021-07-22 16:45:30', 'Trà Đà Lạt', 0, '', 'https://appdala.net/wp-content/uploads/bbb414fce57effb6f515f645dba86d93.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(5, '2021-07-22 16:47:02', 'Cà phê Đà Lạt', 0, '', 'https://appdala.net/wp-content/uploads/34a9337cfaed3db1a2774372d437736e.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(6, '2021-07-22 16:47:51', 'Thảo mộc các loại', 0, '', 'https://appdala.net/wp-content/uploads/3cdda630132c82aaf892d1f884467b31.jpg_720x720q80.jpg_.webp', 0, 0, 1, 17, 1, 1, 0, ''),
(7, '2021-07-22 16:48:51', 'Nước ép siro trái cây', 0, '', 'https://appdala.net/wp-content/uploads/2ece254fbcda49414fdf897a175e75ae.png', 0, 0, 1, 17, 1, 1, 0, ''),
(8, '2021-07-22 16:50:39', 'Nông sản sạch đà lạt', 0, '', 'https://appdala.net/wp-content/uploads/21881afa49d23f9683a73615771d0464.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(9, '2021-07-22 16:53:44', 'Kẹo dẻo', 1, '', 'https://appdala.net/wp-content/uploads/images-5.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(10, '2021-07-22 16:55:04', 'Mứt Atiso', 1, '', 'https://appdala.net/wp-content/uploads/cach-lam-mut-atiso.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(11, '2021-07-22 16:55:36', 'Mứt Chanh dây', 1, '', 'https://appdala.net/wp-content/uploads/mut-chanh-day-1.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(12, '2021-07-22 16:56:56', 'Bưởi sấy dẻo', 2, '', 'https://appdala.net/wp-content/uploads/Vo-buoi-say-deo-5.png', 0, 0, 1, 17, 1, 1, 0, ''),
(13, '2021-07-22 16:57:43', 'Cam sấy dẻo', 2, '', 'https://appdala.net/wp-content/uploads/Cam-say-deo-mieng-dd-1.png', 0, 0, 1, 17, 1, 1, 0, ''),
(14, '2021-07-22 16:58:34', 'Chuối sấy dẻo', 2, '', 'https://appdala.net/wp-content/uploads/Chuoi-say-gion-2.png', 0, 0, 1, 17, 1, 1, 0, ''),
(15, '2021-07-22 17:00:24', 'Dâu tây sấy dẻo', 2, '', 'https://appdala.net/wp-content/uploads/78172ebc76c0f9bb2d29b7250fd63957.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(16, '2021-07-22 17:01:14', 'Hồng sấy dẻo', 2, '', 'https://appdala.net/wp-content/uploads/Quat-deo.png', 0, 0, 1, 17, 1, 1, 0, ''),
(17, '2021-07-22 17:02:17', 'Mãng cầu sấy dẻo', 2, '', 'https://appdala.net/wp-content/uploads/mang-cau-say.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(18, '2021-07-22 17:07:35', 'Chuối sấy giòn', 3, '', 'https://appdala.net/wp-content/uploads/2e9b4494388685cb3c627da9cf9781db.jpg_720x720q80.jpg_.webp', 0, 0, 1, 17, 1, 1, 0, ''),
(19, '2021-07-22 17:09:29', 'Khoai lang sấy giòn', 3, '', 'https://appdala.net/wp-content/uploads/khoai-lang.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(20, '2021-07-22 17:10:09', 'Mít sấy giòn', 3, '', 'https://appdala.net/wp-content/uploads/Mit-say-gion.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(21, '2021-07-22 22:48:57', 'Thập cẩm sấy giòn', 3, '', 'https://appdala.net/wp-content/uploads/4b8ee6587c99d0b270a16cb10672b32b-2.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(22, '2021-07-22 22:50:47', 'Trà Atiso', 4, '', 'https://appdala.net/wp-content/uploads/tra-atiso-dalat-4.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(23, '2021-07-22 22:51:31', 'Trà Linh Chi', 4, '', 'https://appdala.net/wp-content/uploads/tra-linh-chi-thuc-uong-giai-khat-va-phong-benh-hieu-qua1506907162.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(24, '2021-07-22 22:52:12', 'Trà túi lọc', 4, '', 'https://appdala.net/wp-content/uploads/Tra-tui-loc-1.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(25, '2021-07-22 22:54:48', 'Cao đặt actiso', 6, '', 'https://appdala.net/wp-content/uploads/cao_dac_22_new_768ae69b77804b74abc8c4bbe889d5dc_large.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(26, '2021-07-22 22:55:37', 'Cao uống actiso', 6, '', 'https://appdala.net/wp-content/uploads/3d_ladoactiso_cao_ong_co_duong_master_new_fcbe512fceda499abb1755d22c48ac07_large.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(27, '2021-07-22 22:57:44', 'Các loại hạt', 8, '', 'https://appdala.net/wp-content/uploads/hat-macca-lam-dong.jpg', 0, 0, 1, 17, 1, 1, 0, ''),
(28, '2021-07-22 22:58:37', 'Gạo nếp', 8, '', 'https://appdala.net/wp-content/uploads/tai-xuong.jpg', 0, 0, 1, 17, 1, 1, 0, '');

--
-- Triggers `dala_category_general_speciality`
--
DROP TRIGGER IF EXISTS `trig_category_general_speciality_category_parent_id_insert`;
DELIMITER $$
CREATE TRIGGER `trig_category_general_speciality_category_parent_id_insert` BEFORE INSERT ON `dala_category_general_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_category_general_speciality_category_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_category_general_speciality_ID  
	from dala_category_general_speciality 
	where dala_category_general_speciality_ID = NEW.dala_category_general_speciality_category_parent_id);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_category_general_speciality_category_parent_id_no_parent'; 
	END IF;	
END IF;


END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_category_general_speciality_name_insert`;
DELIMITER $$
CREATE TRIGGER `trig_category_general_speciality_name_insert` BEFORE INSERT ON `dala_category_general_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_category_general_speciality_name  is null or NEW.dala_category_general_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_category_general_speciality_name_name_empty';   
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_category_general_speciality_stores_id_insert`;
DELIMITER $$
CREATE TRIGGER `trig_category_general_speciality_stores_id_insert` BEFORE INSERT ON `dala_category_general_speciality` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_category_general_speciality_stores_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_category_general_speciality_stores_id_empty';   
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_general_speciality_link`
--

DROP TABLE IF EXISTS `dala_category_general_speciality_link`;
CREATE TABLE IF NOT EXISTS `dala_category_general_speciality_link` (
  `dala_category_general_speciality_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_category_general_speciality_link_product_id` int NOT NULL,
  `dala_category_general_speciality_link_category_general_id` int NOT NULL,
  PRIMARY KEY (`dala_category_general_speciality_link_ID`),
  KEY `category_general_speciality_link_category_general_id` (`dala_category_general_speciality_link_category_general_id`),
  KEY `category_general_speciality_link_product_id` (`dala_category_general_speciality_link_product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_category_general_speciality_link`
--

INSERT INTO `dala_category_general_speciality_link` (`dala_category_general_speciality_link_ID`, `dala_category_general_speciality_link_product_id`, `dala_category_general_speciality_link_category_general_id`) VALUES
(97, 8, 2),
(98, 8, 13),
(99, 7, 2),
(100, 7, 12),
(123, 18, 8),
(124, 18, 27),
(125, 13, 6),
(126, 13, 25),
(127, 12, 4),
(128, 12, 22),
(129, 11, 3),
(130, 11, 18),
(131, 10, 2),
(132, 10, 15),
(133, 9, 2),
(134, 9, 14),
(135, 6, 1),
(136, 6, 11),
(137, 5, 1),
(138, 5, 9),
(139, 4, 1),
(140, 4, 10),
(141, 3, 1),
(142, 3, 9),
(143, 19, 8),
(144, 19, 27),
(145, 20, 8),
(146, 20, 27);

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_news`
--

DROP TABLE IF EXISTS `dala_category_news`;
CREATE TABLE IF NOT EXISTS `dala_category_news` (
  `dala_category_news_ID` int NOT NULL AUTO_INCREMENT,
  `dala_category_news_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_category_news_name` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_news_parent_id` int NOT NULL DEFAULT '0',
  `dala_category_news_featured_image` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `dala_category_news_infomation` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_news_sort_order` tinyint(1) NOT NULL DEFAULT '1',
  `dala_category_news_show` tinyint(1) NOT NULL DEFAULT '1',
  `dala_category_news_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_category_news_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `dala_category_news`
--
DROP TRIGGER IF EXISTS `trig_category_news_insert`;
DELIMITER $$
CREATE TRIGGER `trig_category_news_insert` BEFORE INSERT ON `dala_category_news` FOR EACH ROW BEGIN  




IF(NEW.dala_category_news_name  is null or NEW.dala_category_news_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_category_news_name_empty';   
END IF;







IF(NEW.dala_category_news_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_category_news_ID   
	from dala_category_news  
	where dala_category_news_ID = NEW.dala_category_news_parent_id);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_category_news_no_parent'; 
	END IF;	
END IF;






END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_category_news_update`;
DELIMITER $$
CREATE TRIGGER `trig_category_news_update` BEFORE UPDATE ON `dala_category_news` FOR EACH ROW BEGIN  




IF(NEW.dala_category_news_name  is null or NEW.dala_category_news_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_category_news_name_empty';   
END IF;







IF(NEW.dala_category_news_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_category_news_ID   
	from dala_category_news  
	where dala_category_news_ID = NEW.dala_category_news_parent_id);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_category_news_no_parent'; 
	END IF;	
END IF;






END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_news_link`
--

DROP TABLE IF EXISTS `dala_category_news_link`;
CREATE TABLE IF NOT EXISTS `dala_category_news_link` (
  `dala_category_news_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_category_news_link_news_id` int NOT NULL,
  `dala_category_news_link_category_news_id` int NOT NULL,
  PRIMARY KEY (`dala_category_news_link_ID`),
  KEY `category_news_link_news_id` (`dala_category_news_link_news_id`),
  KEY `category_news_link_category_news_id` (`dala_category_news_link_category_news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_comments_food_drink`
--

DROP TABLE IF EXISTS `dala_comments_food_drink`;
CREATE TABLE IF NOT EXISTS `dala_comments_food_drink` (
  `dala_comments_food_drink_ID` int NOT NULL AUTO_INCREMENT,
  `dala_comments_food_drink_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_comments_food_drink_user_id` int NOT NULL,
  `dala_comments_food_drink_comment_parent_id` int DEFAULT '0',
  `dala_comments_food_drink_product_id` int NOT NULL,
  `dala_comments_food_drink_contents` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_comments_food_drink_status_store` int NOT NULL DEFAULT '0',
  `dala_comments_food_drink_status_admin` int NOT NULL DEFAULT '0',
  `dala_comments_food_drink_status_update` int NOT NULL DEFAULT '0',
  `dala_comments_food_drink_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_comments_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_comments_news`
--

DROP TABLE IF EXISTS `dala_comments_news`;
CREATE TABLE IF NOT EXISTS `dala_comments_news` (
  `dala_comments_news_ID` int NOT NULL AUTO_INCREMENT,
  `dala_comments_news_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_comments_news_user_id` int NOT NULL,
  `dala_comments_news_comment_parent_id` int NOT NULL DEFAULT '0',
  `dala_comments_news_news_id` int NOT NULL,
  `dala_comments_news_contents` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_comments_news_status_store` int NOT NULL DEFAULT '0',
  `dala_comments_news_status_admin` int NOT NULL DEFAULT '0',
  `dala_comments_news_status_update` tinyint(1) NOT NULL DEFAULT '0',
  `dala_comments_news_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_comments_news_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_comments_speciality`
--

DROP TABLE IF EXISTS `dala_comments_speciality`;
CREATE TABLE IF NOT EXISTS `dala_comments_speciality` (
  `dala_comments_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_comments_speciality_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_comments_speciality_user_id` int NOT NULL,
  `dala_comments_speciality_comment_parent_id` int DEFAULT '0',
  `dala_comments_speciality_product_id` int NOT NULL,
  `dala_comments_speciality_contents` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_comments_speciality_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_comments_speciality_ID`),
  KEY `comments_speciality_user_id` (`dala_comments_speciality_user_id`),
  KEY `comments_speciality_product_id` (`dala_comments_speciality_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `dala_comments_speciality`
--
DROP TRIGGER IF EXISTS `trig_comments_speciality_comment_parent_id_insert`;
DELIMITER $$
CREATE TRIGGER `trig_comments_speciality_comment_parent_id_insert` BEFORE INSERT ON `dala_comments_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_comments_speciality_comment_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_comments_speciality_ID 
	from dala_comments_speciality   
	where dala_comments_speciality_ID = NEW.dala_comments_speciality_ID);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_comments_speciality_comment_parent_id_no_parent'; 
	END IF;	
END IF;


END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_comments_speciality_comment_parent_id_update`;
DELIMITER $$
CREATE TRIGGER `trig_comments_speciality_comment_parent_id_update` BEFORE UPDATE ON `dala_comments_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_comments_speciality_comment_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_comments_speciality_ID 
	from dala_comments_speciality   
	where dala_comments_speciality_ID = NEW.dala_comments_speciality_ID);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_comments_speciality_comment_parent_id_no_parent'; 
	END IF;	
END IF;


END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_comments_speciality_product_id_insert`;
DELIMITER $$
CREATE TRIGGER `trig_comments_speciality_product_id_insert` BEFORE INSERT ON `dala_comments_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_comments_speciality_product_id  is null or NEW.dala_comments_speciality_product_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_comments_speciality_product_id_empty';   
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_comments_speciality_product_id_update`;
DELIMITER $$
CREATE TRIGGER `trig_comments_speciality_product_id_update` BEFORE UPDATE ON `dala_comments_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_comments_speciality_product_id  is null or NEW.dala_comments_speciality_product_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_comments_speciality_product_id_empty';   
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_comments_speciality_user_id_insert`;
DELIMITER $$
CREATE TRIGGER `trig_comments_speciality_user_id_insert` BEFORE INSERT ON `dala_comments_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_comments_speciality_user_id  is null or NEW.dala_comments_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_comments_speciality_user_id_empty';   
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_comments_speciality_user_id_update`;
DELIMITER $$
CREATE TRIGGER `trig_comments_speciality_user_id_update` BEFORE UPDATE ON `dala_comments_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_comments_speciality_user_id  is null or NEW.dala_comments_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_comments_speciality_user_id_empty';   
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_coupon_speciality`
--

DROP TABLE IF EXISTS `dala_coupon_speciality`;
CREATE TABLE IF NOT EXISTS `dala_coupon_speciality` (
  `dala_coupon_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_coupon_speciality_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_coupon_speciality_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_coupon_speciality_stores_id_created` int NOT NULL,
  `dala_coupon_speciality_info` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_coupon_speciality_type` tinyint(1) NOT NULL DEFAULT '0',
  `dala_coupon_speciality_formula_price` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Công thức tính giá',
  `dala_coupon_speciality_formula_price_value` double NOT NULL DEFAULT '0' COMMENT 'Giá trị tính giá',
  `dala_coupon_speciality_condition` tinyint(1) NOT NULL DEFAULT '0',
  `dala_coupon_speciality_condition_value` double NOT NULL DEFAULT '0',
  `dala_coupon_speciality_price_max` double NOT NULL DEFAULT '0' COMMENT 'Tiền giảm giá tối đa',
  `dala_coupon_speciality_date_star` datetime DEFAULT NULL,
  `dala_coupon_speciality_date_end` datetime DEFAULT NULL,
  `dala_coupon_speciality_multiple` int NOT NULL DEFAULT '0' COMMENT 'dùng chung với mã giảm giá khác',
  `dala_coupon_speciality_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_coupon_speciality_status_update` tinyint(1) NOT NULL DEFAULT '0',
  `dala_coupon_speciality_limit_user` tinyint(1) NOT NULL DEFAULT '0',
  `dala_coupon_speciality_limit_number` int NOT NULL DEFAULT '0' COMMENT 'giới hạn số lượng dùng code',
  `dala_coupon_speciality_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_coupon_speciality_ID`),
  KEY `coupon_speciality_stores_id_created` (`dala_coupon_speciality_stores_id_created`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_coupon_speciality`
--

INSERT INTO `dala_coupon_speciality` (`dala_coupon_speciality_ID`, `dala_coupon_speciality_date_created`, `dala_coupon_speciality_code`, `dala_coupon_speciality_stores_id_created`, `dala_coupon_speciality_info`, `dala_coupon_speciality_type`, `dala_coupon_speciality_formula_price`, `dala_coupon_speciality_formula_price_value`, `dala_coupon_speciality_condition`, `dala_coupon_speciality_condition_value`, `dala_coupon_speciality_price_max`, `dala_coupon_speciality_date_star`, `dala_coupon_speciality_date_end`, `dala_coupon_speciality_multiple`, `dala_coupon_speciality_status_admin`, `dala_coupon_speciality_status_update`, `dala_coupon_speciality_limit_user`, `dala_coupon_speciality_limit_number`, `dala_coupon_speciality_qoute`) VALUES
(1, '2021-10-03 15:24:45', 'MPVC-DALA', 17, '					miễn phí vận chuyển cho đơn hàng lớn hơn 500.000 đ					', 0, 2, 0, 1, 500000, 30000, NULL, NULL, 0, 4, 1, 0, 0, ''),
(3, '2021-10-04 14:40:56', 'NLF-MPVC', 18, '', 0, 2, 0, 1, 300000, 50000, NULL, NULL, 0, 4, 1, 0, 0, ''),
(4, '2021-10-06 11:34:05', 'MPVC ALL', 17, 'mieễn ph&iacute; vận chuyển tất cả', 1, 0, 0, 1, 200000, 200000, NULL, NULL, 0, 4, 1, 0, 0, ''),
(6, '2021-10-07 14:10:43', 'THANG10', 17, '', 1, 0, 10, 1, 1000000, 200000, NULL, NULL, 0, 4, 0, 0, 0, ''),
(7, '2021-10-07 14:30:02', 'FIRST-SALE', 17, 'giảm gái cho đơn hàng đầu tiên tại DALA', 1, 0, 10, 3, 0, 200000, NULL, NULL, 0, 4, 0, 0, 0, '');

--
-- Triggers `dala_coupon_speciality`
--
DROP TRIGGER IF EXISTS `trig_coupon_speciality_code_insert`;
DELIMITER $$
CREATE TRIGGER `trig_coupon_speciality_code_insert` BEFORE INSERT ON `dala_coupon_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_coupon_speciality_code  is null or NEW.dala_coupon_speciality_code = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_coupon_speciality_code_empty';   
END IF;	





IF(NEW.dala_coupon_speciality_date_star is null  and  NEW.dala_coupon_speciality_date_end is null) THEN 
	SIGNAL SQLSTATE '01000';
ELSE 
	IF( (UNIX_TIMESTAMP(NEW.dala_coupon_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_coupon_speciality_date_star)) <= 0 ) THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_coupon_speciality_code_date_end_less_star';   
	END IF;
END IF;	



END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_coupon_speciality_code_update`;
DELIMITER $$
CREATE TRIGGER `trig_coupon_speciality_code_update` BEFORE UPDATE ON `dala_coupon_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_coupon_speciality_code  is null or NEW.dala_coupon_speciality_code = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_coupon_speciality_code_empty';   
END IF;	







IF(NEW.dala_coupon_speciality_date_star is null  and  NEW.dala_coupon_speciality_date_end is null) THEN 
	SIGNAL SQLSTATE '01000';
ELSE 
	IF( (UNIX_TIMESTAMP(NEW.dala_coupon_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_coupon_speciality_date_star)) <= 0 ) THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_coupon_speciality_code_date_end_less_star';   
	END IF;
END IF;	


END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_discount_program`
--

DROP TABLE IF EXISTS `dala_discount_program`;
CREATE TABLE IF NOT EXISTS `dala_discount_program` (
  `dala_discount_program_ID` int NOT NULL AUTO_INCREMENT,
  `dala_discount_program_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_discount_program_name` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_discount_program_store_id_created` int NOT NULL,
  `dala_discount_program_featured_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_discount_program_price_created` double NOT NULL DEFAULT '0',
  `dala_discount_program_price_sale` tinyint(1) NOT NULL DEFAULT '0',
  `dala_discount_program_position` tinyint(1) NOT NULL DEFAULT '1',
  `dala_discount_program_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: DALA trả tiền, 1: cửa hàng trả tiền',
  `dala_discount_program_time_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: Không có thời hạn, 1: có thời hạn',
  `dala_discount_program_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_discount_program_status_update` tinyint(1) NOT NULL DEFAULT '0',
  `dala_discount_program_price_one_day` double NOT NULL DEFAULT '0',
  `dala_discount_program_price_one_product` double NOT NULL DEFAULT '0',
  `dala_discount_program_limit_product` tinyint(1) NOT NULL DEFAULT '0',
  `dala_discount_program_limit_day` tinyint(1) NOT NULL DEFAULT '0',
  `dala_discount_program_date_star` datetime DEFAULT NULL,
  `dala_discount_program_date_end` datetime DEFAULT NULL,
  `dala_discount_program_information` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_discount_program_qoute` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_discount_program_ID`),
  KEY `discount_program_store_id_created` (`dala_discount_program_store_id_created`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_discount_program`
--

INSERT INTO `dala_discount_program` (`dala_discount_program_ID`, `dala_discount_program_date_created`, `dala_discount_program_name`, `dala_discount_program_store_id_created`, `dala_discount_program_featured_image`, `dala_discount_program_price_created`, `dala_discount_program_price_sale`, `dala_discount_program_position`, `dala_discount_program_type`, `dala_discount_program_time_type`, `dala_discount_program_status_admin`, `dala_discount_program_status_update`, `dala_discount_program_price_one_day`, `dala_discount_program_price_one_product`, `dala_discount_program_limit_product`, `dala_discount_program_limit_day`, `dala_discount_program_date_star`, `dala_discount_program_date_end`, `dala_discount_program_information`, `dala_discount_program_qoute`) VALUES
(1, '2021-10-03 09:51:15', 'mức dâu giảm giá 40%', 17, 'https://appdala.net/wp-content/uploads/mut-dau-tay-ngot-ngao.jpg', 0, 0, 0, 0, 0, 4, 0, 0, 0, 3, 0, NULL, NULL, 'giảm gi&aacute; đồng loạt 40% cho mứt d&acirc;u', ''),
(2, '2021-10-03 10:14:57', 'FLASH SALE', 17, 'https://appdala.net/wp-content/uploads/6.jpg', 0, 0, 1, 0, 0, 4, 0, 0, 0, 3, 0, NULL, NULL, 'giảm gi&aacute; HOT ! mỗi ng&agrave;y', ''),
(3, '2021-10-03 10:25:48', 'Giảm gái Theo mùa', 17, 'https://appdala.net/wp-content/uploads/avd-0ebd1.jpg', 0, 0, 2, 0, 0, 4, 0, 0, 0, 3, 0, NULL, NULL, 'Giảm gi&aacute; theo m&ugrave;a xu&acirc;n hạ thu đ&ocirc;ng', ''),
(4, '2021-10-03 10:29:30', 'Mua 1 tặng 1', 17, 'https://appdala.net/wp-content/uploads/now-vn-deal-trai-cay-mua-1-tang-1-tat-ca-san-pham.jpg', 0, 0, 3, 0, 0, 4, 1, 0, 0, 3, 0, NULL, NULL, 'sdasdasdasd sdfsd \nsadasdasdas sdfsdfsf				', 'sfsdf ssf					');

--
-- Triggers `dala_discount_program`
--
DROP TRIGGER IF EXISTS `trig_discount_program_name_insert`;
DELIMITER $$
CREATE TRIGGER `trig_discount_program_name_insert` BEFORE INSERT ON `dala_discount_program` FOR EACH ROW BEGIN  



IF(NEW.dala_discount_program_name  is null or NEW.dala_discount_program_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_discount_program_name_empty';   
END IF;






IF(NEW.dala_discount_program_date_star is null  and  NEW.dala_discount_program_date_end is null) THEN 
	SIGNAL SQLSTATE '01000';
ELSE 
	IF( (UNIX_TIMESTAMP(NEW.dala_discount_program_date_end) - UNIX_TIMESTAMP(NEW.dala_discount_program_date_star)) <= 0 ) THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_discount_program_date_end_less_star';   
	END IF;
END IF;	






END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_discount_program_name_update`;
DELIMITER $$
CREATE TRIGGER `trig_discount_program_name_update` BEFORE UPDATE ON `dala_discount_program` FOR EACH ROW BEGIN  

IF(NEW.dala_discount_program_name  is null or NEW.dala_discount_program_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_discount_program_name_empty';   
END IF;






IF(NEW.dala_discount_program_date_star is null  and  NEW.dala_discount_program_date_end is null) THEN 
	SIGNAL SQLSTATE '01000';
ELSE 
	IF( (UNIX_TIMESTAMP(NEW.dala_discount_program_date_end) - UNIX_TIMESTAMP(NEW.dala_discount_program_date_star)) <= 0 ) THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_discount_program_date_end_less_star';   
	END IF;
END IF;	



END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_discount_program_details`
--

DROP TABLE IF EXISTS `dala_discount_program_details`;
CREATE TABLE IF NOT EXISTS `dala_discount_program_details` (
  `dala_discount_program_details_ID` int NOT NULL AUTO_INCREMENT,
  `dala_discount_program_details_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_discount_program_details_discount_program_id` int NOT NULL,
  `dala_discount_program_details_store_id` int NOT NULL,
  `dala_discount_program_details_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_discount_program_details_status_update` tinyint(1) NOT NULL DEFAULT '0',
  `dala_discount_program_details_price` double DEFAULT '0',
  `dala_discount_program_details_limit_day` tinyint(1) NOT NULL DEFAULT '0',
  `dala_discount_program_details_limit_product` tinyint(1) NOT NULL DEFAULT '0',
  `dala_discount_program_details_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_discount_program_details_ID`),
  KEY `discount_program_details_discount_program_id` (`dala_discount_program_details_discount_program_id`),
  KEY `discount_program_details_store_id` (`dala_discount_program_details_store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_discount_program_details`
--

INSERT INTO `dala_discount_program_details` (`dala_discount_program_details_ID`, `dala_discount_program_details_date_created`, `dala_discount_program_details_discount_program_id`, `dala_discount_program_details_store_id`, `dala_discount_program_details_status_admin`, `dala_discount_program_details_status_update`, `dala_discount_program_details_price`, `dala_discount_program_details_limit_day`, `dala_discount_program_details_limit_product`, `dala_discount_program_details_qoute`) VALUES
(1, '2021-10-03 10:02:17', 1, 18, 4, 0, 0, 10, 3, '										'),
(2, '2021-10-03 10:15:23', 2, 17, 4, 0, 0, 10, 3, ''),
(3, '2021-10-03 14:15:24', 4, 18, 4, 0, 0, 10, 3, '																				'),
(4, '2021-10-03 14:18:01', 4, 17, 4, 0, 0, 10, 10, '																																								'),
(5, '2021-10-07 14:11:42', 3, 17, 4, 0, 0, 10, 3, ''),
(6, '2021-10-07 14:11:53', 1, 17, 4, 0, 0, 10, 3, ''),
(7, '2021-10-07 14:13:26', 3, 18, 4, 0, 0, 10, 3, ''),
(8, '2021-10-07 14:13:38', 2, 18, 4, 0, 0, 10, 3, '');

--
-- Triggers `dala_discount_program_details`
--
DROP TRIGGER IF EXISTS `trig_check_owner_discount_program_insert`;
DELIMITER $$
CREATE TRIGGER `trig_check_owner_discount_program_insert` BEFORE INSERT ON `dala_discount_program_details` FOR EACH ROW BEGIN  

IF(LENGTH(NEW.dala_discount_program_details_store_id) > 0 and  LENGTH(NEW.dala_discount_program_details_discount_program_id) > 0 ) THEN 
	
	

	SET @checkID = (select dala_discount_program_store_id_created 
		from dala_discount_program 
		where dala_discount_program_ID  = NEW.dala_discount_program_details_discount_program_id);
	IF (@checkID > 0) THEN  
		IF (@checkID = NEW.dala_discount_program_details_store_id or @checkID = 17) THEN 
			SIGNAL SQLSTATE '01000';
		ELSE 
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_check_owner_discount_program_no_owner'; 		
		END IF;
	ELSE 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_owner_discount_program_no_discount_program'; 	
	END IF;	
	
	
	
	
	SET @checkID2 = (select dala_discount_program_details_ID 
		from dala_discount_program_details  
		where dala_discount_program_details_discount_program_id  = NEW.dala_discount_program_details_discount_program_id 
		and dala_discount_program_details_store_id = NEW.dala_discount_program_details_store_id);	
	IF (@checkID2 > 0) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_owner_discount_program_double'; 	
	END IF;			
		
		
	
END IF;

END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_check_owner_discount_program_update`;
DELIMITER $$
CREATE TRIGGER `trig_check_owner_discount_program_update` BEFORE UPDATE ON `dala_discount_program_details` FOR EACH ROW BEGIN  

	
	
	
	
	
	
	
	
	SET @store_id_old = (select dala_discount_program_details_store_id 
		from dala_discount_program_details 
		where dala_discount_program_details_ID  = NEW.dala_discount_program_details_ID );

	SET @discount_program_id_old = (select dala_discount_program_details_discount_program_id  
		from dala_discount_program_details 
		where dala_discount_program_details_ID  = NEW.dala_discount_program_details_ID );
		
	IF (@store_id_old <> NEW.dala_discount_program_details_store_id or @discount_program_id_old <> NEW.dala_discount_program_details_discount_program_id) THEN  
		
		
		SET @checkID2 = (select dala_discount_program_details_ID 
			from dala_discount_program_details  
			where dala_discount_program_details_discount_program_id  = NEW.dala_discount_program_details_discount_program_id 
			and dala_discount_program_details_store_id = NEW.dala_discount_program_details_store_id);	
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_check_owner_discount_program_double'; 	
		END IF;			
	END IF;
	
	
	
	
	SET @checkID = (select dala_discount_program_store_id_created 
		from dala_discount_program 
		where dala_discount_program_ID  = NEW.dala_discount_program_details_discount_program_id);

		
	IF (@checkID > 0) THEN  
		IF (@checkID = NEW.dala_discount_program_details_store_id or @checkID = 17) THEN 
			SIGNAL SQLSTATE '01000';
		ELSE 
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_check_owner_discount_program_no_owner'; 		
		END IF;
	ELSE 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_owner_discount_program_no_discount_program'; 	
	END IF;	
	
	
		
		
	

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_discount_program_product_link`
--

DROP TABLE IF EXISTS `dala_discount_program_product_link`;
CREATE TABLE IF NOT EXISTS `dala_discount_program_product_link` (
  `dala_discount_program_product_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_discount_program_product_link_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_discount_program_product_link_discount_program_details_id` int NOT NULL,
  `dala_discount_program_product_link_product_speciality_id` int NOT NULL,
  `dala_discount_program_product_link_status` tinyint(1) NOT NULL DEFAULT '0',
  `dala_discount_program_product_link_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_discount_program_product_link_ID`),
  KEY `discount_program_product_link_discount_program_details_id` (`dala_discount_program_product_link_discount_program_details_id`),
  KEY `discount_program_product_link_product_speciality_id` (`dala_discount_program_product_link_product_speciality_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_discount_program_product_link`
--

INSERT INTO `dala_discount_program_product_link` (`dala_discount_program_product_link_ID`, `dala_discount_program_product_link_date_created`, `dala_discount_program_product_link_discount_program_details_id`, `dala_discount_program_product_link_product_speciality_id`, `dala_discount_program_product_link_status`, `dala_discount_program_product_link_qoute`) VALUES
(2, '2021-10-03 10:02:41', 1, 19, 1, ''),
(3, '2021-10-03 10:09:15', 1, 20, 1, ''),
(4, '2021-10-03 10:15:32', 2, 18, 1, ''),
(5, '2021-10-03 10:15:49', 2, 8, 1, ''),
(6, '2021-10-03 10:16:03', 2, 13, 1, ''),
(7, '2021-10-03 14:20:31', 3, 20, 1, ''),
(8, '2021-10-03 14:20:44', 4, 10, 1, ''),
(9, '2021-10-07 14:13:50', 7, 20, 1, ''),
(10, '2021-10-07 14:14:38', 8, 19, 1, ''),
(11, '2021-10-07 14:14:50', 7, 19, 1, ''),
(12, '2021-10-07 14:15:20', 5, 9, 1, ''),
(13, '2021-10-07 14:15:28', 5, 6, 1, ''),
(14, '2021-10-07 14:15:41', 6, 12, 1, ''),
(15, '2021-10-07 14:15:46', 6, 7, 1, '');

--
-- Triggers `dala_discount_program_product_link`
--
DROP TRIGGER IF EXISTS `trig_discount_program_product_link_insert`;
DELIMITER $$
CREATE TRIGGER `trig_discount_program_product_link_insert` BEFORE INSERT ON `dala_discount_program_product_link` FOR EACH ROW BEGIN  

IF(LENGTH(NEW.dala_discount_program_product_link_discount_program_details_id) > 0 and  LENGTH(NEW.dala_discount_program_product_link_product_speciality_id) > 0 ) THEN 
	
	
	
	SET @store_product_id = (select dala_products_speciality_store_id   
		from dala_products_speciality 
		where dala_products_speciality_ID  = NEW.dala_discount_program_product_link_product_speciality_id);
		
	SET @store_program_id = (select dala_discount_program_details_store_id  
		from dala_discount_program_details  
		where dala_discount_program_details_ID  = NEW.dala_discount_program_product_link_discount_program_details_id);		
		
	IF (@store_product_id <> @store_program_id ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_discount_program_product_link_no_owner'; 	
	END IF;	
	
	
	
	
	
	
	
	SET @checkID2 = (select dala_discount_program_product_link_ID  
		from dala_discount_program_product_link  
		where dala_discount_program_product_link_discount_program_details_id  = NEW.dala_discount_program_product_link_discount_program_details_id  
		and dala_discount_program_product_link_product_speciality_id = NEW.dala_discount_program_product_link_product_speciality_id);	
	IF (@checkID2 > 0) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_discount_program_product_link_double'; 	
	END IF;			
		
		
		
	
	
	
	
	
	SET @limit_product = (select dala_discount_program_details_limit_product    
		from dala_discount_program_details  
		where dala_discount_program_details_ID  = NEW.dala_discount_program_product_link_discount_program_details_id);

	
	SET @sum_product_add = (select COUNT(dala_discount_program_product_link_ID)   as count_data  
		from dala_discount_program_product_link 
		where dala_discount_program_product_link_discount_program_details_id = NEW.dala_discount_program_product_link_discount_program_details_id);	
		
	IF ( @sum_product_add >= @limit_product ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_discount_program_product_link_limit_product';
	END IF;	

		
	
END IF;

END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_discount_program_product_link_update`;
DELIMITER $$
CREATE TRIGGER `trig_discount_program_product_link_update` BEFORE UPDATE ON `dala_discount_program_product_link` FOR EACH ROW BEGIN  




	
	
	
	
	
	
	
	
	SET @program_details_id_old = (select dala_discount_program_product_link_discount_program_details_id 
		from dala_discount_program_product_link  
		where dala_discount_program_product_link_ID  = NEW.dala_discount_program_product_link_ID );

	SET @product_id_old = (select dala_discount_program_product_link_product_speciality_id   
		from dala_discount_program_product_link 
		where dala_discount_program_product_link_ID  = NEW.dala_discount_program_product_link_ID );
		
	IF (@product_id_old <> NEW.dala_discount_program_product_link_product_speciality_id or @program_details_id_old <> NEW.dala_discount_program_product_link_discount_program_details_id) THEN  
		
		
		
		SET @store_product_id = (select dala_products_speciality_store_id   
			from dala_products_speciality 
			where dala_products_speciality_ID  = NEW.dala_discount_program_product_link_product_speciality_id);
			
		SET @store_program_id = (select dala_discount_program_details_store_id  
			from dala_discount_program_details  
			where dala_discount_program_details_ID  = NEW.dala_discount_program_product_link_discount_program_details_id);		
			
		IF (@store_product_id <> @store_program_id ) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_discount_program_product_link_no_owner'; 	
		END IF;	
		
		
		
		
		
		
		
		SET @checkID2 = (select dala_discount_program_product_link_ID  
			from dala_discount_program_product_link  
			where dala_discount_program_product_link_discount_program_details_id  = NEW.dala_discount_program_product_link_discount_program_details_id  
			and dala_discount_program_product_link_product_speciality_id = NEW.dala_discount_program_product_link_product_speciality_id);	
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_discount_program_product_link_double'; 	
		END IF;				
	END IF;


END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_like_product`
--

DROP TABLE IF EXISTS `dala_like_product`;
CREATE TABLE IF NOT EXISTS `dala_like_product` (
  `dala_like_product_ID` int NOT NULL AUTO_INCREMENT,
  `dala_like_product_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_like_product_user_id` int NOT NULL,
  `dala_like_product_product_id` int NOT NULL,
  `dala_like_product_status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_like_product_ID`),
  KEY `like_product_user_id` (`dala_like_product_user_id`),
  KEY `like_product_product_id` (`dala_like_product_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `dala_like_product`
--
DROP TRIGGER IF EXISTS `trig_like_product_insert`;
DELIMITER $$
CREATE TRIGGER `trig_like_product_insert` BEFORE INSERT ON `dala_like_product` FOR EACH ROW BEGIN  

IF(LENGTH(NEW.dala_like_product_user_id) > 0 and  LENGTH(NEW.dala_like_product_product_id) > 0 ) THEN 
	
	
	
	SET @checkID2 = (select dala_like_product_ID 
		from dala_like_product   
		where dala_like_product_user_id  =  NEW.dala_like_product_user_id 
		and dala_like_product_product_id = NEW.dala_like_product_product_id);	
	IF (@checkID2 > 0) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_like_product_double'; 	
	END IF;			
	
END IF;



IF( NEW.dala_like_product_status > 0 ) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_like_product_status_failt'; 	
END IF;








END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_like_product_update`;
DELIMITER $$
CREATE TRIGGER `trig_like_product_update` BEFORE UPDATE ON `dala_like_product` FOR EACH ROW BEGIN  

	SET @user_id_old = (select dala_like_product_user_id 
		from dala_like_product  
		where dala_like_product_ID  =  NEW.dala_like_product_ID );

	SET @product_id_old = (select dala_like_product_product_id   
		from dala_like_product 
		where dala_like_product_ID  =  NEW.dala_like_product_ID );
		
	IF (@user_id_old <> NEW.dala_like_product_user_id or @product_id_old <> NEW.dala_like_product_product_id) THEN  
		
		
		SET @checkID2 = (select dala_like_product_ID  
			from dala_like_product 
			where dala_like_product_user_id  = NEW.dala_like_product_user_id  
			and dala_like_product_product_id  = NEW.dala_like_product_product_id);	
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_like_product_double'; 	
		END IF;			
	END IF;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_like_store`
--

DROP TABLE IF EXISTS `dala_like_store`;
CREATE TABLE IF NOT EXISTS `dala_like_store` (
  `dala_like_store_ID` int NOT NULL AUTO_INCREMENT,
  `dala_like_store_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_like_store_user_id` int NOT NULL,
  `dala_like_store_store_id` int NOT NULL,
  `dala_like_store_status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_like_store_ID`),
  KEY `like_store_user_id` (`dala_like_store_user_id`),
  KEY `like_store_store_id` (`dala_like_store_store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `dala_like_store`
--
DROP TRIGGER IF EXISTS `trig_like_store_insert`;
DELIMITER $$
CREATE TRIGGER `trig_like_store_insert` BEFORE INSERT ON `dala_like_store` FOR EACH ROW BEGIN  

IF(LENGTH(NEW.dala_like_store_user_id) > 0 and  LENGTH(NEW.dala_like_store_store_id) > 0 ) THEN 
	
	
	
	SET @checkID2 = (select dala_like_store_ID  
		from dala_like_store   
		where dala_like_store_user_id  =  NEW.dala_like_store_user_id  
		and dala_like_store_store_id = NEW.dala_like_store_store_id);	
	IF (@checkID2 > 0) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_like_product_double'; 	
	END IF;			
	
END IF;

IF( NEW.dala_like_store_status > 0 ) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_like_store_status_failt'; 	
END IF;



END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_like_store_update`;
DELIMITER $$
CREATE TRIGGER `trig_like_store_update` BEFORE UPDATE ON `dala_like_store` FOR EACH ROW BEGIN  

	SET @user_id_old = (select dala_like_store_user_id  
		from dala_like_store  
		where dala_like_store_ID  =  NEW.dala_like_store_ID );

	SET @store_id_old = (select dala_like_store_store_id   
		from dala_like_store  
		where dala_like_store_ID  =  NEW.dala_like_store_ID );
		
	IF (@user_id_old <> NEW.dala_like_store_user_id or @store_id_old <> NEW.dala_like_store_store_id) THEN  
		
		
		SET @checkID2 = (select dala_like_store_ID  
			from dala_like_store 
			where dala_like_store_user_id  = NEW.dala_like_store_user_id  
			and dala_like_store_store_id  = NEW.dala_like_store_store_id);	
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_like_store_double'; 	
		END IF;			
	END IF;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_news`
--

DROP TABLE IF EXISTS `dala_news`;
CREATE TABLE IF NOT EXISTS `dala_news` (
  `dala_news_ID` int NOT NULL AUTO_INCREMENT,
  `dala_news_title` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_news_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_news_featured_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_news_excerpt` varchar(6000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_news_contents` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_news_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_news_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_news`
--

INSERT INTO `dala_news` (`dala_news_ID`, `dala_news_title`, `dala_news_date_created`, `dala_news_featured_image`, `dala_news_excerpt`, `dala_news_contents`, `dala_news_status_admin`) VALUES
(1, 'DALA khai mở dịch vụ vào ngày 10/10/2021', '2021-10-07 14:27:14', '', '', 'DALA khai mở dịch vụ vào ngày 10/10/2021, mong được khởi đầu tốt đẹp					', 1),
(2, 'DALA có mã giảm giá 10% cho ngày khai trương', '2021-10-07 14:28:13', '', '', 'DALA có mã giảm giá 10% cho ngày khai trương [ THANG10 ]', 1),
(3, 'Ưu đãi cho khách hàng cài app DALA', '2021-10-07 14:28:53', '', '', 'Ưu đãi cho khách hàng cài app DALA - giảm giá ngay 10 % cho đơn hàng đầu tiên', 1);

--
-- Triggers `dala_news`
--
DROP TRIGGER IF EXISTS `trig_news_title_insert`;
DELIMITER $$
CREATE TRIGGER `trig_news_title_insert` BEFORE INSERT ON `dala_news` FOR EACH ROW BEGIN  
IF(NEW.dala_news_title  is null or NEW.dala_news_title = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_news_title_name_empty';   
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_news_title_update`;
DELIMITER $$
CREATE TRIGGER `trig_news_title_update` BEFORE UPDATE ON `dala_news` FOR EACH ROW BEGIN  
IF(NEW.dala_news_title  is null or NEW.dala_news_title = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_news_title_name_empty';   
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_notes`
--

DROP TABLE IF EXISTS `dala_notes`;
CREATE TABLE IF NOT EXISTS `dala_notes` (
  `dala_notes_ID` int NOT NULL AUTO_INCREMENT,
  `dala_notes_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_notes_user_id` int NOT NULL,
  `dala_notes_status` tinyint(1) NOT NULL DEFAULT '0',
  `dala_notes_title` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_notes_contents` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_notes_ID`),
  KEY `notes_user_id` (`dala_notes_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Gữi thông tin cho khách hàng';

--
-- Dumping data for table `dala_notes`
--

INSERT INTO `dala_notes` (`dala_notes_ID`, `dala_notes_date_created`, `dala_notes_user_id`, `dala_notes_status`, `dala_notes_title`, `dala_notes_contents`) VALUES
(1, '2021-10-04 17:07:17', 56, 0, 'qweq', 'qweqwe'),
(2, '2021-10-04 17:07:24', 91, 1, 'qweqwe', 'qweqweqwe'),
(3, '2021-10-04 17:07:24', 51, 1, 'qweqwe', 'qweqweqwe');

-- --------------------------------------------------------

--
-- Table structure for table `dala_options_product_food_drink`
--

DROP TABLE IF EXISTS `dala_options_product_food_drink`;
CREATE TABLE IF NOT EXISTS `dala_options_product_food_drink` (
  `dala_options_product_food_drink_ID` int NOT NULL AUTO_INCREMENT,
  `dala_options_product_food_drink_name` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_food_drink_featured_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_food_drink_parent_id` int NOT NULL DEFAULT '0',
  `dala_options_product_food_drink_type` int NOT NULL DEFAULT '0',
  `dala_options_product_food_drink_information` varchar(4000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_food_drink_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`dala_options_product_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_options_product_food_drink_link`
--

DROP TABLE IF EXISTS `dala_options_product_food_drink_link`;
CREATE TABLE IF NOT EXISTS `dala_options_product_food_drink_link` (
  `dala_options_product_food_drink_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_options_product_food_drink_link_product_id` int NOT NULL,
  `dala_options_product_food_drink_link_option_id` int NOT NULL,
  PRIMARY KEY (`dala_options_product_food_drink_link_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_options_product_food_drink_link_details`
--

DROP TABLE IF EXISTS `dala_options_product_food_drink_link_details`;
CREATE TABLE IF NOT EXISTS `dala_options_product_food_drink_link_details` (
  `dala_options_product_food_drink_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_options_product_food_drink_link_options_id` int NOT NULL,
  `dala_options_product_food_drink_link_price` float NOT NULL,
  `dala_options_product_food_drink_link_default_type` int NOT NULL DEFAULT '0',
  `dala_options_product_food_drink_link_images` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_food_drink_link_information` tinytext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_options_product_food_drink_link_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_options_product_speciality`
--

DROP TABLE IF EXISTS `dala_options_product_speciality`;
CREATE TABLE IF NOT EXISTS `dala_options_product_speciality` (
  `dala_options_product_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_options_product_speciality_name` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_speciality_featured_image` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_speciality_parent_id` int NOT NULL DEFAULT '0',
  `dala_options_product_speciality_stores_id` int NOT NULL,
  `dala_options_product_speciality_status_stores` tinyint(1) NOT NULL DEFAULT '0',
  `dala_options_product_speciality_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_options_product_speciality_status_update` tinyint(1) NOT NULL DEFAULT '0',
  `dala_options_product_speciality_information` varchar(4000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_speciality_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_options_product_speciality_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_options_product_speciality_ID`),
  KEY `options_product_speciality_stores_id` (`dala_options_product_speciality_stores_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_options_product_speciality`
--

INSERT INTO `dala_options_product_speciality` (`dala_options_product_speciality_ID`, `dala_options_product_speciality_name`, `dala_options_product_speciality_featured_image`, `dala_options_product_speciality_parent_id`, `dala_options_product_speciality_stores_id`, `dala_options_product_speciality_status_stores`, `dala_options_product_speciality_status_admin`, `dala_options_product_speciality_status_update`, `dala_options_product_speciality_information`, `dala_options_product_speciality_date_created`, `dala_options_product_speciality_qoute`) VALUES
(1, 'Màu sắc', '', 0, 17, 1, 1, 1, '', '2021-07-22 16:36:47', ''),
(2, 'Kích thước', '', 0, 17, 1, 1, 1, '', '2021-07-22 16:37:00', ''),
(3, 'Loại hộp', '', 0, 17, 1, 1, 1, '', '2021-07-22 16:37:21', ''),
(4, 'màu xanh', '', 1, 17, 1, 1, 1, '', '2021-07-22 16:38:56', ''),
(5, 'Màu đỏ', '', 1, 17, 1, 1, 1, '', '2021-07-22 16:39:06', ''),
(6, 'Màu đen', '', 1, 17, 1, 1, 1, '', '2021-07-22 16:39:21', ''),
(7, 'Màu trắng', '', 1, 17, 1, 1, 1, '', '2021-07-22 16:39:30', ''),
(8, 'Size lớn', '', 2, 17, 1, 1, 1, '', '2021-07-22 16:39:44', ''),
(9, 'Size nhỏ', '', 2, 17, 1, 1, 1, '', '2021-07-22 16:39:53', ''),
(10, 'Hộp lớn', '', 3, 17, 1, 1, 1, '', '2021-07-22 16:40:06', ''),
(11, 'Hộp nhỏ', '', 3, 17, 1, 1, 1, '', '2021-07-22 16:40:15', '');

--
-- Triggers `dala_options_product_speciality`
--
DROP TRIGGER IF EXISTS `trig_options_product_speciality_insert`;
DELIMITER $$
CREATE TRIGGER `trig_options_product_speciality_insert` BEFORE INSERT ON `dala_options_product_speciality` FOR EACH ROW BEGIN  






IF(NEW.dala_options_product_speciality_name  is null or NEW.dala_options_product_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_options_product_speciality_name_name_empty';   
END IF;







IF(NEW.dala_options_product_speciality_parent_id > 0 ) THEN 

	SET @checkID = (select dala_options_product_speciality_ID  
	from dala_options_product_speciality 
	where dala_options_product_speciality_ID  = NEW.dala_options_product_speciality_parent_id);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_options_product_speciality_parent_id_no_parent'; 
	END IF;	
	
END IF;



END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_options_product_speciality_update`;
DELIMITER $$
CREATE TRIGGER `trig_options_product_speciality_update` BEFORE INSERT ON `dala_options_product_speciality` FOR EACH ROW BEGIN  






IF(NEW.dala_options_product_speciality_name  is null or NEW.dala_options_product_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_options_product_speciality_name_name_empty';   
END IF;







IF(NEW.dala_options_product_speciality_parent_id > 0 ) THEN 


	SET @parent_old = (select dala_options_product_speciality_parent_id  
	from dala_options_product_speciality 
	where dala_options_product_speciality_ID  = NEW.dala_options_product_speciality_ID );
	
	IF ( @parent_old = NEW.dala_options_product_speciality_parent_id  ) THEN 
		SIGNAL SQLSTATE '01000'; 
	ELSE 
	
		SET @checkID = (select dala_options_product_speciality_ID   
		from dala_options_product_speciality 
		where dala_options_product_speciality_ID  = NEW.dala_options_product_speciality_parent_id);
		IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_check_options_product_speciality_parent_id_no_parent'; 
		END IF;	
	
	END IF;
END IF;



END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_options_product_speciality_link`
--

DROP TABLE IF EXISTS `dala_options_product_speciality_link`;
CREATE TABLE IF NOT EXISTS `dala_options_product_speciality_link` (
  `dala_options_product_speciality_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_options_product_speciality_link_product_id` int NOT NULL,
  `dala_options_product_speciality_link_option_id` int NOT NULL,
  `dala_options_product_speciality_link_variation_type` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_options_product_speciality_link_ID`),
  KEY `options_product_speciality_link_option_id` (`dala_options_product_speciality_link_option_id`),
  KEY `options_product_speciality_link_product_id` (`dala_options_product_speciality_link_product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_options_product_speciality_link`
--

INSERT INTO `dala_options_product_speciality_link` (`dala_options_product_speciality_link_ID`, `dala_options_product_speciality_link_product_id`, `dala_options_product_speciality_link_option_id`, `dala_options_product_speciality_link_variation_type`) VALUES
(8, 19, 6, 0),
(9, 20, 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `dala_orders_details_food_drink`
--

DROP TABLE IF EXISTS `dala_orders_details_food_drink`;
CREATE TABLE IF NOT EXISTS `dala_orders_details_food_drink` (
  `dala_orders_details_food_drink_ID` int NOT NULL AUTO_INCREMENT,
  `dala_orders_details_food_drink_order_id` int NOT NULL,
  `dala_orders_details_food_drink_line_order` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_details_food_drink_product_id` int NOT NULL,
  `dala_orders_details_food_drink_qty` int NOT NULL,
  `dala_orders_details_food_drink_price` float NOT NULL,
  PRIMARY KEY (`dala_orders_details_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_orders_details_speciality`
--

DROP TABLE IF EXISTS `dala_orders_details_speciality`;
CREATE TABLE IF NOT EXISTS `dala_orders_details_speciality` (
  `dala_orders_details_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_orders_details_speciality_order_id` int NOT NULL,
  `dala_orders_details_speciality_line_order` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_details_speciality_product_id` int NOT NULL DEFAULT '0',
  `dala_orders_details_speciality_qty` int NOT NULL DEFAULT '0',
  `dala_orders_details_speciality_price` double NOT NULL DEFAULT '0',
  `dala_orders_details_medium_text` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`dala_orders_details_speciality_ID`),
  KEY `orders_details_speciality_order_id` (`dala_orders_details_speciality_order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_orders_details_speciality`
--

INSERT INTO `dala_orders_details_speciality` (`dala_orders_details_speciality_ID`, `dala_orders_details_speciality_order_id`, `dala_orders_details_speciality_line_order`, `dala_orders_details_speciality_product_id`, `dala_orders_details_speciality_qty`, `dala_orders_details_speciality_price`, `dala_orders_details_medium_text`) VALUES
(47, 13, 'product', 19, 3, 100000, ''),
(48, 13, 'product', 20, 4, 155000, ''),
(49, 13, 'shipping', 0, 0, 40000, ''),
(50, 13, 'coupon', 3, 0, 30000, ''),
(51, 14, 'product', 19, 3, 100000, ''),
(52, 14, 'product', 20, 4, 155000, ''),
(53, 14, 'shipping', 0, 0, 40000, ''),
(54, 14, 'coupon', 6, 6, 30000, '');

--
-- Triggers `dala_orders_details_speciality`
--
DROP TRIGGER IF EXISTS `trig_check_orders_details_product_id_insert`;
DELIMITER $$
CREATE TRIGGER `trig_check_orders_details_product_id_insert` BEFORE INSERT ON `dala_orders_details_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 	
	SET @checkID = ( select dala_products_speciality_ID
					 from dala_products_speciality 
					 where dala_products_speciality_ID = NEW.dala_orders_details_speciality_product_id
					);
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_orders_details_product_id_not_refer'; 
	END IF;	
END IF;

END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_check_orders_details_product_id_update`;
DELIMITER $$
CREATE TRIGGER `trig_check_orders_details_product_id_update` BEFORE INSERT ON `dala_orders_details_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 	
	SET @checkID = ( select dala_products_speciality_ID
					 from dala_products_speciality 
					 where dala_products_speciality_ID = NEW.dala_orders_details_speciality_product_id
					);
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_orders_details_product_id_not_refer'; 
	END IF;	
END IF;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_orders_food_drink`
--

DROP TABLE IF EXISTS `dala_orders_food_drink`;
CREATE TABLE IF NOT EXISTS `dala_orders_food_drink` (
  `dala_orders_food_drink_ID` int NOT NULL AUTO_INCREMENT,
  `dala_orders_food_drink_user_id` int NOT NULL,
  `dala_orders_food_drink_date_order` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_orders_food_drink_status_order` int NOT NULL DEFAULT '0',
  `dala_orders_food_drink_status_payment` int NOT NULL DEFAULT '0',
  `dala_orders_food_drink_adress` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_food_drink_notes` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_food_drink_phone` char(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_food_drink_email` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_orders_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_orders_speciality`
--

DROP TABLE IF EXISTS `dala_orders_speciality`;
CREATE TABLE IF NOT EXISTS `dala_orders_speciality` (
  `dala_orders_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_orders_speciality_user_id` int NOT NULL,
  `dala_orders_speciality_store_id` int NOT NULL,
  `dala_orders_speciality_shipper_id` int NOT NULL,
  `dala_orders_speciality_date_orders` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_orders_speciality_status_orders` tinyint(1) NOT NULL DEFAULT '0',
  `dala_orders_speciality_status_pull_money` tinyint NOT NULL DEFAULT '0',
  `dala_orders_speciality_status_payment` tinyint(1) NOT NULL DEFAULT '0',
  `dala_orders_speciality_province` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_district` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_wards` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_adress` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'địa chỉ số nhà, đường',
  `dala_orders_speciality_notes` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'ghi chú đơn hàng',
  `dala_orders_speciality_phone` char(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'điện thoại người nhận hàng',
  `dala_orders_speciality_name` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'tên người nhận hàng',
  `dala_orders_speciality_email` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_shipping_code` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_orders_speciality_ID`),
  KEY `orders_speciality_user_id` (`dala_orders_speciality_user_id`),
  KEY `orders_speciality_store_id` (`dala_orders_speciality_store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_orders_speciality`
--

INSERT INTO `dala_orders_speciality` (`dala_orders_speciality_ID`, `dala_orders_speciality_user_id`, `dala_orders_speciality_store_id`, `dala_orders_speciality_shipper_id`, `dala_orders_speciality_date_orders`, `dala_orders_speciality_status_orders`, `dala_orders_speciality_status_pull_money`, `dala_orders_speciality_status_payment`, `dala_orders_speciality_province`, `dala_orders_speciality_district`, `dala_orders_speciality_wards`, `dala_orders_speciality_adress`, `dala_orders_speciality_notes`, `dala_orders_speciality_phone`, `dala_orders_speciality_name`, `dala_orders_speciality_email`, `dala_orders_speciality_shipping_code`) VALUES
(13, 56, 18, 0, '2021-10-07 17:38:20', 100, 0, 0, 'Tỉnh Đồng Nai', 'Thành phố Biên Hòa', 'Phường Tân Phong', 'số 18, d0ặng dức thuật', '', '09480360106', 'nguyễn văn lực', 'custommer@gmail.com', ''),
(14, 56, 18, 0, '2021-10-07 17:42:41', 100, 0, 0, 'Tỉnh Đồng Nai', 'Thành phố Biên Hòa', 'Phường Tân Phong', 'số 18, d0ặng dức thuật', '', '09480360106', 'nguyễn văn lực', 'custommer@gmail.com', '');

--
-- Triggers `dala_orders_speciality`
--
DROP TRIGGER IF EXISTS `trig_orders_speciality_insert`;
DELIMITER $$
CREATE TRIGGER `trig_orders_speciality_insert` BEFORE INSERT ON `dala_orders_speciality` FOR EACH ROW BEGIN  





IF(NEW.dala_orders_speciality_phone is null or NEW.dala_orders_speciality_phone = '') THEN 
	SIGNAL SQLSTATE '12301' 
	SET MESSAGE_TEXT = 'trig_orders_speciality_phone_empty';   
ELSE 
	IF (NEW.dala_orders_speciality_phone REGEXP '^[0-9]{10,11}$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_phone_data_type';   
	END IF;   
END IF;





IF(LENGTH(NEW.dala_orders_speciality_email) > 0 ) THEN 	
	IF (NEW.dala_orders_speciality_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN  
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_dala_orders_speciality_email_data_type';   
	END IF;	
END IF;






IF( 
	(NEW.dala_orders_speciality_province is null or  NEW.dala_orders_speciality_province = '' ) or 
	(NEW.dala_orders_speciality_district is null or  NEW.dala_orders_speciality_district = '' ) or 
	(NEW.dala_orders_speciality_wards  is null or  NEW.dala_orders_speciality_wards = '' ) or 
	(NEW.dala_orders_speciality_adress is null or  NEW.dala_orders_speciality_adress = '' ) 
) THEN 	
	SIGNAL SQLSTATE '12303' 
	SET MESSAGE_TEXT = 'trig_dala_orders_speciality_adress_empty';   
END IF;





IF( NEW.dala_orders_speciality_name is null or  NEW.dala_orders_speciality_name = ''  ) THEN 	
	SIGNAL SQLSTATE '12304' 
	SET MESSAGE_TEXT = 'trig_dala_orders_speciality_name_empty';   
END IF;




END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_orders_speciality_update`;
DELIMITER $$
CREATE TRIGGER `trig_orders_speciality_update` BEFORE UPDATE ON `dala_orders_speciality` FOR EACH ROW BEGIN  





IF(NEW.dala_orders_speciality_phone is null or NEW.dala_orders_speciality_phone = '') THEN 
	SIGNAL SQLSTATE '12301' 
	SET MESSAGE_TEXT = 'trig_orders_speciality_phone_empty';   
ELSE 
	IF (NEW.dala_orders_speciality_phone REGEXP '^[0-9]{10,11}$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_phone_data_type';   
	END IF;   
END IF;





IF(LENGTH(NEW.dala_orders_speciality_email) > 0 ) THEN 	
	IF (NEW.dala_orders_speciality_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN  
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_dala_orders_speciality_email_data_type';   
	END IF;	
END IF;






IF( 
	(NEW.dala_orders_speciality_province is null or  NEW.dala_orders_speciality_province = '' ) or 
	(NEW.dala_orders_speciality_district is null or  NEW.dala_orders_speciality_district = '' ) or 
	(NEW.dala_orders_speciality_wards  is null or  NEW.dala_orders_speciality_wards = '' ) or 
	(NEW.dala_orders_speciality_adress is null or  NEW.dala_orders_speciality_adress = '' ) 
) THEN 	
	SIGNAL SQLSTATE '12303' 
	SET MESSAGE_TEXT = 'trig_dala_orders_speciality_adress_empty';   
END IF;





IF( NEW.dala_orders_speciality_name is null or  NEW.dala_orders_speciality_name = ''  ) THEN 	
	SIGNAL SQLSTATE '12304' 
	SET MESSAGE_TEXT = 'trig_dala_orders_speciality_name_empty';   
END IF;







IF(NEW.dala_orders_speciality_shipper_id is not null AND  NEW.dala_orders_speciality_shipper_id > 0) THEN 
	SET @checkID = (select dala_users_ID from dala_users where dala_users_ID = NEW.dala_orders_speciality_shipper_id);
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12305' 
		SET MESSAGE_TEXT = 'trig_dala_orders_speciality_sipper_refer'; 
	END IF;	
END IF;






END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_payment_period`
--

DROP TABLE IF EXISTS `dala_payment_period`;
CREATE TABLE IF NOT EXISTS `dala_payment_period` (
  `dala_payment_period_ID` int NOT NULL AUTO_INCREMENT,
  `dala_payment_period_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_payment_period_stores_id` int NOT NULL,
  `dala_payment_period_contents` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_payment_period_payment` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_payment_period_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_products_food_drink`
--

DROP TABLE IF EXISTS `dala_products_food_drink`;
CREATE TABLE IF NOT EXISTS `dala_products_food_drink` (
  `dala_products_food_drink_ID` int NOT NULL AUTO_INCREMENT,
  `dala_products_food_drink_name` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_type` int NOT NULL DEFAULT '0',
  `dala_products_food_drink_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_products_food_drink_sku` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_store_id` int NOT NULL,
  `dala_products_food_drink_featured_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_slider_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_contents` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_price` float NOT NULL,
  `dala_products_food_drink_sale_of_price` float DEFAULT NULL,
  `dala_products_food_drink_date_start` datetime DEFAULT NULL,
  `dala_products_food_drink_date_end` datetime DEFAULT NULL,
  `dala_products_food_drink_stock` int DEFAULT NULL,
  `dala_products_food_drink_brand` int NOT NULL DEFAULT '0',
  `dala_products_food_drink_origin` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_status_store` int NOT NULL DEFAULT '0',
  `dala_products_food_drink_status_admin` int NOT NULL DEFAULT '0',
  `dala_products_food_drink_excerpt` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_discount` float NOT NULL DEFAULT '0',
  `dala_products_food_drink_unit_discount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_products_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_products_speciality`
--

DROP TABLE IF EXISTS `dala_products_speciality`;
CREATE TABLE IF NOT EXISTS `dala_products_speciality` (
  `dala_products_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_products_speciality_name` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_type` int NOT NULL DEFAULT '0',
  `dala_products_speciality_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_products_speciality_sku` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_store_id` int NOT NULL,
  `dala_products_speciality_parent_id` int NOT NULL DEFAULT '0',
  `dala_products_speciality_featured_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_image_slider` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_origin` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_contents` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_price` float NOT NULL DEFAULT '0',
  `dala_products_speciality_sale_of_price` float DEFAULT NULL,
  `dala_products_speciality_date_start` datetime DEFAULT NULL,
  `dala_products_speciality_date_end` datetime DEFAULT NULL,
  `dala_products_speciality_stock` int DEFAULT NULL,
  `dala_products_speciality_brand` int DEFAULT NULL,
  `dala_products_speciality_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_products_speciality_status_store` tinyint(1) NOT NULL DEFAULT '0',
  `dala_products_speciality_status_update` tinyint(1) NOT NULL DEFAULT '0',
  `dala_products_speciality_variation_option` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_excerpt` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_height` int DEFAULT NULL,
  `dala_products_speciality_width` int DEFAULT NULL,
  `dala_products_speciality_length` int DEFAULT NULL,
  `dala_products_speciality_weight` int DEFAULT NULL,
  PRIMARY KEY (`dala_products_speciality_ID`),
  KEY `products_speciality_store_id` (`dala_products_speciality_store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_products_speciality`
--

INSERT INTO `dala_products_speciality` (`dala_products_speciality_ID`, `dala_products_speciality_name`, `dala_products_speciality_type`, `dala_products_speciality_date_created`, `dala_products_speciality_sku`, `dala_products_speciality_store_id`, `dala_products_speciality_parent_id`, `dala_products_speciality_featured_image`, `dala_products_speciality_image_slider`, `dala_products_speciality_origin`, `dala_products_speciality_contents`, `dala_products_speciality_price`, `dala_products_speciality_sale_of_price`, `dala_products_speciality_date_start`, `dala_products_speciality_date_end`, `dala_products_speciality_stock`, `dala_products_speciality_brand`, `dala_products_speciality_status_admin`, `dala_products_speciality_status_store`, `dala_products_speciality_status_update`, `dala_products_speciality_variation_option`, `dala_products_speciality_excerpt`, `dala_products_speciality_qoute`, `dala_products_speciality_height`, `dala_products_speciality_width`, `dala_products_speciality_length`, `dala_products_speciality_weight`) VALUES
(3, 'Kẹo Dẻo Actisô Galaxy Ladophar – Gói 80g', 0, '2021-07-23 08:45:29', '3M', 17, 0, 'https://appdala.net/wp-content/uploads/keodeo1-4.jpg', 'https://appdala.net/wp-content/uploads/keodeo2-3.jpg;https://appdala.net/wp-content/uploads/keodeo1-5.jpg;https://appdala.net/wp-content/uploads/keodeo3-1.jpg', '', 'KẸO DẺO ACTISO\n\nKẹo dẻo actiso được chế biến từ cao hoa actiso, mang màu nâu đặc trưng, dai dai, ngọt ngọt, là món ăn vặt cực kì yêu thích không chỉ riêng các em nhỏ mà người lớn cũng mê.\n\nKẹo dẻo actiso mang hương vị Actiso tự nhiên, thơm ngon, còn bổ sung dưỡng chất, có ích cho sức khỏe.\n\nKẹo dẻo actiso luôn đảm bảo về chất lượng, là sản phẩm an toàn cho người tiêu dùng.\n\n\nThành phần: Cao hoa actiso 5%, đường, mạch nha, gelatin, pectin, acid citric.\n\nKhông sử dụng chất bảo quản.\n\nKLT: 80g\nHạn sử dụng: 1 năm.\nHướng dẫn sử dụng: Dùng trực tiếp sau khi mở bao bì. Đóng kín sau mỗi lần sử dụng.\nBảo quản nơi khô ráo, tránh ánh nắng trực tiếp.\n\nKhông sử dụng sản phẩm khi có dấu diệu ẩm mốc, xuất hiện mùi lạ.\n\n\n\nSản phẩm được phân phối bởi Dala.vn.', 35000, 32000, NULL, NULL, NULL, 3, 1, 1, 1, '', '', '', NULL, NULL, NULL, 80),
(4, 'Mứt hoa Atiso đỏ đặc biệt, ngon-150gr', 0, '2021-07-23 08:50:45', '4YE', 17, 0, 'https://appdala.net/wp-content/uploads/muthoaatisodo-1.jpg', 'https://appdala.net/wp-content/uploads/muthoaatisodo-2.jpg;https://appdala.net/wp-content/uploads/Hoa-Atiso-Do-4-1.png;https://appdala.net/wp-content/uploads/images-1-2.jpg', '', 'Loài Hoa atiso đỏ rất giàu dinh dưỡng, ngoài ra hoa còn chứa các axit và protein, vitamin C cùng những chất có tính kháng sinh khác. Hạt atiso đỏ chứa 7,6% nước, 22,3% dầu, 24% protein, 13,5% chất xơ và 7% chất khoáng.\n\nTheo một số nghiên cứu, trong thành phần dầu hạt hoa atiso đỏ có tác dụng chống nấm và bệnh ngoài da. Vitamin và các chất béo không no có trong nó cũng có tác dụng tốt đối với người cao tuổi và người đang ăn kiêng. Hạt atiso đỏ chứa 7,6% nước, 22,3% dầu, 24% protein, 13,5% chất xơ và 7% chất khoáng.\n\nHoa atiso đỏ có chứa một số chất có tính kháng sinh, do đó nó được dân gian dùng như một phương thuốc thảo dược trị ho, viêm họng bằng cách lấy đài hoa atiso đỏ chưng lẫn đường phèn, mật ong lấy nước uống vài lần/ngày. Sử dụng hoa atio đỏ thường xuyên cũng là cách ngăn ngừa ho, cảm cúm.\n\nAtioso đỏ cũng chứa nhiều Bioflavonoids, một chất chống ô xy hóa ngăn cản quá trình ô xy hóa lipoprotein, giúp hạ huyết áp. Nhiều người bị huyết áp cao thường uống trà chế từ hoa atiso đỏ mỗi ngày để giảm huyết áp.\n\n\n\nThông số kỹ thuật\nChi tiết sản phẩm\n\n– Trọng lượng: 150gr\n\n– Màu sắc: màu đỏ tím của bông tươi.\n\n– Mùi vị; giòn, chua, ngọt, tốt cho sức khỏe – Sản phẩm cũng không sử dụng chất bảo quản, chỉ sử dụng acid citrid đường và muối của acid sorbid nhằm duy trì màu sắc và hương vị sản phẩm, chỉ sử dụng được 3 tháng. Sản phẩm ngon hơn nếu bỏ vào tủ lạnh hoặc pha với nước cốt atiso đỏ cùng đá, cánh hoa giòn cùng vị chua ngọt của nước cốt tạo nên thức uống tương tự cooktail', 70000, 59000, NULL, NULL, NULL, 2, 1, 1, 1, '', '', '', NULL, NULL, NULL, 150),
(5, 'Kẹo dẻo phủ chocolate loại đặc biệt-220gr', 0, '2021-07-23 08:55:40', '57O', 17, 0, 'https://appdala.net/wp-content/uploads/Keodeo-4.jpg', 'https://appdala.net/wp-content/uploads/Keodeo-5.jpg;https://appdala.net/wp-content/uploads/keo-deo-chocolate-handmade-1504932104-1-4140608-1509593909-3.jpg;https://appdala.net/wp-content/uploads/keo-deo-phu-chocolate-handmade-1506263932-1-3898840-1506263932-2.jpg;https://appdala.net/wp-content/uploads/keo-deo-trai-cay-chocolate-handmade-1504949383-1-3791767-1504949383-2.jpg', '', 'KẸO DẺO PHỦ SOCOLA – MÓN QUÀ ĐẾN TỪ VÙNG CAO NGUYÊN ĐÀ LẠT\n\nKẹo dẻo phủ socola có vị ngọt nhẹ và dai, phủ một lớp socola mỏng, cho ta vị hậu đắng nhẹ tăng thêm độ hoàn hảo và một hương vị đặc trưng của vùng cao nguyên Đà Lạt.\n\nMàu sắc: Kẹo có màu sắc tự nhiên, phủ bên trên là lớp socola mỏng tạo cái nhìn thiện cảm cho người dùng.\nMùi vị: mỗi màu sắc là một vị khác nhau, chua,ngọt trộn với vị hậu đắng nhẹ gây kích thích vị giác.\nĂn trực tiếp.\nChỉ sử dụng acid citrid để bảo quản và duy trì màu sắc cho sản phẩm. Trẻ em, phụ nữ mang thai có thể sử dụng được.\n– Thành phần: Kẹo dẻo trái cây (70%), chocolate đen.\n\n– KLT: 220g\n\n– Hướng dẫn sử dụng: Mở bao bì và dùng trực tiếp. Làm kín miệng sau mỗi lần sử dụng.\n\n– Bảo quản: Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp.\n\nKhông sử dụng sản phẩm khi có dấu hiệu ẩm mốc, xuất hiện mùi lạ.\n\nSản phẩm được phân phối bởi Dala.vn.', 70000, 65000, NULL, NULL, NULL, 2, 1, 1, 1, '', '', '', NULL, NULL, NULL, 220),
(6, 'Mứt Chanh dây – 29gram', 0, '2021-07-23 08:58:37', '6MR', 17, 0, 'https://appdala.net/wp-content/uploads/mut-chanh-day-1-1.jpg', 'https://appdala.net/wp-content/uploads/2d829b44a905405b1914.jpg;https://appdala.net/wp-content/uploads/238.chanhday-1.jpg;https://appdala.net/wp-content/uploads/recipe13096-635845848321954266.jpg', '', 'Chanh dây là một nguồn cung vitamin A dồi dào, một dưỡng chất đặc biệt có lợi giúp làm đẹp cho da. Các chất chống oxy hóa khác trong chanh dây như vitamin C, riboflavin và carotene cũng giúp tăng cường sức khỏe của da và đẩy lùi các dấu hiệu của lão hóa.\n\nChanh dây rất giàu kali, một loại khoáng chất quan trọng giúp điều hòa huyết áp, làm thư giãn các mạch máu và tăng cường lưu lượng máu. Qua đó có thể làm giảm căng thẳng cho tim và cải thiện sức khỏe tim toàn diện.\n\nChất flavonoid và axit phenolic có trong chanh dây cũng có thể giúp kiểm soát lượng cholesterol tốt hơn: tăng cholesterol tốt và giảm cholesterol xấu gây tắc nghẽn các động mạch, làm suy yếu hoạt động của tim.', 20000, 15000, NULL, NULL, NULL, 4, 1, 1, 1, '', '', '', NULL, NULL, NULL, 29),
(7, 'Vỏ bưởi mật ong sấy dẻo-100gram', 0, '2021-07-23 09:55:40', '78', 17, 0, 'https://appdala.net/wp-content/uploads/vo-buoi-mat-ong.jpg', 'https://appdala.net/wp-content/uploads/vo-buoi-1-1.png;https://appdala.net/wp-content/uploads/vo-buoi-mat-ong-1.jpg;https://appdala.net/wp-content/uploads/vo-buoi-mat-ong-1-1.jpg;https://appdala.net/wp-content/uploads/vo-buoi-mat-ong-2.jpg;https://appdala.net/wp-content/uploads/vo-buoi-mat-ong-3.jpg', '', '', 70000, 65000, NULL, NULL, NULL, 1, 1, 1, 1, '', '', '', NULL, NULL, NULL, 100),
(8, 'Cam sấy dẻo – 100gr', 0, '2021-07-23 09:58:40', '8S', 17, 0, 'https://appdala.net/wp-content/uploads/mutcam.jpg', 'https://appdala.net/wp-content/uploads/bi-kip-lam-mut-cam-thom-ngon-dep-mat-1-300x174-1.png;https://appdala.net/wp-content/uploads/cach-lam-mut-cam-deo-ngon-thom-vi-chanh-leo-hap-dan-1-300x249-1.jpg;https://appdala.net/wp-content/uploads/mutcam-1.jpg', '', '', 100000, 80000, NULL, NULL, NULL, 2, 1, 1, 1, '', '', '', NULL, NULL, NULL, 100),
(9, 'Chuối Laba sấy dẻo (Soft dried banana) – 250gr', 0, '2021-07-23 10:00:34', '9WR', 17, 0, 'https://appdala.net/wp-content/uploads/chuoideo.png', 'https://appdala.net/wp-content/uploads/1a96691e84bb5231e72caac6bf0f581f.jpg;https://appdala.net/wp-content/uploads/chuoideo-1.png;https://appdala.net/wp-content/uploads/chuoi-say-deo.jpg;https://appdala.net/wp-content/uploads/chuoi-say-deo-dac-biet-trai-cay-hat-say-com-1.jpg', '', 'Chuối khô sấy dẻo có nhiều vi chất dinh dưỡng bảo vệ hệ miễn dịch và ngăn ngừa hiệu quả các bệnh mãn tính. Mỗi ngày, người có thể trạng bình thường và sức khỏe ổn định nên ăn 1-2 quả chuối tươi hay tương đương với 50g chuối khô sấy dẻo để chăm sóc và bảo vệ tốt nhất cho sức khỏe của chính mình.\n\nNgười hay bị táo bón hoặc rối loạn tiêu hóa:chất xơ có trong chuối sấy có tác dụng nhuận tràng, giảm táo bón. Chất pectin có trong chuối sấy dẻo có thể hỗ trợ làm giảm rối loạn đường ruột gây tiêu chảy.\n*Người hay làm việc trí óc, hay căng thẳng, đang stress:Vichất kali giúp trí não hoạt động linh hoạt hơn, thư giãn tinh thần, giảm tình trạng căng thẳng gây stress vật lý.\n\n*Người hay bị tụt đường huyết:chất sắt có trong chuối sấy dẻo giúp cơ thể tránh được nguy cơ thiếu máu do thiếu sắt.\n*Người muốn tăng cân:việc bổ sung thêm chuối sấy dẻo sau mỗi bữa ăn có tác dụng tích cực lên hệ tiêu hóa, giúp ăn ngon hơn, tiêu hóa thức ăn tốt hơn, hấp thụ dinh dưỡng tốt hơn nên giúp tăng cân tự nhiên có kiểm soát.', 60000, 55000, NULL, NULL, NULL, 2, 1, 1, 1, '', '', '', NULL, NULL, NULL, 250),
(10, 'Dâu tây sấy dẻo-150gr', 0, '2021-07-23 10:08:28', '105', 17, 0, 'https://appdala.net/wp-content/uploads/Dautay-1-1.jpg', 'https://appdala.net/wp-content/uploads/Dau-tay-da-lat-say-deo-2-1.png;https://appdala.net/wp-content/uploads/Dautay-1-2.jpg;https://appdala.net/wp-content/uploads/14650111_1834506056785453_4163471559046559578_n-1.jpg', '', 'Từ lâu, những quả dâu tây đỏ mọng nước đã nổi tiếng là nguồn cung cấp vitamin C dồi dào cho cơ thể, nhưng ít người biết tới loại quả này còn rất giàu các chất chống oxy hóa có lợi. Việc ăn dâu tây mỗi ngày giúp ngăn ngừa lão hóa, tăng cường hệ miễn dịch, giảm chứng viêm khớp, phòng ngừa tiểu đường cũng như sự hình thành và lan rộng của các khối u. Đặc biệt, dâu tây còn giúp cơ thể sản sinh các hormore hạnh phúc (dopamine, serotonin) không chỉ chữa chứng trầm cảm còn giúp thúc đẩy máu mang dưỡng chất tới não.\n\nHiểu được được tầm quan trọng của dâu tây đối với sức khỏe,BerryLandđã sử dụng dây chuyền sản xuất hiện đại của mình để mang đến những quả dâu cô đặc đầy dinh dưỡng trong mónDâu Sấy Dẻonổi tiếng của mình. Được sấy bằng công nghệ cao trong dây chuyền khép kín,Dâu sấy dẻoBerryLandkhông chỉ giữ được hàm lượng dinh dưỡng của trái cây tươi, mà còn làm giảm độ chua giúp tăng vị ngọt dịu cho những quả dâu thêm phần thơm ngon. Chính vì vậy, món ăn vặt dinh dưỡng này sẽ là lựa chọn phù hợp cho tất cả các đối tượng từ trẻ em, người lớn cho tới các mẹ bầu. Ngoài ra, sản phẩm được đóng gói nhỏ gọn, đẹp mắt phù hợp cho việc đãi khách, mang theo tới văn phòng, hay những chuyến du lịch xa.\n\nNguyên liệu chính: dâu tây tươi.\nSản phẩm được sơ chế và sấy bằng công nghệ hiện đại, khép kín, đảm bảo đạt chuẩn an toàn vệ sinh thực phẩm.\nLà một sản phẩm cô đặc của trái cây tươi, vẫn giữ được hương vị thơm ngon, màu sắc không khô cứng.\nSản phẩm không qua chiên dầu nên không bị hiện tượng thấm dầu và hôi dầu.\nSản phẩm vẫn giữ được các yếu tố như màu sắc, thành phần dinh dưỡng, vitamin và đặc tính đặc trưng riêng của từng loại trái cây.\nBảo quản được lâu hơn so với trái cây tươi và là bữa ăn nhẹ tiện dụng cho những chuyến đi chơi dài.\nHướng dẫn bảo quản\n\nĐóng kín bao bì để giữ khô ráo sản phẩm sau khi sử dụng.\nBảo quản nơi thoáng mát, tránh ánh nắng trực tiếp.\nBảo quản được lâu hơn so với trái cây tươi và là bữa ăn nhẹ tiện dụng cho những chuyến đi chơi dài.', 140000, 120000, NULL, NULL, NULL, 2, 1, 1, 1, '', '', '', NULL, NULL, NULL, 150),
(11, 'Chuối Laba sấy dòn loại Đặc Biệt-100gram', 0, '2021-07-23 10:20:41', '11UJ', 17, 0, 'https://appdala.net/wp-content/uploads/hinh-say-gion.jpg', 'https://appdala.net/wp-content/uploads/hinh-mat-truoc.jpg;https://appdala.net/wp-content/uploads/hinh-chuoi.jpg;https://appdala.net/wp-content/uploads/hinh-say-gion-1.jpg', '', 'Trong mỗi quả chuối có lượng vitamin A, C có khả năng tăng cường, cải thiện sức khỏe cho mắt. Bên cạnh đó thành phần beta carotene, lutein, ngoài ra vitamin E của chuối còn có tác dụng giúp phòng tránh tình trạng oxy hóa ở mắt, chống hiện tượng thoái hóa điểm vàng. Do đó, bạn nên bổ sung loại thực phẩm này cho trẻ nhỏ từ sớm để bé có đôi mắt sáng khỏe.\n\nChuối sấy giòn của dalat chips là món ăn đặc sản Đà Lạt được chế biến bằng công nghệ hiện đại: không sử dụng phẩm màu, không đường, không chất bảo quản và không chứa cholesterol nên chuối sấy của dalat chips vẫn giữ được đặc tính tự nhiên.\nChuối sấy giòn dalat chips có dạng thanh, giòn, đảm bảo không bị gãy nát. Mùi vị thơm ngon, cung cấp nhiều chất dinh dưỡng cho cơ thể.\n\nKLT:100gr.\nThành phần:– 100% từ trái chuối Laba nguyên chất được trồng tại Lâm Đồng.\n– Không chứa chất bảo quản.\nHạn sử dung:06 tháng kể từ ngày sản xuất.\nHướng dẫn sử dụng:\n– Dùng trực tiếp sau khi mở bao bì.\n– Sau khi mở bao bì nên để kín gió, bảo quản nơi khô ráo, thoáng mát.\n– Không sử dụng sản phẩm khi có dấu hiện ẩm mốc, xuất hiện mùi lạ.\n\n\nSản phẩm được phân phối bởi Dala.vn.\n', 35000, 29000, NULL, NULL, NULL, 5, 1, 1, 1, '', '', '', NULL, NULL, NULL, 100),
(12, 'Trà Actisô Túi Lọc Ladophar – 100 túi', 0, '2021-07-23 10:23:21', '12OL', 17, 0, 'https://appdala.net/wp-content/uploads/tui-loc-1-1.jpg', 'https://appdala.net/wp-content/uploads/tui-loc-1-2.jpg;https://appdala.net/wp-content/uploads/tui-loc-2.jpg;https://appdala.net/wp-content/uploads/tui-loc-3.jpg;https://appdala.net/wp-content/uploads/tui-loc-4.jpg', '', 'Trà túi lọc Actiso là sản phấm chiết xuất từ thiên nhiên, với hương thơm và vị ngọt hoàn toàn tự nhiên nay được bổ sung thêm thành phần cao Actisô giúp tăng cường hiệu quả phòng ngừa và bảo vệ gan mật.\n\nTrà túi lọc Actiso được đóng gói theo quy cách 100 túi lọc x 2g, rất dễ dàng sử dụng cũng như bảo quản.\n\nTrà túi lọc Actiso rất tốt. Với công dụng mát gan, lợi tiểu, thông mật, rất thích hợp cho người bị yếu gan, nổi mề đay, vàng da. Có thể dùng hằng ngày thay nước lọc.\n\n\n\nThành phần: Cho 1 túi lọc: Actiso 1,65g, Cao đặc Actiso 0,04g, thành phần khác vừa đủ 1 túi lọc 2g.\nKLT: 200g\nHạn sử dụng: 3 năm.\nCách dùng: Nhúng túi trà vào ly nước sôi (150-200ml), chờ 3-5 phút.\nCó thể pha thêm đường tùy ý.\n\nNgày uống 3 lần, mỗi lần 1-2 túi lọc.\n\nKhông sử dụng sản phẩm khi có dấu hiệu ẩm mốc, xuất hiện mùi lạ.\n\nSản phẩm được phân phối bởi Dala.vn.', 95000, 90000, NULL, NULL, NULL, 3, 1, 1, 1, '', '', '', NULL, NULL, NULL, 100),
(13, 'Cao Đặc Actiso Ladophar – 100g', 0, '2021-07-23 10:25:10', '13PU', 17, 0, 'https://appdala.net/wp-content/uploads/cao-dac-3.jpg', 'https://appdala.net/wp-content/uploads/cao-dac-1.jpg;https://appdala.net/wp-content/uploads/cao-dac-2.jpg;https://appdala.net/wp-content/uploads/cao-dac-3-1.jpg', '', 'Cao Đặc Actiso 100g\nCao đặc Actisôlà sản phẩm chiết xuất tinh chất của Actisô với công nghệ cô cao chân không hiện đại và được xử lý theo quy trình 24h của Ladophar giúp giữ toàn vẹn hàm lượng hoạt chất Cynarin.\n\n100g cao đặc LADOactiso từ Ladophar tương đương 3.500g lá tươi Atisô\n\nLadophar tự hào là đơn vị đầu tiên nghiên cứu và sản xuất ra cao Actisô tại Việt Nam với hàm lượng hoạt chất cao nhất thị trường.\n\nCao Actisô là hoạt chất toàn phần chiết xuất từ lá tươi Actisô, bằng công nghệ cô chân không, bảo toàn hàm lượng hoạt chất.\n\nThành phần:\n100 g cao đặcacisôtương đương 3,5 kg lá tươi Actisô.\n\nCách dùng:Dùng 2-3 g mỗi lần, ngày 2-3 lần.\nHòa tan cao đặc Actisô trong nước nóng,\nDùng thêm đường hay mật ong tùy thích.\n\nBảo quản:Nơi khô, tránh ánh nắng trực tiếp.\n\nThực phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh.', 120000, 110000, NULL, NULL, NULL, 3, 1, 1, 1, '', '', '', NULL, NULL, NULL, 100),
(18, 'Cà phê hạt', 0, '2021-08-06 10:38:08', '18KY', 17, 0, 'https://appdala.net/wp-content/uploads/gia-ca-phe-hom-nay-114.jpg', '', '', 'CAM KẾT KHÔNG tẩm hương liệu, hóa chất KHÔNG sử dụng hạt có phẩm cấp thấp KHÔNG sử dụng các loại hạt khác để rang\nThành Phần : 80% Arabica + 20% Robusta Rang Mộc Hoàn Toàn . Dạng Xay Pha Phin .', 350000, NULL, NULL, NULL, NULL, 7, 1, 1, 1, '', '', '', 15, 5, 15, 1000),
(19, 'HẠT SACHA INCHI PHỦ CÀ PHÊ 100G', 0, '2021-10-03 09:21:55', '19G7', 18, 0, 'https://appdala.net/wp-content/uploads/sachi-cafe-1-scaled.jpg', 'https://appdala.net/wp-content/uploads/sachi-cafe-1-1-scaled.jpg;https://appdala.net/wp-content/uploads/sachi-cafe-2-scaled.jpg;https://appdala.net/wp-content/uploads/sachi-cafe-3-scaled.jpg', '', 'Công dụng của hạt Sacha Inchi:\n\nSacha Inchi, còn được gọi là đậu phộng Inca, là loại cây mọc ở rừng nhiệt đới Amazone và vùng cao nguyên của Peru. Các chuyên gia đã ví loại hạt này là một trong những siêu thực phẩm lành mạnh nhất thế giới vì Sacha Inchi rất giàu protein, omega-3, 6, 9, vitamin và chất xơ. Không chỉ có nhiều lợi ích cho sức khỏe mà hạt Sacha Inchi còn có tác dụng giảm cân, giúp da và tóc chắc khỏe. Là một trong những sản phẩm cao cấp của chúng tôi, hạt Sacha Inchi rang phủ cà phê thật tạo nên hương vị hài hòa và giúp tăng cường sự tỉnh táo.', 200000, 100000, NULL, NULL, NULL, NULL, 1, 1, 1, '', '', '', NULL, NULL, NULL, 100),
(20, 'HẠT SACHA INCHI NƯỚC CỐT DỪA 100G', 0, '2021-10-03 09:26:21', '20XE', 18, 0, 'https://appdala.net/wp-content/uploads/sachi-cot-dua1-scaled.jpg', 'https://appdala.net/wp-content/uploads/sachi-cot-dua-2-scaled.jpg;https://appdala.net/wp-content/uploads/sachi-cot-dua1-1-scaled.jpg;https://appdala.net/wp-content/uploads/sachi-cot-dua-3-scaled.jpg', '', 'Các sản phẩm của Nông Lâm Food được nghiên cứu và phát triển bởi các nhà khoa học đến từ Trường Đại Học Nông Lâm và Đại học Ghent, Bỉ - thuộc top 100 trường đại học tốt nhất thế giới.\n\nQuy trình chế biến được ứng dụng công nghệ sấy hồng ngoại tiên tiến đến từ Hàn Quốc, giúp lưu giữ hàm lượng dinh dưỡng để cho ra sản phẩm dẻo mềm, thơm ngon hơn.\n\nNguyên liệu được tuyển chọn kỹ lưỡng từ vùng nguyên liệu sạch, giữ trọn vẹn hương vị và giá trị từ thiên nhiên.\n\nCông dụng của hạt Sacha Inchi:\n\nSacha Inchi, còn được gọi là đậu phộng Inca, là loại cây mọc ở rừng nhiệt đới Amazone và vùng cao nguyên của Peru. Các chuyên gia đã ví loại hạt này là một trong những siêu thực phẩm lành mạnh nhất thế giới vì Sacha Inchi rất giàu protein, omega-3, 6, 9, vitamin và chất xơ. Không chỉ có nhiều lợi ích cho sức khỏe mà hạt Sacha Inchi còn có tác dụng giảm cân, giúp da và tóc chắc khỏe. Là một trong những sản phẩm cao cấp của chúng tôi, hạt Sacha Inchi rang cốt dừa vô cùng thơm ngon và giòn rụm, mang lại cho bạn món ăn vặt vừa hấp dẫn vừa có lợi cho sức khỏe.\n\nSau nhiều năm hoạt động và phát triển, chúng tôi đã đạt được những thành tựu đáng kể và các chứng chỉ uy tín trong lĩnh vực chế biến nông sản có lợi cho sức khỏe: Hàng Việt Nam Chất Lượng Cao, HACCP, ISO22000:2015, GMP…\n\nSản phẩm của Nông Lâm Food hiện nay đã có mặt tại khắp các cửa hàng thực phẩm sạch, cửa hàng đặc sản và quà tặng, các chuỗi hệ thống siêu thị và cửa hàng tiện lợi trên toàn quốc như BigC, AEON, Lotte Mart, VinMart, CoopMart, Cirkle K, Ministop....\n\nNgoài ra, các sản phẩm trái cây sấy nhiệt đới của chúng tôi đã được xuất khẩu và yêu thích tại nhiều nước trên thế giới như EU, Úc, Singapore, Nga… và các thị trường khó tính khác như Mỹ, Nhật…\n\nSản phẩm Nông Lâm Food luôn được người tiêu dùng ưa chuộng những khi nhâm nhi, thưởng thức cùng bạn bè, người thân. Đặc biệt, đây còn là dòng sản phẩm được khách hàng lựa chọn nhiều nhất để làm quà tặng trong dịp Tết 2019 vừa qua.', 200000, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, '', '', '', NULL, NULL, NULL, 100);

--
-- Triggers `dala_products_speciality`
--
DROP TRIGGER IF EXISTS `trig_products_speciality_insert`;
DELIMITER $$
CREATE TRIGGER `trig_products_speciality_insert` BEFORE INSERT ON `dala_products_speciality` FOR EACH ROW BEGIN  






IF(NEW.dala_products_speciality_name  is null or NEW.dala_products_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_insert_name_empty';   
END IF;	









IF(NEW.dala_products_speciality_weight  is null or NEW.dala_products_speciality_weight = '') THEN 
	SIGNAL SQLSTATE '12301' 
	SET MESSAGE_TEXT = 'trig_products_speciality_insert_weight_empty';   
END IF;	








IF(LENGTH(NEW.dala_products_speciality_date_start) > 0  and LENGTH(NEW.dala_products_speciality_date_end) > 0) THEN 
	IF( (UNIX_TIMESTAMP(NEW.dala_products_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_products_speciality_date_start)) <= 0 ) THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_insert_date_end_less_star';   
	END IF;
END IF;	






IF(LENGTH(NEW.dala_products_speciality_brand) > 0 ) THEN 
	
	SET @checkID = (select dala_brands_ID  from dala_brands where dala_brands_ID  = NEW.dala_products_speciality_brand);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_insert_brand_no_refe'; 
	END IF;	
END IF;







IF( LENGTH(NEW.dala_products_speciality_parent_id) > 0 AND NEW.dala_products_speciality_parent_id  > 0 ) THEN 
	
	SET @checkID = (select dala_products_speciality_ID  from dala_products_speciality where dala_products_speciality_ID  = NEW.dala_products_speciality_parent_id );
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_insert_parent_id_no_refe_insert'; 
	END IF;	
END IF;














END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_products_speciality_update`;
DELIMITER $$
CREATE TRIGGER `trig_products_speciality_update` BEFORE UPDATE ON `dala_products_speciality` FOR EACH ROW BEGIN  






IF(NEW.dala_products_speciality_name  is null or NEW.dala_products_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_update_name_empty';   
END IF;	






IF(NEW.dala_products_speciality_weight  is null or NEW.dala_products_speciality_weight = '') THEN 
	SIGNAL SQLSTATE '12301' 
	SET MESSAGE_TEXT = 'trig_products_speciality_insert_weight_empty';   
END IF;	






IF( 
(NEW.dala_products_speciality_sale_of_price is not null OR  NEW.dala_products_speciality_sale_of_price  > 0) AND
(NEW.dala_products_speciality_price is not null OR  NEW.dala_products_speciality_price  > 0) 
 ) THEN 
	IF ( NEW.dala_products_speciality_sale_of_price >= NEW.dala_products_speciality_price ) THEN   
		SIGNAL SQLSTATE '12305' 
		SET MESSAGE_TEXT = 'trig_products_speciality_insert_peice_less_then'; 
	END IF;	
ELSEIF ( NEW.dala_products_speciality_sale_of_price is not null OR  NEW.dala_products_speciality_sale_of_price  > 0 ) THEN 
	SET @checkID = (select dala_products_speciality_price  from dala_products_speciality where dala_products_speciality_ID  = NEW.dala_products_speciality_ID );
	IF ( NEW.dala_products_speciality_sale_of_price >= @checkID ) THEN   
		SIGNAL SQLSTATE '12304' 
		SET MESSAGE_TEXT = 'trig_products_speciality_insert_peice_less_then'; 
	END IF;	
ELSEIF ( NEW.dala_products_speciality_price is not null OR  NEW.dala_products_speciality_price  > 0 ) THEN 
	SET @checkID = (select dala_products_speciality_sale_of_price  from dala_products_speciality where dala_products_speciality_ID  = NEW.dala_products_speciality_ID );
	IF ( NEW.dala_products_speciality_price <= @checkID ) THEN   
		SIGNAL SQLSTATE '12304' 
		SET MESSAGE_TEXT = 'trig_products_speciality_insert_peice_less_then'; 
	END IF;		
END IF;





IF(LENGTH(NEW.dala_products_speciality_date_start) > 0  and LENGTH(NEW.dala_products_speciality_date_end) > 0) THEN 
	IF( (UNIX_TIMESTAMP(NEW.dala_products_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_products_speciality_date_start)) <= 0 ) THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_update_date_end_less_star';   
	END IF;
END IF;	






IF(LENGTH(NEW.dala_products_speciality_brand) > 0 ) THEN 
	
	SET @checkID = (select dala_brands_ID  from dala_brands where dala_brands_ID  = NEW.dala_products_speciality_brand);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_update_brand_no_refe'; 
	END IF;	
END IF;







IF( LENGTH(NEW.dala_products_speciality_parent_id) > 0 AND NEW.dala_products_speciality_parent_id  > 0 ) THEN 
	
	SET @checkID = (select dala_products_speciality_ID  from dala_products_speciality where dala_products_speciality_ID  = NEW.dala_products_speciality_parent_id );
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_update_parent_id_no_refe_update'; 
	END IF;	
END IF;






IF(LENGTH(NEW.dala_products_speciality_sku) > 0) THEN 
	SET @sku_old = (select dala_products_speciality_sku   
		from dala_products_speciality 
		where dala_products_speciality_ID  = NEW.dala_products_speciality_ID 	
	);
	
	IF (@sku_old is null or @sku_old = '' or @sku_old = 'null' or @sku_old = NEW.dala_products_speciality_sku ) THEN   
		SIGNAL SQLSTATE '01000';
	ELSE 
		
		SET @check_sku = (select dala_products_speciality_ID   
			from dala_products_speciality 
			where dala_products_speciality_sku  = NEW.dala_products_speciality_sku 	
		);	
		IF(@check_sku > 0 ) THEN
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_products_speciality_sku_double'; 		
		END IF;
	END IF;	
END IF;	


END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_reviews_food_drink`
--

DROP TABLE IF EXISTS `dala_reviews_food_drink`;
CREATE TABLE IF NOT EXISTS `dala_reviews_food_drink` (
  `dala_reviews_food_drink_ID` int NOT NULL AUTO_INCREMENT,
  `dala_reviews_food_drink_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_reviews_food_drink_user_id` int NOT NULL,
  `dala_reviews_food_drink_product_id` int NOT NULL,
  `dala_reviews_food_drink_contents` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_reviews_food_drink_status_store` int NOT NULL DEFAULT '0',
  `dala_reviews_food_drink_status_admin` int NOT NULL DEFAULT '0',
  `dala_reviews_food_drink_number_star` int NOT NULL DEFAULT '5',
  PRIMARY KEY (`dala_reviews_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_reviews_speciality`
--

DROP TABLE IF EXISTS `dala_reviews_speciality`;
CREATE TABLE IF NOT EXISTS `dala_reviews_speciality` (
  `dala_reviews_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_reviews_speciality_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_reviews_speciality_user_id` int NOT NULL,
  `dala_reviews_speciality_product_id` int NOT NULL,
  `dala_reviews_speciality_contents` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_reviews_speciality_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_reviews_speciality_number_star` int NOT NULL DEFAULT '5',
  PRIMARY KEY (`dala_reviews_speciality_ID`),
  KEY `reviews_speciality_user_id` (`dala_reviews_speciality_user_id`),
  KEY `reviews_speciality_product_id` (`dala_reviews_speciality_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `dala_reviews_speciality`
--
DROP TRIGGER IF EXISTS `trig_reviews_speciality_product_id_insert`;
DELIMITER $$
CREATE TRIGGER `trig_reviews_speciality_product_id_insert` BEFORE INSERT ON `dala_reviews_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_speciality_product_id  is null or NEW.dala_reviews_speciality_product_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_product_id_empty';   
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_reviews_speciality_product_id_update`;
DELIMITER $$
CREATE TRIGGER `trig_reviews_speciality_product_id_update` BEFORE UPDATE ON `dala_reviews_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_speciality_product_id  is null or NEW.dala_reviews_speciality_product_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_product_id_empty';   
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_reviews_speciality_user_id_insert`;
DELIMITER $$
CREATE TRIGGER `trig_reviews_speciality_user_id_insert` BEFORE INSERT ON `dala_reviews_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_speciality_user_id  is null or NEW.dala_reviews_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_user_id_empty';   
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_reviews_speciality_user_id_update`;
DELIMITER $$
CREATE TRIGGER `trig_reviews_speciality_user_id_update` BEFORE UPDATE ON `dala_reviews_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_speciality_user_id  is null or NEW.dala_reviews_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_user_id_empty';   
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_reviews_store_speciality`
--

DROP TABLE IF EXISTS `dala_reviews_store_speciality`;
CREATE TABLE IF NOT EXISTS `dala_reviews_store_speciality` (
  `dala_reviews_store_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_reviews_store_speciality_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_reviews_store_speciality_user_id` int NOT NULL,
  `dala_reviews_store_speciality_store_id` int NOT NULL,
  `dala_reviews_store_speciality_contents` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_reviews_store_speciality_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_reviews_store_speciality_number_star` int NOT NULL DEFAULT '5',
  PRIMARY KEY (`dala_reviews_store_speciality_ID`),
  KEY `reviews_store_speciality_user_id` (`dala_reviews_store_speciality_user_id`),
  KEY `reviews_store_speciality_store_id` (`dala_reviews_store_speciality_store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `dala_reviews_store_speciality`
--
DROP TRIGGER IF EXISTS `trig_reviews_store_speciality_store_id_insert`;
DELIMITER $$
CREATE TRIGGER `trig_reviews_store_speciality_store_id_insert` BEFORE INSERT ON `dala_reviews_store_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_store_speciality_store_id  is null or NEW.dala_reviews_store_speciality_store_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_store_speciality_store_id_empty';   
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_reviews_store_speciality_store_id_update`;
DELIMITER $$
CREATE TRIGGER `trig_reviews_store_speciality_store_id_update` BEFORE INSERT ON `dala_reviews_store_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_store_speciality_store_id  is null or NEW.dala_reviews_store_speciality_store_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_store_speciality_store_id_empty';   
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_reviews_store_speciality_user_id_insert`;
DELIMITER $$
CREATE TRIGGER `trig_reviews_store_speciality_user_id_insert` BEFORE INSERT ON `dala_reviews_store_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_store_speciality_user_id  is null or NEW.dala_reviews_store_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_dala_reviews_store_speciality_user_id_empty';   
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_reviews_store_speciality_user_id_update`;
DELIMITER $$
CREATE TRIGGER `trig_reviews_store_speciality_user_id_update` BEFORE INSERT ON `dala_reviews_store_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_store_speciality_user_id  is null or NEW.dala_reviews_store_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_dala_reviews_store_speciality_user_id_empty';   
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_service_type`
--

DROP TABLE IF EXISTS `dala_service_type`;
CREATE TABLE IF NOT EXISTS `dala_service_type` (
  `dala_service_type_ID` int NOT NULL AUTO_INCREMENT,
  `dala_service_type_name` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_service_type_information` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_service_type_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_service_type`
--

INSERT INTO `dala_service_type` (`dala_service_type_ID`, `dala_service_type_name`, `dala_service_type_information`) VALUES
(3, 'speciality', 'dịch vụ bán hàng đặc sản đà lạt'),
(4, 'food-drink', 'dịch vụ ăn uống ăn uông');

--
-- Triggers `dala_service_type`
--
DROP TRIGGER IF EXISTS `trig_service_type_name_insert`;
DELIMITER $$
CREATE TRIGGER `trig_service_type_name_insert` BEFORE INSERT ON `dala_service_type` FOR EACH ROW BEGIN  

IF(NEW.dala_service_type_name  is null or NEW.dala_service_type_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_service_type_name_empty';   
END IF;




END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_service_type_name_update`;
DELIMITER $$
CREATE TRIGGER `trig_service_type_name_update` BEFORE UPDATE ON `dala_service_type` FOR EACH ROW BEGIN  

IF(NEW.dala_service_type_name  is null or NEW.dala_service_type_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_service_type_name_empty';   
END IF;




END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_session_food_drink`
--

DROP TABLE IF EXISTS `dala_session_food_drink`;
CREATE TABLE IF NOT EXISTS `dala_session_food_drink` (
  `dala_session_food_drink_ID` int NOT NULL AUTO_INCREMENT,
  `dala_session_food_drink_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_session_food_drink_line_order` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_session_food_drink_product_id` int NOT NULL,
  `dala_session_food_drink_qty` int NOT NULL,
  `dala_session_food_drink_price` float NOT NULL,
  `dala_session_food_drink_discount` float NOT NULL DEFAULT '0',
  `dala_session_food_drink_unit_discount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_session_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_session_speciality`
--

DROP TABLE IF EXISTS `dala_session_speciality`;
CREATE TABLE IF NOT EXISTS `dala_session_speciality` (
  `dala_session_speciality_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_session_speciality_line_order` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_session_speciality_product_id` int NOT NULL,
  `dala_session_speciality_qty` int NOT NULL,
  `dala_session_speciality_price` float NOT NULL,
  `dala_session_speciality_discount` float NOT NULL DEFAULT '0',
  `dala_session_speciality_unit_discount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_session_speciality_name`,`dala_session_speciality_line_order`,`dala_session_speciality_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_shipping_company`
--

DROP TABLE IF EXISTS `dala_shipping_company`;
CREATE TABLE IF NOT EXISTS `dala_shipping_company` (
  `dala_shipping_company_ID` int NOT NULL AUTO_INCREMENT,
  `dala_shipping_company_name` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_company_information` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_shipping_company_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `dala_shipping_company`
--
DROP TRIGGER IF EXISTS `trig_shipping_company_name_insert`;
DELIMITER $$
CREATE TRIGGER `trig_shipping_company_name_insert` BEFORE INSERT ON `dala_shipping_company` FOR EACH ROW BEGIN  
IF(NEW.dala_shipping_company_name  is null or NEW.dala_shipping_company_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_shipping_company_name_empty';   
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_shipping_company_name_update`;
DELIMITER $$
CREATE TRIGGER `trig_shipping_company_name_update` BEFORE INSERT ON `dala_shipping_company` FOR EACH ROW BEGIN  
IF(NEW.dala_shipping_company_name  is null or NEW.dala_shipping_company_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_shipping_company_name_empty';   
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_shipping_food_drink`
--

DROP TABLE IF EXISTS `dala_shipping_food_drink`;
CREATE TABLE IF NOT EXISTS `dala_shipping_food_drink` (
  `dala_shipping_food_drink_ID` int NOT NULL AUTO_INCREMENT,
  `dala_shipping_food_drink_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_food_drink_parent_id` int NOT NULL DEFAULT '0',
  `dala_shipping_food_drink_information` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_food_drink_price` float DEFAULT NULL,
  `dala_shipping_food_drink_show` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_shipping_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_shipping_speciality`
--

DROP TABLE IF EXISTS `dala_shipping_speciality`;
CREATE TABLE IF NOT EXISTS `dala_shipping_speciality` (
  `dala_shipping_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_shipping_speciality_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_speciality_code` int NOT NULL COMMENT 'mã vùng, lấy theo datas array. ví dụ : 01,02,03.....',
  `dala_shipping_speciality_parent_id` int NOT NULL DEFAULT '0',
  `dala_shipping_speciality_information` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_speciality_price` float DEFAULT '0',
  `dala_shipping_speciality_show` int NOT NULL DEFAULT '0' COMMENT 'cột này chưa dùng',
  PRIMARY KEY (`dala_shipping_speciality_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Bảng giá shipping từng khu vực nhập vào';

--
-- Dumping data for table `dala_shipping_speciality`
--

INSERT INTO `dala_shipping_speciality` (`dala_shipping_speciality_ID`, `dala_shipping_speciality_name`, `dala_shipping_speciality_code`, `dala_shipping_speciality_parent_id`, `dala_shipping_speciality_information`, `dala_shipping_speciality_price`, `dala_shipping_speciality_show`) VALUES
(1, 'Thành phố Đà Lạt', 1, 0, '', 30000, 0),
(2, 'Phường 7', 1, 1, '', 27000, 0),
(7, 'ccaaa', 3333, 6, '', 333, 0),
(8, 'bvbvb', 423234, 6, '', 34232, 0),
(9, 'Phường 1', 1, 1, '', 11000, 0),
(10, 'Phường 2', 2, 1, '', 22000, 0),
(11, 'Phường 3', 3, 1, '', 33000, 0),
(12, 'Phường 4', 4, 1, '', 24000, 0),
(13, 'Phường 5', 5, 1, '', 25000, 0),
(14, 'Phường 6', 6, 1, '', 26000, 0),
(15, 'Phường 8', 8, 1, '', 28000, 0),
(16, 'Phường 9', 9, 1, '', 29000, 0),
(17, 'Phường 10', 10, 1, '', 10000, 0),
(18, 'Phường 11', 11, 1, '', 11000, 0),
(19, 'Phường 12', 12, 1, '', 12000, 0),
(20, 'Xã Xuân Thọ', 31, 1, '', 20000, 0),
(21, 'Xã Tà Nung', 33, 1, '', 33000, 0),
(22, 'Xã Trạm Hành', 44, 1, '', 34000, 0),
(23, 'Xã Xuân Trường', 35, 1, '', 35000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `dala_shipping_tracking`
--

DROP TABLE IF EXISTS `dala_shipping_tracking`;
CREATE TABLE IF NOT EXISTS `dala_shipping_tracking` (
  `dala_shipping_tracking_ID` int NOT NULL AUTO_INCREMENT,
  `dala_shipping_tracking_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_shipping_tracking_users_id` int NOT NULL,
  `dala_shipping_tracking_orders_id` int NOT NULL,
  `dala_shipping_tracking_infomation` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_tracking_orders_status` tinyint(1) NOT NULL,
  `dala_shipping_tracking_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_shipping_tracking_ID`),
  KEY `shipping_tracking_users_id` (`dala_shipping_tracking_users_id`),
  KEY `shipping_tracking_orders_id` (`dala_shipping_tracking_orders_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_stores`
--

DROP TABLE IF EXISTS `dala_stores`;
CREATE TABLE IF NOT EXISTS `dala_stores` (
  `dala_stores_ID` int NOT NULL AUTO_INCREMENT,
  `dala_stores_user_id` int NOT NULL,
  `dala_stores_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_stores_name` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_payment_limit` double NOT NULL,
  `dala_stores_service_type_id` int NOT NULL,
  `dala_stores_adress` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_province` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_district` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_wards` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'số điện thoại để shipper liên hệ lấy hàng',
  `dala_stores_logo_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'logo cửa hàng',
  `dala_stores_banner_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'banner cửa hàng',
  `dala_stores_information` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'Giới thiệu về cửa hàng',
  `dala_stores_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_stores_status_stores` tinyint(1) NOT NULL DEFAULT '0',
  `dala_stores_info_banking` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_discount_price` tinyint DEFAULT '0',
  `dala_stores_local_x` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_local_y` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_local_adress` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_status_update` tinyint(1) NOT NULL DEFAULT '0',
  `dala_stores_payment_methods` tinyint(1) NOT NULL DEFAULT '0',
  `dala_stores_payment_time` tinyint(1) NOT NULL DEFAULT '28',
  `dala_stores_upload_limit_day` smallint UNSIGNED NOT NULL DEFAULT '20',
  `dala_stores_upload_limit_month` smallint UNSIGNED NOT NULL DEFAULT '300',
  PRIMARY KEY (`dala_stores_ID`),
  KEY `stores_user_id` (`dala_stores_user_id`),
  KEY `stores_service_type_id` (`dala_stores_service_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_stores`
--

INSERT INTO `dala_stores` (`dala_stores_ID`, `dala_stores_user_id`, `dala_stores_date_created`, `dala_stores_name`, `dala_stores_payment_limit`, `dala_stores_service_type_id`, `dala_stores_adress`, `dala_stores_province`, `dala_stores_district`, `dala_stores_wards`, `dala_stores_phone`, `dala_stores_logo_image`, `dala_stores_banner_image`, `dala_stores_information`, `dala_stores_status_admin`, `dala_stores_status_stores`, `dala_stores_info_banking`, `dala_stores_discount_price`, `dala_stores_local_x`, `dala_stores_local_y`, `dala_stores_local_adress`, `dala_stores_qoute`, `dala_stores_status_update`, `dala_stores_payment_methods`, `dala_stores_payment_time`, `dala_stores_upload_limit_day`, `dala_stores_upload_limit_month`) VALUES
(17, 51, '2021-10-03 00:19:17', 'Cửa hàng đặt sản đà lạt DALA', 10000000, 3, 'số 51, trương định', 'Tỉnh Lâm Đồng', 'Thành phố Đà Lạt', 'Phường 8', '09480360101', '', '', 'store infomartion', 1, 1, '01010011002', 0, '', '', '', '', 0, 0, 28, 20, 300),
(18, 91, '2021-10-03 09:13:46', 'CÔNG TY CỔ PHẦN NÔNG LÂM FOOD', 2000000, 3, '68 Nguyễn Huệ', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Bến Nghé', '0708546623', 'https://appdala.net/wp-content/uploads/logo-nonglamfood-full-ngang-22-scaled.jpg', '', '', 1, 1, '', 10, '', '', '', '', 1, 0, 28, 20, 300);

--
-- Triggers `dala_stores`
--
DROP TRIGGER IF EXISTS `trig_stores_insert`;
DELIMITER $$
CREATE TRIGGER `trig_stores_insert` BEFORE INSERT ON `dala_stores` FOR EACH ROW BEGIN  







IF(NEW.dala_stores_name is null or NEW.dala_stores_name = '') THEN 
	SIGNAL SQLSTATE '12301' 
	SET MESSAGE_TEXT = 'trig_stores_name_empty';   
END IF;







IF(NEW.dala_stores_phone is null or NEW.dala_stores_phone = '') THEN 
	SIGNAL SQLSTATE '12302' 
	SET MESSAGE_TEXT = 'trig_stores_phone_empty';   
ELSE 
	IF (NEW.dala_stores_phone REGEXP '^[0-9]{10,11}$' ) = 0 THEN 
		SIGNAL SQLSTATE '12303' 
		SET MESSAGE_TEXT = 'trig_stores_phone_data_type';   
	END IF;   
END IF;






IF( 
	(NEW.dala_stores_province is null or  NEW.dala_stores_province = '' ) or 
	(NEW.dala_stores_district is null or  NEW.dala_stores_district = '' ) or 
	(NEW.dala_stores_wards  is null or  NEW.dala_stores_wards = '' ) or 
	(NEW.dala_stores_adress is null or  NEW.dala_stores_adress = '' ) 
) THEN 	
	SIGNAL SQLSTATE '12303' 
	SET MESSAGE_TEXT = 'trig_stores_insert_adress_empty';   
END IF;








SET @checkID = (select dala_stores_ID from dala_stores where dala_stores_user_id = NEW.dala_stores_user_id);
IF (@checkID > 0) THEN  
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_check_store_double'; 
END IF;	











END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_stores_update`;
DELIMITER $$
CREATE TRIGGER `trig_stores_update` BEFORE UPDATE ON `dala_stores` FOR EACH ROW BEGIN  







IF(NEW.dala_stores_name is null or NEW.dala_stores_name = '') THEN 
	SIGNAL SQLSTATE '12301' 
	SET MESSAGE_TEXT = 'trig_stores_name_empty';   
END IF;







IF(NEW.dala_stores_phone is null or NEW.dala_stores_phone = '') THEN 
	SIGNAL SQLSTATE '12302' 
	SET MESSAGE_TEXT = 'trig_stores_phone_empty';   
ELSE 
	IF (NEW.dala_stores_phone REGEXP '^[0-9]{10,11}$' ) = 0 THEN 
		SIGNAL SQLSTATE '12303' 
		SET MESSAGE_TEXT = 'trig_stores_phone_data_type';   
	END IF;   
END IF;






IF( 
	(NEW.dala_stores_province is null or  NEW.dala_stores_province = '' ) or 
	(NEW.dala_stores_district is null or  NEW.dala_stores_district = '' ) or 
	(NEW.dala_stores_wards  is null or  NEW.dala_stores_wards = '' ) or 
	(NEW.dala_stores_adress is null or  NEW.dala_stores_adress = '' ) 
) THEN 	
	SIGNAL SQLSTATE '12303' 
	SET MESSAGE_TEXT = 'trig_stores_insert_adress_empty';   
END IF;









END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_token`
--

DROP TABLE IF EXISTS `dala_token`;
CREATE TABLE IF NOT EXISTS `dala_token` (
  `dala_token_ID` int NOT NULL AUTO_INCREMENT,
  `dala_token_key` varchar(500) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `dala_token_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: user app,1: admin, 2 bussiness',
  `dala_token_value` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_token_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`dala_token_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=314 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_token`
--

INSERT INTO `dala_token` (`dala_token_ID`, `dala_token_key`, `dala_token_type`, `dala_token_value`, `dala_token_date_created`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJfcm9sZSI6ImRlZmF1bHQiLCJpYXQiOjE2MjMyMjg3NTl9.iQrzkanw_3SAyFT03Kq3GbWLdpcZtvkuswhKaKtsn0M', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJzX3Bob25lIjoiMDk0ODAzNjAxMDciLCJ1c2Vyc19lbWFpbCI6Ikd1ZXN0RGFsYUFsbEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQxMjc4OTUzNGY1Y2Q1YjI2M2JiNTc0YmEyZjA5NTg1IiwidXNlcl9yb2xlIjoiZGVmYXVsdCIsImlhdCI6MTYyMzIyODc1OX0.q5Qv9zG_ynJsnOFFqcB4mDpMftZ9fxHToXbFfuAxXBo', '2021-10-03 00:19:17'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2VyX3JvbGUiOiJzdXBwZXItam9iIiwiaWF0IjoxNjIzNTUxNTE3fQ.lPM-4c93GPDnmwHwayVp94AXPtG0Zn7oyt5U8djJVwQ', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2Vyc19waG9uZSI6IjA4ODk0NTAzMDciLCJ1c2Vyc19lbWFpbCI6InN1cHBlci1qb2JAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJlNmY2YzE4NTY5MDlmZDRiNTI3YjNhYjA0ZDBlOTlhMyIsInVzZXJfcm9sZSI6InN1cHBlci1qb2IiLCJpYXQiOjE2MjM1NTE1MTd9.S37Ab2vDod4e9YErqdqeLEFTUt18WgEcxMUtsROdC7o', '2021-10-03 00:19:17'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTAsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nX2dodGsiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzE3Mjk4Nn0.nVFL657kw9PZ-a0WnVqQHNU99m2-gMVSG2ClmXptBNo', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTAsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nX2dodGsiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIzIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzEyQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzE3Mjk4Nn0.D47F-HWdwmpSJu1Xt5ooiKOgArV33D0R0dGnKIY3M7w', '2021-10-03 00:19:17'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyMjA3NDN9.AMiUeNj7DaSjouVfDPH1rQ-OzXEXWQVPEyOGSws5bNA', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzIyMDc0M30.DIbtoLScZaT2-yVXCIix5tu0iHSszGITxb0SpHzeBnA', '2021-10-03 07:25:43'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjA4MTB9.AFR7r2I6XpH-50j9pAvfbUpv7FtTiv5KmpXOGXUfpso', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjA4MTB9.qWqqeWDmYbTH5m0YPsb_FF5iqL7KiV3pQ1fkT1l3HEI', '2021-10-03 07:26:50'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyMjExNzZ9.UCTF4ii6PCLw4NOqtsRwqCpEZ1uEvGB1sj_BB13NhHo', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzIyMTE3Nn0.dD0hTLt08Thzh65OUyziOvysoT-u5ilCISWCLuiFrA4', '2021-10-03 07:32:56'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyMjMzNDh9.uagGAw9FbTUKly-ChlAH5T7bXF9gM-nCyXXOQS-79jU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzIyMzM0OH0.XxQRxsPK5uru-dqv71LCgvL4geobXfmdFi8q107-k0Y', '2021-10-03 08:09:08'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzMjI1ODc3fQ.K1Hfg34shim38LCMiD0czBS7qXPTUoirzhSw-DhFgUo', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDk0ODAzNjAxMDYiLCJ1c2Vyc19lbWFpbCI6ImN1c3RvbW1lckBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMyMjU4Nzd9.teP-TswfVHH93qm6zOm0GORdcOyJ2g8YKCc_3wm_CP8', '2021-10-03 08:51:17'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjYxNzh9.ZV9N_j9oXchvIs48Qqa7iNWaA0q6bvcawGiQCYVY3Ss', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjYxNzh9.ZhoW_tSA_aNG5YEK7IEdBY6usftsI8twgGz4bEsoGg8', '2021-10-03 08:56:18'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzIyNzcxMH0.JBWHdk3zt1G-b33o69mzvlmS7sMr3pjDRHejC_Lk9QA', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjc3MTB9.MXJM6GOjCS3YSL4VODkQ9_unikJ_qxRoBkcCQwiH26c', '2021-10-03 09:21:50'),
(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjk2MTN9.oFibZmPjN9Id8LRYI7IiqZDOpZHFGhAaZtxndXM-5I4', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjk2MTN9.oN76GKElZqjICm2PQugi2atUiaRHvyTUs8D9LoQEBwY', '2021-10-03 09:53:33'),
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDA5Mzd9.Edo3P9pedxFuBVecu2YToN8flr8L8V-qH6GsGEFEl_w', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0MDkzN30._ljWBarmjQUZd8od47-BpvEqQPH4m7gkMmckONjcFJ8', '2021-10-03 13:02:17'),
(13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDA5NzB9.FMy1T2MzdrO95xYVCB__HLg9qUu7JA2134n6HFGoa0c', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDA5NzB9.Y6CskgcZRb5BrEFvxMxEdNG0rDGtQPadNBJ3e6UUzng', '2021-10-03 13:02:50'),
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDQ2MTJ9.1rayhxWKPLq1cYE2e3UJWoJKrchoXB1G9PJQHZyc7Mc', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0NDYxMn0.m7HBINmgPbAxmK5YtdwsJ4XOnEQbqj65vIAKY6qMSRk', '2021-10-03 14:03:32'),
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDQ4MTh9.WOih_sBTTKFUt0GgYluQGR0SSkcrf7ZHYg_MOlmUS1M', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0NDgxOH0.sMrzsDVRCLgvmx0ek-Q669g-E-ce4V-rmXru6rgE5cE', '2021-10-03 14:06:58'),
(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0NTI3M30.ti-ZFzLZi3ad7a5C0dGBz1FWihFmFQE-ZJeyJ-6JalU', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDUyNzN9.vyLDuJUOFocMPgBPIGS0LOnhcP8PiiFaElDIzV_5Npg', '2021-10-03 14:14:33'),
(17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0NTM5OX0.X5lwJZAC4n6jJylpsgySPEwbUjybh4dV-g902Hk6B_0', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDUzOTl9.7XvcfQZSNMFh1IZlIs-pjt3Hoct_qeoYwFQVIif4yA0', '2021-10-03 14:16:39'),
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0NTQ0M30.DJ-3e6ENjOoyXQFGlCsQKtuv9ervf4Kt3A2reHRc-wQ', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDU0NDN9.OluGbgm1vwN9UI4-k2EgINWNi4Z9GeNdROXgX3POTXo', '2021-10-03 14:17:23'),
(19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDU0NTl9.f9eLD7-3NYmSfghTfXSm671DOXx_nqwfiJ2Las_WBwo', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDU0NTl9.jrIKYQaKR_TA6cp16BOl7i_o3VAWxKcz6vJ2VNibbpk', '2021-10-03 14:17:39'),
(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDYwNjR9.B8TU0G2F_cvgRxMJvftOtPkSvXKfH6Uvsg4Z0TaGb2A', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0NjA2NH0.bquLmfi_s-cCCQk2x6aoGRmwXTnzbGHV8Hp_6vAK7FQ', '2021-10-03 14:27:44'),
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDYwODd9.cAD6v77yDCuUzVCMnkFTCb_kwxhl5gCCJEQLy0qjY-E', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0NjA4N30.WN-6Bd8nnM9d0EiWnEUE2ETUxtMPKA_-TPTk8W5uHZE', '2021-10-03 14:28:07'),
(22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDYzMjZ9.e5zjt7uZi3OsFBMvjQ0h2R1wFJdEO3NuxX_pCsv_e-8', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0NjMyNn0.FfqgZfUpn83vBIzSFNuNHy5qyZvZnhbrYL9ypbH45wI', '2021-10-03 14:32:06'),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDczMDN9.YfFsDQ7Z1UBczp_CTzMfucwP5UtWykYIKpMQSKKezYg', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0NzMwM30.6nr6GFZ6ja6RZXEw8EMOIIGD0ZZWnIhP0fiAh1GIbU4', '2021-10-03 14:48:23'),
(24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0ODQxN30.vzFtwC1I3SCnSaF_eoofAfJqUteF7309YsW-rNNrYNA', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDg0MTd9.mBOg7fPgekG2GzzyEsbCp1HwMHGSqFwTA3KSFd9xZJw', '2021-10-03 15:06:57'),
(25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDg1NzF9.2HES2xvO4IjO2-siO4ELeMduEfu6nHFLXpOISH-9pOw', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0ODU3MX0.dskJ8Z5A1C3wMo9bEAQ5Q1nTEbulZA-XzdVQU9vmS9Y', '2021-10-03 15:09:31'),
(26, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0OTU5NH0.qKFMYRM96RTViw9slCCXOLv16KfqZdWWHChi4Uxtv_M', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDk1OTR9.YeP615XDeB8fp-3QthEugp6OnVXgNFARB93MBIh-Kok', '2021-10-03 15:26:34'),
(27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0OTk0NX0.EYRINsZG3WG8yDNqfcN3b2TnpKRiEgjq2cw5Rl2UNF0', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDk5NDV9.PkyYJWCCDaLHibu_XK7qpwRkxHGYDIzEM6auVNUtIKw', '2021-10-03 15:32:25'),
(28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0OTk3OH0.w1yBOKpYZ83XsHYzoiGS8NRZu0wvGDwQCbCHndTt95w', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDk5Nzh9.gZ8oGMQ6OdwBKQUhud_brToDYuvtTv83aW4yS7DP49Y', '2021-10-03 15:32:58'),
(29, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNTMwMDZ9.evYFijqtASXGR7H01mqk5Qm838bSSIzzhIinQFTc9nQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI1MzAwNn0.7-VhlHmpbzXxEM0fJftdZJG1V4z4VG-HUnCA5LPMkpE', '2021-10-03 16:23:26'),
(30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI1MzA4NX0.i3OnXw3FLzTqp2LOrpdXc3Q0v2he7Rb9vcVj0Mz38pE', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNTMwODV9.U4bprEvucQvJQJMxlPYQieC-fA_7pomLjLPamGRIO0k', '2021-10-03 16:24:45'),
(31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI1MzEwMH0.H3iGUWR6epI4RfzPjEUsN6RgOKMctGbncQJ3_yfbH7g', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNTMxMDB9._ViwOpLO9vdSeHzH1HrGye-0x72V521JM1fE76rF5eM', '2021-10-03 16:25:00'),
(32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNTMxMTF9.1wWS675_8RwqymFd8wc0Z1PIJWEqdEt2ZiTEcLkivFw', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNTMxMTF9.wRTGXb_Efum8M6-1SJ0L_ROEQJibGyXfUqQsCfClkn8', '2021-10-03 16:25:11'),
(33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjA4MTZ9.mtzY0gwOfK-RtKGSV_ghqy6a8YRG78W56QIEkaDlKMo', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2MDgxNn0.Q0il-lhUFYkveyvN-pbcGcA8SvV1MB-jRYqfHoxQ7Lo', '2021-10-03 18:33:36'),
(34, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjIwNTV9.ZkxkODuhCQnEbCLDg4yidWAhL4piJkMaIpzOkYxpV_A', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2MjA1NX0.jGn9T6M52VRX1VchwdlN07w7Y01UfgGkxeIHIEuePtI', '2021-10-03 18:54:15'),
(35, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjM5NjV9.J-to6VK_MlP0TLOc_NbjHKdsmzB5ziOcVastdJ3JG6M', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2Mzk2NX0.0zd61dFW1_u6wmAd8sjWkHFkKjHg0qRkAN3ilbMbMww', '2021-10-03 19:26:05'),
(36, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjQ4ODl9.3frrqhsPO5WNa00shFuqYaAe8e_YxLEIj9_VY0xMMjI', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NDg4OX0.wR_YWOS0Ig5nysWcR59FA0nW1b7n8VHmtbpONmt4Coo', '2021-10-03 19:41:29'),
(37, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjQ5MzV9.2Nmo7Um-9MVRH94oh6oRk9vFxRMgNENjYjljb_OOaaA', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NDkzNX0.alX7pteBrr9rPyRN_06oKjPuzboQA161NH8dYPwpHjM', '2021-10-03 19:42:15'),
(38, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjQ5NTd9.MqylH_IrIQnVcPTjpQEtYItFztHBD7OUtOMa6u-bdrY', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NDk1N30.ne947JtsUaYmWiB80bvPI0eZImpEqxJE2R-T06j1Fqc', '2021-10-03 19:42:37'),
(39, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjUwNDV9.JImVcNdAVClSjvWXuxuSxO9ji4Bt0APy_4Bcb4ljI0k', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTA0NX0.Gz8Mb0MCIZG_8hpKbAR1QlB8WuHoS7-y1LhWH9jM5sI', '2021-10-03 19:44:05'),
(40, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjUyMDB9.e3fhQqNRmuEXLBXw3RzGFVqz1C7DGwaFcd6YR56LPm4', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTIwMH0.ivcpbH4XvSPLUIda008_zmd8zctVeCz-yeTGToRLNfA', '2021-10-03 19:46:40'),
(41, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjU0MTR9.2o2pMjrq-ufWVOo9RHJu-h4S3aeKpwC4rJ0lXP_0-a0', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTQxNH0.OvFwvRvgJZNOPrE1klPCbWIZo0oXBRYY-gqITlXyFWk', '2021-10-03 19:50:14'),
(42, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjU2NTl9.XCrBvQimrW__ahngBdSBEezUHZufY35_ZQSXevsbAIE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTY1OX0.YP1D3QR3Lmac2yMxg-2bQfUxaeOHQEmepnbBaLj1yhs', '2021-10-03 19:54:19'),
(43, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjU3MzJ9.kKu9Y9BO2NLztKmh9dLRAQCHnuWuE7-uYOEBZF2VK5g', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTczMn0.S341EZ3Pi2RO0TMaMhPD41BIThnXGfEbivEuW1Ec94Y', '2021-10-03 19:55:32'),
(44, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjU4NDN9.thDF2_V9b3mhbl4IRNs0vdhPq8OJc5r3wdRC4o8BUdg', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTg0M30.twmbkhwwXKvzFuijkEfHMUqM9EjNqqrh22hqmtwPul4', '2021-10-03 19:57:23'),
(45, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjU5MDd9.SzxsgZjgt9YFzJbq1L33o2BXUMWxbjf-qyokjVpUvRI', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTkwN30.1A7i5-MNUDk36n20DgYNTfeiEpx9eKQu63xtmcWWPfY', '2021-10-03 19:58:27'),
(46, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjcwMDV9.6BGNKrNLW7Akr2SCFtvoAy4j8DfIo8oOT_lcogsy8Mw', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NzAwNX0.AnGuD1xPRcvHQQEQ1CjtPcFzaY8xG9ZoCOKAYkl0BvA', '2021-10-03 20:16:45'),
(47, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjcwNTl9.p4ooXtsqk6kbSOZpSy2rqEsNYq3nEq68llrKHlQvkKg', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NzA1OX0.6BD038PxZ1A4bvZWVhVKXI67ShUy2YX9i3upeplER6g', '2021-10-03 20:17:39'),
(48, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjcxNTV9.AWey9IM5QnjEKsyrCRY6kJZp8R1m0_q-uZmJgJhRnG0', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NzE1NX0.P1x92tUnUVZntWbWJqe2wkZImIBJ2SBi9oISWqV8BQ4', '2021-10-03 20:19:15'),
(49, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjcyNjh9.WisDRREqA4rSfmjPpCjGb75_WPFN5NPj16WUVnBkSNE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NzI2OH0.E1ACols4znrMNwSc05iSDaIvNMw0NrNylXLJjg0qGcE', '2021-10-03 20:21:08'),
(50, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjc4MDV9.23TIvyciFVBrtNm_g8UAaTTPx6M_WONb5L0BJQ6_VjM', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NzgwNX0.Ebsj4_y8Mdjmk--2-vsRuPxFr9Vq1_A--rtur45YRWs', '2021-10-03 20:30:05'),
(51, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjgwNDF9.VCmyyHgj-w7aPDmGpxBLyjrmRpglq_uJuekB4ON_q44', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2ODA0MX0.KSxorxPK-MdLkQH2GIrwWVe7LLTYj-OxL--CmpJh-s0', '2021-10-03 20:34:01'),
(52, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzAyNjd9.jmV3OQGo_Wi6l-TzVVDdqCbpwzZUi46QfHEeP7AX6bg', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MDI2N30.0WRTS91Iapi5DQyBbjWqSKKLdFpI0SNGRYCNeQ1Kf14', '2021-10-03 21:11:07'),
(53, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzA0OTB9.0kUD_OhpZ54mjiVqas8uCniTiQxMO0V-FrFiZ1yURFI', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MDQ5MH0.sv_pvcC6LObdBmncakXn4waScqfRZaxCTrqZOqtyh3Q', '2021-10-03 21:14:50'),
(54, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzA1MzV9.fFw5H2Yo7QYjXOE4T7yxe91UbQB2qPF5Why4bIW9yJE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MDUzNX0.xy5xCnQoP0yxdn9lKZ52e-H4ix_b8-Z0zKqTcHFmFF8', '2021-10-03 21:15:35'),
(55, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzA2MDZ9.inPyWa1Dtb2ydssjyXurp-dmqvZFjRnPzMvjtnm6Qcw', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MDYwNn0.M70DFtskpjC_QGdgIRbzYLAIJAraXr-VRndcXvz0U3g', '2021-10-03 21:16:46'),
(56, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzA2NDl9.SjT5TIzCrBDVW8I8wNtvygPi0njO9qmC9FrGBsZtsSE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MDY0OX0.hmU4aaiN43MuNXMf-xBCy6uZW8-8rVyBSwx9ag5ugLs', '2021-10-03 21:17:29'),
(57, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzE0NjJ9.vWD8fHw4M706RoWTg3ut86llgm-SawPSiQEB_6ExmmE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MTQ2Mn0.VJFl82OtIoY6vuHh28R7l3G-48EqaH_2L22TZopGsGI', '2021-10-03 21:31:02'),
(58, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzE4MTN9.QRx_5JwzfBxD4FoQ9p5w-ZZl-fSaHPqFumFDXKbuWn4', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MTgxM30.KVyJzsOIzNjNlX4at2Bxx26SxjlOKVXVlfgLPNb-8Fw', '2021-10-03 21:36:53'),
(59, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzE4NDB9.BvSIbEcuyZ6ASH0mlKCTNg_-Sam9FVLWEnCm8BnsdWY', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MTg0MH0.8_nrv3zon1V5umlwhIDBtp1asDHJFG741sRT0fvePE0', '2021-10-03 21:37:20'),
(60, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzE4NzZ9.aFwbGlFnkB5sKWtFcaqDKOm6aeU_poomjycIuNqRS3U', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MTg3Nn0.OrqqQFYxpf_hHFE874o8W0I8EaQowB8gDUpg0e1IE0M', '2021-10-03 21:37:56'),
(61, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzE4OTZ9.xGLCqFBDlOLnl514HXOtWqTt-7mzFDwqb43c225n5MU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MTg5Nn0.gxoYzzDbeRqBxVCd9WYXwG2KQmgLBehFvMV2rZc7KBw', '2021-10-03 21:38:16'),
(62, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzIzMDZ9.bL2T281RSWsZvfEwl7ajI88F9YvvkEB9xVfpNvoErEM', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MjMwNn0.Idlrcnyf5oDTiiaz71sv0xYtUQ757JWYNEbJ8b2AwR0', '2021-10-03 21:45:06'),
(63, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzIzNzl9.WKohkE6Z1oLvyijAXYfPhvUEfKjCF8Le5PA2pQloD_Q', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MjM3OX0.UVqihr4Uxc9oQtrDwTwy6ZY7T2H2_60zUFgTFHioizo', '2021-10-03 21:46:19'),
(64, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNzI1ODV9.cjVpmkUp5v3KrTss4mwGodlrGtu2zgq6uRwkNPss3ug', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNzI1ODV9.Et6ulTNDxMCqOKqR3CgouPa-HmJBthLtRkhVg7uxK7c', '2021-10-03 21:49:45'),
(65, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzM5NDN9.o6BS6p_TvQAf2g-H_iTfoELd-pGApa4bbWni_kg8Irk', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3Mzk0M30.sHot4hZe3uK79dZf-NQtsOx2K3Eq9am8VC6EaXL4xRI', '2021-10-03 22:12:23'),
(66, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMDg2Nzh9.4_rKwt3U3tYuPGBbXlDdRT6a5veUZTVn12sgX1dUzQg', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMwODY3OH0.ZKvRojHc31cqjM-ADVv9zavMuRxTRGd9L1TX8zCaLsg', '2021-10-04 07:51:18'),
(67, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMDg5NDV9.Dpfxw0KJyKwAcHuhuqi1aMT5nZBUw3LkTsYsk6rYCew', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMDg5NDV9.9WAdCmMmpQonku_RsrBK1TuedfyjqmekIEZ9Z9Z6-2o', '2021-10-04 07:55:45'),
(68, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMwODk5Mn0.bUb1_yxH7aaA9VLaLLiqkfck3hQNO30V3u4ms3xMO9M', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMDg5OTJ9.38_ngYU_3LUaH-KM7cfDIXjxEEa0do4XzIFCYoJAkZY', '2021-10-04 07:56:32'),
(69, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxMTA3MX0.EcqIDOBaHPpaBZqr-1IJt3JarkWZntmHFfzf4BH24s0', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTEwNzF9.-a0kHLQEGBmQjCb327brwQsPer8H5L4H6pws5-BaN34', '2021-10-04 08:31:11'),
(70, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxMTIxOX0.f1bfGwm3uynGRD5pOOc9_ye_VJnFRfgcUlXeOd7M5g8', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTEyMTl9.sPLG-b612XuAtXLhXRx417eQy3wTBhBdToD9mrbBY-E', '2021-10-04 08:33:39'),
(71, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxMTMyM30.kw-ZCxajrRUrcU7KxYlLpLtOpJFboZ1KTHTOKs7KbvU', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTEzMjN9.QNTVU1W9Ao_9eSSgQnyCvZNN0BSctB9PkflsWJEMoLs', '2021-10-04 08:35:23'),
(72, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxMTQwNX0.7O1wBK8lMT-bncRX4_34UNxA5prQbDzAOhkSMCLgtKk', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTE0MDV9.TnQt3w0CVaW-GVufzde7Kt6xMxWKcXVyUDXsfLqkKAs', '2021-10-04 08:36:45'),
(73, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxMzY3NX0.X4SQhL1eL_f-fvnIzV3byXkGWvgZPbbPR_hZhNbcXA0', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTM2NzV9.tNvbnZIKhIcAoIiswGAKcahfSl2OQPKNnzCeGk77guU', '2021-10-04 09:14:35'),
(74, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMTM3Nzd9.8oYpI7MUDyINZhzrUaaSQXhABRH8Kut4KcvS8TBhLLI', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMxMzc3N30.9ovelPm7CCiUqtlEe641fv3gSmZdpnDF9n2jynRbkKI', '2021-10-04 09:16:17'),
(75, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMTQ5MzR9.2JYS1-0FMORN6BpMwVa5P_zC4Y5kKfeAsDtr0JqHTBU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMxNDkzNH0.EqVxSamiLOo28v1dI_cP8zsT_4snmCmyqxGD6C9jHtY', '2021-10-04 09:35:34'),
(76, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNDk1Nn0.hYYRJluMf-6g3uwUKycpL-1zxTv-KLfzXlzrOTXNBCA', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTQ5NTZ9.qU6dNPq8vUfMdndOQ-zxxGnNpe4iFeF0LoLH2rhgkD0', '2021-10-04 09:35:56'),
(77, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNTQzOX0.nsWVFYEoXWVEkX75TUG3Cl7zd9jDrH619Jgojbfbzro', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTU0Mzl9.V1v69MTyE8_q7vn8jHCv6qTkkfIFVlipONLjOpOI3i8', '2021-10-04 09:43:59'),
(78, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNTYyMn0.zNAzx5CJ_Ydt50-XDVZ8cGYCm2PS0aZTz76lHbahDC4', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTU2MjJ9.ksL5eIBo6jMwOPBDjYq_TdWYmwGMFp2waqjaMQm8Ejo', '2021-10-04 09:47:02'),
(79, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNTgzM30.gS0K0SD_DmyQbPzCfLqSMg06cbsljeCQo1K8Wd-EU_A', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTU4MzN9.ipdiWH7I94pn8RR-VfPmO0vi0PMQijcMEkuqA4BtIUY', '2021-10-04 09:50:33'),
(80, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNTk0MX0.TLcX__WpupRWss9OWC-b30qQUXQxDGA1Rt1H7s_GzRg', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTU5NDF9.ceRIjmeS4IbQXRh2UBDwW2wL3TcnuZAVhlRl0IBE09g', '2021-10-04 09:52:21'),
(81, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNjAyMn0.0dTjsuxfZ_ET3lvXy2IyoEao1nl6gMLLYUG9oaGMAFU', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTYwMjJ9.Ku_daeK7eNTEN0jpInNKzOIQW01IM-15k_jQVtrMIJM', '2021-10-04 09:53:42'),
(82, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMTYxMTV9.lc7bz_luxp2RxL-at9OtV6crbRgVZQVWnZ2o_qjtLFk', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMxNjExNX0.cTuyZ5OVsz7ncNWMzCeyVBpghxFNaed0WRoY-S38_K8', '2021-10-04 09:55:15');
INSERT INTO `dala_token` (`dala_token_ID`, `dala_token_key`, `dala_token_type`, `dala_token_value`, `dala_token_date_created`) VALUES
(83, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNjE0OX0.ttMYIhi2Lx2XQucuZkaOxjw2wbX1xFf87BrcaWeCB_U', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTYxNDl9.tz7pSDGw-141nJXdz3zRh__mFpo3ZMxdAeUjfQr3aws', '2021-10-04 09:55:49'),
(84, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxODUwMH0.KXO9eE7NQpxZetvB_Lr_M-XKbL6ELWQS56lhEcm_564', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTg1MDB9.SPPF6L8yZCuD9BUAsnTR98IFflmQX_23RngqJjO7B7Q', '2021-10-04 10:35:00'),
(85, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxODYwNn0.qoxUTRWJWkkI6Q7GZup_9TcFhawkfYWIEiOn2bqhVhM', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTg2MDZ9.ubJ-KmRvwHx25haGHBa7lbq9AqkGZXOgTYLSuEs3Few', '2021-10-04 10:36:46'),
(86, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxODk2Mn0.wvK5BBVKAuONxLlFg0ljLqDkNzgGWz1fmMBntS2mJIM', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTg5NjJ9.jEUMYHrIjJwU6ByjBH7_d_dc4B-a1nf-F0aGeo6Ru58', '2021-10-04 10:42:42'),
(87, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxOTEwOX0.d0qxooy8KC9nuTuZzl9ry8HntDQGwJPxtEo_ON1A5ZU', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTkxMDl9.tYazb9_DatfdQuZHwUkIhtca3BSOgBN5cby5GOl3Tuw', '2021-10-04 10:45:09'),
(88, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxOTEyOH0.E9P00qebSfliUJkv4tmwQwGUNhnnFV92QZlpgi5JwMA', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTkxMjh9.Y4NEAFd3MYpdzKA8ccSrYy1S1Aop_-jTwszFBXMIlZo', '2021-10-04 10:45:28'),
(89, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxOTI4MH0.Ozm8-X5CIfRoPuokXcwpjAFxtXbl96zudnMBe3N-89g', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTkyODB9.6uflcX3yDUJZBebebfozMzFM6D9EDQ_YwL4PGiWHfPI', '2021-10-04 10:48:00'),
(90, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxOTU0OH0.hebvBramvZvEpvtGBgw3Jei_CZ5TpCJUSpAHJUALU2k', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTk1NDh9.0pr0M1cdwf2hsx_W9dNYrw_mz_Tj2o4e2KeM_scsN7I', '2021-10-04 10:52:28'),
(91, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxOTYxNH0.-4JewHjKh8HZ7q8_vSbLfMPFQZQ5P9FGF3DUgpoPpHA', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTk2MTR9._SIxau_4wdV6pY7MidX32TtMmQxNOnY6ceG9Qgz1Db0', '2021-10-04 10:53:34'),
(92, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMyMDA0M30.-vXD0Jre0FSrGtkOM2C8OsYNMi6ohF6hzRzc7hMzmE8', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMjAwNDN9.j0k_4miIJPK3x2GHNk0o_1kbPn83pPPLhKphFmm8v4E', '2021-10-04 11:00:43'),
(93, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMjA1NDN9.BgloXNza1-DtgfwFMr0Vuk6uSN3MhCvv6OOz7Ob5vDU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMyMDU0M30.koTxeEf5PRAmuvxGfwM1V6piFPjC4wPK2bLDKfko8wo', '2021-10-04 11:09:03'),
(94, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMjA5Mzh9.2Niz7lROS1mxZq8xI1hlpO3ikTsrXSdM0K2fztHRFYw', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMyMDkzOH0.mVLYFy_C-zPtMgCMZpnHRucc7mLFPiFtNPiEwctToLQ', '2021-10-04 11:15:38'),
(95, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMjUxMzB9.AbyTe-KdkJGaUeHURk_uuvHs1gI3rMy-EHprURcCM0g', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMyNTEzMH0.9Oaf0hKO9qCzDkxQhR0k7D2WAUVN50T5lRNaZ94oYZI', '2021-10-04 12:25:30'),
(96, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMjUxMzN9.5NPr6TdCnqi-LA05zyAoicJrd2Ia4UaTM70IMrlMhRI', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMyNTEzM30.goJZs4G0nnAnqOwgtR8SLFd-9hWGXut30Eyu3KKPTAY', '2021-10-04 12:25:33'),
(97, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzEyMzd9.B10rgsjsMuG72rAxMKt8zRnxb7owlc0gYokS_5KD02M', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzMTIzN30.WoxuM5Xc6wC_BknblT7MOnD4cPR-F9GMueVG8JJT9ws', '2021-10-04 14:07:17'),
(98, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMzMzIwMn0.9F518tlOv1MaBGgTPmLDCK1E_eim4DEbojOcra6pVJk', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMzMyMDJ9.U0IdRHyrxzWBPOCKihbTpgX_GdnZ5IdZcfItHHa2ZUs', '2021-10-04 14:40:02'),
(99, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzMzOTN9.vVTikUR70rSFRVZcMs5t67LsBME0qrTTaMVwvrPw_8g', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzMzM5M30.idnnHHVRk2YXKSg-rOrOCtZDh32G7s6xAsil5teNTVM', '2021-10-04 14:43:13'),
(100, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzU1Njd9.pD9yF6iKZ0LdOTmUIM2czXutAUlEn_FUMIbdPpGz3cM', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNTU2N30.2RrtQs8UXJ13dcG43b977F-A2SQR4VFzbBLIyhf3jb8', '2021-10-04 15:19:27'),
(101, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzU3Mjh9.iQkdNwsR04reCu1I-VVY2P_4MFeQiqH2jhZJIi6lBI0', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNTcyOH0.t2tH2fy_oNBJVtBzS7u4XjHQemvZhAhkYpIEXM8FJdw', '2021-10-04 15:22:08'),
(102, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzU4MzF9.VhswOfvGMDsYpW4nklTxn6DqB6NwpRz5euVDDELA9T0', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNTgzMX0.QjqUk_M8MYWW-hXQV5brjXcan_Jf9XRuThfj1ouQhNo', '2021-10-04 15:23:51'),
(103, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzU4OTR9.2zTtqC6F-wlM7IhmyfXy8PCvZ9st8hOYgc6SCpLu3Fs', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNTg5NH0.suEkuHm9pYS5l7mVmhUOzI8NjgYCldDY8jZbd76uhYY', '2021-10-04 15:24:54'),
(104, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzYxMjV9.XvZmlwmpxuLnJVtuyEb8VvNdUy23i1ZO_J5wezbMPN0', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNjEyNX0.MzDqX4UI249LNwG2c6LDA4v2iAtrm3AJ6lRfTjCPtXo', '2021-10-04 15:28:45'),
(105, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzY2NTV9.McexI3tmTOPGkyKI5fAF-e-6rj3WYZf0MDjis43L5HQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNjY1NX0.N0ZNC0eX3gja1UsOVyPWl6ddcx1ATYgV7HIFJLMgBA4', '2021-10-04 15:37:35'),
(106, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzY3MTh9.SEDqVzKPnlALDLaYojs19kCDaYQA-MXaxddSP6JCzIo', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNjcxOH0.RvGUla229Ni_9YfF9wDBTCn477OBnAgw3j8UcdGS0Tk', '2021-10-04 15:38:38'),
(107, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzY3ODR9.XqqX237-Tf2vxmgpYAlawRHAc3zIxvzW_Z4IRb7-nso', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNjc4NH0.GAdNA8h0KgMiRnFZhO9ZhrQ5YIpikb_Jm6hXNUIU274', '2021-10-04 15:39:44'),
(108, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzY4NjJ9.eXcMBGY9CxHehkY42LcEvRl-4SeytMEzsCgZoJjIdwQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNjg2Mn0.wpj5HLSjLI9J5ccEZqgBxfNwuUxpuTv1o-4_YKmPR3E', '2021-10-04 15:41:02'),
(109, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzc1NzR9.AK6dyqpJguV_KLamRo9n92dsbxpd2Bthkav5-jPgJeQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNzU3NH0.W4ZIVund-ymGiqhrDQ_AGHMqJ9rIIbdMHa4CwPEO4g0', '2021-10-04 15:52:54'),
(110, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzc3NjF9.krJCmArXmGjrVx1futfOqdj3TrmCzTJENV8Gu6x3T4Q', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNzc2MX0._O7hvERFeTRLEnc0zHXgk7IodAWSBHpbA_p06TJJbQA', '2021-10-04 15:56:01'),
(111, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzg0OTN9.ezyETEJarFoVG0dScZLjX3uKq8VjzaB9cGPhODaOhfc', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzODQ5M30.iXqdR9MAMJfszSgTNb1fVr5ytFLTAnoVY41Y11bpTZU', '2021-10-04 16:08:13'),
(112, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzg2OTl9.fb0ARw4Q3mqbxrZrkHErwxjhuUXY0W6wxfrG0PLSNPo', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzODY5OX0.aH-teYQrXb3oe6YIdV-yJgWL82h1cvkWW0q8ICsSMt4', '2021-10-04 16:11:39'),
(113, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzkzMTd9.djbu4MZlkVb4RKgwPcRy1NuSvxWKTNusciRfK7-wCQI', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzOTMxN30.88wk4l4Rn8uXcFO0n1u84MHPmMz7yTuPZqmTpgpG1Kw', '2021-10-04 16:21:57'),
(114, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzk4NDB9.oMv92frc0rANSexp8G-XXash2T4yRYsWDG4WifzE8Ro', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzOTg0MH0.zh9wFtbs4K8IYSpKxyJRQQT4t-FRT8cEMBjibccm6q0', '2021-10-04 16:30:40'),
(115, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDA4ODh9.g8t8oasG5AkGjx5ClHj76ans3H4koZhhFWG-1KhYNQw', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MDg4OH0.0aAZV7vGkS89e8dsMlClovjMIUhsncsJ3KFIpizkk58', '2021-10-04 16:48:08'),
(116, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDEyOTd9.nNAIfEoFIfRM4nko1IESp9rbex8ND3Zr_5SBfIK1oVg', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MTI5N30.Rq8j0Cg3cYZc0lka8lVsBBLhY4CUBayHzp6MjWU-VwE', '2021-10-04 16:54:57'),
(117, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDEzNTZ9.BsL1CardjPthcbvGXzsN2uXiQqco-QEvnPKJkJmosyo', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MTM1Nn0.SRCWlEFrAEkSqVDvLolpFVojEvFsnRNeLM_utyEtC2E', '2021-10-04 16:55:56'),
(118, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDE0MTd9.UUoyV3KL7-PRuHlbBC_Ou7cK-VZ2ZsgLQ1JJoo5vHE4', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MTQxN30.qVlTWv-7p1glOoVPGbnZk5bt-WzYMXMltJ8r2_6wtko', '2021-10-04 16:56:57'),
(119, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDE0NzN9.0W53z9Ms9d_MD-RHSwEfInXdCo3ceAmpmPXYVvvOSnU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MTQ3M30.1eINlgS4atYmeGyYoScjiid1bOTyafb3r9uCtcmR0qI', '2021-10-04 16:57:53'),
(120, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDE2NDZ9.c5E2MmNkSTq9rvGEJMJ-3I0OMV5vePpmHLvY3P-JVEM', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MTY0Nn0.Jm8h8A_qip125PWrqO_RPiAQwC2W18Gnpyaqp18y1uQ', '2021-10-04 17:00:46'),
(121, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDE5Mjd9.gM-HOKO17IDq-VTfy_-ZYbcyLenuQ9J7KQm3y3dYuqY', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MTkyN30.pF6y-LcvAeBZb2WQs5E7Xl2-10kxxofP_GtBCHf0pHI', '2021-10-04 17:05:27'),
(122, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDIyMDN9.ex79qNL0edtzfO1GrBsfvXmU6eMeQfNoBpSbxW1A8ds', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjIwM30.vu23_1KE1UpXa4fadsAGwdOomFQoPwPJcR5zaXV6zn4', '2021-10-04 17:10:03'),
(123, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDIyNzZ9.KIGIvGHJNt78ba_ZpppWs5vJvRQySDqaRq1Kp-PTF2c', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjI3Nn0.kixVRtWOu0NrkT661hNQz-O3RA5SXFrBAF0wHGAyiBE', '2021-10-04 17:11:16'),
(124, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDIzMTN9.ZPkpBfJz33je6Uo0_Mkj0httFnu86UHuHGwsRTeimE4', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjMxM30.ol3Ib6vlHP5oiuAhj3CLHVpGj5fApeHGYa2zfE_FXpA', '2021-10-04 17:11:53'),
(125, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDIzNjB9.ItteLaf-grKUqXICxh_6GLbmqMb534OzEyI5-BX-MpQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjM2MH0.h2jq5Huee3DZNNqaHlwqXSa91Zos1cq147T-zi2lU6A', '2021-10-04 17:12:40'),
(126, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDIzOTV9.KT7ZoMbQVDA_amXE7FOYWUdwNmgPyoWQTaft-r3IeM4', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjM5NX0._K0HSa6EhBaroxVEG7mbTNAm8MSV6aFs3Ws9M_rc1gQ', '2021-10-04 17:13:15'),
(127, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI0MTl9.6GMHRXOuZ6WIAybSrosxhaZGEWKcUS8QeKCIi2S4ZS8', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjQxOX0.n5swR5wiREcH8jX4W6DY03eA4vRNCBOtOjtGEzMEacE', '2021-10-04 17:13:39'),
(128, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI0Mzh9.kCOFt26bU0uqZ7t4cBMRR3LPt92N2V0VTdSEYBQ5UxQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjQzOH0.HwpqFHphDO9BHdnAHAEfRxi4lXsM2CUQBZlFgkOx46Q', '2021-10-04 17:13:58'),
(129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI0NjZ9.21hixG4DNnmskr6jTvZOq6a7UogMO6DnCu4gJ7fo3IU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjQ2Nn0.jND6dkd4EMxxJO0WKtWI_cNjtU9rc3u2PcjRtFYI53M', '2021-10-04 17:14:26'),
(130, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI1Nzd9.cc9iEGLMMymTahrbpK0CjOBBIKHL0-vlrrpbrJOvZHk', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjU3N30.AlM75uXPYZFTAGCSPm9QeOGJ2jtMuWi8i3dsrFaf0Oc', '2021-10-04 17:16:17'),
(131, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI3NjV9.AlpQn7UAWZXqOmjr_mki3JQEGl26pK5XDPyULc7pxVE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0Mjc2NX0.zod5xOd9Sd4tiwb1c7EKfu3JY74434Nb8RNpiTUeBXQ', '2021-10-04 17:19:25'),
(132, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI4NzF9.tytLFGOtfGkXQmL1jCf_s_ZVDdeqQ_Ph2lX6gzJHPKE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0Mjg3MX0.DfqBrC-DwAkhwp2tedrjFUAN38c2jKGPiaDmb-xiHRY', '2021-10-04 17:21:11'),
(133, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI4OTF9.TfxWQMSK7EdHcN9fjDzlX-fLD7hmoA8EnVSxTxOz5tA', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0Mjg5MX0.yV4TIOp0sS80lijPN0NU1_ZYyfBGginh2klXRL7tTuw', '2021-10-04 17:21:31'),
(134, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDUwNjB9.RfCoI9f4WNJOAvDbpcydTFA0OF2m_-U2uouViZEGwiI', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0NTA2MH0.ZUcsK9H2YbLYReUUl2QLrZrgCFMiot5dStyUoMowDJA', '2021-10-04 17:57:40'),
(135, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNTI0MjB9.anaK-PW7dOTTrC5KYEFL4s8bWfN-RkL_D75B3JIno0E', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM1MjQyMH0.4SiZGaLk5D8Fu6xSWpa6mt4u7FSpWcc_gFw7uZv2Wzg', '2021-10-04 20:00:20'),
(136, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MDc5NDF9.HqJTbSW2zgo3tw1m5c9Giiq9xAYsmvMsikQOS3qzHqQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQwNzk0MX0.Y7uArzBvgd2G9WMH8KvQKVFnCQJMcKu4MSRjTWhrN5E', '2021-10-05 11:25:41'),
(137, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzQwODA0OX0.9MQK5mI_wBwjWyFoBPGehGQ1UnyEO3e4xLP9I_dpvok', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzM0MDgwNDl9.T4lqfOrfZfnQtOoW0I7c7so-RgtOhDpA_PPcTaatlEY', '2021-10-05 11:27:29'),
(138, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MDkwODl9.uL1y_A9ok8WP7XZjgI4M2fToCI_1b--uKELPit6P4a0', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQwOTA4OX0.LmR_fOHkpjQJTXX7HHUF07MBMcM7uqxz4eCcA1EZyR4', '2021-10-05 11:44:49'),
(139, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjM4MDR9.uGS5wLnYHmL_p9nEmvLhwtEsy1mUI8t-J-Uq5RF2Ik0', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyMzgwNH0.44D5WIzy1qvn-Ia6OxZDyfO2sJ2_OdZDDnI9NWLp0Hw', '2021-10-05 15:50:04'),
(140, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjUyMDN9.Yrkz4FjFYDApc8Fu-7bXIaoqEE3WkIi8FRU-Ba59sxk', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNTIwM30.-gI56WbqjKNxXwYaH_Rwk7JLnHGDpF0TS3C1wXY5ONA', '2021-10-05 16:13:23'),
(141, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjUzOTh9.ntJEeymOS8SSWnw0bFO6xNA8KTpGQ9S8ilZ876dyEi4', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNTM5OH0.LZjmXk3yinWWaSvBQzUTxU8c-IepIwc-isppm5obgSw', '2021-10-05 16:16:38'),
(142, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjU2Njl9.yD1UAQEfA7jsN7F1HvvG2V5Ntw2Qi3KKxVq_HrEokgg', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNTY2OX0.2P5a6VFBO6puQdWkDLoW5mTunKz9C6Q2__RlbpY-Qg4', '2021-10-05 16:21:09'),
(143, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjU3Njl9.ASDNzDR07rzTFfkjfykea5emNvDe-oLXLrjosYRcun0', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNTc2OX0.Fy0XdKPuBldicVCeJuhg5-wg3LqXvwf90jiB5ruv7P4', '2021-10-05 16:22:49'),
(144, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjY2MjR9.sZNdIX5nqXUuRKIK1tNoUJCInT3DlZSR1U90SBZ1dTM', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNjYyNH0.jcxn-3QH6t6_2yUaYg29V2W4mFB9wIGsmvWkEum09EM', '2021-10-05 16:37:04'),
(145, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjY4NjZ9.52EF3Y_xwBRSwWgTAoGAXQe0jturvK0b0d5xSja-6Eo', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNjg2Nn0.Tg43QvubLNuJT-s4H-e5spDVwKdpuZWky3bRWwsSukY', '2021-10-05 16:41:06'),
(146, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0Mjc3Mjl9.RpEAvbTSqwLp_AlgPd5yqUCTBclDnwSIXLatOz0MRBs', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNzcyOX0.nhvsQASh3oh-6chz48detTGXqASQoSWoafMlf2UHXTc', '2021-10-05 16:55:29'),
(147, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjkwNDN9.DgK9yeIyH48kDnf4_Xu_bDphv4Gh4SGEp3mfhVaGp9M', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyOTA0M30.Tefc9RCh8RqjuMN7zxxfEIp3bNvsXo6Lvgz1DkS_8fk', '2021-10-05 17:17:23'),
(148, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQyOTA3Nn0.E-ZP8fqFWc4JCnt6qxl0Dmp7RmmNknm1ewNpqAohwq8', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDI5MDc2fQ.1DNNYGI7NcFBkOTrV4IWXcsy3tUg0TLnJr24VnQniJo', '2021-10-05 17:17:56'),
(149, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQyOTMwNX0.i5V6C8ABRyvgmK-iy18YN4sQH1cbw3khGXUKunRVzPU', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDI5MzA1fQ.dK0poErJD1bHGNS7su1QZi4JasSV_ZRjD4lP3d8mSZo', '2021-10-05 17:21:45'),
(150, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQyOTM0M30.bMDyVf5kuPO2yr2YmnKdKCoD63IYlDL5TsgST0-OiFc', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDI5MzQzfQ.7Aek4KajW66XU6V80FPcR2xId1ehOZ3UKXBqAVLnIow', '2021-10-05 17:22:23'),
(151, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzMTgzOX0.hxzccqm8V-_UXDhGMUPZ8AuiVsZULpWNQzVOP-QWZUQ', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDMxODM5fQ.Nae0YUh7Y-UXVpvkkD2UU8v8oEdDjab71zumr5WI23k', '2021-10-05 18:03:59'),
(152, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjIwMn0.m1nCqe7ggie9krQQLVkKpxj7bS1Iqil9hOPjv_XklE4', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2MjAyfQ.zwg_umG_5IUdSmtxrB6eCuQWE1brHRiKSz7vNQ0HWXM', '2021-10-05 19:16:42'),
(153, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjM5Mn0.f_L4wr8oxoJ6TmkIb7ynjFhLgi1rIulnKIldxpRiumk', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2MzkyfQ.46FSD5WavoNG1To619ScFUynXOc9dGQoSOiaC92LVe0', '2021-10-05 19:19:52'),
(154, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjU5N30.WgWROtoTGQPDd4XzWC_VryrQzRazAxI4tQJzwz1IjNs', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2NTk3fQ.xcmNmouFS-0vbe37dgb_1l-AyeiSIjK0omgJwLGcAGM', '2021-10-05 19:23:17'),
(155, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjYyN30.fKhbg2EI9GMyvZ4HRWoyY0h6VAHnucojYx_hfyUKEok', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2NjI3fQ.ubm8a7tmV5SONvA8iwAV1YbdQnxePT4-Pdd7ySr6Wsc', '2021-10-05 19:23:47'),
(156, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjY5N30.mNRMNOvQlfzA1zgd_VGBzJfLqwN_-9BOuNMFACv5GN8', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2Njk3fQ.35sQ_X1I1QCxqs9BymZeWIgErnfM89m6_0VGGQgeKCM', '2021-10-05 19:24:57'),
(157, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjc0Mn0.EyI9MjOzDC4hFCBUlneWthXBE3qAYtCGZcd1e6kuOqM', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2NzQyfQ.TGgZEbHr83BYBsutOqipONuUilBn-GbYCD-dYgX3wV8', '2021-10-05 19:25:42'),
(158, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjgwMH0.eSmXb8bZ5WSdDo3gKmbuCdPaqz-2rK807fT3uvmCtIU', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2ODAwfQ.-op0gDg-Jok6yxK-U-71vDMxfW4K3-N2bzSYt0jk3vw', '2021-10-05 19:26:40'),
(159, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjgyN30.uQQ0XXBmDYt1_M5a_I789C7ypLfsgEHdQuCcjxLQGU0', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2ODI3fQ.xYJann5UvPd_hny6NrrQxE6fbfMOa4Z9ovhj2GOdNHI', '2021-10-05 19:27:07'),
(160, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNzE1OH0.0Y_q2J56aBziRcxNX339UmPcuT-hTbJwVk2Re2OxTxE', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM3MTU4fQ.xA13cyoK0LBhxrmjCfgld6FGGCbLeVLlsL1sw-F69LU', '2021-10-05 19:32:38'),
(161, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNzIwNH0.iU_8nOt9WiRW0OCgPqftDkLWmMKs64RYAsQ-U-Zw-F0', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM3MjA0fQ.q-6vlHxNCRenbljUwa6j9nTuDNHO4O3srSMqN3BmZds', '2021-10-05 19:33:24'),
(162, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNzIzMH0.vDjkEdP8PJuQ2SuERScU3d2KFOxb-d3SCS_VM4YdUtY', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM3MjMwfQ.CPrXTsrlZFxCV0asv7Zz8y6gh1qzour8rhkeTiOGpcs', '2021-10-05 19:33:50'),
(163, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNzI3N30.6RKb4sOwHS7TDD_MWkb76fMh30TqPlU0jECkbymcghQ', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM3Mjc3fQ.Itv-AmaX3NP4N6VhTZRCa6xEXDTxcwvDF6FPvVEJr1Y', '2021-10-05 19:34:37'),
(164, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNzMxN30.mZ4oG29lMigmOuTS6RIhjTO4MWb5h43XSynU-1lqZU4', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM3MzE3fQ.hEyjq2dI8H8h8IhTJL-L8FffSJ7Wi7h1cxicpCgoLgU', '2021-10-05 19:35:17'),
(165, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzOTEzMH0.tCxjmlnp7GpvK2uYQGftCmuvNjeKTM_chYnd7fz-yUQ', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM5MTMwfQ.HfObmt8oIgfrb1QcAYrpd44GxRI_Z-i4_XvLBNBn2_8', '2021-10-05 20:05:30');
INSERT INTO `dala_token` (`dala_token_ID`, `dala_token_key`, `dala_token_type`, `dala_token_value`, `dala_token_date_created`) VALUES
(166, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MzkxNDR9.K2loOGR-VZQbKLmX0dLXFo0ZfPzOmK4NolIhfOW4t2s', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQzOTE0NH0.--Yrvyik8uv1cS0JmoUP0j0I1zIs8m_FEDMxw6Ap82g', '2021-10-05 20:05:44'),
(167, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzOTc4Nn0.6KtsOzNF_u-BcX0Id2rVSwMGwHs4BGehOHFavgp1Cqg', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM5Nzg2fQ.w1V9sJyMXD4LEQWjhXix-9CTJtAQFuooGnGHVfBm-aE', '2021-10-05 20:16:26'),
(168, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzOTgyMH0.Ucs5ZLb__D2ucuQJMhoiTYsRPJicj6ATupJZXQjRAe0', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM5ODIwfQ.RW0KrPTpoXVqg9tfV_gtpYIpAuL_iCOkPqqz_BVtHes', '2021-10-05 20:17:00'),
(169, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0NDAxMjR9.1eblmR-Wl4zgTk16ATGvPcXG8OAsM72GjqodoMd6GzQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQ0MDEyNH0.Mt9Y7ukDW1PIPdGVL2OK7g88xBTLvRC-lvnSvXlaJ7Q', '2021-10-05 20:22:04'),
(170, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0MDM1MH0.ho12a2qvjPZq107vxKRH5VXUAl6bquuuleTb_sMPigU', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQwMzUwfQ.d7JZa4ribpuU126U6E_gc4AFziUgZersJMFhkadV7n8', '2021-10-05 20:25:50'),
(171, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0MTA5N30.mz-vezRcX52tAiVRQWl8miBke1LVv0eVC3JkXKQ0Wl0', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQxMDk3fQ.s3wwqIN-yw3I7xo-NKl9Rau01t-qfMKb0MrnyxKKD68', '2021-10-05 20:38:17'),
(172, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0MTIxOH0.FeyRif5DvqnGdlNa4QixTqICBb9asoFmBlVpNAUhwYQ', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQxMjE4fQ.AW9lCKsiHioxVL333nNlMy1Z6dRYehfZQX-3b22IcgI', '2021-10-05 20:40:18'),
(173, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0MTI2M30.Fj6kJEgvTMVvhb7HRJpYzSqDYiPOy-ebNizEP30Hzpo', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQxMjYzfQ.bFGlzM1CJ0XUh60kWU2v8v5kUN_Wjf2Ci0m1pcxd-aI', '2021-10-05 20:41:03'),
(174, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0NDIxNn0.caD8CeQKxg6qh_AcCkksDHngDmPEM6eYTfdJSxFS68A', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQ0MjE2fQ.NAadPFoUvmB6E7Umk70jp03JrC8qmqK4edgKZtEtbR0', '2021-10-05 21:30:16'),
(175, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0NDYwOH0.Hf7U4SG5W9348SqbpQXSFXXNI7lTS9pTTuWr1B_O9xQ', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQ0NjA4fQ.8OsNKrurYSQ-oWHVBQSTv_jxnf9m0DcK-BXEyDaROTo', '2021-10-05 21:36:48'),
(176, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0NDcwOX0.YfFeP57MCkLScO0JWu3BGJGcE48pef-daoLMtsXXqkA', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQ0NzA5fQ.py3T5qYXtVM_dYmgR5soU1udGokVC8Q1-fV9qPTWBXY', '2021-10-05 21:38:29'),
(177, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0NTMxNH0.oqikMHlm21VsV1JdEuT-X90pghktyD28Ug0HxOSggk4', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQ1MzE0fQ.hZi--K01Vs9A9GYGBMNw2BRIEHnRVDJj1CyR7N2rEVQ', '2021-10-05 21:48:34'),
(178, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0NTQ4MH0.ZQ0IO-r3ns1hJOcCojL0IciuUzylLqqLwbKi6F6_csw', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQ1NDgwfQ.2LWIgcNr-3JJ07WUI59OMFykvGx01FN8_y_TSfp0T3M', '2021-10-05 21:51:20'),
(179, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ3OTY1MH0.OTkXo2IQyG-zZNnrSKvkQT8oC-yX5ghzifwedwqy_fo', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDc5NjUwfQ.FTqbDshBQxBswo0XesZskwR3BkTm2PkqMwfqD4sp8uw', '2021-10-06 07:20:50'),
(180, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ3OTY2OH0.4h0CLmT-a3ki9EeI7TEYmu5lq2J31Ef9FdKK2TJPlqc', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDc5NjY4fQ.yfUTpSOZ6zCrbVLdf_FvJ5x_ucFMAYj9kM6pMkKiRxs', '2021-10-06 07:21:08'),
(181, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MDMwNn0.EVs6Yko3jRY5f-mcRyXDO5cvjcJIWobGX67UrPblBIc', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgwMzA2fQ.4hKFOY9PffTD2Wiww_XCEhMXUl28pPdedGKkiyI7d38', '2021-10-06 07:31:46'),
(182, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MDMzM30.ufyFkqYgDIuBPtAT4VzYzNdb7F6znN39f7yvWHqB4QI', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgwMzMzfQ.UHZL3phu8Iu5Gl3eQHTLLHU7sXGYiCfzNsfSSAA9eLU', '2021-10-06 07:32:13'),
(183, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MDM3Nn0.bU_1FvpYnY2pu8aofqQoGDHKZDZ9ZfyF3MwnPemj7R8', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgwMzc2fQ.YiPZqz03RyHijbJwcMUY3vjr-csWuNPuIDyoOv7Jgcc', '2021-10-06 07:32:56'),
(184, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjAzN30.RaB_QPPICQ7uQ_W1IgmXd1quo14QIVrhPGzfAPATRYY', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMDM3fQ.l6rNdBz1dWSq4bNTgSgfcsatrcibb1CcUIVm0U-GkQo', '2021-10-06 08:00:37'),
(185, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjA2NH0.5s8KSeltrbV0DXmWJyhZydDCe-Tj0azK9-aSVr5R06E', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMDY0fQ.ju-0P3xjUBrG3VzUZMTuIrgO5Up5EVLVbC_V5t78nGc', '2021-10-06 08:01:04'),
(186, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjA5OX0._bYCHjIyI_b7z42zjO59D9EakgO6i_8kr3MKskvX1NE', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMDk5fQ.l9TQdQ91ttCVSNUpMQKmax8a3NNfG_G70xNdmkeMOHU', '2021-10-06 08:01:39'),
(187, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjExNn0.GgMsO02rDZxl4NMUIjga3r7svweBX6Fg8X7v3uhfP7c', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMTE2fQ.2-H4qZ1SplcqRFzpJGUn1i-xkSeH94GJmbMPUG2kZV8', '2021-10-06 08:01:56'),
(188, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjEzMX0.WhtygsbMeNmjRDl0Wrj4cfxqQF3fr6qytLc5mwS-t14', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMTMxfQ.xL88Kfvh2t8hIoT1joA4wRbKwi6JhKtETIEmBGBHdoU', '2021-10-06 08:02:11'),
(189, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjE1MH0.NP5INiMo_4kmEgdtTJbmj2BbAbK0uNG2ESnekxhDIRo', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMTUwfQ.m8qlWJfssqGPeQaRD-nuBGU2sJFxRh0tY2MF97VHS8M', '2021-10-06 08:02:30'),
(190, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjE2N30.Uavoi6457F1YqbdkzFhxMXCUudIMjRRx7KO76DaoSjc', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMTY3fQ._zmMwgC0phx1tupo8TWRGKIHIdRcRFG4w9gfnMFGMWQ', '2021-10-06 08:02:47'),
(191, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjE4N30.kUbON_IvP_Gih0-ElW5N7Q213e_hDlBI7kWoMVD2t-o', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMTg3fQ.69z-xDXqQA7eKdO6oDSvhOklpItnzC2cRaMfO8NWg5E', '2021-10-06 08:03:07'),
(192, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4Mzc3MX0.NVHVzCqnytCox3e_2pD3EL-4Y3tRghTOIzEXyGFEcHU', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgzNzcxfQ.xkigcZpkosDJ7YnvNaLOOTBr0AXH1XK1hBn2wJLnyqA', '2021-10-06 08:29:31'),
(193, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NDA3OH0.6iKNGrZGY8wDh7aGY7dfElVLaWph0YirY_VE3NNdOkU', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg0MDc4fQ.rit1wuRvKenBpuMoTg4p0g6LCeHPzWOIcrZSCgYpVCM', '2021-10-06 08:34:38'),
(194, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NTM0OH0.9nxrnr8b6XA5qS8GA4C6zvgK1mhJVKvNREXJjU7tsKU', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg1MzQ4fQ.z9jv0OBW_ZWFo5TqmxQVP-XGpl-BOX_9AJmYLzlLp_0', '2021-10-06 08:55:48'),
(195, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NTYxNn0.fVax-V-ub8RbNv2aVN4KjEFf7nezQUkECYrav02ttn0', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg1NjE2fQ.bD-Oz_PJ8JjQ5Y-Ob9J43IPa6FzOLXlmIsxtnPSFvrY', '2021-10-06 09:00:16'),
(196, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NTY2M30.qTsAtFazUUVI0bqdn3xLKTeDLGTL-35cyRKiVFM6nnM', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg1NjYzfQ.G2buJ4HTLRMyRwcIEQxZExMnVq2363eRhAtILqYmp_c', '2021-10-06 09:01:03'),
(197, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NTc1OH0.2HEEI_yaU7tEzZEi5OmrZ9MmcZ-09nzJewDF7NQz-ko', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg1NzU4fQ.2mub7HKDwJyVxxY1ct2bjTTgftpxlp0Cd1wXlZvogmY', '2021-10-06 09:02:38'),
(198, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NTc3OX0.RJNjjKIL3xdnS3yBeckS_2mLVN5yFxNEl5Xmkr77AK4', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg1Nzc5fQ.IxGiIxCFtk-wBmgD3IIj1-0N9qzS5ziNKL7r5Qvy5RU', '2021-10-06 09:02:59'),
(199, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NjEyMn0.uxQqk2Sa2mSA9xOd5DRWcWQXtapjJYMSvmUNB0JsJdE', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg2MTIyfQ.qQhGJUFWb0SVD-NnjP8gbvaQJe9lz6AXAE9kfTG7lJA', '2021-10-06 09:08:42'),
(200, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NjIyOH0.LXrTGHEBYhK1ANm_zySW3eKNV_FNHrkw-TqVvVeSfvc', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg2MjI4fQ.v221-o2WUJGtRWFi3aZZXmvZEDZTunwgkowq_Y33zYk', '2021-10-06 09:10:28'),
(201, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NjI2Mn0.GzKKyP7CVYFvSImkYeq2sjGERDioacVaJoY8Lpc0Ess', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg2MjYyfQ.GmTE5DrJ-3DZR_ayZ0ZAYr1n4fMriKuwSoRilfmxj3M', '2021-10-06 09:11:02'),
(202, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NjU4NX0.nOgHTeeVRX9g67WbBnKs_A7bEL3uwv21UNVbprstcH8', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg2NTg1fQ.PZKhGWi3rjRa06GCE_kQutcA790MQGXZoGkxykRxv1A', '2021-10-06 09:16:25'),
(203, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NjYxNH0.kNyqNg6ttI_12_iDOQKyYgTccs3_iF67xssdbPD7Plw', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg2NjE0fQ.7_XIfbsIuPsgXBZWBRWplyQZyy4OoI-BeOCiBeWY9UY', '2021-10-06 09:16:54'),
(204, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NjY0OH0.X1zager0gQAfmabsFrbKWvK1wsR79-Q5tuyGUDOE0fk', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg2NjQ4fQ.HUcdltGamY8QynISTBKmggQgORh0WQLay6m2Ma1lWV0', '2021-10-06 09:17:28'),
(205, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4OTIzMX0.50Bte2XUk_FDyUrHZigykYUwTy4NTQSOI3wg-Ljoen4', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg5MjMxfQ.mW0JhDA-UJUpWPSx_nlliyl6TuK25QlRPQffU4F40-4', '2021-10-06 10:00:31'),
(206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ5MDQwM30.Z127BAErzFXw0yIyvJBlH7LmtbYkh3EQSwxVnomSpLA', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDkwNDAzfQ.b4f4zF2npRGoClo9oT2FzJ5zAVCCSIIjBGMaq2VgN1M', '2021-10-06 10:20:03'),
(207, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0OTA0MTV9.bncmLjJE_Px5UtB-ruHFFuQU_FhHWj8hr0Gn4e9ewJQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQ5MDQxNX0.Y_OWjCWGqKT_2xVnr8tl5b4ZJ38GX7RrqKkEP-01JZA', '2021-10-06 10:20:15'),
(208, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0OTE4NTd9.BOD_j84NCi7NwyLvp_cxjBq1BfT966tSR8Q33W99sY8', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQ5MTg1N30.DOFiQqDN9T1VzY903hBcAbv3n7oun3NDjdbc_DW7ud4', '2021-10-06 10:44:17'),
(209, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0OTQ3Nzh9.h6LyFVGobf7NyTaAoeSJa0RRlgc__9bTnTtgiCQ4OTI', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQ5NDc3OH0.lb417V5h_AZKbvZx3eFnWCZ647d7anDN0uh2KvhotAY', '2021-10-06 11:32:58'),
(210, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0OTU4NzZ9.JpDq2a3L9cbVsgB8QKAitK74saSy3Rgo9NxozmIGjZE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQ5NTg3Nn0.KG4P8Inbv2j9CyBJ4b5anVoh5dEYaoy2ffi8SMk7g8I', '2021-10-06 11:51:16'),
(211, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MDM0ODJ9.ojbCM7vAa1cXJwVCoerp2qqmWjiwNO87HURqf1P5ff8', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUwMzQ4Mn0.2XhuYM-NBeEcCfoyF2SzfPSAdTmbIGmhjqOitlhJyp4', '2021-10-06 13:58:02'),
(212, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MDU4MDZ9.Ipg5lyigDbZGQ4lo3mvpwHrY2SWiO_vp0C51v-TvAOQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUwNTgwNn0.mDI9gNuVT2uI9Cjuqk9JAZe4Z0XUDYfcmD8h9LduDHY', '2021-10-06 14:36:46'),
(213, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MDg1MjJ9.SOr5i3CuqILOUw2BlHgjIOZfLZnhfrZPKG3wdjrENlg', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUwODUyMn0.meGm8z8toVxMse3sWpyr3Nk3fDGUu7jg3efhQUU-Y2Y', '2021-10-06 15:22:02'),
(214, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUwODY2OH0.P2LMUWY74ZfGtFvcXX9gRZv5UAFQASjz1HNN0wMVChg', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTA4NjY4fQ.mKs1wwda9LLhzKQeilV8KXjodnDqUyN0vDBjd1QpW1U', '2021-10-06 15:24:28'),
(215, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MDg4OTN9.9vRyGvNLrSfX6GqwtjxMCvTOrf4B7aXlf4nQV-VUjQ8', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUwODg5M30._ptDpUPh6-EWxDu2wi50ljyoXfIqYyR-mj-rBEohO20', '2021-10-06 15:28:13'),
(216, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MTA5NTd9.r3uwu8ClL1U2AzQlIhlMFt2YpquSkfAwowM2I02lJSY', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUxMDk1N30.Vj8wqcPw7hJHM26UOT2zPBf63s5kE9zQnoEC-FTNmno', '2021-10-06 16:02:37'),
(217, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MTExNjF9.ICN9695PChUd-vjA1TDvCktrdb_2S_u5F3m5jQcJmOs', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUxMTE2MX0.vPbjwkCfg-xV82Hzpl6eo-n5wxvAnzKUL4chWja1b3k', '2021-10-06 16:06:01'),
(218, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUxMjExNn0.TwMS5V5mmu-Lc53mfnrKeVMf9OKERkWQS425ig1cCDw', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTEyMTE2fQ.HFd6sB5uuVHJm3O1ZVXHJgK1uyLKU75oZZ8BH-2d71Y', '2021-10-06 16:21:56'),
(219, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUxMjE3Mn0._X30eUJ_DT5FWCYFQ3BZv0T19LSEaTp7dabw7kKwRG8', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTEyMTcyfQ.m6YB3jsrodShwfftEPt7DnsMcIGFrPrgFqnwd9Eq8ZY', '2021-10-06 16:22:52'),
(220, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUxNjk0M30.8tleM2dLW2LmH4Y64mpCe7dl5xM3FbNcn6FK5RZscTU', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTE2OTQzfQ.ClJls4Yhr3GrlCsC1ZmUfXfx9jLU2c_YgXIsCElG1SA', '2021-10-06 17:42:23'),
(221, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMDgwOH0.1kQgKmKhtQGLFqH1Xn3HWOnZLtThsXMmLTWsyqElmy4', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIwODA4fQ.HK5GkDJJFJs7znFfwRg8XV5Mi8YrGE4AUxB4iweuQQI', '2021-10-06 18:46:48'),
(222, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MjEwMTR9.AuMh1cTTLqomiLZcgNtsjD7k6MPNFonfMtVApmoO3f4', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUyMTAxNH0.7Xf1oQcjMLNFD6-750tlr29arWdkV2VHn5EL8lAbIZo', '2021-10-06 18:50:14'),
(223, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MjI4ODV9.Syv0DFHtaMX_6K0SA2dTvR8ycRJbwll6ffZFyCJGHBk', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUyMjg4NX0.LmfkpGcsBd8flltKe6R-6rU9hqj5V8hLahnPnwKAxOY', '2021-10-06 19:21:25'),
(224, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMjk5Nn0.XHYgBe1q11mIHGt0Ifi8JfGVwU9pj-yGA4-7fFZnNlM', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIyOTk2fQ.QgCtu3ITqfuW5ROeT6pDxgAo3mCG6XUmt2NgO-e7uMM', '2021-10-06 19:23:16'),
(225, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzI3MH0.iPdPSOXuyjvjzNha1W7m_Cna74DcTAs5HrQsa4g19Bk', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzMjcwfQ.BazS08PU0zvlLNLUpE0klEfeozGHyHs4w-70D7U68HM', '2021-10-06 19:27:50'),
(226, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzMzMH0.kRZaLVhZUEfbER-E3QglVN0WfSRvNS9UrvBpprj-sb4', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzMzMwfQ.-vxVSYa0vXqVEinfx91XkFPT-Ua7EE5oNwOtXfNR9Us', '2021-10-06 19:28:50'),
(227, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzQ0MX0.afoRYptDOw4xPT8KavPAtSpIBskNsukLx2IoJ03a7EU', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNDQxfQ.HsUhUQdeY-CyNIuV-RoqzM-gNa-2BiU6x1wp6YvIWoE', '2021-10-06 19:30:41'),
(228, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzQ4NH0.skFZyJMfWbAHrCFfadUJqC3pg11uXx1efLeo2kDVG08', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNDg0fQ.02NCM8fAnuBpqk6pJfAgMX40dq8y26vKcEu8-LKB5uc', '2021-10-06 19:31:24'),
(229, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzUxNH0.2qZvV1DKnVVJnzPRQiZ9zNok4tX5CchD0seaJcAyf-g', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNTE0fQ.qUnNcTvPwltGxqLxVSYxE6p1Mn9Z4Ni7qAIQCg3oOQk', '2021-10-06 19:31:54'),
(230, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzU2MX0.cr_xX7-ncfFwlln1xSYttN2JjCQHD4PjuyNFtz92qXQ', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNTYxfQ.eeH5RF8h_HdKc7rhx7EXGJfWKwqK9mUlCDtrUHCqFLc', '2021-10-06 19:32:41'),
(231, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzU4MX0.TqyAxt85UzdgTLj8_GqtHCfSRq75CE3C8m4nBWQNZGI', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNTgxfQ.Ha6zSAx0AX4w0BVd5wHakL3uL4AEQDWS3yUT_rqNM_4', '2021-10-06 19:33:01'),
(232, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzc1NH0.VH2SQQIavvgl-wpilCEOcyxYcIRbXUjD5qvqGd8FnE8', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNzU0fQ.LNQbThueW57FfTo4MHb2AT8bnDkucZUAfUBdAPMpY8g', '2021-10-06 19:35:54'),
(233, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzc3NX0.SRpXDRNmgEN1jGFkWltWhWwmfeFMCoRKDvACqqmxebA', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNzc1fQ.Zmv2fpeOdIWrWh5yl0ApFEwIfpYSFYlHN0JEeS5kloU', '2021-10-06 19:36:15'),
(234, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzc4N30.qeiZA62sV7Rvh6dPcCfH2_h7SPRtzKH_dd43sd0f1n8', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNzg3fQ.jDkFOdAqKMxUvy8eu3pxSm9yxxPz7HXvKf1yUdMQs4w', '2021-10-06 19:36:27'),
(235, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MjM5OTV9.MwqmWd6M5TLZQiK_qNrZ24r1Zgpo8eIKtiZ6EbjIlXU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUyMzk5NX0.hwJJSBJKB4k2L31MeXkC5dFlkO744c5li0i8vtp4Qm8', '2021-10-06 19:39:55'),
(236, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Mjc0MTl9.qZi18pgKFc42FbDuAI9RuVduG5cS4BndrXccOW3yKPw', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUyNzQxOX0.OyUiFVh-h2TyxJa9CoU5VsosBn26u61E4lj6hh8ScNM', '2021-10-06 20:36:59'),
(237, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MzMxNTJ9.RAqon-jSwuiJcOiJ5qixjVtp-WBDh25BgC2vVIolA9U', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUzMzE1Mn0.6ZJh_5gWpud7-NjHUW4PsuXteRorhvBDCv6Er1DN5Fw', '2021-10-06 22:12:32'),
(238, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUzMzIxOX0.MAl2GZEW-f1EVrVlXW-hQkoHSkv5EeDGodwXbU0HPBA', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1MzMyMTl9.jOfIxTZxqM5XM2nKwUUw6RU4fsCr8eHhFZ50cNL6akw', '2021-10-06 22:13:39'),
(239, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUzMzI0Mn0.7ANC2qycUqOFY6vbOoaPaKCbJRkFjpm2Rj0zIIvSQp0', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1MzMyNDJ9.3DWDiE4KlgRYwPJyQch4cP6_CdvHXdXpenuLqLu8YUU', '2021-10-06 22:14:02'),
(240, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MzMyNzF9.EFAY0woX-1RuREiPgv2O2FAX4hOhhc95Z6VR2U1Fv0E', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUzMzI3MX0.Ot_-WsT5JIIH8nBfGGv3JDou0WmSdmOvAJ96YXAWdzI', '2021-10-06 22:14:31'),
(241, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NjY4MjN9.T1G85wA81egBdi4LLfoFiQs6y12br7KdIJHc1Ghe-aQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU2NjgyM30.Vb3DvXlfYLsI_IlKuwzyXNOR464Xq299EVi7L6EYrMY', '2021-10-07 07:33:43'),
(242, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzU2NzAzNX0.-Hv__-oJ7oppsgPJmkHOLOhLUU4-YUoIF5caEhQFUV8', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1NjcwMzV9.0nfM94cEjMiITQbjYtaJiLEWRujsFj7f2CbzYqa821A', '2021-10-07 07:37:15'),
(243, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NjcwNDF9.t6THQprmfyfV_D4579GN2r1uP9bXVb4D8Nh8m244qlU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU2NzA0MX0.bUaOJaj7lEoIfPV4894NvdGj1yeV7P8MXggD059RpSE', '2021-10-07 07:37:21'),
(244, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Njg0Njl9.Y1Es7HoTW_5onynxAKcRwivNsQye1Ed6etAXMpAyYmQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU2ODQ2OX0.I6XWlQIOEbTPE-4W2Upt-6Ae5kDQRtgjCFlBOfm0My8', '2021-10-07 08:01:09'),
(245, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzU2ODU0Nn0.jzBKOptmSNOVliQMcoWErM4ddNP1NsJpnVPTvL7pylA', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1Njg1NDZ9.09CUYRBRRrnKq-zMvkoXNbzHlhyuFJxEUfj-1sUtfWc', '2021-10-07 08:02:26'),
(246, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzU2ODk0Mn0.FlYQw4gN51E24dpML1_1wc7Mw14yOnjSgF05gPdt-s4', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1Njg5NDJ9.KACuPaH5oMBjQ2f7RiqTW6oL305QAM_1GWkrUFtbB4A', '2021-10-07 08:09:02'),
(247, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Njk1MDR9.5nup2wrxV5-3QG67WjVOsNcbMNzIcWXaewm99oTl_Lc', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU2OTUwNH0.KxrznIoidZdJi5vPPKRw5ziGQrmocWcnQma34tYGsfQ', '2021-10-07 08:18:24'),
(248, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzU3MDc1N30.qRl3O1viuWngL5PgQEC1J4rDopyC5MwGyqOixTbLNrw', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1NzA3NTd9.MxjclnsPpM3MCZg3RLdYui_9SNrVSm_hTPX4CwJiNDo', '2021-10-07 08:39:17'),
(249, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzI3NDZ9.2IkfYz65MBuo7-u_HYtKVla9WL5gqQJM208LNuWyoxU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3Mjc0Nn0.bMlI9Ujv3TdinCtxnWo5Y2CUch5XDTCiABtiphb5pTE', '2021-10-07 09:12:26'),
(250, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzI4MzF9.vNsB65VNP0ARhNbX6uZVAA-JK6SL3eJJ3hiPn51d-RM', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3MjgzMX0.YUsahzM77PgNfuJ4z0_aoQr3jNNyZqmOkRd9CTWaSaI', '2021-10-07 09:13:51');
INSERT INTO `dala_token` (`dala_token_ID`, `dala_token_key`, `dala_token_type`, `dala_token_value`, `dala_token_date_created`) VALUES
(251, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzI4ODR9.oz_tf13yLF-GcIcLv-d9dLKTSEDSCNiQasQcCdPwuHU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3Mjg4NH0.A-LAJNCyDF_Qd5dO8KtJncO1cY6vNsKzC3Mz8Rt4JhI', '2021-10-07 09:14:44'),
(252, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzI5MDd9.cruVaVDQRQAbYPim-AhujsG5KPILCUPo-4L2M1qoYuQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3MjkwN30.rWOhITWu3W5AQb-wTtOwuXtRI5smtnpn2MZQ1BMsb-8', '2021-10-07 09:15:07'),
(253, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzI5Nzl9.ymENV5b2V68jk1vCvfv1Yplt_iX8YPj1fcDxMO2_i-4', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3Mjk3OX0.-MgEp2iZ_MJCEfXmxSMpm03-O_x1PXPbhWC5YrjGMVo', '2021-10-07 09:16:19'),
(254, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzMwNTl9.U6PwDCnZtMPpmlnUaQhzQW4yiBxPB4Kum0mYAxQCRwM', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3MzA1OX0.oGCzMq9X7xeqWTlWUTHLDIbzOiduTUc4ER1I4le9yX8', '2021-10-07 09:17:39'),
(255, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzUzNjR9.WrANkS-80o-oh-Joo1SYYeModXaOBN8v8Xwj4UYeaiE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3NTM2NH0.XaLJVO31E2fE6oIk1Tev85yRdb82RDo8qHDFjeob1vM', '2021-10-07 09:56:04'),
(256, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzU3NTd9.f4ZBOekddFiXhLTYcB9N40jn9H-VqrqscbB-pzDPYOY', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3NTc1N30.DLDh8-sfGpD437W58RYBkHRAMMt6pytaXaIQJAFLQ_Y', '2021-10-07 10:02:37'),
(257, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzY2NzJ9.Cp6Txr_junhKPu1KA1qWbp7obvh8Mq7TAIJIIAnG2FQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3NjY3Mn0.kyrYu1k-uBhzn7mQVh5_bJIk1C_oNuRn7F2UtjQ0fd4', '2021-10-07 10:17:52'),
(258, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Nzc0Mzd9.yCfLXK_g2YTwoIIH-2Jt6ZoOXSbXuFlO_q2yqvFyc7M', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3NzQzN30.1svzy27kHOU6_A68E-G87VV-_JK1xIeSNQRMz9hTIXA', '2021-10-07 10:30:37'),
(259, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzU3Nzg3Nn0.jQRZN0pF_8iNOpikRCn4b1HSG49YtElBkLIemCn8wDE', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1Nzc4NzZ9.79EEZUsJPUre5CN3yFX6yDA6zjeaC4dOJE7hzN_POaM', '2021-10-07 10:37:56'),
(260, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Nzc4ODF9.vpTppDXsO0dTMfPkUbcHDMTb6yQ9JnWYlqxXCyDT6_E', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3Nzg4MX0.r0fbG8pAfAK-8Ggw0dDoR0rN5idBNLynD-YjMXywQ8c', '2021-10-07 10:38:01'),
(261, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Nzk4NDR9.3CuZ_djqAYZ8xOnSw-aaQKWTh_DocIAh3akMxZqmBvs', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3OTg0NH0.MZm1sJDVHQffXbcEKBo21CmGO6gD-OeOW_9hczUKqaQ', '2021-10-07 11:10:44'),
(262, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Nzk4NzZ9.nkfUWjVrq_BwKeQ5E2nFBATn8cDTuX5zJaivE-4c11U', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3OTg3Nn0.Z8UsA4BG9nMTP9yICJOlotEnYGB-fpHZ8g-Lr1M_Z1A', '2021-10-07 11:11:16'),
(263, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODAxNDR9.cLwwE6czcL3M4_qdKJ9WBHsTRyXSw1s1COHzygdl7uQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MDE0NH0.JLjDkDI1yTmuB2-sfDfu8i-biZRuCIaZfE8-U_9Etjk', '2021-10-07 11:15:44'),
(264, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODA3Mzl9.u0VZ7KINIpRXZqzUcEMZul0r0Suan1dEISikGbSGEO0', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MDczOX0.9nE7htdfrYfzMM2bHGRL1CWE-5KyAsaMcBvfiIyWjG0', '2021-10-07 11:25:39'),
(265, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODA4NjV9.FTCAbC5z4Osp2h9HvyMaqAEwFkIV9Ey32FE73avRQRQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MDg2NX0.F73POYjd9gE2BTSkJEgtMokiFVP8qgtlA2HUvodagrA', '2021-10-07 11:27:45'),
(266, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODEwMzB9.-D1KNsM7C55FSdg3sOEh9YU12lWsYUTEfsHsVAEsex0', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTAzMH0.DQ8siFYyVSR3s1-aEY-Y6whqEY1sEft-l0Fwm2R1fkY', '2021-10-07 11:30:30'),
(267, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODEwNzR9.uf-SdgiVVvk1DE2Se2PtLyCpQOgZaAmjWfBBUsYzvVo', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTA3NH0.QOtjmH6UcSyV9II3ImMCNbH48PnVnWeMevuAXiO19dg', '2021-10-07 11:31:14'),
(268, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODExMjd9.qkYH-VVsO-ecA78e5s64Eaf-qD253fN2U7p7WOx2Y_M', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTEyN30.JL5Ye8wAjrzwP2yG40CvYSm2X8xR-fP6d56IFIAC5xM', '2021-10-07 11:32:07'),
(269, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODExNDV9.E-7G0FmmditXqG6LbK7FDVWjDDFOBHLdkjjPWygVejE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTE0NX0.RMLoufQ_qMr7tlxvDXu_y9dk0s8cHI7nnSE-OPV25PE', '2021-10-07 11:32:25'),
(270, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODExOTF9.Goyz5dSyOHOf_20nsEIjJ6wl1irQdjJIWluTEWAFrow', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTE5MX0.nf29rf0yPScl507zXmon3NRZb3Yuy-P9xje4mLfZewo', '2021-10-07 11:33:11'),
(271, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODEyMTl9.w_C6ErOxuFzrtLyehwkctefXBLn-XIvOEIKhwUmjuBM', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTIxOX0.9iYD_TAz0HXsIzccfWd9Kir0oi4kx5IePvggukE1Bk8', '2021-10-07 11:33:39'),
(272, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODEyNTV9.3opSUKpDCjFlgDa3gqm0V4PAJ6BD6ZMFaNjEljCv0NU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTI1NX0.VuTZnvBElkSmm4pO62FimAJvWaIF_KrpnNumAJxQJKE', '2021-10-07 11:34:15'),
(273, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODEyNjh9.qiyFolsZQKTHIXPoqh5aa9xSAaDIvmz0qVowaRXTA8g', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTI2OH0.ydtS08UMO5XxaZ3Zq-qJj16AqDtEHPnlBbMTCfahKx8', '2021-10-07 11:34:28'),
(274, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODEzMTh9.5XjCfy5JIO0L2i8zLP9BXAGMwkQhbAFlKAxtVo2cUAs', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTMxOH0.eS2YW_IvCZMurTINlZTvx3NZCFZyJftMAsji0-36vHc', '2021-10-07 11:35:18'),
(275, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE0MDl9.U3MVaEE_e8Wip3k5xbiHxJZwR16XPXJRK1LVXq041YQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTQwOX0.87cwrQsUqMHUaZI0MakWUqn9x8x-W_SGIYctpTLwFxg', '2021-10-07 11:36:49'),
(276, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE0NDl9.ij5wmpwnEIxn0hNPsGnsrSbTQWn9zuP_jBm2aNTVLt4', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTQ0OX0.FyC7qfl7KUHW55a6ciVQdQJfdCkGhbpXkPy2CaR9TMY', '2021-10-07 11:37:29'),
(277, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE3NzJ9.NWQbAyJXEzDBi8tHhu6PZ5ZGWDRrrdAgN5NdLuKrfgc', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTc3Mn0.HRU5PoLy7HiwYKKlghuxFhr7OsDuorooQ2zIvduizQE', '2021-10-07 11:42:52'),
(278, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE3ODd9.MJ8Zk0e_Yj2DTko5xyI2F4KGM2rtO3iOD_7nCIuTteE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTc4N30.nm_18MWV7zdAcysUIct_3lzlbTVbNQfiYkxZ1AUQQuw', '2021-10-07 11:43:07'),
(279, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE4MTF9.zBrcO5r61blXllx2lD-xO17_8IB9wXQNtKUcmqrXmsU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTgxMX0.zEvOoNH4KT_na5aH-2ObeCZfOKWuxc5WzdZL6m6xmww', '2021-10-07 11:43:31'),
(280, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE4NDZ9.e7fTsIGuDftx0EP3bgNP9N2tt925jawehKI6LPRIDn8', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTg0Nn0.XkVa2jsFjHLJMhCrgyrleF0jSMN6PlaH0kNru75fuII', '2021-10-07 11:44:06'),
(281, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE4NzJ9.LQXgqd24zaNpnFlALBcZb2vO8wCSs0i3FZvwU0YTuXQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTg3Mn0.Zra0qfaZGFLg2_EI5hZ4XZltQ4mloc4Pf8K0rYO4UtI', '2021-10-07 11:44:32'),
(282, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE4OTl9.rzFe9mzU4mvphrq0K_twm-e3JDalVmiTBqn7n3jl54M', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTg5OX0.Tkz0HPs2IgtEvq88v5o7AEJsC2zRPV8ZwU704RWIr-4', '2021-10-07 11:44:59'),
(283, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE5OTd9.b2Yzrs7JgOzSFQdLCtr0NBnXezmigztmS0PzlzpPWXw', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTk5N30.jL6MaWtVXa31AW-sHz8lO1v-ur_56QgoQRcv23bveo4', '2021-10-07 11:46:37'),
(284, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODIwMjl9.Z5rHTede_Art_36MqIsKS7XrvVRjh6q1xjoeHZkkyzY', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MjAyOX0.Up8YYPeRUuuGT5u_G2pwnf5QGMl8W1HXa3NxREx21iE', '2021-10-07 11:47:09'),
(285, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODIwNDJ9.Ya0XtSDYs4lZutGF1N99tai2LOD5VwoXTmzRMP0sBik', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MjA0Mn0.fqxnkxhetWzCuPWXdrNPp5YaclgAyr9mg_FuFzwtwdk', '2021-10-07 11:47:22'),
(286, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODIxNjZ9.6BNbXTKwqvDiU2Vq4yL4mpchS5eFJxpLvwatNgSyVTU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MjE2Nn0.Szt1QxVACt9xpZsu56aI9pFRtPapbtyQZ-2eX1Pwdtk', '2021-10-07 11:49:26'),
(287, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODIxOTZ9.8eO4TO_by02M3pbf2qSR4X9dgXSvho0oGGPdxVL2oZk', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MjE5Nn0.hp8wXehYkN1cER4QTve-U9eoKlM897GmDkSrfHllp60', '2021-10-07 11:49:56'),
(288, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODQ3MTZ9.lRQXCMQcDITJFyfDT2YBWlhOErGygabyvT2kx_MjULo', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4NDcxNn0.twZkZv0RhdunIGkyljY3HI1E7gqC-1f3XJ1GcfGAgVw', '2021-10-07 12:31:56'),
(289, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODUxNTR9.u72C0zgCmBwRVNBkQhJkGt9UiE9XE0AXH5lRxa4CaEE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4NTE1NH0.UhMGGEi_N9y7pBZYY9YkavoRAeCFordVEwPRgcy2GJ0', '2021-10-07 12:39:14'),
(290, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODUyMjl9.MdHjJxmpVEwEs30WcN27M_-yUx98nAMETO4zTaUhvzM', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4NTIyOX0.QmOB1atpYSDPLgbEoKiTwK5UqW_RBULZTGDwEAb9nW8', '2021-10-07 12:40:29'),
(291, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODcxMzF9.wrX4BtdUDI_LorV4pihNyiNAjArWkwxTFfKIFRgClLA', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4NzEzMX0.yOkKDlYt3QzyjwjqyEb6SRKS0xzt3BlCtoVePlI7-tw', '2021-10-07 13:12:11'),
(292, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODcyMjV9.7Izf5FxUbXp89Ob_2J9Hfdzw3HBkpX1ioDGp2FYYDXw', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4NzIyNX0.f8aBpQPlEgDcMxLk1yZBtcLX46yvHwokwvrkZnhitGY', '2021-10-07 13:13:45'),
(293, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODg1NzF9.UZCMn5l4KWvgUaH5vOqo44SJZXya7pOuObU0en6ZuCQ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4ODU3MX0.fXRXlEMsTced6du_G9Xa1yFxAEPpeKKf--vUcC6eaOY', '2021-10-07 13:36:11'),
(294, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODk2MzF9.tlORLkUnEg94olMKz5vFBugCXUOiKAI1U9hJnOYbWPU', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4OTYzMX0.5COnpYIHlAWXveH1mTVJdnQzzuAGCXwtBHlTV4wE-QY', '2021-10-07 13:53:51'),
(295, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1OTU2MTV9.t-joA-l7eCJ-av8SK0rCjozxf0dNxrFq6qzEjwqHAdY', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU5NTYxNX0.1UQyWzuHwVgDyMRVVN_uEtEPYucvOixhmcWkjyGp3pQ', '2021-10-07 15:33:35'),
(296, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MDAwNjF9.DbeYTzGc3F8QyG3f1nAY4i5RyxybaXUpWEgagXHvZX8', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYwMDA2MX0.8BkAKHnVLn62iCXo1L5Rr03jRmZ6VrTFnmeowEp_LsQ', '2021-10-07 16:47:41'),
(297, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzYwMDE0NH0.UoN5loAPn7wGGOdcKr6Ot07KZpqwVId9afrtsMa08rQ', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM2MDAxNDR9.DtkdodyARLLdLrGsY7lsuGraGxJL6gvHL6F2fv-8tmk', '2021-10-07 16:49:04'),
(298, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MDMzMjh9.izsoFIt_yk5Evr8EwocvUqYYo2JljzSfSMXYTGN72Hw', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYwMzMyOH0.g-VAjmHGeBv4RDkn2D5-jQQyvOfFOlv22NFDSboTGf0', '2021-10-07 17:42:08'),
(299, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MDMzMzl9.SucWujd_yCcGg2lnxC_t7HBXfv-90VCodHNq95tQywA', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYwMzMzOX0.doubgJGWosSaX9MzfIi2z1-NtJuTwygBoZ8qlDopIf4', '2021-10-07 17:42:19'),
(300, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MDg0MDB9.PUCvmlovA4rs2XvYZDBCLD2ITCSyHO6OaL6f7wsTZPg', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYwODQwMH0.mTOWMCou586lMuzIlRawyOP8zwkitdpRid3c7opsY0Y', '2021-10-07 19:06:40'),
(301, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MDg0MzN9.jjMhHZmKGPKjriX-Mf-MfIUs79mv3D3s7G-4La11jJ0', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYwODQzM30.efEABiJ5O6nZeEfrJv9wqs6tlN_9-qX0ns4-QIGPSXY', '2021-10-07 19:07:13'),
(302, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MDkzNzd9.cS45SGIO3XMD7y70DQXy5aiTB7AfnjTDaaVniD_nd2g', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYwOTM3N30.R401E5l4LdvTq-w_PBKRU97KJxVRArrNVGAmOWNxRas', '2021-10-07 19:22:57'),
(303, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MTA3OTh9.VXOhoEbiisX2ywLNDaFXBWGFBT7TNUfRiuO6Qpskdwg', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYxMDc5OH0.Vftqq7WB6R4jkCh7lopxb_h7fvLUEtleztFBTUwS9kE', '2021-10-07 19:46:38'),
(304, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MTA5MzN9.38-hYyKayIEZd0GYKSJ2Fr3zloDwMMFN_L3l6bjf0UI', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYxMDkzM30.i49T8MXO1LHvWaRwnwL-VN7xtTDCmUuOXjSX3KUcTho', '2021-10-07 19:48:53'),
(305, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MTA5OTh9.0xq9iBioZKouEipkINFZ6KI7G0KddHOrH6DJf1X8hto', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYxMDk5OH0.cwIuTAHYFXG2IpD_6lXzJOL0vjYBt1F_JAtRlsgjW9Y', '2021-10-07 19:49:58'),
(306, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MTMxMzZ9.qloosk2sCBr5xiZAKU_2lWWJDnzkn-uOVdhxXtGEsfI', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYxMzEzNn0.fn89RtRxXH2KMbba0G0BH6yAnoTpf9xncTWAwEVdE5Q', '2021-10-07 20:25:36'),
(307, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MTc5MDl9.wdBx80Ys4io7XA4DGFvFQ4Dhu8H9FsLMkvhFj7xDoVE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYxNzkwOX0.L1CypwfPZkA01qMKEru2p0CMkm6OPksGkBSPVRvh248', '2021-10-07 21:45:09'),
(308, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MTc5NTV9.u4ReqW8hrbesfZDk0s2JZI623MkfMVg-PohhsEAt6tE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYxNzk1NX0.2HEIOyF5eW2Sn3HgR4TTSfe1I5GI46jR6IxF-H5KxAg', '2021-10-07 21:45:55'),
(309, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MTgwMzN9.oUlYNaPsC0SijxBWJ-s80325zsKqBLi4uFz0sNUwnz4', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYxODAzM30.LOgFFEKAJ8Xp0QhSQvM7C23PLKd8UdThQ99e-qudH0Y', '2021-10-07 21:47:13'),
(310, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MTgzODd9.1_LoUKkWTvOhecErt9XHWN1XZ3yk_VMF8XhRbcP6oL0', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYxODM4N30.RIe-d2Vaktx-mypaH86UWKj430anZNO-1fTLXBDIjq4', '2021-10-07 21:53:07'),
(311, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MTg0NTh9.3vvKqdj40SC8sZfv9YFouokep9iAtWf1rm8cd_vNJ5Y', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYxODQ1OH0.Ns-gtOdgINOFQqLIwovhQA8ZT1xEGYu2nF97t1y16Dc', '2021-10-07 21:54:18'),
(312, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MTg1NDB9.LFy0GpX7lSc2WdVv-j-Aj3Xvuz6haWJumvI8IxxZGGM', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYxODU0MH0.nr9ibX9qTpjM1TDJJkZq8XmpAzAiRNGq3hQaAh_wouY', '2021-10-07 21:55:40'),
(313, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MTg1OTF9.YUF9-P_MFnxAVdAkQ6SQixCbPBBv6H3wgUFlX3s8VLE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYxODU5MX0.xYRuY2XVYvn99Bdqcj686eMwGlM_JYqankX6auyTjag', '2021-10-07 21:56:31');

-- --------------------------------------------------------

--
-- Table structure for table `dala_uploads_infomation`
--

DROP TABLE IF EXISTS `dala_uploads_infomation`;
CREATE TABLE IF NOT EXISTS `dala_uploads_infomation` (
  `dala_uploads_infomation_ID` int NOT NULL AUTO_INCREMENT,
  `dala_uploads_infomation_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_uploads_infomation_user_id` int NOT NULL,
  `dala_uploads_infomation_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_uploads_infomation_image_id` int NOT NULL,
  PRIMARY KEY (`dala_uploads_infomation_ID`),
  KEY `uploads_infomation_user_id` (`dala_uploads_infomation_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_uploads_infomation`
--

INSERT INTO `dala_uploads_infomation` (`dala_uploads_infomation_ID`, `dala_uploads_infomation_created`, `dala_uploads_infomation_user_id`, `dala_uploads_infomation_url`, `dala_uploads_infomation_image_id`) VALUES
(1, '2021-10-03 07:28:34', 51, 'https://appdala.net/wp-content/uploads/dala-image.jpg', 464),
(2, '2021-10-03 09:13:44', 50, 'https://appdala.net/wp-content/uploads/logo-nonglamfood-full-ngang-22-scaled.jpg', 465),
(3, '2021-10-03 09:23:46', 91, 'https://appdala.net/wp-content/uploads/sachi-cafe-1-scaled.jpg', 467),
(4, '2021-10-03 09:24:02', 91, 'https://appdala.net/wp-content/uploads/sachi-cafe-1-1-scaled.jpg', 468),
(5, '2021-10-03 09:24:18', 91, 'https://appdala.net/wp-content/uploads/sachi-cafe-2-scaled.jpg', 469),
(6, '2021-10-03 09:24:31', 91, 'https://appdala.net/wp-content/uploads/sachi-cafe-3-scaled.jpg', 470),
(7, '2021-10-03 09:24:52', 91, 'https://appdala.net/wp-content/uploads/sachi-cafe-4-scaled.jpg', 471),
(8, '2021-10-03 09:27:36', 91, 'https://appdala.net/wp-content/uploads/sachi-cot-dua1-scaled.jpg', 472),
(9, '2021-10-03 09:28:31', 91, 'https://appdala.net/wp-content/uploads/sachi-cot-dua-2-scaled.jpg', 473),
(10, '2021-10-03 09:28:47', 91, 'https://appdala.net/wp-content/uploads/sachi-cot-dua1-1-scaled.jpg', 474),
(11, '2021-10-03 09:29:00', 91, 'https://appdala.net/wp-content/uploads/sachi-cot-dua-3-scaled.jpg', 475),
(12, '2021-10-03 09:29:33', 91, 'https://appdala.net/wp-content/uploads/sachi-cot-dua1-2-scaled.jpg', 476),
(13, '2021-10-03 09:49:04', 51, 'https://appdala.net/wp-content/uploads/mut-dau-tay-ngot-ngao.jpg', 485),
(14, '2021-10-03 10:14:23', 51, 'https://appdala.net/wp-content/uploads/6.jpg', 486),
(15, '2021-10-03 10:25:04', 51, 'https://appdala.net/wp-content/uploads/avd-0ebd1.jpg', 487),
(16, '2021-10-03 10:29:02', 51, 'https://appdala.net/wp-content/uploads/now-vn-deal-trai-cay-mua-1-tang-1-tat-ca-san-pham.jpg', 488),
(17, '2021-10-05 11:45:48', 50, 'https://appdala.net/wp-content/uploads/logo-nonglamfood-full-ngang-22-2-scaled.jpg', 493);

-- --------------------------------------------------------

--
-- Table structure for table `dala_users`
--

DROP TABLE IF EXISTS `dala_users`;
CREATE TABLE IF NOT EXISTS `dala_users` (
  `dala_users_ID` int NOT NULL AUTO_INCREMENT,
  `dala_users_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_users_full_name` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_password` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_password_lost` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_first_name` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_last_name` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_adress` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_phone` char(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_email` char(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_api_version` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'v1',
  `dala_users_router_version` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'v1',
  `dala_users_view_version` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'v1',
  `dala_users_js_css_version` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'v1',
  `dala_users_users_type_id` int DEFAULT NULL,
  `dala_users_shipping_status` tinyint(1) NOT NULL DEFAULT '0',
  `dala_users_status` tinyint(1) NOT NULL DEFAULT '0',
  `dala_users_verification_status` tinyint(1) NOT NULL DEFAULT '0',
  `dala_users_verification_code` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_verification_time` datetime DEFAULT NULL,
  PRIMARY KEY (`dala_users_ID`),
  UNIQUE KEY `check_users_phone_unique` (`dala_users_phone`),
  KEY `users_users_type_id` (`dala_users_users_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_users`
--

INSERT INTO `dala_users` (`dala_users_ID`, `dala_users_date_created`, `dala_users_full_name`, `dala_users_password`, `dala_users_password_lost`, `dala_users_first_name`, `dala_users_last_name`, `dala_users_adress`, `dala_users_phone`, `dala_users_email`, `dala_users_api_version`, `dala_users_router_version`, `dala_users_view_version`, `dala_users_js_css_version`, `dala_users_users_type_id`, `dala_users_shipping_status`, `dala_users_status`, `dala_users_verification_status`, `dala_users_verification_code`, `dala_users_verification_time`) VALUES
(50, '2021-05-19 14:36:30', 'manage-dala', 'a3dcb4d229de6fde0db5686dee47145d', '', 'manage-dala', 'manage-dala', 'manage-dala', '0948036018', 'htms.group.vn@gmail.com', 'v4', 'v4', 'v4', 'v4', 13, 0, 0, 0, '', NULL),
(51, '2021-05-19 14:37:36', 'dala-store', 'a3dcb4d229de6fde0db5686dee47145d', '', 'dala-store', 'dala-store', 'dala-store', '09480360101', 'dala-store@gmail.com', 'v4', 'v4', 'v4', 'v4', 14, 0, 0, 0, '', NULL),
(56, '2021-05-19 14:47:18', 'custommer', 'a3dcb4d229de6fde0db5686dee47145d', '', 'custommer', 'custommer', 'custommer', '09480360106', 'custommer@gmail.com', 'v4', 'v4', 'v4', 'v4', 15, 0, 0, 0, '', NULL),
(57, '2021-05-19 14:48:49', 'GuestDalaAll', '412789534f5cd5b263bb574ba2f09585', '', 'GuestDalaAll', 'GuestDalaAll', 'GuestDalaAll', '09480360107', 'GuestDalaAll@gmail.com', 'v4', 'v4', 'v4', 'v4', 16, 0, 0, 0, '', NULL),
(62, '2021-05-19 14:48:49', 'supper-job', 'e6f6c1856909fd4b527b3ab04d0e99a3', '', 'supper-job', 'supper-job', 'supper-job', '0889450307', 'supper-job@gmail.com', 'v4', 'v4', 'v4', 'v4', 17, 0, 0, 0, '', NULL),
(63, '2021-05-19 14:48:49', 'shipping 1', 'a3dcb4d229de6fde0db5686dee47145d', '', 'shipping 1', 'shipping 1', 'shipping 1', '0708546623', 'shipping1@gmail.com', 'v4', 'v4', 'v4', 'v4', 18, 0, 0, 0, '', NULL),
(90, '2021-05-19 14:48:49', 'shipping_ghtk', 'a3dcb4d229de6fde0db5686dee47145d', '', 'shipping ghtk', 'shipping ghtk', 'shipping ghtk', '09480360123', 'shipping12@gmail.com', 'v4', 'v4', 'v4', 'v4', 18, 0, 0, 0, '', NULL),
(91, '2021-10-03 09:10:42', 'CÔNG TY CỔ PHẦN NÔNG LÂM FOOD', 'a3dcb4d229de6fde0db5686dee47145d', '2e0bff759d057e28460eaa5b2cb118e5', '', '', '68 Nguyễn Huệ, phường Bến Nghé, Quận 1, thành phố Hồ Chí Minh', '07085466233', 'vnwr.info@gmail.com', 'v4', 'v4', 'v4', 'v4', 14, 0, 0, 0, '', NULL),
(92, '2021-10-07 14:33:03', 'vuong', '4297f44b13955235245b2497399d7a93', '', '', '', 'bien hoa', '0981314849', 'vuong@gmail.com', 'v4', 'v4', 'v4', 'v4', 15, 0, 0, 0, '', NULL);

--
-- Triggers `dala_users`
--
DROP TRIGGER IF EXISTS `trig_check_users_insert`;
DELIMITER $$
CREATE TRIGGER `trig_check_users_insert` BEFORE INSERT ON `dala_users` FOR EACH ROW BEGIN  



IF(NEW.dala_users_phone is null or NEW.dala_users_phone = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_check_users_phone_data_empty';   
ELSE 
	IF (NEW.dala_users_phone REGEXP '^[0-9]{10,11}+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_users_phone_data_type';   
	END IF;   
END IF;





IF(LENGTH(NEW.dala_users_email) > 0 ) THEN 	
	IF (NEW.dala_users_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_dala_users_email_data_type';   
	ELSE   
		SET @checkID = (select dala_users_ID from dala_users where dala_users_email = NEW.dala_users_email);
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_check_users_email_data_double'; 
		END IF;	
	END IF;	
END IF;



END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_check_users_update`;
DELIMITER $$
CREATE TRIGGER `trig_check_users_update` BEFORE UPDATE ON `dala_users` FOR EACH ROW BEGIN  



IF(LENGTH(NEW.dala_users_phone) > 0 ) THEN 

	IF (NEW.dala_users_phone REGEXP '^[0-9]{10,11}+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_users_phone_data_type';   
	END IF;   
	
END IF;







IF(LENGTH(NEW.dala_users_email) > 0 ) THEN 
	
	IF(NEW.dala_users_email !=  OLD.dala_users_email ) THEN 
		SET @checkID = (select dala_users_ID from dala_users where dala_users_email = NEW.dala_users_email);
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_check_users_email_double'; 
		END IF;	
	END IF;		
	
END IF;



END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_users_tracking`
--

DROP TABLE IF EXISTS `dala_users_tracking`;
CREATE TABLE IF NOT EXISTS `dala_users_tracking` (
  `dala_users_tracking_ID` int NOT NULL AUTO_INCREMENT,
  `dala_users_tracking_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_users_tracking_action` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'hành động',
  `dala_users_tracking_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'trạng thái',
  `dala_users_tracking_user_id` int NOT NULL,
  `dala_users_tracking_info` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_users_tracking_ID`),
  KEY `users_tracking_user_id` (`dala_users_tracking_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_users_tracking`
--

INSERT INTO `dala_users_tracking` (`dala_users_tracking_ID`, `dala_users_tracking_created`, `dala_users_tracking_action`, `dala_users_tracking_status`, `dala_users_tracking_user_id`, `dala_users_tracking_info`) VALUES
(1, '2021-10-06 15:38:13', 1, 1, 91, 'NULL'),
(2, '2021-10-06 15:40:38', 1, 1, 91, 'NULL'),
(3, '2021-10-06 15:41:33', 1, 1, 91, 'NULL'),
(4, '2021-10-07 08:02:10', 0, 1, 63, 'NULL'),
(5, '2021-10-07 08:02:16', 0, 1, 63, 'NULL');

--
-- Triggers `dala_users_tracking`
--
DROP TRIGGER IF EXISTS `trig_users_tracking_insert`;
DELIMITER $$
CREATE TRIGGER `trig_users_tracking_insert` BEFORE INSERT ON `dala_users_tracking` FOR EACH ROW BEGIN  







SET @check_login_fail = (
		select count(dala_users_tracking_ID) 
		from dala_users_tracking 
		where dala_users_tracking_user_id = NEW.dala_users_tracking_user_id 
		and dala_users_tracking_action = 0 
		and dala_users_tracking_status = 1 
	);

SET @check_lost_pass = (
		select count(dala_users_tracking_ID) 
		from dala_users_tracking 
		where dala_users_tracking_user_id = NEW.dala_users_tracking_user_id 
		and dala_users_tracking_action = 1 
		and dala_users_tracking_status = 1 
	);
	
SET @check_verification_fail = (
		select count(dala_users_tracking_ID) 
		from dala_users_tracking 
		where dala_users_tracking_user_id = NEW.dala_users_tracking_user_id 
		and dala_users_tracking_action = 2 
		and dala_users_tracking_status = 1 
	);	
	
SET @check_verification = (
		select count(dala_users_tracking_ID) 
		from dala_users_tracking 
		where dala_users_tracking_user_id = NEW.dala_users_tracking_user_id 
		and dala_users_tracking_action = 3 
		and dala_users_tracking_status = 1 
	);	


	
	
IF (
	@check_login_fail > 5 
	or @check_lost_pass > 5 
	or @check_verification_fail > 5 
	or @check_verification > 5  	
	) THEN  
	

	UPDATE dala_users set dala_users_status = '1' where  dala_users_ID = NEW.dala_users_tracking_user_id ;
	
	SIGNAL SQLSTATE '01000' 
	SET MESSAGE_TEXT = 'ok'; 
	
END IF;	







END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_users_type`
--

DROP TABLE IF EXISTS `dala_users_type`;
CREATE TABLE IF NOT EXISTS `dala_users_type` (
  `dala_users_type_ID` int NOT NULL AUTO_INCREMENT,
  `dala_users_type_name` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_type_infomation` varchar(4000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_users_type_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_users_type`
--

INSERT INTO `dala_users_type` (`dala_users_type_ID`, `dala_users_type_name`, `dala_users_type_infomation`) VALUES
(13, 'admin', '354aae4c3655725e157156614010b592'),
(14, 'bussiness', '950a14f62033feb91295dcb123d88e06'),
(15, 'customer', 'c20284d123204abaf547da15957b17f8'),
(16, 'default', '319b17162d07a5697a5b2175279a54b0'),
(17, 'supper-job', '22e9dfe5055e7e35bd4f754a01c365f7'),
(18, 'shipping', 'c18907b28bc58bce8aa0776e8cf0fae9');

--
-- Triggers `dala_users_type`
--
DROP TRIGGER IF EXISTS `trig_users_type_infomation_insert`;
DELIMITER $$
CREATE TRIGGER `trig_users_type_infomation_insert` BEFORE INSERT ON `dala_users_type` FOR EACH ROW BEGIN  
	IF(NEW.dala_users_type_infomation is null or NEW.dala_users_type_infomation = '') THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_users_type_infomation_empty';   
	END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_users_type_infomation_update`;
DELIMITER $$
CREATE TRIGGER `trig_users_type_infomation_update` BEFORE UPDATE ON `dala_users_type` FOR EACH ROW BEGIN  
	IF(NEW.dala_users_type_infomation is null or NEW.dala_users_type_infomation = '') THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_users_type_infomation_empty';   
	END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_users_type_name_insert`;
DELIMITER $$
CREATE TRIGGER `trig_users_type_name_insert` BEFORE INSERT ON `dala_users_type` FOR EACH ROW BEGIN  


IF(NEW.dala_users_type_name is null or NEW.dala_users_type_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_users_type_name_empty';   
END IF;



END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trig_users_type_name_update`;
DELIMITER $$
CREATE TRIGGER `trig_users_type_name_update` BEFORE UPDATE ON `dala_users_type` FOR EACH ROW BEGIN  


IF(NEW.dala_users_type_name is null or NEW.dala_users_type_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_users_type_name_empty';   
END IF;



END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `dala_views_products`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `dala_views_products`;
CREATE TABLE IF NOT EXISTS `dala_views_products` (
`dala_products_speciality_ID` int
,`dala_products_speciality_name` varchar(2000)
,`dala_products_speciality_type` int
,`dala_products_speciality_date_created` datetime
,`dala_products_speciality_sku` char(200)
,`dala_products_speciality_store_id` int
,`dala_products_speciality_parent_id` int
,`dala_products_speciality_featured_image` varchar(2000)
,`dala_products_speciality_image_slider` varchar(2000)
,`dala_products_speciality_origin` varchar(200)
,`dala_products_speciality_contents` mediumtext
,`dala_products_speciality_price` float
,`dala_products_speciality_sale_of_price` float
,`dala_products_speciality_date_start` datetime
,`dala_products_speciality_date_end` datetime
,`dala_products_speciality_stock` int
,`dala_products_speciality_brand` int
,`dala_products_speciality_status_admin` tinyint(1)
,`dala_products_speciality_status_store` tinyint(1)
,`dala_products_speciality_status_update` tinyint(1)
,`dala_products_speciality_variation_option` varchar(2000)
,`dala_products_speciality_excerpt` varchar(2000)
,`dala_products_speciality_qoute` text
,`dala_products_speciality_height` int
,`dala_products_speciality_width` int
,`dala_products_speciality_length` int
,`dala_products_speciality_weight` int
,`dala_products_speciality_price_caution` float
,`dala_products_speciality_sale_of_price_time_check` varchar(1)
,`dala_users_ID` int
,`dala_users_full_name` char(255)
,`dala_stores_ID` int
,`dala_stores_name` char(255)
,`dala_stores_status_admin` tinyint(1)
,`dala_brands_ID` int
,`dala_brands_name` varchar(500)
,`dala_brands_featured_image` varchar(2000)
,`dala_category_general_speciality_ID` int
,`dala_category_general_speciality_name` varchar(2000)
,`dala_options_product_speciality_ID` int
,`dala_options_product_speciality_name` varchar(2000)
,`dala_service_type_ID` int
,`dala_service_type_name` char(200)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `dala_view_count_order_by_user`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `dala_view_count_order_by_user`;
CREATE TABLE IF NOT EXISTS `dala_view_count_order_by_user` (
`dala_orders_speciality_ID` int
,`dala_orders_speciality_date_orders` datetime
,`dala_orders_speciality_status_orders` tinyint(1)
,`dala_users_ID` int
,`dala_users_full_name` char(255)
,`dala_stores_ID` int
,`dala_stores_name` char(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `dala_view_coupon`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `dala_view_coupon`;
CREATE TABLE IF NOT EXISTS `dala_view_coupon` (
`dala_coupon_speciality_ID` int
,`dala_coupon_speciality_date_created` datetime
,`dala_coupon_speciality_code` varchar(100)
,`dala_coupon_speciality_stores_id_created` int
,`dala_coupon_speciality_info` text
,`dala_coupon_speciality_type` tinyint(1)
,`dala_coupon_speciality_formula_price` tinyint(1)
,`dala_coupon_speciality_formula_price_value` double
,`dala_coupon_speciality_condition` tinyint(1)
,`dala_coupon_speciality_condition_value` double
,`dala_coupon_speciality_price_max` double
,`dala_coupon_speciality_date_star` datetime
,`dala_coupon_speciality_date_end` datetime
,`dala_coupon_speciality_multiple` int
,`dala_coupon_speciality_status_admin` tinyint(1)
,`dala_coupon_speciality_status_update` tinyint(1)
,`dala_coupon_speciality_limit_user` tinyint(1)
,`dala_coupon_speciality_limit_number` int
,`dala_coupon_speciality_qoute` text
,`dala_stores_ID` int
,`dala_stores_name` char(255)
,`dala_check_expired` int
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `dala_view_discount_program`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `dala_view_discount_program`;
CREATE TABLE IF NOT EXISTS `dala_view_discount_program` (
`dala_discount_program_ID` int
,`dala_discount_program_date_created` datetime
,`dala_discount_program_name` char(200)
,`dala_discount_program_store_id_created` int
,`dala_discount_program_featured_image` varchar(2000)
,`dala_discount_program_price_created` double
,`dala_discount_program_price_sale` tinyint(1)
,`dala_discount_program_position` tinyint(1)
,`dala_discount_program_type` tinyint(1)
,`dala_discount_program_time_type` tinyint(1)
,`dala_discount_program_status_admin` tinyint(1)
,`dala_discount_program_status_update` tinyint(1)
,`dala_discount_program_price_one_day` double
,`dala_discount_program_price_one_product` double
,`dala_discount_program_limit_product` tinyint(1)
,`dala_discount_program_limit_day` tinyint(1)
,`dala_discount_program_date_star` datetime
,`dala_discount_program_date_end` datetime
,`dala_discount_program_information` varchar(1000)
,`dala_discount_program_qoute` varchar(1000)
,`dala_discount_program_check_expired` int
,`dala_users_ID` int
,`dala_users_full_name` char(255)
,`dala_stores_ID` int
,`dala_stores_name` char(255)
,`dala_stores_status_admin` tinyint(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `dala_view_discount_program_product`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `dala_view_discount_program_product`;
CREATE TABLE IF NOT EXISTS `dala_view_discount_program_product` (
`dala_discount_program_product_link_ID` int
,`dala_discount_program_product_link_date_created` datetime
,`dala_discount_program_product_link_discount_program_details_id` int
,`dala_discount_program_product_link_product_speciality_id` int
,`dala_discount_program_product_link_status` tinyint(1)
,`dala_discount_program_product_link_qoute` text
,`dala_products_speciality_ID` int
,`dala_products_speciality_name` varchar(2000)
,`dala_products_speciality_type` int
,`dala_products_speciality_date_created` datetime
,`dala_products_speciality_sku` char(200)
,`dala_products_speciality_store_id` int
,`dala_products_speciality_parent_id` int
,`dala_products_speciality_featured_image` varchar(2000)
,`dala_products_speciality_image_slider` varchar(2000)
,`dala_products_speciality_origin` varchar(200)
,`dala_products_speciality_contents` mediumtext
,`dala_products_speciality_price` float
,`dala_products_speciality_sale_of_price` float
,`dala_products_speciality_date_start` datetime
,`dala_products_speciality_date_end` datetime
,`dala_products_speciality_stock` int
,`dala_products_speciality_brand` int
,`dala_products_speciality_status_admin` tinyint(1)
,`dala_products_speciality_status_store` tinyint(1)
,`dala_products_speciality_status_update` tinyint(1)
,`dala_products_speciality_variation_option` varchar(2000)
,`dala_products_speciality_excerpt` varchar(2000)
,`dala_products_speciality_qoute` text
,`dala_products_speciality_height` int
,`dala_products_speciality_width` int
,`dala_products_speciality_length` int
,`dala_products_speciality_weight` int
,`dala_discount_program_details_ID` int
,`dala_discount_program_details_date_created` datetime
,`dala_discount_program_details_discount_program_id` int
,`dala_discount_program_details_store_id` int
,`dala_discount_program_details_status_admin` tinyint(1)
,`dala_discount_program_details_status_update` tinyint(1)
,`dala_discount_program_details_price` double
,`dala_discount_program_details_limit_day` tinyint(1)
,`dala_discount_program_details_limit_product` tinyint(1)
,`dala_discount_program_details_qoute` text
,`dala_discount_program_ID` int
,`dala_discount_program_date_created` datetime
,`dala_discount_program_name` char(200)
,`dala_discount_program_store_id_created` int
,`dala_discount_program_featured_image` varchar(2000)
,`dala_discount_program_price_created` double
,`dala_discount_program_price_sale` tinyint(1)
,`dala_discount_program_position` tinyint(1)
,`dala_discount_program_type` tinyint(1)
,`dala_discount_program_time_type` tinyint(1)
,`dala_discount_program_status_admin` tinyint(1)
,`dala_discount_program_status_update` tinyint(1)
,`dala_discount_program_price_one_day` double
,`dala_discount_program_price_one_product` double
,`dala_discount_program_limit_product` tinyint(1)
,`dala_discount_program_limit_day` tinyint(1)
,`dala_discount_program_date_star` datetime
,`dala_discount_program_date_end` datetime
,`dala_discount_program_information` varchar(1000)
,`dala_discount_program_qoute` varchar(1000)
,`dala_check_date` bigint
,`dala_check_expired` int
,`dala_users_ID` int
,`dala_users_full_name` char(255)
,`dala_stores_ID` int
,`dala_stores_name` char(255)
,`dala_stores_status_admin` tinyint(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `dala_view_orders_customer`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `dala_view_orders_customer`;
CREATE TABLE IF NOT EXISTS `dala_view_orders_customer` (
`dala_orders_speciality_ID` int
,`dala_orders_speciality_user_id` int
,`dala_orders_speciality_shipper_id` int
,`dala_orders_speciality_date_orders` datetime
,`dala_orders_speciality_status_orders` tinyint(1)
,`dala_orders_speciality_status_pull_money` tinyint
,`dala_orders_speciality_status_payment` tinyint(1)
,`dala_orders_speciality_province` char(200)
,`dala_orders_speciality_district` char(200)
,`dala_orders_speciality_wards` char(200)
,`dala_orders_speciality_adress` varchar(2000)
,`dala_orders_speciality_notes` varchar(2000)
,`dala_orders_speciality_phone` char(11)
,`dala_orders_speciality_name` varchar(2000)
,`dala_orders_speciality_email` char(200)
,`dala_orders_speciality_shipping_code` varchar(200)
,`dala_orders_details_speciality_ID` int
,`dala_orders_details_speciality_order_id` int
,`dala_orders_details_speciality_line_order` char(200)
,`dala_orders_details_speciality_product_id` int
,`dala_orders_details_speciality_qty` int
,`dala_orders_details_speciality_price` double
,`dala_orders_details_medium_text` varchar(500)
,`dala_price_caution` double
,`dala_products_speciality_ID` int
,`dala_products_speciality_name` varchar(2000)
,`dala_products_speciality_featured_image` varchar(2000)
,`dala_products_speciality_weight` int
,`dala_users_ID` int
,`dala_users_full_name` char(255)
,`dala_stores_ID` int
,`dala_stores_name` char(255)
,`dala_stores_province` char(200)
,`dala_stores_district` char(200)
,`dala_stores_wards` char(200)
,`dala_stores_adress` varchar(2000)
,`dala_stores_phone` varchar(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `dala_view_orders_users`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `dala_view_orders_users`;
CREATE TABLE IF NOT EXISTS `dala_view_orders_users` (
`dala_orders_speciality_ID` int
,`dala_orders_speciality_user_id` int
,`dala_orders_speciality_store_id` int
,`dala_orders_speciality_shipper_id` int
,`dala_orders_speciality_date_orders` datetime
,`dala_orders_speciality_status_orders` tinyint(1)
,`dala_orders_speciality_status_pull_money` tinyint
,`dala_orders_speciality_status_payment` tinyint(1)
,`dala_orders_speciality_province` char(200)
,`dala_orders_speciality_district` char(200)
,`dala_orders_speciality_wards` char(200)
,`dala_orders_speciality_adress` varchar(2000)
,`dala_orders_speciality_notes` varchar(2000)
,`dala_orders_speciality_phone` char(11)
,`dala_orders_speciality_name` varchar(2000)
,`dala_orders_speciality_email` char(200)
,`dala_orders_speciality_shipping_code` varchar(200)
,`dala_orders_details_speciality_ID` int
,`dala_orders_details_speciality_order_id` int
,`dala_orders_details_speciality_line_order` char(200)
,`dala_orders_details_speciality_product_id` int
,`dala_orders_details_speciality_qty` int
,`dala_orders_details_speciality_price` double
,`dala_orders_details_medium_text` varchar(500)
,`dala_coupon_speciality_ID` int
,`dala_coupon_speciality_date_created` datetime
,`dala_coupon_speciality_code` varchar(100)
,`dala_coupon_speciality_stores_id_created` int
,`dala_coupon_speciality_info` text
,`dala_coupon_speciality_type` tinyint(1)
,`dala_coupon_speciality_formula_price` tinyint(1)
,`dala_coupon_speciality_formula_price_value` double
,`dala_coupon_speciality_condition` tinyint(1)
,`dala_coupon_speciality_condition_value` double
,`dala_coupon_speciality_price_max` double
,`dala_coupon_speciality_date_star` datetime
,`dala_coupon_speciality_date_end` datetime
,`dala_coupon_speciality_multiple` int
,`dala_coupon_speciality_status_admin` tinyint(1)
,`dala_coupon_speciality_status_update` tinyint(1)
,`dala_coupon_speciality_limit_user` tinyint(1)
,`dala_coupon_speciality_limit_number` int
,`dala_coupon_speciality_qoute` text
,`dala_price_caution` double
,`dala_products_speciality_ID` int
,`dala_products_speciality_name` varchar(2000)
,`dala_users_ID` int
,`dala_users_full_name` char(255)
,`dala_stores_ID` int
,`dala_stores_name` char(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `dala_view_order_count_product`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `dala_view_order_count_product`;
CREATE TABLE IF NOT EXISTS `dala_view_order_count_product` (
`dala_orders_details_speciality_product_id` int
,`dala_users_ID` int
,`dala_users_full_name` char(255)
,`dala_stores_ID` int
,`dala_stores_name` char(255)
,`dala_orders_details_speciality_qty` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `dala_view_order_report`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `dala_view_order_report`;
CREATE TABLE IF NOT EXISTS `dala_view_order_report` (
`dala_orders_speciality_date_orders` datetime
,`dala_orders_speciality_ID` int
,`dala_stores_ID` int
,`dala_stores_name` char(255)
,`dala_users_ID` int
,`dala_orders_details_speciality_product_id` int
,`dala_orders_details_speciality_line_order` char(200)
,`dala_orders_details_speciality_qty` int
,`dala_orders_details_speciality_price` double
,`dala_price_caution` double
);

-- --------------------------------------------------------

--
-- Table structure for table `dala_view_product`
--

DROP TABLE IF EXISTS `dala_view_product`;
CREATE TABLE IF NOT EXISTS `dala_view_product` (
  `dala_view_product_ID` int NOT NULL AUTO_INCREMENT,
  `dala_view_product_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_view_product_user_id` int NOT NULL,
  `dala_view_product_product_id` int NOT NULL,
  PRIMARY KEY (`dala_view_product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure for view `dala_views_products`
--
DROP TABLE IF EXISTS `dala_views_products`;

DROP VIEW IF EXISTS `dala_views_products`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dala_views_products`  AS  select `dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_products_speciality`.`dala_products_speciality_type` AS `dala_products_speciality_type`,`dala_products_speciality`.`dala_products_speciality_date_created` AS `dala_products_speciality_date_created`,`dala_products_speciality`.`dala_products_speciality_sku` AS `dala_products_speciality_sku`,`dala_products_speciality`.`dala_products_speciality_store_id` AS `dala_products_speciality_store_id`,`dala_products_speciality`.`dala_products_speciality_parent_id` AS `dala_products_speciality_parent_id`,`dala_products_speciality`.`dala_products_speciality_featured_image` AS `dala_products_speciality_featured_image`,`dala_products_speciality`.`dala_products_speciality_image_slider` AS `dala_products_speciality_image_slider`,`dala_products_speciality`.`dala_products_speciality_origin` AS `dala_products_speciality_origin`,`dala_products_speciality`.`dala_products_speciality_contents` AS `dala_products_speciality_contents`,`dala_products_speciality`.`dala_products_speciality_price` AS `dala_products_speciality_price`,`dala_products_speciality`.`dala_products_speciality_sale_of_price` AS `dala_products_speciality_sale_of_price`,`dala_products_speciality`.`dala_products_speciality_date_start` AS `dala_products_speciality_date_start`,`dala_products_speciality`.`dala_products_speciality_date_end` AS `dala_products_speciality_date_end`,`dala_products_speciality`.`dala_products_speciality_stock` AS `dala_products_speciality_stock`,`dala_products_speciality`.`dala_products_speciality_brand` AS `dala_products_speciality_brand`,`dala_products_speciality`.`dala_products_speciality_status_admin` AS `dala_products_speciality_status_admin`,`dala_products_speciality`.`dala_products_speciality_status_store` AS `dala_products_speciality_status_store`,`dala_products_speciality`.`dala_products_speciality_status_update` AS `dala_products_speciality_status_update`,`dala_products_speciality`.`dala_products_speciality_variation_option` AS `dala_products_speciality_variation_option`,`dala_products_speciality`.`dala_products_speciality_excerpt` AS `dala_products_speciality_excerpt`,`dala_products_speciality`.`dala_products_speciality_qoute` AS `dala_products_speciality_qoute`,`dala_products_speciality`.`dala_products_speciality_height` AS `dala_products_speciality_height`,`dala_products_speciality`.`dala_products_speciality_width` AS `dala_products_speciality_width`,`dala_products_speciality`.`dala_products_speciality_length` AS `dala_products_speciality_length`,`dala_products_speciality`.`dala_products_speciality_weight` AS `dala_products_speciality_weight`,(case when (`dala_products_speciality`.`dala_products_speciality_sale_of_price` is null) then `dala_products_speciality`.`dala_products_speciality_price` when ((`dala_products_speciality`.`dala_products_speciality_date_start` is null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is null)) then `dala_products_speciality`.`dala_products_speciality_sale_of_price` when ((`dala_products_speciality`.`dala_products_speciality_date_start` is not null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_start`)) > 0)) then `dala_products_speciality`.`dala_products_speciality_sale_of_price` when ((`dala_products_speciality`.`dala_products_speciality_date_start` is null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is not null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_end`)) < 0)) then `dala_products_speciality`.`dala_products_speciality_sale_of_price` when ((`dala_products_speciality`.`dala_products_speciality_date_start` is not null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is not null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_start`)) > 0) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_end`)) < 0)) then `dala_products_speciality`.`dala_products_speciality_sale_of_price` else `dala_products_speciality`.`dala_products_speciality_price` end) AS `dala_products_speciality_price_caution`,(case when (`dala_products_speciality`.`dala_products_speciality_sale_of_price` is null) then '0' when ((`dala_products_speciality`.`dala_products_speciality_date_start` is null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is null)) then '1' when ((`dala_products_speciality`.`dala_products_speciality_date_start` is not null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_start`)) > 0)) then '1' when ((`dala_products_speciality`.`dala_products_speciality_date_start` is not null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_start`)) < 0)) then '2' when ((`dala_products_speciality`.`dala_products_speciality_date_start` is null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is not null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_end`)) > 0)) then '3' when ((`dala_products_speciality`.`dala_products_speciality_date_start` is not null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is not null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_start`)) > 0) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_end`)) > 0)) then '3' when ((`dala_products_speciality`.`dala_products_speciality_date_start` is not null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is not null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_start`)) < 0)) then '2' else '4' end) AS `dala_products_speciality_sale_of_price_time_check`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_stores`.`dala_stores_status_admin` AS `dala_stores_status_admin`,`dala_brands`.`dala_brands_ID` AS `dala_brands_ID`,`dala_brands`.`dala_brands_name` AS `dala_brands_name`,`dala_brands`.`dala_brands_featured_image` AS `dala_brands_featured_image`,`dala_category_general_speciality`.`dala_category_general_speciality_ID` AS `dala_category_general_speciality_ID`,`dala_category_general_speciality`.`dala_category_general_speciality_name` AS `dala_category_general_speciality_name`,`dala_options_product_speciality`.`dala_options_product_speciality_ID` AS `dala_options_product_speciality_ID`,`dala_options_product_speciality`.`dala_options_product_speciality_name` AS `dala_options_product_speciality_name`,`dala_service_type`.`dala_service_type_ID` AS `dala_service_type_ID`,`dala_service_type`.`dala_service_type_name` AS `dala_service_type_name` from ((((((((`dala_users` left join `dala_stores` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) left join `dala_service_type` on((`dala_stores`.`dala_stores_service_type_id` = `dala_service_type`.`dala_service_type_ID`))) left join `dala_products_speciality` on((`dala_products_speciality`.`dala_products_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_brands` on((`dala_products_speciality`.`dala_products_speciality_brand` = `dala_brands`.`dala_brands_ID`))) left join `dala_options_product_speciality_link` on((`dala_options_product_speciality_link`.`dala_options_product_speciality_link_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_options_product_speciality` on((`dala_options_product_speciality_link`.`dala_options_product_speciality_link_option_id` = `dala_options_product_speciality`.`dala_options_product_speciality_ID`))) left join `dala_category_general_speciality_link` on((`dala_category_general_speciality_link`.`dala_category_general_speciality_link_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_category_general_speciality` on((`dala_category_general_speciality_link`.`dala_category_general_speciality_link_category_general_id` = `dala_category_general_speciality`.`dala_category_general_speciality_ID`))) ;

-- --------------------------------------------------------

--
-- Structure for view `dala_view_count_order_by_user`
--
DROP TABLE IF EXISTS `dala_view_count_order_by_user`;

DROP VIEW IF EXISTS `dala_view_count_order_by_user`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dala_view_count_order_by_user`  AS  select distinct `dala_orders_speciality`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_orders_speciality`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_orders` AS `dala_orders_speciality_status_orders`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name` from ((((`dala_orders_details_speciality` left join `dala_orders_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` = `dala_orders_speciality`.`dala_orders_speciality_ID`))) left join `dala_products_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_products_speciality`.`dala_products_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) ;

-- --------------------------------------------------------

--
-- Structure for view `dala_view_coupon`
--
DROP TABLE IF EXISTS `dala_view_coupon`;

DROP VIEW IF EXISTS `dala_view_coupon`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dala_view_coupon`  AS  select `dala_coupon_speciality`.`dala_coupon_speciality_ID` AS `dala_coupon_speciality_ID`,`dala_coupon_speciality`.`dala_coupon_speciality_date_created` AS `dala_coupon_speciality_date_created`,`dala_coupon_speciality`.`dala_coupon_speciality_code` AS `dala_coupon_speciality_code`,`dala_coupon_speciality`.`dala_coupon_speciality_stores_id_created` AS `dala_coupon_speciality_stores_id_created`,`dala_coupon_speciality`.`dala_coupon_speciality_info` AS `dala_coupon_speciality_info`,`dala_coupon_speciality`.`dala_coupon_speciality_type` AS `dala_coupon_speciality_type`,`dala_coupon_speciality`.`dala_coupon_speciality_formula_price` AS `dala_coupon_speciality_formula_price`,`dala_coupon_speciality`.`dala_coupon_speciality_formula_price_value` AS `dala_coupon_speciality_formula_price_value`,`dala_coupon_speciality`.`dala_coupon_speciality_condition` AS `dala_coupon_speciality_condition`,`dala_coupon_speciality`.`dala_coupon_speciality_condition_value` AS `dala_coupon_speciality_condition_value`,`dala_coupon_speciality`.`dala_coupon_speciality_price_max` AS `dala_coupon_speciality_price_max`,`dala_coupon_speciality`.`dala_coupon_speciality_date_star` AS `dala_coupon_speciality_date_star`,`dala_coupon_speciality`.`dala_coupon_speciality_date_end` AS `dala_coupon_speciality_date_end`,`dala_coupon_speciality`.`dala_coupon_speciality_multiple` AS `dala_coupon_speciality_multiple`,`dala_coupon_speciality`.`dala_coupon_speciality_status_admin` AS `dala_coupon_speciality_status_admin`,`dala_coupon_speciality`.`dala_coupon_speciality_status_update` AS `dala_coupon_speciality_status_update`,`dala_coupon_speciality`.`dala_coupon_speciality_limit_user` AS `dala_coupon_speciality_limit_user`,`dala_coupon_speciality`.`dala_coupon_speciality_limit_number` AS `dala_coupon_speciality_limit_number`,`dala_coupon_speciality`.`dala_coupon_speciality_qoute` AS `dala_coupon_speciality_qoute`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,(case when ((`dala_coupon_speciality`.`dala_coupon_speciality_date_star` is null) and (`dala_coupon_speciality`.`dala_coupon_speciality_date_end` is null)) then 1 when ((`dala_coupon_speciality`.`dala_coupon_speciality_date_star` is null) and (`dala_coupon_speciality`.`dala_coupon_speciality_date_end` is not null)) then if(((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_end`)) < 0),1,0) when ((`dala_coupon_speciality`.`dala_coupon_speciality_date_star` is not null) and (`dala_coupon_speciality`.`dala_coupon_speciality_date_end` is null)) then if(((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_star`)) < 0),0,1) when ((`dala_coupon_speciality`.`dala_coupon_speciality_date_star` is not null) and (`dala_coupon_speciality`.`dala_coupon_speciality_date_end` is not null)) then (case when ((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_star`)) < 0) then 0 when ((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_star`)) > 0) then if(((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_end`)) < 0),1,0) end) else 100 end) AS `dala_check_expired` from ((`dala_coupon_speciality` left join `dala_stores` on((`dala_coupon_speciality`.`dala_coupon_speciality_stores_id_created` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) ;

-- --------------------------------------------------------

--
-- Structure for view `dala_view_discount_program`
--
DROP TABLE IF EXISTS `dala_view_discount_program`;

DROP VIEW IF EXISTS `dala_view_discount_program`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dala_view_discount_program`  AS  select `dala_discount_program`.`dala_discount_program_ID` AS `dala_discount_program_ID`,`dala_discount_program`.`dala_discount_program_date_created` AS `dala_discount_program_date_created`,`dala_discount_program`.`dala_discount_program_name` AS `dala_discount_program_name`,`dala_discount_program`.`dala_discount_program_store_id_created` AS `dala_discount_program_store_id_created`,`dala_discount_program`.`dala_discount_program_featured_image` AS `dala_discount_program_featured_image`,`dala_discount_program`.`dala_discount_program_price_created` AS `dala_discount_program_price_created`,`dala_discount_program`.`dala_discount_program_price_sale` AS `dala_discount_program_price_sale`,`dala_discount_program`.`dala_discount_program_position` AS `dala_discount_program_position`,`dala_discount_program`.`dala_discount_program_type` AS `dala_discount_program_type`,`dala_discount_program`.`dala_discount_program_time_type` AS `dala_discount_program_time_type`,`dala_discount_program`.`dala_discount_program_status_admin` AS `dala_discount_program_status_admin`,`dala_discount_program`.`dala_discount_program_status_update` AS `dala_discount_program_status_update`,`dala_discount_program`.`dala_discount_program_price_one_day` AS `dala_discount_program_price_one_day`,`dala_discount_program`.`dala_discount_program_price_one_product` AS `dala_discount_program_price_one_product`,`dala_discount_program`.`dala_discount_program_limit_product` AS `dala_discount_program_limit_product`,`dala_discount_program`.`dala_discount_program_limit_day` AS `dala_discount_program_limit_day`,`dala_discount_program`.`dala_discount_program_date_star` AS `dala_discount_program_date_star`,`dala_discount_program`.`dala_discount_program_date_end` AS `dala_discount_program_date_end`,`dala_discount_program`.`dala_discount_program_information` AS `dala_discount_program_information`,`dala_discount_program`.`dala_discount_program_qoute` AS `dala_discount_program_qoute`,(case when (`dala_discount_program`.`dala_discount_program_time_type` = 0) then 1 when (unix_timestamp(`dala_discount_program`.`dala_discount_program_date_end`) < unix_timestamp()) then 1 else 0 end) AS `dala_discount_program_check_expired`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_stores`.`dala_stores_status_admin` AS `dala_stores_status_admin` from ((`dala_discount_program` left join `dala_stores` on((`dala_discount_program`.`dala_discount_program_store_id_created` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) ;

-- --------------------------------------------------------

--
-- Structure for view `dala_view_discount_program_product`
--
DROP TABLE IF EXISTS `dala_view_discount_program_product`;

DROP VIEW IF EXISTS `dala_view_discount_program_product`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dala_view_discount_program_product`  AS  select `dala_discount_program_product_link`.`dala_discount_program_product_link_ID` AS `dala_discount_program_product_link_ID`,`dala_discount_program_product_link`.`dala_discount_program_product_link_date_created` AS `dala_discount_program_product_link_date_created`,`dala_discount_program_product_link`.`dala_discount_program_product_link_discount_program_details_id` AS `dala_discount_program_product_link_discount_program_details_id`,`dala_discount_program_product_link`.`dala_discount_program_product_link_product_speciality_id` AS `dala_discount_program_product_link_product_speciality_id`,`dala_discount_program_product_link`.`dala_discount_program_product_link_status` AS `dala_discount_program_product_link_status`,`dala_discount_program_product_link`.`dala_discount_program_product_link_qoute` AS `dala_discount_program_product_link_qoute`,`dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_products_speciality`.`dala_products_speciality_type` AS `dala_products_speciality_type`,`dala_products_speciality`.`dala_products_speciality_date_created` AS `dala_products_speciality_date_created`,`dala_products_speciality`.`dala_products_speciality_sku` AS `dala_products_speciality_sku`,`dala_products_speciality`.`dala_products_speciality_store_id` AS `dala_products_speciality_store_id`,`dala_products_speciality`.`dala_products_speciality_parent_id` AS `dala_products_speciality_parent_id`,`dala_products_speciality`.`dala_products_speciality_featured_image` AS `dala_products_speciality_featured_image`,`dala_products_speciality`.`dala_products_speciality_image_slider` AS `dala_products_speciality_image_slider`,`dala_products_speciality`.`dala_products_speciality_origin` AS `dala_products_speciality_origin`,`dala_products_speciality`.`dala_products_speciality_contents` AS `dala_products_speciality_contents`,`dala_products_speciality`.`dala_products_speciality_price` AS `dala_products_speciality_price`,`dala_products_speciality`.`dala_products_speciality_sale_of_price` AS `dala_products_speciality_sale_of_price`,`dala_products_speciality`.`dala_products_speciality_date_start` AS `dala_products_speciality_date_start`,`dala_products_speciality`.`dala_products_speciality_date_end` AS `dala_products_speciality_date_end`,`dala_products_speciality`.`dala_products_speciality_stock` AS `dala_products_speciality_stock`,`dala_products_speciality`.`dala_products_speciality_brand` AS `dala_products_speciality_brand`,`dala_products_speciality`.`dala_products_speciality_status_admin` AS `dala_products_speciality_status_admin`,`dala_products_speciality`.`dala_products_speciality_status_store` AS `dala_products_speciality_status_store`,`dala_products_speciality`.`dala_products_speciality_status_update` AS `dala_products_speciality_status_update`,`dala_products_speciality`.`dala_products_speciality_variation_option` AS `dala_products_speciality_variation_option`,`dala_products_speciality`.`dala_products_speciality_excerpt` AS `dala_products_speciality_excerpt`,`dala_products_speciality`.`dala_products_speciality_qoute` AS `dala_products_speciality_qoute`,`dala_products_speciality`.`dala_products_speciality_height` AS `dala_products_speciality_height`,`dala_products_speciality`.`dala_products_speciality_width` AS `dala_products_speciality_width`,`dala_products_speciality`.`dala_products_speciality_length` AS `dala_products_speciality_length`,`dala_products_speciality`.`dala_products_speciality_weight` AS `dala_products_speciality_weight`,`dala_discount_program_details`.`dala_discount_program_details_ID` AS `dala_discount_program_details_ID`,`dala_discount_program_details`.`dala_discount_program_details_date_created` AS `dala_discount_program_details_date_created`,`dala_discount_program_details`.`dala_discount_program_details_discount_program_id` AS `dala_discount_program_details_discount_program_id`,`dala_discount_program_details`.`dala_discount_program_details_store_id` AS `dala_discount_program_details_store_id`,`dala_discount_program_details`.`dala_discount_program_details_status_admin` AS `dala_discount_program_details_status_admin`,`dala_discount_program_details`.`dala_discount_program_details_status_update` AS `dala_discount_program_details_status_update`,`dala_discount_program_details`.`dala_discount_program_details_price` AS `dala_discount_program_details_price`,`dala_discount_program_details`.`dala_discount_program_details_limit_day` AS `dala_discount_program_details_limit_day`,`dala_discount_program_details`.`dala_discount_program_details_limit_product` AS `dala_discount_program_details_limit_product`,`dala_discount_program_details`.`dala_discount_program_details_qoute` AS `dala_discount_program_details_qoute`,`dala_discount_program`.`dala_discount_program_ID` AS `dala_discount_program_ID`,`dala_discount_program`.`dala_discount_program_date_created` AS `dala_discount_program_date_created`,`dala_discount_program`.`dala_discount_program_name` AS `dala_discount_program_name`,`dala_discount_program`.`dala_discount_program_store_id_created` AS `dala_discount_program_store_id_created`,`dala_discount_program`.`dala_discount_program_featured_image` AS `dala_discount_program_featured_image`,`dala_discount_program`.`dala_discount_program_price_created` AS `dala_discount_program_price_created`,`dala_discount_program`.`dala_discount_program_price_sale` AS `dala_discount_program_price_sale`,`dala_discount_program`.`dala_discount_program_position` AS `dala_discount_program_position`,`dala_discount_program`.`dala_discount_program_type` AS `dala_discount_program_type`,`dala_discount_program`.`dala_discount_program_time_type` AS `dala_discount_program_time_type`,`dala_discount_program`.`dala_discount_program_status_admin` AS `dala_discount_program_status_admin`,`dala_discount_program`.`dala_discount_program_status_update` AS `dala_discount_program_status_update`,`dala_discount_program`.`dala_discount_program_price_one_day` AS `dala_discount_program_price_one_day`,`dala_discount_program`.`dala_discount_program_price_one_product` AS `dala_discount_program_price_one_product`,`dala_discount_program`.`dala_discount_program_limit_product` AS `dala_discount_program_limit_product`,`dala_discount_program`.`dala_discount_program_limit_day` AS `dala_discount_program_limit_day`,`dala_discount_program`.`dala_discount_program_date_star` AS `dala_discount_program_date_star`,`dala_discount_program`.`dala_discount_program_date_end` AS `dala_discount_program_date_end`,`dala_discount_program`.`dala_discount_program_information` AS `dala_discount_program_information`,`dala_discount_program`.`dala_discount_program_qoute` AS `dala_discount_program_qoute`,if((`dala_discount_program_details`.`dala_discount_program_details_limit_day` = 0),-(1),(unix_timestamp() - (unix_timestamp(`dala_discount_program_details`.`dala_discount_program_details_date_created`) + (((`dala_discount_program_details`.`dala_discount_program_details_limit_day` * 24) * 60) * 60)))) AS `dala_check_date`,(case when ((`dala_discount_program`.`dala_discount_program_date_star` is null) and (`dala_discount_program`.`dala_discount_program_date_end` is null)) then 1 when ((`dala_discount_program`.`dala_discount_program_date_star` is null) and (`dala_discount_program`.`dala_discount_program_date_end` is not null)) then if(((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_end`)) < 0),1,0) when ((`dala_discount_program`.`dala_discount_program_date_star` is not null) and (`dala_discount_program`.`dala_discount_program_date_end` is null)) then if(((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_star`)) < 0),0,1) when ((`dala_discount_program`.`dala_discount_program_date_star` is not null) and (`dala_discount_program`.`dala_discount_program_date_end` is not null)) then (case when ((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_star`)) < 0) then 0 when ((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_star`)) > 0) then if(((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_end`)) < 0),1,0) end) else 100 end) AS `dala_check_expired`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_stores`.`dala_stores_status_admin` AS `dala_stores_status_admin` from (((((`dala_discount_program_product_link` left join `dala_discount_program_details` on((`dala_discount_program_product_link`.`dala_discount_program_product_link_discount_program_details_id` = `dala_discount_program_details`.`dala_discount_program_details_ID`))) left join `dala_discount_program` on((`dala_discount_program_details`.`dala_discount_program_details_discount_program_id` = `dala_discount_program`.`dala_discount_program_ID`))) left join `dala_products_speciality` on((`dala_discount_program_product_link`.`dala_discount_program_product_link_product_speciality_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_discount_program_details`.`dala_discount_program_details_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) having (`dala_check_date` < 0) ;

-- --------------------------------------------------------

--
-- Structure for view `dala_view_orders_customer`
--
DROP TABLE IF EXISTS `dala_view_orders_customer`;

DROP VIEW IF EXISTS `dala_view_orders_customer`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dala_view_orders_customer`  AS  select `dala_orders_speciality`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_orders_speciality`.`dala_orders_speciality_user_id` AS `dala_orders_speciality_user_id`,`dala_orders_speciality`.`dala_orders_speciality_shipper_id` AS `dala_orders_speciality_shipper_id`,`dala_orders_speciality`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_orders` AS `dala_orders_speciality_status_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_pull_money` AS `dala_orders_speciality_status_pull_money`,`dala_orders_speciality`.`dala_orders_speciality_status_payment` AS `dala_orders_speciality_status_payment`,`dala_orders_speciality`.`dala_orders_speciality_province` AS `dala_orders_speciality_province`,`dala_orders_speciality`.`dala_orders_speciality_district` AS `dala_orders_speciality_district`,`dala_orders_speciality`.`dala_orders_speciality_wards` AS `dala_orders_speciality_wards`,`dala_orders_speciality`.`dala_orders_speciality_adress` AS `dala_orders_speciality_adress`,`dala_orders_speciality`.`dala_orders_speciality_notes` AS `dala_orders_speciality_notes`,`dala_orders_speciality`.`dala_orders_speciality_phone` AS `dala_orders_speciality_phone`,`dala_orders_speciality`.`dala_orders_speciality_name` AS `dala_orders_speciality_name`,`dala_orders_speciality`.`dala_orders_speciality_email` AS `dala_orders_speciality_email`,`dala_orders_speciality`.`dala_orders_speciality_shipping_code` AS `dala_orders_speciality_shipping_code`,`dala_orders_details_speciality`.`dala_orders_details_speciality_ID` AS `dala_orders_details_speciality_ID`,`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` AS `dala_orders_details_speciality_order_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_line_order` AS `dala_orders_details_speciality_line_order`,`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` AS `dala_orders_details_speciality_product_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` AS `dala_orders_details_speciality_qty`,`dala_orders_details_speciality`.`dala_orders_details_speciality_price` AS `dala_orders_details_speciality_price`,`dala_orders_details_speciality`.`dala_orders_details_medium_text` AS `dala_orders_details_medium_text`,(`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` * `dala_orders_details_speciality`.`dala_orders_details_speciality_price`) AS `dala_price_caution`,`dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_products_speciality`.`dala_products_speciality_featured_image` AS `dala_products_speciality_featured_image`,`dala_products_speciality`.`dala_products_speciality_weight` AS `dala_products_speciality_weight`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_stores`.`dala_stores_province` AS `dala_stores_province`,`dala_stores`.`dala_stores_district` AS `dala_stores_district`,`dala_stores`.`dala_stores_wards` AS `dala_stores_wards`,`dala_stores`.`dala_stores_adress` AS `dala_stores_adress`,`dala_stores`.`dala_stores_phone` AS `dala_stores_phone` from ((((`dala_orders_details_speciality` left join `dala_orders_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` = `dala_orders_speciality`.`dala_orders_speciality_ID`))) left join `dala_users` on((`dala_orders_speciality`.`dala_orders_speciality_user_id` = `dala_users`.`dala_users_ID`))) left join `dala_products_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_products_speciality`.`dala_products_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) ;

-- --------------------------------------------------------

--
-- Structure for view `dala_view_orders_users`
--
DROP TABLE IF EXISTS `dala_view_orders_users`;

DROP VIEW IF EXISTS `dala_view_orders_users`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dala_view_orders_users`  AS  select `dala_orders_speciality`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_orders_speciality`.`dala_orders_speciality_user_id` AS `dala_orders_speciality_user_id`,`dala_orders_speciality`.`dala_orders_speciality_store_id` AS `dala_orders_speciality_store_id`,`dala_orders_speciality`.`dala_orders_speciality_shipper_id` AS `dala_orders_speciality_shipper_id`,`dala_orders_speciality`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_orders` AS `dala_orders_speciality_status_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_pull_money` AS `dala_orders_speciality_status_pull_money`,`dala_orders_speciality`.`dala_orders_speciality_status_payment` AS `dala_orders_speciality_status_payment`,`dala_orders_speciality`.`dala_orders_speciality_province` AS `dala_orders_speciality_province`,`dala_orders_speciality`.`dala_orders_speciality_district` AS `dala_orders_speciality_district`,`dala_orders_speciality`.`dala_orders_speciality_wards` AS `dala_orders_speciality_wards`,`dala_orders_speciality`.`dala_orders_speciality_adress` AS `dala_orders_speciality_adress`,`dala_orders_speciality`.`dala_orders_speciality_notes` AS `dala_orders_speciality_notes`,`dala_orders_speciality`.`dala_orders_speciality_phone` AS `dala_orders_speciality_phone`,`dala_orders_speciality`.`dala_orders_speciality_name` AS `dala_orders_speciality_name`,`dala_orders_speciality`.`dala_orders_speciality_email` AS `dala_orders_speciality_email`,`dala_orders_speciality`.`dala_orders_speciality_shipping_code` AS `dala_orders_speciality_shipping_code`,`dala_orders_details_speciality`.`dala_orders_details_speciality_ID` AS `dala_orders_details_speciality_ID`,`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` AS `dala_orders_details_speciality_order_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_line_order` AS `dala_orders_details_speciality_line_order`,`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` AS `dala_orders_details_speciality_product_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` AS `dala_orders_details_speciality_qty`,`dala_orders_details_speciality`.`dala_orders_details_speciality_price` AS `dala_orders_details_speciality_price`,`dala_orders_details_speciality`.`dala_orders_details_medium_text` AS `dala_orders_details_medium_text`,`dala_coupon_speciality`.`dala_coupon_speciality_ID` AS `dala_coupon_speciality_ID`,`dala_coupon_speciality`.`dala_coupon_speciality_date_created` AS `dala_coupon_speciality_date_created`,`dala_coupon_speciality`.`dala_coupon_speciality_code` AS `dala_coupon_speciality_code`,`dala_coupon_speciality`.`dala_coupon_speciality_stores_id_created` AS `dala_coupon_speciality_stores_id_created`,`dala_coupon_speciality`.`dala_coupon_speciality_info` AS `dala_coupon_speciality_info`,`dala_coupon_speciality`.`dala_coupon_speciality_type` AS `dala_coupon_speciality_type`,`dala_coupon_speciality`.`dala_coupon_speciality_formula_price` AS `dala_coupon_speciality_formula_price`,`dala_coupon_speciality`.`dala_coupon_speciality_formula_price_value` AS `dala_coupon_speciality_formula_price_value`,`dala_coupon_speciality`.`dala_coupon_speciality_condition` AS `dala_coupon_speciality_condition`,`dala_coupon_speciality`.`dala_coupon_speciality_condition_value` AS `dala_coupon_speciality_condition_value`,`dala_coupon_speciality`.`dala_coupon_speciality_price_max` AS `dala_coupon_speciality_price_max`,`dala_coupon_speciality`.`dala_coupon_speciality_date_star` AS `dala_coupon_speciality_date_star`,`dala_coupon_speciality`.`dala_coupon_speciality_date_end` AS `dala_coupon_speciality_date_end`,`dala_coupon_speciality`.`dala_coupon_speciality_multiple` AS `dala_coupon_speciality_multiple`,`dala_coupon_speciality`.`dala_coupon_speciality_status_admin` AS `dala_coupon_speciality_status_admin`,`dala_coupon_speciality`.`dala_coupon_speciality_status_update` AS `dala_coupon_speciality_status_update`,`dala_coupon_speciality`.`dala_coupon_speciality_limit_user` AS `dala_coupon_speciality_limit_user`,`dala_coupon_speciality`.`dala_coupon_speciality_limit_number` AS `dala_coupon_speciality_limit_number`,`dala_coupon_speciality`.`dala_coupon_speciality_qoute` AS `dala_coupon_speciality_qoute`,(`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` * `dala_orders_details_speciality`.`dala_orders_details_speciality_price`) AS `dala_price_caution`,`dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name` from (((((`dala_orders_details_speciality` left join `dala_orders_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` = `dala_orders_speciality`.`dala_orders_speciality_ID`))) left join `dala_products_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_orders_speciality`.`dala_orders_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_coupon_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_coupon_speciality`.`dala_coupon_speciality_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) ;

-- --------------------------------------------------------

--
-- Structure for view `dala_view_order_count_product`
--
DROP TABLE IF EXISTS `dala_view_order_count_product`;

DROP VIEW IF EXISTS `dala_view_order_count_product`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dala_view_order_count_product`  AS  select `dala_view_orders_users`.`dala_orders_details_speciality_product_id` AS `dala_orders_details_speciality_product_id`,`dala_view_orders_users`.`dala_users_ID` AS `dala_users_ID`,`dala_view_orders_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_view_orders_users`.`dala_stores_ID` AS `dala_stores_ID`,`dala_view_orders_users`.`dala_stores_name` AS `dala_stores_name`,sum(`dala_view_orders_users`.`dala_orders_details_speciality_qty`) AS `dala_orders_details_speciality_qty` from `dala_view_orders_users` where ((`dala_view_orders_users`.`dala_orders_speciality_status_orders` = 100) and (`dala_view_orders_users`.`dala_orders_details_speciality_line_order` = 'product')) group by `dala_view_orders_users`.`dala_orders_details_speciality_product_id`,`dala_view_orders_users`.`dala_users_ID`,`dala_view_orders_users`.`dala_users_full_name`,`dala_view_orders_users`.`dala_stores_ID`,`dala_view_orders_users`.`dala_stores_name` order by `dala_orders_details_speciality_qty` desc ;

-- --------------------------------------------------------

--
-- Structure for view `dala_view_order_report`
--
DROP TABLE IF EXISTS `dala_view_order_report`;

DROP VIEW IF EXISTS `dala_view_order_report`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dala_view_order_report`  AS  select `dala_view_orders_users`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_view_orders_users`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_view_orders_users`.`dala_stores_ID` AS `dala_stores_ID`,`dala_view_orders_users`.`dala_stores_name` AS `dala_stores_name`,`dala_view_orders_users`.`dala_users_ID` AS `dala_users_ID`,`dala_view_orders_users`.`dala_orders_details_speciality_product_id` AS `dala_orders_details_speciality_product_id`,`dala_view_orders_users`.`dala_orders_details_speciality_line_order` AS `dala_orders_details_speciality_line_order`,`dala_view_orders_users`.`dala_orders_details_speciality_qty` AS `dala_orders_details_speciality_qty`,`dala_view_orders_users`.`dala_orders_details_speciality_price` AS `dala_orders_details_speciality_price`,`dala_view_orders_users`.`dala_price_caution` AS `dala_price_caution` from `dala_view_orders_users` ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dala_adress_meta`
--
ALTER TABLE `dala_adress_meta`
  ADD CONSTRAINT `adress_meta_user_id` FOREIGN KEY (`dala_adress_meta_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_brands`
--
ALTER TABLE `dala_brands`
  ADD CONSTRAINT `brands_stores_id` FOREIGN KEY (`dala_brands_stores_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_category_general_speciality`
--
ALTER TABLE `dala_category_general_speciality`
  ADD CONSTRAINT `category_general_speciality_stores_id` FOREIGN KEY (`dala_category_general_speciality_stores_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_category_general_speciality_link`
--
ALTER TABLE `dala_category_general_speciality_link`
  ADD CONSTRAINT `category_general_speciality_link_category_general_id` FOREIGN KEY (`dala_category_general_speciality_link_category_general_id`) REFERENCES `dala_category_general_speciality` (`dala_category_general_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `category_general_speciality_link_product_id` FOREIGN KEY (`dala_category_general_speciality_link_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dala_category_news_link`
--
ALTER TABLE `dala_category_news_link`
  ADD CONSTRAINT `category_news_link_category_news_id` FOREIGN KEY (`dala_category_news_link_category_news_id`) REFERENCES `dala_category_news` (`dala_category_news_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `category_news_link_news_id` FOREIGN KEY (`dala_category_news_link_news_id`) REFERENCES `dala_news` (`dala_news_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dala_comments_speciality`
--
ALTER TABLE `dala_comments_speciality`
  ADD CONSTRAINT `comments_speciality_product_id` FOREIGN KEY (`dala_comments_speciality_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `comments_speciality_user_id` FOREIGN KEY (`dala_comments_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_coupon_speciality`
--
ALTER TABLE `dala_coupon_speciality`
  ADD CONSTRAINT `coupon_speciality_stores_id_created` FOREIGN KEY (`dala_coupon_speciality_stores_id_created`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_discount_program`
--
ALTER TABLE `dala_discount_program`
  ADD CONSTRAINT `discount_program_store_id_created` FOREIGN KEY (`dala_discount_program_store_id_created`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_discount_program_details`
--
ALTER TABLE `dala_discount_program_details`
  ADD CONSTRAINT `discount_program_details_discount_program_id` FOREIGN KEY (`dala_discount_program_details_discount_program_id`) REFERENCES `dala_discount_program` (`dala_discount_program_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `discount_program_details_store_id` FOREIGN KEY (`dala_discount_program_details_store_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_discount_program_product_link`
--
ALTER TABLE `dala_discount_program_product_link`
  ADD CONSTRAINT `discount_program_product_link_discount_program_details_id` FOREIGN KEY (`dala_discount_program_product_link_discount_program_details_id`) REFERENCES `dala_discount_program_details` (`dala_discount_program_details_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `discount_program_product_link_product_speciality_id` FOREIGN KEY (`dala_discount_program_product_link_product_speciality_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_like_product`
--
ALTER TABLE `dala_like_product`
  ADD CONSTRAINT `like_product_product_id` FOREIGN KEY (`dala_like_product_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `like_product_user_id` FOREIGN KEY (`dala_like_product_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_like_store`
--
ALTER TABLE `dala_like_store`
  ADD CONSTRAINT `like_store_store_id` FOREIGN KEY (`dala_like_store_store_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `like_store_user_id` FOREIGN KEY (`dala_like_store_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_notes`
--
ALTER TABLE `dala_notes`
  ADD CONSTRAINT `notes_user_id` FOREIGN KEY (`dala_notes_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_options_product_speciality`
--
ALTER TABLE `dala_options_product_speciality`
  ADD CONSTRAINT `options_product_speciality_stores_id` FOREIGN KEY (`dala_options_product_speciality_stores_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_options_product_speciality_link`
--
ALTER TABLE `dala_options_product_speciality_link`
  ADD CONSTRAINT `options_product_speciality_link_option_id` FOREIGN KEY (`dala_options_product_speciality_link_option_id`) REFERENCES `dala_options_product_speciality` (`dala_options_product_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_product_speciality_link_product_id` FOREIGN KEY (`dala_options_product_speciality_link_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dala_orders_details_speciality`
--
ALTER TABLE `dala_orders_details_speciality`
  ADD CONSTRAINT `orders_details_speciality_order_id` FOREIGN KEY (`dala_orders_details_speciality_order_id`) REFERENCES `dala_orders_speciality` (`dala_orders_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dala_orders_speciality`
--
ALTER TABLE `dala_orders_speciality`
  ADD CONSTRAINT `orders_speciality_store_id` FOREIGN KEY (`dala_orders_speciality_store_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `orders_speciality_user_id` FOREIGN KEY (`dala_orders_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_products_speciality`
--
ALTER TABLE `dala_products_speciality`
  ADD CONSTRAINT `products_speciality_store_id` FOREIGN KEY (`dala_products_speciality_store_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_reviews_speciality`
--
ALTER TABLE `dala_reviews_speciality`
  ADD CONSTRAINT `reviews_speciality_product_id` FOREIGN KEY (`dala_reviews_speciality_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `reviews_speciality_user_id` FOREIGN KEY (`dala_reviews_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_reviews_store_speciality`
--
ALTER TABLE `dala_reviews_store_speciality`
  ADD CONSTRAINT `reviews_store_speciality_store_id` FOREIGN KEY (`dala_reviews_store_speciality_store_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `reviews_store_speciality_user_id` FOREIGN KEY (`dala_reviews_store_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_shipping_tracking`
--
ALTER TABLE `dala_shipping_tracking`
  ADD CONSTRAINT `shipping_tracking_orders_id` FOREIGN KEY (`dala_shipping_tracking_orders_id`) REFERENCES `dala_orders_speciality` (`dala_orders_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shipping_tracking_users_id` FOREIGN KEY (`dala_shipping_tracking_users_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dala_stores`
--
ALTER TABLE `dala_stores`
  ADD CONSTRAINT `stores_service_type_id` FOREIGN KEY (`dala_stores_service_type_id`) REFERENCES `dala_service_type` (`dala_service_type_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `stores_user_id` FOREIGN KEY (`dala_stores_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_uploads_infomation`
--
ALTER TABLE `dala_uploads_infomation`
  ADD CONSTRAINT `uploads_infomation_user_id` FOREIGN KEY (`dala_uploads_infomation_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_users`
--
ALTER TABLE `dala_users`
  ADD CONSTRAINT `users_users_type_id` FOREIGN KEY (`dala_users_users_type_id`) REFERENCES `dala_users_type` (`dala_users_type_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `dala_users_tracking`
--
ALTER TABLE `dala_users_tracking`
  ADD CONSTRAINT `users_tracking_user_id` FOREIGN KEY (`dala_users_tracking_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 30, 2021 at 09:32 AM
-- Server version: 10.2.37-MariaDB-log-cll-lve
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wwsjvgfp_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `dala_brands`
--

CREATE TABLE `dala_brands` (
  `dala_brands_ID` int(11) NOT NULL,
  `dala_brands_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `dala_brands_featured_image` varchar(2000) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `dala_brands_information` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `dala_brands_excerpt` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_brands_status_stores` int(1) NOT NULL DEFAULT 0,
  `dala_brands_status_admin` int(1) NOT NULL DEFAULT 0,
  `dala_brands_status_update` int(1) NOT NULL DEFAULT 0,
  `dala_brands_stores_id` int(11) NOT NULL,
  `dala_brands_qoute` text COLLATE utf8_unicode_ci NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_general_food_drink`
--

CREATE TABLE `dala_category_general_food_drink` (
  `dala_category_general_food_drink_ID` int(11) NOT NULL,
  `dala_category_general_food_drink_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_category_general_food_drink_name` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_general_food_drink_category_parent_id` int(11) NOT NULL DEFAULT 0,
  `dala_category_general_food_drink_infomation` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_general_food_drink_featured_image` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_general_food_drink_sort_order` int(11) NOT NULL DEFAULT 0,
  `dala_category_general_food_drink_show` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_general_food_drink_link`
--

CREATE TABLE `dala_category_general_food_drink_link` (
  `dala_category_general_food_drink_link_ID` int(11) NOT NULL,
  `dala_category_general_food_drink_link_product_id` int(11) NOT NULL,
  `dala_category_general_food_drink_link_category_general_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_general_speciality`
--

CREATE TABLE `dala_category_general_speciality` (
  `dala_category_general_speciality_ID` int(11) NOT NULL,
  `dala_category_general_speciality_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_category_general_speciality_name` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_general_speciality_category_parent_id` int(11) NOT NULL DEFAULT 0,
  `dala_category_general_speciality_infomation` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_general_speciality_featured_image` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_general_speciality_sort_order` int(11) NOT NULL,
  `dala_category_general_speciality_show` int(1) NOT NULL DEFAULT 0,
  `dala_category_general_speciality_stores_status` int(1) NOT NULL DEFAULT 0,
  `dala_category_general_speciality_stores_id` int(11) NOT NULL,
  `dala_category_general_speciality_update_status` int(1) NOT NULL DEFAULT 0,
  `dala_category_general_speciality_admin_status` int(1) NOT NULL DEFAULT 0,
  `dala_category_general_speciality_qoute` text COLLATE utf8_unicode_ci NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_general_speciality_link`
--

CREATE TABLE `dala_category_general_speciality_link` (
  `dala_category_general_speciality_link_ID` int(11) NOT NULL,
  `dala_category_general_speciality_link_product_id` int(11) NOT NULL,
  `dala_category_general_speciality_link_category_general_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_news`
--

CREATE TABLE `dala_category_news` (
  `dala_category_news_ID` int(11) NOT NULL,
  `dala_category_news_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_category_news_name` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_news_parent_id` int(11) NOT NULL DEFAULT 0,
  `dala_category_news_featured_image` varchar(1000) CHARACTER SET latin1 NOT NULL,
  `dala_category_news_infomation` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_category_news_sort_order` int(11) NOT NULL DEFAULT 0,
  `dala_category_news_show` int(1) NOT NULL DEFAULT 0,
  `dala_category_news_status_admin` int(1) NOT NULL DEFAULT 0,
  `dala_category_news_status_stores` int(1) NOT NULL DEFAULT 0,
  `dala_category_news_status_update` int(1) NOT NULL DEFAULT 0,
  `dala_category_news_stores_id` int(11) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_news_link`
--

CREATE TABLE `dala_category_news_link` (
  `dala_category_news_link_ID` int(11) NOT NULL,
  `dala_category_news_link_news_id` int(11) NOT NULL,
  `dala_category_news_link_category_news_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_comments_food_drink`
--

CREATE TABLE `dala_comments_food_drink` (
  `dala_comments_food_drink_ID` int(11) NOT NULL,
  `dala_comments_food_drink_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_comments_food_drink_user_id` int(11) NOT NULL,
  `dala_comments_food_drink_comment_parent_id` int(11) DEFAULT 0,
  `dala_comments_food_drink_product_id` int(11) NOT NULL,
  `dala_comments_food_drink_contents` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_comments_food_drink_status_store` int(1) NOT NULL DEFAULT 0,
  `dala_comments_food_drink_status_admin` int(11) NOT NULL DEFAULT 0,
  `dala_comments_food_drink_status_update` int(1) NOT NULL DEFAULT 0,
  `dala_comments_food_drink_qoute` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_comments_news`
--

CREATE TABLE `dala_comments_news` (
  `dala_comments_news_ID` int(11) NOT NULL,
  `dala_comments_news_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_comments_news_user_id` int(11) NOT NULL,
  `dala_comments_news_comment_parent_id` int(11) NOT NULL DEFAULT 0,
  `dala_comments_news_news_id` int(11) NOT NULL,
  `dala_comments_news_contents` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_comments_news_status_store` int(1) NOT NULL DEFAULT 0,
  `dala_comments_news_status_admin` int(11) NOT NULL DEFAULT 0,
  `dala_comments_news_status_update` tinyint(1) NOT NULL DEFAULT 0,
  `dala_comments_news_qoute` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_comments_speciality`
--

CREATE TABLE `dala_comments_speciality` (
  `dala_comments_speciality_ID` int(11) NOT NULL,
  `dala_comments_speciality_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_comments_speciality_user_id` int(11) NOT NULL,
  `dala_comments_speciality_comment_parent_id` int(11) DEFAULT 0,
  `dala_comments_speciality_product_id` int(11) NOT NULL,
  `dala_comments_speciality_contents` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_comments_speciality_status_store` tinyint(1) NOT NULL DEFAULT 0,
  `dala_comments_speciality_status_admin` tinyint(1) NOT NULL DEFAULT 0,
  `dala_comments_speciality_status_update` tinyint(1) NOT NULL DEFAULT 0,
  `dala_comments_speciality_qoute` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_coupon_speciality`
--

CREATE TABLE `dala_coupon_speciality` (
  `dala_coupon_speciality_ID` int(11) NOT NULL,
  `dala_coupon_speciality_code` varchar(100) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `dala_coupon_speciality_info` text COLLATE utf8_unicode_ci NOT NULL,
  `dala_coupon_speciality_type` tinyint(1) NOT NULL DEFAULT 0,
  `dala_coupon_speciality_formula` tinyint(1) NOT NULL DEFAULT 0,
  `dala_coupon_speciality_condition` tinyint(1) NOT NULL DEFAULT 0,
  `dala_coupon_speciality_condition_value` double NOT NULL DEFAULT 0,
  `dala_coupon_speciality_price` double NOT NULL,
  `dala_coupon_speciality_price_max` double NOT NULL DEFAULT 0,
  `dala_coupon_speciality_date_star` datetime DEFAULT NULL,
  `dala_coupon_speciality_date_end` datetime DEFAULT NULL,
  `dala_coupon_speciality_qty` int(11) NOT NULL DEFAULT 0,
  `dala_coupon_speciality_multi` int(1) NOT NULL DEFAULT 0,
  `dala_coupon_speciality_status_stores` tinyint(1) NOT NULL DEFAULT 0,
  `dala_coupon_speciality_status_admin` tinyint(1) NOT NULL DEFAULT 0,
  `dala_coupon_speciality_status_update` tinyint(1) NOT NULL DEFAULT 0,
  `dala_coupon_speciality_stores_id` int(11) NOT NULL,
  `dala_coupon_speciality_qoute` text COLLATE utf8_unicode_ci NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_news`
--

CREATE TABLE `dala_news` (
  `dala_news_ID` int(11) NOT NULL,
  `dala_news_title` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_news_user_id` int(11) NOT NULL,
  `dala_news_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_news_category_id` int(11) NOT NULL,
  `dala_news_featured_image` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_news_excerpt` varchar(6000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_news_contents` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `dala_news_status` int(11) NOT NULL DEFAULT 0,
  `dala_news_qoute` text COLLATE utf8_unicode_ci NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_options_product_food_drink`
--

CREATE TABLE `dala_options_product_food_drink` (
  `dala_options_product_food_drink_ID` int(11) NOT NULL,
  `dala_options_product_food_drink_name` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_food_drink_featured_image` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_food_drink_parent_id` int(11) NOT NULL DEFAULT 0,
  `dala_options_product_food_drink_type` int(1) NOT NULL DEFAULT 0,
  `dala_options_product_food_drink_information` varchar(4000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_food_drink_date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_options_product_food_drink_link`
--

CREATE TABLE `dala_options_product_food_drink_link` (
  `dala_options_product_food_drink_link_ID` int(11) NOT NULL,
  `dala_options_product_food_drink_link_product_id` int(11) NOT NULL,
  `dala_options_product_food_drink_link_option_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_options_product_food_drink_link_details`
--

CREATE TABLE `dala_options_product_food_drink_link_details` (
  `dala_options_product_food_drink_link_ID` int(11) NOT NULL,
  `dala_options_product_food_drink_link_options_id` int(11) NOT NULL,
  `dala_options_product_food_drink_link_price` float NOT NULL,
  `dala_options_product_food_drink_link_default_type` int(1) NOT NULL DEFAULT 0,
  `dala_options_product_food_drink_link_images` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_food_drink_link_information` tinytext COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_options_product_speciality`
--

CREATE TABLE `dala_options_product_speciality` (
  `dala_options_product_speciality_ID` int(11) NOT NULL,
  `dala_options_product_speciality_name` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_speciality_featured_image` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_speciality_parent_id` int(11) NOT NULL DEFAULT 0,
  `dala_options_product_speciality_stores_id` int(11) NOT NULL,
  `dala_options_product_speciality_status_stores` tinyint(1) NOT NULL DEFAULT 0,
  `dala_options_product_speciality_status_admin` tinyint(1) NOT NULL DEFAULT 0,
  `dala_options_product_speciality_status_update` tinyint(1) NOT NULL DEFAULT 0,
  `dala_options_product_speciality_information` varchar(4000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_speciality_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_options_product_speciality_qoute` text COLLATE utf8_unicode_ci NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_options_product_speciality_link`
--

CREATE TABLE `dala_options_product_speciality_link` (
  `dala_options_product_speciality_link_ID` int(11) NOT NULL,
  `dala_options_product_speciality_link_product_id` int(11) NOT NULL,
  `dala_options_product_speciality_link_option_id` int(11) NOT NULL,
  `dala_options_product_speciality_link_variation_type` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_orders_details_food_drink`
--

CREATE TABLE `dala_orders_details_food_drink` (
  `dala_orders_details_food_drink_ID` int(11) NOT NULL,
  `dala_orders_details_food_drink_order_id` int(11) NOT NULL,
  `dala_orders_details_food_drink_line_order` char(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_details_food_drink_product_id` int(11) NOT NULL,
  `dala_orders_details_food_drink_qty` int(11) NOT NULL,
  `dala_orders_details_food_drink_price` float NOT NULL,
  `dala_orders_details_food_drink_discount` float NOT NULL DEFAULT 0,
  `dala_orders_details_food_drink_unit_discount` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_orders_details_speciality`
--

CREATE TABLE `dala_orders_details_speciality` (
  `dala_orders_details_speciality_ID` int(11) NOT NULL,
  `dala_orders_details_speciality_order_id` int(11) NOT NULL,
  `dala_orders_details_speciality_line_order` char(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_details_speciality_product_id` int(11) NOT NULL DEFAULT 0,
  `dala_orders_details_speciality_qty` int(11) NOT NULL DEFAULT 0,
  `dala_orders_details_speciality_price` float NOT NULL DEFAULT 0,
  `dala_orders_details_medium_text` varchar(500) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dala_orders_details_speciality_discount` float NOT NULL DEFAULT 0,
  `dala_orders_details_speciality_unit_discount` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_orders_food_drink`
--

CREATE TABLE `dala_orders_food_drink` (
  `dala_orders_food_drink_ID` int(11) NOT NULL,
  `dala_orders_food_drink_user_id` int(11) NOT NULL,
  `dala_orders_food_drink_date_order` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_orders_food_drink_status_order` int(1) NOT NULL DEFAULT 0,
  `dala_orders_food_drink_status_payment` int(1) NOT NULL DEFAULT 0,
  `dala_orders_food_drink_adress` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_food_drink_notes` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_food_drink_phone` char(11) COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_food_drink_email` char(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_orders_speciality`
--

CREATE TABLE `dala_orders_speciality` (
  `dala_orders_speciality_ID` int(11) NOT NULL,
  `dala_orders_speciality_user_id` int(11) NOT NULL,
  `dala_orders_speciality_date_orders` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_orders_speciality_status_orders` int(1) NOT NULL DEFAULT 0,
  `dala_orders_speciality_status_payment` int(1) NOT NULL DEFAULT 0,
  `dala_orders_speciality_adress` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_notes` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_phone` char(11) COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_email` char(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_payment_period`
--

CREATE TABLE `dala_payment_period` (
  `dala_payment_period_ID` int(11) NOT NULL,
  `dala_payment_period_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_payment_period_stores_id` int(11) NOT NULL,
  `dala_payment_period_contents` text COLLATE utf8_unicode_ci NOT NULL,
  `dala_payment_period_payment` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_products_food_drink`
--

CREATE TABLE `dala_products_food_drink` (
  `dala_products_food_drink_ID` int(11) NOT NULL,
  `dala_products_food_drink_name` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_type` int(1) NOT NULL DEFAULT 0,
  `dala_products_food_drink_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_products_food_drink_sku` char(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_store_id` int(11) NOT NULL,
  `dala_products_food_drink_featured_image` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_slider_image` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_contents` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_price` float NOT NULL,
  `dala_products_food_drink_sale_of_price` float DEFAULT NULL,
  `dala_products_food_drink_date_start` datetime DEFAULT NULL,
  `dala_products_food_drink_date_end` datetime DEFAULT NULL,
  `dala_products_food_drink_stock` int(11) DEFAULT NULL,
  `dala_products_food_drink_brand` int(11) NOT NULL DEFAULT 0,
  `dala_products_food_drink_status_store` int(1) NOT NULL DEFAULT 0,
  `dala_products_food_drink_status_admin` int(1) NOT NULL DEFAULT 0,
  `dala_products_food_drink_excerpt` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_discount` float NOT NULL DEFAULT 0,
  `dala_products_food_drink_unit_discount` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_products_speciality`
--

CREATE TABLE `dala_products_speciality` (
  `dala_products_speciality_ID` int(11) NOT NULL,
  `dala_products_speciality_name` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_type` int(1) NOT NULL DEFAULT 0,
  `dala_products_speciality_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_products_speciality_sku` char(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_store_id` int(11) NOT NULL,
  `dala_products_speciality_featured_image` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_image_slider` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_contents` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_price` float NOT NULL,
  `dala_products_speciality_sale_of_price` float DEFAULT NULL,
  `dala_products_speciality_date_start` datetime DEFAULT NULL,
  `dala_products_speciality_date_end` datetime DEFAULT NULL,
  `dala_products_speciality_stock` int(11) DEFAULT NULL,
  `dala_products_speciality_brand` int(11) NOT NULL DEFAULT 0,
  `dala_products_speciality_status_admin` int(1) NOT NULL DEFAULT 0,
  `dala_products_speciality_status_store` int(1) NOT NULL DEFAULT 0,
  `dala_products_speciality_status_update` int(1) NOT NULL DEFAULT 0,
  `dala_products_speciality_variation_option` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_excerpt` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_qoute` text COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_height` int(11) DEFAULT NULL,
  `dala_products_speciality_width` int(11) DEFAULT NULL,
  `dala_products_speciality_length` int(11) DEFAULT NULL,
  `dala_products_speciality_weight` int(11) DEFAULT NULL,
  `dala_products_speciality_discount` float NOT NULL,
  `dala_products_speciality_unit_discount` int(1) NOT NULL DEFAULT 0
) ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_reviews_food_drink`
--

CREATE TABLE `dala_reviews_food_drink` (
  `dala_reviews_food_drink_ID` int(11) NOT NULL,
  `dala_reviews_food_drink_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_reviews_food_drink_user_id` int(11) NOT NULL,
  `dala_reviews_food_drink_product_id` int(11) NOT NULL,
  `dala_reviews_food_drink_contents` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_reviews_food_drink_status_store` int(1) NOT NULL DEFAULT 0,
  `dala_reviews_food_drink_status_admin` int(1) NOT NULL DEFAULT 0,
  `dala_reviews_food_drink_number_star` int(1) NOT NULL DEFAULT 5
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_reviews_speciality`
--

CREATE TABLE `dala_reviews_speciality` (
  `dala_reviews_speciality_ID` int(11) NOT NULL,
  `dala_reviews_speciality_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_reviews_speciality_user_id` int(11) NOT NULL,
  `dala_reviews_speciality_product_id` int(11) NOT NULL,
  `dala_reviews_speciality_contents` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_reviews_speciality_status_store` tinyint(1) NOT NULL DEFAULT 0,
  `dala_reviews_speciality_status_admin` tinyint(1) NOT NULL DEFAULT 0,
  `dala_reviews_speciality_number_star` int(1) NOT NULL DEFAULT 5,
  `dala_reviews_speciality_status_update` tinyint(1) NOT NULL DEFAULT 0,
  `dala_reviews_speciality_qoute` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_service_type`
--

CREATE TABLE `dala_service_type` (
  `dala_service_type_ID` int(11) NOT NULL,
  `dala_service_type_name` char(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_service_type_information` varchar(2000) COLLATE utf8_unicode_ci NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_session_food_drink`
--

CREATE TABLE `dala_session_food_drink` (
  `dala_session_food_drink_ID` int(11) NOT NULL,
  `dala_session_food_drink_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_session_food_drink_line_order` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_session_food_drink_product_id` int(11) NOT NULL,
  `dala_session_food_drink_qty` int(11) NOT NULL,
  `dala_session_food_drink_price` float NOT NULL,
  `dala_session_food_drink_discount` float NOT NULL DEFAULT 0,
  `dala_session_food_drink_unit_discount` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_session_speciality`
--

CREATE TABLE `dala_session_speciality` (
  `dala_session_speciality_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_session_speciality_line_order` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_session_speciality_product_id` int(11) NOT NULL,
  `dala_session_speciality_qty` int(11) NOT NULL,
  `dala_session_speciality_price` float NOT NULL,
  `dala_session_speciality_discount` float NOT NULL DEFAULT 0,
  `dala_session_speciality_unit_discount` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_shipping_food_drink`
--

CREATE TABLE `dala_shipping_food_drink` (
  `dala_shipping_food_drink_ID` int(11) NOT NULL,
  `dala_shipping_food_drink_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_food_drink_parent_id` int(11) NOT NULL DEFAULT 0,
  `dala_shipping_food_drink_information` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_food_drink_price` float DEFAULT NULL,
  `dala_shipping_food_drink_show` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_shipping_speciality`
--

CREATE TABLE `dala_shipping_speciality` (
  `dala_shipping_speciality_ID` int(11) NOT NULL,
  `dala_shipping_speciality_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_speciality_parent_id` int(11) NOT NULL DEFAULT 0,
  `dala_shipping_speciality_information` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_speciality_price` float DEFAULT NULL,
  `dala_shipping_speciality_show` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dala_stores`
--

CREATE TABLE `dala_stores` (
  `dala_stores_ID` int(11) NOT NULL,
  `dala_stores_user_id` int(11) NOT NULL,
  `dala_stores_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_stores_name` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_payment_limit` double NOT NULL,
  `dala_stores_service_type_id` int(11) NOT NULL,
  `dala_stores_adress` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_province` char(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_district` char(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_wards` char(200) COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_phone` char(11) COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_status` int(1) NOT NULL DEFAULT 0,
  `dala_stores_info_banking` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_local_x` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_local_y` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_local_adress` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_qoute` text COLLATE utf8_unicode_ci NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_token`
--

CREATE TABLE `dala_token` (
  `dala_token_ID` int(11) NOT NULL,
  `dala_token_key` varchar(500) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `dala_token_value` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `dala_token_date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dala_token`
--

INSERT INTO `dala_token` (`dala_token_ID`, `dala_token_key`, `dala_token_value`, `dala_token_date_created`) VALUES
(255, 'asasd', 'asdasd', '2021-03-28 17:46:16'),
(256, 'r', 'werwerw', '2021-03-28 17:46:39');

-- --------------------------------------------------------

--
-- Table structure for table `dala_users`
--

CREATE TABLE `dala_users` (
  `dala_users_ID` int(11) NOT NULL,
  `dala_users_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `dala_users_name` char(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `dala_users_password` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_first_name` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_last_name` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_adress` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_phone` char(11) COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_email` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_api_version` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'v1',
  `dala_users_router_version` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'v1',
  `dala_users_view_version` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'v1',
  `dala_users_js_css_version` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'v1',
  `dala_users_users_type_ids` int(1) DEFAULT 3
) ;

-- --------------------------------------------------------

--
-- Table structure for table `dala_users_type`
--

CREATE TABLE `dala_users_type` (
  `dala_users_type_ID` int(11) NOT NULL,
  `dala_users_type_name` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_type_infomation` varchar(4000) COLLATE utf8_unicode_ci NOT NULL
) ;

--
-- Dumping data for table `dala_users_type`
--

INSERT INTO `dala_users_type` (`dala_users_type_ID`, `dala_users_type_name`, `dala_users_type_infomation`) VALUES
(5, 'asdasd', 'asdasd');

-- --------------------------------------------------------

--
-- Stand-in structure for view `dala_view_payment_period`
-- (See below for the actual view)
--
CREATE TABLE `dala_view_payment_period` (
`dala_payment_period_ID` int(1)
,`dala_payment_period_payment` int(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `order_report`
-- (See below for the actual view)
--
CREATE TABLE `order_report` (
`dala_orders_speciality_date_orders` int(1)
,`dala_orders_speciality_ID` int(1)
,`dala_stores_name` int(1)
,`dala_orders_details_speciality_line_order` int(1)
,`dala_orders_details_speciality_price_caution` int(1)
,`dala_orders_details_speciality_discount_caution` int(1)
);

-- --------------------------------------------------------

--
-- Structure for view `dala_view_payment_period`
--
DROP TABLE IF EXISTS `dala_view_payment_period`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dala_view_payment_period`  AS  select 1 AS `dala_payment_period_ID`,1 AS `dala_payment_period_payment` ;

-- --------------------------------------------------------

--
-- Structure for view `order_report`
--
DROP TABLE IF EXISTS `order_report`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `order_report`  AS  select 1 AS `dala_orders_speciality_date_orders`,1 AS `dala_orders_speciality_ID`,1 AS `dala_stores_name`,1 AS `dala_orders_details_speciality_line_order`,1 AS `dala_orders_details_speciality_price_caution`,1 AS `dala_orders_details_speciality_discount_caution` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dala_brands`
--
ALTER TABLE `dala_brands`
  ADD PRIMARY KEY (`dala_brands_ID`),
  ADD KEY `dala_brands_stores_id__` (`dala_brands_stores_id`);

--
-- Indexes for table `dala_category_general_food_drink`
--
ALTER TABLE `dala_category_general_food_drink`
  ADD PRIMARY KEY (`dala_category_general_food_drink_ID`);

--
-- Indexes for table `dala_category_general_food_drink_link`
--
ALTER TABLE `dala_category_general_food_drink_link`
  ADD PRIMARY KEY (`dala_category_general_food_drink_link_ID`);

--
-- Indexes for table `dala_category_general_speciality`
--
ALTER TABLE `dala_category_general_speciality`
  ADD PRIMARY KEY (`dala_category_general_speciality_ID`),
  ADD KEY `dala_category_general_speciality_stores_id___dala_stores_ID` (`dala_category_general_speciality_stores_id`);

--
-- Indexes for table `dala_category_general_speciality_link`
--
ALTER TABLE `dala_category_general_speciality_link`
  ADD PRIMARY KEY (`dala_category_general_speciality_link_ID`),
  ADD KEY `category_general_product_link` (`dala_category_general_speciality_link_product_id`),
  ADD KEY `category_general_link` (`dala_category_general_speciality_link_category_general_id`);

--
-- Indexes for table `dala_category_news`
--
ALTER TABLE `dala_category_news`
  ADD PRIMARY KEY (`dala_category_news_ID`),
  ADD KEY `dala_category_news_stores_id__` (`dala_category_news_stores_id`);

--
-- Indexes for table `dala_category_news_link`
--
ALTER TABLE `dala_category_news_link`
  ADD PRIMARY KEY (`dala_category_news_link_ID`),
  ADD KEY `dala_category_news_link_news_id__dala_news_ID` (`dala_category_news_link_news_id`),
  ADD KEY `dala_category_news_link_category_news_id__	dala_category_news_ID` (`dala_category_news_link_category_news_id`);

--
-- Indexes for table `dala_comments_food_drink`
--
ALTER TABLE `dala_comments_food_drink`
  ADD PRIMARY KEY (`dala_comments_food_drink_ID`),
  ADD KEY `dala_comments_food_drink_user_id__dala_users_ID` (`dala_comments_food_drink_user_id`),
  ADD KEY `dala_comments_food_drink_product_id__ala_products_food_drink_ID` (`dala_comments_food_drink_product_id`);

--
-- Indexes for table `dala_comments_news`
--
ALTER TABLE `dala_comments_news`
  ADD PRIMARY KEY (`dala_comments_news_ID`),
  ADD KEY `dala_comments_news_user_id__dala_users_ID` (`dala_comments_news_user_id`),
  ADD KEY `	dala_comments_news_news_id__dala_news_ID` (`dala_comments_news_news_id`);

--
-- Indexes for table `dala_comments_speciality`
--
ALTER TABLE `dala_comments_speciality`
  ADD PRIMARY KEY (`dala_comments_speciality_ID`),
  ADD KEY `dala_comments_speciality_user_id__dala_users_ID` (`dala_comments_speciality_user_id`),
  ADD KEY `dala_comments_speciality_product_id__dala_products_speciality_ID` (`dala_comments_speciality_product_id`);

--
-- Indexes for table `dala_coupon_speciality`
--
ALTER TABLE `dala_coupon_speciality`
  ADD PRIMARY KEY (`dala_coupon_speciality_ID`),
  ADD KEY `dala_coupon_speciality_stores_id__	dala_stores_ID` (`dala_coupon_speciality_stores_id`);

--
-- Indexes for table `dala_news`
--
ALTER TABLE `dala_news`
  ADD PRIMARY KEY (`dala_news_ID`),
  ADD KEY `dala_news_user_id__dala_users_ID` (`dala_news_user_id`),
  ADD KEY `dala_news_category_iddala_category_news_ID__` (`dala_news_category_id`);

--
-- Indexes for table `dala_options_product_food_drink`
--
ALTER TABLE `dala_options_product_food_drink`
  ADD PRIMARY KEY (`dala_options_product_food_drink_ID`);

--
-- Indexes for table `dala_options_product_food_drink_link`
--
ALTER TABLE `dala_options_product_food_drink_link`
  ADD PRIMARY KEY (`dala_options_product_food_drink_link_ID`);

--
-- Indexes for table `dala_options_product_food_drink_link_details`
--
ALTER TABLE `dala_options_product_food_drink_link_details`
  ADD PRIMARY KEY (`dala_options_product_food_drink_link_ID`);

--
-- Indexes for table `dala_options_product_speciality`
--
ALTER TABLE `dala_options_product_speciality`
  ADD PRIMARY KEY (`dala_options_product_speciality_ID`),
  ADD KEY `dala_options_product_speciality_stores_id__dala_stores_ID` (`dala_options_product_speciality_stores_id`);

--
-- Indexes for table `dala_options_product_speciality_link`
--
ALTER TABLE `dala_options_product_speciality_link`
  ADD PRIMARY KEY (`dala_options_product_speciality_link_ID`),
  ADD KEY `option_speciality_link` (`dala_options_product_speciality_link_option_id`),
  ADD KEY `option_speciality_product` (`dala_options_product_speciality_link_product_id`);

--
-- Indexes for table `dala_orders_details_food_drink`
--
ALTER TABLE `dala_orders_details_food_drink`
  ADD PRIMARY KEY (`dala_orders_details_food_drink_ID`);

--
-- Indexes for table `dala_orders_details_speciality`
--
ALTER TABLE `dala_orders_details_speciality`
  ADD PRIMARY KEY (`dala_orders_details_speciality_ID`);

--
-- Indexes for table `dala_orders_food_drink`
--
ALTER TABLE `dala_orders_food_drink`
  ADD PRIMARY KEY (`dala_orders_food_drink_ID`);

--
-- Indexes for table `dala_orders_speciality`
--
ALTER TABLE `dala_orders_speciality`
  ADD PRIMARY KEY (`dala_orders_speciality_ID`),
  ADD KEY `dala_orders_speciality_user_id__dala_users_ID` (`dala_orders_speciality_user_id`);

--
-- Indexes for table `dala_payment_period`
--
ALTER TABLE `dala_payment_period`
  ADD PRIMARY KEY (`dala_payment_period_ID`),
  ADD KEY `dala_payment_period_stores_id__dala_stores_ID` (`dala_payment_period_stores_id`);

--
-- Indexes for table `dala_products_food_drink`
--
ALTER TABLE `dala_products_food_drink`
  ADD PRIMARY KEY (`dala_products_food_drink_ID`);

--
-- Indexes for table `dala_products_speciality`
--
ALTER TABLE `dala_products_speciality`
  ADD PRIMARY KEY (`dala_products_speciality_ID`),
  ADD KEY `products_speciality_store_id__dala_stores_ID` (`dala_products_speciality_store_id`),
  ADD KEY `products_speciality_brand__brands_ID` (`dala_products_speciality_brand`);

--
-- Indexes for table `dala_reviews_food_drink`
--
ALTER TABLE `dala_reviews_food_drink`
  ADD PRIMARY KEY (`dala_reviews_food_drink_ID`);

--
-- Indexes for table `dala_reviews_speciality`
--
ALTER TABLE `dala_reviews_speciality`
  ADD PRIMARY KEY (`dala_reviews_speciality_ID`),
  ADD KEY `dala_reviews_speciality_user_id__dala_users_ID` (`dala_reviews_speciality_user_id`),
  ADD KEY `dala_reviews_speciality_product_id__dala_products_speciality_ID` (`dala_reviews_speciality_product_id`);

--
-- Indexes for table `dala_service_type`
--
ALTER TABLE `dala_service_type`
  ADD PRIMARY KEY (`dala_service_type_ID`);

--
-- Indexes for table `dala_session_food_drink`
--
ALTER TABLE `dala_session_food_drink`
  ADD PRIMARY KEY (`dala_session_food_drink_ID`);

--
-- Indexes for table `dala_session_speciality`
--
ALTER TABLE `dala_session_speciality`
  ADD PRIMARY KEY (`dala_session_speciality_name`,`dala_session_speciality_line_order`,`dala_session_speciality_product_id`);

--
-- Indexes for table `dala_shipping_food_drink`
--
ALTER TABLE `dala_shipping_food_drink`
  ADD PRIMARY KEY (`dala_shipping_food_drink_ID`);

--
-- Indexes for table `dala_shipping_speciality`
--
ALTER TABLE `dala_shipping_speciality`
  ADD PRIMARY KEY (`dala_shipping_speciality_ID`);

--
-- Indexes for table `dala_stores`
--
ALTER TABLE `dala_stores`
  ADD PRIMARY KEY (`dala_stores_ID`),
  ADD KEY `dala_stores_user_id__	dala_users_ID` (`dala_stores_user_id`),
  ADD KEY `dala_stores_service_type_id__dala_service_type_ID` (`dala_stores_service_type_id`);

--
-- Indexes for table `dala_token`
--
ALTER TABLE `dala_token`
  ADD PRIMARY KEY (`dala_token_ID`);

--
-- Indexes for table `dala_users`
--
ALTER TABLE `dala_users`
  ADD PRIMARY KEY (`dala_users_ID`),
  ADD UNIQUE KEY `users_name_unique` (`dala_users_name`),
  ADD UNIQUE KEY `users_phone_unique` (`dala_users_phone`),
  ADD UNIQUE KEY `dala_users_email` (`dala_users_email`),
  ADD KEY `UsersUsersTypeID_UsersTypeID` (`dala_users_users_type_ids`);

--
-- Indexes for table `dala_users_type`
--
ALTER TABLE `dala_users_type`
  ADD PRIMARY KEY (`dala_users_type_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dala_brands`
--
ALTER TABLE `dala_brands`
  MODIFY `dala_brands_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_category_general_food_drink`
--
ALTER TABLE `dala_category_general_food_drink`
  MODIFY `dala_category_general_food_drink_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `dala_category_general_food_drink_link`
--
ALTER TABLE `dala_category_general_food_drink_link`
  MODIFY `dala_category_general_food_drink_link_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_category_general_speciality`
--
ALTER TABLE `dala_category_general_speciality`
  MODIFY `dala_category_general_speciality_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_category_general_speciality_link`
--
ALTER TABLE `dala_category_general_speciality_link`
  MODIFY `dala_category_general_speciality_link_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=554;

--
-- AUTO_INCREMENT for table `dala_category_news`
--
ALTER TABLE `dala_category_news`
  MODIFY `dala_category_news_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_category_news_link`
--
ALTER TABLE `dala_category_news_link`
  MODIFY `dala_category_news_link_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_comments_food_drink`
--
ALTER TABLE `dala_comments_food_drink`
  MODIFY `dala_comments_food_drink_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_comments_news`
--
ALTER TABLE `dala_comments_news`
  MODIFY `dala_comments_news_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_comments_speciality`
--
ALTER TABLE `dala_comments_speciality`
  MODIFY `dala_comments_speciality_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `dala_coupon_speciality`
--
ALTER TABLE `dala_coupon_speciality`
  MODIFY `dala_coupon_speciality_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_news`
--
ALTER TABLE `dala_news`
  MODIFY `dala_news_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_options_product_food_drink`
--
ALTER TABLE `dala_options_product_food_drink`
  MODIFY `dala_options_product_food_drink_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_options_product_food_drink_link`
--
ALTER TABLE `dala_options_product_food_drink_link`
  MODIFY `dala_options_product_food_drink_link_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_options_product_food_drink_link_details`
--
ALTER TABLE `dala_options_product_food_drink_link_details`
  MODIFY `dala_options_product_food_drink_link_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_options_product_speciality`
--
ALTER TABLE `dala_options_product_speciality`
  MODIFY `dala_options_product_speciality_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_options_product_speciality_link`
--
ALTER TABLE `dala_options_product_speciality_link`
  MODIFY `dala_options_product_speciality_link_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=399;

--
-- AUTO_INCREMENT for table `dala_orders_details_food_drink`
--
ALTER TABLE `dala_orders_details_food_drink`
  MODIFY `dala_orders_details_food_drink_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `dala_orders_details_speciality`
--
ALTER TABLE `dala_orders_details_speciality`
  MODIFY `dala_orders_details_speciality_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- AUTO_INCREMENT for table `dala_orders_food_drink`
--
ALTER TABLE `dala_orders_food_drink`
  MODIFY `dala_orders_food_drink_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dala_orders_speciality`
--
ALTER TABLE `dala_orders_speciality`
  MODIFY `dala_orders_speciality_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `dala_payment_period`
--
ALTER TABLE `dala_payment_period`
  MODIFY `dala_payment_period_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_products_food_drink`
--
ALTER TABLE `dala_products_food_drink`
  MODIFY `dala_products_food_drink_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `dala_products_speciality`
--
ALTER TABLE `dala_products_speciality`
  MODIFY `dala_products_speciality_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_reviews_food_drink`
--
ALTER TABLE `dala_reviews_food_drink`
  MODIFY `dala_reviews_food_drink_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_reviews_speciality`
--
ALTER TABLE `dala_reviews_speciality`
  MODIFY `dala_reviews_speciality_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dala_service_type`
--
ALTER TABLE `dala_service_type`
  MODIFY `dala_service_type_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_session_food_drink`
--
ALTER TABLE `dala_session_food_drink`
  MODIFY `dala_session_food_drink_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_shipping_food_drink`
--
ALTER TABLE `dala_shipping_food_drink`
  MODIFY `dala_shipping_food_drink_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `dala_shipping_speciality`
--
ALTER TABLE `dala_shipping_speciality`
  MODIFY `dala_shipping_speciality_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `dala_stores`
--
ALTER TABLE `dala_stores`
  MODIFY `dala_stores_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_token`
--
ALTER TABLE `dala_token`
  MODIFY `dala_token_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;

--
-- AUTO_INCREMENT for table `dala_users`
--
ALTER TABLE `dala_users`
  MODIFY `dala_users_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dala_users_type`
--
ALTER TABLE `dala_users_type`
  MODIFY `dala_users_type_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dala_brands`
--
ALTER TABLE `dala_brands`
  ADD CONSTRAINT `dala_brands_stores_id__` FOREIGN KEY (`dala_brands_stores_id`) REFERENCES `dala_stores` (`dala_stores_ID`);

--
-- Constraints for table `dala_category_general_speciality`
--
ALTER TABLE `dala_category_general_speciality`
  ADD CONSTRAINT `dala_category_general_speciality_stores_id___dala_stores_ID` FOREIGN KEY (`dala_category_general_speciality_stores_id`) REFERENCES `dala_stores` (`dala_stores_ID`);

--
-- Constraints for table `dala_category_news`
--
ALTER TABLE `dala_category_news`
  ADD CONSTRAINT `dala_category_news_stores_id__` FOREIGN KEY (`dala_category_news_stores_id`) REFERENCES `dala_stores` (`dala_stores_ID`);

--
-- Constraints for table `dala_category_news_link`
--
ALTER TABLE `dala_category_news_link`
  ADD CONSTRAINT `dala_category_news_link_category_news_id__	dala_category_news_ID` FOREIGN KEY (`dala_category_news_link_category_news_id`) REFERENCES `dala_category_news` (`dala_category_news_ID`),
  ADD CONSTRAINT `dala_category_news_link_news_id__dala_news_ID` FOREIGN KEY (`dala_category_news_link_news_id`) REFERENCES `dala_news` (`dala_news_ID`);

--
-- Constraints for table `dala_comments_food_drink`
--
ALTER TABLE `dala_comments_food_drink`
  ADD CONSTRAINT `dala_comments_food_drink_product_id__ala_products_food_drink_ID` FOREIGN KEY (`dala_comments_food_drink_product_id`) REFERENCES `dala_products_food_drink` (`dala_products_food_drink_ID`),
  ADD CONSTRAINT `dala_comments_food_drink_user_id__dala_users_ID` FOREIGN KEY (`dala_comments_food_drink_user_id`) REFERENCES `dala_users` (`dala_users_ID`);

--
-- Constraints for table `dala_comments_news`
--
ALTER TABLE `dala_comments_news`
  ADD CONSTRAINT `	dala_comments_news_news_id__dala_news_ID` FOREIGN KEY (`dala_comments_news_news_id`) REFERENCES `dala_news` (`dala_news_ID`),
  ADD CONSTRAINT `dala_comments_news_user_id__dala_users_ID` FOREIGN KEY (`dala_comments_news_user_id`) REFERENCES `dala_users` (`dala_users_ID`);

--
-- Constraints for table `dala_comments_speciality`
--
ALTER TABLE `dala_comments_speciality`
  ADD CONSTRAINT `dala_comments_speciality_product_id__dala_products_speciality_ID` FOREIGN KEY (`dala_comments_speciality_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`),
  ADD CONSTRAINT `dala_comments_speciality_user_id__dala_users_ID` FOREIGN KEY (`dala_comments_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`);

--
-- Constraints for table `dala_coupon_speciality`
--
ALTER TABLE `dala_coupon_speciality`
  ADD CONSTRAINT `dala_coupon_speciality_stores_id__	dala_stores_ID` FOREIGN KEY (`dala_coupon_speciality_stores_id`) REFERENCES `dala_stores` (`dala_stores_ID`);

--
-- Constraints for table `dala_news`
--
ALTER TABLE `dala_news`
  ADD CONSTRAINT `dala_news_category_iddala_category_news_ID__` FOREIGN KEY (`dala_news_category_id`) REFERENCES `dala_category_news` (`dala_category_news_ID`),
  ADD CONSTRAINT `dala_news_user_id__dala_users_ID` FOREIGN KEY (`dala_news_user_id`) REFERENCES `dala_users` (`dala_users_ID`);

--
-- Constraints for table `dala_options_product_speciality`
--
ALTER TABLE `dala_options_product_speciality`
  ADD CONSTRAINT `dala_options_product_speciality_stores_id__dala_stores_ID` FOREIGN KEY (`dala_options_product_speciality_stores_id`) REFERENCES `dala_stores` (`dala_stores_ID`);

--
-- Constraints for table `dala_options_product_speciality_link`
--
ALTER TABLE `dala_options_product_speciality_link`
  ADD CONSTRAINT `option_speciality_link` FOREIGN KEY (`dala_options_product_speciality_link_option_id`) REFERENCES `dala_options_product_speciality` (`dala_options_product_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `option_speciality_product` FOREIGN KEY (`dala_options_product_speciality_link_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dala_orders_details_speciality`
--
ALTER TABLE `dala_orders_details_speciality`
  ADD CONSTRAINT `dala_orders_details_speciality_order_id__dala_orders_speciality_` FOREIGN KEY (`dala_orders_details_speciality_ID`) REFERENCES `dala_orders_speciality` (`dala_orders_speciality_ID`);

--
-- Constraints for table `dala_orders_speciality`
--
ALTER TABLE `dala_orders_speciality`
  ADD CONSTRAINT `dala_orders_speciality_user_id__dala_users_ID` FOREIGN KEY (`dala_orders_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`);

--
-- Constraints for table `dala_payment_period`
--
ALTER TABLE `dala_payment_period`
  ADD CONSTRAINT `dala_payment_period_stores_id__dala_stores_ID` FOREIGN KEY (`dala_payment_period_stores_id`) REFERENCES `dala_stores` (`dala_stores_ID`);

--
-- Constraints for table `dala_products_speciality`
--
ALTER TABLE `dala_products_speciality`
  ADD CONSTRAINT `products_speciality_brand__brands_ID` FOREIGN KEY (`dala_products_speciality_brand`) REFERENCES `dala_brands` (`dala_brands_ID`),
  ADD CONSTRAINT `products_speciality_store_id__dala_stores_ID` FOREIGN KEY (`dala_products_speciality_store_id`) REFERENCES `dala_stores` (`dala_stores_ID`);

--
-- Constraints for table `dala_reviews_speciality`
--
ALTER TABLE `dala_reviews_speciality`
  ADD CONSTRAINT `dala_reviews_speciality_product_id__dala_products_speciality_ID` FOREIGN KEY (`dala_reviews_speciality_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`),
  ADD CONSTRAINT `dala_reviews_speciality_user_id__dala_users_ID` FOREIGN KEY (`dala_reviews_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`);

--
-- Constraints for table `dala_stores`
--
ALTER TABLE `dala_stores`
  ADD CONSTRAINT `dala_stores_service_type_id__dala_service_type_ID` FOREIGN KEY (`dala_stores_service_type_id`) REFERENCES `dala_service_type` (`dala_service_type_ID`),
  ADD CONSTRAINT `dala_stores_user_id__	dala_users_ID` FOREIGN KEY (`dala_stores_user_id`) REFERENCES `dala_users` (`dala_users_ID`);

--
-- Constraints for table `dala_users`
--
ALTER TABLE `dala_users`
  ADD CONSTRAINT `UsersUsersTypeID_UsersTypeID` FOREIGN KEY (`dala_users_users_type_ids`) REFERENCES `dala_users_type` (`dala_users_type_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

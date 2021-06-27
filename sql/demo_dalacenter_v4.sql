SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo`
--






-- --------------------------------------------------------

--
-- Table structure for table `dala_brands`
--

DROP TABLE IF EXISTS `dala_brands`;
CREATE TABLE IF NOT EXISTS `dala_brands` (
  `dala_brands_ID` int NOT NULL AUTO_INCREMENT,
  `dala_brands_date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  
  `dala_brands_name` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_brands_featured_image` varchar(2000) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `dala_brands_information` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_brands_excerpt` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_brands_status_stores` int NOT NULL DEFAULT '0',
  `dala_brands_status_admin` int NOT NULL DEFAULT '0',
  `dala_brands_status_update` int NOT NULL DEFAULT '0',
  `dala_brands_stores_id` int NOT NULL,
  `dala_brands_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_brands_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1;





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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1;

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
  PRIMARY KEY (`dala_category_general_speciality_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `dala_category_general_speciality_link`
--

DROP TABLE IF EXISTS `dala_category_general_speciality_link`;
CREATE TABLE IF NOT EXISTS `dala_category_general_speciality_link` (
  `dala_category_general_speciality_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_category_general_speciality_link_product_id` int NOT NULL,
  `dala_category_general_speciality_link_category_general_id` int NOT NULL,
  PRIMARY KEY (`dala_category_general_speciality_link_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- --------------------------------------------------------





--
-- Table structure for table `dala_shipping_tracking`
--

DROP TABLE IF EXISTS `dala_shipping_tracking`;
CREATE TABLE IF NOT EXISTS `dala_shipping_tracking` (
  `dala_shipping_tracking_ID` int NOT NULL AUTO_INCREMENT,
  `dala_shipping_tracking_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_shipping_tracking_users_id` int NOT NULL ,
  `dala_shipping_tracking_orders_id` int NOT NULL ,
  `dala_shipping_tracking_infomation` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_tracking_orders_status` tinyint(1) NOT NULL,
  `dala_shipping_tracking_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_shipping_tracking_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- --------------------------------------------------------












--
-- Table structure for table `dala_category_news_link`
--

DROP TABLE IF EXISTS `dala_category_news_link`;
CREATE TABLE IF NOT EXISTS `dala_category_news_link` (
  `dala_category_news_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_category_news_link_news_id` int NOT NULL,
  `dala_category_news_link_category_news_id` int NOT NULL,
  PRIMARY KEY (`dala_category_news_link_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
  `dala_comments_speciality_status_store` tinyint(1) NOT NULL DEFAULT '0',
  `dala_comments_speciality_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_comments_speciality_status_update` tinyint(1) NOT NULL DEFAULT '0',
  `dala_comments_speciality_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_comments_speciality_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `dala_coupon_speciality`
--

DROP TABLE IF EXISTS `dala_coupon_speciality`;
CREATE TABLE IF NOT EXISTS `dala_coupon_speciality` (
  `dala_coupon_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_coupon_speciality_code` varchar(100) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `dala_coupon_speciality_info` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_coupon_speciality_type` tinyint(1) NOT NULL DEFAULT '0',
  `dala_coupon_speciality_formula` tinyint(1) NOT NULL DEFAULT '0',
  `dala_coupon_speciality_condition` tinyint(1) NOT NULL DEFAULT '0',
  `dala_coupon_speciality_condition_value` double NOT NULL DEFAULT '0',
  `dala_coupon_speciality_price` double NOT NULL,
  `dala_coupon_speciality_price_max` double NOT NULL DEFAULT '0',
  `dala_coupon_speciality_date_star` datetime DEFAULT NULL,
  `dala_coupon_speciality_date_end` datetime DEFAULT NULL,
  `dala_coupon_speciality_qty` int NOT NULL DEFAULT '0',
  `dala_coupon_speciality_multi` int NOT NULL DEFAULT '0',
  `dala_coupon_speciality_status_stores` tinyint(1) NOT NULL DEFAULT '0',
  `dala_coupon_speciality_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_coupon_speciality_status_update` tinyint(1) NOT NULL DEFAULT '0',
  `dala_coupon_speciality_stores_id` int NOT NULL,
  `dala_coupon_speciality_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_coupon_speciality_ID`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
  PRIMARY KEY (`dala_options_product_speciality_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
  PRIMARY KEY (`dala_options_product_speciality_link_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
  PRIMARY KEY (`dala_orders_details_speciality_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `dala_orders_speciality`
--

DROP TABLE IF EXISTS `dala_orders_speciality`;
CREATE TABLE IF NOT EXISTS `dala_orders_speciality` (
  `dala_orders_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_orders_speciality_user_id` int NOT NULL,
  `dala_orders_speciality_date_orders` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_orders_speciality_status_orders` tinyint(1) NOT NULL DEFAULT '0',
  `dala_orders_speciality_status_payment` tinyint(1) NOT NULL DEFAULT '0',
  `dala_orders_speciality_adress` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_notes` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_phone` char(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_email` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_shipping_code` VARCHAR(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_orders_speciality_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
  `dala_products_food_drink_status_store` int NOT NULL DEFAULT '0',
  `dala_products_food_drink_status_admin` int NOT NULL DEFAULT '0',
  `dala_products_food_drink_excerpt` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_food_drink_discount` float NOT NULL DEFAULT '0',
  `dala_products_food_drink_unit_discount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_products_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
  `dala_products_speciality_featured_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_image_slider` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_contents` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_products_speciality_price` float NOT NULL,
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
  PRIMARY KEY (`dala_products_speciality_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
  PRIMARY KEY (`dala_reviews_speciality_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `dala_shipping_speciality`
--

DROP TABLE IF EXISTS `dala_shipping_speciality`;
CREATE TABLE IF NOT EXISTS `dala_shipping_speciality` (
  `dala_shipping_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_shipping_speciality_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_speciality_parent_id` int NOT NULL DEFAULT '0',
  `dala_shipping_speciality_information` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_speciality_price` float DEFAULT NULL,
  `dala_shipping_speciality_show` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_shipping_speciality_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
  `dala_stores_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_stores_status_stores` tinyint(1) NOT NULL DEFAULT '0',
  `dala_stores_info_banking` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_local_x` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_local_y` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_local_adress` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_status_update` tinyint(1) NOT NULL DEFAULT '0',
  `dala_stores_payment_methods` tinyint(1) NOT NULL DEFAULT '0',
  `dala_stores_payment_time` tinyint(1) NOT NULL DEFAULT '28',
  `dala_stores_upload_limit_day` smallint UNSIGNED NOT NULL DEFAULT '20',
  `dala_stores_upload_limit_month` smallint UNSIGNED NOT NULL DEFAULT '300',
  PRIMARY KEY (`dala_stores_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `dala_token`
--

DROP TABLE IF EXISTS `dala_token`;
CREATE TABLE IF NOT EXISTS `dala_token` (
  `dala_token_ID` int NOT NULL AUTO_INCREMENT,
  `dala_token_key` varchar(500) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `dala_token_value` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_token_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`dala_token_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `dala_uploads_infomation`
--

DROP TABLE IF EXISTS `dala_uploads_infomation`;
CREATE TABLE IF NOT EXISTS `dala_uploads_infomation` (
  `dala_uploads_infomation_ID` int NOT NULL AUTO_INCREMENT,
  `dala_uploads_infomation_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_uploads_infomation_stores_id` int NOT NULL,
  `dala_uploads_infomation_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_uploads_infomation_ip` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_uploads_infomation_ID`),
  KEY `dala_uploads_infomation_stores_id__ dala_stores_ID` (`dala_uploads_infomation_stores_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
  `dala_users_verification_status` tinyint(1) NOT NULL DEFAULT '0',
  `dala_users_verification_code` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_verification_time` datetime DEFAULT NULL,
  PRIMARY KEY (`dala_users_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;


-- ---------------------------------------------------------------------------





--
-- Table structure for table `dala_adress_meta`
--

DROP TABLE IF EXISTS `dala_adress_meta`;
CREATE TABLE IF NOT EXISTS `dala_adress_meta` (
  `dala_adress_meta_ID` int NOT NULL AUTO_INCREMENT,
  `dala_adress_meta_date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  
  `dala_adress_meta_user_id` int NOT NULL,
  `dala_adress_meta_province` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_adress_meta_district` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_adress_meta_wards` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_adress_meta_street` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_adress_meta_full_adress` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,   
  `dala_adress_meta_status` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_adress_meta_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1;


-- ------------------------------------------------------------------




















-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

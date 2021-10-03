-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: dalacenter4
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `dala_adress_meta`
--

LOCK TABLES `dala_adress_meta` WRITE;
/*!40000 ALTER TABLE `dala_adress_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_adress_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_brands`
--

LOCK TABLES `dala_brands` WRITE;
/*!40000 ALTER TABLE `dala_brands` DISABLE KEYS */;
INSERT INTO `dala_brands` VALUES (1,'2021-07-22 16:32:02','Nông lâm food','','','',1,1,1,17,''),(2,'2021-07-22 16:32:16','BerryLand','','','',1,1,1,17,''),(3,'2021-07-22 16:32:41','Ladophar','','','',1,1,1,17,''),(4,'2021-07-22 16:32:56','Biofresh','','','',1,1,1,17,''),(5,'2021-07-22 16:33:12','Dalat Natural Food','','','',1,1,1,17,''),(6,'2021-07-22 16:33:36','Quốc Lộc Coffee','','','',1,1,1,17,''),(7,'2021-07-22 16:34:01','BaolocReal coffee','','','',1,1,1,17,'');
/*!40000 ALTER TABLE `dala_brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_category_general_food_drink`
--

LOCK TABLES `dala_category_general_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_category_general_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_category_general_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_category_general_food_drink_link`
--

LOCK TABLES `dala_category_general_food_drink_link` WRITE;
/*!40000 ALTER TABLE `dala_category_general_food_drink_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_category_general_food_drink_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_category_general_speciality`
--

LOCK TABLES `dala_category_general_speciality` WRITE;
/*!40000 ALTER TABLE `dala_category_general_speciality` DISABLE KEYS */;
INSERT INTO `dala_category_general_speciality` VALUES (1,'2021-07-22 16:42:57','Mứt Đà Lạt',0,'','https://appdala.net/wp-content/uploads/mut-da-lat.jpg',0,0,1,17,1,1,0,''),(2,'2021-07-22 16:43:51','Trái cây sấy dẻo',0,'','https://appdala.net/wp-content/uploads/Cam-say-deo-mieng-dd.png',0,0,1,17,1,1,0,''),(3,'2021-07-22 16:44:36','Trái cây sấy giòn',0,'','https://appdala.net/wp-content/uploads/da3728fda069e59045a35f2690f54473.jpg',0,0,1,17,1,1,0,''),(4,'2021-07-22 16:45:30','Trà Đà Lạt',0,'','https://appdala.net/wp-content/uploads/bbb414fce57effb6f515f645dba86d93.jpg',0,0,1,17,1,1,0,''),(5,'2021-07-22 16:47:02','Cà phê Đà Lạt',0,'','https://appdala.net/wp-content/uploads/34a9337cfaed3db1a2774372d437736e.jpg',0,0,1,17,1,1,0,''),(6,'2021-07-22 16:47:51','Thảo mộc các loại',0,'','https://appdala.net/wp-content/uploads/3cdda630132c82aaf892d1f884467b31.jpg_720x720q80.jpg_.webp',0,0,1,17,1,1,0,''),(7,'2021-07-22 16:48:51','Nước ép siro trái cây',0,'','https://appdala.net/wp-content/uploads/2ece254fbcda49414fdf897a175e75ae.png',0,0,1,17,1,1,0,''),(8,'2021-07-22 16:50:39','Nông sản sạch đà lạt',0,'','https://appdala.net/wp-content/uploads/21881afa49d23f9683a73615771d0464.jpg',0,0,1,17,1,1,0,''),(9,'2021-07-22 16:53:44','Kẹo dẻo',1,'','https://appdala.net/wp-content/uploads/images-5.jpg',0,0,1,17,1,1,0,''),(10,'2021-07-22 16:55:04','Mứt Atiso',1,'','https://appdala.net/wp-content/uploads/cach-lam-mut-atiso.jpg',0,0,1,17,1,1,0,''),(11,'2021-07-22 16:55:36','Mứt Chanh dây',1,'','https://appdala.net/wp-content/uploads/mut-chanh-day-1.jpg',0,0,1,17,1,1,0,''),(12,'2021-07-22 16:56:56','Bưởi sấy dẻo',2,'','https://appdala.net/wp-content/uploads/Vo-buoi-say-deo-5.png',0,0,1,17,1,1,0,''),(13,'2021-07-22 16:57:43','Cam sấy dẻo',2,'','https://appdala.net/wp-content/uploads/Cam-say-deo-mieng-dd-1.png',0,0,1,17,1,1,0,''),(14,'2021-07-22 16:58:34','Chuối sấy dẻo',2,'','https://appdala.net/wp-content/uploads/Chuoi-say-gion-2.png',0,0,1,17,1,1,0,''),(15,'2021-07-22 17:00:24','Dâu tây sấy dẻo',2,'','https://appdala.net/wp-content/uploads/78172ebc76c0f9bb2d29b7250fd63957.jpg',0,0,1,17,1,1,0,''),(16,'2021-07-22 17:01:14','Hồng sấy dẻo',2,'','https://appdala.net/wp-content/uploads/Quat-deo.png',0,0,1,17,1,1,0,''),(17,'2021-07-22 17:02:17','Mãng cầu sấy dẻo',2,'','https://appdala.net/wp-content/uploads/mang-cau-say.jpg',0,0,1,17,1,1,0,''),(18,'2021-07-22 17:07:35','Chuối sấy giòn',3,'','https://appdala.net/wp-content/uploads/2e9b4494388685cb3c627da9cf9781db.jpg_720x720q80.jpg_.webp',0,0,1,17,1,1,0,''),(19,'2021-07-22 17:09:29','Khoai lang sấy giòn',3,'','https://appdala.net/wp-content/uploads/khoai-lang.jpg',0,0,1,17,1,1,0,''),(20,'2021-07-22 17:10:09','Mít sấy giòn',3,'','https://appdala.net/wp-content/uploads/Mit-say-gion.jpg',0,0,1,17,1,1,0,''),(21,'2021-07-22 22:48:57','Thập cẩm sấy giòn',3,'','https://appdala.net/wp-content/uploads/4b8ee6587c99d0b270a16cb10672b32b-2.jpg',0,0,1,17,1,1,0,''),(22,'2021-07-22 22:50:47','Trà Atiso',4,'','https://appdala.net/wp-content/uploads/tra-atiso-dalat-4.jpg',0,0,1,17,1,1,0,''),(23,'2021-07-22 22:51:31','Trà Linh Chi',4,'','https://appdala.net/wp-content/uploads/tra-linh-chi-thuc-uong-giai-khat-va-phong-benh-hieu-qua1506907162.jpg',0,0,1,17,1,1,0,''),(24,'2021-07-22 22:52:12','Trà túi lọc',4,'','https://appdala.net/wp-content/uploads/Tra-tui-loc-1.jpg',0,0,1,17,1,1,0,''),(25,'2021-07-22 22:54:48','Cao đặt actiso',6,'','https://appdala.net/wp-content/uploads/cao_dac_22_new_768ae69b77804b74abc8c4bbe889d5dc_large.jpg',0,0,1,17,1,1,0,''),(26,'2021-07-22 22:55:37','Cao uống actiso',6,'','https://appdala.net/wp-content/uploads/3d_ladoactiso_cao_ong_co_duong_master_new_fcbe512fceda499abb1755d22c48ac07_large.jpg',0,0,1,17,1,1,0,''),(27,'2021-07-22 22:57:44','Các loại hạt',8,'','https://appdala.net/wp-content/uploads/hat-macca-lam-dong.jpg',0,0,1,17,1,1,0,''),(28,'2021-07-22 22:58:37','Gạo nếp',8,'','https://appdala.net/wp-content/uploads/tai-xuong.jpg',0,0,1,17,1,1,0,'');
/*!40000 ALTER TABLE `dala_category_general_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_category_general_speciality_link`
--

LOCK TABLES `dala_category_general_speciality_link` WRITE;
/*!40000 ALTER TABLE `dala_category_general_speciality_link` DISABLE KEYS */;
INSERT INTO `dala_category_general_speciality_link` VALUES (83,18,8),(84,18,27),(85,13,6),(86,13,25),(87,12,4),(88,12,22),(91,11,3),(92,11,18),(93,10,2),(94,10,15),(95,9,2),(96,9,14),(97,8,2),(98,8,13),(99,7,2),(100,7,12),(101,6,1),(102,6,11),(103,5,1),(104,5,9),(105,4,1),(106,4,10),(107,3,1),(108,3,9);
/*!40000 ALTER TABLE `dala_category_general_speciality_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_category_news`
--

LOCK TABLES `dala_category_news` WRITE;
/*!40000 ALTER TABLE `dala_category_news` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_category_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_category_news_link`
--

LOCK TABLES `dala_category_news_link` WRITE;
/*!40000 ALTER TABLE `dala_category_news_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_category_news_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_comments_food_drink`
--

LOCK TABLES `dala_comments_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_comments_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_comments_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_comments_news`
--

LOCK TABLES `dala_comments_news` WRITE;
/*!40000 ALTER TABLE `dala_comments_news` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_comments_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_comments_speciality`
--

LOCK TABLES `dala_comments_speciality` WRITE;
/*!40000 ALTER TABLE `dala_comments_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_comments_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_coupon_speciality`
--

LOCK TABLES `dala_coupon_speciality` WRITE;
/*!40000 ALTER TABLE `dala_coupon_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_coupon_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_discount_program`
--

LOCK TABLES `dala_discount_program` WRITE;
/*!40000 ALTER TABLE `dala_discount_program` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_discount_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_discount_program_details`
--

LOCK TABLES `dala_discount_program_details` WRITE;
/*!40000 ALTER TABLE `dala_discount_program_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_discount_program_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_discount_program_product_link`
--

LOCK TABLES `dala_discount_program_product_link` WRITE;
/*!40000 ALTER TABLE `dala_discount_program_product_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_discount_program_product_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_like_product`
--

LOCK TABLES `dala_like_product` WRITE;
/*!40000 ALTER TABLE `dala_like_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_like_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_like_store`
--

LOCK TABLES `dala_like_store` WRITE;
/*!40000 ALTER TABLE `dala_like_store` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_like_store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_news`
--

LOCK TABLES `dala_news` WRITE;
/*!40000 ALTER TABLE `dala_news` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_notes`
--

LOCK TABLES `dala_notes` WRITE;
/*!40000 ALTER TABLE `dala_notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_options_product_food_drink`
--

LOCK TABLES `dala_options_product_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_options_product_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_options_product_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_options_product_food_drink_link`
--

LOCK TABLES `dala_options_product_food_drink_link` WRITE;
/*!40000 ALTER TABLE `dala_options_product_food_drink_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_options_product_food_drink_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_options_product_food_drink_link_details`
--

LOCK TABLES `dala_options_product_food_drink_link_details` WRITE;
/*!40000 ALTER TABLE `dala_options_product_food_drink_link_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_options_product_food_drink_link_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_options_product_speciality`
--

LOCK TABLES `dala_options_product_speciality` WRITE;
/*!40000 ALTER TABLE `dala_options_product_speciality` DISABLE KEYS */;
INSERT INTO `dala_options_product_speciality` VALUES (1,'Màu sắc','',0,17,1,1,1,'','2021-07-22 16:36:47',''),(2,'Kích thước','',0,17,1,1,1,'','2021-07-22 16:37:00',''),(3,'Loại hộp','',0,17,1,1,1,'','2021-07-22 16:37:21',''),(4,'màu xanh','',1,17,1,1,1,'','2021-07-22 16:38:56',''),(5,'Màu đỏ','',1,17,1,1,1,'','2021-07-22 16:39:06',''),(6,'Màu đen','',1,17,1,1,1,'','2021-07-22 16:39:21',''),(7,'Màu trắng','',1,17,1,1,1,'','2021-07-22 16:39:30',''),(8,'Size lớn','',2,17,1,1,1,'','2021-07-22 16:39:44',''),(9,'Size nhỏ','',2,17,1,1,1,'','2021-07-22 16:39:53',''),(10,'Hộp lớn','',3,17,1,1,1,'','2021-07-22 16:40:06',''),(11,'Hộp nhỏ','',3,17,1,1,1,'','2021-07-22 16:40:15','');
/*!40000 ALTER TABLE `dala_options_product_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_options_product_speciality_link`
--

LOCK TABLES `dala_options_product_speciality_link` WRITE;
/*!40000 ALTER TABLE `dala_options_product_speciality_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_options_product_speciality_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_orders_details_food_drink`
--

LOCK TABLES `dala_orders_details_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_orders_details_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_orders_details_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_orders_details_speciality`
--

LOCK TABLES `dala_orders_details_speciality` WRITE;
/*!40000 ALTER TABLE `dala_orders_details_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_orders_details_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_orders_food_drink`
--

LOCK TABLES `dala_orders_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_orders_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_orders_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_orders_speciality`
--

LOCK TABLES `dala_orders_speciality` WRITE;
/*!40000 ALTER TABLE `dala_orders_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_orders_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_payment_period`
--

LOCK TABLES `dala_payment_period` WRITE;
/*!40000 ALTER TABLE `dala_payment_period` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_payment_period` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_products_food_drink`
--

LOCK TABLES `dala_products_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_products_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_products_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_products_speciality`
--

LOCK TABLES `dala_products_speciality` WRITE;
/*!40000 ALTER TABLE `dala_products_speciality` DISABLE KEYS */;
INSERT INTO `dala_products_speciality` VALUES (3,'Kẹo Dẻo Actisô Galaxy Ladophar – Gói 80g',0,'2021-07-23 08:45:29','3M',17,0,'https://appdala.net/wp-content/uploads/keodeo1-4.jpg','https://appdala.net/wp-content/uploads/keodeo2-3.jpg;https://appdala.net/wp-content/uploads/keodeo1-5.jpg;https://appdala.net/wp-content/uploads/keodeo3-1.jpg','','<div style=\"text-align: center;\"><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 24px; font-weight: bold; text-align: center; background-color: #ffffff;\">KẸO DẺO ACTISO<br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/keodeo1-3.jpg\" alt=\"\" width=\"300\" height=\"300\" /></span>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kẹo dẻo actiso được chế biến từ cao hoa actiso, mang m&agrave;u n&acirc;u đặc trưng, dai dai, ngọt ngọt, l&agrave; m&oacute;n ăn vặt cực k&igrave; y&ecirc;u th&iacute;ch kh&ocirc;ng chỉ ri&ecirc;ng c&aacute;c em nhỏ m&agrave; người lớn cũng m&ecirc;.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kẹo dẻo actiso mang hương vị Actiso tự nhi&ecirc;n, thơm ngon, c&ograve;n bổ sung dưỡng chất, c&oacute; &iacute;ch cho sức khỏe.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kẹo dẻo actiso lu&ocirc;n đảm bảo về chất lượng, l&agrave; sản phẩm an to&agrave;n cho người ti&ecirc;u d&ugrave;ng.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/keodeo2-2.jpg\" alt=\"\" width=\"300\" height=\"300\" /><br /></span></p>\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\">\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Th&agrave;nh phần</strong>: Cao hoa actiso 5%, đường, mạch nha, gelatin, pectin, acid citric.</span></li>\n</ul>\n</ul>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kh&ocirc;ng sử dụng chất bảo quản.</span></p>\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\">\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\">\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">KLT</strong>: 80g</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Hạn sử dụng</strong>: 1 năm.</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Hướng dẫn sử dụng</strong>: D&ugrave;ng trực tiếp sau khi mở bao b&igrave;. Đ&oacute;ng k&iacute;n sau mỗi lần sử dụng.</span></li>\n</ul>\n</ul>\n</ul>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Bảo quản nơi kh&ocirc; r&aacute;o, tr&aacute;nh &aacute;nh nắng trực tiếp.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kh&ocirc;ng sử dụng sản phẩm khi c&oacute; dấu diệu ẩm mốc, xuất hiện m&ugrave;i lạ.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff; text-align: left;\"><em style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Sản phẩm được ph&acirc;n phối bởi Dala.vn.</span></strong></em></p>\n</div>',35000,32000,NULL,NULL,NULL,3,1,1,1,'','','',NULL,NULL,NULL,80),(4,'Mứt hoa Atiso đỏ đặc biệt, ngon-150gr',0,'2021-07-23 08:50:45','4YE',17,0,'https://appdala.net/wp-content/uploads/muthoaatisodo-1.jpg','https://appdala.net/wp-content/uploads/muthoaatisodo-2.jpg;https://appdala.net/wp-content/uploads/Hoa-Atiso-Do-4-1.png;https://appdala.net/wp-content/uploads/images-1-2.jpg','','<img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/muthoaatisodo.jpg\" alt=\"\" width=\"300\" height=\"300\" />\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">Lo&agrave;i Hoa atiso đỏ rất gi&agrave;u dinh dưỡng, ngo&agrave;i ra hoa c&ograve;n chứa c&aacute;c axit v&agrave; protein, vitamin C c&ugrave;ng những chất c&oacute; t&iacute;nh kh&aacute;ng sinh kh&aacute;c. Hạt atiso đỏ chứa 7,6% nước, 22,3% dầu, 24% protein, 13,5% chất xơ v&agrave; 7% chất kho&aacute;ng.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">Theo một số nghi&ecirc;n cứu, trong th&agrave;nh phần dầu hạt hoa atiso đỏ c&oacute; t&aacute;c dụng chống nấm v&agrave; bệnh ngo&agrave;i da. Vitamin v&agrave; c&aacute;c chất b&eacute;o kh&ocirc;ng no c&oacute; trong n&oacute; cũng c&oacute; t&aacute;c dụng tốt đối với người cao tuổi v&agrave; người đang ăn ki&ecirc;ng. Hạt atiso đỏ chứa 7,6% nước, 22,3% dầu, 24% protein, 13,5% chất xơ v&agrave; 7% chất kho&aacute;ng.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\"><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/Hoa-Atiso-Do-4.png\" alt=\"\" width=\"300\" height=\"214\" /><br />Hoa atiso đỏ c&oacute; chứa một số chất c&oacute; t&iacute;nh kh&aacute;ng sinh, do đ&oacute; n&oacute; được d&acirc;n gian d&ugrave;ng như một phương thuốc thảo dược trị ho, vi&ecirc;m họng bằng c&aacute;ch lấy đ&agrave;i hoa atiso đỏ chưng lẫn đường ph&egrave;n, mật ong lấy nước uống v&agrave;i lần/ng&agrave;y. Sử dụng hoa atio đỏ thường xuy&ecirc;n cũng l&agrave; c&aacute;ch ngăn ngừa ho, cảm c&uacute;m.<br /><br /><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/images-1-1.jpg\" alt=\"\" width=\"255\" height=\"198\" /></span></p>\n<div id=\"thong-tin-san-pham\" class=\"tab-pane fade in active\" style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<div class=\"entry-content\" style=\"margin: 0px; padding: 0px;\">\n<div id=\"themify_builder_content-440\" class=\"themify_builder_content themify_builder_content-440 themify_builder\" style=\"margin: 0px; padding: 0px; clear: both;\" data-postid=\"440\">\n<div class=\"themify_builder_row module_row clearfix module_row_0 themify_builder_440_row module_row_440-0 tb_htfy164\" style=\"margin: 0px; padding: 0px; position: relative; box-sizing: border-box; backface-visibility: hidden; transition: background 500ms ease 0s, font-size 0s ease 0s, line-height 0s ease 0s, color 0s ease 0s, padding 0s ease 0s, margin 0s ease 0s, border 0s ease 0s, border-radius 0s ease 0s, box-shadow 0s ease 0s, text-shadow 0s ease 0s, filter 0s ease 0s, -webkit-filter 0s ease 0s; width: 1150px;\">\n<div class=\"row_inner col_align_top\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box; display: flex; flex-flow: wrap;\">\n<div class=\"module_column tb-column col-full tb_440_column module_column_0 module_column_440-0-0 tb_19di168 last\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; align-items: flex-start; align-content: flex-start; float: left; position: relative; clear: left; width: 1150px; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; display: flex; flex-flow: wrap;\">\n<div class=\"tb-column-inner\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box;\">\n<div class=\"module module-text text-440-0-0-0     tb_vy1e999\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; position: relative;\">\n<div class=\"tb_text_wrap\" style=\"margin: 0px; padding: 0px;\">\n<p style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\"><br />Atioso đỏ cũng chứa nhiều Bioflavonoids, một chất chống &ocirc; xy h&oacute;a ngăn cản qu&aacute; tr&igrave;nh &ocirc; xy h&oacute;a lipoprotein, gi&uacute;p hạ huyết &aacute;p. Nhiều người bị huyết &aacute;p cao thường uống tr&agrave; chế từ hoa atiso đỏ mỗi ng&agrave;y để giảm huyết &aacute;p.<br /></span></p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"></p>\n<div id=\"thong-so-ky-thuat\" class=\"tab-pane fade\" style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<h3 style=\"margin: 20px 0px 0.4em; padding: 0px; line-height: 1.4em; overflow-wrap: normal; font-size: 1.6em;\">Th&ocirc;ng số kỹ thuật</h3>\n<div style=\"margin: 0px; padding: 0px;\">\n<p style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">Chi tiết sản phẩm</span></p>\n<p style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">&ndash; Trọng lượng: 150gr</span></p>\n<p style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">&ndash; M&agrave;u sắc: m&agrave;u đỏ t&iacute;m của b&ocirc;ng tươi.</span></p>\n<p style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">&ndash; M&ugrave;i vị; gi&ograve;n, chua, ngọt, tốt cho sức khỏe &ndash; Sản phẩm cũng kh&ocirc;ng sử dụng chất bảo quản, chỉ sử dụng acid citrid đường v&agrave; muối của acid sorbid nhằm duy tr&igrave; m&agrave;u sắc v&agrave; hương vị sản phẩm, chỉ sử dụng được 3 th&aacute;ng. Sản phẩm ngon hơn nếu bỏ v&agrave;o tủ lạnh hoặc pha với nước cốt atiso đỏ c&ugrave;ng đ&aacute;, c&aacute;nh hoa gi&ograve;n c&ugrave;ng vị chua ngọt của nước cốt tạo n&ecirc;n thức uống tương tự cooktail</span></p>\n</div>\n</div>',70000,59000,NULL,NULL,NULL,2,1,1,1,'','','',NULL,NULL,NULL,150),(5,'Kẹo dẻo phủ chocolate loại đặc biệt-220gr',0,'2021-07-23 08:55:40','57O',17,0,'https://appdala.net/wp-content/uploads/Keodeo-4.jpg','https://appdala.net/wp-content/uploads/Keodeo-5.jpg;https://appdala.net/wp-content/uploads/keo-deo-chocolate-handmade-1504932104-1-4140608-1509593909-3.jpg;https://appdala.net/wp-content/uploads/keo-deo-phu-chocolate-handmade-1506263932-1-3898840-1506263932-2.jpg;https://appdala.net/wp-content/uploads/keo-deo-trai-cay-chocolate-handmade-1504949383-1-3791767-1504949383-2.jpg','','<h4 style=\"margin: 20px 0px 0.4em; padding: 0px; line-height: 1.4em; overflow-wrap: normal; font-size: 1.4em; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; text-align: center;\"><span style=\"margin: 0px; padding: 0px; font-size: 18pt;\">KẸO DẺO PHỦ SOCOLA &ndash; M&Oacute;N QU&Agrave; ĐẾN TỪ V&Ugrave;NG CAO NGUY&Ecirc;N Đ&Agrave; LẠT</span></h4>\n<h4 style=\"margin: 20px 0px 0.4em; padding: 0px; line-height: 1.4em; overflow-wrap: normal; font-size: 1.4em; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; text-align: center;\"><span style=\"margin: 0px; padding: 0px; font-size: 18pt;\"><br /><img src=\"https://appdala.net/wp-content/uploads/Keodeo-3.jpg\" alt=\"\" width=\"300\" height=\"300\" /><br /><br /></span></h4>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kẹo dẻo phủ socola c&oacute; vị ngọt nhẹ v&agrave; dai, phủ một lớp socola mỏng, cho ta vị hậu đắng nhẹ tăng th&ecirc;m độ ho&agrave;n hảo v&agrave; một hương vị đặc trưng của v&ugrave;ng cao nguy&ecirc;n Đ&agrave; Lạt.</span></p>\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px; font-size: 12.96px; font-weight: 400; text-align: start;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">M&agrave;u sắc: Kẹo c&oacute; m&agrave;u sắc tự nhi&ecirc;n, phủ b&ecirc;n tr&ecirc;n l&agrave; lớp socola mỏng tạo c&aacute;i nh&igrave;n thiện cảm cho người d&ugrave;ng.</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">M&ugrave;i vị: mỗi m&agrave;u sắc l&agrave; một vị kh&aacute;c nhau, chua,ngọt trộn với vị hậu đắng nhẹ g&acirc;y k&iacute;ch th&iacute;ch vị gi&aacute;c.</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Ăn trực tiếp.</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Chỉ sử dụng acid citrid để bảo quản v&agrave; duy tr&igrave; m&agrave;u sắc cho sản phẩm. Trẻ em, phụ nữ mang thai c&oacute; thể sử dụng được.</span></li>\n</ul>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">&ndash; Th&agrave;nh phần</strong>: Kẹo dẻo tr&aacute;i c&acirc;y (70%), chocolate đen.</span></p>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">&ndash; KLT</strong>: 220g</span></p>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">&ndash; Hướng dẫn sử dụng</strong>: Mở bao b&igrave; v&agrave; d&ugrave;ng trực tiếp. L&agrave;m k&iacute;n miệng sau mỗi lần sử dụng.</span></p>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">&ndash; Bảo quản</strong>: Bảo quản nơi kh&ocirc; r&aacute;o tho&aacute;ng m&aacute;t, tr&aacute;nh &aacute;nh nắng trực tiếp.</span></p>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kh&ocirc;ng sử dụng sản phẩm khi c&oacute; dấu hiệu ẩm mốc, xuất hiện m&ugrave;i lạ.</span></p>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><em style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\">Sản phẩm được ph&acirc;n phối bởi Dala.vn.</strong></em></span></p>',70000,65000,NULL,NULL,NULL,2,1,1,1,'','','',NULL,NULL,NULL,220),(6,'Mứt Chanh dây – 29gram',0,'2021-07-23 08:58:37','6MR',17,0,'https://appdala.net/wp-content/uploads/mut-chanh-day-1-1.jpg','https://appdala.net/wp-content/uploads/2d829b44a905405b1914.jpg;https://appdala.net/wp-content/uploads/238.chanhday-1.jpg;https://appdala.net/wp-content/uploads/recipe13096-635845848321954266.jpg','','<img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/2d829b44a905405b1914-1.jpg\" alt=\"\" width=\"300\" height=\"244\" /><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"font-size: 12.96px;\">Chanh d&acirc;y l&agrave; một nguồn cung vitamin A dồi d&agrave;o, một dưỡng chất đặc biệt c&oacute; lợi gi&uacute;p l&agrave;m đẹp cho da. C&aacute;c chất chống oxy h&oacute;a kh&aacute;c trong chanh d&acirc;y như vitamin C, riboflavin v&agrave; carotene cũng gi&uacute;p tăng cường sức khỏe của da v&agrave; đẩy l&ugrave;i c&aacute;c dấu hiệu của l&atilde;o h&oacute;a.</span><br /><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/174603_qua-chanh-leo-2-300x194-1.jpg\" alt=\"\" width=\"300\" height=\"194\" /><br /></span>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">Chanh d&acirc;y rất gi&agrave;u kali, một loại kho&aacute;ng chất quan trọng gi&uacute;p điều h&ograve;a huyết &aacute;p, l&agrave;m thư gi&atilde;n c&aacute;c mạch m&aacute;u v&agrave; tăng cường lưu lượng m&aacute;u. Qua đ&oacute; c&oacute; thể l&agrave;m giảm căng thẳng cho tim v&agrave; cải thiện sức khỏe tim to&agrave;n diện.</p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">Chất flavonoid v&agrave; axit phenolic c&oacute; trong chanh d&acirc;y cũng c&oacute; thể gi&uacute;p kiểm so&aacute;t lượng cholesterol tốt hơn: tăng cholesterol tốt v&agrave; giảm cholesterol xấu g&acirc;y tắc nghẽn c&aacute;c động mạch, l&agrave;m suy yếu hoạt động của tim.</p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/238.chanhday-1-1.jpg\" alt=\"\" width=\"300\" height=\"200\" /><br /><span style=\"font-size: 12.96px;\">Trong chanh d&acirc;y c&oacute; chứa rất nhiều chất chống oxy h&oacute;a gi&uacute;p chống lại c&aacute;c gốc tự do g&acirc;y ung thư. Chanh d&acirc;y cũng l&agrave; nguồn chứa vitamin A, flavonoid v&agrave; c&aacute;c hợp chất phenolic kh&aacute;c gi&uacute;p ngăn ngừa ung thư. Piceatannol, một hợp chất quan trọng kh&aacute;c được t&igrave;m thấy trong chanh d&acirc;y cũng c&oacute; thể hỗ trợ ti&ecirc;u diệt c&aacute;c tế b&agrave;o ung thư đại trực tr&agrave;ng.</span></p>',20000,15000,NULL,NULL,NULL,4,1,1,1,'','','',NULL,NULL,NULL,29),(7,'Vỏ bưởi mật ong sấy dẻo-100gram',0,'2021-07-23 09:55:40','78',17,0,'https://appdala.net/wp-content/uploads/vo-buoi-mat-ong.jpg','https://appdala.net/wp-content/uploads/vo-buoi-1-1.png;https://appdala.net/wp-content/uploads/vo-buoi-mat-ong-1.jpg;https://appdala.net/wp-content/uploads/vo-buoi-mat-ong-1-1.jpg;https://appdala.net/wp-content/uploads/vo-buoi-mat-ong-2.jpg;https://appdala.net/wp-content/uploads/vo-buoi-mat-ong-3.jpg','','',70000,65000,NULL,NULL,NULL,1,1,1,1,'','','',NULL,NULL,NULL,100),(8,'Cam sấy dẻo – 100gr',0,'2021-07-23 09:58:40','8S',17,0,'https://appdala.net/wp-content/uploads/mutcam.jpg','https://appdala.net/wp-content/uploads/bi-kip-lam-mut-cam-thom-ngon-dep-mat-1-300x174-1.png;https://appdala.net/wp-content/uploads/cach-lam-mut-cam-deo-ngon-thom-vi-chanh-leo-hap-dan-1-300x249-1.jpg;https://appdala.net/wp-content/uploads/mutcam-1.jpg','','',100000,80000,NULL,NULL,NULL,2,1,1,1,'','','',NULL,NULL,NULL,100),(9,'Chuối Laba sấy dẻo (Soft dried banana) – 250gr',0,'2021-07-23 10:00:34','9WR',17,0,'https://appdala.net/wp-content/uploads/chuoideo.png','https://appdala.net/wp-content/uploads/1a96691e84bb5231e72caac6bf0f581f.jpg;https://appdala.net/wp-content/uploads/chuoideo-1.png;https://appdala.net/wp-content/uploads/chuoi-say-deo.jpg;https://appdala.net/wp-content/uploads/chuoi-say-deo-dac-biet-trai-cay-hat-say-com-1.jpg','','<span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"font-size: 12.96px;\">Chuối kh&ocirc; sấy dẻo c&oacute; nhiều vi chất dinh dưỡng bảo vệ hệ miễn dịch v&agrave; ngăn ngừa hiệu quả c&aacute;c bệnh m&atilde;n t&iacute;nh. Mỗi ng&agrave;y, người c&oacute; thể trạng b&igrave;nh thường v&agrave; sức khỏe ổn định n&ecirc;n ăn 1-2 quả chuối tươi hay tương đương với 50g chuối kh&ocirc; sấy dẻo để chăm s&oacute;c v&agrave; bảo vệ tốt nhất cho sức khỏe của ch&iacute;nh m&igrave;nh.<br /></span><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/1a96691e84bb5231e72caac6bf0f581f-1.jpg\" alt=\"\" width=\"300\" height=\"300\" /><br /></span>\n<div style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<div style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\">Người hay bị t&aacute;o b&oacute;n hoặc rối loạn ti&ecirc;u h&oacute;a</strong>:chất xơ c&oacute; trong chuối sấy c&oacute; t&aacute;c dụng nhuận tr&agrave;ng, giảm t&aacute;o b&oacute;n. Chất pectin c&oacute; trong chuối sấy dẻo c&oacute; thể hỗ trợ l&agrave;m giảm rối loạn đường ruột g&acirc;y ti&ecirc;u chảy.</div>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\">*Người hay l&agrave;m việc tr&iacute; &oacute;c, hay căng thẳng, đang stress</strong>:<em style=\"margin: 0px; padding: 0px;\">Vi</em>chất kali gi&uacute;p tr&iacute; n&atilde;o hoạt động linh hoạt hơn, thư gi&atilde;n tinh thần, giảm t&igrave;nh trạng căng thẳng g&acirc;y stress vật l&yacute;.</p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\">*Người hay bị tụt đường huyết</strong>:chất sắt c&oacute; trong chuối sấy dẻo gi&uacute;p cơ thể tr&aacute;nh được nguy cơ thiếu m&aacute;u do thiếu sắt.<br style=\"margin: 0px; padding: 0px;\" /><strong style=\"margin: 0px; padding: 0px;\">*Người muốn tăng c&acirc;n</strong>:việc bổ sung th&ecirc;m chuối sấy dẻo sau mỗi bữa ăn c&oacute; t&aacute;c dụng t&iacute;ch cực l&ecirc;n hệ ti&ecirc;u h&oacute;a, gi&uacute;p ăn ngon hơn, ti&ecirc;u h&oacute;a thức ăn tốt hơn, hấp thụ dinh dưỡng tốt hơn n&ecirc;n gi&uacute;p tăng c&acirc;n tự nhi&ecirc;n c&oacute; kiểm so&aacute;t.<br /><br /></p>\n</div>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/chuoideo-2.png\" alt=\"\" width=\"300\" height=\"300\" /><br /><br /></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\">Lưu &yacute; một số bệnh nh&acirc;n kh&ocirc;ng n&ecirc;n ăn chuối sấy?</strong></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">Ăn chuối kh&ocirc; sấy dẻo c&oacute; thể ảnh hưởng kh&ocirc;ng tốt đến sức khỏe cho những người bị bệnh m&atilde;n t&iacute;nh sau:</p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\">*</strong><em style=\"margin: 0px; padding: 0px;\">Người bị suy thận, vi&ecirc;m cầu thận</em>: nồng độ kali trong m&aacute;u sẽ tăng khi ăn chuối, g&acirc;y ra triệu chứng bất lợi cho sức khỏe như rối loạn nhịp tim, buồn n&ocirc;n, hồi hộp.</p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\">*</strong><em style=\"margin: 0px; padding: 0px;\">Những người đang bị đau đầu</em>: chất tyramine, phenyethyamine v&agrave; axit amin trong chuối c&oacute; thể l&agrave;m gi&atilde;n mạch m&aacute;u khiến cơn đau đầu trở n&ecirc;n nghi&ecirc;m trọng hơn.<br style=\"margin: 0px; padding: 0px;\" /><strong style=\"margin: 0px; padding: 0px;\">*</strong><em style=\"margin: 0px; padding: 0px;\">Người bị tiểu đường</em>: khi ăn chuối sẽ bổ sung lượng đường c&oacute; thể g&acirc;y hại cho người bị rối loạn chuyển h&oacute;a.<br /><br /></p>\n<h3 style=\"margin: 20px 0px 0.4em; padding: 0px; line-height: 1.4em; overflow-wrap: normal; font-size: 1.6em; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff;\">Th&ocirc;ng số kỹ thuật</h3>\n<div style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<div class=\" _50f7\" style=\"margin: 0px; padding: 0px;\">Chi tiết sản phẩm:</div>\n<div style=\"margin: 0px; padding: 0px;\">&ndash; Trọng lượng: 250gr</div>\n<div class=\"_1xwp\" style=\"margin: 0px; padding: 0px;\">&ndash; M&agrave;u sắc: M&agrave;u v&agrave;ng hoặc hơi n&acirc;u<br style=\"margin: 0px; padding: 0px;\" />&ndash; M&ugrave;i vị: do sấy ở nhiệt độ thấp n&ecirc;n mật được h&uacute;t v&agrave;o b&ecirc;n trong tạo độ dẻo l&acirc;u d&agrave;i v&agrave; vị ngọt thanh tự nhi&ecirc;n.<br style=\"margin: 0px; padding: 0px;\" />&ndash; Việc đ&oacute;ng g&oacute;i h&uacute;t ch&acirc;n kh&ocirc;ng ngăn sản phẩm kh&ocirc;ng tiếp x&uacute;c với kh&ocirc;ng kh&iacute; n&ecirc;n sản phẩm kh&ocirc;ng bị kh&ocirc; theo thời gian. Tuy nhi&ecirc;n, khi để l&acirc;u 1 thời gian, sản phẩm sẽ bị xuống m&agrave;u (chuyển n&acirc;u) đ&acirc;y l&agrave; một chu tr&igrave;nh b&igrave;nh thường của sản phẩm do hệ m&agrave;u bị ph&aacute; hủy khi sản phẩm tiếp x&uacute;c với &aacute;nh s&aacute;ng. Sản phẩm vẫn sử dụng được b&igrave;nh thường cho đến khi hết hạn sử dụng.<br style=\"margin: 0px; padding: 0px;\" />&ndash; Kh&ocirc;ng sử dụng chất bảo quản, trẻ nhỏ, phụ nữ mang thai v&agrave; người ăn chay đều c&oacute; thể sử dụng được</div>\n</div>',60000,55000,NULL,NULL,NULL,2,1,1,1,'','','',NULL,NULL,NULL,250),(10,'Dâu tây sấy dẻo-150gr',0,'2021-07-23 10:08:28','105',17,0,'https://appdala.net/wp-content/uploads/Dautay-1-1.jpg','https://appdala.net/wp-content/uploads/Dau-tay-da-lat-say-deo-2-1.png;https://appdala.net/wp-content/uploads/Dautay-1-2.jpg;https://appdala.net/wp-content/uploads/14650111_1834506056785453_4163471559046559578_n-1.jpg','','<span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/Dau-tay-da-lat-say-deo-2.png\" alt=\"\" width=\"300\" height=\"264\" /><br /><span style=\"font-size: 12.96px;\">Từ l&acirc;u, những quả d&acirc;u t&acirc;y đỏ mọng nước đã n&ocirc;̉i ti&ecirc;́ng là ngu&ocirc;̀n cung c&acirc;́p vitamin C d&ocirc;̀i dào cho cơ th&ecirc;̉, nhưng ít người bi&ecirc;́t tới loại quả này còn r&acirc;́t giàu các ch&acirc;́t ch&ocirc;́ng oxy hóa có lợi. Vi&ecirc;̣c ăn d&acirc;u t&acirc;y m&ocirc;̃i ngày giúp ngăn ngừa lão hóa, tăng cường h&ecirc;̣ mi&ecirc;̃n dịch, giảm chứng vi&ecirc;m khớp, phòng ngừa ti&ecirc;̉u đường cũng như sự hình thành và lan r&ocirc;̣ng của các kh&ocirc;́i u. Đặc bi&ecirc;̣t, d&acirc;u t&acirc;y còn giúp cơ th&ecirc;̉ sản sinh các hormore hạnh phúc (dopamine, serotonin) kh&ocirc;ng chỉ chữa chứng tr&acirc;̀m cảm còn giúp thúc đ&acirc;̉y máu mang dưỡng ch&acirc;́t tới não.</span><br /><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/14650111_1834506056785453_4163471559046559578_n.jpg\" alt=\"\" width=\"300\" height=\"200\" /><br /></span><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">Hi&ecirc;̉u được được t&acirc;̀m quan trọng của d&acirc;u t&acirc;y đ&ocirc;́i với sức khỏe,</span><strong style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">BerryLand</strong><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">đã sử dụng d&acirc;y chuy&ecirc;̀n sản xu&acirc;́t hi&ecirc;̣n đại của mình đ&ecirc;̉ mang đ&ecirc;́n những quả d&acirc;u c&ocirc; đặc đ&acirc;̀y dinh dưỡng trong món</span><strong style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">D&acirc;u S&acirc;́y Dẻo</strong><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">n&ocirc;̉i ti&ecirc;́ng của mình. Được s&acirc;́y bằng c&ocirc;ng ngh&ecirc;̣ cao trong d&acirc;y chuy&ecirc;̀n khép kín,</span><strong style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">D&acirc;u s&acirc;́y dẻo<strong style=\"margin: 0px; padding: 0px;\">BerryLand</strong></strong><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">kh&ocirc;ng chỉ giữ được hàm lượng dinh dưỡng của trái c&acirc;y tươi, mà còn làm giảm đ&ocirc;̣ chua giúp tăng vị ngọt dịu cho những quả d&acirc;u th&ecirc;m ph&acirc;̀n thơm ngon. Chính vì v&acirc;̣y, món ăn vặt dinh dưỡng này sẽ là lựa chọn phù hợp cho t&acirc;́t cả các đ&ocirc;́i tượng từ trẻ em, người lớn cho tới các mẹ b&acirc;̀u. Ngoài ra, sản ph&acirc;̉m được đóng gói nhỏ gọn, đẹp mắt phù hợp cho vi&ecirc;̣c đãi khách, mang theo tới văn phòng, hay những chuy&ecirc;́n du lịch xa.</span><br /><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/Dautay-1.jpg\" alt=\"\" width=\"300\" height=\"300\" /><br /></span>\n<div id=\"thong-tin-san-pham\" class=\"tab-pane fade in active\" style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<div class=\"entry-content\" style=\"margin: 0px; padding: 0px;\">\n<div id=\"themify_builder_content-445\" class=\"themify_builder_content themify_builder_content-445 themify_builder\" style=\"margin: 0px; padding: 0px; clear: both;\" data-postid=\"445\">\n<div class=\"themify_builder_row module_row clearfix module_row_0 themify_builder_445_row module_row_445-0 tb_gao3585\" style=\"margin: 0px; padding: 0px; position: relative; box-sizing: border-box; transition: background 500ms ease 0s, font-size 0s ease 0s, line-height 0s ease 0s, color 0s ease 0s, padding 0s ease 0s, margin 0s ease 0s, border 0s ease 0s, border-radius 0s ease 0s, box-shadow 0s ease 0s, text-shadow 0s ease 0s, filter 0s ease 0s, -webkit-filter 0s ease 0s; width: 1150px;\">\n<div class=\"row_inner col_align_top\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box; display: flex; flex-flow: wrap;\">\n<div class=\"module_column tb-column col-full tb_445_column module_column_0 module_column_445-0-0 tb_zaf9586 last\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; align-items: flex-start; align-content: flex-start; float: left; position: relative; clear: left; width: 1150px; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; display: flex; flex-flow: wrap;\">\n<div class=\"tb-column-inner\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box;\">\n<div class=\"module module-text text-445-0-0-0     tb_7ptl531\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; position: relative;\">\n<div class=\"tb_text_wrap\" style=\"margin: 0px; padding: 0px;\">\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">\n<div id=\"thong-tin-san-pham\" class=\"tab-pane fade in active\" style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<div class=\"entry-content\" style=\"margin: 0px; padding: 0px;\">\n<div id=\"themify_builder_content-445\" class=\"themify_builder_content themify_builder_content-445 themify_builder\" style=\"margin: 0px; padding: 0px; clear: both;\" data-postid=\"445\">\n<div class=\"themify_builder_row module_row clearfix module_row_0 themify_builder_445_row module_row_445-0 tb_gao3585\" style=\"margin: 0px; padding: 0px; position: relative; box-sizing: border-box; transition: background 500ms ease 0s, font-size 0s ease 0s, line-height 0s ease 0s, color 0s ease 0s, padding 0s ease 0s, margin 0s ease 0s, border 0s ease 0s, border-radius 0s ease 0s, box-shadow 0s ease 0s, text-shadow 0s ease 0s, filter 0s ease 0s, -webkit-filter 0s ease 0s; width: 1150px;\">\n<div class=\"row_inner col_align_top\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box; display: flex; flex-flow: wrap;\">\n<div class=\"module_column tb-column col-full tb_445_column module_column_0 module_column_445-0-0 tb_zaf9586 last\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; align-items: flex-start; align-content: flex-start; float: left; position: relative; clear: left; width: 1150px; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; display: flex; flex-flow: wrap;\">\n<div class=\"tb-column-inner\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box;\">\n<div class=\"module module-text text-445-0-0-0     tb_7ptl531\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; position: relative;\">\n<div class=\"tb_text_wrap\" style=\"margin: 0px; padding: 0px;\">\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Nguy&ecirc;n liệu ch&iacute;nh: d&acirc;u t&acirc;y tươi.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Sản ph&acirc;̉m được sơ chế v&agrave; sấy bằng c&ocirc;ng nghệ hiện đại, kh&eacute;p k&iacute;n, đảm bảo đạt chuẩn an to&agrave;n vệ sinh thực phẩm.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">L&agrave; một sản phẩm c&ocirc; đặc của tr&aacute;i c&acirc;y tươi, vẫn giữ được hương vị thơm ngon, m&agrave;u sắc kh&ocirc;ng kh&ocirc; cứng.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Sản phẩm kh&ocirc;ng qua chi&ecirc;n dầu n&ecirc;n kh&ocirc;ng bị hiện tượng thấm dầu v&agrave; h&ocirc;i dầu.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Sản phẩm vẫn giữ được c&aacute;c yếu tố như m&agrave;u sắc, th&agrave;nh phần dinh dưỡng, vitamin v&agrave; đặc t&iacute;nh đặc trưng ri&ecirc;ng của từng loại tr&aacute;i c&acirc;y.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Bảo quản được l&acirc;u hơn so với tr&aacute;i c&acirc;y tươi v&agrave; l&agrave; bữa ăn nhẹ tiện dụng cho những chuyến đi chơi d&agrave;i.</li>\n</ul>\n<p style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\">Hướng dẫn bảo quản</strong></p>\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Đ&oacute;ng k&iacute;n bao b&igrave; để giữ kh&ocirc; r&aacute;o sản phẩm sau khi sử dụng.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Bảo quản nơi tho&aacute;ng m&aacute;t, tr&aacute;nh &aacute;nh nắng trực tiếp.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Bảo quản được l&acirc;u hơn so với tr&aacute;i c&acirc;y tươi v&agrave; l&agrave; bữa ăn nhẹ tiện dụng cho những chuyến đi chơi d&agrave;i.</li>\n</ul>\n<p style=\"margin: 0px; padding: 0px;\"></p>\n<p style=\"margin: 0px; padding: 0px;\"></p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n<div id=\"thong-so-ky-thuat\" class=\"tab-pane fade\" style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<h3 style=\"margin: 20px 0px 0.4em; padding: 0px; line-height: 1.4em; overflow-wrap: normal; font-size: 1.6em;\">Th&ocirc;ng số kỹ thuật</h3>\n<div style=\"margin: 0px; padding: 0px;\">\n<div class=\" _50f7\" style=\"margin: 0px; padding: 0px;\">Chi tiết sản phẩm:</div>\n<div style=\"margin: 0px; padding: 0px;\">&ndash; Trọng lượng: 150gr</div>\n<div class=\"_1xwp\" style=\"margin: 0px; padding: 0px;\">&ndash; M&agrave;u sắc: m&agrave;u đỏ tự nhi&ecirc;n<br style=\"margin: 0px; padding: 0px;\" />&ndash; M&ugrave;i vị: vị d&acirc;u tự nhi&ecirc;n, chua chua ngọt ngọt<br style=\"margin: 0px; padding: 0px;\" />&ndash; Kh&ocirc;ng sử dụng chất bảo quản, trẻ nhỏ, phụ nữ mang thai v&agrave; người ăn chay đều c&oacute; thể sử dụng được<br style=\"margin: 0px; padding: 0px;\" />&ndash; Rất ngon khi d&ugrave;ng k&egrave;m sữa chua.</div>\n</div>\n</div>\n</li>\n</ul>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n<span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><br /></span>',140000,120000,NULL,NULL,NULL,2,1,1,1,'','','',NULL,NULL,NULL,150),(11,'Chuối Laba sấy dòn loại Đặc Biệt-100gram',0,'2021-07-23 10:20:41','11UJ',17,0,'https://appdala.net/wp-content/uploads/hinh-say-gion.jpg','https://appdala.net/wp-content/uploads/hinh-mat-truoc.jpg;https://appdala.net/wp-content/uploads/hinh-chuoi.jpg;https://appdala.net/wp-content/uploads/hinh-say-gion-1.jpg','','<span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 18.6667px; background-color: #ffffff;\"><span style=\"font-size: 18.6667px;\">Trong mỗi quả chuối c&oacute; lượng vitamin A, C c&oacute; khả năng tăng cường, cải thiện sức khỏe cho mắt. B&ecirc;n cạnh đ&oacute; th&agrave;nh phần beta carotene, lutein, ngo&agrave;i ra vitamin E của chuối c&ograve;n c&oacute; t&aacute;c dụng gi&uacute;p ph&ograve;ng tr&aacute;nh t&igrave;nh trạng oxy h&oacute;a ở mắt, chống hiện tượng tho&aacute;i h&oacute;a điểm v&agrave;ng. Do đ&oacute;, bạn n&ecirc;n bổ sung loại thực phẩm n&agrave;y cho trẻ nhỏ từ sớm để b&eacute; c&oacute; đ&ocirc;i mắt s&aacute;ng khỏe.</span><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/hinh-chuoi-1.jpg\" alt=\"\" width=\"300\" height=\"300\" /><br /></span><span style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; font-size: 14pt;\"><span style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; font-size: 14pt;\">Chuối sấy gi&ograve;n của dalat chips l&agrave; m&oacute;n ăn đặc sản Đ&agrave; Lạt được chế biến bằng c&ocirc;ng nghệ hiện đại: kh&ocirc;ng sử dụng phẩm m&agrave;u, kh&ocirc;ng đường, kh&ocirc;ng chất bảo quản v&agrave; kh&ocirc;ng chứa cholesterol n&ecirc;n chuối sấy của dalat chips vẫn giữ được đặc t&iacute;nh tự nhi&ecirc;n.</span><br style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\" /><span style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; font-size: 14pt;\">Chuối sấy gi&ograve;n dalat chips c&oacute; dạng thanh, gi&ograve;n, đảm bảo kh&ocirc;ng bị g&atilde;y n&aacute;t. M&ugrave;i vị thơm ngon, cung cấp nhiều chất dinh dưỡng cho cơ thể.<br /></span><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/hinh-say-gion-2.jpg\" alt=\"\" width=\"364\" height=\"364\" /><br /><br /></span>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">KLT:</strong>100gr.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Th&agrave;nh phần:</strong>&ndash; 100% từ tr&aacute;i chuối Laba nguy&ecirc;n chất được trồng tại L&acirc;m Đồng.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">&ndash; Kh&ocirc;ng chứa chất bảo quản.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Hạn sử dung:</strong>06 th&aacute;ng kể từ ng&agrave;y sản xuất.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Hướng dẫn sử dụng:</span></strong></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">&ndash; D&ugrave;ng trực tiếp sau khi mở bao b&igrave;.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">&ndash; Sau khi mở bao b&igrave; n&ecirc;n để k&iacute;n gi&oacute;, bảo quản nơi kh&ocirc; r&aacute;o, tho&aacute;ng m&aacute;t.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">&ndash; Kh&ocirc;ng sử dụng sản phẩm khi c&oacute; dấu hiện ẩm mốc, xuất hiện m&ugrave;i lạ.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><em style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Sản phẩm được ph&acirc;n phối bởi Dala.vn.</span></em></p>',35000,29000,NULL,NULL,NULL,5,1,1,1,'','','',NULL,NULL,NULL,100),(12,'Trà Actisô Túi Lọc Ladophar – 100 túi',0,'2021-07-23 10:23:21','12OL',17,0,'https://appdala.net/wp-content/uploads/tui-loc-1-1.jpg','https://appdala.net/wp-content/uploads/tui-loc-1-2.jpg;https://appdala.net/wp-content/uploads/tui-loc-2.jpg;https://appdala.net/wp-content/uploads/tui-loc-3.jpg;https://appdala.net/wp-content/uploads/tui-loc-4.jpg','','<img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://appdala.net/wp-content/uploads/tui-loc-1.jpg\" alt=\"\" width=\"300\" height=\"300\" />\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Tr&agrave; t&uacute;i lọc Actiso l&agrave; sản phấm chiết xuất từ thi&ecirc;n nhi&ecirc;n, với hương thơm v&agrave; vị ngọt ho&agrave;n to&agrave;n tự nhi&ecirc;n nay được bổ sung th&ecirc;m th&agrave;nh phần cao Actis&ocirc; gi&uacute;p tăng cường hiệu quả ph&ograve;ng ngừa v&agrave; bảo vệ gan mật.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Tr&agrave; t&uacute;i lọc Actiso được đ&oacute;ng g&oacute;i theo quy c&aacute;ch 100 t&uacute;i lọc x 2g, rất dễ d&agrave;ng sử dụng cũng như bảo quản.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Tr&agrave; t&uacute;i lọc Actiso rất tốt. Với c&ocirc;ng dụng m&aacute;t gan, lợi tiểu, th&ocirc;ng mật, rất th&iacute;ch hợp cho người bị yếu gan, nổi mề đay, v&agrave;ng da. C&oacute; thể d&ugrave;ng hằng ng&agrave;y thay nước lọc.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"></p>\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Th&agrave;nh phần</strong>: Cho 1 t&uacute;i lọc: Actiso 1,65g, Cao đặc Actiso 0,04g, th&agrave;nh phần kh&aacute;c vừa đủ 1 t&uacute;i lọc 2g.</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">KLT</strong>: 200g</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Hạn sử dụng</strong>: 3 năm.</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">C&aacute;ch d&ugrave;ng</strong>: Nh&uacute;ng t&uacute;i tr&agrave; v&agrave;o ly nước s&ocirc;i (150-200ml), chờ 3-5 ph&uacute;t.</span></li>\n</ul>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">C&oacute; thể pha th&ecirc;m đường t&ugrave;y &yacute;.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Ng&agrave;y uống 3 lần, mỗi lần 1-2 t&uacute;i lọc.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kh&ocirc;ng sử dụng sản phẩm khi c&oacute; dấu hiệu ẩm mốc, xuất hiện m&ugrave;i lạ.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><em style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Sản phẩm được ph&acirc;n phối bởi Dala.vn.</span></strong></em></p>',95000,90000,NULL,NULL,NULL,3,1,1,1,'','','',NULL,NULL,NULL,100),(13,'Cao Đặc Actiso Ladophar – 100g',0,'2021-07-23 10:25:10','13PU',17,0,'https://appdala.net/wp-content/uploads/cao-dac-3.jpg','https://appdala.net/wp-content/uploads/cao-dac-1.jpg;https://appdala.net/wp-content/uploads/cao-dac-2.jpg;https://appdala.net/wp-content/uploads/cao-dac-3-1.jpg','','<h1 style=\"margin: 20px 0px 0.4em; padding: 0px; line-height: 1.4em; overflow-wrap: normal; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff;\">Cao Đặc Actiso 100g</h1>\n<div id=\"themify_builder_content-2279\" class=\"themify_builder_content themify_builder_content-2279 themify_builder\" style=\"margin: 0px; padding: 0px; clear: both; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\" data-postid=\"2279\">\n<div class=\"themify_builder_row module_row clearfix module_row_0 themify_builder_2279_row module_row_2279-0 tb_w0sc587\" style=\"margin: 0px; padding: 0px; position: relative; box-sizing: border-box; width: 1150px;\">\n<div class=\"row_inner col_align_top\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box; display: flex; flex-flow: wrap;\">\n<div class=\"module_column tb-column col-full tb_2279_column module_column_0 module_column_2279-0-0 tb_zugn589 last\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; align-items: flex-start; align-content: flex-start; float: left; position: relative; clear: left; width: 1150px; display: flex; flex-flow: wrap;\">\n<div class=\"tb-column-inner\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box;\">\n<div class=\"module module-text text-2279-0-0-0     tb_hn1j634\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; position: relative;\">\n<div class=\"tb_text_wrap\" style=\"margin: 0px; padding: 0px;\">\n<p style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\">Cao đặc Actis&ocirc;</strong>l&agrave; sản phẩm chiết xuất tinh chất của Actis&ocirc; với c&ocirc;ng nghệ c&ocirc; cao ch&acirc;n kh&ocirc;ng hiện đại v&agrave; được xử l&yacute; theo quy tr&igrave;nh 24h của Ladophar gi&uacute;p giữ to&agrave;n vẹn h&agrave;m lượng hoạt chất Cynarin.</p>\n<p style=\"margin: 0px; padding: 0px;\">100g cao đặc LADOactiso từ Ladophar tương đương 3.500g l&aacute; tươi Atis&ocirc;</p>\n<p style=\"margin: 0px; padding: 0px;\">Ladophar tự h&agrave;o l&agrave; đơn vị đầu ti&ecirc;n nghi&ecirc;n cứu v&agrave; sản xuất ra cao Actis&ocirc; tại Việt Nam với h&agrave;m lượng hoạt chất cao nhất thị trường.</p>\n<p style=\"margin: 0px; padding: 0px;\">Cao Actis&ocirc; l&agrave; hoạt chất to&agrave;n phần chiết xuất từ l&aacute; tươi Actis&ocirc;, bằng c&ocirc;ng nghệ c&ocirc; ch&acirc;n kh&ocirc;ng, bảo to&agrave;n h&agrave;m lượng hoạt chất.</p>\n<p style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\">Th&agrave;nh phần:</strong><br style=\"margin: 0px; padding: 0px;\" />100 g cao đặc<a style=\"margin: 0px; padding: 0px; color: #1f7bb6; text-decoration-line: none; outline: 0px;\" href=\"http://baoveganmangvetailoc.ladopharquatangsuckhoe.vn/tim-hieu-ve-atiso-va-cong-dung-suc-khoe/\">acis&ocirc;</a>tương đương 3,5 kg l&aacute; tươi Actis&ocirc;.</p>\n<p style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\">C&aacute;ch d&ugrave;ng:</strong>D&ugrave;ng 2-3 g mỗi lần, ng&agrave;y 2-3 lần.<br style=\"margin: 0px; padding: 0px;\" />H&ograve;a tan cao đặc Actis&ocirc; trong nước n&oacute;ng,<br style=\"margin: 0px; padding: 0px;\" />D&ugrave;ng th&ecirc;m đường hay mật ong t&ugrave;y th&iacute;ch.</p>\n<p style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\">Bảo quản:</strong>Nơi kh&ocirc;, tr&aacute;nh &aacute;nh nắng trực tiếp.</p>\n<p style=\"margin: 0px; padding: 0px;\">Thực phẩm n&agrave;y kh&ocirc;ng phải l&agrave; thuốc, kh&ocirc;ng c&oacute; t&aacute;c dụng thay thế thuốc chữa bệnh.</p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>',120000,110000,NULL,NULL,NULL,3,1,1,1,'','','',NULL,NULL,NULL,100),(18,'Cà phê hạt',0,'2021-08-06 10:38:08','18KY',17,0,'https://appdala.net/wp-content/uploads/gia-ca-phe-hom-nay-114.jpg','','','<div style=\"text-align: justify;\"><span style=\"color: #242424; font-family: Roboto, Helvetica, Arial, sans-serif;\">CAM KẾT KH&Ocirc;NG tẩm hương liệu, h&oacute;a chất KH&Ocirc;NG sử dụng hạt c&oacute; phẩm cấp thấp KH&Ocirc;NG sử dụng c&aacute;c loại hạt kh&aacute;c để rang</span><br style=\"color: #242424; font-family: Roboto, Helvetica, Arial, sans-serif;\" /><span style=\"color: #242424; font-family: Roboto, Helvetica, Arial, sans-serif;\">Th&agrave;nh Phần : 80% Arabica + 20% Robusta Rang Mộc Ho&agrave;n To&agrave;n . Dạng Xay Pha Phin .</span></div>',350000,NULL,NULL,NULL,NULL,7,1,1,1,'','','',15,5,15,1000);
/*!40000 ALTER TABLE `dala_products_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_reviews_food_drink`
--

LOCK TABLES `dala_reviews_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_reviews_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_reviews_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_reviews_speciality`
--

LOCK TABLES `dala_reviews_speciality` WRITE;
/*!40000 ALTER TABLE `dala_reviews_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_reviews_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_reviews_store_speciality`
--

LOCK TABLES `dala_reviews_store_speciality` WRITE;
/*!40000 ALTER TABLE `dala_reviews_store_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_reviews_store_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_service_type`
--

LOCK TABLES `dala_service_type` WRITE;
/*!40000 ALTER TABLE `dala_service_type` DISABLE KEYS */;
INSERT INTO `dala_service_type` VALUES (3,'speciality','dịch vụ bán hàng đặc sản đà lạt'),(4,'food-drink','dịch vụ ăn uống ăn uông');
/*!40000 ALTER TABLE `dala_service_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_session_food_drink`
--

LOCK TABLES `dala_session_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_session_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_session_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_session_speciality`
--

LOCK TABLES `dala_session_speciality` WRITE;
/*!40000 ALTER TABLE `dala_session_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_session_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_shipping_company`
--

LOCK TABLES `dala_shipping_company` WRITE;
/*!40000 ALTER TABLE `dala_shipping_company` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_shipping_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_shipping_food_drink`
--

LOCK TABLES `dala_shipping_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_shipping_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_shipping_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_shipping_speciality`
--

LOCK TABLES `dala_shipping_speciality` WRITE;
/*!40000 ALTER TABLE `dala_shipping_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_shipping_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_shipping_tracking`
--

LOCK TABLES `dala_shipping_tracking` WRITE;
/*!40000 ALTER TABLE `dala_shipping_tracking` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_shipping_tracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_stores`
--

LOCK TABLES `dala_stores` WRITE;
/*!40000 ALTER TABLE `dala_stores` DISABLE KEYS */;
INSERT INTO `dala_stores` VALUES (17,51,'2021-10-03 00:19:17','Cửa hàng đặt sản đà lạt DALA',10000000,3,'số 51, trương định','Tỉnh Lâm Đồng','Thành phố Đà Lạt','Phường 8','09480360101','','','store infomartion',1,1,'01010011002','','','','',0,0,28,20,300);
/*!40000 ALTER TABLE `dala_stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_token`
--

LOCK TABLES `dala_token` WRITE;
/*!40000 ALTER TABLE `dala_token` DISABLE KEYS */;
INSERT INTO `dala_token` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJfcm9sZSI6ImRlZmF1bHQiLCJpYXQiOjE2MjMyMjg3NTl9.iQrzkanw_3SAyFT03Kq3GbWLdpcZtvkuswhKaKtsn0M',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJzX3Bob25lIjoiMDk0ODAzNjAxMDciLCJ1c2Vyc19lbWFpbCI6Ikd1ZXN0RGFsYUFsbEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQxMjc4OTUzNGY1Y2Q1YjI2M2JiNTc0YmEyZjA5NTg1IiwidXNlcl9yb2xlIjoiZGVmYXVsdCIsImlhdCI6MTYyMzIyODc1OX0.q5Qv9zG_ynJsnOFFqcB4mDpMftZ9fxHToXbFfuAxXBo','2021-10-03 00:19:17'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2VyX3JvbGUiOiJzdXBwZXItam9iIiwiaWF0IjoxNjIzNTUxNTE3fQ.lPM-4c93GPDnmwHwayVp94AXPtG0Zn7oyt5U8djJVwQ',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2Vyc19waG9uZSI6IjA4ODk0NTAzMDciLCJ1c2Vyc19lbWFpbCI6InN1cHBlci1qb2JAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJlNmY2YzE4NTY5MDlmZDRiNTI3YjNhYjA0ZDBlOTlhMyIsInVzZXJfcm9sZSI6InN1cHBlci1qb2IiLCJpYXQiOjE2MjM1NTE1MTd9.S37Ab2vDod4e9YErqdqeLEFTUt18WgEcxMUtsROdC7o','2021-10-03 00:19:17'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTAsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nX2dodGsiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzE3Mjk4Nn0.nVFL657kw9PZ-a0WnVqQHNU99m2-gMVSG2ClmXptBNo',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTAsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nX2dodGsiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIzIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzEyQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzE3Mjk4Nn0.D47F-HWdwmpSJu1Xt5ooiKOgArV33D0R0dGnKIY3M7w','2021-10-03 00:19:17'),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyMjA3NDN9.AMiUeNj7DaSjouVfDPH1rQ-OzXEXWQVPEyOGSws5bNA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzIyMDc0M30.DIbtoLScZaT2-yVXCIix5tu0iHSszGITxb0SpHzeBnA','2021-10-03 07:25:43'),(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjA4MTB9.AFR7r2I6XpH-50j9pAvfbUpv7FtTiv5KmpXOGXUfpso',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjA4MTB9.qWqqeWDmYbTH5m0YPsb_FF5iqL7KiV3pQ1fkT1l3HEI','2021-10-03 07:26:50'),(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyMjExNzZ9.UCTF4ii6PCLw4NOqtsRwqCpEZ1uEvGB1sj_BB13NhHo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzIyMTE3Nn0.dD0hTLt08Thzh65OUyziOvysoT-u5ilCISWCLuiFrA4','2021-10-03 07:32:56');
/*!40000 ALTER TABLE `dala_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_uploads_infomation`
--

LOCK TABLES `dala_uploads_infomation` WRITE;
/*!40000 ALTER TABLE `dala_uploads_infomation` DISABLE KEYS */;
INSERT INTO `dala_uploads_infomation` VALUES (1,'2021-10-03 07:28:34',51,'https://appdala.net/wp-content/uploads/dala-image.jpg',464);
/*!40000 ALTER TABLE `dala_uploads_infomation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_users`
--

LOCK TABLES `dala_users` WRITE;
/*!40000 ALTER TABLE `dala_users` DISABLE KEYS */;
INSERT INTO `dala_users` VALUES (50,'2021-05-19 14:36:30','manage-dala','a3dcb4d229de6fde0db5686dee47145d','','manage-dala','manage-dala','manage-dala','0948036018','htms.group.vn@gmail.com','v4','v4','v4','v4',13,0,0,0,'',NULL),(51,'2021-05-19 14:37:36','dala-store','a3dcb4d229de6fde0db5686dee47145d','','dala-store','dala-store','dala-store','09480360101','dala-store@gmail.com','v4','v4','v4','v4',14,0,0,0,'',NULL),(56,'2021-05-19 14:47:18','custommer','a3dcb4d229de6fde0db5686dee47145d','','custommer','custommer','custommer','09480360106','custommer@gmail.com','v4','v4','v4','v4',15,0,0,0,'',NULL),(57,'2021-05-19 14:48:49','GuestDalaAll','412789534f5cd5b263bb574ba2f09585','','GuestDalaAll','GuestDalaAll','GuestDalaAll','09480360107','GuestDalaAll@gmail.com','v4','v4','v4','v4',16,0,0,0,'',NULL),(62,'2021-05-19 14:48:49','supper-job','e6f6c1856909fd4b527b3ab04d0e99a3','','supper-job','supper-job','supper-job','0889450307','supper-job@gmail.com','v4','v4','v4','v4',17,0,0,0,'',NULL),(63,'2021-05-19 14:48:49','shipping 1','a3dcb4d229de6fde0db5686dee47145d','','shipping 1','shipping 1','shipping 1','09480360121','shipping1@gmail.com','v4','v4','v4','v4',18,0,0,0,'',NULL),(90,'2021-05-19 14:48:49','shipping_ghtk','a3dcb4d229de6fde0db5686dee47145d','','shipping ghtk','shipping ghtk','shipping ghtk','09480360123','shipping12@gmail.com','v4','v4','v4','v4',18,0,0,0,'',NULL);
/*!40000 ALTER TABLE `dala_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_users_tracking`
--

LOCK TABLES `dala_users_tracking` WRITE;
/*!40000 ALTER TABLE `dala_users_tracking` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_users_tracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_users_type`
--

LOCK TABLES `dala_users_type` WRITE;
/*!40000 ALTER TABLE `dala_users_type` DISABLE KEYS */;
INSERT INTO `dala_users_type` VALUES (13,'admin','354aae4c3655725e157156614010b592'),(14,'bussiness','950a14f62033feb91295dcb123d88e06'),(15,'customer','c20284d123204abaf547da15957b17f8'),(16,'default','319b17162d07a5697a5b2175279a54b0'),(17,'supper-job','22e9dfe5055e7e35bd4f754a01c365f7'),(18,'shipping','c18907b28bc58bce8aa0776e8cf0fae9');
/*!40000 ALTER TABLE `dala_users_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dala_view_product`
--

LOCK TABLES `dala_view_product` WRITE;
/*!40000 ALTER TABLE `dala_view_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_view_product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-03  8:05:47

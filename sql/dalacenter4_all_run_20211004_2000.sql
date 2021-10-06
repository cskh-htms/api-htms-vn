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
-- Table structure for table `dala_adress_meta`
--

DROP TABLE IF EXISTS `dala_adress_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_adress_meta` (
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
  KEY `adress_meta_user_id` (`dala_adress_meta_user_id`),
  CONSTRAINT `adress_meta_user_id` FOREIGN KEY (`dala_adress_meta_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_adress_meta`
--

LOCK TABLES `dala_adress_meta` WRITE;
/*!40000 ALTER TABLE `dala_adress_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_adress_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_brands`
--

DROP TABLE IF EXISTS `dala_brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_brands` (
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
  KEY `brands_stores_id` (`dala_brands_stores_id`),
  CONSTRAINT `brands_stores_id` FOREIGN KEY (`dala_brands_stores_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_brands`
--

LOCK TABLES `dala_brands` WRITE;
/*!40000 ALTER TABLE `dala_brands` DISABLE KEYS */;
INSERT INTO `dala_brands` VALUES (1,'2021-07-22 16:32:02','Nông lâm food','','','',1,1,1,17,''),(2,'2021-07-22 16:32:16','BerryLand','','','',1,1,1,17,''),(3,'2021-07-22 16:32:41','Ladophar','','','',1,1,1,17,''),(4,'2021-07-22 16:32:56','Biofresh','','','',1,1,1,17,''),(5,'2021-07-22 16:33:12','Dalat Natural Food','','','',1,1,1,17,''),(6,'2021-07-22 16:33:36','Quốc Lộc Coffee','','','',1,1,1,17,''),(7,'2021-07-22 16:34:01','BaolocReal coffee','','','',1,1,1,17,'');
/*!40000 ALTER TABLE `dala_brands` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_brands_name_insert` BEFORE INSERT ON `dala_brands` FOR EACH ROW BEGIN  





IF(NEW.dala_brands_name  is null or NEW.dala_brands_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_brands_name_name_empty';   
END IF;





END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_brands_name_update` BEFORE INSERT ON `dala_brands` FOR EACH ROW BEGIN  





IF(NEW.dala_brands_name  is null or NEW.dala_brands_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_brands_name_name_empty';   
END IF;





END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_category_general_food_drink`
--

DROP TABLE IF EXISTS `dala_category_general_food_drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_category_general_food_drink` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_category_general_food_drink`
--

LOCK TABLES `dala_category_general_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_category_general_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_category_general_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_category_general_food_drink_link`
--

DROP TABLE IF EXISTS `dala_category_general_food_drink_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_category_general_food_drink_link` (
  `dala_category_general_food_drink_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_category_general_food_drink_link_product_id` int NOT NULL,
  `dala_category_general_food_drink_link_category_general_id` int NOT NULL,
  PRIMARY KEY (`dala_category_general_food_drink_link_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_category_general_food_drink_link`
--

LOCK TABLES `dala_category_general_food_drink_link` WRITE;
/*!40000 ALTER TABLE `dala_category_general_food_drink_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_category_general_food_drink_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_category_general_speciality`
--

DROP TABLE IF EXISTS `dala_category_general_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_category_general_speciality` (
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
  KEY `category_general_speciality_stores_id` (`dala_category_general_speciality_stores_id`),
  CONSTRAINT `category_general_speciality_stores_id` FOREIGN KEY (`dala_category_general_speciality_stores_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_category_general_speciality`
--

LOCK TABLES `dala_category_general_speciality` WRITE;
/*!40000 ALTER TABLE `dala_category_general_speciality` DISABLE KEYS */;
INSERT INTO `dala_category_general_speciality` VALUES (1,'2021-07-22 16:42:57','Mứt Đà Lạt',0,'','https://appdala.net/wp-content/uploads/mut-da-lat.jpg',0,0,1,17,1,1,0,''),(2,'2021-07-22 16:43:51','Trái cây sấy dẻo',0,'','https://appdala.net/wp-content/uploads/Cam-say-deo-mieng-dd.png',0,0,1,17,1,1,0,''),(3,'2021-07-22 16:44:36','Trái cây sấy giòn',0,'','https://appdala.net/wp-content/uploads/da3728fda069e59045a35f2690f54473.jpg',0,0,1,17,1,1,0,''),(4,'2021-07-22 16:45:30','Trà Đà Lạt',0,'','https://appdala.net/wp-content/uploads/bbb414fce57effb6f515f645dba86d93.jpg',0,0,1,17,1,1,0,''),(5,'2021-07-22 16:47:02','Cà phê Đà Lạt',0,'','https://appdala.net/wp-content/uploads/34a9337cfaed3db1a2774372d437736e.jpg',0,0,1,17,1,1,0,''),(6,'2021-07-22 16:47:51','Thảo mộc các loại',0,'','https://appdala.net/wp-content/uploads/3cdda630132c82aaf892d1f884467b31.jpg_720x720q80.jpg_.webp',0,0,1,17,1,1,0,''),(7,'2021-07-22 16:48:51','Nước ép siro trái cây',0,'','https://appdala.net/wp-content/uploads/2ece254fbcda49414fdf897a175e75ae.png',0,0,1,17,1,1,0,''),(8,'2021-07-22 16:50:39','Nông sản sạch đà lạt',0,'','https://appdala.net/wp-content/uploads/21881afa49d23f9683a73615771d0464.jpg',0,0,1,17,1,1,0,''),(9,'2021-07-22 16:53:44','Kẹo dẻo',1,'','https://appdala.net/wp-content/uploads/images-5.jpg',0,0,1,17,1,1,0,''),(10,'2021-07-22 16:55:04','Mứt Atiso',1,'','https://appdala.net/wp-content/uploads/cach-lam-mut-atiso.jpg',0,0,1,17,1,1,0,''),(11,'2021-07-22 16:55:36','Mứt Chanh dây',1,'','https://appdala.net/wp-content/uploads/mut-chanh-day-1.jpg',0,0,1,17,1,1,0,''),(12,'2021-07-22 16:56:56','Bưởi sấy dẻo',2,'','https://appdala.net/wp-content/uploads/Vo-buoi-say-deo-5.png',0,0,1,17,1,1,0,''),(13,'2021-07-22 16:57:43','Cam sấy dẻo',2,'','https://appdala.net/wp-content/uploads/Cam-say-deo-mieng-dd-1.png',0,0,1,17,1,1,0,''),(14,'2021-07-22 16:58:34','Chuối sấy dẻo',2,'','https://appdala.net/wp-content/uploads/Chuoi-say-gion-2.png',0,0,1,17,1,1,0,''),(15,'2021-07-22 17:00:24','Dâu tây sấy dẻo',2,'','https://appdala.net/wp-content/uploads/78172ebc76c0f9bb2d29b7250fd63957.jpg',0,0,1,17,1,1,0,''),(16,'2021-07-22 17:01:14','Hồng sấy dẻo',2,'','https://appdala.net/wp-content/uploads/Quat-deo.png',0,0,1,17,1,1,0,''),(17,'2021-07-22 17:02:17','Mãng cầu sấy dẻo',2,'','https://appdala.net/wp-content/uploads/mang-cau-say.jpg',0,0,1,17,1,1,0,''),(18,'2021-07-22 17:07:35','Chuối sấy giòn',3,'','https://appdala.net/wp-content/uploads/2e9b4494388685cb3c627da9cf9781db.jpg_720x720q80.jpg_.webp',0,0,1,17,1,1,0,''),(19,'2021-07-22 17:09:29','Khoai lang sấy giòn',3,'','https://appdala.net/wp-content/uploads/khoai-lang.jpg',0,0,1,17,1,1,0,''),(20,'2021-07-22 17:10:09','Mít sấy giòn',3,'','https://appdala.net/wp-content/uploads/Mit-say-gion.jpg',0,0,1,17,1,1,0,''),(21,'2021-07-22 22:48:57','Thập cẩm sấy giòn',3,'','https://appdala.net/wp-content/uploads/4b8ee6587c99d0b270a16cb10672b32b-2.jpg',0,0,1,17,1,1,0,''),(22,'2021-07-22 22:50:47','Trà Atiso',4,'','https://appdala.net/wp-content/uploads/tra-atiso-dalat-4.jpg',0,0,1,17,1,1,0,''),(23,'2021-07-22 22:51:31','Trà Linh Chi',4,'','https://appdala.net/wp-content/uploads/tra-linh-chi-thuc-uong-giai-khat-va-phong-benh-hieu-qua1506907162.jpg',0,0,1,17,1,1,0,''),(24,'2021-07-22 22:52:12','Trà túi lọc',4,'','https://appdala.net/wp-content/uploads/Tra-tui-loc-1.jpg',0,0,1,17,1,1,0,''),(25,'2021-07-22 22:54:48','Cao đặt actiso',6,'','https://appdala.net/wp-content/uploads/cao_dac_22_new_768ae69b77804b74abc8c4bbe889d5dc_large.jpg',0,0,1,17,1,1,0,''),(26,'2021-07-22 22:55:37','Cao uống actiso',6,'','https://appdala.net/wp-content/uploads/3d_ladoactiso_cao_ong_co_duong_master_new_fcbe512fceda499abb1755d22c48ac07_large.jpg',0,0,1,17,1,1,0,''),(27,'2021-07-22 22:57:44','Các loại hạt',8,'','https://appdala.net/wp-content/uploads/hat-macca-lam-dong.jpg',0,0,1,17,1,1,0,''),(28,'2021-07-22 22:58:37','Gạo nếp',8,'','https://appdala.net/wp-content/uploads/tai-xuong.jpg',0,0,1,17,1,1,0,'');
/*!40000 ALTER TABLE `dala_category_general_speciality` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_general_speciality_name_insert` BEFORE INSERT ON `dala_category_general_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_category_general_speciality_name  is null or NEW.dala_category_general_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_category_general_speciality_name_name_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_general_speciality_stores_id_insert` BEFORE INSERT ON `dala_category_general_speciality` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_category_general_speciality_stores_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_category_general_speciality_stores_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_general_speciality_category_parent_id_insert` BEFORE INSERT ON `dala_category_general_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_category_general_speciality_category_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_category_general_speciality_ID  
	from dala_category_general_speciality 
	where dala_category_general_speciality_ID = NEW.dala_category_general_speciality_category_parent_id);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_category_general_speciality_category_parent_id_no_parent'; 
	END IF;	
END IF;


END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_category_general_speciality_link`
--

DROP TABLE IF EXISTS `dala_category_general_speciality_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_category_general_speciality_link` (
  `dala_category_general_speciality_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_category_general_speciality_link_product_id` int NOT NULL,
  `dala_category_general_speciality_link_category_general_id` int NOT NULL,
  PRIMARY KEY (`dala_category_general_speciality_link_ID`),
  KEY `category_general_speciality_link_category_general_id` (`dala_category_general_speciality_link_category_general_id`),
  KEY `category_general_speciality_link_product_id` (`dala_category_general_speciality_link_product_id`),
  CONSTRAINT `category_general_speciality_link_category_general_id` FOREIGN KEY (`dala_category_general_speciality_link_category_general_id`) REFERENCES `dala_category_general_speciality` (`dala_category_general_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_general_speciality_link_product_id` FOREIGN KEY (`dala_category_general_speciality_link_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_category_general_speciality_link`
--

LOCK TABLES `dala_category_general_speciality_link` WRITE;
/*!40000 ALTER TABLE `dala_category_general_speciality_link` DISABLE KEYS */;
INSERT INTO `dala_category_general_speciality_link` VALUES (83,18,8),(84,18,27),(85,13,6),(86,13,25),(97,8,2),(98,8,13),(99,7,2),(100,7,12),(113,20,8),(114,20,27),(115,19,8),(116,19,27),(117,12,4),(118,12,22),(119,11,3),(120,11,18),(121,10,2),(122,10,15),(123,9,2),(124,9,14),(125,6,1),(126,6,11),(127,5,1),(128,5,9),(129,4,1),(130,4,10),(131,3,1),(132,3,9);
/*!40000 ALTER TABLE `dala_category_general_speciality_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_category_news`
--

DROP TABLE IF EXISTS `dala_category_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_category_news` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_category_news`
--

LOCK TABLES `dala_category_news` WRITE;
/*!40000 ALTER TABLE `dala_category_news` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_category_news` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_news_insert` BEFORE INSERT ON `dala_category_news` FOR EACH ROW BEGIN  




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






END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_news_update` BEFORE UPDATE ON `dala_category_news` FOR EACH ROW BEGIN  




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






END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_category_news_link`
--

DROP TABLE IF EXISTS `dala_category_news_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_category_news_link` (
  `dala_category_news_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_category_news_link_news_id` int NOT NULL,
  `dala_category_news_link_category_news_id` int NOT NULL,
  PRIMARY KEY (`dala_category_news_link_ID`),
  KEY `category_news_link_news_id` (`dala_category_news_link_news_id`),
  KEY `category_news_link_category_news_id` (`dala_category_news_link_category_news_id`),
  CONSTRAINT `category_news_link_category_news_id` FOREIGN KEY (`dala_category_news_link_category_news_id`) REFERENCES `dala_category_news` (`dala_category_news_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_news_link_news_id` FOREIGN KEY (`dala_category_news_link_news_id`) REFERENCES `dala_news` (`dala_news_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_category_news_link`
--

LOCK TABLES `dala_category_news_link` WRITE;
/*!40000 ALTER TABLE `dala_category_news_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_category_news_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_comments_food_drink`
--

DROP TABLE IF EXISTS `dala_comments_food_drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_comments_food_drink` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_comments_food_drink`
--

LOCK TABLES `dala_comments_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_comments_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_comments_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_comments_news`
--

DROP TABLE IF EXISTS `dala_comments_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_comments_news` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_comments_news`
--

LOCK TABLES `dala_comments_news` WRITE;
/*!40000 ALTER TABLE `dala_comments_news` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_comments_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_comments_speciality`
--

DROP TABLE IF EXISTS `dala_comments_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_comments_speciality` (
  `dala_comments_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_comments_speciality_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_comments_speciality_user_id` int NOT NULL,
  `dala_comments_speciality_comment_parent_id` int DEFAULT '0',
  `dala_comments_speciality_product_id` int NOT NULL,
  `dala_comments_speciality_contents` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_comments_speciality_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_comments_speciality_ID`),
  KEY `comments_speciality_user_id` (`dala_comments_speciality_user_id`),
  KEY `comments_speciality_product_id` (`dala_comments_speciality_product_id`),
  CONSTRAINT `comments_speciality_product_id` FOREIGN KEY (`dala_comments_speciality_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comments_speciality_user_id` FOREIGN KEY (`dala_comments_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_comments_speciality`
--

LOCK TABLES `dala_comments_speciality` WRITE;
/*!40000 ALTER TABLE `dala_comments_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_comments_speciality` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_comments_speciality_user_id_insert` BEFORE INSERT ON `dala_comments_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_comments_speciality_user_id  is null or NEW.dala_comments_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_comments_speciality_user_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_comments_speciality_product_id_insert` BEFORE INSERT ON `dala_comments_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_comments_speciality_product_id  is null or NEW.dala_comments_speciality_product_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_comments_speciality_product_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_comments_speciality_comment_parent_id_insert` BEFORE INSERT ON `dala_comments_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_comments_speciality_comment_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_comments_speciality_ID 
	from dala_comments_speciality   
	where dala_comments_speciality_ID = NEW.dala_comments_speciality_ID);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_comments_speciality_comment_parent_id_no_parent'; 
	END IF;	
END IF;


END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_comments_speciality_user_id_update` BEFORE UPDATE ON `dala_comments_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_comments_speciality_user_id  is null or NEW.dala_comments_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_comments_speciality_user_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_comments_speciality_product_id_update` BEFORE UPDATE ON `dala_comments_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_comments_speciality_product_id  is null or NEW.dala_comments_speciality_product_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_comments_speciality_product_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_comments_speciality_comment_parent_id_update` BEFORE UPDATE ON `dala_comments_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_comments_speciality_comment_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_comments_speciality_ID 
	from dala_comments_speciality   
	where dala_comments_speciality_ID = NEW.dala_comments_speciality_ID);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_comments_speciality_comment_parent_id_no_parent'; 
	END IF;	
END IF;


END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_coupon_speciality`
--

DROP TABLE IF EXISTS `dala_coupon_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_coupon_speciality` (
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
  KEY `coupon_speciality_stores_id_created` (`dala_coupon_speciality_stores_id_created`),
  CONSTRAINT `coupon_speciality_stores_id_created` FOREIGN KEY (`dala_coupon_speciality_stores_id_created`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_coupon_speciality`
--

LOCK TABLES `dala_coupon_speciality` WRITE;
/*!40000 ALTER TABLE `dala_coupon_speciality` DISABLE KEYS */;
INSERT INTO `dala_coupon_speciality` VALUES (1,'2021-10-04 12:27:24','MPVC',17,'miễn ph&iacute; vận chuyển cho đơn h&agrave;ng tr&ecirc;n 500.000',0,2,0,0,500000,30000,NULL,NULL,0,4,1,0,0,''),(2,'2021-10-04 12:28:52','THANG10-HOT',17,'GIẢM GI&Aacute; TH&Aacute;NG 10',0,0,10,0,1000000,200000,NULL,NULL,0,4,1,0,0,''),(3,'2021-10-04 12:37:01','FIRST-SALE',17,'Giảm gi&aacute; cho kần đầu ti&ecirc;n mua h&agrave;ng tại DALA',0,0,10,3,0,200000,NULL,NULL,0,4,0,0,0,'');
/*!40000 ALTER TABLE `dala_coupon_speciality` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_coupon_speciality_code_insert` BEFORE INSERT ON `dala_coupon_speciality` FOR EACH ROW BEGIN  

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



END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_coupon_speciality_code_update` BEFORE UPDATE ON `dala_coupon_speciality` FOR EACH ROW BEGIN  

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


END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_discount_program`
--

DROP TABLE IF EXISTS `dala_discount_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_discount_program` (
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
  KEY `discount_program_store_id_created` (`dala_discount_program_store_id_created`),
  CONSTRAINT `discount_program_store_id_created` FOREIGN KEY (`dala_discount_program_store_id_created`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_discount_program`
--

LOCK TABLES `dala_discount_program` WRITE;
/*!40000 ALTER TABLE `dala_discount_program` DISABLE KEYS */;
INSERT INTO `dala_discount_program` VALUES (1,'2021-10-03 13:02:00','mức dâu giảm giá 40%',17,'https://appdala.net/wp-content/uploads/mut-dau-tay-ngot-ngao-1.jpg',0,0,0,0,0,4,0,0,0,3,0,NULL,NULL,'giảm gi&aacute; 40% cho tất cả c&aacute;c mứt d&acirc;u',''),(2,'2021-10-03 13:03:14','FLASH SALE',17,'https://appdala.net/wp-content/uploads/6-1.jpg',0,0,1,0,0,4,0,0,0,3,0,NULL,NULL,'',''),(3,'2021-10-03 13:07:28','Giảm gái Theo mùa',17,'https://appdala.net/wp-content/uploads/avd-0ebd1-1.jpg',0,0,2,0,0,4,0,0,0,3,0,NULL,NULL,'giảm g&aacute;i theo m&ugrave;a',''),(4,'2021-10-03 13:07:55','Mua 1 tặng 1',17,'https://appdala.net/wp-content/uploads/now-vn-deal-trai-cay-mua-1-tang-1-tat-ca-san-pham-1.jpg',0,0,3,0,0,4,1,0,0,3,0,NULL,NULL,'mua 1 tặng 1','											');
/*!40000 ALTER TABLE `dala_discount_program` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_discount_program_name_insert` BEFORE INSERT ON `dala_discount_program` FOR EACH ROW BEGIN  



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






END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_discount_program_name_update` BEFORE UPDATE ON `dala_discount_program` FOR EACH ROW BEGIN  

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



END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_discount_program_details`
--

DROP TABLE IF EXISTS `dala_discount_program_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_discount_program_details` (
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
  KEY `discount_program_details_store_id` (`dala_discount_program_details_store_id`),
  CONSTRAINT `discount_program_details_discount_program_id` FOREIGN KEY (`dala_discount_program_details_discount_program_id`) REFERENCES `dala_discount_program` (`dala_discount_program_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `discount_program_details_store_id` FOREIGN KEY (`dala_discount_program_details_store_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_discount_program_details`
--

LOCK TABLES `dala_discount_program_details` WRITE;
/*!40000 ALTER TABLE `dala_discount_program_details` DISABLE KEYS */;
INSERT INTO `dala_discount_program_details` VALUES (1,'2021-10-04 11:22:13',2,18,4,0,0,10,3,'										'),(2,'2021-10-04 11:23:56',2,17,4,0,0,10,3,'										'),(3,'2021-10-04 11:26:36',3,18,4,0,0,10,3,'																				'),(4,'2021-10-04 11:26:50',3,17,4,0,0,10,3,'																				'),(5,'2021-10-04 11:27:50',4,18,4,0,0,10,3,'										'),(6,'2021-10-04 11:28:07',1,18,4,0,0,10,3,'										'),(7,'2021-10-04 11:28:27',4,17,4,0,0,10,3,'										'),(8,'2021-10-04 11:28:35',1,17,4,0,0,10,3,'										');
/*!40000 ALTER TABLE `dala_discount_program_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_check_owner_discount_program_insert` BEFORE INSERT ON `dala_discount_program_details` FOR EACH ROW BEGIN  

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

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_check_owner_discount_program_update` BEFORE UPDATE ON `dala_discount_program_details` FOR EACH ROW BEGIN  

	
	
	
	
	
	
	
	
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
	
	
		
		
	

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_discount_program_product_link`
--

DROP TABLE IF EXISTS `dala_discount_program_product_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_discount_program_product_link` (
  `dala_discount_program_product_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_discount_program_product_link_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_discount_program_product_link_discount_program_details_id` int NOT NULL,
  `dala_discount_program_product_link_product_speciality_id` int NOT NULL,
  `dala_discount_program_product_link_status` tinyint(1) NOT NULL DEFAULT '0',
  `dala_discount_program_product_link_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_discount_program_product_link_ID`),
  KEY `discount_program_product_link_discount_program_details_id` (`dala_discount_program_product_link_discount_program_details_id`),
  KEY `discount_program_product_link_product_speciality_id` (`dala_discount_program_product_link_product_speciality_id`),
  CONSTRAINT `discount_program_product_link_discount_program_details_id` FOREIGN KEY (`dala_discount_program_product_link_discount_program_details_id`) REFERENCES `dala_discount_program_details` (`dala_discount_program_details_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `discount_program_product_link_product_speciality_id` FOREIGN KEY (`dala_discount_program_product_link_product_speciality_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_discount_program_product_link`
--

LOCK TABLES `dala_discount_program_product_link` WRITE;
/*!40000 ALTER TABLE `dala_discount_program_product_link` DISABLE KEYS */;
INSERT INTO `dala_discount_program_product_link` VALUES (1,'2021-10-04 11:22:52',1,19,1,''),(2,'2021-10-04 11:22:58',1,20,1,''),(3,'2021-10-04 11:25:15',2,18,1,''),(4,'2021-10-04 11:25:27',2,8,1,''),(5,'2021-10-04 11:25:37',2,13,1,''),(6,'2021-10-04 12:17:51',3,19,1,''),(7,'2021-10-04 12:18:03',5,20,1,''),(8,'2021-10-04 12:18:19',6,19,1,''),(9,'2021-10-04 12:19:10',4,10,1,''),(10,'2021-10-04 12:19:16',4,11,1,''),(11,'2021-10-04 12:19:32',7,5,1,''),(12,'2021-10-04 12:19:38',7,4,1,''),(13,'2021-10-04 12:19:49',8,12,1,''),(15,'2021-10-04 12:20:03',8,7,1,'');
/*!40000 ALTER TABLE `dala_discount_program_product_link` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_discount_program_product_link_insert` BEFORE INSERT ON `dala_discount_program_product_link` FOR EACH ROW BEGIN  

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

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_discount_program_product_link_update` BEFORE UPDATE ON `dala_discount_program_product_link` FOR EACH ROW BEGIN  




	
	
	
	
	
	
	
	
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


END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_like_product`
--

DROP TABLE IF EXISTS `dala_like_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_like_product` (
  `dala_like_product_ID` int NOT NULL AUTO_INCREMENT,
  `dala_like_product_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_like_product_user_id` int NOT NULL,
  `dala_like_product_product_id` int NOT NULL,
  `dala_like_product_status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_like_product_ID`),
  KEY `like_product_user_id` (`dala_like_product_user_id`),
  KEY `like_product_product_id` (`dala_like_product_product_id`),
  CONSTRAINT `like_product_product_id` FOREIGN KEY (`dala_like_product_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `like_product_user_id` FOREIGN KEY (`dala_like_product_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_like_product`
--

LOCK TABLES `dala_like_product` WRITE;
/*!40000 ALTER TABLE `dala_like_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_like_product` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_like_product_insert` BEFORE INSERT ON `dala_like_product` FOR EACH ROW BEGIN  

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








END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_like_product_update` BEFORE UPDATE ON `dala_like_product` FOR EACH ROW BEGIN  

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

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_like_store`
--

DROP TABLE IF EXISTS `dala_like_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_like_store` (
  `dala_like_store_ID` int NOT NULL AUTO_INCREMENT,
  `dala_like_store_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_like_store_user_id` int NOT NULL,
  `dala_like_store_store_id` int NOT NULL,
  `dala_like_store_status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_like_store_ID`),
  KEY `like_store_user_id` (`dala_like_store_user_id`),
  KEY `like_store_store_id` (`dala_like_store_store_id`),
  CONSTRAINT `like_store_store_id` FOREIGN KEY (`dala_like_store_store_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `like_store_user_id` FOREIGN KEY (`dala_like_store_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_like_store`
--

LOCK TABLES `dala_like_store` WRITE;
/*!40000 ALTER TABLE `dala_like_store` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_like_store` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_like_store_insert` BEFORE INSERT ON `dala_like_store` FOR EACH ROW BEGIN  

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



END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_like_store_update` BEFORE UPDATE ON `dala_like_store` FOR EACH ROW BEGIN  

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

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_news`
--

DROP TABLE IF EXISTS `dala_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_news` (
  `dala_news_ID` int NOT NULL AUTO_INCREMENT,
  `dala_news_title` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_news_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_news_featured_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_news_excerpt` varchar(6000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_news_contents` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_news_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_news_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_news`
--

LOCK TABLES `dala_news` WRITE;
/*!40000 ALTER TABLE `dala_news` DISABLE KEYS */;
INSERT INTO `dala_news` VALUES (1,'DALA khai mở app vào ngày 10/10 ','2021-10-04 12:33:44','','','Ng&agrave;y 10/10 l&agrave; ng&agrave;y tốt để khia app DALA, hy vọng DALA sẽ l&agrave; một c&uacute; h&iacute;ch cho thị trường mua b&aacute;n online Việt Nam',1),(2,'Khách hàng đầu tiên','2021-10-04 12:34:48','','','DALA sẽ c&oacute; nhiều ưu đ&atilde;i cho kh&aacute;ch h&agrave;ng mua sản phẩm đầu ti&ecirc;n',1),(3,'Giảm giá 10% cho khách hàng mua đơn hàng lần đầu tại DALA','2021-10-04 12:36:00','','','Giảm gi&aacute; 10% cho kh&aacute;ch h&agrave;ng mua đơn h&agrave;ng lần đầu tại DALA, đ&acirc;y l&agrave; chương tr&igrave;nh ưu đ&atilde;i hữu &iacute;ch nh&acirc;n l&uacute;c khai mở ap DALA',1);
/*!40000 ALTER TABLE `dala_news` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_news_title_insert` BEFORE INSERT ON `dala_news` FOR EACH ROW BEGIN  
IF(NEW.dala_news_title  is null or NEW.dala_news_title = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_news_title_name_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_news_title_update` BEFORE UPDATE ON `dala_news` FOR EACH ROW BEGIN  
IF(NEW.dala_news_title  is null or NEW.dala_news_title = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_news_title_name_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_notes`
--

DROP TABLE IF EXISTS `dala_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_notes` (
  `dala_notes_ID` int NOT NULL AUTO_INCREMENT,
  `dala_notes_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_notes_user_id` int NOT NULL,
  `dala_notes_status` tinyint(1) NOT NULL DEFAULT '0',
  `dala_notes_title` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_notes_contents` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_notes_ID`),
  KEY `notes_user_id` (`dala_notes_user_id`),
  CONSTRAINT `notes_user_id` FOREIGN KEY (`dala_notes_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Gữi thông tin cho khách hàng';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_notes`
--

LOCK TABLES `dala_notes` WRITE;
/*!40000 ALTER TABLE `dala_notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_options_product_food_drink`
--

DROP TABLE IF EXISTS `dala_options_product_food_drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_options_product_food_drink` (
  `dala_options_product_food_drink_ID` int NOT NULL AUTO_INCREMENT,
  `dala_options_product_food_drink_name` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_food_drink_featured_image` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_food_drink_parent_id` int NOT NULL DEFAULT '0',
  `dala_options_product_food_drink_type` int NOT NULL DEFAULT '0',
  `dala_options_product_food_drink_information` varchar(4000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_food_drink_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`dala_options_product_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_options_product_food_drink`
--

LOCK TABLES `dala_options_product_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_options_product_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_options_product_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_options_product_food_drink_link`
--

DROP TABLE IF EXISTS `dala_options_product_food_drink_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_options_product_food_drink_link` (
  `dala_options_product_food_drink_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_options_product_food_drink_link_product_id` int NOT NULL,
  `dala_options_product_food_drink_link_option_id` int NOT NULL,
  PRIMARY KEY (`dala_options_product_food_drink_link_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_options_product_food_drink_link`
--

LOCK TABLES `dala_options_product_food_drink_link` WRITE;
/*!40000 ALTER TABLE `dala_options_product_food_drink_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_options_product_food_drink_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_options_product_food_drink_link_details`
--

DROP TABLE IF EXISTS `dala_options_product_food_drink_link_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_options_product_food_drink_link_details` (
  `dala_options_product_food_drink_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_options_product_food_drink_link_options_id` int NOT NULL,
  `dala_options_product_food_drink_link_price` float NOT NULL,
  `dala_options_product_food_drink_link_default_type` int NOT NULL DEFAULT '0',
  `dala_options_product_food_drink_link_images` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_options_product_food_drink_link_information` tinytext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_options_product_food_drink_link_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_options_product_food_drink_link_details`
--

LOCK TABLES `dala_options_product_food_drink_link_details` WRITE;
/*!40000 ALTER TABLE `dala_options_product_food_drink_link_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_options_product_food_drink_link_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_options_product_speciality`
--

DROP TABLE IF EXISTS `dala_options_product_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_options_product_speciality` (
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
  KEY `options_product_speciality_stores_id` (`dala_options_product_speciality_stores_id`),
  CONSTRAINT `options_product_speciality_stores_id` FOREIGN KEY (`dala_options_product_speciality_stores_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_options_product_speciality`
--

LOCK TABLES `dala_options_product_speciality` WRITE;
/*!40000 ALTER TABLE `dala_options_product_speciality` DISABLE KEYS */;
INSERT INTO `dala_options_product_speciality` VALUES (1,'Màu sắc','',0,17,1,1,1,'','2021-07-22 16:36:47',''),(2,'Kích thước','',0,17,1,1,1,'','2021-07-22 16:37:00',''),(3,'Loại hộp','',0,17,1,1,1,'','2021-07-22 16:37:21',''),(4,'màu xanh','',1,17,1,1,1,'','2021-07-22 16:38:56',''),(5,'Màu đỏ','',1,17,1,1,1,'','2021-07-22 16:39:06',''),(6,'Màu đen','',1,17,1,1,1,'','2021-07-22 16:39:21',''),(7,'Màu trắng','',1,17,1,1,1,'','2021-07-22 16:39:30',''),(8,'Size lớn','',2,17,1,1,1,'','2021-07-22 16:39:44',''),(9,'Size nhỏ','',2,17,1,1,1,'','2021-07-22 16:39:53',''),(10,'Hộp lớn','',3,17,1,1,1,'','2021-07-22 16:40:06',''),(11,'Hộp nhỏ','',3,17,1,1,1,'','2021-07-22 16:40:15','');
/*!40000 ALTER TABLE `dala_options_product_speciality` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_options_product_speciality_insert` BEFORE INSERT ON `dala_options_product_speciality` FOR EACH ROW BEGIN  






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



END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_options_product_speciality_update` BEFORE INSERT ON `dala_options_product_speciality` FOR EACH ROW BEGIN  






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



END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_options_product_speciality_link`
--

DROP TABLE IF EXISTS `dala_options_product_speciality_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_options_product_speciality_link` (
  `dala_options_product_speciality_link_ID` int NOT NULL AUTO_INCREMENT,
  `dala_options_product_speciality_link_product_id` int NOT NULL,
  `dala_options_product_speciality_link_option_id` int NOT NULL,
  `dala_options_product_speciality_link_variation_type` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_options_product_speciality_link_ID`),
  KEY `options_product_speciality_link_option_id` (`dala_options_product_speciality_link_option_id`),
  KEY `options_product_speciality_link_product_id` (`dala_options_product_speciality_link_product_id`),
  CONSTRAINT `options_product_speciality_link_option_id` FOREIGN KEY (`dala_options_product_speciality_link_option_id`) REFERENCES `dala_options_product_speciality` (`dala_options_product_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `options_product_speciality_link_product_id` FOREIGN KEY (`dala_options_product_speciality_link_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_options_product_speciality_link`
--

LOCK TABLES `dala_options_product_speciality_link` WRITE;
/*!40000 ALTER TABLE `dala_options_product_speciality_link` DISABLE KEYS */;
INSERT INTO `dala_options_product_speciality_link` VALUES (3,20,6,0),(4,19,7,0);
/*!40000 ALTER TABLE `dala_options_product_speciality_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_orders_details_food_drink`
--

DROP TABLE IF EXISTS `dala_orders_details_food_drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_orders_details_food_drink` (
  `dala_orders_details_food_drink_ID` int NOT NULL AUTO_INCREMENT,
  `dala_orders_details_food_drink_order_id` int NOT NULL,
  `dala_orders_details_food_drink_line_order` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_details_food_drink_product_id` int NOT NULL,
  `dala_orders_details_food_drink_qty` int NOT NULL,
  `dala_orders_details_food_drink_price` float NOT NULL,
  PRIMARY KEY (`dala_orders_details_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_orders_details_food_drink`
--

LOCK TABLES `dala_orders_details_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_orders_details_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_orders_details_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_orders_details_speciality`
--

DROP TABLE IF EXISTS `dala_orders_details_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_orders_details_speciality` (
  `dala_orders_details_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_orders_details_speciality_order_id` int NOT NULL,
  `dala_orders_details_speciality_line_order` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_details_speciality_product_id` int NOT NULL DEFAULT '0',
  `dala_orders_details_speciality_qty` int NOT NULL DEFAULT '0',
  `dala_orders_details_speciality_price` double NOT NULL DEFAULT '0',
  `dala_orders_details_medium_text` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`dala_orders_details_speciality_ID`),
  KEY `orders_details_speciality_order_id` (`dala_orders_details_speciality_order_id`),
  CONSTRAINT `orders_details_speciality_order_id` FOREIGN KEY (`dala_orders_details_speciality_order_id`) REFERENCES `dala_orders_speciality` (`dala_orders_speciality_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_orders_details_speciality`
--

LOCK TABLES `dala_orders_details_speciality` WRITE;
/*!40000 ALTER TABLE `dala_orders_details_speciality` DISABLE KEYS */;
INSERT INTO `dala_orders_details_speciality` VALUES (1,1,'product',12,3,90000,''),(2,1,'product',13,2,110000,''),(3,1,'shipping',0,0,50000,''),(4,1,'coupon',10,0,30000,''),(5,2,'product',19,3,100000,''),(6,2,'product',20,4,155000,''),(7,2,'shipping',0,0,40000,''),(8,2,'coupon',10,0,30000,'');
/*!40000 ALTER TABLE `dala_orders_details_speciality` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_check_orders_details_product_id_insert` BEFORE INSERT ON `dala_orders_details_speciality` FOR EACH ROW BEGIN  

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

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_check_orders_details_product_id_update` BEFORE INSERT ON `dala_orders_details_speciality` FOR EACH ROW BEGIN  

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

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_orders_food_drink`
--

DROP TABLE IF EXISTS `dala_orders_food_drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_orders_food_drink` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_orders_food_drink`
--

LOCK TABLES `dala_orders_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_orders_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_orders_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_orders_speciality`
--

DROP TABLE IF EXISTS `dala_orders_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_orders_speciality` (
  `dala_orders_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_orders_speciality_user_id` int NOT NULL,
  `dala_orders_speciality_shipper_id` int NOT NULL,
  `dala_orders_speciality_date_orders` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_orders_speciality_status_orders` tinyint(1) NOT NULL DEFAULT '0',
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
  CONSTRAINT `orders_speciality_user_id` FOREIGN KEY (`dala_orders_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_orders_speciality`
--

LOCK TABLES `dala_orders_speciality` WRITE;
/*!40000 ALTER TABLE `dala_orders_speciality` DISABLE KEYS */;
INSERT INTO `dala_orders_speciality` VALUES (1,56,0,'2021-10-03 08:58:16',0,0,'Tỉnh Đồng Nai','Thành phố Biên Hòa','Phường Tân Phong','số 18, đặng dức thuật','','09480360106','nguyễn văn lực','custommer@gmail.com',''),(2,56,0,'2021-10-03 09:41:46',0,0,'Tỉnh Đồng Nai','Thành phố Biên Hòa','Phường Tân Phong','số 18, d0ặng dức thuật','','09480360106','nguyễn văn lực','custommer@gmail.com','');
/*!40000 ALTER TABLE `dala_orders_speciality` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_orders_speciality_insert` BEFORE INSERT ON `dala_orders_speciality` FOR EACH ROW BEGIN  





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
	IF (NEW.dala_orders_speciality_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN  
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




END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_orders_speciality_update` BEFORE UPDATE ON `dala_orders_speciality` FOR EACH ROW BEGIN  





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
	IF (NEW.dala_orders_speciality_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN  
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






END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_payment_period`
--

DROP TABLE IF EXISTS `dala_payment_period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_payment_period` (
  `dala_payment_period_ID` int NOT NULL AUTO_INCREMENT,
  `dala_payment_period_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_payment_period_stores_id` int NOT NULL,
  `dala_payment_period_contents` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_payment_period_payment` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_payment_period_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_payment_period`
--

LOCK TABLES `dala_payment_period` WRITE;
/*!40000 ALTER TABLE `dala_payment_period` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_payment_period` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_products_food_drink`
--

DROP TABLE IF EXISTS `dala_products_food_drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_products_food_drink` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_products_food_drink`
--

LOCK TABLES `dala_products_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_products_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_products_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_products_speciality`
--

DROP TABLE IF EXISTS `dala_products_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_products_speciality` (
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
  KEY `products_speciality_store_id` (`dala_products_speciality_store_id`),
  CONSTRAINT `products_speciality_store_id` FOREIGN KEY (`dala_products_speciality_store_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_products_speciality`
--

LOCK TABLES `dala_products_speciality` WRITE;
/*!40000 ALTER TABLE `dala_products_speciality` DISABLE KEYS */;
INSERT INTO `dala_products_speciality` VALUES (3,'Kẹo Dẻo Actisô Galaxy Ladophar – Gói 80g',0,'2021-07-23 08:45:29','3M',17,0,'https://appdala.net/wp-content/uploads/keodeo1-4.jpg','https://appdala.net/wp-content/uploads/keodeo2-3.jpg;https://appdala.net/wp-content/uploads/keodeo1-5.jpg;https://appdala.net/wp-content/uploads/keodeo3-1.jpg','','<div style=\"text-align: center;\"><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 24px; font-weight: bold; text-align: center; background-color: #ffffff;\">KẸO DẺO ACTISO<br /></span>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kẹo dẻo actiso được chế biến từ cao hoa actiso, mang m&agrave;u n&acirc;u đặc trưng, dai dai, ngọt ngọt, l&agrave; m&oacute;n ăn vặt cực k&igrave; y&ecirc;u th&iacute;ch kh&ocirc;ng chỉ ri&ecirc;ng c&aacute;c em nhỏ m&agrave; người lớn cũng m&ecirc;.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kẹo dẻo actiso mang hương vị Actiso tự nhi&ecirc;n, thơm ngon, c&ograve;n bổ sung dưỡng chất, c&oacute; &iacute;ch cho sức khỏe.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kẹo dẻo actiso lu&ocirc;n đảm bảo về chất lượng, l&agrave; sản phẩm an to&agrave;n cho người ti&ecirc;u d&ugrave;ng.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><br /><strong style=\"margin: 0px; padding: 0px;\">Th&agrave;nh phần</strong><span style=\"font-size: 14pt;\">: Cao hoa actiso 5%, đường, mạch nha, gelatin, pectin, acid citric.</span><br /></span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kh&ocirc;ng sử dụng chất bảo quản.</span></p>\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\">\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\">\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">KLT</strong>: 80g</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Hạn sử dụng</strong>: 1 năm.</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Hướng dẫn sử dụng</strong>: D&ugrave;ng trực tiếp sau khi mở bao b&igrave;. Đ&oacute;ng k&iacute;n sau mỗi lần sử dụng.</span></li>\n</ul>\n</ul>\n</ul>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Bảo quản nơi kh&ocirc; r&aacute;o, tr&aacute;nh &aacute;nh nắng trực tiếp.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kh&ocirc;ng sử dụng sản phẩm khi c&oacute; dấu diệu ẩm mốc, xuất hiện m&ugrave;i lạ.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; text-align: start; background-color: #ffffff;\"></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff; text-align: left;\"><em style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Sản phẩm được ph&acirc;n phối bởi Dala.vn.</span></strong></em></p>\n</div>',35000,32000,NULL,NULL,NULL,3,1,1,1,'','','',NULL,NULL,NULL,80),(4,'Mứt hoa Atiso đỏ đặc biệt, ngon-150gr',0,'2021-07-23 08:50:45','4YE',17,0,'https://appdala.net/wp-content/uploads/muthoaatisodo-1.jpg','https://appdala.net/wp-content/uploads/muthoaatisodo-2.jpg;https://appdala.net/wp-content/uploads/Hoa-Atiso-Do-4-1.png;https://appdala.net/wp-content/uploads/images-1-2.jpg','','<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">Lo&agrave;i Hoa atiso đỏ rất gi&agrave;u dinh dưỡng, ngo&agrave;i ra hoa c&ograve;n chứa c&aacute;c axit v&agrave; protein, vitamin C c&ugrave;ng những chất c&oacute; t&iacute;nh kh&aacute;ng sinh kh&aacute;c. Hạt atiso đỏ chứa 7,6% nước, 22,3% dầu, 24% protein, 13,5% chất xơ v&agrave; 7% chất kho&aacute;ng.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">Theo một số nghi&ecirc;n cứu, trong th&agrave;nh phần dầu hạt hoa atiso đỏ c&oacute; t&aacute;c dụng chống nấm v&agrave; bệnh ngo&agrave;i da. Vitamin v&agrave; c&aacute;c chất b&eacute;o kh&ocirc;ng no c&oacute; trong n&oacute; cũng c&oacute; t&aacute;c dụng tốt đối với người cao tuổi v&agrave; người đang ăn ki&ecirc;ng. Hạt atiso đỏ chứa 7,6% nước, 22,3% dầu, 24% protein, 13,5% chất xơ v&agrave; 7% chất kho&aacute;ng.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\"><br />Hoa atiso đỏ c&oacute; chứa một số chất c&oacute; t&iacute;nh kh&aacute;ng sinh, do đ&oacute; n&oacute; được d&acirc;n gian d&ugrave;ng như một phương thuốc thảo dược trị ho, vi&ecirc;m họng bằng c&aacute;ch lấy đ&agrave;i hoa atiso đỏ chưng lẫn đường ph&egrave;n, mật ong lấy nước uống v&agrave;i lần/ng&agrave;y. Sử dụng hoa atio đỏ thường xuy&ecirc;n cũng l&agrave; c&aacute;ch ngăn ngừa ho, cảm c&uacute;m.<br /><br /></span></p>\n<div id=\"thong-tin-san-pham\" class=\"tab-pane fade in active\" style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<div class=\"entry-content\" style=\"margin: 0px; padding: 0px;\">\n<div id=\"themify_builder_content-440\" class=\"themify_builder_content themify_builder_content-440 themify_builder\" style=\"margin: 0px; padding: 0px; clear: both;\" data-postid=\"440\">\n<div class=\"themify_builder_row module_row clearfix module_row_0 themify_builder_440_row module_row_440-0 tb_htfy164\" style=\"margin: 0px; padding: 0px; position: relative; box-sizing: border-box; backface-visibility: hidden; transition: background 500ms ease 0s, font-size 0s ease 0s, line-height 0s ease 0s, color 0s ease 0s, padding 0s ease 0s, margin 0s ease 0s, border 0s ease 0s, border-radius 0s ease 0s, box-shadow 0s ease 0s, text-shadow 0s ease 0s, filter 0s ease 0s, -webkit-filter 0s ease 0s; width: 1150px;\">\n<div class=\"row_inner col_align_top\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box; display: flex; flex-flow: wrap;\">\n<div class=\"module_column tb-column col-full tb_440_column module_column_0 module_column_440-0-0 tb_19di168 last\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; align-items: flex-start; align-content: flex-start; float: left; position: relative; clear: left; width: 1150px; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; display: flex; flex-flow: wrap;\">\n<div class=\"tb-column-inner\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box;\">\n<div class=\"module module-text text-440-0-0-0     tb_vy1e999\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; position: relative;\">\n<div class=\"tb_text_wrap\" style=\"margin: 0px; padding: 0px;\">\n<p style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">Atioso đỏ cũng chứa nhiều Bioflavonoids, một chất chống &ocirc; xy h&oacute;a ngăn cản qu&aacute; tr&igrave;nh &ocirc; xy h&oacute;a lipoprotein, gi&uacute;p hạ huyết &aacute;p. Nhiều người bị huyết &aacute;p cao thường uống tr&agrave; chế từ hoa atiso đỏ mỗi ng&agrave;y để giảm huyết &aacute;p.<br /></span></p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"></p>\n<div id=\"thong-so-ky-thuat\" class=\"tab-pane fade\" style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<h3 style=\"margin: 20px 0px 0.4em; padding: 0px; line-height: 1.4em; overflow-wrap: normal; font-size: 1.6em;\">Th&ocirc;ng số kỹ thuật</h3>\n<div style=\"margin: 0px; padding: 0px;\">\n<p style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">Chi tiết sản phẩm</span></p>\n<p style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">&ndash; Trọng lượng: 150gr</span></p>\n<p style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">&ndash; M&agrave;u sắc: m&agrave;u đỏ t&iacute;m của b&ocirc;ng tươi.</span></p>\n<p style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 12pt;\">&ndash; M&ugrave;i vị; gi&ograve;n, chua, ngọt, tốt cho sức khỏe &ndash; Sản phẩm cũng kh&ocirc;ng sử dụng chất bảo quản, chỉ sử dụng acid citrid đường v&agrave; muối của acid sorbid nhằm duy tr&igrave; m&agrave;u sắc v&agrave; hương vị sản phẩm, chỉ sử dụng được 3 th&aacute;ng. Sản phẩm ngon hơn nếu bỏ v&agrave;o tủ lạnh hoặc pha với nước cốt atiso đỏ c&ugrave;ng đ&aacute;, c&aacute;nh hoa gi&ograve;n c&ugrave;ng vị chua ngọt của nước cốt tạo n&ecirc;n thức uống tương tự cooktail</span></p>\n</div>\n</div>',70000,59000,NULL,NULL,NULL,2,1,1,1,'','','',NULL,NULL,NULL,150),(5,'Kẹo dẻo phủ chocolate loại đặc biệt-220gr',0,'2021-07-23 08:55:40','57O',17,0,'https://appdala.net/wp-content/uploads/Keodeo-4.jpg','https://appdala.net/wp-content/uploads/Keodeo-5.jpg;https://appdala.net/wp-content/uploads/keo-deo-chocolate-handmade-1504932104-1-4140608-1509593909-3.jpg;https://appdala.net/wp-content/uploads/keo-deo-phu-chocolate-handmade-1506263932-1-3898840-1506263932-2.jpg;https://appdala.net/wp-content/uploads/keo-deo-trai-cay-chocolate-handmade-1504949383-1-3791767-1504949383-2.jpg','','<h4 style=\"margin: 20px 0px 0.4em; padding: 0px; line-height: 1.4em; overflow-wrap: normal; font-size: 1.4em; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; text-align: center;\"><span style=\"margin: 0px; padding: 0px; font-size: 18pt;\">KẸO DẺO PHỦ SOCOLA &ndash; M&Oacute;N QU&Agrave; ĐẾN TỪ V&Ugrave;NG CAO NGUY&Ecirc;N Đ&Agrave; LẠT</span></h4>\n<h4 style=\"margin: 20px 0px 0.4em; padding: 0px; line-height: 1.4em; overflow-wrap: normal; font-size: 1.4em; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; text-align: center;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kẹo dẻo phủ socola c&oacute; vị ngọt nhẹ v&agrave; dai, phủ một lớp socola mỏng, cho ta vị hậu đắng nhẹ tăng th&ecirc;m độ ho&agrave;n hảo v&agrave; một hương vị đặc trưng của v&ugrave;ng cao nguy&ecirc;n Đ&agrave; Lạt.</span></h4>\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px; font-size: 12.96px; font-weight: 400; text-align: start;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">M&agrave;u sắc: Kẹo c&oacute; m&agrave;u sắc tự nhi&ecirc;n, phủ b&ecirc;n tr&ecirc;n l&agrave; lớp socola mỏng tạo c&aacute;i nh&igrave;n thiện cảm cho người d&ugrave;ng.</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">M&ugrave;i vị: mỗi m&agrave;u sắc l&agrave; một vị kh&aacute;c nhau, chua,ngọt trộn với vị hậu đắng nhẹ g&acirc;y k&iacute;ch th&iacute;ch vị gi&aacute;c.</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Ăn trực tiếp.</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Chỉ sử dụng acid citrid để bảo quản v&agrave; duy tr&igrave; m&agrave;u sắc cho sản phẩm. Trẻ em, phụ nữ mang thai c&oacute; thể sử dụng được.</span></li>\n</ul>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">&ndash; Th&agrave;nh phần</strong>: Kẹo dẻo tr&aacute;i c&acirc;y (70%), chocolate đen.</span></p>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">&ndash; KLT</strong>: 220g</span></p>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">&ndash; Hướng dẫn sử dụng</strong>: Mở bao b&igrave; v&agrave; d&ugrave;ng trực tiếp. L&agrave;m k&iacute;n miệng sau mỗi lần sử dụng.</span></p>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">&ndash; Bảo quản</strong>: Bảo quản nơi kh&ocirc; r&aacute;o tho&aacute;ng m&aacute;t, tr&aacute;nh &aacute;nh nắng trực tiếp.</span></p>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kh&ocirc;ng sử dụng sản phẩm khi c&oacute; dấu hiệu ẩm mốc, xuất hiện m&ugrave;i lạ.</span></p>\n<p style=\"margin: 0px; padding: 0px; font-size: 12.96px; font-weight: 400; text-align: start;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><em style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\">Sản phẩm được ph&acirc;n phối bởi Dala.vn.</strong></em></span></p>',70000,65000,NULL,NULL,NULL,2,1,1,1,'','','',NULL,NULL,NULL,220),(6,'Mứt Chanh dây – 29gram',0,'2021-07-23 08:58:37','6MR',17,0,'https://appdala.net/wp-content/uploads/mut-chanh-day-1-1.jpg','https://appdala.net/wp-content/uploads/2d829b44a905405b1914.jpg;https://appdala.net/wp-content/uploads/238.chanhday-1.jpg;https://appdala.net/wp-content/uploads/recipe13096-635845848321954266.jpg','','<span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"font-size: 12.96px;\">Chanh d&acirc;y l&agrave; một nguồn cung vitamin A dồi d&agrave;o, một dưỡng chất đặc biệt c&oacute; lợi gi&uacute;p l&agrave;m đẹp cho da. C&aacute;c chất chống oxy h&oacute;a kh&aacute;c trong chanh d&acirc;y như vitamin C, riboflavin v&agrave; carotene cũng gi&uacute;p tăng cường sức khỏe của da v&agrave; đẩy l&ugrave;i c&aacute;c dấu hiệu của l&atilde;o h&oacute;a.</span><br /><br /></span>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">Chanh d&acirc;y rất gi&agrave;u kali, một loại kho&aacute;ng chất quan trọng gi&uacute;p điều h&ograve;a huyết &aacute;p, l&agrave;m thư gi&atilde;n c&aacute;c mạch m&aacute;u v&agrave; tăng cường lưu lượng m&aacute;u. Qua đ&oacute; c&oacute; thể l&agrave;m giảm căng thẳng cho tim v&agrave; cải thiện sức khỏe tim to&agrave;n diện.</p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">Chất flavonoid v&agrave; axit phenolic c&oacute; trong chanh d&acirc;y cũng c&oacute; thể gi&uacute;p kiểm so&aacute;t lượng cholesterol tốt hơn: tăng cholesterol tốt v&agrave; giảm cholesterol xấu g&acirc;y tắc nghẽn c&aacute;c động mạch, l&agrave;m suy yếu hoạt động của tim.</p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><br /><span style=\"font-size: 12.96px;\">Trong chanh d&acirc;y c&oacute; chứa rất nhiều chất chống oxy h&oacute;a gi&uacute;p chống lại c&aacute;c gốc tự do g&acirc;y ung thư. Chanh d&acirc;y cũng l&agrave; nguồn chứa vitamin A, flavonoid v&agrave; c&aacute;c hợp chất phenolic kh&aacute;c gi&uacute;p ngăn ngừa ung thư. Piceatannol, một hợp chất quan trọng kh&aacute;c được t&igrave;m thấy trong chanh d&acirc;y cũng c&oacute; thể hỗ trợ ti&ecirc;u diệt c&aacute;c tế b&agrave;o ung thư đại trực tr&agrave;ng.</span></p>',20000,15000,NULL,NULL,NULL,4,1,1,1,'','','',NULL,NULL,NULL,29),(7,'Vỏ bưởi mật ong sấy dẻo-100gram',0,'2021-07-23 09:55:40','78',17,0,'https://appdala.net/wp-content/uploads/vo-buoi-mat-ong.jpg','https://appdala.net/wp-content/uploads/vo-buoi-1-1.png;https://appdala.net/wp-content/uploads/vo-buoi-mat-ong-1.jpg;https://appdala.net/wp-content/uploads/vo-buoi-mat-ong-1-1.jpg;https://appdala.net/wp-content/uploads/vo-buoi-mat-ong-2.jpg;https://appdala.net/wp-content/uploads/vo-buoi-mat-ong-3.jpg','','',70000,65000,NULL,NULL,NULL,1,1,1,1,'','','',NULL,NULL,NULL,100),(8,'Cam sấy dẻo – 100gr',0,'2021-07-23 09:58:40','8S',17,0,'https://appdala.net/wp-content/uploads/mutcam.jpg','https://appdala.net/wp-content/uploads/bi-kip-lam-mut-cam-thom-ngon-dep-mat-1-300x174-1.png;https://appdala.net/wp-content/uploads/cach-lam-mut-cam-deo-ngon-thom-vi-chanh-leo-hap-dan-1-300x249-1.jpg;https://appdala.net/wp-content/uploads/mutcam-1.jpg','','',100000,80000,NULL,NULL,NULL,2,1,1,1,'','','',NULL,NULL,NULL,100),(9,'Chuối Laba sấy dẻo (Soft dried banana) – 250gr',0,'2021-07-23 10:00:34','9WR',17,0,'https://appdala.net/wp-content/uploads/chuoideo.png','https://appdala.net/wp-content/uploads/1a96691e84bb5231e72caac6bf0f581f.jpg;https://appdala.net/wp-content/uploads/chuoideo-1.png;https://appdala.net/wp-content/uploads/chuoi-say-deo.jpg;https://appdala.net/wp-content/uploads/chuoi-say-deo-dac-biet-trai-cay-hat-say-com-1.jpg','','<span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"font-size: 12.96px;\">Chuối kh&ocirc; sấy dẻo c&oacute; nhiều vi chất dinh dưỡng bảo vệ hệ miễn dịch v&agrave; ngăn ngừa hiệu quả c&aacute;c bệnh m&atilde;n t&iacute;nh. Mỗi ng&agrave;y, người c&oacute; thể trạng b&igrave;nh thường v&agrave; sức khỏe ổn định n&ecirc;n ăn 1-2 quả chuối tươi hay tương đương với 50g chuối kh&ocirc; sấy dẻo để chăm s&oacute;c v&agrave; bảo vệ tốt nhất cho sức khỏe của ch&iacute;nh m&igrave;nh.<br /></span><br /></span>\n<div style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<div style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\">Người hay bị t&aacute;o b&oacute;n hoặc rối loạn ti&ecirc;u h&oacute;a</strong>:chất xơ c&oacute; trong chuối sấy c&oacute; t&aacute;c dụng nhuận tr&agrave;ng, giảm t&aacute;o b&oacute;n. Chất pectin c&oacute; trong chuối sấy dẻo c&oacute; thể hỗ trợ l&agrave;m giảm rối loạn đường ruột g&acirc;y ti&ecirc;u chảy.</div>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\">*Người hay l&agrave;m việc tr&iacute; &oacute;c, hay căng thẳng, đang stress</strong>:<em style=\"margin: 0px; padding: 0px;\">Vi</em>chất kali gi&uacute;p tr&iacute; n&atilde;o hoạt động linh hoạt hơn, thư gi&atilde;n tinh thần, giảm t&igrave;nh trạng căng thẳng g&acirc;y stress vật l&yacute;.</p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\">*Người hay bị tụt đường huyết</strong>:chất sắt c&oacute; trong chuối sấy dẻo gi&uacute;p cơ thể tr&aacute;nh được nguy cơ thiếu m&aacute;u do thiếu sắt.<br style=\"margin: 0px; padding: 0px;\" /><strong style=\"margin: 0px; padding: 0px;\">*Người muốn tăng c&acirc;n</strong>:việc bổ sung th&ecirc;m chuối sấy dẻo sau mỗi bữa ăn c&oacute; t&aacute;c dụng t&iacute;ch cực l&ecirc;n hệ ti&ecirc;u h&oacute;a, gi&uacute;p ăn ngon hơn, ti&ecirc;u h&oacute;a thức ăn tốt hơn, hấp thụ dinh dưỡng tốt hơn n&ecirc;n gi&uacute;p tăng c&acirc;n tự nhi&ecirc;n c&oacute; kiểm so&aacute;t.<br /><br /></p>\n</div>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><br /><br /><strong style=\"margin: 0px; padding: 0px;\">Lưu &yacute; một số bệnh nh&acirc;n kh&ocirc;ng n&ecirc;n ăn chuối sấy?</strong></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">Ăn chuối kh&ocirc; sấy dẻo c&oacute; thể ảnh hưởng kh&ocirc;ng tốt đến sức khỏe cho những người bị bệnh m&atilde;n t&iacute;nh sau:</p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\">*</strong><em style=\"margin: 0px; padding: 0px;\">Người bị suy thận, vi&ecirc;m cầu thận</em>: nồng độ kali trong m&aacute;u sẽ tăng khi ăn chuối, g&acirc;y ra triệu chứng bất lợi cho sức khỏe như rối loạn nhịp tim, buồn n&ocirc;n, hồi hộp.</p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\">*</strong><em style=\"margin: 0px; padding: 0px;\">Những người đang bị đau đầu</em>: chất tyramine, phenyethyamine v&agrave; axit amin trong chuối c&oacute; thể l&agrave;m gi&atilde;n mạch m&aacute;u khiến cơn đau đầu trở n&ecirc;n nghi&ecirc;m trọng hơn.<br style=\"margin: 0px; padding: 0px;\" /><strong style=\"margin: 0px; padding: 0px;\">*</strong><em style=\"margin: 0px; padding: 0px;\">Người bị tiểu đường</em>: khi ăn chuối sẽ bổ sung lượng đường c&oacute; thể g&acirc;y hại cho người bị rối loạn chuyển h&oacute;a.<br /><br /></p>\n<h3 style=\"margin: 20px 0px 0.4em; padding: 0px; line-height: 1.4em; overflow-wrap: normal; font-size: 1.6em; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff;\">Th&ocirc;ng số kỹ thuật</h3>\n<div style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<div class=\" _50f7\" style=\"margin: 0px; padding: 0px;\">Chi tiết sản phẩm:</div>\n<div style=\"margin: 0px; padding: 0px;\">&ndash; Trọng lượng: 250gr</div>\n<div class=\"_1xwp\" style=\"margin: 0px; padding: 0px;\">&ndash; M&agrave;u sắc: M&agrave;u v&agrave;ng hoặc hơi n&acirc;u<br style=\"margin: 0px; padding: 0px;\" />&ndash; M&ugrave;i vị: do sấy ở nhiệt độ thấp n&ecirc;n mật được h&uacute;t v&agrave;o b&ecirc;n trong tạo độ dẻo l&acirc;u d&agrave;i v&agrave; vị ngọt thanh tự nhi&ecirc;n.<br style=\"margin: 0px; padding: 0px;\" />&ndash; Việc đ&oacute;ng g&oacute;i h&uacute;t ch&acirc;n kh&ocirc;ng ngăn sản phẩm kh&ocirc;ng tiếp x&uacute;c với kh&ocirc;ng kh&iacute; n&ecirc;n sản phẩm kh&ocirc;ng bị kh&ocirc; theo thời gian. Tuy nhi&ecirc;n, khi để l&acirc;u 1 thời gian, sản phẩm sẽ bị xuống m&agrave;u (chuyển n&acirc;u) đ&acirc;y l&agrave; một chu tr&igrave;nh b&igrave;nh thường của sản phẩm do hệ m&agrave;u bị ph&aacute; hủy khi sản phẩm tiếp x&uacute;c với &aacute;nh s&aacute;ng. Sản phẩm vẫn sử dụng được b&igrave;nh thường cho đến khi hết hạn sử dụng.<br style=\"margin: 0px; padding: 0px;\" />&ndash; Kh&ocirc;ng sử dụng chất bảo quản, trẻ nhỏ, phụ nữ mang thai v&agrave; người ăn chay đều c&oacute; thể sử dụng được</div>\n</div>',60000,55000,NULL,NULL,NULL,2,1,1,1,'','','',NULL,NULL,NULL,250),(10,'Dâu tây sấy dẻo-150gr',0,'2021-07-23 10:08:28','105',17,0,'https://appdala.net/wp-content/uploads/Dautay-1-1.jpg','https://appdala.net/wp-content/uploads/Dau-tay-da-lat-say-deo-2-1.png;https://appdala.net/wp-content/uploads/Dautay-1-2.jpg;https://appdala.net/wp-content/uploads/14650111_1834506056785453_4163471559046559578_n-1.jpg','','<span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><br /><span style=\"font-size: 12.96px;\">Từ l&acirc;u, những quả d&acirc;u t&acirc;y đỏ mọng nước đã n&ocirc;̉i ti&ecirc;́ng là ngu&ocirc;̀n cung c&acirc;́p vitamin C d&ocirc;̀i dào cho cơ th&ecirc;̉, nhưng ít người bi&ecirc;́t tới loại quả này còn r&acirc;́t giàu các ch&acirc;́t ch&ocirc;́ng oxy hóa có lợi. Vi&ecirc;̣c ăn d&acirc;u t&acirc;y m&ocirc;̃i ngày giúp ngăn ngừa lão hóa, tăng cường h&ecirc;̣ mi&ecirc;̃n dịch, giảm chứng vi&ecirc;m khớp, phòng ngừa ti&ecirc;̉u đường cũng như sự hình thành và lan r&ocirc;̣ng của các kh&ocirc;́i u. Đặc bi&ecirc;̣t, d&acirc;u t&acirc;y còn giúp cơ th&ecirc;̉ sản sinh các hormore hạnh phúc (dopamine, serotonin) kh&ocirc;ng chỉ chữa chứng tr&acirc;̀m cảm còn giúp thúc đ&acirc;̉y máu mang dưỡng ch&acirc;́t tới não.</span><br /><br /></span><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">Hi&ecirc;̉u được được t&acirc;̀m quan trọng của d&acirc;u t&acirc;y đ&ocirc;́i với sức khỏe,</span><strong style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">BerryLand</strong><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">đã sử dụng d&acirc;y chuy&ecirc;̀n sản xu&acirc;́t hi&ecirc;̣n đại của mình đ&ecirc;̉ mang đ&ecirc;́n những quả d&acirc;u c&ocirc; đặc đ&acirc;̀y dinh dưỡng trong món</span><strong style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">D&acirc;u S&acirc;́y Dẻo</strong><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">n&ocirc;̉i ti&ecirc;́ng của mình. Được s&acirc;́y bằng c&ocirc;ng ngh&ecirc;̣ cao trong d&acirc;y chuy&ecirc;̀n khép kín,</span><strong style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">D&acirc;u s&acirc;́y dẻo<strong style=\"margin: 0px; padding: 0px;\">BerryLand</strong></strong><span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">kh&ocirc;ng chỉ giữ được hàm lượng dinh dưỡng của trái c&acirc;y tươi, mà còn làm giảm đ&ocirc;̣ chua giúp tăng vị ngọt dịu cho những quả d&acirc;u th&ecirc;m ph&acirc;̀n thơm ngon. Chính vì v&acirc;̣y, món ăn vặt dinh dưỡng này sẽ là lựa chọn phù hợp cho t&acirc;́t cả các đ&ocirc;́i tượng từ trẻ em, người lớn cho tới các mẹ b&acirc;̀u. Ngoài ra, sản ph&acirc;̉m được đóng gói nhỏ gọn, đẹp mắt phù hợp cho vi&ecirc;̣c đãi khách, mang theo tới văn phòng, hay những chuy&ecirc;́n du lịch xa.</span><br /><br /></span>\n<div id=\"thong-tin-san-pham\" class=\"tab-pane fade in active\" style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<div class=\"entry-content\" style=\"margin: 0px; padding: 0px;\">\n<div id=\"themify_builder_content-445\" class=\"themify_builder_content themify_builder_content-445 themify_builder\" style=\"margin: 0px; padding: 0px; clear: both;\" data-postid=\"445\">\n<div class=\"themify_builder_row module_row clearfix module_row_0 themify_builder_445_row module_row_445-0 tb_gao3585\" style=\"margin: 0px; padding: 0px; position: relative; box-sizing: border-box; transition: background 500ms ease 0s, font-size 0s ease 0s, line-height 0s ease 0s, color 0s ease 0s, padding 0s ease 0s, margin 0s ease 0s, border 0s ease 0s, border-radius 0s ease 0s, box-shadow 0s ease 0s, text-shadow 0s ease 0s, filter 0s ease 0s, -webkit-filter 0s ease 0s; width: 1150px;\">\n<div class=\"row_inner col_align_top\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box; display: flex; flex-flow: wrap;\">\n<div class=\"module_column tb-column col-full tb_445_column module_column_0 module_column_445-0-0 tb_zaf9586 last\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; align-items: flex-start; align-content: flex-start; float: left; position: relative; clear: left; width: 1150px; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; display: flex; flex-flow: wrap;\">\n<div class=\"tb-column-inner\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box;\">\n<div class=\"module module-text text-445-0-0-0     tb_7ptl531\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; position: relative;\">\n<div class=\"tb_text_wrap\" style=\"margin: 0px; padding: 0px;\">\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">\n<div id=\"thong-tin-san-pham\" class=\"tab-pane fade in active\" style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<div class=\"entry-content\" style=\"margin: 0px; padding: 0px;\">\n<div id=\"themify_builder_content-445\" class=\"themify_builder_content themify_builder_content-445 themify_builder\" style=\"margin: 0px; padding: 0px; clear: both;\" data-postid=\"445\">\n<div class=\"themify_builder_row module_row clearfix module_row_0 themify_builder_445_row module_row_445-0 tb_gao3585\" style=\"margin: 0px; padding: 0px; position: relative; box-sizing: border-box; transition: background 500ms ease 0s, font-size 0s ease 0s, line-height 0s ease 0s, color 0s ease 0s, padding 0s ease 0s, margin 0s ease 0s, border 0s ease 0s, border-radius 0s ease 0s, box-shadow 0s ease 0s, text-shadow 0s ease 0s, filter 0s ease 0s, -webkit-filter 0s ease 0s; width: 1150px;\">\n<div class=\"row_inner col_align_top\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box; display: flex; flex-flow: wrap;\">\n<div class=\"module_column tb-column col-full tb_445_column module_column_0 module_column_445-0-0 tb_zaf9586 last\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; align-items: flex-start; align-content: flex-start; float: left; position: relative; clear: left; width: 1150px; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; display: flex; flex-flow: wrap;\">\n<div class=\"tb-column-inner\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box;\">\n<div class=\"module module-text text-445-0-0-0     tb_7ptl531\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; position: relative;\">\n<div class=\"tb_text_wrap\" style=\"margin: 0px; padding: 0px;\">\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Nguy&ecirc;n liệu ch&iacute;nh: d&acirc;u t&acirc;y tươi.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Sản ph&acirc;̉m được sơ chế v&agrave; sấy bằng c&ocirc;ng nghệ hiện đại, kh&eacute;p k&iacute;n, đảm bảo đạt chuẩn an to&agrave;n vệ sinh thực phẩm.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">L&agrave; một sản phẩm c&ocirc; đặc của tr&aacute;i c&acirc;y tươi, vẫn giữ được hương vị thơm ngon, m&agrave;u sắc kh&ocirc;ng kh&ocirc; cứng.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Sản phẩm kh&ocirc;ng qua chi&ecirc;n dầu n&ecirc;n kh&ocirc;ng bị hiện tượng thấm dầu v&agrave; h&ocirc;i dầu.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Sản phẩm vẫn giữ được c&aacute;c yếu tố như m&agrave;u sắc, th&agrave;nh phần dinh dưỡng, vitamin v&agrave; đặc t&iacute;nh đặc trưng ri&ecirc;ng của từng loại tr&aacute;i c&acirc;y.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Bảo quản được l&acirc;u hơn so với tr&aacute;i c&acirc;y tươi v&agrave; l&agrave; bữa ăn nhẹ tiện dụng cho những chuyến đi chơi d&agrave;i.</li>\n</ul>\n<p style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\">Hướng dẫn bảo quản</strong></p>\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Đ&oacute;ng k&iacute;n bao b&igrave; để giữ kh&ocirc; r&aacute;o sản phẩm sau khi sử dụng.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Bảo quản nơi tho&aacute;ng m&aacute;t, tr&aacute;nh &aacute;nh nắng trực tiếp.</li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\">Bảo quản được l&acirc;u hơn so với tr&aacute;i c&acirc;y tươi v&agrave; l&agrave; bữa ăn nhẹ tiện dụng cho những chuyến đi chơi d&agrave;i.</li>\n</ul>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n<div id=\"thong-so-ky-thuat\" class=\"tab-pane fade\" style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<h3 style=\"margin: 20px 0px 0.4em; padding: 0px; line-height: 1.4em; overflow-wrap: normal; font-size: 1.6em;\">Th&ocirc;ng số kỹ thuật</h3>\n<div style=\"margin: 0px; padding: 0px;\">\n<div class=\" _50f7\" style=\"margin: 0px; padding: 0px;\">Chi tiết sản phẩm:</div>\n<div style=\"margin: 0px; padding: 0px;\">&ndash; Trọng lượng: 150gr</div>\n<div class=\"_1xwp\" style=\"margin: 0px; padding: 0px;\">&ndash; M&agrave;u sắc: m&agrave;u đỏ tự nhi&ecirc;n<br style=\"margin: 0px; padding: 0px;\" />&ndash; M&ugrave;i vị: vị d&acirc;u tự nhi&ecirc;n, chua chua ngọt ngọt<br style=\"margin: 0px; padding: 0px;\" />&ndash; Kh&ocirc;ng sử dụng chất bảo quản, trẻ nhỏ, phụ nữ mang thai v&agrave; người ăn chay đều c&oacute; thể sử dụng được<br style=\"margin: 0px; padding: 0px;\" />&ndash; Rất ngon khi d&ugrave;ng k&egrave;m sữa chua.</div>\n</div>\n</div>\n</li>\n</ul>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n<span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><br /></span>',140000,120000,NULL,NULL,NULL,2,1,1,1,'','','',NULL,NULL,NULL,150),(11,'Chuối Laba sấy dòn loại Đặc Biệt-100gram',0,'2021-07-23 10:20:41','11UJ',17,0,'https://appdala.net/wp-content/uploads/hinh-say-gion.jpg','https://appdala.net/wp-content/uploads/hinh-mat-truoc.jpg;https://appdala.net/wp-content/uploads/hinh-chuoi.jpg;https://appdala.net/wp-content/uploads/hinh-say-gion-1.jpg','','<span style=\"color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 18.6667px; background-color: #ffffff;\"><span style=\"font-size: 18.6667px;\">Trong mỗi quả chuối c&oacute; lượng vitamin A, C c&oacute; khả năng tăng cường, cải thiện sức khỏe cho mắt. B&ecirc;n cạnh đ&oacute; th&agrave;nh phần beta carotene, lutein, ngo&agrave;i ra vitamin E của chuối c&ograve;n c&oacute; t&aacute;c dụng gi&uacute;p ph&ograve;ng tr&aacute;nh t&igrave;nh trạng oxy h&oacute;a ở mắt, chống hiện tượng tho&aacute;i h&oacute;a điểm v&agrave;ng. Do đ&oacute;, bạn n&ecirc;n bổ sung loại thực phẩm n&agrave;y cho trẻ nhỏ từ sớm để b&eacute; c&oacute; đ&ocirc;i mắt s&aacute;ng khỏe.</span><br /><br /></span><span style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; font-size: 14pt;\"><span style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; font-size: 14pt;\">Chuối sấy gi&ograve;n của dalat chips l&agrave; m&oacute;n ăn đặc sản Đ&agrave; Lạt được chế biến bằng c&ocirc;ng nghệ hiện đại: kh&ocirc;ng sử dụng phẩm m&agrave;u, kh&ocirc;ng đường, kh&ocirc;ng chất bảo quản v&agrave; kh&ocirc;ng chứa cholesterol n&ecirc;n chuối sấy của dalat chips vẫn giữ được đặc t&iacute;nh tự nhi&ecirc;n.</span><br style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\" /><span style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; font-size: 14pt;\">Chuối sấy gi&ograve;n dalat chips c&oacute; dạng thanh, gi&ograve;n, đảm bảo kh&ocirc;ng bị g&atilde;y n&aacute;t. M&ugrave;i vị thơm ngon, cung cấp nhiều chất dinh dưỡng cho cơ thể.<br /></span><br /><br /></span>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">KLT:</strong>100gr.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Th&agrave;nh phần:</strong>&ndash; 100% từ tr&aacute;i chuối Laba nguy&ecirc;n chất được trồng tại L&acirc;m Đồng.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">&ndash; Kh&ocirc;ng chứa chất bảo quản.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Hạn sử dung:</strong>06 th&aacute;ng kể từ ng&agrave;y sản xuất.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Hướng dẫn sử dụng:</span></strong></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">&ndash; D&ugrave;ng trực tiếp sau khi mở bao b&igrave;.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">&ndash; Sau khi mở bao b&igrave; n&ecirc;n để k&iacute;n gi&oacute;, bảo quản nơi kh&ocirc; r&aacute;o, tho&aacute;ng m&aacute;t.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">&ndash; Kh&ocirc;ng sử dụng sản phẩm khi c&oacute; dấu hiện ẩm mốc, xuất hiện m&ugrave;i lạ.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><em style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Sản phẩm được ph&acirc;n phối bởi Dala.vn.</span></em></p>',35000,29000,NULL,NULL,NULL,5,1,1,1,'','','',NULL,NULL,NULL,100),(12,'Trà Actisô Túi Lọc Ladophar – 100 túi',0,'2021-07-23 10:23:21','12OL',17,0,'https://appdala.net/wp-content/uploads/tui-loc-1-1.jpg','https://appdala.net/wp-content/uploads/tui-loc-1-2.jpg;https://appdala.net/wp-content/uploads/tui-loc-2.jpg;https://appdala.net/wp-content/uploads/tui-loc-3.jpg;https://appdala.net/wp-content/uploads/tui-loc-4.jpg','','<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Tr&agrave; t&uacute;i lọc Actiso l&agrave; sản phấm chiết xuất từ thi&ecirc;n nhi&ecirc;n, với hương thơm v&agrave; vị ngọt ho&agrave;n to&agrave;n tự nhi&ecirc;n nay được bổ sung th&ecirc;m th&agrave;nh phần cao Actis&ocirc; gi&uacute;p tăng cường hiệu quả ph&ograve;ng ngừa v&agrave; bảo vệ gan mật.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Tr&agrave; t&uacute;i lọc Actiso được đ&oacute;ng g&oacute;i theo quy c&aacute;ch 100 t&uacute;i lọc x 2g, rất dễ d&agrave;ng sử dụng cũng như bảo quản.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Tr&agrave; t&uacute;i lọc Actiso rất tốt. Với c&ocirc;ng dụng m&aacute;t gan, lợi tiểu, th&ocirc;ng mật, rất th&iacute;ch hợp cho người bị yếu gan, nổi mề đay, v&agrave;ng da. C&oacute; thể d&ugrave;ng hằng ng&agrave;y thay nước lọc.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"></p>\n<ul style=\"margin: 1em 0px 1.4em 24px; padding: 0px; line-height: 18.144px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\">\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Th&agrave;nh phần</strong>: Cho 1 t&uacute;i lọc: Actiso 1,65g, Cao đặc Actiso 0,04g, th&agrave;nh phần kh&aacute;c vừa đủ 1 t&uacute;i lọc 2g.</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">KLT</strong>: 200g</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">Hạn sử dụng</strong>: 3 năm.</span></li>\n<li style=\"margin: 0px 0px 0.5em; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\"><strong style=\"margin: 0px; padding: 0px;\">C&aacute;ch d&ugrave;ng</strong>: Nh&uacute;ng t&uacute;i tr&agrave; v&agrave;o ly nước s&ocirc;i (150-200ml), chờ 3-5 ph&uacute;t.</span></li>\n</ul>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">C&oacute; thể pha th&ecirc;m đường t&ugrave;y &yacute;.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Ng&agrave;y uống 3 lần, mỗi lần 1-2 t&uacute;i lọc.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Kh&ocirc;ng sử dụng sản phẩm khi c&oacute; dấu hiệu ẩm mốc, xuất hiện m&ugrave;i lạ.</span></p>\n<p style=\"margin: 0px; padding: 0px; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\"><em style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\"><span style=\"margin: 0px; padding: 0px; font-size: 14pt;\">Sản phẩm được ph&acirc;n phối bởi Dala.vn.</span></strong></em></p>',95000,90000,NULL,NULL,NULL,3,1,1,1,'','','',NULL,NULL,NULL,100),(13,'Cao Đặc Actiso Ladophar – 100g',0,'2021-07-23 10:25:10','13PU',17,0,'https://appdala.net/wp-content/uploads/cao-dac-3.jpg','https://appdala.net/wp-content/uploads/cao-dac-1.jpg;https://appdala.net/wp-content/uploads/cao-dac-2.jpg;https://appdala.net/wp-content/uploads/cao-dac-3-1.jpg','','<h1 style=\"margin: 20px 0px 0.4em; padding: 0px; line-height: 1.4em; overflow-wrap: normal; color: #666666; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff;\">Cao Đặc Actiso 100g</h1>\n<div id=\"themify_builder_content-2279\" class=\"themify_builder_content themify_builder_content-2279 themify_builder\" style=\"margin: 0px; padding: 0px; clear: both; color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 12.96px; background-color: #ffffff;\" data-postid=\"2279\">\n<div class=\"themify_builder_row module_row clearfix module_row_0 themify_builder_2279_row module_row_2279-0 tb_w0sc587\" style=\"margin: 0px; padding: 0px; position: relative; box-sizing: border-box; width: 1150px;\">\n<div class=\"row_inner col_align_top\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box; display: flex; flex-flow: wrap;\">\n<div class=\"module_column tb-column col-full tb_2279_column module_column_0 module_column_2279-0-0 tb_zugn589 last\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; align-items: flex-start; align-content: flex-start; float: left; position: relative; clear: left; width: 1150px; display: flex; flex-flow: wrap;\">\n<div class=\"tb-column-inner\" style=\"margin: 0px; padding: 0px; position: relative; width: 1150px; box-sizing: border-box;\">\n<div class=\"module module-text text-2279-0-0-0     tb_hn1j634\" style=\"margin: 0px; padding: 0px; box-sizing: border-box; transition: background 500ms ease 0s, font-size, line-height, color, padding, margin, border, border-radius, box-shadow, text-shadow, filter, -webkit-filter; position: relative;\">\n<div class=\"tb_text_wrap\" style=\"margin: 0px; padding: 0px;\">\n<p style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\">Cao đặc Actis&ocirc;</strong>l&agrave; sản phẩm chiết xuất tinh chất của Actis&ocirc; với c&ocirc;ng nghệ c&ocirc; cao ch&acirc;n kh&ocirc;ng hiện đại v&agrave; được xử l&yacute; theo quy tr&igrave;nh 24h của Ladophar gi&uacute;p giữ to&agrave;n vẹn h&agrave;m lượng hoạt chất Cynarin.</p>\n<p style=\"margin: 0px; padding: 0px;\">100g cao đặc LADOactiso từ Ladophar tương đương 3.500g l&aacute; tươi Atis&ocirc;</p>\n<p style=\"margin: 0px; padding: 0px;\">Ladophar tự h&agrave;o l&agrave; đơn vị đầu ti&ecirc;n nghi&ecirc;n cứu v&agrave; sản xuất ra cao Actis&ocirc; tại Việt Nam với h&agrave;m lượng hoạt chất cao nhất thị trường.</p>\n<p style=\"margin: 0px; padding: 0px;\">Cao Actis&ocirc; l&agrave; hoạt chất to&agrave;n phần chiết xuất từ l&aacute; tươi Actis&ocirc;, bằng c&ocirc;ng nghệ c&ocirc; ch&acirc;n kh&ocirc;ng, bảo to&agrave;n h&agrave;m lượng hoạt chất.</p>\n<p style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\">Th&agrave;nh phần:</strong><br style=\"margin: 0px; padding: 0px;\" />100 g cao đặc<a style=\"margin: 0px; padding: 0px; color: #1f7bb6; text-decoration-line: none; outline: 0px;\" href=\"http://baoveganmangvetailoc.ladopharquatangsuckhoe.vn/tim-hieu-ve-atiso-va-cong-dung-suc-khoe/\">acis&ocirc;</a>tương đương 3,5 kg l&aacute; tươi Actis&ocirc;.</p>\n<p style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\">C&aacute;ch d&ugrave;ng:</strong>D&ugrave;ng 2-3 g mỗi lần, ng&agrave;y 2-3 lần.<br style=\"margin: 0px; padding: 0px;\" />H&ograve;a tan cao đặc Actis&ocirc; trong nước n&oacute;ng,<br style=\"margin: 0px; padding: 0px;\" />D&ugrave;ng th&ecirc;m đường hay mật ong t&ugrave;y th&iacute;ch.</p>\n<p style=\"margin: 0px; padding: 0px;\"><strong style=\"margin: 0px; padding: 0px;\">Bảo quản:</strong>Nơi kh&ocirc;, tr&aacute;nh &aacute;nh nắng trực tiếp.</p>\n<p style=\"margin: 0px; padding: 0px;\">Thực phẩm n&agrave;y kh&ocirc;ng phải l&agrave; thuốc, kh&ocirc;ng c&oacute; t&aacute;c dụng thay thế thuốc chữa bệnh.</p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>',120000,110000,NULL,NULL,NULL,3,1,1,1,'','','',NULL,NULL,NULL,100),(18,'Cà phê hạt',0,'2021-08-06 10:38:08','18KY',17,0,'https://appdala.net/wp-content/uploads/gia-ca-phe-hom-nay-114.jpg','','','<div style=\"text-align: justify;\"><span style=\"color: #242424; font-family: Roboto, Helvetica, Arial, sans-serif;\">CAM KẾT KH&Ocirc;NG tẩm hương liệu, h&oacute;a chất KH&Ocirc;NG sử dụng hạt c&oacute; phẩm cấp thấp KH&Ocirc;NG sử dụng c&aacute;c loại hạt kh&aacute;c để rang</span><br style=\"color: #242424; font-family: Roboto, Helvetica, Arial, sans-serif;\" /><span style=\"color: #242424; font-family: Roboto, Helvetica, Arial, sans-serif;\">Th&agrave;nh Phần : 80% Arabica + 20% Robusta Rang Mộc Ho&agrave;n To&agrave;n . Dạng Xay Pha Phin .</span></div>',350000,NULL,NULL,NULL,NULL,7,1,1,1,'','','',15,5,15,1000),(19,'HẠT SACHA INCHI NƯỚC CỐT DỪA 100G',0,'2021-10-03 09:36:20','19A',18,0,'https://appdala.net/wp-content/uploads/sachi-cot-dua1-3-scaled.jpg','https://appdala.net/wp-content/uploads/sachi-cot-dua-2-1-scaled.jpg;https://appdala.net/wp-content/uploads/sachi-cot-dua1-4-scaled.jpg;https://appdala.net/wp-content/uploads/sachi-cot-dua-3-1-scaled.jpg','','<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-3402f059-7fff-867d-5b9c-389a1b590974\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">C&aacute;c sản phẩm của N&ocirc;ng L&acirc;m Food được nghi&ecirc;n cứu v&agrave; ph&aacute;t triển bởi c&aacute;c nh&agrave; khoa học đến từ Trường </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Đại Học N&ocirc;ng L&acirc;m</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\"> v&agrave; </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Đại học Ghent, Bỉ</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\"> - thuộc top 100 trường đại học tốt nhất thế giới.</span></span></p>\n<p style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\"></p>\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-3402f059-7fff-867d-5b9c-389a1b590974\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Quy tr&igrave;nh chế biến được ứng dụng </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">c&ocirc;ng nghệ sấy hồng ngoại</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\"> ti&ecirc;n tiến đến từ H&agrave;n Quốc, gi&uacute;p lưu giữ h&agrave;m lượng dinh dưỡng để cho ra sản phẩm dẻo mềm, thơm ngon hơn.</span></span></p>\n<p style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\"></p>\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-3402f059-7fff-867d-5b9c-389a1b590974\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Nguy&ecirc;n liệu được tuyển chọn kỹ lưỡng từ v&ugrave;ng nguy&ecirc;n liệu sạch, giữ trọn vẹn hương vị v&agrave; gi&aacute; trị từ thi&ecirc;n nhi&ecirc;n.</span></span></p>\n<p style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\"></p>\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-3402f059-7fff-867d-5b9c-389a1b590974\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-style: italic; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">C&ocirc;ng dụng của hạt Sacha Inchi:</span></span></p>\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-3402f059-7fff-867d-5b9c-389a1b590974\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-style: italic; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Sacha Inchi, c&ograve;n được gọi l&agrave; đậu phộng Inca, l&agrave; loại c&acirc;y mọc ở rừng nhiệt đới Amazone v&agrave; v&ugrave;ng cao nguy&ecirc;n của Peru. C&aacute;c chuy&ecirc;n gia đ&atilde; v&iacute; loại hạt n&agrave;y l&agrave; một trong những si&ecirc;u thực phẩm l&agrave;nh mạnh nhất thế giới v&igrave; Sacha Inchi rất gi&agrave;u protein, omega-3, 6, 9, vitamin v&agrave; chất xơ. Kh&ocirc;ng chỉ c&oacute; nhiều lợi &iacute;ch cho sức khỏe m&agrave; hạt Sacha Inchi c&ograve;n c&oacute; t&aacute;c dụng giảm c&acirc;n, gi&uacute;p da v&agrave; t&oacute;c chắc khỏe. L&agrave; một trong những sản phẩm cao cấp của ch&uacute;ng t&ocirc;i, hạt Sacha Inchi rang cốt dừa v&ocirc; c&ugrave;ng thơm ngon v&agrave; gi&ograve;n rụm, mang lại cho bạn m&oacute;n ăn vặt vừa hấp dẫn vừa c&oacute; lợi cho sức khỏe.</span></span></p>\n<p style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\"></p>\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-3402f059-7fff-867d-5b9c-389a1b590974\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Sau nhiều năm hoạt động v&agrave; ph&aacute;t triển, ch&uacute;ng t&ocirc;i đ&atilde; đạt được những th&agrave;nh tựu đ&aacute;ng kể v&agrave; c&aacute;c chứng chỉ uy t&iacute;n trong lĩnh vực chế biến n&ocirc;ng sản c&oacute; lợi cho sức khỏe: </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">H&agrave;ng Việt Nam Chất Lượng Cao, HACCP, ISO22000:2015, GMP</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">&hellip;</span></span></p>\n<p style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\"></p>\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-3402f059-7fff-867d-5b9c-389a1b590974\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Sản phẩm của N&ocirc;ng L&acirc;m Food hiện nay đ&atilde; c&oacute; mặt tại khắp c&aacute;c cửa h&agrave;ng thực phẩm sạch, cửa h&agrave;ng đặc sản v&agrave; qu&agrave; tặng, c&aacute;c chuỗi hệ thống si&ecirc;u thị v&agrave; cửa h&agrave;ng tiện lợi tr&ecirc;n to&agrave;n quốc như </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">BigC, AEON, Lotte Mart, VinMart, CoopMart, Cirkle K, Ministop</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">....</span></span></p>\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-3402f059-7fff-867d-5b9c-389a1b590974\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Ngo&agrave;i ra, c&aacute;c sản phẩm tr&aacute;i c&acirc;y sấy nhiệt đới của ch&uacute;ng t&ocirc;i đ&atilde; được xuất khẩu v&agrave; y&ecirc;u th&iacute;ch tại nhiều nước tr&ecirc;n thế giới như </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">EU, &Uacute;c, Singapore, Nga</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">&hellip; v&agrave; c&aacute;c thị trường kh&oacute; t&iacute;nh kh&aacute;c như </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Mỹ, Nhật</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">&hellip;</span></span></p>\n<p style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\"><br style=\"box-sizing: border-box; margin: 0px; padding: 0px;\" /><span id=\"docs-internal-guid-3402f059-7fff-867d-5b9c-389a1b590974\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Sản phẩm N&ocirc;ng L&acirc;m Food lu&ocirc;n được người ti&ecirc;u d&ugrave;ng ưa chuộng những khi nh&acirc;m nhi, thưởng thức c&ugrave;ng bạn b&egrave;, người th&acirc;n. Đặc biệt, đ&acirc;y c&ograve;n l&agrave; d&ograve;ng sản phẩm được kh&aacute;ch h&agrave;ng lựa chọn nhiều nhất để l&agrave;m </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">qu&agrave; tặng trong dịp Tết 2019</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\"> vừa qua.</span></span></p>',200000,150000,NULL,NULL,NULL,1,1,1,1,'','','',NULL,NULL,NULL,100),(20,'HẠT SACHA INCHI PHỦ CÀ PHÊ 100G',0,'2021-10-03 09:39:02','205X',18,0,'https://appdala.net/wp-content/uploads/sachi-cafe-2-1-scaled.jpg','https://appdala.net/wp-content/uploads/sachi-cafe-1-2-scaled.jpg;https://appdala.net/wp-content/uploads/sachi-cafe-2-2-scaled.jpg;https://appdala.net/wp-content/uploads/sachi-cafe-3-1-scaled.jpg','','<p style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\"><span id=\"docs-internal-guid-1e5d2b1c-7fff-0f6e-5480-a7c90c0415ba\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">C&aacute;c sản phẩm của N&ocirc;ng L&acirc;m Food được nghi&ecirc;n cứu v&agrave; ph&aacute;t triển bởi c&aacute;c nh&agrave; khoa học đến từ Trường </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Đại Học N&ocirc;ng L&acirc;m</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\"> v&agrave; </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Đại học Ghent, Bỉ</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\"> - thuộc top 100 trường đại học tốt nhất thế giới.</span></span></p>\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-2e73d85d-7fff-8763-a05e-b3a6542d2820\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Quy tr&igrave;nh chế biến được ứng dụng </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">c&ocirc;ng nghệ sấy hồng ngoại</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\"> ti&ecirc;n tiến đến từ H&agrave;n Quốc, gi&uacute;p lưu giữ h&agrave;m lượng dinh dưỡng để cho ra sản phẩm dẻo mềm, thơm ngon hơn.</span></span></p>\n<br style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\" />\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-2e73d85d-7fff-8763-a05e-b3a6542d2820\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Nguy&ecirc;n liệu được tuyển chọn kỹ lưỡng từ v&ugrave;ng nguy&ecirc;n liệu sạch, giữ trọn vẹn hương vị v&agrave; gi&aacute; trị từ thi&ecirc;n nhi&ecirc;n.</span></span></p>\n<br style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\" />\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-2e73d85d-7fff-8763-a05e-b3a6542d2820\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-style: italic; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">C&ocirc;ng dụng của hạt Sacha Inchi:</span></span></p>\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-2e73d85d-7fff-8763-a05e-b3a6542d2820\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-style: italic; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Sacha Inchi, c&ograve;n được gọi l&agrave; đậu phộng Inca, l&agrave; loại c&acirc;y mọc ở rừng nhiệt đới Amazone v&agrave; v&ugrave;ng cao nguy&ecirc;n của Peru. C&aacute;c chuy&ecirc;n gia đ&atilde; v&iacute; loại hạt n&agrave;y l&agrave; một trong những si&ecirc;u thực phẩm l&agrave;nh mạnh nhất thế giới v&igrave; Sacha Inchi rất gi&agrave;u protein, omega-3, 6, 9, vitamin v&agrave; chất xơ. Kh&ocirc;ng chỉ c&oacute; nhiều lợi &iacute;ch cho sức khỏe m&agrave; hạt Sacha Inchi c&ograve;n c&oacute; t&aacute;c dụng giảm c&acirc;n, gi&uacute;p da v&agrave; t&oacute;c chắc khỏe. L&agrave; một trong những sản phẩm cao cấp của ch&uacute;ng t&ocirc;i, hạt Sacha Inchi rang phủ c&agrave; ph&ecirc; thật tạo n&ecirc;n hương vị h&agrave;i h&ograve;a v&agrave; gi&uacute;p tăng cường sự tỉnh t&aacute;o.</span></span></p>\n<br style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\" />\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-2e73d85d-7fff-8763-a05e-b3a6542d2820\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Sau nhiều năm hoạt động v&agrave; ph&aacute;t triển, ch&uacute;ng t&ocirc;i đ&atilde; đạt được những th&agrave;nh tựu đ&aacute;ng kể v&agrave; c&aacute;c chứng chỉ uy t&iacute;n trong lĩnh vực chế biến n&ocirc;ng sản c&oacute; lợi cho sức khỏe: </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">H&agrave;ng Việt Nam Chất Lượng Cao, HACCP, ISO22000:2015, GMP</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">&hellip;</span></span></p>\n<br style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\" />\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-2e73d85d-7fff-8763-a05e-b3a6542d2820\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Sản phẩm của N&ocirc;ng L&acirc;m Food hiện nay đ&atilde; c&oacute; mặt tại khắp c&aacute;c cửa h&agrave;ng thực phẩm sạch, cửa h&agrave;ng đặc sản v&agrave; qu&agrave; tặng, c&aacute;c chuỗi hệ thống si&ecirc;u thị v&agrave; cửa h&agrave;ng tiện lợi tr&ecirc;n to&agrave;n quốc như </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">BigC, AEON, Lotte Mart, VinMart, CoopMart, Cirkle K, Ministop</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">....</span></span></p>\n<p dir=\"ltr\" style=\"box-sizing: border-box; margin: 0pt 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff; line-height: 1.8; text-align: justify;\"><span id=\"docs-internal-guid-2e73d85d-7fff-8763-a05e-b3a6542d2820\" style=\"box-sizing: border-box; margin: 0px; padding: 0px;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Ngo&agrave;i ra, c&aacute;c sản phẩm tr&aacute;i c&acirc;y sấy nhiệt đới của ch&uacute;ng t&ocirc;i đ&atilde; được xuất khẩu v&agrave; y&ecirc;u th&iacute;ch tại nhiều nước tr&ecirc;n thế giới như </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">EU, &Uacute;c, Singapore, Nga</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">&hellip; v&agrave; c&aacute;c thị trường kh&oacute; t&iacute;nh kh&aacute;c như </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Mỹ, Nhật</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">&hellip;</span></span></p>\n<br style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\" /><span id=\"docs-internal-guid-2e73d85d-7fff-8763-a05e-b3a6542d2820\" style=\"box-sizing: border-box; margin: 0px; padding: 0px; color: #333333; font-family: Nunito, sans-serif; font-size: 15px; background-color: #ffffff;\"><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">Sản phẩm N&ocirc;ng L&acirc;m Food lu&ocirc;n được người ti&ecirc;u d&ugrave;ng ưa chuộng những khi nh&acirc;m nhi, thưởng thức c&ugrave;ng bạn b&egrave;, người th&acirc;n. Đặc biệt, đ&acirc;y c&ograve;n l&agrave; d&ograve;ng sản phẩm được kh&aacute;ch h&agrave;ng lựa chọn nhiều nhất để l&agrave;m </span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: bold; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\">qu&agrave; tặng trong dịp Tết 2019</span><span style=\"box-sizing: border-box; margin: 0px; padding: 0px; font-size: 11pt; font-family: Arial; color: #000000; background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;\"> vừa qua.</span></span>',200000,100000,NULL,NULL,NULL,1,1,1,1,'','','',NULL,NULL,NULL,100);
/*!40000 ALTER TABLE `dala_products_speciality` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_products_speciality_insert` BEFORE INSERT ON `dala_products_speciality` FOR EACH ROW BEGIN  






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














END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_products_speciality_update` BEFORE UPDATE ON `dala_products_speciality` FOR EACH ROW BEGIN  






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


END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_reviews_food_drink`
--

DROP TABLE IF EXISTS `dala_reviews_food_drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_reviews_food_drink` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_reviews_food_drink`
--

LOCK TABLES `dala_reviews_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_reviews_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_reviews_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_reviews_speciality`
--

DROP TABLE IF EXISTS `dala_reviews_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_reviews_speciality` (
  `dala_reviews_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_reviews_speciality_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_reviews_speciality_user_id` int NOT NULL,
  `dala_reviews_speciality_product_id` int NOT NULL,
  `dala_reviews_speciality_contents` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_reviews_speciality_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_reviews_speciality_number_star` int NOT NULL DEFAULT '5',
  PRIMARY KEY (`dala_reviews_speciality_ID`),
  KEY `reviews_speciality_user_id` (`dala_reviews_speciality_user_id`),
  KEY `reviews_speciality_product_id` (`dala_reviews_speciality_product_id`),
  CONSTRAINT `reviews_speciality_product_id` FOREIGN KEY (`dala_reviews_speciality_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `reviews_speciality_user_id` FOREIGN KEY (`dala_reviews_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_reviews_speciality`
--

LOCK TABLES `dala_reviews_speciality` WRITE;
/*!40000 ALTER TABLE `dala_reviews_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_reviews_speciality` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_reviews_speciality_user_id_insert` BEFORE INSERT ON `dala_reviews_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_speciality_user_id  is null or NEW.dala_reviews_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_user_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_reviews_speciality_product_id_insert` BEFORE INSERT ON `dala_reviews_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_speciality_product_id  is null or NEW.dala_reviews_speciality_product_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_product_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_reviews_speciality_user_id_update` BEFORE UPDATE ON `dala_reviews_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_speciality_user_id  is null or NEW.dala_reviews_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_user_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_reviews_speciality_product_id_update` BEFORE UPDATE ON `dala_reviews_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_speciality_product_id  is null or NEW.dala_reviews_speciality_product_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_product_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_reviews_store_speciality`
--

DROP TABLE IF EXISTS `dala_reviews_store_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_reviews_store_speciality` (
  `dala_reviews_store_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_reviews_store_speciality_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_reviews_store_speciality_user_id` int NOT NULL,
  `dala_reviews_store_speciality_store_id` int NOT NULL,
  `dala_reviews_store_speciality_contents` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_reviews_store_speciality_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_reviews_store_speciality_number_star` int NOT NULL DEFAULT '5',
  PRIMARY KEY (`dala_reviews_store_speciality_ID`),
  KEY `reviews_store_speciality_user_id` (`dala_reviews_store_speciality_user_id`),
  KEY `reviews_store_speciality_store_id` (`dala_reviews_store_speciality_store_id`),
  CONSTRAINT `reviews_store_speciality_store_id` FOREIGN KEY (`dala_reviews_store_speciality_store_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `reviews_store_speciality_user_id` FOREIGN KEY (`dala_reviews_store_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_reviews_store_speciality`
--

LOCK TABLES `dala_reviews_store_speciality` WRITE;
/*!40000 ALTER TABLE `dala_reviews_store_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_reviews_store_speciality` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_reviews_store_speciality_user_id_insert` BEFORE INSERT ON `dala_reviews_store_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_store_speciality_user_id  is null or NEW.dala_reviews_store_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_dala_reviews_store_speciality_user_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_reviews_store_speciality_store_id_insert` BEFORE INSERT ON `dala_reviews_store_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_store_speciality_store_id  is null or NEW.dala_reviews_store_speciality_store_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_store_speciality_store_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_reviews_store_speciality_user_id_update` BEFORE INSERT ON `dala_reviews_store_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_store_speciality_user_id  is null or NEW.dala_reviews_store_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_dala_reviews_store_speciality_user_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_reviews_store_speciality_store_id_update` BEFORE INSERT ON `dala_reviews_store_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_reviews_store_speciality_store_id  is null or NEW.dala_reviews_store_speciality_store_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_store_speciality_store_id_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_service_type`
--

DROP TABLE IF EXISTS `dala_service_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_service_type` (
  `dala_service_type_ID` int NOT NULL AUTO_INCREMENT,
  `dala_service_type_name` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_service_type_information` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_service_type_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_service_type`
--

LOCK TABLES `dala_service_type` WRITE;
/*!40000 ALTER TABLE `dala_service_type` DISABLE KEYS */;
INSERT INTO `dala_service_type` VALUES (3,'speciality','dịch vụ bán hàng đặc sản đà lạt'),(4,'food-drink','dịch vụ ăn uống ăn uông');
/*!40000 ALTER TABLE `dala_service_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_service_type_name_insert` BEFORE INSERT ON `dala_service_type` FOR EACH ROW BEGIN  

IF(NEW.dala_service_type_name  is null or NEW.dala_service_type_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_service_type_name_empty';   
END IF;




END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_service_type_name_update` BEFORE UPDATE ON `dala_service_type` FOR EACH ROW BEGIN  

IF(NEW.dala_service_type_name  is null or NEW.dala_service_type_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_service_type_name_empty';   
END IF;




END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_session_food_drink`
--

DROP TABLE IF EXISTS `dala_session_food_drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_session_food_drink` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_session_food_drink`
--

LOCK TABLES `dala_session_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_session_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_session_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_session_speciality`
--

DROP TABLE IF EXISTS `dala_session_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_session_speciality` (
  `dala_session_speciality_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_session_speciality_line_order` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_session_speciality_product_id` int NOT NULL,
  `dala_session_speciality_qty` int NOT NULL,
  `dala_session_speciality_price` float NOT NULL,
  `dala_session_speciality_discount` float NOT NULL DEFAULT '0',
  `dala_session_speciality_unit_discount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_session_speciality_name`,`dala_session_speciality_line_order`,`dala_session_speciality_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_session_speciality`
--

LOCK TABLES `dala_session_speciality` WRITE;
/*!40000 ALTER TABLE `dala_session_speciality` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_session_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_shipping_company`
--

DROP TABLE IF EXISTS `dala_shipping_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_shipping_company` (
  `dala_shipping_company_ID` int NOT NULL AUTO_INCREMENT,
  `dala_shipping_company_name` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_company_information` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_shipping_company_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_shipping_company`
--

LOCK TABLES `dala_shipping_company` WRITE;
/*!40000 ALTER TABLE `dala_shipping_company` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_shipping_company` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_shipping_company_name_insert` BEFORE INSERT ON `dala_shipping_company` FOR EACH ROW BEGIN  
IF(NEW.dala_shipping_company_name  is null or NEW.dala_shipping_company_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_shipping_company_name_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_shipping_company_name_update` BEFORE INSERT ON `dala_shipping_company` FOR EACH ROW BEGIN  
IF(NEW.dala_shipping_company_name  is null or NEW.dala_shipping_company_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_shipping_company_name_empty';   
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_shipping_food_drink`
--

DROP TABLE IF EXISTS `dala_shipping_food_drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_shipping_food_drink` (
  `dala_shipping_food_drink_ID` int NOT NULL AUTO_INCREMENT,
  `dala_shipping_food_drink_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_food_drink_parent_id` int NOT NULL DEFAULT '0',
  `dala_shipping_food_drink_information` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_food_drink_price` float DEFAULT NULL,
  `dala_shipping_food_drink_show` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_shipping_food_drink_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_shipping_food_drink`
--

LOCK TABLES `dala_shipping_food_drink` WRITE;
/*!40000 ALTER TABLE `dala_shipping_food_drink` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_shipping_food_drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_shipping_speciality`
--

DROP TABLE IF EXISTS `dala_shipping_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_shipping_speciality` (
  `dala_shipping_speciality_ID` int NOT NULL AUTO_INCREMENT,
  `dala_shipping_speciality_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_speciality_code` int NOT NULL COMMENT 'mã vùng, lấy theo datas array. ví dụ : 01,02,03.....',
  `dala_shipping_speciality_parent_id` int NOT NULL DEFAULT '0',
  `dala_shipping_speciality_information` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_speciality_price` float DEFAULT '0',
  `dala_shipping_speciality_show` int NOT NULL DEFAULT '0' COMMENT 'cột này chưa dùng',
  PRIMARY KEY (`dala_shipping_speciality_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Bảng giá shipping từng khu vực nhập vào';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_shipping_speciality`
--

LOCK TABLES `dala_shipping_speciality` WRITE;
/*!40000 ALTER TABLE `dala_shipping_speciality` DISABLE KEYS */;
INSERT INTO `dala_shipping_speciality` VALUES (1,'Thành phố Đà Lạt',672,0,'',30000,0),(2,'Phường 7',24769,1,'',27000,0),(3,'Phường 8',24772,1,'',28000,0),(4,'Xã Xuân Thọ',24805,1,'',30000,0),(5,'Xã Tà Nung',24808,1,'',35000,0),(6,'Xã Trạm Hành',24810,1,'',34000,0),(7,'Xã Xuân Trường',24811,1,'',37000,0),(8,'Phường 12',12,1,'',12000,0),(9,'Phường 9',9,1,'',22000,0),(10,'Phường 2',2,1,'',20000,0),(11,'Phường 1',1,1,'',30000,0),(12,'Phường 6',6,1,'',20000,0),(13,'Phường 5',5,1,'',30000,0),(14,'Phường 4',4,1,'',25000,0),(15,'Phường 10',10,1,'',22000,0),(16,'Phường 11',11,1,'',23000,0),(17,'Phường 3',3,1,'',15000,0);
/*!40000 ALTER TABLE `dala_shipping_speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_shipping_tracking`
--

DROP TABLE IF EXISTS `dala_shipping_tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_shipping_tracking` (
  `dala_shipping_tracking_ID` int NOT NULL AUTO_INCREMENT,
  `dala_shipping_tracking_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_shipping_tracking_users_id` int NOT NULL,
  `dala_shipping_tracking_orders_id` int NOT NULL,
  `dala_shipping_tracking_infomation` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_tracking_orders_status` tinyint(1) NOT NULL,
  `dala_shipping_tracking_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_shipping_tracking_ID`),
  KEY `shipping_tracking_users_id` (`dala_shipping_tracking_users_id`),
  KEY `shipping_tracking_orders_id` (`dala_shipping_tracking_orders_id`),
  CONSTRAINT `shipping_tracking_orders_id` FOREIGN KEY (`dala_shipping_tracking_orders_id`) REFERENCES `dala_orders_speciality` (`dala_orders_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `shipping_tracking_users_id` FOREIGN KEY (`dala_shipping_tracking_users_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_shipping_tracking`
--

LOCK TABLES `dala_shipping_tracking` WRITE;
/*!40000 ALTER TABLE `dala_shipping_tracking` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_shipping_tracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_stores`
--

DROP TABLE IF EXISTS `dala_stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_stores` (
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
  `dala_stores_local_x` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_local_y` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_local_adress` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_stores_status_update` tinyint(1) NOT NULL DEFAULT '0',
  `dala_stores_payment_methods` tinyint(1) NOT NULL DEFAULT '0',
  `dala_stores_payment_time` tinyint(1) NOT NULL DEFAULT '28',
  `dala_stores_upload_limit_day` smallint unsigned NOT NULL DEFAULT '20',
  `dala_stores_upload_limit_month` smallint unsigned NOT NULL DEFAULT '300',
  PRIMARY KEY (`dala_stores_ID`),
  KEY `stores_user_id` (`dala_stores_user_id`),
  KEY `stores_service_type_id` (`dala_stores_service_type_id`),
  CONSTRAINT `stores_service_type_id` FOREIGN KEY (`dala_stores_service_type_id`) REFERENCES `dala_service_type` (`dala_service_type_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `stores_user_id` FOREIGN KEY (`dala_stores_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_stores`
--

LOCK TABLES `dala_stores` WRITE;
/*!40000 ALTER TABLE `dala_stores` DISABLE KEYS */;
INSERT INTO `dala_stores` VALUES (17,51,'2021-10-03 00:19:17','Cửa hàng đặt sản đà lạt DALA',10000000,3,'số 51, trương định','Tỉnh Lâm Đồng','Thành phố Đà Lạt','Phường 8','09480360101','','','store infomartion',1,1,'01010011002','','','','',0,0,28,20,300),(18,91,'2021-10-03 09:17:13','CÔNG TY CỔ PHẦN NÔNG LÂM FOOD',2000000,3,'68 Nguyễn Huệ','Thành phố Hồ Chí Minh','Quận 1','Phường Bến Nghé','0708546623','https://appdala.net/wp-content/uploads/logo-nonglamfood-full-ngang-22-1-scaled.jpg','','',1,1,'','','','','',0,0,28,20,300);
/*!40000 ALTER TABLE `dala_stores` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_stores_insert` BEFORE INSERT ON `dala_stores` FOR EACH ROW BEGIN  







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











END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_stores_update` BEFORE UPDATE ON `dala_stores` FOR EACH ROW BEGIN  







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









END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_token`
--

DROP TABLE IF EXISTS `dala_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_token` (
  `dala_token_ID` int NOT NULL AUTO_INCREMENT,
  `dala_token_key` varchar(500) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `dala_token_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: user app,1: admin, 2 bussiness',
  `dala_token_value` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_token_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`dala_token_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_token`
--

LOCK TABLES `dala_token` WRITE;
/*!40000 ALTER TABLE `dala_token` DISABLE KEYS */;
INSERT INTO `dala_token` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJfcm9sZSI6ImRlZmF1bHQiLCJpYXQiOjE2MjMyMjg3NTl9.iQrzkanw_3SAyFT03Kq3GbWLdpcZtvkuswhKaKtsn0M',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJzX3Bob25lIjoiMDk0ODAzNjAxMDciLCJ1c2Vyc19lbWFpbCI6Ikd1ZXN0RGFsYUFsbEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQxMjc4OTUzNGY1Y2Q1YjI2M2JiNTc0YmEyZjA5NTg1IiwidXNlcl9yb2xlIjoiZGVmYXVsdCIsImlhdCI6MTYyMzIyODc1OX0.q5Qv9zG_ynJsnOFFqcB4mDpMftZ9fxHToXbFfuAxXBo','2021-10-03 00:19:17'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2VyX3JvbGUiOiJzdXBwZXItam9iIiwiaWF0IjoxNjIzNTUxNTE3fQ.lPM-4c93GPDnmwHwayVp94AXPtG0Zn7oyt5U8djJVwQ',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2Vyc19waG9uZSI6IjA4ODk0NTAzMDciLCJ1c2Vyc19lbWFpbCI6InN1cHBlci1qb2JAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJlNmY2YzE4NTY5MDlmZDRiNTI3YjNhYjA0ZDBlOTlhMyIsInVzZXJfcm9sZSI6InN1cHBlci1qb2IiLCJpYXQiOjE2MjM1NTE1MTd9.S37Ab2vDod4e9YErqdqeLEFTUt18WgEcxMUtsROdC7o','2021-10-03 00:19:17'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTAsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nX2dodGsiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzE3Mjk4Nn0.nVFL657kw9PZ-a0WnVqQHNU99m2-gMVSG2ClmXptBNo',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTAsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nX2dodGsiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIzIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzEyQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzE3Mjk4Nn0.D47F-HWdwmpSJu1Xt5ooiKOgArV33D0R0dGnKIY3M7w','2021-10-03 00:19:17'),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyMjA3NDN9.AMiUeNj7DaSjouVfDPH1rQ-OzXEXWQVPEyOGSws5bNA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzIyMDc0M30.DIbtoLScZaT2-yVXCIix5tu0iHSszGITxb0SpHzeBnA','2021-10-03 07:25:43'),(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjA4MTB9.AFR7r2I6XpH-50j9pAvfbUpv7FtTiv5KmpXOGXUfpso',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjA4MTB9.qWqqeWDmYbTH5m0YPsb_FF5iqL7KiV3pQ1fkT1l3HEI','2021-10-03 07:26:50'),(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyMjExNzZ9.UCTF4ii6PCLw4NOqtsRwqCpEZ1uEvGB1sj_BB13NhHo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzIyMTE3Nn0.dD0hTLt08Thzh65OUyziOvysoT-u5ilCISWCLuiFrA4','2021-10-03 07:32:56'),(7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzMjI2MTA5fQ.BJRs1prdv_ka40kJ97W3ty_ObWIWSxX6BWn3Ru0juZo',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDk0ODAzNjAxMDYiLCJ1c2Vyc19lbWFpbCI6ImN1c3RvbW1lckBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMyMjYxMDl9.O-NiBOrelZ_TDa8EHQhk7JjFSclXQc45f92jasnun80','2021-10-03 08:55:09'),(8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzIyODU3Mn0.XjOagbpGSQMF1twpKD_Ar1f68UQTOOoptC_LEFru9LY',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjg1NzJ9.KJWSzWVhBC09Pn_zjFNXEI3EZpBOx0jF9JfEwTXZGEQ','2021-10-03 09:36:12'),(9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzIzNDY2N30.fJXwwylzUjxYwar9cvFAdLcx-FJlmyFkcYq8jd4W3P8',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMzQ2Njd9.iSk3HzO_bbd6yT-X08R8khzY_cxxqF3wSVPZfmOY6Pc','2021-10-03 11:17:47'),(10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyMzQ3MDB9.h3r0tCBNOqLXBLj_jwjWsRwUzkMqVw4po1xuAMrXNLc',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzIzNDcwMH0.Za-zntkgsJu33wnAzBPZZgTbjljnApFCH22wFPnzhvk','2021-10-03 11:18:20'),(11,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzIzNTM1MX0.gPfaHS073hQNk9HWizxRkAqNpbWLg9rt3YDxMyzDfVI',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMzUzNTF9.MujfhRcxgmnHNeLTbDpB2oYvMueSuhjVpAGVNsCyzYA','2021-10-03 11:29:11'),(12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDA4Njd9.0c8hGpc56Zmwp3kZ6EcFvsasnYvV7YEyyXjx63P-a7U',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0MDg2N30.Qbwiu0IQVwsM_scDtFhAfY-kBcm6K8bvkqHt6Y3By4Y','2021-10-03 13:01:07'),(13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDExODV9.b589sTdfM7W5_Mflw-NVyh5wiWjwIVY5N2paZPj90Qg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0MTE4NX0.ZcDmxZH1k7yUt2uj3FBGP_9xFc-suaKChyo_vJCN3vI','2021-10-03 13:06:25'),(14,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzMzNjR9.ZNMafvagldhXZNzWgcdaVCLcI4rJMVOMr4wvGqc5gcA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MzM2NH0.d7jRd6i2zpzTGXTPf4eabk23fgazPn8-c7Hqj3jB87k','2021-10-03 22:02:44'),(15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMDgyMTJ9.zBECWsr7xyBbCsPiht57abtIliCzwOYFbwuJPb6UGUM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMwODIxMn0.O4Q_cMYSLHacFAjYzHvPzhU5WUwhe3WiVlH0Nu7em7A','2021-10-04 07:43:32'),(16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMDgyNzd9.yiGAD0ybDjBPWWnQnCk5w_JJEG1NWyp0DY48dQujwTc',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMDgyNzd9.iEDrJiS-v9dKosXymD16Z5-dJ6yckzsICSY_7wPcBTA','2021-10-04 07:44:37'),(17,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMwODM5NH0.88o8lTzDTMRz0w-pky0kqEAT_O9hQ31cN0UmEcDdGTo',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMDgzOTR9.wE-5K8iCPCoAehQEEKQDAPGLHr3Ui36wMb3vZ1VdjYc','2021-10-04 07:46:34'),(18,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMDg0NDV9.z4TNwzsVDpOlTMYcY9kZkFRFgsMG18xkYJXY5sl1nUw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMwODQ0NX0.yppZMO3SvbN6agHs-qnW4XztUB2voskOuDYu8pS5pEc','2021-10-04 07:47:25'),(19,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMTM3OTZ9.7s3YC99nlFxzXYjtqiZNyh0KFAeHeqpG8RotKdJGpkA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMxMzc5Nn0.p7TmKY4EH9nAWD0N9eKCXLYNi8gdPexUra5Nq-PQgT8','2021-10-04 09:16:36'),(20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMTgwMTZ9.2q-Nec3_KJl3kEs2swV2hGN9WjZEdnCfWKUiBiyJ9k8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMxODAxNn0.G2B3Zj_zk4-a_rNC1CbuXXfZR6qJKA7ZjG7Ld-9pgSs','2021-10-04 10:26:56'),(21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMyMTMwN30.W0gj7JtWWn1Ev7YaWL1gimvyVfKhSxDWiYQ-NFhMCCk',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMjEzMDd9.SApD0zSZhRAbGp9jAcDDDVx3Pzqo0Cv1CbdssJH6hSA','2021-10-04 11:21:47'),(22,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMjE0MTR9.BisfoNT1mKVlqK95bA4ukXDPowZiB23V3VUTFPhtpxY',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMjE0MTR9.O6Fm-ibmavb_NpDSGX12FsbpMoSfb2RZDFby_twjc7g','2021-10-04 11:23:34'),(23,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMzMzAwMzh9.chg6Dap7cpRgFPsVUGYLDhARquSHYyG-YNzTcuZPdgY',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJhYmNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiI0Mjk3ZjQ0YjEzOTU1MjM1MjQ1YjI0OTczOTlkN2E5MyIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzMzMwMDM4fQ.Vi5Wrp-T3UoYXZ6h7eHC4bVKZhi1SQytqjtGhTf_Axk','2021-10-04 13:47:18'),(24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMzMzE2Mjd9.-GyDQwYpMZxy8RWKv4xI2vIjv61ojqTzZcONwLIHRxI',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJhYmNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiI0Mjk3ZjQ0YjEzOTU1MjM1MjQ1YjI0OTczOTlkN2E5MyIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzMzMxNjI3fQ.G8tmD152n4Ar1XyEZ56nloZhph3Qi2OIoOREC8OHEZU','2021-10-04 14:13:47'),(25,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMzMzE2Mjl9.o0vQT-gSZwv8ZJ_RQCIx6veQvCOH6P8vkKzd9ZCQ89Q',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJhYmNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiI0Mjk3ZjQ0YjEzOTU1MjM1MjQ1YjI0OTczOTlkN2E5MyIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzMzMxNjI5fQ.VS7hNtAJO4WYyVudflD8e8x5qIufgtuZkhjzUNX7opE','2021-10-04 14:13:49'),(26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMzMzE2MzB9.M0ae7fhQ3IOyxRxyamT4-fnA56g_zjrhh3Jg55Fm5FA',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJhYmNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiI0Mjk3ZjQ0YjEzOTU1MjM1MjQ1YjI0OTczOTlkN2E5MyIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzMzMxNjMwfQ.0Vm61usaHiDaakvi-OhXN-2wg2yRWtKN0nz0jRc7g-E','2021-10-04 14:13:50'),(27,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMzMzE2NzZ9.wqTiFd_DjMxhSrFhqIhkP2YOwOYq8xUdVamjZv6NQzA',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJhYmNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiI0Mjk3ZjQ0YjEzOTU1MjM1MjQ1YjI0OTczOTlkN2E5MyIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzMzMxNjc2fQ._CPILZbjdWfOKsqndPOvQa6C6jKhFlCWthciyTVsvyc','2021-10-04 14:14:36'),(28,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzE4OTF9.gOfoIo8ESDrnHsxIrh2CoawhXyeyYuEC87kSso7XQqg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzMTg5MX0.qNAXizcCeizIVTDfxl7zv0kvN72uGaWRYlGh14UzQMI','2021-10-04 14:18:11'),(29,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMzMzE5Njd9.g7Jbh8Sp4_3ELokjh7e4-a8rOMMYAYmrFRehDRkUcFE',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJhYmNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiI0Mjk3ZjQ0YjEzOTU1MjM1MjQ1YjI0OTczOTlkN2E5MyIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzMzMxOTY3fQ.C8NHmIwXW6N1xFfUzCPcdJTL43d4IqMwNiYtLVMkbTo','2021-10-04 14:19:27'),(30,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMzMzIwNjR9.A8KV3xUmddf5YqkMd-lESZtnB0egiUQphRszT_ZzuCA',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJhYmNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiI0Mjk3ZjQ0YjEzOTU1MjM1MjQ1YjI0OTczOTlkN2E5MyIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzMzMyMDY0fQ.yZXdFcqpuAmXSDCfCIAjVhD80njKnCNMClKuRDPktEI','2021-10-04 14:21:04'),(31,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMzIzOTR9.gPyVheGJvDL9MPlNzXMiq3Eg4FyBJpYqRXfpsaWdp34',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMzIzOTR9.gty0QqRtU6aIN4EkfeOXqrgQvt-IAqZqBxQX91MbYOg','2021-10-04 14:26:34'),(32,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzI4OTZ9.Syr2zRiYVMMGiw8P4bGlHphzCO6ICbOJJ_PvG7gB-Wg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzMjg5Nn0.NIPCkJM1cA0YI_fJrziNiEetA3zRvEFZsLTab0KMRuM','2021-10-04 14:34:56'),(33,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTAwLCJ1c2Vyc19mdWxsX25hbWUiOiJ2dW9uZzIiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzMzMzQzM30.TZ-Qp-o451c-3OZos4HiGS1jhnBbjSQmJhxLKv16UJE',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTAwLCJ1c2Vyc19mdWxsX25hbWUiOiJ2dW9uZzIiLCJ1c2Vyc19waG9uZSI6IjA5ODEzMTQ4NDkiLCJ1c2Vyc19lbWFpbCI6InZ1b25nMkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMzMzM0MzN9.0CngLxujauk1MVZhRDGSBHKUAVJeATVDf5NPrpYpie4','2021-10-04 14:43:53'),(34,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDMwNDZ9.Fh4hu8gX_7TYhHQqH1UXP9TKq3nxxHu0f2JtOniLlRI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MzA0Nn0.HWNI7mIubwWXgnGfsUkYojXfJeHkRFT6NDdAxHelGjc','2021-10-04 17:24:06'),(35,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTAwLCJ1c2Vyc19mdWxsX25hbWUiOiJ2dW9uZzIiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzM0MzEzMX0.XuWdI-OxsowA8g-C3HaBmVmbh838NX9Sp8zsQziXfm8',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTAwLCJ1c2Vyc19mdWxsX25hbWUiOiJ2dW9uZzIiLCJ1c2Vyc19waG9uZSI6IjA5ODEzMTQ4NDkiLCJ1c2Vyc19lbWFpbCI6InZ1b25nMkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMzNDMxMzF9.hPp_26zrvVhDfMpkq6iYSHoUclkDKg2EdDx71NnwbZ8','2021-10-04 17:25:31'),(36,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTAwLCJ1c2Vyc19mdWxsX25hbWUiOiJ2dW9uZzIiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzM0MzIzN30.tBNuYOVuacnpvYTvtnVJXG2_Qx0msYrwnXrY3Bf1vaE',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTAwLCJ1c2Vyc19mdWxsX25hbWUiOiJ2dW9uZzIiLCJ1c2Vyc19waG9uZSI6IjA5ODEzMTQ4NDkiLCJ1c2Vyc19lbWFpbCI6InZ1b25nMkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMzNDMyMzd9.Dn00lazs5lXDU9xbnrEdja38qCqaIlPBX-DgckWdPV8','2021-10-04 17:27:17'),(37,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDMzNzd9.ID8WgW0_SBmI5bzOL5f99h4AzS4E8b6m26ESSimEPag',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MzM3N30.mOcLc95sNlcRsyiD4A7OA2fsvFvDJWMdiGibvRgcSZ4','2021-10-04 17:29:37'),(38,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDM2NjV9.lwTEBqEQw9CzhxhQyNMMT4rWW-UY9qjwu1gL9vxIiTw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MzY2NX0.yby7mV4-4mml2FcT0IP4rV7ZtEUeyOF2_5s66UbFJJ8','2021-10-04 17:34:25'),(39,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDUwMDF9.VrkVVLJz0mKgYYlT17ESRZLFlrkuyX-bkcVeDd7jTIs',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0NTAwMX0.1jE5C8XNSISLHlMn-sS7JoYGuaN5ejUfAa_9S76ATns','2021-10-04 17:56:41'),(40,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNTA0OTl9.UHtmIW225jm7p1AmHIQlQqHSNCHeSlDAbUbuYbRn1Wg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM1MDQ5OX0.tcA0mX87BmweSCoqWQZZdVHcg-PsBzKT9igiLshUKTU','2021-10-04 19:28:19'),(41,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNTE1MzF9.DJF6jLO5KZROfK_2YMWwk6XmmN3A-N3LYLCZ1ujWn1Y',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM1MTUzMX0.LaD7H_W_aF9fcCkq-V3_Hknbvog1mmE6P21Sr4DFsTA','2021-10-04 19:45:31'),(42,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNTE4ODZ9.e-VRQgDNihhQnFd0ANUIY1kNekBNrANvo1V5_QFGIJU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM1MTg4Nn0.YMQuoSAtEZpAOi72V3A5X0Dn79x1AWZUrEdmKjCtG4o','2021-10-04 19:51:26');
/*!40000 ALTER TABLE `dala_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_uploads_infomation`
--

DROP TABLE IF EXISTS `dala_uploads_infomation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_uploads_infomation` (
  `dala_uploads_infomation_ID` int NOT NULL AUTO_INCREMENT,
  `dala_uploads_infomation_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_uploads_infomation_user_id` int NOT NULL,
  `dala_uploads_infomation_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_uploads_infomation_image_id` int NOT NULL,
  PRIMARY KEY (`dala_uploads_infomation_ID`),
  KEY `uploads_infomation_user_id` (`dala_uploads_infomation_user_id`),
  CONSTRAINT `uploads_infomation_user_id` FOREIGN KEY (`dala_uploads_infomation_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_uploads_infomation`
--

LOCK TABLES `dala_uploads_infomation` WRITE;
/*!40000 ALTER TABLE `dala_uploads_infomation` DISABLE KEYS */;
INSERT INTO `dala_uploads_infomation` VALUES (1,'2021-10-03 07:28:34',51,'https://appdala.net/wp-content/uploads/dala-image.jpg',464),(2,'2021-10-03 09:17:11',50,'https://appdala.net/wp-content/uploads/logo-nonglamfood-full-ngang-22-1-scaled.jpg',466),(3,'2021-10-03 09:37:35',91,'https://appdala.net/wp-content/uploads/sachi-cot-dua1-3-scaled.jpg',477),(4,'2021-10-03 09:37:48',91,'https://appdala.net/wp-content/uploads/sachi-cot-dua-2-1-scaled.jpg',478),(5,'2021-10-03 09:37:59',91,'https://appdala.net/wp-content/uploads/sachi-cot-dua1-4-scaled.jpg',479),(6,'2021-10-03 09:38:09',91,'https://appdala.net/wp-content/uploads/sachi-cot-dua-3-1-scaled.jpg',480),(7,'2021-10-03 09:39:54',91,'https://appdala.net/wp-content/uploads/sachi-cafe-2-1-scaled.jpg',481),(8,'2021-10-03 09:40:14',91,'https://appdala.net/wp-content/uploads/sachi-cafe-1-2-scaled.jpg',482),(9,'2021-10-03 09:40:25',91,'https://appdala.net/wp-content/uploads/sachi-cafe-2-2-scaled.jpg',483),(10,'2021-10-03 09:40:38',91,'https://appdala.net/wp-content/uploads/sachi-cafe-3-1-scaled.jpg',484),(11,'2021-10-03 13:01:32',51,'https://appdala.net/wp-content/uploads/mut-dau-tay-ngot-ngao-1.jpg',489),(12,'2021-10-03 13:03:07',51,'https://appdala.net/wp-content/uploads/6-1.jpg',490),(13,'2021-10-03 13:07:12',51,'https://appdala.net/wp-content/uploads/avd-0ebd1-1.jpg',491);
/*!40000 ALTER TABLE `dala_uploads_infomation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dala_users`
--

DROP TABLE IF EXISTS `dala_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_users` (
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
  KEY `users_users_type_id` (`dala_users_users_type_id`),
  CONSTRAINT `users_users_type_id` FOREIGN KEY (`dala_users_users_type_id`) REFERENCES `dala_users_type` (`dala_users_type_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_users`
--

LOCK TABLES `dala_users` WRITE;
/*!40000 ALTER TABLE `dala_users` DISABLE KEYS */;
INSERT INTO `dala_users` VALUES (50,'2021-05-19 14:36:30','manage-dala','a3dcb4d229de6fde0db5686dee47145d','','manage-dala','manage-dala','manage-dala','0948036018','htms.group.vn@gmail.com','v4','v4','v4','v4',13,0,0,0,'',NULL),(51,'2021-05-19 14:37:36','dala-store','a3dcb4d229de6fde0db5686dee47145d','','dala-store','dala-store','dala-store','09480360101','dala-store@gmail.com','v4','v4','v4','v4',14,0,0,0,'',NULL),(56,'2021-05-19 14:47:18','custommer','a3dcb4d229de6fde0db5686dee47145d','','custommer','custommer','custommer','09480360106','custommer@gmail.com','v4','v4','v4','v4',15,0,0,0,'',NULL),(57,'2021-05-19 14:48:49','GuestDalaAll','412789534f5cd5b263bb574ba2f09585','','GuestDalaAll','GuestDalaAll','GuestDalaAll','09480360107','GuestDalaAll@gmail.com','v4','v4','v4','v4',16,0,0,0,'8475','2021-10-04 11:53:21'),(62,'2021-05-19 14:48:49','supper-job','e6f6c1856909fd4b527b3ab04d0e99a3','','supper-job','supper-job','supper-job','0889450307','supper-job@gmail.com','v4','v4','v4','v4',17,0,0,0,'',NULL),(63,'2021-05-19 14:48:49','shipping 1','a3dcb4d229de6fde0db5686dee47145d','','shipping 1','shipping 1','shipping 1','09480360121','shipping1@gmail.com','v4','v4','v4','v4',18,0,0,0,'',NULL),(90,'2021-05-19 14:48:49','shipping_ghtk','a3dcb4d229de6fde0db5686dee47145d','','shipping ghtk','shipping ghtk','shipping ghtk','09480360123','shipping12@gmail.com','v4','v4','v4','v4',18,0,0,0,'',NULL),(91,'2021-10-03 09:16:01','CÔNG TY CỔ PHẦN NÔNG LÂM FOOD','a3dcb4d229de6fde0db5686dee47145d','d41d8cd98f00b204e9800998ecf8427e','','','68 Nguyễn Huệ, phường Bến Nghé, Quận 1, thành phố Hồ Chí Minh','0708546623','vnwr.info@gmail.com','v4','v4','v4','v4',14,0,0,0,'',NULL),(100,'2021-10-04 14:43:53','vuong2','4297f44b13955235245b2497399d7a93','d41d8cd98f00b204e9800998ecf8427e','','','vuong 2 address','0981314849','vuong2@gmail.com','v4','v4','v4','v4',15,0,0,1,'','2021-10-04 14:52:19');
/*!40000 ALTER TABLE `dala_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_check_users_insert` BEFORE INSERT ON `dala_users` FOR EACH ROW BEGIN  



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
	IF (NEW.dala_users_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN 
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



END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_check_users_update` BEFORE UPDATE ON `dala_users` FOR EACH ROW BEGIN  



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



END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_users_tracking`
--

DROP TABLE IF EXISTS `dala_users_tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_users_tracking` (
  `dala_users_tracking_ID` int NOT NULL AUTO_INCREMENT,
  `dala_users_tracking_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_users_tracking_action` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'hành động',
  `dala_users_tracking_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'trạng thái',
  `dala_users_tracking_user_id` int NOT NULL,
  `dala_users_tracking_info` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_users_tracking_ID`),
  KEY `users_tracking_user_id` (`dala_users_tracking_user_id`),
  CONSTRAINT `users_tracking_user_id` FOREIGN KEY (`dala_users_tracking_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_users_tracking`
--

LOCK TABLES `dala_users_tracking` WRITE;
/*!40000 ALTER TABLE `dala_users_tracking` DISABLE KEYS */;
INSERT INTO `dala_users_tracking` VALUES (1,'2021-10-03 13:01:03',0,1,50,'NULL'),(2,'2021-10-03 22:02:33',0,1,50,'NULL'),(3,'2021-10-04 11:51:55',3,1,57,'NULL'),(4,'2021-10-04 11:53:21',3,1,57,'NULL'),(5,'2021-10-04 14:12:46',0,1,50,'NULL'),(8,'2021-10-04 14:43:54',3,1,100,'NULL'),(9,'2021-10-04 14:52:19',3,1,100,'NULL');
/*!40000 ALTER TABLE `dala_users_tracking` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_users_tracking_insert` BEFORE INSERT ON `dala_users_tracking` FOR EACH ROW BEGIN  







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







END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dala_users_type`
--

DROP TABLE IF EXISTS `dala_users_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_users_type` (
  `dala_users_type_ID` int NOT NULL AUTO_INCREMENT,
  `dala_users_type_name` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_type_infomation` varchar(4000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_users_type_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_users_type`
--

LOCK TABLES `dala_users_type` WRITE;
/*!40000 ALTER TABLE `dala_users_type` DISABLE KEYS */;
INSERT INTO `dala_users_type` VALUES (13,'admin','354aae4c3655725e157156614010b592'),(14,'bussiness','950a14f62033feb91295dcb123d88e06'),(15,'customer','c20284d123204abaf547da15957b17f8'),(16,'default','319b17162d07a5697a5b2175279a54b0'),(17,'supper-job','22e9dfe5055e7e35bd4f754a01c365f7'),(18,'shipping','c18907b28bc58bce8aa0776e8cf0fae9');
/*!40000 ALTER TABLE `dala_users_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_users_type_name_insert` BEFORE INSERT ON `dala_users_type` FOR EACH ROW BEGIN  


IF(NEW.dala_users_type_name is null or NEW.dala_users_type_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_users_type_name_empty';   
END IF;



END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_users_type_infomation_insert` BEFORE INSERT ON `dala_users_type` FOR EACH ROW BEGIN  
	IF(NEW.dala_users_type_infomation is null or NEW.dala_users_type_infomation = '') THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_users_type_infomation_empty';   
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_users_type_name_update` BEFORE UPDATE ON `dala_users_type` FOR EACH ROW BEGIN  


IF(NEW.dala_users_type_name is null or NEW.dala_users_type_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_users_type_name_empty';   
END IF;



END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_users_type_infomation_update` BEFORE UPDATE ON `dala_users_type` FOR EACH ROW BEGIN  
	IF(NEW.dala_users_type_infomation is null or NEW.dala_users_type_infomation = '') THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_users_type_infomation_empty';   
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `dala_view_count_order_by_user`
--

DROP TABLE IF EXISTS `dala_view_count_order_by_user`;
/*!50001 DROP VIEW IF EXISTS `dala_view_count_order_by_user`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dala_view_count_order_by_user` AS SELECT 
 1 AS `dala_orders_speciality_ID`,
 1 AS `dala_orders_speciality_date_orders`,
 1 AS `dala_orders_speciality_status_orders`,
 1 AS `dala_users_ID`,
 1 AS `dala_users_full_name`,
 1 AS `dala_stores_ID`,
 1 AS `dala_stores_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `dala_view_coupon`
--

DROP TABLE IF EXISTS `dala_view_coupon`;
/*!50001 DROP VIEW IF EXISTS `dala_view_coupon`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dala_view_coupon` AS SELECT 
 1 AS `dala_coupon_speciality_ID`,
 1 AS `dala_coupon_speciality_date_created`,
 1 AS `dala_coupon_speciality_code`,
 1 AS `dala_coupon_speciality_stores_id_created`,
 1 AS `dala_coupon_speciality_info`,
 1 AS `dala_coupon_speciality_type`,
 1 AS `dala_coupon_speciality_formula_price`,
 1 AS `dala_coupon_speciality_formula_price_value`,
 1 AS `dala_coupon_speciality_condition`,
 1 AS `dala_coupon_speciality_condition_value`,
 1 AS `dala_coupon_speciality_price_max`,
 1 AS `dala_coupon_speciality_date_star`,
 1 AS `dala_coupon_speciality_date_end`,
 1 AS `dala_coupon_speciality_multiple`,
 1 AS `dala_coupon_speciality_status_admin`,
 1 AS `dala_coupon_speciality_status_update`,
 1 AS `dala_coupon_speciality_limit_user`,
 1 AS `dala_coupon_speciality_limit_number`,
 1 AS `dala_coupon_speciality_qoute`,
 1 AS `dala_stores_ID`,
 1 AS `dala_stores_name`,
 1 AS `dala_check_expired`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `dala_view_discount_program`
--

DROP TABLE IF EXISTS `dala_view_discount_program`;
/*!50001 DROP VIEW IF EXISTS `dala_view_discount_program`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dala_view_discount_program` AS SELECT 
 1 AS `dala_discount_program_ID`,
 1 AS `dala_discount_program_date_created`,
 1 AS `dala_discount_program_name`,
 1 AS `dala_discount_program_store_id_created`,
 1 AS `dala_discount_program_featured_image`,
 1 AS `dala_discount_program_price_created`,
 1 AS `dala_discount_program_price_sale`,
 1 AS `dala_discount_program_position`,
 1 AS `dala_discount_program_type`,
 1 AS `dala_discount_program_time_type`,
 1 AS `dala_discount_program_status_admin`,
 1 AS `dala_discount_program_status_update`,
 1 AS `dala_discount_program_price_one_day`,
 1 AS `dala_discount_program_price_one_product`,
 1 AS `dala_discount_program_limit_product`,
 1 AS `dala_discount_program_limit_day`,
 1 AS `dala_discount_program_date_star`,
 1 AS `dala_discount_program_date_end`,
 1 AS `dala_discount_program_information`,
 1 AS `dala_discount_program_qoute`,
 1 AS `dala_discount_program_check_expired`,
 1 AS `dala_users_ID`,
 1 AS `dala_users_full_name`,
 1 AS `dala_stores_ID`,
 1 AS `dala_stores_name`,
 1 AS `dala_stores_status_admin`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `dala_view_discount_program_product`
--

DROP TABLE IF EXISTS `dala_view_discount_program_product`;
/*!50001 DROP VIEW IF EXISTS `dala_view_discount_program_product`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dala_view_discount_program_product` AS SELECT 
 1 AS `dala_discount_program_product_link_ID`,
 1 AS `dala_discount_program_product_link_date_created`,
 1 AS `dala_discount_program_product_link_discount_program_details_id`,
 1 AS `dala_discount_program_product_link_product_speciality_id`,
 1 AS `dala_discount_program_product_link_status`,
 1 AS `dala_discount_program_product_link_qoute`,
 1 AS `dala_products_speciality_ID`,
 1 AS `dala_products_speciality_name`,
 1 AS `dala_products_speciality_type`,
 1 AS `dala_products_speciality_date_created`,
 1 AS `dala_products_speciality_sku`,
 1 AS `dala_products_speciality_store_id`,
 1 AS `dala_products_speciality_parent_id`,
 1 AS `dala_products_speciality_featured_image`,
 1 AS `dala_products_speciality_image_slider`,
 1 AS `dala_products_speciality_origin`,
 1 AS `dala_products_speciality_contents`,
 1 AS `dala_products_speciality_price`,
 1 AS `dala_products_speciality_sale_of_price`,
 1 AS `dala_products_speciality_date_start`,
 1 AS `dala_products_speciality_date_end`,
 1 AS `dala_products_speciality_stock`,
 1 AS `dala_products_speciality_brand`,
 1 AS `dala_products_speciality_status_admin`,
 1 AS `dala_products_speciality_status_store`,
 1 AS `dala_products_speciality_status_update`,
 1 AS `dala_products_speciality_variation_option`,
 1 AS `dala_products_speciality_excerpt`,
 1 AS `dala_products_speciality_qoute`,
 1 AS `dala_products_speciality_height`,
 1 AS `dala_products_speciality_width`,
 1 AS `dala_products_speciality_length`,
 1 AS `dala_products_speciality_weight`,
 1 AS `dala_discount_program_details_ID`,
 1 AS `dala_discount_program_details_date_created`,
 1 AS `dala_discount_program_details_discount_program_id`,
 1 AS `dala_discount_program_details_store_id`,
 1 AS `dala_discount_program_details_status_admin`,
 1 AS `dala_discount_program_details_status_update`,
 1 AS `dala_discount_program_details_price`,
 1 AS `dala_discount_program_details_limit_day`,
 1 AS `dala_discount_program_details_limit_product`,
 1 AS `dala_discount_program_details_qoute`,
 1 AS `dala_discount_program_ID`,
 1 AS `dala_discount_program_date_created`,
 1 AS `dala_discount_program_name`,
 1 AS `dala_discount_program_store_id_created`,
 1 AS `dala_discount_program_featured_image`,
 1 AS `dala_discount_program_price_created`,
 1 AS `dala_discount_program_price_sale`,
 1 AS `dala_discount_program_position`,
 1 AS `dala_discount_program_type`,
 1 AS `dala_discount_program_time_type`,
 1 AS `dala_discount_program_status_admin`,
 1 AS `dala_discount_program_status_update`,
 1 AS `dala_discount_program_price_one_day`,
 1 AS `dala_discount_program_price_one_product`,
 1 AS `dala_discount_program_limit_product`,
 1 AS `dala_discount_program_limit_day`,
 1 AS `dala_discount_program_date_star`,
 1 AS `dala_discount_program_date_end`,
 1 AS `dala_discount_program_information`,
 1 AS `dala_discount_program_qoute`,
 1 AS `dala_check_date`,
 1 AS `dala_check_expired`,
 1 AS `dala_users_ID`,
 1 AS `dala_users_full_name`,
 1 AS `dala_stores_ID`,
 1 AS `dala_stores_name`,
 1 AS `dala_stores_status_admin`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `dala_view_order_report`
--

DROP TABLE IF EXISTS `dala_view_order_report`;
/*!50001 DROP VIEW IF EXISTS `dala_view_order_report`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dala_view_order_report` AS SELECT 
 1 AS `dala_orders_speciality_date_orders`,
 1 AS `dala_orders_speciality_ID`,
 1 AS `dala_stores_name`,
 1 AS `dala_orders_details_speciality_line_order`,
 1 AS `dala_orders_details_speciality_qty`,
 1 AS `dala_orders_details_speciality_price`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `dala_view_orders_customer`
--

DROP TABLE IF EXISTS `dala_view_orders_customer`;
/*!50001 DROP VIEW IF EXISTS `dala_view_orders_customer`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dala_view_orders_customer` AS SELECT 
 1 AS `dala_orders_speciality_ID`,
 1 AS `dala_orders_speciality_user_id`,
 1 AS `dala_orders_speciality_shipper_id`,
 1 AS `dala_orders_speciality_date_orders`,
 1 AS `dala_orders_speciality_status_orders`,
 1 AS `dala_orders_speciality_status_payment`,
 1 AS `dala_orders_speciality_province`,
 1 AS `dala_orders_speciality_district`,
 1 AS `dala_orders_speciality_wards`,
 1 AS `dala_orders_speciality_adress`,
 1 AS `dala_orders_speciality_notes`,
 1 AS `dala_orders_speciality_phone`,
 1 AS `dala_orders_speciality_name`,
 1 AS `dala_orders_speciality_email`,
 1 AS `dala_orders_speciality_shipping_code`,
 1 AS `dala_orders_details_speciality_ID`,
 1 AS `dala_orders_details_speciality_order_id`,
 1 AS `dala_orders_details_speciality_line_order`,
 1 AS `dala_orders_details_speciality_product_id`,
 1 AS `dala_orders_details_speciality_qty`,
 1 AS `dala_orders_details_speciality_price`,
 1 AS `dala_orders_details_medium_text`,
 1 AS `dala_price_caution`,
 1 AS `dala_products_speciality_ID`,
 1 AS `dala_products_speciality_name`,
 1 AS `dala_products_speciality_featured_image`,
 1 AS `dala_products_speciality_weight`,
 1 AS `dala_users_ID`,
 1 AS `dala_users_full_name`,
 1 AS `dala_stores_ID`,
 1 AS `dala_stores_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `dala_view_orders_users`
--

DROP TABLE IF EXISTS `dala_view_orders_users`;
/*!50001 DROP VIEW IF EXISTS `dala_view_orders_users`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dala_view_orders_users` AS SELECT 
 1 AS `dala_orders_speciality_ID`,
 1 AS `dala_orders_speciality_user_id`,
 1 AS `dala_orders_speciality_shipper_id`,
 1 AS `dala_orders_speciality_date_orders`,
 1 AS `dala_orders_speciality_status_orders`,
 1 AS `dala_orders_speciality_status_payment`,
 1 AS `dala_orders_speciality_province`,
 1 AS `dala_orders_speciality_district`,
 1 AS `dala_orders_speciality_wards`,
 1 AS `dala_orders_speciality_adress`,
 1 AS `dala_orders_speciality_notes`,
 1 AS `dala_orders_speciality_phone`,
 1 AS `dala_orders_speciality_name`,
 1 AS `dala_orders_speciality_email`,
 1 AS `dala_orders_speciality_shipping_code`,
 1 AS `dala_orders_details_speciality_ID`,
 1 AS `dala_orders_details_speciality_order_id`,
 1 AS `dala_orders_details_speciality_line_order`,
 1 AS `dala_orders_details_speciality_product_id`,
 1 AS `dala_orders_details_speciality_qty`,
 1 AS `dala_orders_details_speciality_price`,
 1 AS `dala_orders_details_medium_text`,
 1 AS `dala_price_caution`,
 1 AS `dala_products_speciality_ID`,
 1 AS `dala_products_speciality_name`,
 1 AS `dala_users_ID`,
 1 AS `dala_users_full_name`,
 1 AS `dala_stores_ID`,
 1 AS `dala_stores_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `dala_view_product`
--

DROP TABLE IF EXISTS `dala_view_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dala_view_product` (
  `dala_view_product_ID` int NOT NULL AUTO_INCREMENT,
  `dala_view_product_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_view_product_user_id` int NOT NULL,
  `dala_view_product_product_id` int NOT NULL,
  PRIMARY KEY (`dala_view_product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_view_product`
--

LOCK TABLES `dala_view_product` WRITE;
/*!40000 ALTER TABLE `dala_view_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `dala_view_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `dala_views_products`
--

DROP TABLE IF EXISTS `dala_views_products`;
/*!50001 DROP VIEW IF EXISTS `dala_views_products`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dala_views_products` AS SELECT 
 1 AS `dala_products_speciality_ID`,
 1 AS `dala_products_speciality_name`,
 1 AS `dala_products_speciality_type`,
 1 AS `dala_products_speciality_date_created`,
 1 AS `dala_products_speciality_sku`,
 1 AS `dala_products_speciality_store_id`,
 1 AS `dala_products_speciality_parent_id`,
 1 AS `dala_products_speciality_featured_image`,
 1 AS `dala_products_speciality_image_slider`,
 1 AS `dala_products_speciality_origin`,
 1 AS `dala_products_speciality_contents`,
 1 AS `dala_products_speciality_price`,
 1 AS `dala_products_speciality_sale_of_price`,
 1 AS `dala_products_speciality_date_start`,
 1 AS `dala_products_speciality_date_end`,
 1 AS `dala_products_speciality_stock`,
 1 AS `dala_products_speciality_brand`,
 1 AS `dala_products_speciality_status_admin`,
 1 AS `dala_products_speciality_status_store`,
 1 AS `dala_products_speciality_status_update`,
 1 AS `dala_products_speciality_variation_option`,
 1 AS `dala_products_speciality_excerpt`,
 1 AS `dala_products_speciality_qoute`,
 1 AS `dala_products_speciality_height`,
 1 AS `dala_products_speciality_width`,
 1 AS `dala_products_speciality_length`,
 1 AS `dala_products_speciality_weight`,
 1 AS `dala_products_speciality_price_caution`,
 1 AS `dala_products_speciality_sale_of_price_time_check`,
 1 AS `dala_users_ID`,
 1 AS `dala_users_full_name`,
 1 AS `dala_stores_ID`,
 1 AS `dala_stores_name`,
 1 AS `dala_stores_status_admin`,
 1 AS `dala_brands_ID`,
 1 AS `dala_brands_name`,
 1 AS `dala_brands_featured_image`,
 1 AS `dala_category_general_speciality_ID`,
 1 AS `dala_category_general_speciality_name`,
 1 AS `dala_options_product_speciality_ID`,
 1 AS `dala_options_product_speciality_name`,
 1 AS `dala_service_type_ID`,
 1 AS `dala_service_type_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `dala_view_count_order_by_user`
--

/*!50001 DROP VIEW IF EXISTS `dala_view_count_order_by_user`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dala_view_count_order_by_user` AS select distinct `dala_orders_speciality`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_orders_speciality`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_orders` AS `dala_orders_speciality_status_orders`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name` from ((((`dala_orders_details_speciality` left join `dala_orders_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` = `dala_orders_speciality`.`dala_orders_speciality_ID`))) left join `dala_products_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_products_speciality`.`dala_products_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `dala_view_coupon`
--

/*!50001 DROP VIEW IF EXISTS `dala_view_coupon`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dala_view_coupon` AS select `dala_coupon_speciality`.`dala_coupon_speciality_ID` AS `dala_coupon_speciality_ID`,`dala_coupon_speciality`.`dala_coupon_speciality_date_created` AS `dala_coupon_speciality_date_created`,`dala_coupon_speciality`.`dala_coupon_speciality_code` AS `dala_coupon_speciality_code`,`dala_coupon_speciality`.`dala_coupon_speciality_stores_id_created` AS `dala_coupon_speciality_stores_id_created`,`dala_coupon_speciality`.`dala_coupon_speciality_info` AS `dala_coupon_speciality_info`,`dala_coupon_speciality`.`dala_coupon_speciality_type` AS `dala_coupon_speciality_type`,`dala_coupon_speciality`.`dala_coupon_speciality_formula_price` AS `dala_coupon_speciality_formula_price`,`dala_coupon_speciality`.`dala_coupon_speciality_formula_price_value` AS `dala_coupon_speciality_formula_price_value`,`dala_coupon_speciality`.`dala_coupon_speciality_condition` AS `dala_coupon_speciality_condition`,`dala_coupon_speciality`.`dala_coupon_speciality_condition_value` AS `dala_coupon_speciality_condition_value`,`dala_coupon_speciality`.`dala_coupon_speciality_price_max` AS `dala_coupon_speciality_price_max`,`dala_coupon_speciality`.`dala_coupon_speciality_date_star` AS `dala_coupon_speciality_date_star`,`dala_coupon_speciality`.`dala_coupon_speciality_date_end` AS `dala_coupon_speciality_date_end`,`dala_coupon_speciality`.`dala_coupon_speciality_multiple` AS `dala_coupon_speciality_multiple`,`dala_coupon_speciality`.`dala_coupon_speciality_status_admin` AS `dala_coupon_speciality_status_admin`,`dala_coupon_speciality`.`dala_coupon_speciality_status_update` AS `dala_coupon_speciality_status_update`,`dala_coupon_speciality`.`dala_coupon_speciality_limit_user` AS `dala_coupon_speciality_limit_user`,`dala_coupon_speciality`.`dala_coupon_speciality_limit_number` AS `dala_coupon_speciality_limit_number`,`dala_coupon_speciality`.`dala_coupon_speciality_qoute` AS `dala_coupon_speciality_qoute`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,(case when ((`dala_coupon_speciality`.`dala_coupon_speciality_date_star` is null) and (`dala_coupon_speciality`.`dala_coupon_speciality_date_end` is null)) then 1 when ((`dala_coupon_speciality`.`dala_coupon_speciality_date_star` is null) and (`dala_coupon_speciality`.`dala_coupon_speciality_date_end` is not null)) then if(((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_end`)) < 0),1,0) when ((`dala_coupon_speciality`.`dala_coupon_speciality_date_star` is not null) and (`dala_coupon_speciality`.`dala_coupon_speciality_date_end` is null)) then if(((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_star`)) < 0),0,1) when ((`dala_coupon_speciality`.`dala_coupon_speciality_date_star` is not null) and (`dala_coupon_speciality`.`dala_coupon_speciality_date_end` is not null)) then (case when ((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_star`)) < 0) then 0 when ((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_star`)) > 0) then if(((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_end`)) < 0),1,0) end) else 100 end) AS `dala_check_expired` from ((`dala_coupon_speciality` left join `dala_stores` on((`dala_coupon_speciality`.`dala_coupon_speciality_stores_id_created` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `dala_view_discount_program`
--

/*!50001 DROP VIEW IF EXISTS `dala_view_discount_program`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dala_view_discount_program` AS select `dala_discount_program`.`dala_discount_program_ID` AS `dala_discount_program_ID`,`dala_discount_program`.`dala_discount_program_date_created` AS `dala_discount_program_date_created`,`dala_discount_program`.`dala_discount_program_name` AS `dala_discount_program_name`,`dala_discount_program`.`dala_discount_program_store_id_created` AS `dala_discount_program_store_id_created`,`dala_discount_program`.`dala_discount_program_featured_image` AS `dala_discount_program_featured_image`,`dala_discount_program`.`dala_discount_program_price_created` AS `dala_discount_program_price_created`,`dala_discount_program`.`dala_discount_program_price_sale` AS `dala_discount_program_price_sale`,`dala_discount_program`.`dala_discount_program_position` AS `dala_discount_program_position`,`dala_discount_program`.`dala_discount_program_type` AS `dala_discount_program_type`,`dala_discount_program`.`dala_discount_program_time_type` AS `dala_discount_program_time_type`,`dala_discount_program`.`dala_discount_program_status_admin` AS `dala_discount_program_status_admin`,`dala_discount_program`.`dala_discount_program_status_update` AS `dala_discount_program_status_update`,`dala_discount_program`.`dala_discount_program_price_one_day` AS `dala_discount_program_price_one_day`,`dala_discount_program`.`dala_discount_program_price_one_product` AS `dala_discount_program_price_one_product`,`dala_discount_program`.`dala_discount_program_limit_product` AS `dala_discount_program_limit_product`,`dala_discount_program`.`dala_discount_program_limit_day` AS `dala_discount_program_limit_day`,`dala_discount_program`.`dala_discount_program_date_star` AS `dala_discount_program_date_star`,`dala_discount_program`.`dala_discount_program_date_end` AS `dala_discount_program_date_end`,`dala_discount_program`.`dala_discount_program_information` AS `dala_discount_program_information`,`dala_discount_program`.`dala_discount_program_qoute` AS `dala_discount_program_qoute`,(case when (`dala_discount_program`.`dala_discount_program_time_type` = 0) then 1 when (unix_timestamp(`dala_discount_program`.`dala_discount_program_date_end`) < unix_timestamp()) then 1 else 0 end) AS `dala_discount_program_check_expired`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_stores`.`dala_stores_status_admin` AS `dala_stores_status_admin` from ((`dala_discount_program` left join `dala_stores` on((`dala_discount_program`.`dala_discount_program_store_id_created` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `dala_view_discount_program_product`
--

/*!50001 DROP VIEW IF EXISTS `dala_view_discount_program_product`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dala_view_discount_program_product` AS select `dala_discount_program_product_link`.`dala_discount_program_product_link_ID` AS `dala_discount_program_product_link_ID`,`dala_discount_program_product_link`.`dala_discount_program_product_link_date_created` AS `dala_discount_program_product_link_date_created`,`dala_discount_program_product_link`.`dala_discount_program_product_link_discount_program_details_id` AS `dala_discount_program_product_link_discount_program_details_id`,`dala_discount_program_product_link`.`dala_discount_program_product_link_product_speciality_id` AS `dala_discount_program_product_link_product_speciality_id`,`dala_discount_program_product_link`.`dala_discount_program_product_link_status` AS `dala_discount_program_product_link_status`,`dala_discount_program_product_link`.`dala_discount_program_product_link_qoute` AS `dala_discount_program_product_link_qoute`,`dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_products_speciality`.`dala_products_speciality_type` AS `dala_products_speciality_type`,`dala_products_speciality`.`dala_products_speciality_date_created` AS `dala_products_speciality_date_created`,`dala_products_speciality`.`dala_products_speciality_sku` AS `dala_products_speciality_sku`,`dala_products_speciality`.`dala_products_speciality_store_id` AS `dala_products_speciality_store_id`,`dala_products_speciality`.`dala_products_speciality_parent_id` AS `dala_products_speciality_parent_id`,`dala_products_speciality`.`dala_products_speciality_featured_image` AS `dala_products_speciality_featured_image`,`dala_products_speciality`.`dala_products_speciality_image_slider` AS `dala_products_speciality_image_slider`,`dala_products_speciality`.`dala_products_speciality_origin` AS `dala_products_speciality_origin`,`dala_products_speciality`.`dala_products_speciality_contents` AS `dala_products_speciality_contents`,`dala_products_speciality`.`dala_products_speciality_price` AS `dala_products_speciality_price`,`dala_products_speciality`.`dala_products_speciality_sale_of_price` AS `dala_products_speciality_sale_of_price`,`dala_products_speciality`.`dala_products_speciality_date_start` AS `dala_products_speciality_date_start`,`dala_products_speciality`.`dala_products_speciality_date_end` AS `dala_products_speciality_date_end`,`dala_products_speciality`.`dala_products_speciality_stock` AS `dala_products_speciality_stock`,`dala_products_speciality`.`dala_products_speciality_brand` AS `dala_products_speciality_brand`,`dala_products_speciality`.`dala_products_speciality_status_admin` AS `dala_products_speciality_status_admin`,`dala_products_speciality`.`dala_products_speciality_status_store` AS `dala_products_speciality_status_store`,`dala_products_speciality`.`dala_products_speciality_status_update` AS `dala_products_speciality_status_update`,`dala_products_speciality`.`dala_products_speciality_variation_option` AS `dala_products_speciality_variation_option`,`dala_products_speciality`.`dala_products_speciality_excerpt` AS `dala_products_speciality_excerpt`,`dala_products_speciality`.`dala_products_speciality_qoute` AS `dala_products_speciality_qoute`,`dala_products_speciality`.`dala_products_speciality_height` AS `dala_products_speciality_height`,`dala_products_speciality`.`dala_products_speciality_width` AS `dala_products_speciality_width`,`dala_products_speciality`.`dala_products_speciality_length` AS `dala_products_speciality_length`,`dala_products_speciality`.`dala_products_speciality_weight` AS `dala_products_speciality_weight`,`dala_discount_program_details`.`dala_discount_program_details_ID` AS `dala_discount_program_details_ID`,`dala_discount_program_details`.`dala_discount_program_details_date_created` AS `dala_discount_program_details_date_created`,`dala_discount_program_details`.`dala_discount_program_details_discount_program_id` AS `dala_discount_program_details_discount_program_id`,`dala_discount_program_details`.`dala_discount_program_details_store_id` AS `dala_discount_program_details_store_id`,`dala_discount_program_details`.`dala_discount_program_details_status_admin` AS `dala_discount_program_details_status_admin`,`dala_discount_program_details`.`dala_discount_program_details_status_update` AS `dala_discount_program_details_status_update`,`dala_discount_program_details`.`dala_discount_program_details_price` AS `dala_discount_program_details_price`,`dala_discount_program_details`.`dala_discount_program_details_limit_day` AS `dala_discount_program_details_limit_day`,`dala_discount_program_details`.`dala_discount_program_details_limit_product` AS `dala_discount_program_details_limit_product`,`dala_discount_program_details`.`dala_discount_program_details_qoute` AS `dala_discount_program_details_qoute`,`dala_discount_program`.`dala_discount_program_ID` AS `dala_discount_program_ID`,`dala_discount_program`.`dala_discount_program_date_created` AS `dala_discount_program_date_created`,`dala_discount_program`.`dala_discount_program_name` AS `dala_discount_program_name`,`dala_discount_program`.`dala_discount_program_store_id_created` AS `dala_discount_program_store_id_created`,`dala_discount_program`.`dala_discount_program_featured_image` AS `dala_discount_program_featured_image`,`dala_discount_program`.`dala_discount_program_price_created` AS `dala_discount_program_price_created`,`dala_discount_program`.`dala_discount_program_price_sale` AS `dala_discount_program_price_sale`,`dala_discount_program`.`dala_discount_program_position` AS `dala_discount_program_position`,`dala_discount_program`.`dala_discount_program_type` AS `dala_discount_program_type`,`dala_discount_program`.`dala_discount_program_time_type` AS `dala_discount_program_time_type`,`dala_discount_program`.`dala_discount_program_status_admin` AS `dala_discount_program_status_admin`,`dala_discount_program`.`dala_discount_program_status_update` AS `dala_discount_program_status_update`,`dala_discount_program`.`dala_discount_program_price_one_day` AS `dala_discount_program_price_one_day`,`dala_discount_program`.`dala_discount_program_price_one_product` AS `dala_discount_program_price_one_product`,`dala_discount_program`.`dala_discount_program_limit_product` AS `dala_discount_program_limit_product`,`dala_discount_program`.`dala_discount_program_limit_day` AS `dala_discount_program_limit_day`,`dala_discount_program`.`dala_discount_program_date_star` AS `dala_discount_program_date_star`,`dala_discount_program`.`dala_discount_program_date_end` AS `dala_discount_program_date_end`,`dala_discount_program`.`dala_discount_program_information` AS `dala_discount_program_information`,`dala_discount_program`.`dala_discount_program_qoute` AS `dala_discount_program_qoute`,if((`dala_discount_program_details`.`dala_discount_program_details_limit_day` = 0),-(1),(unix_timestamp() - (unix_timestamp(`dala_discount_program_details`.`dala_discount_program_details_date_created`) + (((`dala_discount_program_details`.`dala_discount_program_details_limit_day` * 24) * 60) * 60)))) AS `dala_check_date`,(case when ((`dala_discount_program`.`dala_discount_program_date_star` is null) and (`dala_discount_program`.`dala_discount_program_date_end` is null)) then 1 when ((`dala_discount_program`.`dala_discount_program_date_star` is null) and (`dala_discount_program`.`dala_discount_program_date_end` is not null)) then if(((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_end`)) < 0),1,0) when ((`dala_discount_program`.`dala_discount_program_date_star` is not null) and (`dala_discount_program`.`dala_discount_program_date_end` is null)) then if(((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_star`)) < 0),0,1) when ((`dala_discount_program`.`dala_discount_program_date_star` is not null) and (`dala_discount_program`.`dala_discount_program_date_end` is not null)) then (case when ((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_star`)) < 0) then 0 when ((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_star`)) > 0) then if(((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_end`)) < 0),1,0) end) else 100 end) AS `dala_check_expired`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_stores`.`dala_stores_status_admin` AS `dala_stores_status_admin` from (((((`dala_discount_program_product_link` left join `dala_discount_program_details` on((`dala_discount_program_product_link`.`dala_discount_program_product_link_discount_program_details_id` = `dala_discount_program_details`.`dala_discount_program_details_ID`))) left join `dala_discount_program` on((`dala_discount_program_details`.`dala_discount_program_details_discount_program_id` = `dala_discount_program`.`dala_discount_program_ID`))) left join `dala_products_speciality` on((`dala_discount_program_product_link`.`dala_discount_program_product_link_product_speciality_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_discount_program_details`.`dala_discount_program_details_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) having (`dala_check_date` < 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `dala_view_order_report`
--

/*!50001 DROP VIEW IF EXISTS `dala_view_order_report`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dala_view_order_report` AS select `dala_orders_speciality`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_orders_speciality`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_orders_details_speciality`.`dala_orders_details_speciality_line_order` AS `dala_orders_details_speciality_line_order`,`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` AS `dala_orders_details_speciality_qty`,`dala_orders_details_speciality`.`dala_orders_details_speciality_price` AS `dala_orders_details_speciality_price` from ((((`dala_orders_speciality` left join `dala_orders_details_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` = `dala_orders_speciality`.`dala_orders_speciality_ID`))) left join `dala_products_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_products_speciality`.`dala_products_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_orders_speciality`.`dala_orders_speciality_user_id` = `dala_users`.`dala_users_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `dala_view_orders_customer`
--

/*!50001 DROP VIEW IF EXISTS `dala_view_orders_customer`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dala_view_orders_customer` AS select `dala_orders_speciality`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_orders_speciality`.`dala_orders_speciality_user_id` AS `dala_orders_speciality_user_id`,`dala_orders_speciality`.`dala_orders_speciality_shipper_id` AS `dala_orders_speciality_shipper_id`,`dala_orders_speciality`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_orders` AS `dala_orders_speciality_status_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_payment` AS `dala_orders_speciality_status_payment`,`dala_orders_speciality`.`dala_orders_speciality_province` AS `dala_orders_speciality_province`,`dala_orders_speciality`.`dala_orders_speciality_district` AS `dala_orders_speciality_district`,`dala_orders_speciality`.`dala_orders_speciality_wards` AS `dala_orders_speciality_wards`,`dala_orders_speciality`.`dala_orders_speciality_adress` AS `dala_orders_speciality_adress`,`dala_orders_speciality`.`dala_orders_speciality_notes` AS `dala_orders_speciality_notes`,`dala_orders_speciality`.`dala_orders_speciality_phone` AS `dala_orders_speciality_phone`,`dala_orders_speciality`.`dala_orders_speciality_name` AS `dala_orders_speciality_name`,`dala_orders_speciality`.`dala_orders_speciality_email` AS `dala_orders_speciality_email`,`dala_orders_speciality`.`dala_orders_speciality_shipping_code` AS `dala_orders_speciality_shipping_code`,`dala_orders_details_speciality`.`dala_orders_details_speciality_ID` AS `dala_orders_details_speciality_ID`,`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` AS `dala_orders_details_speciality_order_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_line_order` AS `dala_orders_details_speciality_line_order`,`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` AS `dala_orders_details_speciality_product_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` AS `dala_orders_details_speciality_qty`,`dala_orders_details_speciality`.`dala_orders_details_speciality_price` AS `dala_orders_details_speciality_price`,`dala_orders_details_speciality`.`dala_orders_details_medium_text` AS `dala_orders_details_medium_text`,(`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` * `dala_orders_details_speciality`.`dala_orders_details_speciality_price`) AS `dala_price_caution`,`dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_products_speciality`.`dala_products_speciality_featured_image` AS `dala_products_speciality_featured_image`,`dala_products_speciality`.`dala_products_speciality_weight` AS `dala_products_speciality_weight`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name` from ((((`dala_orders_details_speciality` left join `dala_orders_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` = `dala_orders_speciality`.`dala_orders_speciality_ID`))) left join `dala_users` on((`dala_orders_speciality`.`dala_orders_speciality_user_id` = `dala_users`.`dala_users_ID`))) left join `dala_products_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_products_speciality`.`dala_products_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `dala_view_orders_users`
--

/*!50001 DROP VIEW IF EXISTS `dala_view_orders_users`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dala_view_orders_users` AS select `dala_orders_speciality`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_orders_speciality`.`dala_orders_speciality_user_id` AS `dala_orders_speciality_user_id`,`dala_orders_speciality`.`dala_orders_speciality_shipper_id` AS `dala_orders_speciality_shipper_id`,`dala_orders_speciality`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_orders` AS `dala_orders_speciality_status_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_payment` AS `dala_orders_speciality_status_payment`,`dala_orders_speciality`.`dala_orders_speciality_province` AS `dala_orders_speciality_province`,`dala_orders_speciality`.`dala_orders_speciality_district` AS `dala_orders_speciality_district`,`dala_orders_speciality`.`dala_orders_speciality_wards` AS `dala_orders_speciality_wards`,`dala_orders_speciality`.`dala_orders_speciality_adress` AS `dala_orders_speciality_adress`,`dala_orders_speciality`.`dala_orders_speciality_notes` AS `dala_orders_speciality_notes`,`dala_orders_speciality`.`dala_orders_speciality_phone` AS `dala_orders_speciality_phone`,`dala_orders_speciality`.`dala_orders_speciality_name` AS `dala_orders_speciality_name`,`dala_orders_speciality`.`dala_orders_speciality_email` AS `dala_orders_speciality_email`,`dala_orders_speciality`.`dala_orders_speciality_shipping_code` AS `dala_orders_speciality_shipping_code`,`dala_orders_details_speciality`.`dala_orders_details_speciality_ID` AS `dala_orders_details_speciality_ID`,`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` AS `dala_orders_details_speciality_order_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_line_order` AS `dala_orders_details_speciality_line_order`,`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` AS `dala_orders_details_speciality_product_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` AS `dala_orders_details_speciality_qty`,`dala_orders_details_speciality`.`dala_orders_details_speciality_price` AS `dala_orders_details_speciality_price`,`dala_orders_details_speciality`.`dala_orders_details_medium_text` AS `dala_orders_details_medium_text`,(`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` * `dala_orders_details_speciality`.`dala_orders_details_speciality_price`) AS `dala_price_caution`,`dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name` from ((((`dala_orders_details_speciality` left join `dala_orders_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` = `dala_orders_speciality`.`dala_orders_speciality_ID`))) left join `dala_products_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_products_speciality`.`dala_products_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `dala_views_products`
--

/*!50001 DROP VIEW IF EXISTS `dala_views_products`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dala_views_products` AS select `dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_products_speciality`.`dala_products_speciality_type` AS `dala_products_speciality_type`,`dala_products_speciality`.`dala_products_speciality_date_created` AS `dala_products_speciality_date_created`,`dala_products_speciality`.`dala_products_speciality_sku` AS `dala_products_speciality_sku`,`dala_products_speciality`.`dala_products_speciality_store_id` AS `dala_products_speciality_store_id`,`dala_products_speciality`.`dala_products_speciality_parent_id` AS `dala_products_speciality_parent_id`,`dala_products_speciality`.`dala_products_speciality_featured_image` AS `dala_products_speciality_featured_image`,`dala_products_speciality`.`dala_products_speciality_image_slider` AS `dala_products_speciality_image_slider`,`dala_products_speciality`.`dala_products_speciality_origin` AS `dala_products_speciality_origin`,`dala_products_speciality`.`dala_products_speciality_contents` AS `dala_products_speciality_contents`,`dala_products_speciality`.`dala_products_speciality_price` AS `dala_products_speciality_price`,`dala_products_speciality`.`dala_products_speciality_sale_of_price` AS `dala_products_speciality_sale_of_price`,`dala_products_speciality`.`dala_products_speciality_date_start` AS `dala_products_speciality_date_start`,`dala_products_speciality`.`dala_products_speciality_date_end` AS `dala_products_speciality_date_end`,`dala_products_speciality`.`dala_products_speciality_stock` AS `dala_products_speciality_stock`,`dala_products_speciality`.`dala_products_speciality_brand` AS `dala_products_speciality_brand`,`dala_products_speciality`.`dala_products_speciality_status_admin` AS `dala_products_speciality_status_admin`,`dala_products_speciality`.`dala_products_speciality_status_store` AS `dala_products_speciality_status_store`,`dala_products_speciality`.`dala_products_speciality_status_update` AS `dala_products_speciality_status_update`,`dala_products_speciality`.`dala_products_speciality_variation_option` AS `dala_products_speciality_variation_option`,`dala_products_speciality`.`dala_products_speciality_excerpt` AS `dala_products_speciality_excerpt`,`dala_products_speciality`.`dala_products_speciality_qoute` AS `dala_products_speciality_qoute`,`dala_products_speciality`.`dala_products_speciality_height` AS `dala_products_speciality_height`,`dala_products_speciality`.`dala_products_speciality_width` AS `dala_products_speciality_width`,`dala_products_speciality`.`dala_products_speciality_length` AS `dala_products_speciality_length`,`dala_products_speciality`.`dala_products_speciality_weight` AS `dala_products_speciality_weight`,(case when (`dala_products_speciality`.`dala_products_speciality_sale_of_price` is null) then `dala_products_speciality`.`dala_products_speciality_price` when ((`dala_products_speciality`.`dala_products_speciality_date_start` is null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is null)) then `dala_products_speciality`.`dala_products_speciality_sale_of_price` when ((`dala_products_speciality`.`dala_products_speciality_date_start` is not null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_start`)) > 0)) then `dala_products_speciality`.`dala_products_speciality_sale_of_price` when ((`dala_products_speciality`.`dala_products_speciality_date_start` is null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is not null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_end`)) < 0)) then `dala_products_speciality`.`dala_products_speciality_sale_of_price` when ((`dala_products_speciality`.`dala_products_speciality_date_start` is not null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is not null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_start`)) > 0) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_end`)) < 0)) then `dala_products_speciality`.`dala_products_speciality_sale_of_price` else `dala_products_speciality`.`dala_products_speciality_price` end) AS `dala_products_speciality_price_caution`,(case when (`dala_products_speciality`.`dala_products_speciality_sale_of_price` is null) then '0' when ((`dala_products_speciality`.`dala_products_speciality_date_start` is null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is null)) then '1' when ((`dala_products_speciality`.`dala_products_speciality_date_start` is not null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_start`)) > 0)) then '1' when ((`dala_products_speciality`.`dala_products_speciality_date_start` is not null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_start`)) < 0)) then '2' when ((`dala_products_speciality`.`dala_products_speciality_date_start` is null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is not null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_end`)) > 0)) then '3' when ((`dala_products_speciality`.`dala_products_speciality_date_start` is not null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is not null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_start`)) > 0) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_end`)) > 0)) then '3' when ((`dala_products_speciality`.`dala_products_speciality_date_start` is not null) and (`dala_products_speciality`.`dala_products_speciality_date_end` is not null) and ((unix_timestamp(now()) - unix_timestamp(`dala_products_speciality`.`dala_products_speciality_date_start`)) < 0)) then '2' else '4' end) AS `dala_products_speciality_sale_of_price_time_check`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_stores`.`dala_stores_status_admin` AS `dala_stores_status_admin`,`dala_brands`.`dala_brands_ID` AS `dala_brands_ID`,`dala_brands`.`dala_brands_name` AS `dala_brands_name`,`dala_brands`.`dala_brands_featured_image` AS `dala_brands_featured_image`,`dala_category_general_speciality`.`dala_category_general_speciality_ID` AS `dala_category_general_speciality_ID`,`dala_category_general_speciality`.`dala_category_general_speciality_name` AS `dala_category_general_speciality_name`,`dala_options_product_speciality`.`dala_options_product_speciality_ID` AS `dala_options_product_speciality_ID`,`dala_options_product_speciality`.`dala_options_product_speciality_name` AS `dala_options_product_speciality_name`,`dala_service_type`.`dala_service_type_ID` AS `dala_service_type_ID`,`dala_service_type`.`dala_service_type_name` AS `dala_service_type_name` from ((((((((`dala_users` left join `dala_stores` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) left join `dala_service_type` on((`dala_stores`.`dala_stores_service_type_id` = `dala_service_type`.`dala_service_type_ID`))) left join `dala_products_speciality` on((`dala_products_speciality`.`dala_products_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_brands` on((`dala_products_speciality`.`dala_products_speciality_brand` = `dala_brands`.`dala_brands_ID`))) left join `dala_options_product_speciality_link` on((`dala_options_product_speciality_link`.`dala_options_product_speciality_link_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_options_product_speciality` on((`dala_options_product_speciality_link`.`dala_options_product_speciality_link_option_id` = `dala_options_product_speciality`.`dala_options_product_speciality_ID`))) left join `dala_category_general_speciality_link` on((`dala_category_general_speciality_link`.`dala_category_general_speciality_link_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_category_general_speciality` on((`dala_category_general_speciality_link`.`dala_category_general_speciality_link_category_general_id` = `dala_category_general_speciality`.`dala_category_general_speciality_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-04 19:55:21
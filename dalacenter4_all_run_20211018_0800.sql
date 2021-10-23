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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_adress_meta`
--

LOCK TABLES `dala_adress_meta` WRITE;
/*!40000 ALTER TABLE `dala_adress_meta` DISABLE KEYS */;
INSERT INTO `dala_adress_meta` VALUES (1,'2021-10-15 18:26:48',56,'Tỉnh Đồng Nai','Thành phố Biên Hòa','Phường Tân Phong','số 18, d0ặng dức thuật','NULL',1),(2,'2021-10-16 10:31:59',92,'Thành phố Hà Nội','Quận Ba Đình','Phường Phúc Xá','1','NULL',1),(3,'2021-10-16 10:33:46',92,'Tỉnh Hà Giang','Thành phố Hà Giang','Phường Quang Trung','1','NULL',0),(4,'2021-10-16 11:05:49',93,'Thành phố Hà Nội','Quận Hoàn Kiếm','Phường Phúc Tân','11','NULL',1),(5,'2021-10-16 18:03:55',56,'Tỉnh Đồng Nai','Thành phố Biên Hòa','Phường Tân Phong','số 18, đặng đức thuật','NULL',0),(6,'2021-10-18 13:39:54',92,'Thành phố Cần Thơ','Quận Ninh Kiều','Phường Tân An','5','NULL',0),(7,'2021-10-19 14:50:45',116,'Tỉnh Đồng Nai','Thành phố Biên Hòa','Phường Tam Hiệp','28/18','NULL',1),(8,'2021-10-21 13:09:46',115,'Tỉnh Lâm Đồng','Thành phố Đà Lạt','Xã Xuân Thọ','32','NULL',1);
/*!40000 ALTER TABLE `dala_adress_meta` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_adress_meta_insert` BEFORE INSERT ON `dala_adress_meta` FOR EACH ROW BEGIN  

IF(LENGTH(NEW.dala_adress_meta_user_id ) > 0 ) THEN 
	
	
	
	
	SET @check_user_id = (select dala_adress_meta_ID    
		from dala_adress_meta  
		where dala_adress_meta_user_id  = NEW.dala_adress_meta_user_id 
		limit 1
		);	

	
	
	
	
	SET @check_all = (select dala_adress_meta_ID    
		from dala_adress_meta  
		where dala_adress_meta_user_id  = NEW.dala_adress_meta_user_id  
		and dala_adress_meta_province  = NEW.dala_adress_meta_province   
		and dala_adress_meta_district  = NEW.dala_adress_meta_district   
		and dala_adress_meta_wards  = NEW.dala_adress_meta_wards    
		and dala_adress_meta_street  = NEW.dala_adress_meta_street  
		);
		
	IF ( @check_all > 0 ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_adress_meta_insert_douple'; 	
	ELSE 
		IF (@check_user_id is null or @check_user_id = "null" or @check_user_id = "NULL") THEN 
			SET NEW.dala_adress_meta_status = 1;
		ELSE 
			SET NEW.dala_adress_meta_status = 0 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_brands`
--

LOCK TABLES `dala_brands` WRITE;
/*!40000 ALTER TABLE `dala_brands` DISABLE KEYS */;
INSERT INTO `dala_brands` VALUES (1,'2021-07-22 16:32:02','Nông lâm food','','','',1,1,1,17,''),(2,'2021-07-22 16:32:16','BerryLand','','','',1,1,1,17,''),(3,'2021-07-22 16:32:41','Ladophar','','','',1,1,1,17,''),(4,'2021-07-22 16:32:56','Biofresh','','','',1,1,1,17,''),(5,'2021-07-22 16:33:12','Dalat Natural Food','','','',1,1,1,17,''),(6,'2021-07-22 16:33:36','Quốc Lộc Coffee','','','',1,1,1,17,''),(7,'2021-07-22 16:34:01','BaolocReal coffee','','','',1,1,1,17,''),(10,'2021-10-18 11:25:03','Langfam','https://appdala.net/wp-content/uploads/tai-xuong-1.png','','',1,1,1,31,'');
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_category_general_speciality`
--

LOCK TABLES `dala_category_general_speciality` WRITE;
/*!40000 ALTER TABLE `dala_category_general_speciality` DISABLE KEYS */;
INSERT INTO `dala_category_general_speciality` VALUES (1,'2021-07-22 16:42:57','Mứt Đà Lạt',0,'					\n					','https://appdala.net/wp-content/uploads/4401-01-1.png',1,0,1,17,1,1,0,''),(2,'2021-07-22 16:43:51','Trái cây sấy dẻo',0,'										\n					\n					','https://appdala.net/wp-content/uploads/S-01-2.png',2,0,1,17,1,1,0,''),(3,'2021-07-22 16:44:36','Trái cây sấy giòn',0,'										\n					\n					','https://appdala.net/wp-content/uploads/44012-01-1.png',3,0,1,17,1,1,0,''),(4,'2021-07-22 16:45:30','Trà Đà Lạt',0,'					\n					','https://appdala.net/wp-content/uploads/bbb414fce57effb6f515f645dba86d93.jpg',4,0,1,17,1,1,0,''),(5,'2021-07-22 16:47:02','Cà phê Đà Lạt',0,'					\n					','https://appdala.net/wp-content/uploads/34a9337cfaed3db1a2774372d437736e.jpg',5,0,1,17,1,1,0,''),(6,'2021-07-22 16:47:51','Thảo mộc các loại',0,'					\n					','https://appdala.net/wp-content/uploads/3cdda630132c82aaf892d1f884467b31.jpg_720x720q80.jpg_.webp',6,0,1,17,1,1,0,''),(7,'2021-07-22 16:48:51','Nước ép siro trái cây',0,'					\n					','https://appdala.net/wp-content/uploads/2ece254fbcda49414fdf897a175e75ae.png',7,0,1,17,1,1,0,''),(8,'2021-07-22 16:50:39','Nông sản sạch đà lạt',0,'										\n					\n					','https://appdala.net/wp-content/uploads/21881afa49d23f9683a73615771d0464.jpg',8,0,1,17,1,1,0,''),(9,'2021-07-22 16:53:44','Kẹo dẻo',1,'','https://appdala.net/wp-content/uploads/images-5.jpg',0,0,1,17,1,1,0,''),(10,'2021-07-22 16:55:04','Mứt Atiso',1,'','https://appdala.net/wp-content/uploads/cach-lam-mut-atiso.jpg',0,0,1,17,1,1,0,''),(11,'2021-07-22 16:55:36','Mứt Chanh dây',1,'','https://appdala.net/wp-content/uploads/mut-chanh-day-1.jpg',0,0,1,17,1,1,0,''),(12,'2021-07-22 16:56:56','Bưởi sấy dẻo',2,'','https://appdala.net/wp-content/uploads/Vo-buoi-say-deo-5.png',0,0,1,17,1,1,0,''),(13,'2021-07-22 16:57:43','Cam sấy dẻo',2,'','https://appdala.net/wp-content/uploads/Cam-say-deo-mieng-dd-1.png',0,0,1,17,1,1,0,''),(14,'2021-07-22 16:58:34','Chuối sấy dẻo',2,'','https://appdala.net/wp-content/uploads/Chuoi-say-gion-2.png',0,0,1,17,1,1,0,''),(15,'2021-07-22 17:00:24','Dâu tây sấy dẻo',2,'','https://appdala.net/wp-content/uploads/78172ebc76c0f9bb2d29b7250fd63957.jpg',0,0,1,17,1,1,0,''),(16,'2021-07-22 17:01:14','Hồng sấy dẻo',2,'','https://appdala.net/wp-content/uploads/Quat-deo.png',0,0,1,17,1,1,0,''),(17,'2021-07-22 17:02:17','Mãng cầu sấy dẻo',2,'','https://appdala.net/wp-content/uploads/mang-cau-say.jpg',0,0,1,17,1,1,0,''),(18,'2021-07-22 17:07:35','Chuối sấy giòn',3,'','https://appdala.net/wp-content/uploads/2e9b4494388685cb3c627da9cf9781db.jpg_720x720q80.jpg_.webp',0,0,1,17,1,1,0,''),(19,'2021-07-22 17:09:29','Khoai lang sấy giòn',3,'','https://appdala.net/wp-content/uploads/khoai-lang.jpg',0,0,1,17,1,1,0,''),(20,'2021-07-22 17:10:09','Mít sấy giòn',3,'','https://appdala.net/wp-content/uploads/Mit-say-gion.jpg',0,0,1,17,1,1,0,''),(21,'2021-07-22 22:48:57','Thập cẩm sấy giòn',3,'','https://appdala.net/wp-content/uploads/4b8ee6587c99d0b270a16cb10672b32b-2.jpg',0,0,1,17,1,1,0,''),(22,'2021-07-22 22:50:47','Trà Atiso',4,'','https://appdala.net/wp-content/uploads/tra-atiso-dalat-4.jpg',0,0,1,17,1,1,0,''),(23,'2021-07-22 22:51:31','Trà Linh Chi',4,'','https://appdala.net/wp-content/uploads/tra-linh-chi-thuc-uong-giai-khat-va-phong-benh-hieu-qua1506907162.jpg',0,0,1,17,1,1,0,''),(24,'2021-07-22 22:52:12','Trà túi lọc',4,'','https://appdala.net/wp-content/uploads/Tra-tui-loc-1.jpg',0,0,1,17,1,1,0,''),(25,'2021-07-22 22:54:48','Cao đặc actiso',6,'					\n					','https://appdala.net/wp-content/uploads/cao_dac_22_new_768ae69b77804b74abc8c4bbe889d5dc_large.jpg',0,0,1,17,1,1,0,''),(26,'2021-07-22 22:55:37','Cao uống actiso',6,'','https://appdala.net/wp-content/uploads/3d_ladoactiso_cao_ong_co_duong_master_new_fcbe512fceda499abb1755d22c48ac07_large.jpg',0,0,1,17,1,1,0,''),(27,'2021-07-22 22:57:44','Các loại hạt',8,'','https://appdala.net/wp-content/uploads/hat-macca-lam-dong.jpg',0,0,1,17,1,1,0,''),(28,'2021-07-22 22:58:37','Gạo nếp',8,'','https://appdala.net/wp-content/uploads/tai-xuong.jpg',0,0,1,17,1,1,0,''),(29,'2021-10-21 19:38:42','Nấm Linh chi',6,'										\n					\n					','',0,0,1,31,1,1,0,''),(30,'2021-10-21 19:45:17','Nấm Đông trùng hạ thảo',6,'					\n					','',0,0,1,31,1,1,0,'');
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
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_general_speciality_name_update` BEFORE INSERT ON `dala_category_general_speciality` FOR EACH ROW BEGIN  
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_general_speciality_stores_id_update` BEFORE INSERT ON `dala_category_general_speciality` FOR EACH ROW BEGIN  
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_general_speciality_category_parent_id_update` BEFORE INSERT ON `dala_category_general_speciality` FOR EACH ROW BEGIN  

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
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_category_general_speciality_link`
--

LOCK TABLES `dala_category_general_speciality_link` WRITE;
/*!40000 ALTER TABLE `dala_category_general_speciality_link` DISABLE KEYS */;
INSERT INTO `dala_category_general_speciality_link` VALUES (199,37,4),(200,37,22),(201,39,1),(202,39,9),(209,41,3),(210,41,21),(221,43,6),(222,43,29),(225,44,6),(226,44,30),(229,45,4),(230,45,22),(233,46,4),(234,46,24);
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
  `dala_coupon_speciality_featured_image` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_coupon_speciality`
--

LOCK TABLES `dala_coupon_speciality` WRITE;
/*!40000 ALTER TABLE `dala_coupon_speciality` DISABLE KEYS */;
INSERT INTO `dala_coupon_speciality` VALUES (4,'2021-10-06 11:34:05','MPVC ALL','',17,'										mieễn phí vận chuyển tất cả										',1,2,0,1,500000,30000,NULL,NULL,0,4,1,0,0,''),(11,'2021-10-18 10:10:24','DHDT','https://appdala.net/wp-content/uploads/dala-logo-web-moi-xt-fix-ma-mau-17.jpg',17,'Giảm giá cho khách hàng mua hàng lần đầu tiên tại DALA				',1,0,10,3,0,200000,NULL,NULL,0,4,1,0,0,'');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_discount_program`
--

LOCK TABLES `dala_discount_program` WRITE;
/*!40000 ALTER TABLE `dala_discount_program` DISABLE KEYS */;
INSERT INTO `dala_discount_program` VALUES (1,'2021-10-03 09:51:15','mức dâu giảm giá 40%',17,'https://appdala.net/wp-content/uploads/mut-dau-tay-ngot-ngao.jpg',0,0,0,1,0,4,1,0,0,3,0,NULL,NULL,'				giảm giá đồng loạt 40% cho mứt dâu				','											'),(2,'2021-10-03 10:14:57','FLASH SALE',17,'https://appdala.net/wp-content/uploads/6.jpg',0,0,1,1,0,4,1,0,0,3,0,NULL,NULL,'				giảm giá HOT ! mỗi ngày				','											'),(3,'2021-10-03 10:25:48','Giảm gái Theo mùa',17,'https://appdala.net/wp-content/uploads/avd-0ebd1.jpg',0,0,2,1,0,4,1,0,0,3,0,NULL,NULL,'				Giảm giá theo mùa xuân hạ thu đông				','											'),(4,'2021-10-03 10:29:30','Mua 1 tặng 1',17,'https://appdala.net/wp-content/uploads/now-vn-deal-trai-cay-mua-1-tang-1-tat-ca-san-pham.jpg',0,0,3,1,0,4,1,0,0,3,0,NULL,NULL,'				sdasdasdasd sdfsd \nsadasdasdas sdfsdfsf								','						sfsdf ssf										'),(5,'2021-10-12 21:01:19','mua 1 tặng 2',17,'https://appdala.net/wp-content/uploads/keo-deo-chocolate-handmade-1504932104-1-4140608-1509593909-13.jpg',0,0,0,0,0,4,1,0,0,3,0,NULL,NULL,'																				sdf sdfsdfsdfsdfsdf sf sdf																				','																																																							');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_discount_program_details`
--

LOCK TABLES `dala_discount_program_details` WRITE;
/*!40000 ALTER TABLE `dala_discount_program_details` DISABLE KEYS */;
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
  `dala_discount_program_product_link_sale_of_price` double NOT NULL DEFAULT '0',
  `dala_discount_program_product_link_date_star` datetime DEFAULT NULL COMMENT 'ngày bắt đầu khuyến mãi',
  `dala_discount_program_product_link_date_end` datetime DEFAULT NULL COMMENT 'ngày kết thúc khuyến mãi',
  PRIMARY KEY (`dala_discount_program_product_link_ID`),
  KEY `discount_program_product_link_discount_program_details_id` (`dala_discount_program_product_link_discount_program_details_id`),
  KEY `discount_program_product_link_product_speciality_id` (`dala_discount_program_product_link_product_speciality_id`),
  CONSTRAINT `discount_program_product_link_discount_program_details_id` FOREIGN KEY (`dala_discount_program_product_link_discount_program_details_id`) REFERENCES `dala_discount_program_details` (`dala_discount_program_details_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `discount_program_product_link_product_speciality_id` FOREIGN KEY (`dala_discount_program_product_link_product_speciality_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_discount_program_product_link`
--

LOCK TABLES `dala_discount_program_product_link` WRITE;
/*!40000 ALTER TABLE `dala_discount_program_product_link` DISABLE KEYS */;
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

IF(LENGTH(NEW.dala_discount_program_product_link_discount_program_details_id ) > 0 and  LENGTH(NEW.dala_discount_program_product_link_product_speciality_id) > 0 ) THEN 
	
	
	
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
		where dala_discount_program_product_link_product_speciality_id = NEW.dala_discount_program_product_link_product_speciality_id);	
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
			where dala_discount_program_product_link_product_speciality_id = NEW.dala_discount_program_product_link_product_speciality_id);	
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
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_discount_program_product_link_update_after` AFTER UPDATE ON `dala_discount_program_product_link` FOR EACH ROW BEGIN  

	IF(NEW.dala_discount_program_product_link_status = 1) THEN 
	
		UPDATE dala_products_speciality 
		SET dala_products_speciality_sale_of_price = NEW.dala_discount_program_product_link_sale_of_price,  
			dala_products_speciality_date_start = NEW.dala_discount_program_product_link_date_star,  
			dala_products_speciality_date_end = NEW.dala_discount_program_product_link_date_end  
			
		WHERE dala_products_speciality_ID = NEW.dala_discount_program_product_link_product_speciality_id ;
		
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_discount_program_product_link_delete` AFTER DELETE ON `dala_discount_program_product_link` FOR EACH ROW BEGIN  

	UPDATE dala_products_speciality 
	SET dala_products_speciality_sale_of_price = NULL,   
	dala_products_speciality_date_start =  NULL,  
	dala_products_speciality_date_end =  NULL    	
	
	WHERE dala_products_speciality_ID = OLD.dala_discount_program_product_link_product_speciality_id;
		
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
INSERT INTO `dala_news` VALUES (1,'DALA khai mở dịch vụ vào ngày 10/10/2021','2021-10-07 14:27:14','','','DALA khai mở dịch vụ vào ngày 10/10/2021, mong được khởi đầu tốt đẹp					',1),(2,'DALA có mã giảm giá 10% cho ngày khai trương','2021-10-07 14:28:13','','','DALA có mã giảm giá 10% cho ngày khai trương [ THANG10 ]',1),(3,'Ưu đãi cho khách hàng cài app DALA','2021-10-07 14:28:53','','','Ưu đãi cho khách hàng cài app DALA - giảm giá ngay 10 % cho đơn hàng đầu tiên',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Gữi thông tin cho khách hàng';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_notes`
--

LOCK TABLES `dala_notes` WRITE;
/*!40000 ALTER TABLE `dala_notes` DISABLE KEYS */;
INSERT INTO `dala_notes` VALUES (1,'2021-10-04 17:07:17',56,0,'qweq','qweqwe'),(3,'2021-10-04 17:07:24',51,1,'qweqwe','qweqweqwe');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_options_product_speciality_link`
--

LOCK TABLES `dala_options_product_speciality_link` WRITE;
/*!40000 ALTER TABLE `dala_options_product_speciality_link` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_orders_details_speciality`
--

LOCK TABLES `dala_orders_details_speciality` WRITE;
/*!40000 ALTER TABLE `dala_orders_details_speciality` DISABLE KEYS */;
INSERT INTO `dala_orders_details_speciality` VALUES (6,3,'product',39,1,31000,''),(7,3,'product',37,1,63000,''),(8,3,'shipping',0,1,30000,''),(9,3,'coupon',0,1,0,''),(10,4,'product',39,3,31000,''),(11,4,'product',37,1,63000,''),(12,4,'shipping',0,1,45000,''),(13,4,'coupon',0,1,15600,''),(14,5,'product',37,8,63000,''),(15,5,'product',39,8,31000,''),(16,5,'shipping',0,1,35000,''),(17,5,'coupon',0,1,0,'');
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
  `dala_orders_speciality_store_id` int NOT NULL COMMENT 'Cửa hàng bán',
  `dala_orders_speciality_shipper_id` int NOT NULL,
  `dala_orders_speciality_date_orders` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_orders_speciality_status_orders` tinyint(1) NOT NULL DEFAULT '0',
  `dala_orders_speciality_company` tinyint(1) NOT NULL DEFAULT '0',
  `dala_orders_speciality_status_pull_money` tinyint NOT NULL DEFAULT '0' COMMENT 'Trạng thái rút tiền về tìa khoản',
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
  KEY `orders_speciality_store_id` (`dala_orders_speciality_store_id`),
  CONSTRAINT `orders_speciality_store_id` FOREIGN KEY (`dala_orders_speciality_store_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_speciality_user_id` FOREIGN KEY (`dala_orders_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_orders_speciality`
--

LOCK TABLES `dala_orders_speciality` WRITE;
/*!40000 ALTER TABLE `dala_orders_speciality` DISABLE KEYS */;
INSERT INTO `dala_orders_speciality` VALUES (3,116,31,0,'2021-10-19 14:50:44',0,1,0,0,'Tỉnh Đồng Nai','Thành phố Biên Hòa','Phường Tam Hiệp','28/18','','0385569296','Xuân','',''),(4,92,31,0,'2021-10-20 19:11:43',0,1,0,0,'Thành phố Hà Nội','Quận Ba Đình','Phường Phúc Xá','1','','0981314849','vuong','vuong@gmail.com',''),(5,115,31,63,'2021-10-21 13:09:46',2,1,0,0,'Tỉnh Lâm Đồng','Thành phố Đà Lạt','Xã Xuân Thọ','32','','0898987878','Langfam','lehongson.tc@gmail.com','');
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_products_speciality`
--

LOCK TABLES `dala_products_speciality` WRITE;
/*!40000 ALTER TABLE `dala_products_speciality` DISABLE KEYS */;
INSERT INTO `dala_products_speciality` VALUES (37,'Trà atisô túi lọc, 25 tép, hộp, mẫu quấn dây kraft',0,'2021-10-18 11:18:14','374D',31,0,'https://appdala.net/wp-content/uploads/tra-atiso.webp','https://appdala.net/wp-content/uploads/atiso2.webp','','Trà atisô túi lọc, 25 tép, hộp, mẫu quấn dây kraft\nDùng làm thức uống giải khát hàng ngày hoặc làm quà tặng.\nĐược chế biến từ nguyên liệu tự nhiên, hương vị thơm ngon.\nAn toàn vệ sinh, không chất bảo quản.\nĐóng gói dạng túi lọc tiện lợi.\nThuộc L’angfarm, thương hiệu đặc sản Đà Lạt hàng đầu.\nMua hàng online, sản phẩm chính hãng, giao hàng toàn quốc.\nThông tin sản phẩm\nTên sản phẩm: Trà atisô túi lọc, 25 tép, hộp, mẫu quấn dây kraft\nThương hiệu: L\'angfarm - Đặc Sản Đà Lạt\nMã vạch: 8936003725225\nQuy cách thùng: 30 hộp\nKhối lượng tịnh / Thể tích thực: 50 g (25 túi lọc x 2 g)\nHạn sử dụng: 24 tháng\nThành phần: Atisô 92% (Thân và Lá 50%, Rễ 35%, Hoa 7%), Cỏ Ngọt 8%\nHướng dẫn bảo quản: Nơi khô ráo, thoáng mát. Tránh ánh nắng mặt trời chiếu trực tiếp\nHướng dẫn sử dụng: Nhúng trà vào tách nước sôi, 1 túi trà / 150 - 200 ml, chờ từ 3 - 5 phút. Dùng làm thức uống giải khát hàng ngày, mỗi ngày dùng từ 3 - 5 túi trà\nThông tin cảnh báo an toàn, vệ sinh: Không sử dụng sản phẩm khi phát hiện có hiện tượng mốc, mùi lạ\nSố: 51/QT/2019',63000,NULL,NULL,NULL,NULL,10,1,1,1,'','','',NULL,NULL,NULL,50),(39,'Kẹo hương dâu tây, 270g, hũ, mẫu tobita',0,'2021-10-19 07:49:07','39EU',31,0,'https://appdala.net/wp-content/uploads/keodautay.webp','https://appdala.net/wp-content/uploads/keodautay-1.webp','','Kẹo hương dâu tây, 270g, hũ, mẫu tobita\nĐặc sản Đà Lạt truyền thống\nChua chua ngọt ngọt, ăn là ghiền\nAn toàn vệ sinh, nguồn gốc rõ ràng\nBao bì tiết kiệm nhưng đẹp mắt, phù hợp tiêu dùng hoặc làm quà tặng\nĐược L\'angfarm kiểm soát chất lượng, đóng gói và phân phối\nSản phẩm chính hãng, giá chính gốc, ship toàn quốc\nThông tin sản phẩm\nTên sản phẩm: Kẹo hương dâu tây, 270g, hũ, mẫu tobita\nThương hiệu: L\'angfarm - Đặc Sản Đà Lạt\nMã vạch: 8936003729216\nKhối lượng tịnh / Thể tích thực: 270 g\nHạn sử dụng: 6 tháng\nThành phần: Bột Khoai (30%), Đường, chất điều chỉnh độ acid: Acid Citric, Hương Dâu Tổng Hợp,chất tạo màu tổng hợp: Ponceau 4R\nHướng dẫn bảo quản: Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp, đảm bảo vệ sinh\nHướng dẫn sử dụng: Dùng ngay sau khi mở bao bì, đậy kín sau mỗi lần sử dụng\nThông tin cảnh báo an toàn, vệ sinh: Không sử dụng sản phẩm khi có hiện tượng mốc, mùi vị lạ\nSản phẩm được sản xuất bởi: Cơ sở sản xuất kẹo Hạnh Tâm. Địa Chỉ: Số 23C, đường 3/4, phường 3, TP. Đà Lạt, tỉnh Lâm Đồng, Việt Nam\nSố: 01/QT/2018\nSản phẩm được đóng gói và kiểm soát chất lượng bởi L\'angfarm, một thương hiệu của công ty TNHH Quảng Thái.\n1B Hoàng Văn Thụ, P.5, TP. Đà Lạt, tỉnh Lâm Đồng, Việt Nam',31000,NULL,NULL,NULL,NULL,10,1,1,1,'','','',NULL,NULL,NULL,270),(41,'Thập cẩm sấy, dòng phổ thông, 450g, bịch, mẫu nhãn kẹp',0,'2021-10-21 19:15:17','41W',31,0,'https://appdala.net/wp-content/uploads/thap-cam-say.webp','https://appdala.net/wp-content/uploads/thap-cam-say-1.webp;https://appdala.net/wp-content/uploads/thap-cam-say-2.webp','','Thập cẩm sấy, dòng phổ thông, 450g, bịch, mẫu nhãn kẹp\nMón ăn vặt ưa thích, thích hợp tiêu dùng hoặc làm quà tặng.\nĐược chế biến từ trái cây tươi ngon. \nHương vị tự nhiên, giòn, ngon, hấp dẫn.\nAn toàn vệ sinh, không chất bảo quản.\nThuộc L’angfarm, thương hiệu đặc sản Đà Lạt hàng đầu.\nMua hàng online, sản phẩm chính hãng, giao hàng toàn quốc.\nThông tin sản phẩm\nTên sản phẩm: Thập cẩm sấy, dòng phổ thông, 450g, bịch, mẫu nhãn kẹp\nThương hiệu: L\'angfarm - Đặc Sản Đà Lạt\nMã sản phẩm: 110110\nMã vạch: 8936003724532\nKhối lượng tịnh / Thể tích thực: 450 g\nHạn sử dụng: 3 tháng\nThành phần: 100% (Mít, Chuối, Khoai Môn, Khoai Lang Tím, Khoai Lang Vàng, Cà Rốt, Khổ Qua, Đậu Bắp, Đường Tinh Luyện, Dầu Cọ Tinh Luyện, Muối I-ốt)\nHướng dẫn bảo quản: Nơi khô ráo, thoáng mát. Tránh ánh nắng mặt trời trực tiếp\nHướng dẫn sử dụng: Sử dụng trong vòng 3 ngày sau khi mở gói. Cột kín miệng bịch khi không sử dụng\nThông tin cảnh báo an toàn, vệ sinh: Không sử dụng sản phẩm khi có hiện tượng nấm mốc, mùi vị lạ\nSản phẩm được sản xuất bởi: Hộ kinh doanh Thịnh Phát Đạt. Địa chỉ: Số 65, Đường 609, Tổ 2, Ấp Trung Viết, Xã Phước Hiệp, Huyện Củ Chi, TP. Hồ Chí Minh.',85000,NULL,NULL,NULL,NULL,10,1,1,1,'','','',NULL,NULL,NULL,450),(43,'Nấm linh chi đỏ Đà Lạt, 225g, bịch',0,'2021-10-21 19:24:50','43H',31,0,'https://appdala.net/wp-content/uploads/Nam-linh-chi.webp','https://appdala.net/wp-content/uploads/nam-linh-chi-1.webp','','Nấm linh chi đỏ Đà Lạt, 225g, bịch\nDùng làm thức uống giải khát hàng ngày hoặc làm quà tặng.\nĐược chế biến từ nguyên liệu linh chi đỏ Đà Lạt tuyển lựa.\nĐóng gói dạng bịch lớn tiết kiệm, thích hợp làm thức uống giải khát hàng ngày.\nHương vị thơm ngon, đảm bảo chất lượng, không chất bảo quản, an toàn tuyệt đối.\nThuộc L’angfarm, thương hiệu đặc sản Đà Lạt hàng đầu.\nMua hàng online, sản phẩm chính hãng, giao hàng toàn quốc.\nThông tin sản phẩm\nTên sản phẩm: Nấm linh chi đỏ Đà Lạt, 225g, bịch\nThương hiệu: L\'angfarm - Đặc Sản Đà Lạt\nMã sản phẩm: 111023\nMã vạch: 8936003720541\nKhối lượng tịnh / Thể tích thực: 225 g\nHạn sử dụng: 12 tháng\nThành phần: Nấm linh chi đỏ 100%\nHướng dẫn bảo quản: Nơi khô ráo thoáng mát. Tránh ánh nắng mặt trời chiếu trực tiếp vào sản phẩm\nHướng dẫn sử dụng: Không rửa tai nấm, cắt tai nấm theo chiều ngang thành các lát nhỏ hoặc dùng nguyên tai:\n- Dùng nấu trực tiếp: Sử dụng khoảng 7g- 10g nấm trong 1.5- 2 lít nước, đun đến khi sôi, giảm nhỏ lửa tiếp tục đun khoảng 10-15 phút. Nấu lại 1 đến 2 lần để linh chi ra hết dược chất. Dùng làm nước uống hằng ngày.\n- Dùng ngâm rượu: Ngâm với rượu có nồng độ từ 38 độ trở lên, dùng 225g nấm ngâm trong 2.5- 3.5 lít rượu, sử dụng tốt nhất sau 4 tuần ngâm, pha loãng trước khi sử dụng.\nThông tin cảnh báo an toàn, vệ sinh: Không sử dụng sản phẩm khi phát hiện có hiện tượng mốc, mùi lạ\nSố: 69/QT/2019',330000,NULL,NULL,NULL,NULL,10,1,1,1,'','','',NULL,NULL,NULL,225),(44,'Nấm đông trùng hạ thảo sấy khô, 10g, hộp, mẫu quà tặng',0,'2021-10-21 19:41:52','44ZC',31,0,'https://appdala.net/wp-content/uploads/dong-trung-1.webp','https://appdala.net/wp-content/uploads/dong-trung-2.webp','','Nấm đông trùng hạ thảo sấy khô, 10g, hộp, mẫu quà tặng\nĐược chế biến từ nguyên liệu tự nhiên.\nNguồn gốc rõ ràng, an toàn vệ sinh.\nThuộc L’angfarm, thương hiệu đặc sản Đà Lạt hàng đầu.\nMua hàng online, sản phẩm chính hãng, giao hàng toàn quốc.\nThông tin sản phẩm\nTên sản phẩm: Nấm đông trùng hạ thảo sấy khô, 10g, hộp, mẫu quà tặng\nThương hiệu: L\'angfarm - Đặc Sản Đà Lạt\nMã sản phẩm: 111075\nMã vạch: 8936003720534\nKhối lượng tịnh / Thể tích thực: 10 g\nHạn sử dụng: 12 Tháng\nThành phần: Nấm Đông Trùng Hạ Thảo 100%\nHướng dẫn bảo quản: Nơi khô ráo thoáng mát. Tránh ánh sáng, Đậy Kín Nắp Hộp Sau Mỗi Lần Dùng\nHướng dẫn sử dụng: Có thể dùng theo những cách sau đây:\n1.Dùng chế nước uống: Cho 5-10 cọng nấm đông trùng hạ thảo sấy khô vào bình trà, chế nước sôi, dùng uống như trà, khi uống hết nước có thể ăn luôn phần nấm đông trùng hạ thảo đã ngâm.\n2. Dùng ngâm rượu: Ngâm 10g nấm đông trùng hạ thảo sấy khô trong 2 lít rượu, ngâm trên 20 ngày là dùng được, mỗi ngày uống từ 30-50 ml\n3. Dùng ngâm mật ong: Ngâm 7g nấm đông trùng hạ thảo sấy khô trong 2 lít mật ong, ngâm từ 7- 10 ngày, mỗi ngày dùng 20-30 ml.\n4. Dùng chế biến các món bổ dưỡng: Nấm đông trùng hạ thảo sấy khô có thể nấu cùng trong món canh, súp: Hầm cùng gà, vịt, chim bồ câu, chim cút; Nấu cháo cùng thịt gà, thịt nạc...\nThông tin cảnh báo an toàn, vệ sinh: Không sử dụng sản phẩm khi có hiện tượng mốc, mùi lạ\nSố: 68/QT/2019',370000,NULL,NULL,NULL,NULL,10,1,1,1,'','','',NULL,NULL,NULL,10),(45,'Trà atisô túi lọc, 60 tép, hộp, mẫu pastel art, Thái Bảo',0,'2021-10-21 19:43:02','455',31,0,'https://appdala.net/wp-content/uploads/atiso.webp','https://appdala.net/wp-content/uploads/atiso-1.jpg;https://appdala.net/wp-content/uploads/atiso2.jpg','','Trà atisô túi lọc, 60 tép, hộp, mẫu pastel art, Thái Bảo\nDùng làm thức uống giải khát hàng ngày hoặc làm quà tặng.\nĐược chế biến từ nguyên liệu tự nhiên, hương vị thơm ngon.\nAn toàn vệ sinh, không chất bảo quản.\nĐóng gói dạng túi lọc tiện lợi.\nThuộc Thái Bảo, thương hiệu thảo mộc cho sức khoẻ hàng đầu.\nMua hàng online, sản phẩm chính hãng, giao hàng toàn quốc.\nThông tin sản phẩm\nTên sản phẩm: Trà atisô túi lọc, 60 tép, hộp, mẫu pastel art, Thái Bảo\nThương hiệu: Thái Bảo\nMã sản phẩm: 1000928\nMã vạch: 8936003721616\nQuy cách thùng: 60 hộp\nKhối lượng tịnh / Thể tích thực: 120 g (60 túi lọc x 2 g)\nHạn sử dụng: 24 tháng\nThành phần: Atisô 92% (Thân và Lá 50%, Rễ 35%, Hoa 7%), Cỏ Ngọt 8%\nHướng dẫn bảo quản: Nơi khô ráo, thoáng mát. Tránh ánh nắng mặt trời chiếu trực tiếp\nHướng dẫn sử dụng: Nhúng trà vào tách nước sôi, 1 túi trà / 150 - 200 ml, chờ từ 3 - 5 phút. Dùng làm thức uống giải khát hàng ngày, mỗi ngày dùng từ 3 - 5 túi trà\nThông tin cảnh báo an toàn, vệ sinh: Không sử dụng sản phẩm khi phát hiện có hiện tượng mốc, mùi lạ\nSố: 51/QT/2019',75000,NULL,NULL,NULL,NULL,10,1,1,1,'','','',NULL,NULL,NULL,120),(46,'Trà tim sen túi lọc, 60 tép, hộp, mẫu pastel art, Thái Bảo',0,'2021-10-21 20:12:37','466P',31,0,'https://appdala.net/wp-content/uploads/tra-tim-sen.webp','https://appdala.net/wp-content/uploads/atiso-1-1.jpg;https://appdala.net/wp-content/uploads/atiso2-1.jpg','','Trà tim sen túi lọc, 20 tép, hộp\nDùng làm thức uống giải khát hàng ngày hoặc làm quà tặng.\nĐược chế biến từ nguyên liệu tự nhiên, hương vị thơm ngon.\nAn toàn vệ sinh, không chất bảo quản.\nĐóng gói dạng túi lọc tiện lợi.\nThuộc L’angfarm, thương hiệu đặc sản Đà Lạt hàng đầu.\nMua hàng online, sản phẩm chính hãng, giao hàng toàn quốc.\nThông tin sản phẩm\nTên sản phẩm: Trà tim sen túi lọc, 20 tép, hộp\nThương hiệu: L\'angfarm - Đặc Sản Đà Lạt\nMã sản phẩm: 1000913\nMã vạch: 8936003721760\nQuy cách thùng: 30 hộp\nKhối lượng tịnh / Thể tích thực: 120 g (60 túi lọc x 2 g)\nHạn sử dụng: 24 tháng\nThành phần: Tim Sen 60%, Lạc Tiên 32%, Cỏ Ngọt 8%\nHướng dẫn bảo quản: Nơi khô ráo, thoáng mát. Tránh ánh nắng mặt trời chiếu trực tiếp\nHướng dẫn sử dụng: Nhúng trà vào tách nước sôi, 1 túi trà / 150 - 200 ml, chờ từ 3 - 5 phút. Dùng làm thức uống giải khát hàng ngày, mỗi ngày dùng từ 3 - 5 túi trà\nThông tin cảnh báo an toàn, vệ sinh: Không sử dụng sản phẩm khi phát hiện có hiện tượng mốc, mùi lạ\nSố: 56/QT/2019',80000,NULL,NULL,NULL,NULL,10,1,1,1,'','','',NULL,NULL,NULL,120);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Bảng giá shipping từng khu vực nhập vào';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_shipping_speciality`
--

LOCK TABLES `dala_shipping_speciality` WRITE;
/*!40000 ALTER TABLE `dala_shipping_speciality` DISABLE KEYS */;
INSERT INTO `dala_shipping_speciality` VALUES (1,'Thành phố Đà Lạt',1,0,'',30000,0),(2,'Phường 7',1,1,'',25000,0),(7,'ccaaa',3333,6,'',333,0),(8,'bvbvb',423234,6,'',34232,0),(9,'Phường 1',1,1,'',15000,0),(10,'Phường 2',15000,1,'',15000,0),(11,'Phường 3',3,1,'',15000,0),(12,'Phường 4',4,1,'',15000,0),(13,'Phường 5',5,1,'',20000,0),(14,'Phường 6',20000,1,'',20000,0),(15,'Phường 8',8,1,'',20000,0),(16,'Phường 9',9,1,'',25000,0),(17,'Phường 10',10,1,'',25000,0),(18,'Phường 11',11,1,'',25000,0),(19,'Phường 12',12,1,'',30000,0),(20,'Xã Xuân Thọ',31,1,'',35000,0),(21,'Xã Tà Nung',33,1,'',35000,0),(22,'Xã Trạm Hành',44,1,'',35000,0),(23,'Xã Xuân Trường',35,1,'',35000,0);
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
  CONSTRAINT `shipping_tracking_users_id` FOREIGN KEY (`dala_shipping_tracking_users_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_shipping_tracking`
--

LOCK TABLES `dala_shipping_tracking` WRITE;
/*!40000 ALTER TABLE `dala_shipping_tracking` DISABLE KEYS */;
INSERT INTO `dala_shipping_tracking` VALUES (13,'2021-10-21 19:10:33',63,5,'',1,'');
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
  `dala_stores_discount_price` tinyint DEFAULT '0' COMMENT 'phần trăm chiết khấu bán hàng',
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_stores`
--

LOCK TABLES `dala_stores` WRITE;
/*!40000 ALTER TABLE `dala_stores` DISABLE KEYS */;
INSERT INTO `dala_stores` VALUES (17,51,'2021-10-03 00:19:17','Cửa hàng đặt sản đà lạt DALA',10000000,3,'số 51, trương định','Tỉnh Lâm Đồng','Thành phố Đà Lạt','Phường 8','09480360101','https://appdala.net/wp-content/uploads/dala-logo-web-moi-xt-fix-ma-mau-7.jpg','','store infomartion',1,1,'01010011002',0,'','','','',1,0,28,20,300),(31,115,'2021-10-18 11:16:27','Langfam',10000000,3,'01 Nguyễn Thị Minh Khai','Tỉnh Lâm Đồng','Thành phố Đà Lạt','Phường 1','0898987878','https://appdala.net/wp-content/uploads/tai-xuong.png','','',1,1,'',0,'','','','',0,0,28,20,300);
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
) ENGINE=InnoDB AUTO_INCREMENT=552 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_token`
--

LOCK TABLES `dala_token` WRITE;
/*!40000 ALTER TABLE `dala_token` DISABLE KEYS */;
INSERT INTO `dala_token` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJfcm9sZSI6ImRlZmF1bHQiLCJpYXQiOjE2MjMyMjg3NTl9.iQrzkanw_3SAyFT03Kq3GbWLdpcZtvkuswhKaKtsn0M',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJzX3Bob25lIjoiMDk0ODAzNjAxMDciLCJ1c2Vyc19lbWFpbCI6Ikd1ZXN0RGFsYUFsbEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQxMjc4OTUzNGY1Y2Q1YjI2M2JiNTc0YmEyZjA5NTg1IiwidXNlcl9yb2xlIjoiZGVmYXVsdCIsImlhdCI6MTYyMzIyODc1OX0.q5Qv9zG_ynJsnOFFqcB4mDpMftZ9fxHToXbFfuAxXBo','2021-10-03 00:19:17'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2VyX3JvbGUiOiJzdXBwZXItam9iIiwiaWF0IjoxNjIzNTUxNTE3fQ.lPM-4c93GPDnmwHwayVp94AXPtG0Zn7oyt5U8djJVwQ',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2Vyc19waG9uZSI6IjA4ODk0NTAzMDciLCJ1c2Vyc19lbWFpbCI6InN1cHBlci1qb2JAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJlNmY2YzE4NTY5MDlmZDRiNTI3YjNhYjA0ZDBlOTlhMyIsInVzZXJfcm9sZSI6InN1cHBlci1qb2IiLCJpYXQiOjE2MjM1NTE1MTd9.S37Ab2vDod4e9YErqdqeLEFTUt18WgEcxMUtsROdC7o','2021-10-03 00:19:17'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTAsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nX2dodGsiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzE3Mjk4Nn0.nVFL657kw9PZ-a0WnVqQHNU99m2-gMVSG2ClmXptBNo',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTAsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nX2dodGsiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIzIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzEyQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzE3Mjk4Nn0.D47F-HWdwmpSJu1Xt5ooiKOgArV33D0R0dGnKIY3M7w','2021-10-03 00:19:17'),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyMjA3NDN9.AMiUeNj7DaSjouVfDPH1rQ-OzXEXWQVPEyOGSws5bNA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzIyMDc0M30.DIbtoLScZaT2-yVXCIix5tu0iHSszGITxb0SpHzeBnA','2021-10-03 07:25:43'),(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjA4MTB9.AFR7r2I6XpH-50j9pAvfbUpv7FtTiv5KmpXOGXUfpso',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjA4MTB9.qWqqeWDmYbTH5m0YPsb_FF5iqL7KiV3pQ1fkT1l3HEI','2021-10-03 07:26:50'),(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyMjExNzZ9.UCTF4ii6PCLw4NOqtsRwqCpEZ1uEvGB1sj_BB13NhHo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzIyMTE3Nn0.dD0hTLt08Thzh65OUyziOvysoT-u5ilCISWCLuiFrA4','2021-10-03 07:32:56'),(7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyMjMzNDh9.uagGAw9FbTUKly-ChlAH5T7bXF9gM-nCyXXOQS-79jU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzIyMzM0OH0.XxQRxsPK5uru-dqv71LCgvL4geobXfmdFi8q107-k0Y','2021-10-03 08:09:08'),(8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzMjI1ODc3fQ.K1Hfg34shim38LCMiD0czBS7qXPTUoirzhSw-DhFgUo',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDk0ODAzNjAxMDYiLCJ1c2Vyc19lbWFpbCI6ImN1c3RvbW1lckBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzMyMjU4Nzd9.teP-TswfVHH93qm6zOm0GORdcOyJ2g8YKCc_3wm_CP8','2021-10-03 08:51:17'),(9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjYxNzh9.ZV9N_j9oXchvIs48Qqa7iNWaA0q6bvcawGiQCYVY3Ss',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjYxNzh9.ZhoW_tSA_aNG5YEK7IEdBY6usftsI8twgGz4bEsoGg8','2021-10-03 08:56:18'),(10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzIyNzcxMH0.JBWHdk3zt1G-b33o69mzvlmS7sMr3pjDRHejC_Lk9QA',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjc3MTB9.MXJM6GOjCS3YSL4VODkQ9_unikJ_qxRoBkcCQwiH26c','2021-10-03 09:21:50'),(11,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjk2MTN9.oFibZmPjN9Id8LRYI7IiqZDOpZHFGhAaZtxndXM-5I4',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyMjk2MTN9.oN76GKElZqjICm2PQugi2atUiaRHvyTUs8D9LoQEBwY','2021-10-03 09:53:33'),(12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDA5Mzd9.Edo3P9pedxFuBVecu2YToN8flr8L8V-qH6GsGEFEl_w',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0MDkzN30._ljWBarmjQUZd8od47-BpvEqQPH4m7gkMmckONjcFJ8','2021-10-03 13:02:17'),(13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDA5NzB9.FMy1T2MzdrO95xYVCB__HLg9qUu7JA2134n6HFGoa0c',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDA5NzB9.Y6CskgcZRb5BrEFvxMxEdNG0rDGtQPadNBJ3e6UUzng','2021-10-03 13:02:50'),(14,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDQ2MTJ9.1rayhxWKPLq1cYE2e3UJWoJKrchoXB1G9PJQHZyc7Mc',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0NDYxMn0.m7HBINmgPbAxmK5YtdwsJ4XOnEQbqj65vIAKY6qMSRk','2021-10-03 14:03:32'),(15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDQ4MTh9.WOih_sBTTKFUt0GgYluQGR0SSkcrf7ZHYg_MOlmUS1M',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0NDgxOH0.sMrzsDVRCLgvmx0ek-Q669g-E-ce4V-rmXru6rgE5cE','2021-10-03 14:06:58'),(16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0NTI3M30.ti-ZFzLZi3ad7a5C0dGBz1FWihFmFQE-ZJeyJ-6JalU',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDUyNzN9.vyLDuJUOFocMPgBPIGS0LOnhcP8PiiFaElDIzV_5Npg','2021-10-03 14:14:33'),(17,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0NTM5OX0.X5lwJZAC4n6jJylpsgySPEwbUjybh4dV-g902Hk6B_0',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDUzOTl9.7XvcfQZSNMFh1IZlIs-pjt3Hoct_qeoYwFQVIif4yA0','2021-10-03 14:16:39'),(18,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0NTQ0M30.DJ-3e6ENjOoyXQFGlCsQKtuv9ervf4Kt3A2reHRc-wQ',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDU0NDN9.OluGbgm1vwN9UI4-k2EgINWNi4Z9GeNdROXgX3POTXo','2021-10-03 14:17:23'),(19,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDU0NTl9.f9eLD7-3NYmSfghTfXSm671DOXx_nqwfiJ2Las_WBwo',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDU0NTl9.jrIKYQaKR_TA6cp16BOl7i_o3VAWxKcz6vJ2VNibbpk','2021-10-03 14:17:39'),(20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDYwNjR9.B8TU0G2F_cvgRxMJvftOtPkSvXKfH6Uvsg4Z0TaGb2A',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0NjA2NH0.bquLmfi_s-cCCQk2x6aoGRmwXTnzbGHV8Hp_6vAK7FQ','2021-10-03 14:27:44'),(21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDYwODd9.cAD6v77yDCuUzVCMnkFTCb_kwxhl5gCCJEQLy0qjY-E',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0NjA4N30.WN-6Bd8nnM9d0EiWnEUE2ETUxtMPKA_-TPTk8W5uHZE','2021-10-03 14:28:07'),(22,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDYzMjZ9.e5zjt7uZi3OsFBMvjQ0h2R1wFJdEO3NuxX_pCsv_e-8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0NjMyNn0.FfqgZfUpn83vBIzSFNuNHy5qyZvZnhbrYL9ypbH45wI','2021-10-03 14:32:06'),(23,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDczMDN9.YfFsDQ7Z1UBczp_CTzMfucwP5UtWykYIKpMQSKKezYg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0NzMwM30.6nr6GFZ6ja6RZXEw8EMOIIGD0ZZWnIhP0fiAh1GIbU4','2021-10-03 14:48:23'),(24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0ODQxN30.vzFtwC1I3SCnSaF_eoofAfJqUteF7309YsW-rNNrYNA',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDg0MTd9.mBOg7fPgekG2GzzyEsbCp1HwMHGSqFwTA3KSFd9xZJw','2021-10-03 15:06:57'),(25,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNDg1NzF9.2HES2xvO4IjO2-siO4ELeMduEfu6nHFLXpOISH-9pOw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI0ODU3MX0.dskJ8Z5A1C3wMo9bEAQ5Q1nTEbulZA-XzdVQU9vmS9Y','2021-10-03 15:09:31'),(26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0OTU5NH0.qKFMYRM96RTViw9slCCXOLv16KfqZdWWHChi4Uxtv_M',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDk1OTR9.YeP615XDeB8fp-3QthEugp6OnVXgNFARB93MBIh-Kok','2021-10-03 15:26:34'),(27,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0OTk0NX0.EYRINsZG3WG8yDNqfcN3b2TnpKRiEgjq2cw5Rl2UNF0',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDk5NDV9.PkyYJWCCDaLHibu_XK7qpwRkxHGYDIzEM6auVNUtIKw','2021-10-03 15:32:25'),(28,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI0OTk3OH0.w1yBOKpYZ83XsHYzoiGS8NRZu0wvGDwQCbCHndTt95w',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNDk5Nzh9.gZ8oGMQ6OdwBKQUhud_brToDYuvtTv83aW4yS7DP49Y','2021-10-03 15:32:58'),(29,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNTMwMDZ9.evYFijqtASXGR7H01mqk5Qm838bSSIzzhIinQFTc9nQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI1MzAwNn0.7-VhlHmpbzXxEM0fJftdZJG1V4z4VG-HUnCA5LPMkpE','2021-10-03 16:23:26'),(30,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI1MzA4NX0.i3OnXw3FLzTqp2LOrpdXc3Q0v2he7Rb9vcVj0Mz38pE',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNTMwODV9.U4bprEvucQvJQJMxlPYQieC-fA_7pomLjLPamGRIO0k','2021-10-03 16:24:45'),(31,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzI1MzEwMH0.H3iGUWR6epI4RfzPjEUsN6RgOKMctGbncQJ3_yfbH7g',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNTMxMDB9._ViwOpLO9vdSeHzH1HrGye-0x72V521JM1fE76rF5eM','2021-10-03 16:25:00'),(32,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNTMxMTF9.1wWS675_8RwqymFd8wc0Z1PIJWEqdEt2ZiTEcLkivFw',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNTMxMTF9.wRTGXb_Efum8M6-1SJ0L_ROEQJibGyXfUqQsCfClkn8','2021-10-03 16:25:11'),(33,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjA4MTZ9.mtzY0gwOfK-RtKGSV_ghqy6a8YRG78W56QIEkaDlKMo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2MDgxNn0.Q0il-lhUFYkveyvN-pbcGcA8SvV1MB-jRYqfHoxQ7Lo','2021-10-03 18:33:36'),(34,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjIwNTV9.ZkxkODuhCQnEbCLDg4yidWAhL4piJkMaIpzOkYxpV_A',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2MjA1NX0.jGn9T6M52VRX1VchwdlN07w7Y01UfgGkxeIHIEuePtI','2021-10-03 18:54:15'),(35,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjM5NjV9.J-to6VK_MlP0TLOc_NbjHKdsmzB5ziOcVastdJ3JG6M',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2Mzk2NX0.0zd61dFW1_u6wmAd8sjWkHFkKjHg0qRkAN3ilbMbMww','2021-10-03 19:26:05'),(36,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjQ4ODl9.3frrqhsPO5WNa00shFuqYaAe8e_YxLEIj9_VY0xMMjI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NDg4OX0.wR_YWOS0Ig5nysWcR59FA0nW1b7n8VHmtbpONmt4Coo','2021-10-03 19:41:29'),(37,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjQ5MzV9.2Nmo7Um-9MVRH94oh6oRk9vFxRMgNENjYjljb_OOaaA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NDkzNX0.alX7pteBrr9rPyRN_06oKjPuzboQA161NH8dYPwpHjM','2021-10-03 19:42:15'),(38,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjQ5NTd9.MqylH_IrIQnVcPTjpQEtYItFztHBD7OUtOMa6u-bdrY',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NDk1N30.ne947JtsUaYmWiB80bvPI0eZImpEqxJE2R-T06j1Fqc','2021-10-03 19:42:37'),(39,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjUwNDV9.JImVcNdAVClSjvWXuxuSxO9ji4Bt0APy_4Bcb4ljI0k',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTA0NX0.Gz8Mb0MCIZG_8hpKbAR1QlB8WuHoS7-y1LhWH9jM5sI','2021-10-03 19:44:05'),(40,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjUyMDB9.e3fhQqNRmuEXLBXw3RzGFVqz1C7DGwaFcd6YR56LPm4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTIwMH0.ivcpbH4XvSPLUIda008_zmd8zctVeCz-yeTGToRLNfA','2021-10-03 19:46:40'),(41,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjU0MTR9.2o2pMjrq-ufWVOo9RHJu-h4S3aeKpwC4rJ0lXP_0-a0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTQxNH0.OvFwvRvgJZNOPrE1klPCbWIZo0oXBRYY-gqITlXyFWk','2021-10-03 19:50:14'),(42,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjU2NTl9.XCrBvQimrW__ahngBdSBEezUHZufY35_ZQSXevsbAIE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTY1OX0.YP1D3QR3Lmac2yMxg-2bQfUxaeOHQEmepnbBaLj1yhs','2021-10-03 19:54:19'),(43,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjU3MzJ9.kKu9Y9BO2NLztKmh9dLRAQCHnuWuE7-uYOEBZF2VK5g',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTczMn0.S341EZ3Pi2RO0TMaMhPD41BIThnXGfEbivEuW1Ec94Y','2021-10-03 19:55:32'),(44,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjU4NDN9.thDF2_V9b3mhbl4IRNs0vdhPq8OJc5r3wdRC4o8BUdg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTg0M30.twmbkhwwXKvzFuijkEfHMUqM9EjNqqrh22hqmtwPul4','2021-10-03 19:57:23'),(45,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjU5MDd9.SzxsgZjgt9YFzJbq1L33o2BXUMWxbjf-qyokjVpUvRI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NTkwN30.1A7i5-MNUDk36n20DgYNTfeiEpx9eKQu63xtmcWWPfY','2021-10-03 19:58:27'),(46,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjcwMDV9.6BGNKrNLW7Akr2SCFtvoAy4j8DfIo8oOT_lcogsy8Mw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NzAwNX0.AnGuD1xPRcvHQQEQ1CjtPcFzaY8xG9ZoCOKAYkl0BvA','2021-10-03 20:16:45'),(47,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjcwNTl9.p4ooXtsqk6kbSOZpSy2rqEsNYq3nEq68llrKHlQvkKg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NzA1OX0.6BD038PxZ1A4bvZWVhVKXI67ShUy2YX9i3upeplER6g','2021-10-03 20:17:39'),(48,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjcxNTV9.AWey9IM5QnjEKsyrCRY6kJZp8R1m0_q-uZmJgJhRnG0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NzE1NX0.P1x92tUnUVZntWbWJqe2wkZImIBJ2SBi9oISWqV8BQ4','2021-10-03 20:19:15'),(49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjcyNjh9.WisDRREqA4rSfmjPpCjGb75_WPFN5NPj16WUVnBkSNE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NzI2OH0.E1ACols4znrMNwSc05iSDaIvNMw0NrNylXLJjg0qGcE','2021-10-03 20:21:08'),(50,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjc4MDV9.23TIvyciFVBrtNm_g8UAaTTPx6M_WONb5L0BJQ6_VjM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2NzgwNX0.Ebsj4_y8Mdjmk--2-vsRuPxFr9Vq1_A--rtur45YRWs','2021-10-03 20:30:05'),(51,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNjgwNDF9.VCmyyHgj-w7aPDmGpxBLyjrmRpglq_uJuekB4ON_q44',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI2ODA0MX0.KSxorxPK-MdLkQH2GIrwWVe7LLTYj-OxL--CmpJh-s0','2021-10-03 20:34:01'),(52,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzAyNjd9.jmV3OQGo_Wi6l-TzVVDdqCbpwzZUi46QfHEeP7AX6bg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MDI2N30.0WRTS91Iapi5DQyBbjWqSKKLdFpI0SNGRYCNeQ1Kf14','2021-10-03 21:11:07'),(53,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzA0OTB9.0kUD_OhpZ54mjiVqas8uCniTiQxMO0V-FrFiZ1yURFI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MDQ5MH0.sv_pvcC6LObdBmncakXn4waScqfRZaxCTrqZOqtyh3Q','2021-10-03 21:14:50'),(54,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzA1MzV9.fFw5H2Yo7QYjXOE4T7yxe91UbQB2qPF5Why4bIW9yJE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MDUzNX0.xy5xCnQoP0yxdn9lKZ52e-H4ix_b8-Z0zKqTcHFmFF8','2021-10-03 21:15:35'),(55,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzA2MDZ9.inPyWa1Dtb2ydssjyXurp-dmqvZFjRnPzMvjtnm6Qcw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MDYwNn0.M70DFtskpjC_QGdgIRbzYLAIJAraXr-VRndcXvz0U3g','2021-10-03 21:16:46'),(56,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzA2NDl9.SjT5TIzCrBDVW8I8wNtvygPi0njO9qmC9FrGBsZtsSE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MDY0OX0.hmU4aaiN43MuNXMf-xBCy6uZW8-8rVyBSwx9ag5ugLs','2021-10-03 21:17:29'),(57,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzE0NjJ9.vWD8fHw4M706RoWTg3ut86llgm-SawPSiQEB_6ExmmE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MTQ2Mn0.VJFl82OtIoY6vuHh28R7l3G-48EqaH_2L22TZopGsGI','2021-10-03 21:31:02'),(58,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzE4MTN9.QRx_5JwzfBxD4FoQ9p5w-ZZl-fSaHPqFumFDXKbuWn4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MTgxM30.KVyJzsOIzNjNlX4at2Bxx26SxjlOKVXVlfgLPNb-8Fw','2021-10-03 21:36:53'),(59,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzE4NDB9.BvSIbEcuyZ6ASH0mlKCTNg_-Sam9FVLWEnCm8BnsdWY',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MTg0MH0.8_nrv3zon1V5umlwhIDBtp1asDHJFG741sRT0fvePE0','2021-10-03 21:37:20'),(60,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzE4NzZ9.aFwbGlFnkB5sKWtFcaqDKOm6aeU_poomjycIuNqRS3U',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MTg3Nn0.OrqqQFYxpf_hHFE874o8W0I8EaQowB8gDUpg0e1IE0M','2021-10-03 21:37:56'),(61,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzE4OTZ9.xGLCqFBDlOLnl514HXOtWqTt-7mzFDwqb43c225n5MU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MTg5Nn0.gxoYzzDbeRqBxVCd9WYXwG2KQmgLBehFvMV2rZc7KBw','2021-10-03 21:38:16'),(62,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzIzMDZ9.bL2T281RSWsZvfEwl7ajI88F9YvvkEB9xVfpNvoErEM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MjMwNn0.Idlrcnyf5oDTiiaz71sv0xYtUQ757JWYNEbJ8b2AwR0','2021-10-03 21:45:06'),(63,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzIzNzl9.WKohkE6Z1oLvyijAXYfPhvUEfKjCF8Le5PA2pQloD_Q',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3MjM3OX0.UVqihr4Uxc9oQtrDwTwy6ZY7T2H2_60zUFgTFHioizo','2021-10-03 21:46:19'),(64,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNzI1ODV9.cjVpmkUp5v3KrTss4mwGodlrGtu2zgq6uRwkNPss3ug',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMyNzI1ODV9.Et6ulTNDxMCqOKqR3CgouPa-HmJBthLtRkhVg7uxK7c','2021-10-03 21:49:45'),(65,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMyNzM5NDN9.o6BS6p_TvQAf2g-H_iTfoELd-pGApa4bbWni_kg8Irk',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3Mzk0M30.sHot4hZe3uK79dZf-NQtsOx2K3Eq9am8VC6EaXL4xRI','2021-10-03 22:12:23'),(66,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMDg2Nzh9.4_rKwt3U3tYuPGBbXlDdRT6a5veUZTVn12sgX1dUzQg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMwODY3OH0.ZKvRojHc31cqjM-ADVv9zavMuRxTRGd9L1TX8zCaLsg','2021-10-04 07:51:18'),(67,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMDg5NDV9.Dpfxw0KJyKwAcHuhuqi1aMT5nZBUw3LkTsYsk6rYCew',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMDg5NDV9.9WAdCmMmpQonku_RsrBK1TuedfyjqmekIEZ9Z9Z6-2o','2021-10-04 07:55:45'),(68,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMwODk5Mn0.bUb1_yxH7aaA9VLaLLiqkfck3hQNO30V3u4ms3xMO9M',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMDg5OTJ9.38_ngYU_3LUaH-KM7cfDIXjxEEa0do4XzIFCYoJAkZY','2021-10-04 07:56:32'),(69,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxMTA3MX0.EcqIDOBaHPpaBZqr-1IJt3JarkWZntmHFfzf4BH24s0',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTEwNzF9.-a0kHLQEGBmQjCb327brwQsPer8H5L4H6pws5-BaN34','2021-10-04 08:31:11'),(70,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxMTIxOX0.f1bfGwm3uynGRD5pOOc9_ye_VJnFRfgcUlXeOd7M5g8',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTEyMTl9.sPLG-b612XuAtXLhXRx417eQy3wTBhBdToD9mrbBY-E','2021-10-04 08:33:39'),(71,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxMTMyM30.kw-ZCxajrRUrcU7KxYlLpLtOpJFboZ1KTHTOKs7KbvU',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTEzMjN9.QNTVU1W9Ao_9eSSgQnyCvZNN0BSctB9PkflsWJEMoLs','2021-10-04 08:35:23'),(72,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxMTQwNX0.7O1wBK8lMT-bncRX4_34UNxA5prQbDzAOhkSMCLgtKk',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTE0MDV9.TnQt3w0CVaW-GVufzde7Kt6xMxWKcXVyUDXsfLqkKAs','2021-10-04 08:36:45'),(73,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxMzY3NX0.X4SQhL1eL_f-fvnIzV3byXkGWvgZPbbPR_hZhNbcXA0',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTM2NzV9.tNvbnZIKhIcAoIiswGAKcahfSl2OQPKNnzCeGk77guU','2021-10-04 09:14:35'),(74,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMTM3Nzd9.8oYpI7MUDyINZhzrUaaSQXhABRH8Kut4KcvS8TBhLLI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMxMzc3N30.9ovelPm7CCiUqtlEe641fv3gSmZdpnDF9n2jynRbkKI','2021-10-04 09:16:17'),(75,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMTQ5MzR9.2JYS1-0FMORN6BpMwVa5P_zC4Y5kKfeAsDtr0JqHTBU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMxNDkzNH0.EqVxSamiLOo28v1dI_cP8zsT_4snmCmyqxGD6C9jHtY','2021-10-04 09:35:34'),(76,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNDk1Nn0.hYYRJluMf-6g3uwUKycpL-1zxTv-KLfzXlzrOTXNBCA',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTQ5NTZ9.qU6dNPq8vUfMdndOQ-zxxGnNpe4iFeF0LoLH2rhgkD0','2021-10-04 09:35:56'),(77,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNTQzOX0.nsWVFYEoXWVEkX75TUG3Cl7zd9jDrH619Jgojbfbzro',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTU0Mzl9.V1v69MTyE8_q7vn8jHCv6qTkkfIFVlipONLjOpOI3i8','2021-10-04 09:43:59'),(78,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNTYyMn0.zNAzx5CJ_Ydt50-XDVZ8cGYCm2PS0aZTz76lHbahDC4',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTU2MjJ9.ksL5eIBo6jMwOPBDjYq_TdWYmwGMFp2waqjaMQm8Ejo','2021-10-04 09:47:02'),(79,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNTgzM30.gS0K0SD_DmyQbPzCfLqSMg06cbsljeCQo1K8Wd-EU_A',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTU4MzN9.ipdiWH7I94pn8RR-VfPmO0vi0PMQijcMEkuqA4BtIUY','2021-10-04 09:50:33'),(80,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNTk0MX0.TLcX__WpupRWss9OWC-b30qQUXQxDGA1Rt1H7s_GzRg',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTU5NDF9.ceRIjmeS4IbQXRh2UBDwW2wL3TcnuZAVhlRl0IBE09g','2021-10-04 09:52:21'),(81,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNjAyMn0.0dTjsuxfZ_ET3lvXy2IyoEao1nl6gMLLYUG9oaGMAFU',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTYwMjJ9.Ku_daeK7eNTEN0jpInNKzOIQW01IM-15k_jQVtrMIJM','2021-10-04 09:53:42'),(82,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMTYxMTV9.lc7bz_luxp2RxL-at9OtV6crbRgVZQVWnZ2o_qjtLFk',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMxNjExNX0.cTuyZ5OVsz7ncNWMzCeyVBpghxFNaed0WRoY-S38_K8','2021-10-04 09:55:15'),(83,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxNjE0OX0.ttMYIhi2Lx2XQucuZkaOxjw2wbX1xFf87BrcaWeCB_U',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTYxNDl9.tz7pSDGw-141nJXdz3zRh__mFpo3ZMxdAeUjfQr3aws','2021-10-04 09:55:49'),(84,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxODUwMH0.KXO9eE7NQpxZetvB_Lr_M-XKbL6ELWQS56lhEcm_564',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTg1MDB9.SPPF6L8yZCuD9BUAsnTR98IFflmQX_23RngqJjO7B7Q','2021-10-04 10:35:00'),(85,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxODYwNn0.qoxUTRWJWkkI6Q7GZup_9TcFhawkfYWIEiOn2bqhVhM',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTg2MDZ9.ubJ-KmRvwHx25haGHBa7lbq9AqkGZXOgTYLSuEs3Few','2021-10-04 10:36:46'),(86,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxODk2Mn0.wvK5BBVKAuONxLlFg0ljLqDkNzgGWz1fmMBntS2mJIM',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTg5NjJ9.jEUMYHrIjJwU6ByjBH7_d_dc4B-a1nf-F0aGeo6Ru58','2021-10-04 10:42:42'),(87,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxOTEwOX0.d0qxooy8KC9nuTuZzl9ry8HntDQGwJPxtEo_ON1A5ZU',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTkxMDl9.tYazb9_DatfdQuZHwUkIhtca3BSOgBN5cby5GOl3Tuw','2021-10-04 10:45:09'),(88,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxOTEyOH0.E9P00qebSfliUJkv4tmwQwGUNhnnFV92QZlpgi5JwMA',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTkxMjh9.Y4NEAFd3MYpdzKA8ccSrYy1S1Aop_-jTwszFBXMIlZo','2021-10-04 10:45:28'),(89,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxOTI4MH0.Ozm8-X5CIfRoPuokXcwpjAFxtXbl96zudnMBe3N-89g',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTkyODB9.6uflcX3yDUJZBebebfozMzFM6D9EDQ_YwL4PGiWHfPI','2021-10-04 10:48:00'),(90,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxOTU0OH0.hebvBramvZvEpvtGBgw3Jei_CZ5TpCJUSpAHJUALU2k',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTk1NDh9.0pr0M1cdwf2hsx_W9dNYrw_mz_Tj2o4e2KeM_scsN7I','2021-10-04 10:52:28'),(91,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMxOTYxNH0.-4JewHjKh8HZ7q8_vSbLfMPFQZQ5P9FGF3DUgpoPpHA',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMTk2MTR9._SIxau_4wdV6pY7MidX32TtMmQxNOnY6ceG9Qgz1Db0','2021-10-04 10:53:34'),(92,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMyMDA0M30.-vXD0Jre0FSrGtkOM2C8OsYNMi6ohF6hzRzc7hMzmE8',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMjAwNDN9.j0k_4miIJPK3x2GHNk0o_1kbPn83pPPLhKphFmm8v4E','2021-10-04 11:00:43'),(93,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMjA1NDN9.BgloXNza1-DtgfwFMr0Vuk6uSN3MhCvv6OOz7Ob5vDU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMyMDU0M30.koTxeEf5PRAmuvxGfwM1V6piFPjC4wPK2bLDKfko8wo','2021-10-04 11:09:03'),(94,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMjA5Mzh9.2Niz7lROS1mxZq8xI1hlpO3ikTsrXSdM0K2fztHRFYw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMyMDkzOH0.mVLYFy_C-zPtMgCMZpnHRucc7mLFPiFtNPiEwctToLQ','2021-10-04 11:15:38'),(95,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMjUxMzB9.AbyTe-KdkJGaUeHURk_uuvHs1gI3rMy-EHprURcCM0g',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMyNTEzMH0.9Oaf0hKO9qCzDkxQhR0k7D2WAUVN50T5lRNaZ94oYZI','2021-10-04 12:25:30'),(96,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMjUxMzN9.5NPr6TdCnqi-LA05zyAoicJrd2Ia4UaTM70IMrlMhRI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMyNTEzM30.goJZs4G0nnAnqOwgtR8SLFd-9hWGXut30Eyu3KKPTAY','2021-10-04 12:25:33'),(97,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzEyMzd9.B10rgsjsMuG72rAxMKt8zRnxb7owlc0gYokS_5KD02M',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzMTIzN30.WoxuM5Xc6wC_BknblT7MOnD4cPR-F9GMueVG8JJT9ws','2021-10-04 14:07:17'),(98,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzMzMzIwMn0.9F518tlOv1MaBGgTPmLDCK1E_eim4DEbojOcra6pVJk',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzMzMzMyMDJ9.U0IdRHyrxzWBPOCKihbTpgX_GdnZ5IdZcfItHHa2ZUs','2021-10-04 14:40:02'),(99,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzMzOTN9.vVTikUR70rSFRVZcMs5t67LsBME0qrTTaMVwvrPw_8g',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzMzM5M30.idnnHHVRk2YXKSg-rOrOCtZDh32G7s6xAsil5teNTVM','2021-10-04 14:43:13'),(100,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzU1Njd9.pD9yF6iKZ0LdOTmUIM2czXutAUlEn_FUMIbdPpGz3cM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNTU2N30.2RrtQs8UXJ13dcG43b977F-A2SQR4VFzbBLIyhf3jb8','2021-10-04 15:19:27'),(101,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzU3Mjh9.iQkdNwsR04reCu1I-VVY2P_4MFeQiqH2jhZJIi6lBI0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNTcyOH0.t2tH2fy_oNBJVtBzS7u4XjHQemvZhAhkYpIEXM8FJdw','2021-10-04 15:22:08'),(102,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzU4MzF9.VhswOfvGMDsYpW4nklTxn6DqB6NwpRz5euVDDELA9T0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNTgzMX0.QjqUk_M8MYWW-hXQV5brjXcan_Jf9XRuThfj1ouQhNo','2021-10-04 15:23:51'),(103,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzU4OTR9.2zTtqC6F-wlM7IhmyfXy8PCvZ9st8hOYgc6SCpLu3Fs',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNTg5NH0.suEkuHm9pYS5l7mVmhUOzI8NjgYCldDY8jZbd76uhYY','2021-10-04 15:24:54'),(104,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzYxMjV9.XvZmlwmpxuLnJVtuyEb8VvNdUy23i1ZO_J5wezbMPN0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNjEyNX0.MzDqX4UI249LNwG2c6LDA4v2iAtrm3AJ6lRfTjCPtXo','2021-10-04 15:28:45'),(105,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzY2NTV9.McexI3tmTOPGkyKI5fAF-e-6rj3WYZf0MDjis43L5HQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNjY1NX0.N0ZNC0eX3gja1UsOVyPWl6ddcx1ATYgV7HIFJLMgBA4','2021-10-04 15:37:35'),(106,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzY3MTh9.SEDqVzKPnlALDLaYojs19kCDaYQA-MXaxddSP6JCzIo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNjcxOH0.RvGUla229Ni_9YfF9wDBTCn477OBnAgw3j8UcdGS0Tk','2021-10-04 15:38:38'),(107,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzY3ODR9.XqqX237-Tf2vxmgpYAlawRHAc3zIxvzW_Z4IRb7-nso',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNjc4NH0.GAdNA8h0KgMiRnFZhO9ZhrQ5YIpikb_Jm6hXNUIU274','2021-10-04 15:39:44'),(108,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzY4NjJ9.eXcMBGY9CxHehkY42LcEvRl-4SeytMEzsCgZoJjIdwQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNjg2Mn0.wpj5HLSjLI9J5ccEZqgBxfNwuUxpuTv1o-4_YKmPR3E','2021-10-04 15:41:02'),(109,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzc1NzR9.AK6dyqpJguV_KLamRo9n92dsbxpd2Bthkav5-jPgJeQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNzU3NH0.W4ZIVund-ymGiqhrDQ_AGHMqJ9rIIbdMHa4CwPEO4g0','2021-10-04 15:52:54'),(110,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzc3NjF9.krJCmArXmGjrVx1futfOqdj3TrmCzTJENV8Gu6x3T4Q',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzNzc2MX0._O7hvERFeTRLEnc0zHXgk7IodAWSBHpbA_p06TJJbQA','2021-10-04 15:56:01'),(111,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzg0OTN9.ezyETEJarFoVG0dScZLjX3uKq8VjzaB9cGPhODaOhfc',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzODQ5M30.iXqdR9MAMJfszSgTNb1fVr5ytFLTAnoVY41Y11bpTZU','2021-10-04 16:08:13'),(112,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzg2OTl9.fb0ARw4Q3mqbxrZrkHErwxjhuUXY0W6wxfrG0PLSNPo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzODY5OX0.aH-teYQrXb3oe6YIdV-yJgWL82h1cvkWW0q8ICsSMt4','2021-10-04 16:11:39'),(113,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzkzMTd9.djbu4MZlkVb4RKgwPcRy1NuSvxWKTNusciRfK7-wCQI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzOTMxN30.88wk4l4Rn8uXcFO0n1u84MHPmMz7yTuPZqmTpgpG1Kw','2021-10-04 16:21:57'),(114,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzMzk4NDB9.oMv92frc0rANSexp8G-XXash2T4yRYsWDG4WifzE8Ro',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzMzOTg0MH0.zh9wFtbs4K8IYSpKxyJRQQT4t-FRT8cEMBjibccm6q0','2021-10-04 16:30:40'),(115,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDA4ODh9.g8t8oasG5AkGjx5ClHj76ans3H4koZhhFWG-1KhYNQw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MDg4OH0.0aAZV7vGkS89e8dsMlClovjMIUhsncsJ3KFIpizkk58','2021-10-04 16:48:08'),(116,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDEyOTd9.nNAIfEoFIfRM4nko1IESp9rbex8ND3Zr_5SBfIK1oVg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MTI5N30.Rq8j0Cg3cYZc0lka8lVsBBLhY4CUBayHzp6MjWU-VwE','2021-10-04 16:54:57'),(117,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDEzNTZ9.BsL1CardjPthcbvGXzsN2uXiQqco-QEvnPKJkJmosyo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MTM1Nn0.SRCWlEFrAEkSqVDvLolpFVojEvFsnRNeLM_utyEtC2E','2021-10-04 16:55:56'),(118,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDE0MTd9.UUoyV3KL7-PRuHlbBC_Ou7cK-VZ2ZsgLQ1JJoo5vHE4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MTQxN30.qVlTWv-7p1glOoVPGbnZk5bt-WzYMXMltJ8r2_6wtko','2021-10-04 16:56:57'),(119,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDE0NzN9.0W53z9Ms9d_MD-RHSwEfInXdCo3ceAmpmPXYVvvOSnU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MTQ3M30.1eINlgS4atYmeGyYoScjiid1bOTyafb3r9uCtcmR0qI','2021-10-04 16:57:53'),(120,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDE2NDZ9.c5E2MmNkSTq9rvGEJMJ-3I0OMV5vePpmHLvY3P-JVEM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MTY0Nn0.Jm8h8A_qip125PWrqO_RPiAQwC2W18Gnpyaqp18y1uQ','2021-10-04 17:00:46'),(121,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDE5Mjd9.gM-HOKO17IDq-VTfy_-ZYbcyLenuQ9J7KQm3y3dYuqY',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MTkyN30.pF6y-LcvAeBZb2WQs5E7Xl2-10kxxofP_GtBCHf0pHI','2021-10-04 17:05:27'),(122,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDIyMDN9.ex79qNL0edtzfO1GrBsfvXmU6eMeQfNoBpSbxW1A8ds',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjIwM30.vu23_1KE1UpXa4fadsAGwdOomFQoPwPJcR5zaXV6zn4','2021-10-04 17:10:03'),(123,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDIyNzZ9.KIGIvGHJNt78ba_ZpppWs5vJvRQySDqaRq1Kp-PTF2c',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjI3Nn0.kixVRtWOu0NrkT661hNQz-O3RA5SXFrBAF0wHGAyiBE','2021-10-04 17:11:16'),(124,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDIzMTN9.ZPkpBfJz33je6Uo0_Mkj0httFnu86UHuHGwsRTeimE4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjMxM30.ol3Ib6vlHP5oiuAhj3CLHVpGj5fApeHGYa2zfE_FXpA','2021-10-04 17:11:53'),(125,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDIzNjB9.ItteLaf-grKUqXICxh_6GLbmqMb534OzEyI5-BX-MpQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjM2MH0.h2jq5Huee3DZNNqaHlwqXSa91Zos1cq147T-zi2lU6A','2021-10-04 17:12:40'),(126,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDIzOTV9.KT7ZoMbQVDA_amXE7FOYWUdwNmgPyoWQTaft-r3IeM4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjM5NX0._K0HSa6EhBaroxVEG7mbTNAm8MSV6aFs3Ws9M_rc1gQ','2021-10-04 17:13:15'),(127,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI0MTl9.6GMHRXOuZ6WIAybSrosxhaZGEWKcUS8QeKCIi2S4ZS8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjQxOX0.n5swR5wiREcH8jX4W6DY03eA4vRNCBOtOjtGEzMEacE','2021-10-04 17:13:39'),(128,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI0Mzh9.kCOFt26bU0uqZ7t4cBMRR3LPt92N2V0VTdSEYBQ5UxQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjQzOH0.HwpqFHphDO9BHdnAHAEfRxi4lXsM2CUQBZlFgkOx46Q','2021-10-04 17:13:58'),(129,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI0NjZ9.21hixG4DNnmskr6jTvZOq6a7UogMO6DnCu4gJ7fo3IU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjQ2Nn0.jND6dkd4EMxxJO0WKtWI_cNjtU9rc3u2PcjRtFYI53M','2021-10-04 17:14:26'),(130,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI1Nzd9.cc9iEGLMMymTahrbpK0CjOBBIKHL0-vlrrpbrJOvZHk',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0MjU3N30.AlM75uXPYZFTAGCSPm9QeOGJ2jtMuWi8i3dsrFaf0Oc','2021-10-04 17:16:17'),(131,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI3NjV9.AlpQn7UAWZXqOmjr_mki3JQEGl26pK5XDPyULc7pxVE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0Mjc2NX0.zod5xOd9Sd4tiwb1c7EKfu3JY74434Nb8RNpiTUeBXQ','2021-10-04 17:19:25'),(132,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI4NzF9.tytLFGOtfGkXQmL1jCf_s_ZVDdeqQ_Ph2lX6gzJHPKE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0Mjg3MX0.DfqBrC-DwAkhwp2tedrjFUAN38c2jKGPiaDmb-xiHRY','2021-10-04 17:21:11'),(133,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDI4OTF9.TfxWQMSK7EdHcN9fjDzlX-fLD7hmoA8EnVSxTxOz5tA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0Mjg5MX0.yV4TIOp0sS80lijPN0NU1_ZYyfBGginh2klXRL7tTuw','2021-10-04 17:21:31'),(134,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNDUwNjB9.RfCoI9f4WNJOAvDbpcydTFA0OF2m_-U2uouViZEGwiI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM0NTA2MH0.ZUcsK9H2YbLYReUUl2QLrZrgCFMiot5dStyUoMowDJA','2021-10-04 17:57:40'),(135,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzMzNTI0MjB9.anaK-PW7dOTTrC5KYEFL4s8bWfN-RkL_D75B3JIno0E',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzM1MjQyMH0.4SiZGaLk5D8Fu6xSWpa6mt4u7FSpWcc_gFw7uZv2Wzg','2021-10-04 20:00:20'),(136,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MDc5NDF9.HqJTbSW2zgo3tw1m5c9Giiq9xAYsmvMsikQOS3qzHqQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQwNzk0MX0.Y7uArzBvgd2G9WMH8KvQKVFnCQJMcKu4MSRjTWhrN5E','2021-10-05 11:25:41'),(137,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzQwODA0OX0.9MQK5mI_wBwjWyFoBPGehGQ1UnyEO3e4xLP9I_dpvok',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidm53ci5pbmZvQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzM0MDgwNDl9.T4lqfOrfZfnQtOoW0I7c7so-RgtOhDpA_PPcTaatlEY','2021-10-05 11:27:29'),(138,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MDkwODl9.uL1y_A9ok8WP7XZjgI4M2fToCI_1b--uKELPit6P4a0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQwOTA4OX0.LmR_fOHkpjQJTXX7HHUF07MBMcM7uqxz4eCcA1EZyR4','2021-10-05 11:44:49'),(139,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjM4MDR9.uGS5wLnYHmL_p9nEmvLhwtEsy1mUI8t-J-Uq5RF2Ik0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyMzgwNH0.44D5WIzy1qvn-Ia6OxZDyfO2sJ2_OdZDDnI9NWLp0Hw','2021-10-05 15:50:04'),(140,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjUyMDN9.Yrkz4FjFYDApc8Fu-7bXIaoqEE3WkIi8FRU-Ba59sxk',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNTIwM30.-gI56WbqjKNxXwYaH_Rwk7JLnHGDpF0TS3C1wXY5ONA','2021-10-05 16:13:23'),(141,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjUzOTh9.ntJEeymOS8SSWnw0bFO6xNA8KTpGQ9S8ilZ876dyEi4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNTM5OH0.LZjmXk3yinWWaSvBQzUTxU8c-IepIwc-isppm5obgSw','2021-10-05 16:16:38'),(142,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjU2Njl9.yD1UAQEfA7jsN7F1HvvG2V5Ntw2Qi3KKxVq_HrEokgg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNTY2OX0.2P5a6VFBO6puQdWkDLoW5mTunKz9C6Q2__RlbpY-Qg4','2021-10-05 16:21:09'),(143,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjU3Njl9.ASDNzDR07rzTFfkjfykea5emNvDe-oLXLrjosYRcun0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNTc2OX0.Fy0XdKPuBldicVCeJuhg5-wg3LqXvwf90jiB5ruv7P4','2021-10-05 16:22:49'),(144,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjY2MjR9.sZNdIX5nqXUuRKIK1tNoUJCInT3DlZSR1U90SBZ1dTM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNjYyNH0.jcxn-3QH6t6_2yUaYg29V2W4mFB9wIGsmvWkEum09EM','2021-10-05 16:37:04'),(145,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjY4NjZ9.52EF3Y_xwBRSwWgTAoGAXQe0jturvK0b0d5xSja-6Eo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNjg2Nn0.Tg43QvubLNuJT-s4H-e5spDVwKdpuZWky3bRWwsSukY','2021-10-05 16:41:06'),(146,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0Mjc3Mjl9.RpEAvbTSqwLp_AlgPd5yqUCTBclDnwSIXLatOz0MRBs',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyNzcyOX0.nhvsQASh3oh-6chz48detTGXqASQoSWoafMlf2UHXTc','2021-10-05 16:55:29'),(147,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MjkwNDN9.DgK9yeIyH48kDnf4_Xu_bDphv4Gh4SGEp3mfhVaGp9M',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQyOTA0M30.Tefc9RCh8RqjuMN7zxxfEIp3bNvsXo6Lvgz1DkS_8fk','2021-10-05 17:17:23'),(148,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQyOTA3Nn0.E-ZP8fqFWc4JCnt6qxl0Dmp7RmmNknm1ewNpqAohwq8',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDI5MDc2fQ.1DNNYGI7NcFBkOTrV4IWXcsy3tUg0TLnJr24VnQniJo','2021-10-05 17:17:56'),(149,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQyOTMwNX0.i5V6C8ABRyvgmK-iy18YN4sQH1cbw3khGXUKunRVzPU',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDI5MzA1fQ.dK0poErJD1bHGNS7su1QZi4JasSV_ZRjD4lP3d8mSZo','2021-10-05 17:21:45'),(150,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQyOTM0M30.bMDyVf5kuPO2yr2YmnKdKCoD63IYlDL5TsgST0-OiFc',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDI5MzQzfQ.7Aek4KajW66XU6V80FPcR2xId1ehOZ3UKXBqAVLnIow','2021-10-05 17:22:23'),(151,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzMTgzOX0.hxzccqm8V-_UXDhGMUPZ8AuiVsZULpWNQzVOP-QWZUQ',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDMxODM5fQ.Nae0YUh7Y-UXVpvkkD2UU8v8oEdDjab71zumr5WI23k','2021-10-05 18:03:59'),(152,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjIwMn0.m1nCqe7ggie9krQQLVkKpxj7bS1Iqil9hOPjv_XklE4',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2MjAyfQ.zwg_umG_5IUdSmtxrB6eCuQWE1brHRiKSz7vNQ0HWXM','2021-10-05 19:16:42'),(153,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjM5Mn0.f_L4wr8oxoJ6TmkIb7ynjFhLgi1rIulnKIldxpRiumk',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2MzkyfQ.46FSD5WavoNG1To619ScFUynXOc9dGQoSOiaC92LVe0','2021-10-05 19:19:52'),(154,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjU5N30.WgWROtoTGQPDd4XzWC_VryrQzRazAxI4tQJzwz1IjNs',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2NTk3fQ.xcmNmouFS-0vbe37dgb_1l-AyeiSIjK0omgJwLGcAGM','2021-10-05 19:23:17'),(155,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjYyN30.fKhbg2EI9GMyvZ4HRWoyY0h6VAHnucojYx_hfyUKEok',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2NjI3fQ.ubm8a7tmV5SONvA8iwAV1YbdQnxePT4-Pdd7ySr6Wsc','2021-10-05 19:23:47'),(156,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjY5N30.mNRMNOvQlfzA1zgd_VGBzJfLqwN_-9BOuNMFACv5GN8',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2Njk3fQ.35sQ_X1I1QCxqs9BymZeWIgErnfM89m6_0VGGQgeKCM','2021-10-05 19:24:57'),(157,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjc0Mn0.EyI9MjOzDC4hFCBUlneWthXBE3qAYtCGZcd1e6kuOqM',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2NzQyfQ.TGgZEbHr83BYBsutOqipONuUilBn-GbYCD-dYgX3wV8','2021-10-05 19:25:42'),(158,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjgwMH0.eSmXb8bZ5WSdDo3gKmbuCdPaqz-2rK807fT3uvmCtIU',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2ODAwfQ.-op0gDg-Jok6yxK-U-71vDMxfW4K3-N2bzSYt0jk3vw','2021-10-05 19:26:40'),(159,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNjgyN30.uQQ0XXBmDYt1_M5a_I789C7ypLfsgEHdQuCcjxLQGU0',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM2ODI3fQ.xYJann5UvPd_hny6NrrQxE6fbfMOa4Z9ovhj2GOdNHI','2021-10-05 19:27:07'),(160,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNzE1OH0.0Y_q2J56aBziRcxNX339UmPcuT-hTbJwVk2Re2OxTxE',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM3MTU4fQ.xA13cyoK0LBhxrmjCfgld6FGGCbLeVLlsL1sw-F69LU','2021-10-05 19:32:38'),(161,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNzIwNH0.iU_8nOt9WiRW0OCgPqftDkLWmMKs64RYAsQ-U-Zw-F0',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM3MjA0fQ.q-6vlHxNCRenbljUwa6j9nTuDNHO4O3srSMqN3BmZds','2021-10-05 19:33:24'),(162,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNzIzMH0.vDjkEdP8PJuQ2SuERScU3d2KFOxb-d3SCS_VM4YdUtY',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM3MjMwfQ.CPrXTsrlZFxCV0asv7Zz8y6gh1qzour8rhkeTiOGpcs','2021-10-05 19:33:50'),(163,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNzI3N30.6RKb4sOwHS7TDD_MWkb76fMh30TqPlU0jECkbymcghQ',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM3Mjc3fQ.Itv-AmaX3NP4N6VhTZRCa6xEXDTxcwvDF6FPvVEJr1Y','2021-10-05 19:34:37'),(164,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzNzMxN30.mZ4oG29lMigmOuTS6RIhjTO4MWb5h43XSynU-1lqZU4',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM3MzE3fQ.hEyjq2dI8H8h8IhTJL-L8FffSJ7Wi7h1cxicpCgoLgU','2021-10-05 19:35:17'),(165,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzOTEzMH0.tCxjmlnp7GpvK2uYQGftCmuvNjeKTM_chYnd7fz-yUQ',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM5MTMwfQ.HfObmt8oIgfrb1QcAYrpd44GxRI_Z-i4_XvLBNBn2_8','2021-10-05 20:05:30'),(166,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0MzkxNDR9.K2loOGR-VZQbKLmX0dLXFo0ZfPzOmK4NolIhfOW4t2s',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQzOTE0NH0.--Yrvyik8uv1cS0JmoUP0j0I1zIs8m_FEDMxw6Ap82g','2021-10-05 20:05:44'),(167,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzOTc4Nn0.6KtsOzNF_u-BcX0Id2rVSwMGwHs4BGehOHFavgp1Cqg',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM5Nzg2fQ.w1V9sJyMXD4LEQWjhXix-9CTJtAQFuooGnGHVfBm-aE','2021-10-05 20:16:26'),(168,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQzOTgyMH0.Ucs5ZLb__D2ucuQJMhoiTYsRPJicj6ATupJZXQjRAe0',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDM5ODIwfQ.RW0KrPTpoXVqg9tfV_gtpYIpAuL_iCOkPqqz_BVtHes','2021-10-05 20:17:00'),(169,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0NDAxMjR9.1eblmR-Wl4zgTk16ATGvPcXG8OAsM72GjqodoMd6GzQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQ0MDEyNH0.Mt9Y7ukDW1PIPdGVL2OK7g88xBTLvRC-lvnSvXlaJ7Q','2021-10-05 20:22:04'),(170,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0MDM1MH0.ho12a2qvjPZq107vxKRH5VXUAl6bquuuleTb_sMPigU',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQwMzUwfQ.d7JZa4ribpuU126U6E_gc4AFziUgZersJMFhkadV7n8','2021-10-05 20:25:50'),(171,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0MTA5N30.mz-vezRcX52tAiVRQWl8miBke1LVv0eVC3JkXKQ0Wl0',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQxMDk3fQ.s3wwqIN-yw3I7xo-NKl9Rau01t-qfMKb0MrnyxKKD68','2021-10-05 20:38:17'),(172,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0MTIxOH0.FeyRif5DvqnGdlNa4QixTqICBb9asoFmBlVpNAUhwYQ',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQxMjE4fQ.AW9lCKsiHioxVL333nNlMy1Z6dRYehfZQX-3b22IcgI','2021-10-05 20:40:18'),(173,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0MTI2M30.Fj6kJEgvTMVvhb7HRJpYzSqDYiPOy-ebNizEP30Hzpo',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQxMjYzfQ.bFGlzM1CJ0XUh60kWU2v8v5kUN_Wjf2Ci0m1pcxd-aI','2021-10-05 20:41:03'),(174,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0NDIxNn0.caD8CeQKxg6qh_AcCkksDHngDmPEM6eYTfdJSxFS68A',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQ0MjE2fQ.NAadPFoUvmB6E7Umk70jp03JrC8qmqK4edgKZtEtbR0','2021-10-05 21:30:16'),(175,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0NDYwOH0.Hf7U4SG5W9348SqbpQXSFXXNI7lTS9pTTuWr1B_O9xQ',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQ0NjA4fQ.8OsNKrurYSQ-oWHVBQSTv_jxnf9m0DcK-BXEyDaROTo','2021-10-05 21:36:48'),(176,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0NDcwOX0.YfFeP57MCkLScO0JWu3BGJGcE48pef-daoLMtsXXqkA',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQ0NzA5fQ.py3T5qYXtVM_dYmgR5soU1udGokVC8Q1-fV9qPTWBXY','2021-10-05 21:38:29'),(177,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0NTMxNH0.oqikMHlm21VsV1JdEuT-X90pghktyD28Ug0HxOSggk4',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQ1MzE0fQ.hZi--K01Vs9A9GYGBMNw2BRIEHnRVDJj1CyR7N2rEVQ','2021-10-05 21:48:34'),(178,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ0NTQ4MH0.ZQ0IO-r3ns1hJOcCojL0IciuUzylLqqLwbKi6F6_csw',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDQ1NDgwfQ.2LWIgcNr-3JJ07WUI59OMFykvGx01FN8_y_TSfp0T3M','2021-10-05 21:51:20'),(179,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ3OTY1MH0.OTkXo2IQyG-zZNnrSKvkQT8oC-yX5ghzifwedwqy_fo',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDc5NjUwfQ.FTqbDshBQxBswo0XesZskwR3BkTm2PkqMwfqD4sp8uw','2021-10-06 07:20:50'),(180,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ3OTY2OH0.4h0CLmT-a3ki9EeI7TEYmu5lq2J31Ef9FdKK2TJPlqc',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDc5NjY4fQ.yfUTpSOZ6zCrbVLdf_FvJ5x_ucFMAYj9kM6pMkKiRxs','2021-10-06 07:21:08'),(181,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MDMwNn0.EVs6Yko3jRY5f-mcRyXDO5cvjcJIWobGX67UrPblBIc',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgwMzA2fQ.4hKFOY9PffTD2Wiww_XCEhMXUl28pPdedGKkiyI7d38','2021-10-06 07:31:46'),(182,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MDMzM30.ufyFkqYgDIuBPtAT4VzYzNdb7F6znN39f7yvWHqB4QI',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgwMzMzfQ.UHZL3phu8Iu5Gl3eQHTLLHU7sXGYiCfzNsfSSAA9eLU','2021-10-06 07:32:13'),(183,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MDM3Nn0.bU_1FvpYnY2pu8aofqQoGDHKZDZ9ZfyF3MwnPemj7R8',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgwMzc2fQ.YiPZqz03RyHijbJwcMUY3vjr-csWuNPuIDyoOv7Jgcc','2021-10-06 07:32:56'),(184,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjAzN30.RaB_QPPICQ7uQ_W1IgmXd1quo14QIVrhPGzfAPATRYY',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMDM3fQ.l6rNdBz1dWSq4bNTgSgfcsatrcibb1CcUIVm0U-GkQo','2021-10-06 08:00:37'),(185,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjA2NH0.5s8KSeltrbV0DXmWJyhZydDCe-Tj0azK9-aSVr5R06E',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMDY0fQ.ju-0P3xjUBrG3VzUZMTuIrgO5Up5EVLVbC_V5t78nGc','2021-10-06 08:01:04'),(186,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjA5OX0._bYCHjIyI_b7z42zjO59D9EakgO6i_8kr3MKskvX1NE',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMDk5fQ.l9TQdQ91ttCVSNUpMQKmax8a3NNfG_G70xNdmkeMOHU','2021-10-06 08:01:39'),(187,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjExNn0.GgMsO02rDZxl4NMUIjga3r7svweBX6Fg8X7v3uhfP7c',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMTE2fQ.2-H4qZ1SplcqRFzpJGUn1i-xkSeH94GJmbMPUG2kZV8','2021-10-06 08:01:56'),(188,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjEzMX0.WhtygsbMeNmjRDl0Wrj4cfxqQF3fr6qytLc5mwS-t14',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMTMxfQ.xL88Kfvh2t8hIoT1joA4wRbKwi6JhKtETIEmBGBHdoU','2021-10-06 08:02:11'),(189,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjE1MH0.NP5INiMo_4kmEgdtTJbmj2BbAbK0uNG2ESnekxhDIRo',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMTUwfQ.m8qlWJfssqGPeQaRD-nuBGU2sJFxRh0tY2MF97VHS8M','2021-10-06 08:02:30'),(190,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjE2N30.Uavoi6457F1YqbdkzFhxMXCUudIMjRRx7KO76DaoSjc',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMTY3fQ._zmMwgC0phx1tupo8TWRGKIHIdRcRFG4w9gfnMFGMWQ','2021-10-06 08:02:47'),(191,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4MjE4N30.kUbON_IvP_Gih0-ElW5N7Q213e_hDlBI7kWoMVD2t-o',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgyMTg3fQ.69z-xDXqQA7eKdO6oDSvhOklpItnzC2cRaMfO8NWg5E','2021-10-06 08:03:07'),(192,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4Mzc3MX0.NVHVzCqnytCox3e_2pD3EL-4Y3tRghTOIzEXyGFEcHU',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDgzNzcxfQ.xkigcZpkosDJ7YnvNaLOOTBr0AXH1XK1hBn2wJLnyqA','2021-10-06 08:29:31'),(193,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NDA3OH0.6iKNGrZGY8wDh7aGY7dfElVLaWph0YirY_VE3NNdOkU',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg0MDc4fQ.rit1wuRvKenBpuMoTg4p0g6LCeHPzWOIcrZSCgYpVCM','2021-10-06 08:34:38'),(194,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NTM0OH0.9nxrnr8b6XA5qS8GA4C6zvgK1mhJVKvNREXJjU7tsKU',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg1MzQ4fQ.z9jv0OBW_ZWFo5TqmxQVP-XGpl-BOX_9AJmYLzlLp_0','2021-10-06 08:55:48'),(195,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NTYxNn0.fVax-V-ub8RbNv2aVN4KjEFf7nezQUkECYrav02ttn0',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg1NjE2fQ.bD-Oz_PJ8JjQ5Y-Ob9J43IPa6FzOLXlmIsxtnPSFvrY','2021-10-06 09:00:16'),(196,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NTY2M30.qTsAtFazUUVI0bqdn3xLKTeDLGTL-35cyRKiVFM6nnM',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg1NjYzfQ.G2buJ4HTLRMyRwcIEQxZExMnVq2363eRhAtILqYmp_c','2021-10-06 09:01:03'),(197,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NTc1OH0.2HEEI_yaU7tEzZEi5OmrZ9MmcZ-09nzJewDF7NQz-ko',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg1NzU4fQ.2mub7HKDwJyVxxY1ct2bjTTgftpxlp0Cd1wXlZvogmY','2021-10-06 09:02:38'),(198,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NTc3OX0.RJNjjKIL3xdnS3yBeckS_2mLVN5yFxNEl5Xmkr77AK4',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg1Nzc5fQ.IxGiIxCFtk-wBmgD3IIj1-0N9qzS5ziNKL7r5Qvy5RU','2021-10-06 09:02:59'),(199,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NjEyMn0.uxQqk2Sa2mSA9xOd5DRWcWQXtapjJYMSvmUNB0JsJdE',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg2MTIyfQ.qQhGJUFWb0SVD-NnjP8gbvaQJe9lz6AXAE9kfTG7lJA','2021-10-06 09:08:42'),(200,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NjIyOH0.LXrTGHEBYhK1ANm_zySW3eKNV_FNHrkw-TqVvVeSfvc',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg2MjI4fQ.v221-o2WUJGtRWFi3aZZXmvZEDZTunwgkowq_Y33zYk','2021-10-06 09:10:28'),(201,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NjI2Mn0.GzKKyP7CVYFvSImkYeq2sjGERDioacVaJoY8Lpc0Ess',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg2MjYyfQ.GmTE5DrJ-3DZR_ayZ0ZAYr1n4fMriKuwSoRilfmxj3M','2021-10-06 09:11:02'),(202,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NjU4NX0.nOgHTeeVRX9g67WbBnKs_A7bEL3uwv21UNVbprstcH8',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg2NTg1fQ.PZKhGWi3rjRa06GCE_kQutcA790MQGXZoGkxykRxv1A','2021-10-06 09:16:25'),(203,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NjYxNH0.kNyqNg6ttI_12_iDOQKyYgTccs3_iF67xssdbPD7Plw',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg2NjE0fQ.7_XIfbsIuPsgXBZWBRWplyQZyy4OoI-BeOCiBeWY9UY','2021-10-06 09:16:54'),(204,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4NjY0OH0.X1zager0gQAfmabsFrbKWvK1wsR79-Q5tuyGUDOE0fk',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg2NjQ4fQ.HUcdltGamY8QynISTBKmggQgORh0WQLay6m2Ma1lWV0','2021-10-06 09:17:28'),(205,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ4OTIzMX0.50Bte2XUk_FDyUrHZigykYUwTy4NTQSOI3wg-Ljoen4',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDg5MjMxfQ.mW0JhDA-UJUpWPSx_nlliyl6TuK25QlRPQffU4F40-4','2021-10-06 10:00:31'),(206,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzQ5MDQwM30.Z127BAErzFXw0yIyvJBlH7LmtbYkh3EQSwxVnomSpLA',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNDkwNDAzfQ.b4f4zF2npRGoClo9oT2FzJ5zAVCCSIIjBGMaq2VgN1M','2021-10-06 10:20:03'),(207,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0OTA0MTV9.bncmLjJE_Px5UtB-ruHFFuQU_FhHWj8hr0Gn4e9ewJQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQ5MDQxNX0.Y_OWjCWGqKT_2xVnr8tl5b4ZJ38GX7RrqKkEP-01JZA','2021-10-06 10:20:15'),(208,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0OTE4NTd9.BOD_j84NCi7NwyLvp_cxjBq1BfT966tSR8Q33W99sY8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQ5MTg1N30.DOFiQqDN9T1VzY903hBcAbv3n7oun3NDjdbc_DW7ud4','2021-10-06 10:44:17'),(209,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0OTQ3Nzh9.h6LyFVGobf7NyTaAoeSJa0RRlgc__9bTnTtgiCQ4OTI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQ5NDc3OH0.lb417V5h_AZKbvZx3eFnWCZ647d7anDN0uh2KvhotAY','2021-10-06 11:32:58'),(210,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM0OTU4NzZ9.JpDq2a3L9cbVsgB8QKAitK74saSy3Rgo9NxozmIGjZE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzQ5NTg3Nn0.KG4P8Inbv2j9CyBJ4b5anVoh5dEYaoy2ffi8SMk7g8I','2021-10-06 11:51:16'),(211,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MDM0ODJ9.ojbCM7vAa1cXJwVCoerp2qqmWjiwNO87HURqf1P5ff8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUwMzQ4Mn0.2XhuYM-NBeEcCfoyF2SzfPSAdTmbIGmhjqOitlhJyp4','2021-10-06 13:58:02'),(212,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MDU4MDZ9.Ipg5lyigDbZGQ4lo3mvpwHrY2SWiO_vp0C51v-TvAOQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUwNTgwNn0.mDI9gNuVT2uI9Cjuqk9JAZe4Z0XUDYfcmD8h9LduDHY','2021-10-06 14:36:46'),(213,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MDg1MjJ9.SOr5i3CuqILOUw2BlHgjIOZfLZnhfrZPKG3wdjrENlg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUwODUyMn0.meGm8z8toVxMse3sWpyr3Nk3fDGUu7jg3efhQUU-Y2Y','2021-10-06 15:22:02'),(214,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUwODY2OH0.P2LMUWY74ZfGtFvcXX9gRZv5UAFQASjz1HNN0wMVChg',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTA4NjY4fQ.mKs1wwda9LLhzKQeilV8KXjodnDqUyN0vDBjd1QpW1U','2021-10-06 15:24:28'),(215,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MDg4OTN9.9vRyGvNLrSfX6GqwtjxMCvTOrf4B7aXlf4nQV-VUjQ8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUwODg5M30._ptDpUPh6-EWxDu2wi50ljyoXfIqYyR-mj-rBEohO20','2021-10-06 15:28:13'),(216,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MTA5NTd9.r3uwu8ClL1U2AzQlIhlMFt2YpquSkfAwowM2I02lJSY',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUxMDk1N30.Vj8wqcPw7hJHM26UOT2zPBf63s5kE9zQnoEC-FTNmno','2021-10-06 16:02:37'),(217,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MTExNjF9.ICN9695PChUd-vjA1TDvCktrdb_2S_u5F3m5jQcJmOs',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUxMTE2MX0.vPbjwkCfg-xV82Hzpl6eo-n5wxvAnzKUL4chWja1b3k','2021-10-06 16:06:01'),(218,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUxMjExNn0.TwMS5V5mmu-Lc53mfnrKeVMf9OKERkWQS425ig1cCDw',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTEyMTE2fQ.HFd6sB5uuVHJm3O1ZVXHJgK1uyLKU75oZZ8BH-2d71Y','2021-10-06 16:21:56'),(219,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUxMjE3Mn0._X30eUJ_DT5FWCYFQ3BZv0T19LSEaTp7dabw7kKwRG8',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTEyMTcyfQ.m6YB3jsrodShwfftEPt7DnsMcIGFrPrgFqnwd9Eq8ZY','2021-10-06 16:22:52'),(220,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUxNjk0M30.8tleM2dLW2LmH4Y64mpCe7dl5xM3FbNcn6FK5RZscTU',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTE2OTQzfQ.ClJls4Yhr3GrlCsC1ZmUfXfx9jLU2c_YgXIsCElG1SA','2021-10-06 17:42:23'),(221,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMDgwOH0.1kQgKmKhtQGLFqH1Xn3HWOnZLtThsXMmLTWsyqElmy4',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIwODA4fQ.HK5GkDJJFJs7znFfwRg8XV5Mi8YrGE4AUxB4iweuQQI','2021-10-06 18:46:48'),(222,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MjEwMTR9.AuMh1cTTLqomiLZcgNtsjD7k6MPNFonfMtVApmoO3f4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUyMTAxNH0.7Xf1oQcjMLNFD6-750tlr29arWdkV2VHn5EL8lAbIZo','2021-10-06 18:50:14'),(223,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MjI4ODV9.Syv0DFHtaMX_6K0SA2dTvR8ycRJbwll6ffZFyCJGHBk',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUyMjg4NX0.LmfkpGcsBd8flltKe6R-6rU9hqj5V8hLahnPnwKAxOY','2021-10-06 19:21:25'),(224,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMjk5Nn0.XHYgBe1q11mIHGt0Ifi8JfGVwU9pj-yGA4-7fFZnNlM',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIyOTk2fQ.QgCtu3ITqfuW5ROeT6pDxgAo3mCG6XUmt2NgO-e7uMM','2021-10-06 19:23:16'),(225,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzI3MH0.iPdPSOXuyjvjzNha1W7m_Cna74DcTAs5HrQsa4g19Bk',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzMjcwfQ.BazS08PU0zvlLNLUpE0klEfeozGHyHs4w-70D7U68HM','2021-10-06 19:27:50'),(226,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzMzMH0.kRZaLVhZUEfbER-E3QglVN0WfSRvNS9UrvBpprj-sb4',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzMzMwfQ.-vxVSYa0vXqVEinfx91XkFPT-Ua7EE5oNwOtXfNR9Us','2021-10-06 19:28:50'),(227,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzQ0MX0.afoRYptDOw4xPT8KavPAtSpIBskNsukLx2IoJ03a7EU',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNDQxfQ.HsUhUQdeY-CyNIuV-RoqzM-gNa-2BiU6x1wp6YvIWoE','2021-10-06 19:30:41'),(228,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzQ4NH0.skFZyJMfWbAHrCFfadUJqC3pg11uXx1efLeo2kDVG08',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNDg0fQ.02NCM8fAnuBpqk6pJfAgMX40dq8y26vKcEu8-LKB5uc','2021-10-06 19:31:24'),(229,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzUxNH0.2qZvV1DKnVVJnzPRQiZ9zNok4tX5CchD0seaJcAyf-g',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNTE0fQ.qUnNcTvPwltGxqLxVSYxE6p1Mn9Z4Ni7qAIQCg3oOQk','2021-10-06 19:31:54'),(230,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzU2MX0.cr_xX7-ncfFwlln1xSYttN2JjCQHD4PjuyNFtz92qXQ',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNTYxfQ.eeH5RF8h_HdKc7rhx7EXGJfWKwqK9mUlCDtrUHCqFLc','2021-10-06 19:32:41'),(231,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzU4MX0.TqyAxt85UzdgTLj8_GqtHCfSRq75CE3C8m4nBWQNZGI',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNTgxfQ.Ha6zSAx0AX4w0BVd5wHakL3uL4AEQDWS3yUT_rqNM_4','2021-10-06 19:33:01'),(232,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzc1NH0.VH2SQQIavvgl-wpilCEOcyxYcIRbXUjD5qvqGd8FnE8',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNzU0fQ.LNQbThueW57FfTo4MHb2AT8bnDkucZUAfUBdAPMpY8g','2021-10-06 19:35:54'),(233,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzc3NX0.SRpXDRNmgEN1jGFkWltWhWwmfeFMCoRKDvACqqmxebA',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNzc1fQ.Zmv2fpeOdIWrWh5yl0ApFEwIfpYSFYlHN0JEeS5kloU','2021-10-06 19:36:15'),(234,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUyMzc4N30.qeiZA62sV7Rvh6dPcCfH2_h7SPRtzKH_dd43sd0f1n8',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTIxIiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjMzNTIzNzg3fQ.jDkFOdAqKMxUvy8eu3pxSm9yxxPz7HXvKf1yUdMQs4w','2021-10-06 19:36:27'),(235,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MjM5OTV9.MwqmWd6M5TLZQiK_qNrZ24r1Zgpo8eIKtiZ6EbjIlXU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUyMzk5NX0.hwJJSBJKB4k2L31MeXkC5dFlkO744c5li0i8vtp4Qm8','2021-10-06 19:39:55'),(236,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Mjc0MTl9.qZi18pgKFc42FbDuAI9RuVduG5cS4BndrXccOW3yKPw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUyNzQxOX0.OyUiFVh-h2TyxJa9CoU5VsosBn26u61E4lj6hh8ScNM','2021-10-06 20:36:59'),(237,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MzMxNTJ9.RAqon-jSwuiJcOiJ5qixjVtp-WBDh25BgC2vVIolA9U',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUzMzE1Mn0.6ZJh_5gWpud7-NjHUW4PsuXteRorhvBDCv6Er1DN5Fw','2021-10-06 22:12:32'),(238,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUzMzIxOX0.MAl2GZEW-f1EVrVlXW-hQkoHSkv5EeDGodwXbU0HPBA',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1MzMyMTl9.jOfIxTZxqM5XM2nKwUUw6RU4fsCr8eHhFZ50cNL6akw','2021-10-06 22:13:39'),(239,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzUzMzI0Mn0.7ANC2qycUqOFY6vbOoaPaKCbJRkFjpm2Rj0zIIvSQp0',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1MzMyNDJ9.3DWDiE4KlgRYwPJyQch4cP6_CdvHXdXpenuLqLu8YUU','2021-10-06 22:14:02'),(240,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1MzMyNzF9.EFAY0woX-1RuREiPgv2O2FAX4hOhhc95Z6VR2U1Fv0E',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzUzMzI3MX0.Ot_-WsT5JIIH8nBfGGv3JDou0WmSdmOvAJ96YXAWdzI','2021-10-06 22:14:31'),(241,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NjY4MjN9.T1G85wA81egBdi4LLfoFiQs6y12br7KdIJHc1Ghe-aQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU2NjgyM30.Vb3DvXlfYLsI_IlKuwzyXNOR464Xq299EVi7L6EYrMY','2021-10-07 07:33:43'),(242,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzU2NzAzNX0.-Hv__-oJ7oppsgPJmkHOLOhLUU4-YUoIF5caEhQFUV8',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1NjcwMzV9.0nfM94cEjMiITQbjYtaJiLEWRujsFj7f2CbzYqa821A','2021-10-07 07:37:15'),(243,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NjcwNDF9.t6THQprmfyfV_D4579GN2r1uP9bXVb4D8Nh8m244qlU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU2NzA0MX0.bUaOJaj7lEoIfPV4894NvdGj1yeV7P8MXggD059RpSE','2021-10-07 07:37:21'),(244,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Njg0Njl9.Y1Es7HoTW_5onynxAKcRwivNsQye1Ed6etAXMpAyYmQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU2ODQ2OX0.I6XWlQIOEbTPE-4W2Upt-6Ae5kDQRtgjCFlBOfm0My8','2021-10-07 08:01:09'),(245,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzU2ODU0Nn0.jzBKOptmSNOVliQMcoWErM4ddNP1NsJpnVPTvL7pylA',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1Njg1NDZ9.09CUYRBRRrnKq-zMvkoXNbzHlhyuFJxEUfj-1sUtfWc','2021-10-07 08:02:26'),(246,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzU2ODk0Mn0.FlYQw4gN51E24dpML1_1wc7Mw14yOnjSgF05gPdt-s4',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1Njg5NDJ9.KACuPaH5oMBjQ2f7RiqTW6oL305QAM_1GWkrUFtbB4A','2021-10-07 08:09:02'),(247,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Njk1MDR9.5nup2wrxV5-3QG67WjVOsNcbMNzIcWXaewm99oTl_Lc',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU2OTUwNH0.KxrznIoidZdJi5vPPKRw5ziGQrmocWcnQma34tYGsfQ','2021-10-07 08:18:24'),(248,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzU3MDc1N30.qRl3O1viuWngL5PgQEC1J4rDopyC5MwGyqOixTbLNrw',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1NzA3NTd9.MxjclnsPpM3MCZg3RLdYui_9SNrVSm_hTPX4CwJiNDo','2021-10-07 08:39:17'),(249,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzI3NDZ9.2IkfYz65MBuo7-u_HYtKVla9WL5gqQJM208LNuWyoxU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3Mjc0Nn0.bMlI9Ujv3TdinCtxnWo5Y2CUch5XDTCiABtiphb5pTE','2021-10-07 09:12:26'),(250,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzI4MzF9.vNsB65VNP0ARhNbX6uZVAA-JK6SL3eJJ3hiPn51d-RM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3MjgzMX0.YUsahzM77PgNfuJ4z0_aoQr3jNNyZqmOkRd9CTWaSaI','2021-10-07 09:13:51'),(251,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzI4ODR9.oz_tf13yLF-GcIcLv-d9dLKTSEDSCNiQasQcCdPwuHU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3Mjg4NH0.A-LAJNCyDF_Qd5dO8KtJncO1cY6vNsKzC3Mz8Rt4JhI','2021-10-07 09:14:44'),(252,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzI5MDd9.cruVaVDQRQAbYPim-AhujsG5KPILCUPo-4L2M1qoYuQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3MjkwN30.rWOhITWu3W5AQb-wTtOwuXtRI5smtnpn2MZQ1BMsb-8','2021-10-07 09:15:07'),(253,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzI5Nzl9.ymENV5b2V68jk1vCvfv1Yplt_iX8YPj1fcDxMO2_i-4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3Mjk3OX0.-MgEp2iZ_MJCEfXmxSMpm03-O_x1PXPbhWC5YrjGMVo','2021-10-07 09:16:19'),(254,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzMwNTl9.U6PwDCnZtMPpmlnUaQhzQW4yiBxPB4Kum0mYAxQCRwM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3MzA1OX0.oGCzMq9X7xeqWTlWUTHLDIbzOiduTUc4ER1I4le9yX8','2021-10-07 09:17:39'),(255,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzUzNjR9.WrANkS-80o-oh-Joo1SYYeModXaOBN8v8Xwj4UYeaiE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3NTM2NH0.XaLJVO31E2fE6oIk1Tev85yRdb82RDo8qHDFjeob1vM','2021-10-07 09:56:04'),(256,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzU3NTd9.f4ZBOekddFiXhLTYcB9N40jn9H-VqrqscbB-pzDPYOY',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3NTc1N30.DLDh8-sfGpD437W58RYBkHRAMMt6pytaXaIQJAFLQ_Y','2021-10-07 10:02:37'),(257,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1NzY2NzJ9.Cp6Txr_junhKPu1KA1qWbp7obvh8Mq7TAIJIIAnG2FQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3NjY3Mn0.kyrYu1k-uBhzn7mQVh5_bJIk1C_oNuRn7F2UtjQ0fd4','2021-10-07 10:17:52'),(258,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Nzc0Mzd9.yCfLXK_g2YTwoIIH-2Jt6ZoOXSbXuFlO_q2yqvFyc7M',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3NzQzN30.1svzy27kHOU6_A68E-G87VV-_JK1xIeSNQRMz9hTIXA','2021-10-07 10:30:37'),(259,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzU3Nzg3Nn0.jQRZN0pF_8iNOpikRCn4b1HSG49YtElBkLIemCn8wDE',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1Nzc4NzZ9.79EEZUsJPUre5CN3yFX6yDA6zjeaC4dOJE7hzN_POaM','2021-10-07 10:37:56'),(260,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Nzc4ODF9.vpTppDXsO0dTMfPkUbcHDMTb6yQ9JnWYlqxXCyDT6_E',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3Nzg4MX0.r0fbG8pAfAK-8Ggw0dDoR0rN5idBNLynD-YjMXywQ8c','2021-10-07 10:38:01'),(261,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Nzk4NDR9.3CuZ_djqAYZ8xOnSw-aaQKWTh_DocIAh3akMxZqmBvs',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3OTg0NH0.MZm1sJDVHQffXbcEKBo21CmGO6gD-OeOW_9hczUKqaQ','2021-10-07 11:10:44'),(262,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1Nzk4NzZ9.nkfUWjVrq_BwKeQ5E2nFBATn8cDTuX5zJaivE-4c11U',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU3OTg3Nn0.Z8UsA4BG9nMTP9yICJOlotEnYGB-fpHZ8g-Lr1M_Z1A','2021-10-07 11:11:16'),(263,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODAxNDR9.cLwwE6czcL3M4_qdKJ9WBHsTRyXSw1s1COHzygdl7uQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MDE0NH0.JLjDkDI1yTmuB2-sfDfu8i-biZRuCIaZfE8-U_9Etjk','2021-10-07 11:15:44'),(264,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODA3Mzl9.u0VZ7KINIpRXZqzUcEMZul0r0Suan1dEISikGbSGEO0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MDczOX0.9nE7htdfrYfzMM2bHGRL1CWE-5KyAsaMcBvfiIyWjG0','2021-10-07 11:25:39'),(265,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODA4NjV9.FTCAbC5z4Osp2h9HvyMaqAEwFkIV9Ey32FE73avRQRQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MDg2NX0.F73POYjd9gE2BTSkJEgtMokiFVP8qgtlA2HUvodagrA','2021-10-07 11:27:45'),(266,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODEwMzB9.-D1KNsM7C55FSdg3sOEh9YU12lWsYUTEfsHsVAEsex0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTAzMH0.DQ8siFYyVSR3s1-aEY-Y6whqEY1sEft-l0Fwm2R1fkY','2021-10-07 11:30:30'),(267,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODEwNzR9.uf-SdgiVVvk1DE2Se2PtLyCpQOgZaAmjWfBBUsYzvVo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTA3NH0.QOtjmH6UcSyV9II3ImMCNbH48PnVnWeMevuAXiO19dg','2021-10-07 11:31:14'),(268,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODExMjd9.qkYH-VVsO-ecA78e5s64Eaf-qD253fN2U7p7WOx2Y_M',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTEyN30.JL5Ye8wAjrzwP2yG40CvYSm2X8xR-fP6d56IFIAC5xM','2021-10-07 11:32:07'),(269,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODExNDV9.E-7G0FmmditXqG6LbK7FDVWjDDFOBHLdkjjPWygVejE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTE0NX0.RMLoufQ_qMr7tlxvDXu_y9dk0s8cHI7nnSE-OPV25PE','2021-10-07 11:32:25'),(270,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODExOTF9.Goyz5dSyOHOf_20nsEIjJ6wl1irQdjJIWluTEWAFrow',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTE5MX0.nf29rf0yPScl507zXmon3NRZb3Yuy-P9xje4mLfZewo','2021-10-07 11:33:11'),(271,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODEyMTl9.w_C6ErOxuFzrtLyehwkctefXBLn-XIvOEIKhwUmjuBM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTIxOX0.9iYD_TAz0HXsIzccfWd9Kir0oi4kx5IePvggukE1Bk8','2021-10-07 11:33:39'),(272,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODEyNTV9.3opSUKpDCjFlgDa3gqm0V4PAJ6BD6ZMFaNjEljCv0NU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTI1NX0.VuTZnvBElkSmm4pO62FimAJvWaIF_KrpnNumAJxQJKE','2021-10-07 11:34:15'),(273,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODEyNjh9.qiyFolsZQKTHIXPoqh5aa9xSAaDIvmz0qVowaRXTA8g',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTI2OH0.ydtS08UMO5XxaZ3Zq-qJj16AqDtEHPnlBbMTCfahKx8','2021-10-07 11:34:28'),(274,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODEzMTh9.5XjCfy5JIO0L2i8zLP9BXAGMwkQhbAFlKAxtVo2cUAs',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTMxOH0.eS2YW_IvCZMurTINlZTvx3NZCFZyJftMAsji0-36vHc','2021-10-07 11:35:18'),(275,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE0MDl9.U3MVaEE_e8Wip3k5xbiHxJZwR16XPXJRK1LVXq041YQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTQwOX0.87cwrQsUqMHUaZI0MakWUqn9x8x-W_SGIYctpTLwFxg','2021-10-07 11:36:49'),(276,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE0NDl9.ij5wmpwnEIxn0hNPsGnsrSbTQWn9zuP_jBm2aNTVLt4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTQ0OX0.FyC7qfl7KUHW55a6ciVQdQJfdCkGhbpXkPy2CaR9TMY','2021-10-07 11:37:29'),(277,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE3NzJ9.NWQbAyJXEzDBi8tHhu6PZ5ZGWDRrrdAgN5NdLuKrfgc',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTc3Mn0.HRU5PoLy7HiwYKKlghuxFhr7OsDuorooQ2zIvduizQE','2021-10-07 11:42:52'),(278,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE3ODd9.MJ8Zk0e_Yj2DTko5xyI2F4KGM2rtO3iOD_7nCIuTteE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTc4N30.nm_18MWV7zdAcysUIct_3lzlbTVbNQfiYkxZ1AUQQuw','2021-10-07 11:43:07'),(279,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE4MTF9.zBrcO5r61blXllx2lD-xO17_8IB9wXQNtKUcmqrXmsU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTgxMX0.zEvOoNH4KT_na5aH-2ObeCZfOKWuxc5WzdZL6m6xmww','2021-10-07 11:43:31'),(280,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE4NDZ9.e7fTsIGuDftx0EP3bgNP9N2tt925jawehKI6LPRIDn8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTg0Nn0.XkVa2jsFjHLJMhCrgyrleF0jSMN6PlaH0kNru75fuII','2021-10-07 11:44:06'),(281,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE4NzJ9.LQXgqd24zaNpnFlALBcZb2vO8wCSs0i3FZvwU0YTuXQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTg3Mn0.Zra0qfaZGFLg2_EI5hZ4XZltQ4mloc4Pf8K0rYO4UtI','2021-10-07 11:44:32'),(282,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE4OTl9.rzFe9mzU4mvphrq0K_twm-e3JDalVmiTBqn7n3jl54M',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTg5OX0.Tkz0HPs2IgtEvq88v5o7AEJsC2zRPV8ZwU704RWIr-4','2021-10-07 11:44:59'),(283,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODE5OTd9.b2Yzrs7JgOzSFQdLCtr0NBnXezmigztmS0PzlzpPWXw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MTk5N30.jL6MaWtVXa31AW-sHz8lO1v-ur_56QgoQRcv23bveo4','2021-10-07 11:46:37'),(284,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODIwMjl9.Z5rHTede_Art_36MqIsKS7XrvVRjh6q1xjoeHZkkyzY',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MjAyOX0.Up8YYPeRUuuGT5u_G2pwnf5QGMl8W1HXa3NxREx21iE','2021-10-07 11:47:09'),(285,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODIwNDJ9.Ya0XtSDYs4lZutGF1N99tai2LOD5VwoXTmzRMP0sBik',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MjA0Mn0.fqxnkxhetWzCuPWXdrNPp5YaclgAyr9mg_FuFzwtwdk','2021-10-07 11:47:22'),(286,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODIxNjZ9.6BNbXTKwqvDiU2Vq4yL4mpchS5eFJxpLvwatNgSyVTU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MjE2Nn0.Szt1QxVACt9xpZsu56aI9pFRtPapbtyQZ-2eX1Pwdtk','2021-10-07 11:49:26'),(287,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODIxOTZ9.8eO4TO_by02M3pbf2qSR4X9dgXSvho0oGGPdxVL2oZk',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4MjE5Nn0.hp8wXehYkN1cER4QTve-U9eoKlM897GmDkSrfHllp60','2021-10-07 11:49:56'),(288,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODQ3MTZ9.lRQXCMQcDITJFyfDT2YBWlhOErGygabyvT2kx_MjULo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4NDcxNn0.twZkZv0RhdunIGkyljY3HI1E7gqC-1f3XJ1GcfGAgVw','2021-10-07 12:31:56'),(289,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODUxNTR9.u72C0zgCmBwRVNBkQhJkGt9UiE9XE0AXH5lRxa4CaEE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4NTE1NH0.UhMGGEi_N9y7pBZYY9YkavoRAeCFordVEwPRgcy2GJ0','2021-10-07 12:39:14'),(290,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODUyMjl9.MdHjJxmpVEwEs30WcN27M_-yUx98nAMETO4zTaUhvzM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4NTIyOX0.QmOB1atpYSDPLgbEoKiTwK5UqW_RBULZTGDwEAb9nW8','2021-10-07 12:40:29'),(291,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODcxMzF9.wrX4BtdUDI_LorV4pihNyiNAjArWkwxTFfKIFRgClLA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4NzEzMX0.yOkKDlYt3QzyjwjqyEb6SRKS0xzt3BlCtoVePlI7-tw','2021-10-07 13:12:11'),(292,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODcyMjV9.7Izf5FxUbXp89Ob_2J9Hfdzw3HBkpX1ioDGp2FYYDXw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4NzIyNX0.f8aBpQPlEgDcMxLk1yZBtcLX46yvHwokwvrkZnhitGY','2021-10-07 13:13:45'),(293,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODg1NzF9.UZCMn5l4KWvgUaH5vOqo44SJZXya7pOuObU0en6ZuCQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4ODU3MX0.fXRXlEMsTced6du_G9Xa1yFxAEPpeKKf--vUcC6eaOY','2021-10-07 13:36:11'),(294,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1ODk2MzF9.tlORLkUnEg94olMKz5vFBugCXUOiKAI1U9hJnOYbWPU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU4OTYzMX0.5COnpYIHlAWXveH1mTVJdnQzzuAGCXwtBHlTV4wE-QY','2021-10-07 13:53:51'),(295,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1OTcwODN9.nVANRgi_GDNZva2p42FJpcPeBxXQXYY_PVTz7IvfS9o',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU5NzA4M30.WVUJGPlkbCAkSe3SwxRx1Fo4Yg50lrMRqunjGalvTP8','2021-10-07 15:58:03'),(296,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1OTczNzV9.HskiGvDu-8SwMkcIPTvOBSHymPMwhGQlTIfs3td_eQ4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU5NzM3NX0.idoPVIK6GjGLHrCX6vY6XUX_LflBBabAuUPsmhoZlI0','2021-10-07 16:02:55'),(297,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1OTc1MTJ9.l9O46WR-zvCY2aYxwevFgftY5yygenxovLfbH6zVPs4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU5NzUxMn0.zyhg_rbrwnK4IsizPjUlcJLR0S78f0I721rG9L5dEI4','2021-10-07 16:05:12'),(298,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1OTc4MDB9.eaOgymvu5bRRCldjvTubDBOf0iYvbFYw3jZAob9Eh30',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU5NzgwMH0.0mjFxp8hZHcvK2hoLc0EH1idLgFuhfxS8Ri-VukEBf4','2021-10-07 16:10:00'),(299,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM1OTgwMTB9.i9uRKBin2lYR4En7DfjiIdHs7QrhENRMGDZV_TrDmc8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzU5ODAxMH0.ougqhRkhrwBPif7PxACXU_gqljyDVgjrEQrgwE6XEcI','2021-10-07 16:13:30'),(300,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzU5ODMwNX0.p0VYPwDk8SYMvfTV2EqqZ1LYZ75g5_Wz_5fnnPlMsCU',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1OTgzMDV9.gWnSrpl2tkkXBCyOwfpYVJL98wgWW4FuFlYh7iMxClM','2021-10-07 16:18:25'),(301,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzNTk4MzY3fQ.4Ala9Zokc-Ioafh-4bPRnB_G5WIgeG2qF1vaDYV5Sv8',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDk0ODAzNjAxMDYiLCJ1c2Vyc19lbWFpbCI6ImN1c3RvbW1lckBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM1OTgzNjd9.6dxgQG_LSDQWf7K6GBQoDPQITHEM5w-urQ8qLXZlvpM','2021-10-07 16:19:27'),(302,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzU5ODk4MX0.4H0JLogRhsRZaXLLhaXctcUDndeGeTOZ5y5Yd7GZqG8',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM1OTg5ODF9.EKYD3e1lX51f4M38ZYThyyQ3hO62FpCMXZ7fnDDoOmM','2021-10-07 16:29:41'),(303,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzYxODM2NX0.aquafaGam0ceyaMCYTiXE37WrHcL2XCO-I4KhPQsNTM',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2MTgzNjV9.BnX2NkOOXNmeJBbLBj6f6IyUjwykNgCtZHBHMq7A9F8','2021-10-07 21:52:45'),(304,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzYxODg0NH0.x984P-d_PaM2BsObjJ0fRMM-4FQj_6H2DktzAkBd8wk',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2MTg4NDR9.GqgOzqLl8MDmjlLnUW-Hm27EskNWi1f1OIDcdL8x918','2021-10-07 22:00:44'),(305,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzYxOTIwOX0.B728Tqr8rmhCcpD9iM62kalg1m9YaDNvv6WpBkZqr1s',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2MTkyMDl9.-guiXXxlIg5aEh6W8YmkNlobWECulCRi8_CEb7l9Nb8','2021-10-07 22:06:49'),(306,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzYyMzA5M30.jvC1ZdOEiCFGGoMpSmo7BzdhgGqj9_7IBxu2oJ7RO0c',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM2MjMwOTN9.h6ZG5e5RuEMOAt3cLX17W50mObVsAXo2JC72QIjYEzU','2021-10-07 23:11:34'),(307,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzYyMzE0N30.eztx5rqUNz8kn_QF964cDcAvlU4YU8MKiZ5-zjfo1TU',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM2MjMxNDd9.UNSZXr2-SIJdc5D_6WnU6GcHnfdOAQm8sUpqBObEZxs','2021-10-07 23:12:27'),(308,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2MjMyODF9.L7kH21phAQU2oMrZ-25W6SCcU6KAr51Fq80sI5c-6EI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzYyMzI4MX0.-xl-eZ51cV0FZ2LUgak20fZ_4YkVsaOCQKjLzQW9Rac','2021-10-07 23:14:41'),(309,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzY1MTA5Nn0.Zn4PX_rR4LvgjW2f5trIUVSMtCGRpdTcBZGRV161x7k',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM2NTEwOTZ9.kjhlsvrZgj73Px0i9kGl5HMp3Sj4adPJQSrg9k9pSxE','2021-10-08 06:58:16'),(310,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzY1MjkwOH0.QEzCSkF0LEI06_l2ijNxZ-4juaUbzWflu6rVdrrdMXs',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM2NTI5MDh9.raFVz1pgTMyoTbqvE8vH3Z0oV0cmQ5RiW9i4vL0fnNU','2021-10-08 07:28:28'),(311,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTQsInVzZXJzX2Z1bGxfbmFtZSI6InNvbiIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzNjU1NzM5fQ.trRMid_8houWRdBxlxp8hDZVQnYiq1s4S7GdawGqgcI',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTQsInVzZXJzX2Z1bGxfbmFtZSI6InNvbiIsInVzZXJzX3Bob25lIjoiMDk4ODk4Nzg3OCIsInVzZXJzX2VtYWlsIjoiZnVuaWJhYnkuc3RvcmVAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiI4YzgzMDA3ZGY4MjBlZTBkOWQwZDI4OThkOTFkZjFjOCIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzNjU1NzM5fQ.jGvO02_Q6g8bESU2Xyql4NEr8u8abKxYXqhyBD4e3Ao','2021-10-08 08:15:39'),(312,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2NTcyMzB9.KjicBEow7Y7NSiYlzw_M5FuNWeAt3Hcclbh9ZNiN0yo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzY1NzIzMH0.cArbJPtCk3BpAFyfzJwmVHCr5MAACQgBJbpx6ui9Xnk','2021-10-08 08:40:30'),(313,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2NjM3ODh9.upNeOmQoteB_JAD0tkDd4sjU-srMIloomoTNlpnMELk',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzY2Mzc4OH0.lysesJp-OhO2zDmLrtM0WjjQRxpwAqMXq_iy--wIgsE','2021-10-08 10:29:48'),(314,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2NjQwODh9.tRRZgn4JofAEFB8jU2tGSy2Lwfc0ztwdLiTrVzs1Y-I',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2NjQwODh9.m-r1DOsT3tlr4CmSlATXDqd-pOKlQ0Gcx8d98gdYpPs','2021-10-08 10:34:48'),(315,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2NjQ0MDF9.muXHGmT_qDbpUNAykkBPdwhkLhQUXTUkq6NKZ_nhg5o',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzY2NDQwMX0.nr7YsPKe5qjalhOpSQQ5bLJEoWrauls5UTpzGpxN4Ek','2021-10-08 10:40:01'),(316,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2NjQ3NTZ9.tgUmAH5ON2IwuxnO1WS2eIEkkecmMWjUI4wYQxLLeaI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzY2NDc1Nn0.PrnvgjEuOaU9_6-l7YQthMmyoUSgjMFB193wxm6W6nY','2021-10-08 10:45:56'),(317,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2NzEyMTh9.rL1aMpjGA4b4nz8ni_LLNg72VGALO-_SDkpV5yZncUQ',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2NzEyMTh9._e00xe_FBgoFMG1laK7L2EmtruB_JSBikCGF5Urg2ug','2021-10-08 12:33:38'),(318,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzY3NDMzNX0.VnJXXYlC00I-V8gQ_Oz3RMfy9xw6DavbJtTJJOr44d4',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM2NzQzMzV9.FYN2QfOeSTf8JXyOxx1wOWgMLcCsu0maBf9SxpoRQiQ','2021-10-08 13:25:35'),(319,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2NzU3Mjl9.glldX2Chig-I3Cc3z36LDhAg75FaSYKDdT8GLRvyZbM',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2NzU3Mjl9.VawuCRzZzkyw9HvbsqHTCkKshh0upOpTtmw_Ee84epA','2021-10-08 13:48:49'),(320,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2NzU4ODh9.QxQ_m6On5SG7zvVaombFyi-J316XTwguk7WwA2pvGSw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzY3NTg4OH0.Pt4fQIM8m85DvZsbXLrumcLBmB95uib5YX3tsjTdouY','2021-10-08 13:51:28'),(321,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2ODA2MTR9.H7QZI7phUFwydfCMHm8z0clngkr_wcvSAytru61s4nA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzY4MDYxNH0._XoDDbhzqC0cl-gNYW3lxFOeOGg6202mCQUtxt6D0cw','2021-10-08 15:10:14'),(322,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2ODExMzZ9.98L6WQSR6MBi_7kRKytMuGw8UhKUogjgMb27YfMMUww',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzY4MTEzNn0.0NbGhk8sME8C4_soRmsoOe8C7IFk7LutDiwScFFE8Js','2021-10-08 15:18:56'),(323,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2ODE5MDV9.VobnN5FziG2nr6NFh04kfFFPHzK7QcaCobQwzus6Rw4',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2ODE5MDV9.V1PGqZfdFlCKAtW1fLRM3stbXEvIa6bokk-_znNav7w','2021-10-08 15:31:45'),(324,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2ODM1NDh9.Ap48_ySocG3jEiEoS83yNKWQl7LNDizlWPW8KMTymfI',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM2ODM1NDh9.3DMC6rM4GizM4WrUMqmWawFf-6IAR0CzjjbkZtcsaSc','2021-10-08 15:59:08'),(325,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM2ODQ2MjV9.jexlR6v8JmOzoqYv1AjH64bHNVKStRJkGLpbbQcub2c',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzY4NDYyNX0.LcJmvJROgncjh9O9Hirsz5E_Gu8oCSj3TcDHzEkuR2I','2021-10-08 16:17:05'),(326,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzcwNDU5MH0.SpmOVsKq-nTdjMOmIypVzXiAi4CXvkoCDsk31CokIUE',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM3MDQ1OTB9.1I3HHOF-k5X5-0wGIlQ71DA90aR-wIE4IW0SeiHkplU','2021-10-08 21:49:50'),(327,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM3MDQ2MDF9.PWJAKA2O11Lmdg13AzLgiomcqVRTkgUOhA8urFYSNBA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzcwNDYwMX0.7R3Tgc4O7eRPVLLPT-uo8iRI-Y5RvzTzLmd-yuJ-qzk','2021-10-08 21:50:01'),(328,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzcwNDk5Nn0.OWgRIgjrKi4GLvkoyhxrrIdhR0mY0Yt8ZJNr5x5AVj4',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM3MDQ5OTZ9.UKerXNj8X3bupZJ12_RRF0VjXaPUXU7qQxxf24MfjYE','2021-10-08 21:56:36'),(329,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzM3MDUxNzN9.fs3AVwORVAVs2pV63lUfSD95lRYxQvZIErPTdB2hk9U',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzM3MDUxNzN9.f3e8Xyol7x5BgpIkzxYeKW0Uk04et7X998a7GhCgck4','2021-10-08 21:59:33'),(330,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzcwNTIxNn0.apH2bwMqww0DqtWI97bIVQhhiN24Sn_caqGCB7lz1I0',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjMzNzA1MjE2fQ.ssXCGfy6rspTrZW4seDvkwE-pgfYfsh8nFYiSsuh2PA','2021-10-08 22:00:16'),(331,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM3MDYwODZ9.iGMGj8uTd8CXu9DJc_-M-pB6EyXmu7A6cejPLtInunE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzcwNjA4Nn0.S9WFmzRHJY53nDZbkPixf6MC0dXbfR677gZhURPzBcQ','2021-10-08 22:14:46'),(332,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM3MDczMzV9.tkGGPJTzBLpSZyVKwBuYZFHe36MVkULPIR4FXmCnsnE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzcwNzMzNX0.KZdEhRleztovhB-e7KFco9-xDG3cRRI1fNFmgOkjcoI','2021-10-08 22:35:35'),(333,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM3Mzk1NDh9.1UbhNXPPWkMiuWQJxH_V3znl9P4kA6cjaqVOWoNlhmI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzczOTU0OH0.C3eAgqUXUu7A-lRrePfyFtKMtQjDxAQuOHcFuZpYIhQ','2021-10-09 07:32:28'),(334,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM3NDg0NDV9.2kyg5MPZkHNh1U3YoTyRdKrpqr9je2AWUBwUnDoaiP4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzc0ODQ0NX0.Dj3N_W52eM0Bp-gsJ8l73t4QRkRQ5k-jpnFrKqvggeE','2021-10-09 10:00:45'),(335,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM3NDk1MjN9.na2J6zap0nssqtHGb0jGizt9QfOlC57BU17T9J-rvN4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzc0OTUyM30.RXBFRwLjfAFlWqV-OH8M3R0PHx1jG6rvkZR08v7Rb-s','2021-10-09 10:18:43'),(336,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzMzc1MjY5OH0.MefK8t1vckDF8L-TT0XnXrc7T1TMg2XjIe2kJCWHiEs',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjMzNzUyNjk4fQ.xi-u3kJKNDjx9SMZH1XGAlGpLO_2kYnEGDU_nztFZZ8','2021-10-09 11:11:38'),(337,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzc1NjI4NX0.1V-lmC3I9Bkr22uWM1bLu0tagcqVhfsawftg5A3QQ48',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM3NTYyODV9.5W1y0Vz4Y7FXuhq4KRhjsK24gelHazAEQtRZtn8FEjs','2021-10-09 12:11:25'),(338,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzc1NjM0M30.8mtnQIsin-AbbfXzEifU6cyCFG1KbhrJBMj8an2RDtc',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM3NTYzNDN9.rMf8dMlqJLa-376Wc4A9iqhQVJCGbuUcAouJ9vaFV0Y','2021-10-09 12:12:23'),(339,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM3NjQzNjl9.rnmrB2SXfsasLFTnYXmCAjIvhS0O6D9XoIOgahxpZ5U',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzc2NDM2OX0.I9sRPfHgsQ4O0hbWOeUKIUclleg60v7rISlax606Gng','2021-10-09 14:26:09'),(340,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzc3MDExNn0.jNrGjiIYJEsaCIGpW-v2KlhOAYv_QxWiW8LQG3uLibc',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM3NzAxMTZ9.7ondA4qYehU3366FmzhN3fvvZSl_-4ODx6fQZMsg0Tc','2021-10-09 16:01:56'),(341,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM3NzQ0OTl9.32km8f_rk6q-V2ktIWIS93BpoiI9n8am5_HGOhaJXgw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzc3NDQ5OX0.pYHpPfmSaLDY9AQeqkkXJw2eAocch-Y2FEnNwbRpucw','2021-10-09 17:14:59'),(342,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzc3OTk3Nn0.ytxCDupXZ0K13i3HMp0mDin-6bzT4KnBfktMo1Euy5s',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM3Nzk5NzZ9.5kDSXXj82vHY0HFEwS-g1G_3T8HPkpehGjtaNrplo7g','2021-10-09 18:46:16'),(343,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzc4MTY0NX0.uAKzHWZL59AGZHQA2_45iLVPNWwplWZ72BvDp81UKEM',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM3ODE2NDV9.41V-J3qtUbx07boTozl7MrztLVga8N7chuTl45zVnC0','2021-10-09 19:14:05'),(344,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzc4MTc0OH0.igIyf_nORk2zCvrLlLpOkqcIlrXzStNiVFWY-ZCv6Fk',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM3ODE3NDh9.V_9dMTtt7mOSpfA0KC-nEGzXtmK732M1gjopz80N1J0','2021-10-09 19:15:48'),(345,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM3ODM5Mjd9.FWHFd_y2Ow58OF3byVPiVpZm1T1MoaEKr9Xb5bLnfO0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzc4MzkyN30.4zrZI07wQ2T4jHFs9tclaftqCvl3QbjuABo51UFjpwc','2021-10-09 19:52:07'),(346,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzMzc4NjIyOX0.xhbtXcVHO8suTWzC4-xJ0buRhdNCVzcif4h1vfF3UlU',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjMiLCJ1c2Vyc19lbWFpbCI6InNoaXBwaW5nMUBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoic2hpcHBpbmciLCJpYXQiOjE2MzM3ODYyMjl9.IIVtSsCAT5qozaevQGM0x1bE9LUgVKTEm7wM4erOMWI','2021-10-09 20:30:29'),(347,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM3ODYzNTF9.-VZfAmg6z0rBf3wLUiOKwp5xaFNXtuFPLDHVHp2udiE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzc4NjM1MX0.i4t2AdfvLwpoXsGhOorkc9dbvn86SNWjHX5iStVPMMs','2021-10-09 20:32:31'),(348,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM3ODk2ODB9.hA9JcE-EEmCuHg29rEEO2GRJ8Bx-nUMk9OanONMOb6k',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzc4OTY4MH0.8D9j87Z39lFDmrx4YszMjYdXGe3kJSyKNJYXyP_d0_A','2021-10-09 21:28:00'),(349,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM4MzU4Nzh9.8KuJLEDbn9ZKKcLIOxRhRHsxDzV4rKZ4gsKDi-BO6ss',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzgzNTg3OH0.oBZ_C_LQUWtePi0lCXYvZXd3KDu_ztZNxAi11H_3Axg','2021-10-10 10:17:58'),(350,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM4MzU5MTl9.Wtyq2QNTbubnNHEhglVXK3HoKRX8OXPzORxRxBb6UQo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzgzNTkxOX0.eWqD4cUPGD71mA0OOzznlXIZVFyHNjcDpaiumwBtKI0','2021-10-10 10:18:39'),(351,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzgzNzg1NH0.8IuKE3nDck2VV4jmwse_poK2krsCJ4icEy8NiXasUAQ',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM4Mzc4NTR9.lClfBpcy7vNOs0BdQeUN4pXYJF4faUP_lKxg5bnjI7k','2021-10-10 10:50:54'),(352,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzgzOTYzMn0.TDSsi0-nCigeMuJ0lwOahSeDSbo3MqVj_dDlMeVU9Bk',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM4Mzk2MzJ9.u2TOBKCmnP7V3a4yO2hCmtophSJDllLvbpQH5iWZVlU','2021-10-10 11:20:32'),(353,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM4NDAzNjZ9.v9fP-Cx2hV4zE88Us-oR53JuUldI89BbUDuKsje0p0U',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzg0MDM2Nn0.t4d4FTja-pZX9gyFM2E5F_dxow4_PtpB1qKZsKF83Q0','2021-10-10 11:32:46'),(354,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM4NDAzODV9.vF4t1VP0GuJ6a5lXtsKA3ABYa2DlDevSR0nA3wSL-UY',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzg0MDM4NX0.wrQcxbw-KHosPc79ohWXTsuMkXkVoWHfKtlFg1VlmoM','2021-10-10 11:33:05'),(355,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM4NzU5NDV9.uI2Bt_Ixh_z-OTq1gIzibmskQrwM622EM2M63fGdbdg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzg3NTk0NX0.JN0W2uXhCcgITCzh10aZoP46jmlui-sgk6GUabrnh-Q','2021-10-10 21:25:45'),(356,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM4NzYxOTd9.1s-XmuDMRwOlA8iAv4JEVkFQ4LXKH7P6PQ56GEqSKb4',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM4NzYxOTd9.ckkJwtwpoB4DvBsqB63HeTqXWMT9OxpIPgT6LadT8OE','2021-10-10 21:29:57'),(357,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM4Nzc3NzN9.CSNnjeEbBUJvN41a6pvS62WaNRtF6TlT1H5A_pbHzWM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzg3Nzc3M30.eejURNCxCWRbgBNpUsTbC5MP-YGS49bjlA8yHpv3zd0','2021-10-10 21:56:13'),(358,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM4NzgyMTl9.7BkcScZ-CtYHZcmzFJ-rGGh1ylFLrNcg_fnQXnEy6cw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzg3ODIxOX0.LcZP37Kwa_iK5SunxRTR4mGsfY-2TGdlS4__pFouRGc','2021-10-10 22:03:39'),(359,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM5MTMxNjN9.qWraJmrF99otjSZVieP8RGIr3YPo0afPvAfq9e_lWJY',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzkxMzE2M30.NRXxRMuiy5I1z6m1dPR8hYcrzwnmsYyHy813UrY0i-M','2021-10-11 07:46:03'),(360,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM5MjM1MzR9.MLoxWWCeZviFLMV8P7c2JbQ944k0JYLH3JddT24VGjM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzkyMzUzNH0.Z-d7Uh7mDvUKpq4Y5nmSoWT174p_AMOjZtElDztyVEo','2021-10-11 10:38:54'),(361,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM5Mzg0NzR9.oEC8O_9YTe3LaZ3DstTls7bBexTdy0i_Vr0pwHPn318',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzkzODQ3NH0.wLpmz6GUMXI6NWo5YUTp93NlqnWMOEJ6TaHT5NgozKA','2021-10-11 14:47:54'),(362,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM5Mzk4OTB9.tecg3_ViMPRCVr29tFLfYhPGTXJcYqxQg9XTb5gHiY8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzkzOTg5MH0.kYYCY6V9YreEGsyXP8HR8tv-opHjjrq-nntAVt2FpEA','2021-10-11 15:11:30'),(363,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDAxODB9.MnsulMzN1bKJk8Vh4w4lRy3Wh9UNKrZ3-RK041Q3YzY',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDAxODB9.75v2f5VZ9K2Gow7LknPD1Rt7slqkYk1NG08DmAr0ncY','2021-10-11 15:16:20'),(364,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDAxODJ9.2SRvNic6yP9V9i8KcTIuC77hpcLXs4w1VrrUTO_KGWw',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDAxODJ9.Ta9pzj1uxK27bd0MhlrcNFighto_8jMd3mwyo3bqF6o','2021-10-11 15:16:22'),(365,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDAxOTR9.cTlzvLIHsDSCQY7owqzMUpkAsCCb95SpF3nXkTs90Ew',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDAxOTR9.KejS8Bck65sq86EFhf8wpjQ9iZB5SRNe7EblFO68-Rs','2021-10-11 15:16:34'),(366,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDAxOTV9.ny6mX1ZSS9Kt7BFbjSyjQux3zRugf14quC9wvF0fHoo',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjcxZDJkNmNjYWM4MmY4YTMzNDkzN2ZmMGZjZGMwZDhhIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDAxOTV9.-jtc7uqMMdZKcRRfJ2VmNuJ-etffBJv8DJYeWwuv_Zg','2021-10-11 15:16:35'),(367,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDAyMDJ9.K_lwsAI95QhnfEEWBvrbNs1YFKzatessMFFiHcmXcTI',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjcxZDJkNmNjYWM4MmY4YTMzNDkzN2ZmMGZjZGMwZDhhIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDAyMDJ9.zZNUkwrdrtttL2CSQmPivO223gfp9pt9sGVjK9Cy2-o','2021-10-11 15:16:42'),(368,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDAyMDN9.6OJRaV_CTXNY2PkYG5_4bkFylzsYQjgM6WB4C0iWuJI',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjcxZDJkNmNjYWM4MmY4YTMzNDkzN2ZmMGZjZGMwZDhhIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDAyMDN9.SezDwAESkjwUpjQws_dd9QCwaOotrNYXCNfQPS9tQ8s','2021-10-11 15:16:43'),(369,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzM5NDI4NTZ9.nPALkeqNr4KHxDSmRSvFLjTxoDIiOsR6vC04araA7Bw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzk0Mjg1Nn0.gjqfgSamWSav7_KA16VWVHTkGrYVxeZcwdHE3cLMgS0','2021-10-11 16:00:56'),(370,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDMxMTZ9.PpUXziAf3U3DzFefcaM5aOLo_kKoZQvWD-lVTnutT_E',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjcxZDJkNmNjYWM4MmY4YTMzNDkzN2ZmMGZjZGMwZDhhIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDMxMTZ9.CwLLyG3SuyhWYBUqUanieDJdavVw1ewQHDIn2df6ORQ','2021-10-11 16:05:17'),(371,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDM2MDR9.GTJcEs2ppWHoMr5cFvA68paI6MgbFBxJQip5mLOz5dg',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6Ijg5NGI3N2Y4MDViZDk0ZDI5MjU3NGMzOGM1ZDYyOGQ1IiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDM2MDR9.XuSq7WLu1y8Z0s0zOrlXMj-i5inNlut6dTTY8jQ_9Z4','2021-10-11 16:13:24'),(372,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDM2NjF9.0afGcs-3qnU3CeNarMh7ZjFnbHLdTXmQOWmVyhej2EU',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6Ijg5NGI3N2Y4MDViZDk0ZDI5MjU3NGMzOGM1ZDYyOGQ1IiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDM2NjF9.H-xzs3sdTUp8zFPLWbE_s1dUPRJvfKj4YB3K8LT6Stw','2021-10-11 16:14:21'),(373,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDM3Mzd9.3YlxPJapEGrWZVeg5CZzOjhEcBYS8EYTGo1aiCHw8yw',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6Ijg5NGI3N2Y4MDViZDk0ZDI5MjU3NGMzOGM1ZDYyOGQ1IiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDM3Mzd9.1rd8N4PoWh8ht-YuptE0igw_IldHcSgmrG6fsDEv6bs','2021-10-11 16:15:37'),(374,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDUxODd9.HExt5farLDLMnJsFMTBJEePM-3BaRK4_2_E_0m1bmUQ',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6Ijg5NGI3N2Y4MDViZDk0ZDI5MjU3NGMzOGM1ZDYyOGQ1IiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDUxODd9.wZFJh-y-42lZa6wN47PP5ttaBuMWOEArnh6KghVMgO0','2021-10-11 16:39:47'),(375,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDU1Mjl9.w_k7LP2dFF3qmr4zT4SqNBAlIS38-e6ZTpcDPnAHppg',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImM0Y2E0MjM4YTBiOTIzODIwZGNjNTA5YTZmNzU4NDliIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDU1Mjl9.ZZi-tSMXX77mqIss9yT4RtZJX4PlVUJ323_7cewGIWw','2021-10-11 16:45:29'),(376,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzOTQ2MTYyfQ.Ph0POEXNn_sKNiMVRP5f2BWSz7y0n88ifWGBAWOp7EU',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoiY3VzdG9tbWVyQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzk0NjE2Mn0.Jlb6q0rDGaHk0DQeDZua6njldeQmvHA9adEHB67D6SY','2021-10-11 16:56:02'),(377,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzOTQ3NDMwfQ._50fuDiNegplTncnRunEiiJAT61SQmahMXg2_obJqe0',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoiY3VzdG9tbWVyQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzk0NzQzMH0._a8tAlbckyNi1XduwuKI3XQsyuYXctYR3Xsc69QAEus','2021-10-11 17:17:10'),(378,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDgxNTV9.EoywHLmmWJxluZnACs11vhgi_t2fl53eDIj3Rhw9cCs',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzM5NDgxNTV9.PyugTK76RFvdHcxlJddnepF8_W9TkcN32GpjQo0i9Qw','2021-10-11 17:29:15'),(379,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjMzOTQ4MzM4fQ.FiLMBN1xwpQ8Zqnaozfg8vCM4k2Nrpli71fx75iX4RE',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoiY3VzdG9tbWVyQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMzk0ODMzOH0.ycTrVcJtaGvm77ee6zjl2-rvJ2uFjylXgHEIeybH8vI','2021-10-11 17:32:18'),(380,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQwMDM4NTF9.57IebdoEjgSMBRNsz2kYAt2NPpyqAwncfi7UXiChTWQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDAwMzg1MX0.RrI8zU1vKvd2YxSw9x3btIeCF0L6YQS9WUDEjY4dJHI','2021-10-12 08:57:31'),(381,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQwMjM1ODB9.Bx9jeH_EOBi-fstxM6xqocUCH3TUVGMMauxil1WBlz4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDAyMzU4MH0.k7OZgmbHCiKXCWJZb1PY1hpcwhKuYAfJCHfp5WAW9ak','2021-10-12 14:26:20'),(382,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQwMjM5MzR9.eYf3-uypuyD86eex3l4F6PjX1FA0yM_35P4z4yXlvYg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDAyMzkzNH0.NYNPWzGdHanwAJZtv7CFhUFstRQdNDjxxmQmyhZQVW8','2021-10-12 14:32:14'),(383,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQwMjQ4MzF9.ENNuzK8Sl8KYuvR1cao72-F2R8zNlMk2TYb6UJ8yOmE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDAyNDgzMX0.82PkCpI8IUBthA4rgXnTYg9-UqMlaTSZdHWzHTVFM6s','2021-10-12 14:47:11'),(384,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQwMjQ5MDd9.gm1P3d6AX93yRX4DgIoN53wnCQG3JkMXeeOuaDmRAfg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDAyNDkwN30.tYu6Ij00xdYpAqEwilCuMn4Qj2okkB5cALOGesUMXTU','2021-10-12 14:48:27'),(385,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzMwNTZ9.JmRLUEhiqP7-cZFjxoKFseAKe6Ar3LHY6q26DZzfvhs',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzMwNTZ9.IFeNwcizBm2Zl7AEfsWQKVAjd15O0jgS923SKokgmLU','2021-10-12 17:04:16'),(386,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzM4NDd9.zZ-91V_K-Zl0DFS3F7HrMerhj_AoombVnrwJRw3yMjo',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzM4NDd9.uixdE1jkm2sa2PqQXch_yTJJeCVuFILxJm-N2ZCgxp8','2021-10-12 17:17:27'),(387,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzM5MDd9.RPhKGrfYY6EcqrA7mNv1RmK2bB5-o6IAwwAo3qP_5is',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzM5MDd9.xtxsqBSxSM7dBr7dgpTqeQXR7n_5ZmFBasVL6BYTzXk','2021-10-12 17:18:27'),(388,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQwNzl9.rtNpzPJufSv-h9DG2D9gJBa7V6CAXk5Bw_nPZqHYCpE',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQwNzl9._pF74GHaTmIb8MWnzsvqtotiD6CoKj1P6B_XEVwR_CY','2021-10-12 17:21:19'),(389,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQyNDV9.rfByXFrCt80oYYOPfMdmYNyMm3hE5R5x5emxqt474xs',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQyNDV9.nJqd-q6AVd6dybKTYMcf2ud_crj8UgYGSQGghVD_QBU','2021-10-12 17:24:05'),(390,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQzNTl9.V2dsHYL4qX-PwHEZsqbkKEkTdJci_GRyTIzFvKV4UNQ',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQzNTl9.CgcBS9BAeNvO4fH9RjlETPD4FR0akfO8ePPWweDwpGs','2021-10-12 17:25:59'),(391,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQ1MzR9.qG7smwKzn65bIkR9K_NIHMKQSMRh7HJZaLi879czahI',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQ1MzR9._9NgbzkIaLMWfio-JdyLrMZouapl6tU1dz1n7M9UsAs','2021-10-12 17:28:54'),(392,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQ2NDl9.iRiaT5JLa2Nk8iB82U0Gm6G-icJI0Wo0q9U1KSLYOPQ',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQ2NDl9.8t4lS7TMryAf9gTx_ClNRY6g7-Jq2p2kk2ig6XPM1dM','2021-10-12 17:30:49'),(393,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQ3MzR9.fFPuuSaWDjrl7aGSXJnYbxgvTbG9Yyv-NKGkRemYZr4',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQ3MzR9.SWxHoXNikHeIDGaZB2frwU7wpIuRG2ZmiKH_BAt_HJ0','2021-10-12 17:32:14'),(394,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQ3ODN9.Y6NZnxSynLZ1_cYix7PgeUuZkBWaUVLF2UIxOAIG2Ok',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQ3ODN9.i1CcXpGaSgUWPtyyrd3HUDlOBcENWqKc9BVkFqqvt98','2021-10-12 17:33:03'),(395,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQ4ODJ9.RgokrgkO7gq906pveidbGw7NeUhycJKeqJY8vqwmADw',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzQ4ODJ9.dtDmA2w7vGZzKw0LgM_DDmPkK5WktzDR1-5FnQW1mY8','2021-10-12 17:34:42'),(396,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTAwLCJ1c2Vyc19mdWxsX25hbWUiOiJ2dW9uZzEiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDAzNTM0Nn0.oE0bbod0dD0ajImTNDjl0_htLOI7Q1mF0v4N6sRep2A',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTAwLCJ1c2Vyc19mdWxsX25hbWUiOiJ2dW9uZzEiLCJ1c2Vyc19waG9uZSI6IjA5ODEzMTQ4NDgiLCJ1c2Vyc19lbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzUzNDZ9.DAir-1nELiJmy8FDvRc-eDcohKJlnpjLxcZQ0PLc12U','2021-10-12 17:42:26'),(397,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzU3MDB9.OqiLMDw1MObtBwg5OnYgYp6D9FMbkzaEm_JI4xTZEIM',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzU3MDB9.pzfTnbyI9-3hHh8GKdaxby5VfRmMY4nkQDcqxG4IYAI','2021-10-12 17:48:20'),(398,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDAzNTcyMX0.BNfkoe1QulW6U_WLku8R0HtE7bQTMBEwKp_PGAQrZjA',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwMzU3MjF9.6H4whIYT9yB9Ch71Q62OaM-edFdYRVnwmlpqNiEJQIU','2021-10-12 17:48:41'),(399,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQwMzU5Mjd9.RMrbnf4hjPjGE6IRKhyAf0NlMBV6ojQgw2X_HPW89gk',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDAzNTkyN30.i1Y1CgWJoCJxSIeov2Z3T6Wh1gGbwSUdA6bRxnkvE3o','2021-10-12 17:52:07'),(400,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwNDMxOTh9.R7Y2SN6EtTPyMNOQkDz967uc3qdnmp6daQQ3vtYU1oc',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQwNDMxOTh9.uqmLEjtH9HsLKBvQSO1ruSHfSUq7eJt6ofm_7StPR1o','2021-10-12 19:53:18'),(401,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQwNDcxODN9.uqss8wsnR8gu5xoLfgx5gnk_aKm4GcgYlp63zDSMDro',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDA0NzE4M30.eV-Y-DVse6cJcurBQyt5tpY6laqSldJdw1pDkJyp4WA','2021-10-12 20:59:43'),(402,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQwNTAxOTZ9.K6TXf26Nsa220zk5pbukbZjzQHsvQktf5CcuuDtKRXg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDA1MDE5Nn0.8nY1iH8I4S9f6I4nw0MNymmWkjLF6xWpKkESCUzBzSw','2021-10-12 21:49:56'),(403,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQwNTAyMTB9.vwWMgmwgZ8CkfK6gXVdEQD6XVWY4wcoozI0oOBi8scQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDA1MDIxMH0.krcw4IfM7xGLa3P2NM93z_Fm-P4mVTjlrh-wYAct628','2021-10-12 21:50:10'),(404,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQxMjA2MDB9.UAqFgb2cs6aii3frqYTr4F_3DLlDg31ggM5MpxwsXJA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDEyMDYwMH0.WNVWx9Z1AFXlVaZavImgDw1NXrgPrGlvbt2nZWr-450','2021-10-13 17:23:20'),(405,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQxMzQwNjN9.BIPCmMyMY9RulA1WO98DTG3HUnKwdxoRWgMonDsA5jQ',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQxMzQwNjN9.SNi4lqyXF0uFzZ1fSo9gOEqt8wtzVOuOGBfpFX9duL8','2021-10-13 21:07:43'),(406,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQxMzUxNjN9.JuKrVQITzZx-kZxW5qEZF93GHqPpVHaIoxVfUThhRYI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDEzNTE2M30.t9sbrGosikiGOhrngcN6WLWALY2Pwre4eAN30PmewcM','2021-10-13 21:26:03'),(407,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQxNzU4MDh9._eeDD2cfr0tHGADUQ1Gquc0qQ_sFfdMoWNf4ZszH2z0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDE3NTgwOH0.LaIchSkjD38Vdfoklag0ysRBHbmt6DP3BO_OH75AsDo','2021-10-14 08:43:28'),(408,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQxODIzNDJ9.A6CEF-0_enLBeToqMWumjz27MWWcxP_b3-PW033fL4M',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDE4MjM0Mn0.p2lmtpCsbL9H2U0AMoFPTewPcELh9xY1-l6LYqhX7Kg','2021-10-14 10:32:22'),(409,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQxODc5Njl9.ycX4tGai3BaO_X-zY2ulVu2GIQ3UKYrluqHpqjHwNFI',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDE4Nzk2OX0.i17M7kaGwjLjwsIxNcm28SyrIkZb-nMvczk-oO6NLrQ','2021-10-14 12:06:09'),(410,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQxOTE1NTV9.hl35fNpZwTzaR1pRjntLhr7hBQI-wpt9C1GcN28kACc',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDE5MTU1NX0.P5s7p-31Gqp9ekwk06UAR3aLG3lJZTJppq1OD8z8U5A','2021-10-14 13:05:55'),(411,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQxOTc1MTJ9.mDmi9pqlgY2eoZ2IVdiOU_zr9xFrZOQ901fz1DNquu4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDE5NzUxMn0.9OtRloZx8Fba1vFZ1Fr7hG4D9AsjF_baGkG1IvM3wRU','2021-10-14 14:45:12'),(412,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQxOTc2Njl9.BobLNI-huydiXfxL9z2UrVVIfF1n5w5pch3SdnoKXWs',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDE5NzY2OX0.C70JBs7nF9_AoCEMjmX5cDmzIQEtpsZOr6QB3QWuV9o','2021-10-14 14:47:49'),(413,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQyMjI1MzR9.FXow_KdUqyaJiMNqkURt2NXT8t1G27MfeIi29WLjVCs',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDIyMjUzNH0.eToPier7mxbYqBimt3m2l939sjvB5woiT9cT8DVtZGU','2021-10-14 21:42:14'),(414,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQyODcyNDF9.1zUUkzAEx0pZEiYdudt_hq8njcEUJURv9uDblxJcHws',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQyODcyNDF9.A3lqulgpbYuiZSmMGajA0h5QGBqcy1NBt1SUwgbyM0Q','2021-10-15 15:40:41'),(415,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQyODc1NzR9.4djEVI2fLMfIDt862NquKyb_f-YpsjwnCX53b4nYqQc',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDI4NzU3NH0.JS_3Dea_T-jHyIzOo9bWRguAgpPrDkqi5HvvA6D0u0Y','2021-10-15 15:46:14'),(416,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQyOTAzMDV9._JrBaEIndLEYCSPSbl28OkW607foNA5o6UFH91iajig',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDI5MDMwNX0.vLyhPwNYD9j_Maf99z0Ftun3cpwv2GvMY4HKhP6W5v4','2021-10-15 16:31:45'),(417,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQyOTA4NDh9.S8twWzC_gA9rr83Qe4m68HXkYFGr-WHywK1fdQhqzUc',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQyOTA4NDh9.gLANza-zreL3F01ABCJwEjPGV759pAB3K1cX5_VME04','2021-10-15 16:40:48'),(418,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQyOTcxNzZ9.2GaJntuCmDOCDyk8Jpbmn3WU3g9K-OlpsKtL9mw5RsE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDI5NzE3Nn0.LRuC7bQUcFMpzgYR2s--y2O4Fc5W9PmzblHTdJb30_g','2021-10-15 18:26:16'),(419,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM0Mjk3MTk1fQ.kRJuPuI5GZ6U90e_U0isUG5AQ-vdKKzzWabqUPqsUSo',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoiY3VzdG9tbWVyQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDI5NzE5NX0.JTrqSQQ-CyCY15by7p1OXDv-HQXPW6aGEMj1kwwxMXY','2021-10-15 18:26:35'),(420,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzMDg4OTN9.Lp-iylVrxyWQIacPHyPoJ5IQveWwWTfifu93RVR4fHY',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDMwODg5M30.Fe99oruO-P3zYvOsoacuJ1Q99-3duGHeZjqRRHKnuDc','2021-10-15 21:41:33'),(421,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQzNTM4NTJ9.K3myIpjRvAskw9eISyIIF3CcLNY3qo16D1psWh9jO8Q',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQzNTM4NTJ9.Zr12kx1VObHpfZGFFHG8YmqdnBbwASN3fYl6YTEa_-s','2021-10-16 10:10:52'),(422,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQzNTM4NjZ9.PWpHaVPZiG7JegtwwHSgahZr_tFlcngPYDAzn7WsehY',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQzNTM4NjZ9.d0_RJHKIvDAzektMN9i5c9wRm2-kc7DOfrqWG26JOs8','2021-10-16 10:11:06'),(423,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzNTQzNjR9.ToC_VRS-GAptAh5u_gKoUOUC6ljA7R8GPA7EBvCDtZ0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM1NDM2NH0.mRqrTvJOQCXwvwr9u5L0pDilHPJ2Bkq946T0TDE4VLQ','2021-10-16 10:19:24'),(424,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQzNTUxMDZ9.wex8XT-rL2Ua30hZRrdAxDc9j4WRkKhPp_NeqjiUacQ',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQzNTUxMDZ9.OJ1HJ88TkzL59UDHrVbxc4-LLB8PDGDx-LAnaKKhHJM','2021-10-16 10:31:46'),(425,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQzNTUxMzF9.4UyPIXgKFw67wI4gkxKgUTmmlmit6D7KLoS6--FJ3nM',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQzNTUxMzF9.iaZfHLySTzB6ePA48S2WNca_xK2olezFVq9yEfG2dE8','2021-10-16 10:32:11'),(426,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzNTY1MzN9.BNlIPdHGR-JTcKGEYJSzlgtHDsYhc00pwa4JrZekrs8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM1NjUzM30.ZcZ_OglIhVyBWNdaqqmRqdTbAegoPwWpgqWLixSHgMw','2021-10-16 10:55:33'),(427,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzNTgzNjB9.qgBnH9SilFkr_L30DApHCrWe01l7-ZG5X2LOouiFZy8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM1ODM2MH0.47RGSE0hbsQ4xU50xvOSFV9IKtmzYHkQnUaGzMwfu9o','2021-10-16 11:26:00'),(428,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzNjkyNTd9.epbtdFVK7HqTjNGgWAOpxzwbqjkv5Q0MbyK_Yug4Cf4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM2OTI1N30.66ilI40u5OkiD-TGLm1AJdyVP6Skrb7O8G9wUYGd0aM','2021-10-16 14:27:37'),(429,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzNzEwMzJ9.Yv5Tvug_B63iye_p95r1PNi42dRafr-rLEIytFnuLfc',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM3MTAzMn0.0IiUsbvcFGTTUBK0JiNxcT_lO_27P5JHD5NGHW4Xpak','2021-10-16 14:57:12'),(430,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzNzc0OTF9.N5o_oJxCtD3xdd_MRV7x-ecaYbabZzgGzz6ucgjxy3o',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM3NzQ5MX0.qLqGabBW956xlykuckZIKWNnjz-ajmqRn_fqvahMJrE','2021-10-16 16:44:51'),(431,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzQzNzgyNTJ9.6lHwfTmGwnaWULHfAc6I8arsVzJ59Nvou4Q2NCbFwSE',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzQzNzgyNTJ9.1nSTu-6CfuhyW4V8B46l4NZt7r_sYOZGzqS28tHSGT8','2021-10-16 16:57:32'),(432,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM3ODQ3OH0.ZUe-hUAKPi3nOjNqsrZQqvrkBTTDnGZJ_ipe5UUbApA',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Mzc4NDc4fQ.8kvcVsS0ZrWhn-c2oMxlSfZjrdu51Snh16RTR8tVDX0','2021-10-16 17:01:18'),(433,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM3ODQ5OH0.XKAAHkSXP4-P5kCWf7Cbmoqps4Khu5I6-lleOXraeR4',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Mzc4NDk4fQ.ztB79uki2sBFx8WmBiGgj6d3j4Vr0U8aBcFaOYTl6EI','2021-10-16 17:01:38'),(434,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM3ODUzM30.6OxcxUPJzYCjHU1MtWcYPWjbFN57Xl8FytSP6KD3TGM',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Mzc4NTMzfQ.bodAt3HIjaa1K99_LQ91P-PAEYU7XfLsZDF0jnd-Zs8','2021-10-16 17:02:13'),(435,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM3ODU1NH0.F5xfCkgt7kd-oYWL9Y92M6RU7AfCN-MX8yFUVh5UkFw',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Mzc4NTU0fQ.JkhEATpEDeGFaKoEXnnjdaWuDGxv4z_wTJyG9i3r4cQ','2021-10-16 17:02:34'),(436,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM3ODYyOX0.iTVefDrHWu5fvZKtutKUNt3mFb4WZlPyqJTTAafVx5M',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Mzc4NjI5fQ.XXsvTjym_S2reSC6C-ctnYnubiMrqMbO1jAJOqwGQHk','2021-10-16 17:03:49'),(437,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzQzNzg2NzV9.llq_fNh_bprVrQZEG9Ec0WAttlrw4yPQSQjqnH2qUAk',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzQzNzg2NzV9.EfPVB1KpotwdiAvhQut4WawiY9eg3EwCHcjFMhZJ0zI','2021-10-16 17:04:35'),(438,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzNzg3MTZ9.64FUvvv6MuW36a6-0_kK5P31ntwqKTTZHNrOT5t4VkE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM3ODcxNn0.GuDjiUsCzi58KVkrYs-OvfskhKwFz4ifno9y5Q5T7YI','2021-10-16 17:05:16'),(439,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM3ODgwOX0.lBBwSPLZqhiGl4Acw6ucIk93vc9SrYmXhiDiCcwSDEY',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Mzc4ODA5fQ.2m_tTGDX89TrySmUL3kE6f5abve1gvV2GwPPLdMDCjk','2021-10-16 17:06:49'),(440,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM3ODk1M30.1uwFzLP45IuZaObnGr8Glx1o_yTjHmrFUPiurLKhwJ4',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Mzc4OTUzfQ.j9DoqkXLWd4sQhulvh6Qln8rZeA-oC-H98lSL0cnUP4','2021-10-16 17:09:13'),(441,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzQzNzkwMDB9.lOrP004UKflHV9Gz5DehoUZ-VR1ORjo2DtXgKjs3oCg',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzQzNzkwMDB9.lyn0w0sjf0Vb8QkM8-KrzklYhxWBu0ndzqyZg-Bpzgo','2021-10-16 17:10:00'),(442,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzNzkwMzB9.esWSH5UrliUnIvrc0twX4l894ofAjt5mviB0ZoUm4Pg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM3OTAzMH0.XUOzPyVJ98sRVmywcJilgGgLIeEXXaOd4BcXgaYIR7k','2021-10-16 17:10:30'),(443,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzNzkwOTV9.1eFf2UPcFlotvQ7ifQ2T_QvKJor5Fw7QhR8tnq74UbE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM3OTA5NX0.g17_br3ZxQuUxv1TG5tawNTvthZ0UHaXRd3UZsgeenc','2021-10-16 17:11:35'),(444,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzQzNzkxMTR9.11WDhSdYGH1LysABH4l7iLokfDsu_VUir3LrUv-waKk',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzQzNzkxMTR9.3CSwrE32bF98nbMol5AQxcxgbBLmMSw0qEqR6fGjyG8','2021-10-16 17:11:54'),(445,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM3OTEyM30.fygFR-Bb3Le_g1SHdoDfzClm4UrDCA8MFtw1Sz5geOI',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Mzc5MTIzfQ.6GISGvDN0MAUtj41QOF35KAk9V4ABJ83LIh1n3nr73g','2021-10-16 17:12:03'),(446,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM3OTg0Mn0.3oxVOOHE6lSOi835_VOyZ5mRhVt6zZoCTCqbTvez9Yg',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Mzc5ODQyfQ.qMIR8cBvzshQ7Zhf-eN0b623qMyafGj7ru3-MFhBH-A','2021-10-16 17:24:02'),(447,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzNzk4NjF9.Ss8bg-DLugKR_T6sIhIKo_SmKulkwHdV3_nVNOh046Q',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM3OTg2MX0.mHeVh6cSKctELKZ5q-a2jsg-OnhkSNgsl_DlOr4nNU8','2021-10-16 17:24:21'),(448,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM3OTk1M30.pAF17tffcWdLr5mq0bX37hs1WaBRTeCJUbMfupbPriE',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Mzc5OTUzfQ.s-j1tASyfFueEIZg5zZoZ0Hss0whNb6HmA8SSIhqyzY','2021-10-16 17:25:53'),(449,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM4MDAyOX0.Qp46S-2VHlULj4aj_bdpRGPUF7qgjPghbt7wkm4LQRw',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0MzgwMDI5fQ.CyZonNzyBICKpM4QawiijD-UKVMsSoKszrWV9qnX7MM','2021-10-16 17:27:09'),(450,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM4MDA5Nn0.s6h7b71PnxYPNaTiqbs9OcBn8eNqFS5Mup1OxnUaHiU',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0MzgwMDk2fQ.zcYg6MW90Ny-NYSoag_lV3J3IminEEYgI6-H9I3qwdQ','2021-10-16 17:28:16'),(451,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM4MDE3Mn0.H6SaSLjDKjYEnprXwP_ZiyOMogOjw2yI8lUASAd9FQI',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0MzgwMTcyfQ.CEx94wlIYjf-0TY_gbzgozxTgZL14Uu-iXVQ_NNJnrA','2021-10-16 17:29:32'),(452,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM4MDI1NH0.QP_gfDEBbSahgpwOnGQBxbv0JQz_AzP5JUizeD3k75M',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0MzgwMjU0fQ.557BUYBNR4ntsqs7v-bdWTbtwuYmO9wpYGcQVU89oxQ','2021-10-16 17:30:54'),(453,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM4MDI3OH0.4o79zo7-1C3aUMt4FJyeuy0FuumGQuO7O9VjvGkdSAw',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0MzgwMjc4fQ.d7lRckFLLg3IUzK3qcWECOh3rd4rm9hIe5XFAKZHgm8','2021-10-16 17:31:18'),(454,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM4MDI5OH0.FvyEIkM7JNM2RlvO7DKpHkrLbDFqumfeFe58w_G8B6M',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0MzgwMjk4fQ.6HFbzu1cPm3L0BV2Kxmlr5Rm7q8no1W-qzhEmVQdqnM','2021-10-16 17:31:38'),(455,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM4MDMzMn0.mePr5O0mv8A601jVFrzPa6PmcAYxnVwy_FkmzreZzPo',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0MzgwMzMyfQ.ABU_I7__6Rmf4JAWR5bz7bgvqqOX1VLHBY1KTRFbIpM','2021-10-16 17:32:12'),(456,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM4MTI0Mn0.zrPI1BEy1w7lFzvOsywJK3S5-H6tkA31hBUveZNn_wE',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0MzgxMjQyfQ.VSkIMCOxrfOfImOeCm-mSnyneCUMwEqPQWd6oxVD1uM','2021-10-16 17:47:22'),(457,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzQzODEyNzZ9.UxGer2xFQcCqUgCErEXeA-ENjZ9ko23XgTqtvYzP5SY',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzQzODEyNzZ9.qSb2Wqf4VLzVM7EW16kD7N6GnTa5oAbJFYhVFXhNklI','2021-10-16 17:47:56'),(458,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzODEzNjN9.siAx87cZusXLLagyh_cg8DsVmmpOQIv40lpuHRhCcXQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM4MTM2M30.tyAUx5A5ZI9o39GqKrOU1kuTxfc0s9eANXhISZ0Ffcg','2021-10-16 17:49:23'),(459,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM0MzgxNjQ2fQ.zGjcaqyEDSTdMwa_UQ8D9v4FVxxuQG-Gu3lV8rWuFe8',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoiY3VzdG9tbWVyQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDM4MTY0Nn0.p1iapliJ8f-WlvsPJ1cEuiBfeHaa72_iYwp5cuZPzJ4','2021-10-16 17:54:06'),(460,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzODIyNTB9.k5AFPhg_t3hGxegarr90-QBMcYWE-PGGcBrBJI6a86M',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM4MjI1MH0.k-7HebAlxGDImTtJrgJTO58hN7_q0H0NLRoM4s6jk6g','2021-10-16 18:04:10'),(461,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM4MjI4MX0.3gZ7fu4LnLb0ExnSiOvYg0gLY9megTdbH301uNDhg6k',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0MzgyMjgxfQ.eFC-Q9NqcMyeKb1KcojUl1YKVpcDKUdoUMbUSXi4EiY','2021-10-16 18:04:41'),(462,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQzODY0MDd9.L_HnQ4I_p223X70eRhhGhOseDT0bJZnxTenlgaVDSTA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDM4NjQwN30.hm9IccTvV87FHmoPkvxnxTG8eZtaK1039NMyDmXz_WM','2021-10-16 19:13:27'),(463,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzQzODY0MDl9.G1KdTDBf5MIhe29wtH93xRKRwJkWltGHJt1SZ9s3Ei8',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTEsInVzZXJzX2Z1bGxfbmFtZSI6ImRhbGEtc3RvcmUiLCJ1c2Vyc19waG9uZSI6IjA5NDgwMzYwMTAxIiwidXNlcnNfZW1haWwiOiJkYWxhLXN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJidXNzaW5lc3MiLCJpYXQiOjE2MzQzODY0MDl9.5eKQaND-e-tC9RE2CYfBnOjV2NOHS5nWIMfh4wqYXpw','2021-10-16 19:13:29'),(464,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDM4NjQxMn0.VnQxOwtW8MlYNvEuoiuTOmxXMLlhTGYsI0rtFPWgRXQ',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTEsInVzZXJzX2Z1bGxfbmFtZSI6IkPDlE5HIFRZIEPhu5QgUEjhuqZOIE7DlE5HIEzDgk0gRk9PRCIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMzMiLCJ1c2Vyc19lbWFpbCI6InZud3IuaW5mb0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImEzZGNiNGQyMjlkZTZmZGUwZGI1Njg2ZGVlNDcxNDVkIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Mzg2NDEyfQ.RaJAGKZ8WZUOb3AESNnwJSD6Xp2TE08dkIDYQ04ZpTU','2021-10-16 19:13:32'),(465,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM0Mzg2NzQwfQ.oSeqfDklFKU4Fj8qMH0E5UOqlil6uRGLD-DTjeP9ABM',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoiY3VzdG9tbWVyQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDM4Njc0MH0.7zZhFFc8sEPdamem_0ArNYVtkaSYz93Q2qfqyrV1DCE','2021-10-16 19:19:00'),(466,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1MjAyNTZ9.Xg-vxay8MBtkTQ9imb-j0QFUfuUvczzhnfoIz4ldEag',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDUyMDI1Nn0.HkC2ylGENM15IrAlA1OzsZ05A2E6XB76Ugr9IjvTICo','2021-10-18 08:24:16'),(467,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1MjAzMzB9.06G_TStMrqGANnciCcXSgxgOw26P7CjyiohAD7lzt8s',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDUyMDMzMH0.JbBjEv_ISdxemi4DQYBngxQyH0_xYpwTKnvODpoi1o0','2021-10-18 08:25:30'),(468,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1MjAzMzZ9.4fxYfdqLQYeo1nndYGBk_eG66Fb7xJ9fo_n8udMuJaU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDUyMDMzNn0.7Uuk21oyUpwnT5vtMErhQdsgO-yX8fyGUNbISKu9URw','2021-10-18 08:25:36'),(469,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM0NTIwODY3fQ.etX7-iCg4243zWETzuaC54vrTx0wovZRt5MsAkP_XHk',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoiY3VzdG9tbWVyQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDUyMDg2N30.1oxfXWHYh_iU-2cAdJSiVGIvnfV4PsTHTsWRrH7Qivw','2021-10-18 08:34:27'),(470,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDUyMjQwN30.j6mJv3OeEc_f9EwQmbfMpG9dTALTQkCI-NsWzIaMACU',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ1MjI0MDd9.m01-SOInFCVgJGnBq4HcqGb0hltmnmV0zhtPyBakbrw','2021-10-18 09:00:07'),(471,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ1MjI4MDh9.atSzxKu_mwy2rbRl9N16yM7Z1n8RsjTOG7Erk4z_mAE',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ1MjI4MDh9.KlvIZ188niqvMBEovke9zl-KvneGe-Vj6UMdie270FU','2021-10-18 09:06:48'),(472,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1MjI4MTd9.ViPM-y_ipyRseYLTznkZgE5mrkYq1aJClbdu0Kcbv7M',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDUyMjgxN30.K-iduoHr-8txrHxr3oqV988BPFdgitSrvqivcZstrRs','2021-10-18 09:06:57'),(473,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1MjMyNzJ9.cRqIlxYXpk6H9AyeGPWD1IhHR4lV4x93W0F4JDcdVus',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDUyMzI3Mn0.Ru-KFc2Z-xfThdEYaIyGw0Y1kRxbbQg4EsXl0FK-E8I','2021-10-18 09:14:32'),(474,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDUyNDgxMn0.AkXmslPnL5mQRjRfjY4kN5X9pIhU3xkFSqpEVAPdwYo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2Vyc19waG9uZSI6IjA5ODg5ODc4NzgiLCJ1c2Vyc19lbWFpbCI6ImRhbGF2bi5ncm91cEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImY1YmIwYzhkZTE0NmM2N2I0NGJhYmJmNGU2NTg0Y2MwIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1MjQ4MTJ9.2q7-V6hRmfysJem2-1iQ19XlKQFqEyw2NInxiT89RDc','2021-10-18 09:40:12'),(475,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDUyNTYzN30.c1qGfbny7KcrRNS1-5afvBK7sxcER7s7AI5YrykI49w',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2Vyc19waG9uZSI6IjA5ODg5ODc4NzgiLCJ1c2Vyc19lbWFpbCI6ImRhbGF2bi5ncm91cEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjkwMzIwOTU2Yzk2MzkyMzhkMTE5YmRkYjlkYTU5NWEyIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1MjU2Mzd9.VS3vCCmFPA8mSKF1Au9Jvrs6OhyiKvkAyj_InmkMe1k','2021-10-18 09:53:57'),(476,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2VyX3JvbGUiOiJzaGlwcGluZyIsImlhdCI6MTYzNDUyNzMyOX0.gzZAqv814Yp_K3E0IYlE2PcAwTdzGCfvqdPskgHf_AA',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjMsInVzZXJzX2Z1bGxfbmFtZSI6InNoaXBwaW5nIDEiLCJ1c2Vyc19waG9uZSI6IjA3MDg1NDY2MjM0IiwidXNlcnNfZW1haWwiOiJzaGlwcGluZzFAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJhM2RjYjRkMjI5ZGU2ZmRlMGRiNTY4NmRlZTQ3MTQ1ZCIsInVzZXJfcm9sZSI6InNoaXBwaW5nIiwiaWF0IjoxNjM0NTI3MzI5fQ.nWno5F8O5_SI6Yf23w63P3_jgqGDs7Iffrw1w6Ihq3s','2021-10-18 10:22:09'),(477,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDUyODQxNX0.s1dXhupI8qYVVOyJm7SIS9sHuXjBGLOrNMdrtIKb7Yw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2Vyc19waG9uZSI6IjA5ODg5ODc4NzgiLCJ1c2Vyc19lbWFpbCI6ImRhbGF2bi5ncm91cEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjkwMzIwOTU2Yzk2MzkyMzhkMTE5YmRkYjlkYTU5NWEyIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1Mjg0MTV9.tlmBGGMEMlDKussDSL_hGQgVQsjAJzldNkBYdG9zqBY','2021-10-18 10:40:15'),(478,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0NTMwNjUyfQ.oID7cTycTpW0IYV0a_ftHQhLsZI4sExGLVBQgRcsh8o',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcnNfcGhvbmUiOiIwODk4OTg3ODc4IiwidXNlcnNfZW1haWwiOiJsZWhvbmdzb24udGNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiIyNWY5ZTc5NDMyM2I0NTM4ODVmNTE4MWYxYjYyNGQwYiIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDUzMDY1Mn0.w-x-Ot6PpIf9MMoH50kJTNQHurGhOsS4YvssSQEvf_0','2021-10-18 11:17:32'),(479,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1MzE2ODh9.66YttFPDggckwwG8hFF3WykF2vZPRyk2uX1K0skF-JU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDUzMTY4OH0.V4WLJYtEuehtNhkEv13j80bfOPWlKukQ3eqNH5w_x68','2021-10-18 11:34:48'),(480,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1MzE4NjN9.SmZKi4T9qHKPyVD2ucM9NfkJhX0muEuBX6UEx-RwOB0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDUzMTg2M30.XYeJJrgkV9cncp7CBEAmy_NszOs-a-9iXvZbdDCIqK8','2021-10-18 11:37:43'),(481,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1MzUwNzh9.gCqE7Z6u1d6BLp2Jzn9pQOLT30vei95Mc0V0rKqJItA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDUzNTA3OH0.kbUwSi8j1gFE0I-YdMI929kJeyWDVuoTpeDjBLKIY14','2021-10-18 12:31:18'),(482,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1Mzc5Mjl9.GIdK_Z21mfX0AMpqxVV3F2z3K7s7_5Rx-2HtknvVg4E',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDUzNzkyOX0.ew3WIfVhBUSgVYP9QuLYy2TQDwlUcbBcyIiZjn1IykE','2021-10-18 13:18:49'),(483,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0NTM5NjYwfQ.BEqn_cQVoxGmFTAB27nPCEqrRd4DhBs-felfyZod4DE',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcnNfcGhvbmUiOiIwODk4OTg3ODc4IiwidXNlcnNfZW1haWwiOiJsZWhvbmdzb24udGNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiIyNWY5ZTc5NDMyM2I0NTM4ODVmNTE4MWYxYjYyNGQwYiIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDUzOTY2MH0.E6nEIfxoN9QoPGw6ilRHXUrefpMQEmc2i92KYJAk_lU','2021-10-18 13:47:40'),(484,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDU0MDA0Mn0.isG8kOi0hRD7HSo632ZBwT8J2baxvO2TEviKbowjisE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2Vyc19waG9uZSI6IjA5ODg5ODc4NzgiLCJ1c2Vyc19lbWFpbCI6ImRhbGF2bi5ncm91cEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjkwMzIwOTU2Yzk2MzkyMzhkMTE5YmRkYjlkYTU5NWEyIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1NDAwNDJ9.wMRrZnoGbB6fnbO0EvCKmYOVMUhr2loGNo4nv8Y5wQY','2021-10-18 13:54:02'),(485,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ1NDE5ODV9.38HzooznXkp8mM4cOEJR33j93PsZsYMAZQp_A_1EMAI',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ1NDE5ODV9.ykWAHMNDRjiJ_gYWLCZ3bsPOPeD8ptmMj44jftNDJh4','2021-10-18 14:26:25'),(486,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ1NDY1MTl9.iU7V5GCJtFsK6m5GW-nYeEpNDahl7ikPSCA4SVHW6SA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDU0NjUxOX0.RhC1DoKUcG-PnMNI6OcHIS3fkTcyY6WUyRDuhBW0iig','2021-10-18 15:41:59'),(487,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0NjA0NDQzfQ.3t9VhnQAz0VAv2HxRBTCj-190X-psXJd66Pg31tMTME',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcnNfcGhvbmUiOiIwODk4OTg3ODc4IiwidXNlcnNfZW1haWwiOiJsZWhvbmdzb24udGNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiIyNWY5ZTc5NDMyM2I0NTM4ODVmNTE4MWYxYjYyNGQwYiIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDYwNDQ0M30.K5fQd4yIgVNXSaEe7PIiPXNHAqyuIOAJ-h8whwiEs2g','2021-10-19 07:47:23'),(488,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDYwNDgyN30.XuROvRq_qcCLz_cOsGhaDxaXhh3u2AB3wzoSSc_t-GE',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2Vyc19waG9uZSI6IjA5ODg5ODc4NzgiLCJ1c2Vyc19lbWFpbCI6ImRhbGF2bi5ncm91cEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjkwMzIwOTU2Yzk2MzkyMzhkMTE5YmRkYjlkYTU5NWEyIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ2MDQ4Mjd9.tJCethLjLNe2dgqO5rObxsbfN596I_HDNY6-4BGqXz4','2021-10-19 07:53:47'),(489,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ2MTAyOTF9.SgHtKb1cyKdtflHQ6ur3PvoAkRrBnlpmgbO2J70MhNU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDYxMDI5MX0.IDyungSCHqfcAUu3HH9U90X_Yff0eFEXASQWHuJtEnQ','2021-10-19 09:24:51'),(490,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDYxMjM1N30.imeYTiytJuFZM531W4ITgmQgEvO78XpM6xjXA9tmQvg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2Vyc19waG9uZSI6IjA5ODg5ODc4NzgiLCJ1c2Vyc19lbWFpbCI6ImRhbGF2bi5ncm91cEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjkwMzIwOTU2Yzk2MzkyMzhkMTE5YmRkYjlkYTU5NWEyIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ2MTIzNTd9.OtXWIcq6961oXTWBSavsEnZQZMDcBj9929rERAu_uuU','2021-10-19 09:59:17'),(491,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ2MTc2NjJ9.6MmFKTtz5miH8IxQ56VhTdqciCIqJqXuRl48IwWKh_g',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ2MTc2NjJ9.9caX-mIswmZngpmh8_807S_1ZP4elzN5uerT7jRL7A8','2021-10-19 11:27:42'),(492,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ2MTg0ODB9.dpKjbG8uSULMI6FspEXVXN40N81YviNrM8noq6V2deY',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDYxODQ4MH0.TL8kVw5hnlVSjS4dh8HHTZ7Fir7EFiJ8RT5X6PquEjA','2021-10-19 11:41:20'),(493,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDYyNjY5N30.44ImtJLpid9TCBffzjs8b5FucfUThG46btswYtK7Lo8',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ2MjY2OTd9.DkaT4K2v6Xzis-itEs_eVhuw74fcYIMahCttj-eFZZc','2021-10-19 13:58:17'),(494,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE2LCJ1c2Vyc19mdWxsX25hbWUiOiJYdcOibiIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM0NjI5NzM0fQ.vtkwhh12p6okfeJKTCO6xCwzJUnj8mB02VFCnxJ5Zxw',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE2LCJ1c2Vyc19mdWxsX25hbWUiOiJYdcOibiIsInVzZXJzX3Bob25lIjoiMDM4NTU2OTI5NiIsInVzZXJzX2VtYWlsIjoiIiwidXNlcnNfcGFzc3dvcmQiOiIyNzc1YWNiNjQxZTMzMTVjODljMzVlOTc1OWM2ZTY0MSIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM0NjI5NzM0fQ.RUZy0g8tS6AdCd0qxgfsirJ38nekIuoMk_mgiizddy0','2021-10-19 14:48:54'),(495,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ2NDA1OTl9.fO3tBTJpaNlDJWfhWTG8rUkd-ok6lNZXuARv5i6CirQ',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDY0MDU5OX0.8Sd_5n3muQohZb1SrFtN9YG5ceQSS7apffu4-sKgL2o','2021-10-19 17:49:59'),(496,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE4LCJ1c2Vyc19mdWxsX25hbWUiOiJ0aG8iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDY0NTkyN30.7BQSQo-1QbDL8mbr2Ti1xYYuBpd8FgGIO1vSKTELmDs',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE4LCJ1c2Vyc19mdWxsX25hbWUiOiJ0aG8iLCJ1c2Vyc19waG9uZSI6IjA5MTg1NDc5OTAiLCJ1c2Vyc19lbWFpbCI6ImZ1bmliYWJ5LnN0b3JlQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiMjVmOWU3OTQzMjNiNDUzODg1ZjUxODFmMWI2MjRkMGIiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDY0NTkyN30.oKNXy1sQ-3YNlHdSDLMLPqPA4Al5gqEIytrKl-NPook','2021-10-19 19:18:47'),(497,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ2OTA2Mjd9.URrbDezd5iXcGcUXiWsipWvsXaGum9uDHWMwZb3W4eM',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDY5MDYyN30.vHN3cSrTg21rDpiC8PD8DqefobbnZ_GJFkDOsTqHygY','2021-10-20 07:43:47'),(498,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDY5MDg0NX0.kbWMuyA518sfdYmag_ZdceLjYgQYInpu1g6v9D2p-E0',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2Vyc19waG9uZSI6IjA5ODg5ODc4NzgiLCJ1c2Vyc19lbWFpbCI6ImRhbGF2bi5ncm91cEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjkwMzIwOTU2Yzk2MzkyMzhkMTE5YmRkYjlkYTU5NWEyIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ2OTA4NDV9.cO0wPODYw58cr9CiFivvLHIvkdq7r2No00nJodJHTa8','2021-10-20 07:47:25'),(499,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0NjkwOTcxfQ.3hTf107UmvavIABIGqE6m2VOuWPo_5bnaoJm5CJwj0Y',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcnNfcGhvbmUiOiIwODk4OTg3ODc4IiwidXNlcnNfZW1haWwiOiJsZWhvbmdzb24udGNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiIyNWY5ZTc5NDMyM2I0NTM4ODVmNTE4MWYxYjYyNGQwYiIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDY5MDk3MX0.RKuFQwPkolCV-IkpQf9ordAbd6COmNYEIARhHhzbgqc','2021-10-20 07:49:31'),(500,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ2OTg1MzR9.x2lBzTi46hZL2hyccWWirL2j-4fQKw6UkfqC2Hos7OY',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDY5ODUzNH0.Y585GOsRw-q2Jhk2PwONY5RC-qCHpM0hcnh5dbUQQ44','2021-10-20 09:55:34'),(501,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ2OTk2NjV9.uZgIckem17FdnVO4bxZA1nZTywEd8WLSUPyttoWWIM8',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ2OTk2NjV9.6ePJx-an7FN6lDldD3IT62L5nkc2p4fy8D-kO4hdelA','2021-10-20 10:14:25'),(502,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ2OTk2ODV9.BDpbrQDkfkuhe3UsOwzWr1Z_iS4h4_Q4lZTvDo5dXHA',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImUyYzRhNDBkNTBiNDcwOTRmNTcxZTQwZWZlYWQzOTAwIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ2OTk2ODV9.1GvQcQYM4K1YrSz4cX37vhVe_fkpIvZdemDwSNqs7hs','2021-10-20 10:14:45'),(503,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ2OTk5NDR9.pn6pEeLxI0KWjF8PRKjzw-vxwGNl1BGtQMfQazpnKdw',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImUyYzRhNDBkNTBiNDcwOTRmNTcxZTQwZWZlYWQzOTAwIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ2OTk5NDR9.MUKRYWlt6hR6L1nGHUmG8fNxM1QR4cgBuPQBuUPe3k8','2021-10-20 10:19:04'),(504,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDAxMjB9.pSaHeCjOO_qo8kP4wZvSPAeSlem9eyeMsqlj3rBnJ08',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjFlNzQ3ZGRiZWE5OTdhMWI5MzNhYWY1OGE3OTUzYzNjIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDAxMjB9.qtO5DVZ-4FFJmt9rRZJid2pdp_VqDTUNfE9G4mvc8iE','2021-10-20 10:22:00'),(505,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDAyNzV9.otCzfTJflnWjRFysfjCPGBhqjNIOAuPXyx5YJOHaRHc',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjFlNzQ3ZGRiZWE5OTdhMWI5MzNhYWY1OGE3OTUzYzNjIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDAyNzV9.F5gBU89Q072iKBymru-a5fiiE_JUMy7qrgfT0nOfmR4','2021-10-20 10:24:35'),(506,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDAzMjJ9.A3uKWbJuaC49995bhY7BK3CLGini-pOYcvqwRomau94',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDAzMjJ9.eIeHyVD8Mnb3xEDkRSMUeY1F_zY7PkWletfRnsTEEXQ','2021-10-20 10:25:22'),(507,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDA0NjR9.7xPOJ4D5LpQK5dyaPArKZEyjI8LzWb2Y2SIAhD6De_g',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDA0NjR9.n4zE3VpMrmPgzvAK9xGe0OhIoAs6tEyZYnjQWxums9Y','2021-10-20 10:27:44'),(508,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDA0Nzl9.VtQG4JkiF8HBiR8Ow3zNuyE114X0-woI6fstN3M0Qd4',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjU4OGZkZmE2NDViN2YzYzI2MDE4ODQ5NGJjYWZhMTQ5IiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDA0Nzl9.AXQ26Ur3J7GSAFbWeMOYJYLTMzC3cqhWnzqVFjKGWi8','2021-10-20 10:27:59'),(509,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDA1MDh9.InrpGREPdG7JQUpKXvok0_fWfjhr0QCnZh5qzOw6338',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjU4OGZkZmE2NDViN2YzYzI2MDE4ODQ5NGJjYWZhMTQ5IiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDA1MDh9.LMpcs5ShzxBdl0ll28SQg9ugWGyW9hifJzOqPRurHDI','2021-10-20 10:28:28'),(510,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDA3NDN9.vz3dbLJzEYty1t4wOy_PAdw3ZviOyAVJfJLBWGxcC7Q',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjRjYjgxMTEzNGI5ZDM5ZmMzMTA0YmQwNmNlNzVhYmFkIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDA3NDN9.hr__6cS8JhUQ86I5lUzgPAqf79vcY659RtX8HPw_34g','2021-10-20 10:32:23'),(511,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDA3OTV9.BDKHmCMi9Zr2CzzwToYEu8A-u_5_nrgmiQaKA3ngs78',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjRjYjgxMTEzNGI5ZDM5ZmMzMTA0YmQwNmNlNzVhYmFkIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MDA3OTV9.ey0MoDctTFpwBxafvwwOoNiVRpYCuJEh7-J2GCdDdIc','2021-10-20 10:33:15'),(512,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM0NzAxNDk2fQ.PfMkTi-x2c3V2X8QfH_wL6o7bv7GIbbl9wkCw1SnZxg',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoiY3VzdG9tbWVyQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDcwMTQ5Nn0.9fc3Ja92UkQnVhgW1jSskMLf0QaMaMrDRtCm3_ZSjLk','2021-10-20 10:44:56'),(513,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ3MTE5NTR9.YtoHaN7fJeojyA2lxgBQAAck_eVX4Ara4rOmxVOzsAA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDcxMTk1NH0.nds1d5soX6tzPtr6lOD_ZzIN40kv5qHMkwj5GZ7F6iU','2021-10-20 13:39:14'),(514,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTYxMDN9.56jgn_rw1YZDe1yWmvrtY6YDMDbIHqf4_c114zzJCUU',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjgzMjAiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDcxNjEwM30.xsJFToaGa8vjHauYINAb5qJwjuNLposAWbo6RDBoj94','2021-10-20 14:48:23'),(515,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTYxMTd9.nUYSQSoT6Y-c0n_Hwoojbr946YZZn-DOSUD__faAkck',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjgzMjAiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDcxNjExN30.FYSg3j4dV8cZAEWyi4ypNbQSZn_8Z87W9rKaoqNAuF4','2021-10-20 14:48:37'),(516,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTYyMTJ9.JRVym7H3azg-DP4jkZ0CfNVhIRzsgZCPgjA-eAdn1EU',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjgzMjAiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDcxNjIxMn0.O3OJ72xwUAFMU5NNa3Pqt79rJFzBG5lb06haKqRXsvM','2021-10-20 14:50:12'),(517,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ3MTYyNjF9.p0ylvbiOMCeFiXxWjd447d68pZ1IMzt4kg52jfc8VJw',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDcxNjI2MX0.898ELbX2S2OYroeQyesrEwY5PLljC1UE279FSaI2-BA','2021-10-20 14:51:01'),(518,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM0NzE2MzU4fQ.-HJ3Jo3vtiZy58RfjD_Ej-poWXLZAJqJwkB6d7si4rg',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidmFubHVjLndvcmRwcmVzc0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjY4MDEiLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDcxNjM1OH0.Ji4G_7xcRaSDFzF0h23Ho2kQcG1bc0Nsw3OXzSuRn68','2021-10-20 14:52:38'),(519,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM0NzE2NjIxfQ.ufZRBEPTDIA42qpmmPKxE4xn7r_X8ttOyb5s_9hsfV8',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTYsInVzZXJzX2Z1bGxfbmFtZSI6ImN1c3RvbW1lciIsInVzZXJzX3Bob25lIjoiMDcwODU0NjYyMyIsInVzZXJzX2VtYWlsIjoidmFubHVjLndvcmRwcmVzc0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjFmYjMzM2JjMzRiOGQxZjFkMWQ0MzRmOTA4NjkzNjdhIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTY2MjF9.Lfn-LGP0Q3U7w5N5ZWJDixl5ri_h8UUgHiO-uZgcC2I','2021-10-20 14:57:01'),(520,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTY4NDl9.nHJYiai_CefgbNI22xv_nF6lHvK32fdcwEkKb7jTVZo',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjY5MGY0NGM4YzJiN2RlZDU3OWQwMWFiZThmZGI2MTEwIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTY4NDl9.j9BFroF1xOWqZsHZIS6Egd-n-REAl_Ri_QKAIi-wYCg','2021-10-20 15:00:49'),(521,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTY4NzJ9.FQ6pL5niLclnRFFyj9tZocwL8HRUXieVciEBwdBc6Go',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImI4ZjNkZGFjNmJmOTBlMWI4MGNiOTYxZjJiZTBkYjVjIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTY4NzJ9.dPEd2nCnNlSL8j10CHYqdWiO1kdT67IF0l00uywLM4Q','2021-10-20 15:01:12'),(522,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTc0NzZ9.4zKSI_g5kdswDP7_eg1Ck4lJOqfn10WRgNdB_GPEI9Q',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQ4OGMxZTAzMzIwNjVlYjgwZTExMjkxMzlhNjdkNmUwIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTc0NzZ9.-lbrO7oRGcnA5bqVBSYhmgfthXyKhEFlhv4eF9EkH-g','2021-10-20 15:11:16'),(523,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTc1OTZ9.F0tjiq1nIthbAWTpI99bW2xb-OF0kJdp356N4kndq2M',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQ4OGMxZTAzMzIwNjVlYjgwZTExMjkxMzlhNjdkNmUwIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTc1OTZ9.0DVWjzL6SRlIujyFJF0WdOL2_EF6nu4ZBVHl2QabsEQ','2021-10-20 15:13:16'),(524,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTc4MDV9.4rRKP9AEN4zyFVF6wJfnksIk-Ss7Ziv7gI6WJuqL_fk',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQ4OGMxZTAzMzIwNjVlYjgwZTExMjkxMzlhNjdkNmUwIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTc4MDV9.tC74ajVWNncZfU6POu8axeAAV5tbY0HgaCGzsbl2f3g','2021-10-20 15:16:45'),(525,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTc5NTF9.Jt5iCQYLVvUXUebgZdRjQbWkkSMS9Kg6Eh-sl2WksMw',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQ4OGMxZTAzMzIwNjVlYjgwZTExMjkxMzlhNjdkNmUwIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTc5NTF9.yCqJ9kr6VzrcpliCZNzJxUVEx0PS-qd48Ywt55JI3zo','2021-10-20 15:19:11'),(526,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTg1NTZ9.9n42lVWk3Whfg21YNE3sjniSZNnOwzZClPPIpupzJig',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQ4OGMxZTAzMzIwNjVlYjgwZTExMjkxMzlhNjdkNmUwIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTg1NTZ9.1slyay_hdqwN8vXeNngaaaj_Msgs-O2WpOdMpuW557c','2021-10-20 15:29:16'),(527,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTg4NDF9.dVNttrbAUfxNpdHB5RmmfXpLqQvBjH3cZE0eSrpR-Lo',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQ4OGMxZTAzMzIwNjVlYjgwZTExMjkxMzlhNjdkNmUwIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTg4NDF9.3tULFCuwhLEXWh4a4aFG35Bj1FRJrLdUR07uKdR9Miw','2021-10-20 15:34:01'),(528,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTg5OTh9.JLOXP23IP3a2NkT-l9PYoP1GQGMJlMwLGXyduiQiBQc',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQ4OGMxZTAzMzIwNjVlYjgwZTExMjkxMzlhNjdkNmUwIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTg5OTh9.93Qq775bmXrihANuz8UFDdE-IadVy1DBFt6ldENuHnQ','2021-10-20 15:36:38'),(529,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTkyMjB9.5_JiSY1-_-BOMMxipgaHIODIifB3vUkhfjd7b4dYr-Q',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQ4OGMxZTAzMzIwNjVlYjgwZTExMjkxMzlhNjdkNmUwIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MTkyMjB9.Ak54s6fPka-Pf6YCXBQ5cImbb42w5dkOj2164xidbuQ','2021-10-20 15:40:20'),(530,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MjA3NTF9.l1gZ5hnZkFQa1bBrACa4FRSXpzrEF4QEj-jilj7WIoM',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQ4OGMxZTAzMzIwNjVlYjgwZTExMjkxMzlhNjdkNmUwIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MjA3NTF9.M0bASG6vOoOP64nu_kW2oPeh83OmahiciYDQstqgvRc','2021-10-20 16:05:51'),(531,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNDcyNzQxNH0.GKO52ajYdnsUr3UfuGPRnINu5824okZ3hp0p_1K5J_k',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTMsInVzZXJzX2Z1bGxfbmFtZSI6IkzDqiBUdeG6pW4gQuG6o28iLCJ1c2Vyc19waG9uZSI6IjA5NzQ5MDA5MDMiLCJ1c2Vyc19lbWFpbCI6InR1YW5iYW85MkBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6ImU4MDdmMWZjZjgyZDEzMmY5YmIwMThjYTY3MzhhMTlmIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3Mjc0MTR9.XR5pLBwAC4aomW9hLjkvboUlmz7dkw0fktezde-Dv0E','2021-10-20 17:56:54'),(532,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MzE3NjV9.N2ztCdUgouWErmqHcqjsidGvff0-xVpWS9Iwag0KcfA',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjAyNmEzOWFlNjMzNDNjNjhiNTIyM2E5NWYzZTE3NjE2IiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MzE3NjV9.rnFbsZ4T_VlDIVhR78R58Z7Tp35Ezh3rrfOhjR6-GYY','2021-10-20 19:09:25'),(533,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MzE4NTN9.DdG2YenyZFxpQy0PYZuAubn1CCdA2scOWJW8RfMidAo',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjAyNmEzOWFlNjMzNDNjNjhiNTIyM2E5NWYzZTE3NjE2IiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3MzE4NTN9.W_f0jscT5jYvjrDijs6xey7a4s9h6fS2R0AQ5KhVXMk','2021-10-20 19:10:53'),(534,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3NDE1NTJ9.KB7MmR_oPlKUz5KDP4nxTpG1wD-NovA2PYdIf4kkrgA',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3NDE1NTJ9.41znV4IXT5q121AbAqczD_Vf1RhNGT041vadK1weOHE','2021-10-20 21:52:32'),(535,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3NTk0MzV9.bKfXA_9IctYD1gbJgiBdwFuL_wPBnEvsgu7EQijcSlg',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3NTk0MzV9.e6KoMA3ZwAs62jpObb-Yi5jl1LKfzqmTRHSfA_se-3s','2021-10-21 02:50:35'),(536,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Nzk2MzYyfQ.aKraMokVZkIeCJFbFccMj3F4qQKFBLSdbMMJRcorhEk',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcnNfcGhvbmUiOiIwODk4OTg3ODc4IiwidXNlcnNfZW1haWwiOiJsZWhvbmdzb24udGNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJjYTNhOWJlNzdmN2U4ODcwOGFmYjIwYzhjZGY0NGI2MCIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDc5NjM2Mn0.3ZJqDKuhUExSv61fhjAlxNGVcX7DDroLLZyttrwmrpk','2021-10-21 13:06:02'),(537,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3OTcwNjZ9.yuI7aIQ6FNWm7YJV8sFoI_IVEj1YTJX2-SeeLgM5_M4',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3OTcwNjZ9.2unXg4IYfpNssGcCSgT-XIucHYFgOOdujZIilosB4tI','2021-10-21 13:17:46'),(538,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ3OTcwNzN9.Zw3PTz6SIurffBqJRJqSigP1O35wBkZXHzqH9b41CTU',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDc5NzA3M30.zG4TiASMFguL8crDk4j9rfwkvA9IOosU06rwTQim6j0','2021-10-21 13:17:53'),(539,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Nzk3MzAyfQ.BKU26l86GztpUcYAgM6_-7oifNUI892LgrpSnawAct4',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcnNfcGhvbmUiOiIwODk4OTg3ODc4IiwidXNlcnNfZW1haWwiOiJsZWhvbmdzb24udGNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiI4MzE4NzU1MDc0OWU2YjgwMjRhMDk3NjMwZjlkNDcyMiIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDc5NzMwMn0.qJn50FCSdQmjeM7M5u9FiOsXmcm2hV5R9qHEgGfe9-w','2021-10-21 13:21:42'),(540,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0Nzk3NjM3fQ.WcYccqYPxsitRK9GaL2ov-4LaWQ-jinutv3Xhq022vA',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcnNfcGhvbmUiOiIwODk4OTg3ODc4IiwidXNlcnNfZW1haWwiOiJsZWhvbmdzb24udGNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiI4MzE4NzU1MDc0OWU2YjgwMjRhMDk3NjMwZjlkNDcyMiIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDc5NzYzN30.37_NFxuf5PkzWcDHWUkYNCrIZt7O8aZgRv7z-2SNDik','2021-10-21 13:27:17'),(541,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3OTc4ODN9.RSX3qLBk7B9xH0gI6Epr_Nabpsqvmh7PQRSLvKRbaZk',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6OTIsInVzZXJzX2Z1bGxfbmFtZSI6InZ1b25nIiwidXNlcnNfcGhvbmUiOiIwOTgxMzE0ODQ5IiwidXNlcnNfZW1haWwiOiJ2dW9uZ0BnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQyOTdmNDRiMTM5NTUyMzUyNDViMjQ5NzM5OWQ3YTkzIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ3OTc4ODN9.K1vjAK-AKYTEQKW-aLfBKsRi3dTBL-pUyitBDU75TZ4','2021-10-21 13:31:23'),(542,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ3OTg5NDV9.FoA37sOZNTZ7sCxo22Xqxk4APCAR19wrfSpVBk3ZKT4',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDc5ODk0NX0.DVlXKPju3apCYwo0UuJQ3oOHy_SnQIGwf1qYtqHJIjk','2021-10-21 13:49:05'),(543,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ4MDMzMjZ9.9d8FOe2ac3R5aw-SpTtCkwawT4SN3yiip1QSup9oIDA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDgwMzMyNn0.JuBOnIqex6-qf2XeGMo7lcgtR_OVeHpIlDg2JZsdEe8','2021-10-21 15:02:06'),(544,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDgxODE3OX0.WWEmS_VNiLueybzN1fRtZ5ddi_7eXN_QZnIJirP0-zo',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2Vyc19waG9uZSI6IjA5ODg5ODc4NzgiLCJ1c2Vyc19lbWFpbCI6ImRhbGF2bi5ncm91cEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjkwMzIwOTU2Yzk2MzkyMzhkMTE5YmRkYjlkYTU5NWEyIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ4MTgxNzl9.gjpaRUwSjarmN62JMyHQJR7EAeIkIbFH8L79v9mrKbg','2021-10-21 19:09:39'),(545,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0ODE4NDI0fQ.eBzKa0aAr7qPGeBbzztV9bHG9motL__Pd2zlqp_ymgE',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcnNfcGhvbmUiOiIwODk4OTg3ODc4IiwidXNlcnNfZW1haWwiOiJsZWhvbmdzb24udGNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiIyNWY5ZTc5NDMyM2I0NTM4ODVmNTE4MWYxYjYyNGQwYiIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDgxODQyNH0.JuDhGlSyEodclbgOQQ9kcAo-UqMuBqucJdgWjVq5t68','2021-10-21 19:13:44'),(546,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE5LCJ1c2Vyc19mdWxsX25hbWUiOiJMZSB0aGFpIGJhbyIsInVzZXJfcm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM0ODY0MDU3fQ.JELfjHwlD0nrDovBsKjWHo0bnh807ywfQmVdPyiopi8',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE5LCJ1c2Vyc19mdWxsX25hbWUiOiJMZSB0aGFpIGJhbyIsInVzZXJzX3Bob25lIjoiMDkwODc4MDUwNSIsInVzZXJzX2VtYWlsIjoidGhhaWJhb2wzOEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjI1ZjllNzk0MzIzYjQ1Mzg4NWY1MTgxZjFiNjI0ZDBiIiwidXNlcl9yb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzQ4NjQwNTd9.ioOyYuuYAk-7sCcyGbMh1pYAslZPOdtToHqkGy9TirI','2021-10-22 07:54:17'),(547,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0ODY0ODczfQ.nAtFmSmxict7VUoazxw1nT3Mt0IH7UWIr-Nl_0hfhI8',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcnNfcGhvbmUiOiIwODk4OTg3ODc4IiwidXNlcnNfZW1haWwiOiJsZWhvbmdzb24udGNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiIyNWY5ZTc5NDMyM2I0NTM4ODVmNTE4MWYxYjYyNGQwYiIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDg2NDg3M30.8I3Hefg4Avce07y0KELRRGrAEE4uFeOejDDYjvtqEoQ','2021-10-22 08:07:53'),(548,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDg2NTA3NX0.T5a3WgK1MeDwJgl48J-FwGaUoP8ZbtuAVoXtsTUj8fA',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2Vyc19waG9uZSI6IjA5ODg5ODc4NzgiLCJ1c2Vyc19lbWFpbCI6ImRhbGF2bi5ncm91cEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjkwMzIwOTU2Yzk2MzkyMzhkMTE5YmRkYjlkYTU5NWEyIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ4NjUwNzV9.jx3ZC1nhorXz3Hzkhvy07flLUP0iQbAZrndK6OZMsqw','2021-10-22 08:11:15'),(549,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ4NjgwODV9.su96OTsanOt9POTdxy50y6V4mz0Fu3yQ5jBdHWovYlk',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTAsInVzZXJzX2Z1bGxfbmFtZSI6Im1hbmFnZS1kYWxhIiwidXNlcnNfcGhvbmUiOiIwOTQ4MDM2MDE4IiwidXNlcnNfZW1haWwiOiJodG1zLmdyb3VwLnZuQGdtYWlsLmNvbSIsInVzZXJzX3Bhc3N3b3JkIjoiYTNkY2I0ZDIyOWRlNmZkZTBkYjU2ODZkZWU0NzE0NWQiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDg2ODA4NX0.ISNlWNJdP1HjVnt_Har5fX_OPhJxiEia7pAlQ3cdSNs','2021-10-22 09:01:25'),(550,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcl9yb2xlIjoiYnVzc2luZXNzIiwiaWF0IjoxNjM0ODcxNDU0fQ.HTsyUNl9bqkH4wZmY1i38QgcKsTqZETFcSsyCUuaJeg',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE1LCJ1c2Vyc19mdWxsX25hbWUiOiJMYW5nZmFtIiwidXNlcnNfcGhvbmUiOiIwODk4OTg3ODc4IiwidXNlcnNfZW1haWwiOiJsZWhvbmdzb24udGNAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiIyNWY5ZTc5NDMyM2I0NTM4ODVmNTE4MWYxYjYyNGQwYiIsInVzZXJfcm9sZSI6ImJ1c3NpbmVzcyIsImlhdCI6MTYzNDg3MTQ1NH0.rQ-HszIn1A9h03i1rz_26kTGitUzG_76D9rquC-dl4g','2021-10-22 09:57:34'),(551,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsImlhdCI6MTYzNDg3MTU1MH0.yHk55_yVHNjE7wdBxzRcu7pjJ9uCCJixMhLT5LaI0Hk',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6MTE0LCJ1c2Vyc19mdWxsX25hbWUiOiJRdeG6o24gbMO9IERBTEEiLCJ1c2Vyc19waG9uZSI6IjA5ODg5ODc4NzgiLCJ1c2Vyc19lbWFpbCI6ImRhbGF2bi5ncm91cEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjkwMzIwOTU2Yzk2MzkyMzhkMTE5YmRkYjlkYTU5NWEyIiwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQ4NzE1NTB9.0F1_dAgmom1HcOvY3AG1ETyQP6kZ_YUF643iXhkieio','2021-10-22 09:59:10');
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
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_uploads_infomation`
--

LOCK TABLES `dala_uploads_infomation` WRITE;
/*!40000 ALTER TABLE `dala_uploads_infomation` DISABLE KEYS */;
INSERT INTO `dala_uploads_infomation` VALUES (1,'2021-10-03 07:28:34',51,'https://appdala.net/wp-content/uploads/dala-image.jpg',464),(3,'2021-10-03 09:23:46',91,'https://appdala.net/wp-content/uploads/sachi-cafe-1-scaled.jpg',467),(4,'2021-10-03 09:24:02',91,'https://appdala.net/wp-content/uploads/sachi-cafe-1-1-scaled.jpg',468),(5,'2021-10-03 09:24:18',91,'https://appdala.net/wp-content/uploads/sachi-cafe-2-scaled.jpg',469),(6,'2021-10-03 09:24:31',91,'https://appdala.net/wp-content/uploads/sachi-cafe-3-scaled.jpg',470),(7,'2021-10-03 09:24:52',91,'https://appdala.net/wp-content/uploads/sachi-cafe-4-scaled.jpg',471),(8,'2021-10-03 09:27:36',91,'https://appdala.net/wp-content/uploads/sachi-cot-dua1-scaled.jpg',472),(9,'2021-10-03 09:28:31',91,'https://appdala.net/wp-content/uploads/sachi-cot-dua-2-scaled.jpg',473),(10,'2021-10-03 09:28:47',91,'https://appdala.net/wp-content/uploads/sachi-cot-dua1-1-scaled.jpg',474),(11,'2021-10-03 09:29:00',91,'https://appdala.net/wp-content/uploads/sachi-cot-dua-3-scaled.jpg',475),(12,'2021-10-03 09:29:33',91,'https://appdala.net/wp-content/uploads/sachi-cot-dua1-2-scaled.jpg',476),(13,'2021-10-03 09:49:04',51,'https://appdala.net/wp-content/uploads/mut-dau-tay-ngot-ngao.jpg',485),(14,'2021-10-03 10:14:23',51,'https://appdala.net/wp-content/uploads/6.jpg',486),(15,'2021-10-03 10:25:04',51,'https://appdala.net/wp-content/uploads/avd-0ebd1.jpg',487),(16,'2021-10-03 10:29:02',51,'https://appdala.net/wp-content/uploads/now-vn-deal-trai-cay-mua-1-tang-1-tat-ca-san-pham.jpg',488),(17,'2021-10-05 11:45:48',50,'https://appdala.net/wp-content/uploads/logo-nonglamfood-full-ngang-22-2-scaled.jpg',493),(18,'2021-10-08 11:13:48',91,'https://appdala.net/wp-content/uploads/logo-nlf-.png',496),(19,'2021-10-08 16:23:17',51,'https://appdala.net/wp-content/uploads/dala-logo-web-moi-xt-fix-ma-mau-7.jpg',497),(20,'2021-10-12 14:49:20',51,'https://appdala.net/wp-content/uploads/44012-01-1.png',502),(21,'2021-10-12 14:54:32',51,'https://appdala.net/wp-content/uploads/S-01-2.png',503),(22,'2021-10-12 14:55:01',51,'https://appdala.net/wp-content/uploads/4401-01-1.png',504),(23,'2021-10-12 17:54:44',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9.jpg',505),(24,'2021-10-12 17:55:35',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9-1.jpg',506),(25,'2021-10-12 17:56:01',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9-2.jpg',507),(26,'2021-10-12 17:56:23',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9-3.jpg',508),(27,'2021-10-12 17:56:58',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9-4.jpg',509),(28,'2021-10-12 17:57:16',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9-5.jpg',510),(29,'2021-10-12 17:57:35',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9-6.jpg',511),(30,'2021-10-12 17:57:54',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9-7.jpg',512),(31,'2021-10-12 17:58:30',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9-8.jpg',513),(32,'2021-10-12 17:58:49',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9-9.jpg',514),(33,'2021-10-12 17:59:10',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9-10.jpg',515),(34,'2021-10-12 17:59:44',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9-11.jpg',516),(35,'2021-10-12 18:00:11',51,'https://appdala.net/wp-content/uploads/238.chanhday-1-2.jpg',517),(36,'2021-10-12 18:00:37',51,'https://appdala.net/wp-content/uploads/2d829b44a905405b1914-2.jpg',518),(37,'2021-10-12 21:00:25',51,'https://appdala.net/wp-content/uploads/keo-deo-chocolate-handmade-1504932104-1-4140608-1509593909-13.jpg',519),(38,'2021-10-16 14:28:11',51,'https://appdala.net/wp-content/uploads/mut-atiso-do-cuc-ngon.jpg',526),(39,'2021-10-16 14:28:24',51,'https://appdala.net/wp-content/uploads/19c0794d10c1d1172b7d904202fb15f9-12.jpg',527),(40,'2021-10-16 14:28:33',51,'https://appdala.net/wp-content/uploads/mut-da-lat-1.jpg',528),(41,'2021-10-16 14:28:37',51,'https://appdala.net/wp-content/uploads/119676523-344329160243829-5882-7203-1323-1601457847.jpg',529),(42,'2021-10-16 14:28:42',51,'https://appdala.net/wp-content/uploads/cach_lam_mut_hoa_atiso_do_cuc_ngon_an_tet_12.jpg',530),(43,'2021-10-16 14:28:51',51,'https://appdala.net/wp-content/uploads/muthoaatisodo-3.jpg',531),(44,'2021-10-16 14:28:59',51,'https://appdala.net/wp-content/uploads/chi-tiet-2-cach-lam-mut-dau-tay-cuc-ngon-nhu-ngoai-hang-3.jpg',532),(45,'2021-10-16 14:29:03',51,'https://appdala.net/wp-content/uploads/mut-dau-tay-hu-thuy-tinh-1kg-KhJUiW-1.png',533),(46,'2021-10-18 10:01:19',51,'https://appdala.net/wp-content/uploads/dala-logo-web-moi-xt-fix-ma-mau-15.jpg',550),(47,'2021-10-18 10:09:27',51,'https://appdala.net/wp-content/uploads/dala-logo-web-moi-xt-fix-ma-mau-16.jpg',551),(48,'2021-10-18 10:10:00',51,'https://appdala.net/wp-content/uploads/dala-logo-web-moi-xt-fix-ma-mau-17.jpg',552),(49,'2021-10-18 11:15:35',114,'https://appdala.net/wp-content/uploads/tai-xuong.png',553),(50,'2021-10-18 11:23:08',115,'https://appdala.net/wp-content/uploads/tai-xuong-1.png',554),(51,'2021-10-18 13:50:29',115,'https://appdala.net/wp-content/uploads/tra-atiso.webp',556),(52,'2021-10-18 13:50:38',115,'https://appdala.net/wp-content/uploads/atiso2.webp',557),(53,'2021-10-19 07:52:28',115,'https://appdala.net/wp-content/uploads/keodautay.webp',558),(54,'2021-10-19 07:52:33',115,'https://appdala.net/wp-content/uploads/keodautay-1.webp',559),(55,'2021-10-21 19:21:30',115,'https://appdala.net/wp-content/uploads/thap-cam-say.webp',560),(56,'2021-10-21 19:21:40',115,'https://appdala.net/wp-content/uploads/thap-cam-say-1.webp',561),(57,'2021-10-21 19:21:50',115,'https://appdala.net/wp-content/uploads/thap-cam-say-2.webp',562),(58,'2021-10-21 19:41:07',115,'https://appdala.net/wp-content/uploads/Nam-linh-chi.webp',563),(59,'2021-10-21 19:41:11',115,'https://appdala.net/wp-content/uploads/nam-linh-chi-1.webp',564),(60,'2021-10-21 19:48:39',115,'https://appdala.net/wp-content/uploads/dong-trung-1.webp',565),(61,'2021-10-21 19:48:44',115,'https://appdala.net/wp-content/uploads/dong-trung-2.webp',566),(62,'2021-10-21 20:07:32',115,'https://appdala.net/wp-content/uploads/atiso.webp',567),(63,'2021-10-21 20:07:48',115,'https://appdala.net/wp-content/uploads/atiso-1.jpg',568),(64,'2021-10-21 20:07:54',115,'https://appdala.net/wp-content/uploads/atiso2.jpg',569),(65,'2021-10-21 20:14:59',115,'https://appdala.net/wp-content/uploads/tra-tim-sen.webp',570),(66,'2021-10-21 20:15:05',115,'https://appdala.net/wp-content/uploads/atiso-1-1.jpg',571),(67,'2021-10-21 20:15:11',115,'https://appdala.net/wp-content/uploads/atiso2-1.jpg',572);
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
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_users`
--

LOCK TABLES `dala_users` WRITE;
/*!40000 ALTER TABLE `dala_users` DISABLE KEYS */;
INSERT INTO `dala_users` VALUES (50,'2021-05-19 14:36:30','manage-dala','a3dcb4d229de6fde0db5686dee47145d','','manage-dala','manage-dala','manage-dala','0948036018','htms.group.vn@gmail.com','v4','v4','v4','v4',13,0,0,0,'',NULL),(51,'2021-05-19 14:37:36','dala-store','a3dcb4d229de6fde0db5686dee47145d','','dala-store','dala-store','dala-store','09480360101','dala-store@gmail.com','v4','v4','v4','v4',14,0,0,0,'',NULL),(56,'2021-05-19 14:47:18','custommer','1fb333bc34b8d1f1d1d434f90869367a','','custommer','custommer','custommer','0708546623','vanluc.wordpress@gmail.com','v4','v4','v4','v4',15,0,0,1,'','2021-10-11 17:34:33'),(57,'2021-05-19 14:48:49','GuestDalaAll','412789534f5cd5b263bb574ba2f09585','','GuestDalaAll','GuestDalaAll','GuestDalaAll','09480360107','GuestDalaAll@gmail.com','v4','v4','v4','v4',16,0,0,0,'4963','2021-10-19 19:29:02'),(62,'2021-05-19 14:48:49','supper-job','e6f6c1856909fd4b527b3ab04d0e99a3','','supper-job','supper-job','supper-job','0889450307','supper-job@gmail.com','v4','v4','v4','v4',17,0,0,0,'',NULL),(63,'2021-05-19 14:48:49','shipping 1','a3dcb4d229de6fde0db5686dee47145d','','shipping 1','shipping 1','shipping 1','07085466234','shipping1@gmail.com','v4','v4','v4','v4',18,0,0,0,'',NULL),(90,'2021-05-19 14:48:49','shipping_ghtk','a3dcb4d229de6fde0db5686dee47145d','','shipping ghtk','shipping ghtk','shipping ghtk','09480360123','shipping12@gmail.com','v4','v4','v4','v4',18,0,0,0,'',NULL),(91,'2021-10-03 09:10:42','CÔNG TY CỔ PHẦN NÔNG LÂM FOOD','a3dcb4d229de6fde0db5686dee47145d','2e0bff759d057e28460eaa5b2cb118e5','','','68 Nguyễn Huệ, phường Bến Nghé, Quận 1, thành phố Hồ Chí Minh','07085466233','vnwr.info@gmail.com','v4','v4','v4','v4',14,0,0,0,'',NULL),(92,'2021-10-07 14:33:03','vuong','4297f44b13955235245b2497399d7a93','','','','bien hoa','0981314849','vuong@gmail.com','v4','v4','v4','v4',15,0,0,1,'','2021-10-08 10:46:31'),(93,'2021-10-07 21:52:45','Lê Tuấn Bảo','e807f1fcf82d132f9bb018ca6738a19f','d41d8cd98f00b204e9800998ecf8427e','','','89 kp4 tân mai bh','0974900903','tuanbao92@gmail.com','v4','v4','v4','v4',15,0,0,1,'','2021-10-07 21:52:45'),(100,'2021-10-12 17:42:26','vuong1','4297f44b13955235245b2497399d7a93','d41d8cd98f00b204e9800998ecf8427e','','','123123','0981314848','abc@gmail.com','v4','v4','v4','v4',15,0,0,0,'2469','2021-10-12 17:42:35'),(102,'2021-10-14 14:51:32','Bảo Lê Tuấn','a3dcb4d229de6fde0db5686dee47145d','d41d8cd98f00b204e9800998ecf8427e','','','11','0974900900','demo01@gmail.com','v4','v4','v4','v4',14,0,0,0,'',NULL),(114,'2021-10-18 09:04:50','Quản lý DALA','90320956c9639238d119bddb9da595a2','','Qun l DALA','Qun l DALA','Hẻm 3/4 Đà Lạt, Lâm Đồng','0988987878','dalavn.group@gmail.com','v4','v4','v4','v4',13,0,0,0,'',NULL),(115,'2021-10-18 10:47:06','Langfam','25f9e794323b453885f5181f1b624d0b','','','','Đà Lạt','0898987878','lehongson.tc@gmail.com','v4','v4','v4','v4',14,0,0,1,'','2021-10-21 13:06:42'),(116,'2021-10-19 14:48:54','Xuân','2775acb641e3315c89c35e9759c6e641','d41d8cd98f00b204e9800998ecf8427e','','','','0385569296','','v4','v4','v4','v4',15,0,0,1,'','2021-10-19 14:48:54'),(118,'2021-10-19 19:18:47','tho','25f9e794323b453885f5181f1b624d0b','d41d8cd98f00b204e9800998ecf8427e','','','da lat','0918547990','funibaby.store@gmail.com','v4','v4','v4','v4',15,0,0,0,'6534','2021-10-19 19:27:47'),(119,'2021-10-22 07:54:17','Le thai bao','25f9e794323b453885f5181f1b624d0b','d41d8cd98f00b204e9800998ecf8427e','','','Số 2 trần hưng đạo','0908780505','thaibaol38@gmail.com','v4','v4','v4','v4',15,0,0,0,'9473','2021-10-22 07:54:17');
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
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_users_tracking`
--

LOCK TABLES `dala_users_tracking` WRITE;
/*!40000 ALTER TABLE `dala_users_tracking` DISABLE KEYS */;
INSERT INTO `dala_users_tracking` VALUES (64,'2021-10-18 11:17:23',0,1,114,'NULL'),(65,'2021-10-19 09:57:35',0,1,114,'NULL'),(66,'2021-10-19 14:48:54',3,1,116,'NULL'),(67,'2021-10-19 17:49:53',0,1,50,'NULL'),(68,'2021-10-19 19:18:47',3,1,118,'NULL'),(69,'2021-10-19 19:27:31',3,1,118,'NULL'),(70,'2021-10-19 19:27:47',3,1,118,'NULL'),(71,'2021-10-19 19:29:02',3,1,57,'NULL'),(72,'2021-10-20 10:10:25',1,0,92,'NULL'),(73,'2021-10-20 10:14:05',1,0,92,'NULL'),(74,'2021-10-20 10:18:46',1,0,92,'NULL'),(75,'2021-10-20 10:24:27',0,0,92,'NULL'),(76,'2021-10-20 10:25:18',0,0,92,'NULL'),(77,'2021-10-20 10:27:26',1,0,92,'NULL'),(78,'2021-10-20 10:28:13',1,0,92,'NULL'),(79,'2021-10-20 10:32:57',1,0,92,'NULL'),(80,'2021-10-20 10:43:53',1,1,56,'NULL'),(81,'2021-10-20 12:58:13',1,0,92,'NULL'),(82,'2021-10-20 14:50:36',0,1,56,'NULL'),(83,'2021-10-20 14:51:50',1,1,56,'NULL'),(84,'2021-10-20 15:00:59',1,1,92,'NULL'),(85,'2021-10-20 15:10:55',1,1,92,'NULL'),(86,'2021-10-20 15:40:16',0,1,100,'NULL'),(87,'2021-10-20 16:05:46',0,1,92,'NULL'),(88,'2021-10-20 18:13:05',0,1,56,'NULL'),(89,'2021-10-20 18:13:15',0,1,56,'NULL'),(90,'2021-10-20 19:08:41',1,1,92,'NULL'),(91,'2021-10-20 19:08:44',1,1,92,'NULL'),(92,'2021-10-20 19:09:14',0,1,92,'NULL'),(93,'2021-10-20 19:09:19',0,1,92,'NULL'),(94,'2021-10-21 13:05:27',1,1,115,'NULL'),(95,'2021-10-21 13:06:42',3,1,115,'NULL'),(96,'2021-10-21 13:21:23',1,1,115,'NULL'),(97,'2021-10-21 19:09:12',0,1,114,'NULL'),(98,'2021-10-21 19:11:56',0,1,115,'NULL'),(99,'2021-10-22 07:54:17',3,1,119,'NULL');
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
 1 AS `dala_coupon_speciality_featured_image`,
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
 1 AS `dala_stores_ID`,
 1 AS `dala_stores_user_id`,
 1 AS `dala_stores_date_created`,
 1 AS `dala_stores_name`,
 1 AS `dala_stores_payment_limit`,
 1 AS `dala_stores_service_type_id`,
 1 AS `dala_stores_adress`,
 1 AS `dala_stores_province`,
 1 AS `dala_stores_district`,
 1 AS `dala_stores_wards`,
 1 AS `dala_stores_phone`,
 1 AS `dala_stores_logo_image`,
 1 AS `dala_stores_banner_image`,
 1 AS `dala_stores_information`,
 1 AS `dala_stores_status_admin`,
 1 AS `dala_stores_status_stores`,
 1 AS `dala_stores_info_banking`,
 1 AS `dala_stores_discount_price`,
 1 AS `dala_stores_local_x`,
 1 AS `dala_stores_local_y`,
 1 AS `dala_stores_local_adress`,
 1 AS `dala_stores_qoute`,
 1 AS `dala_stores_status_update`,
 1 AS `dala_stores_payment_methods`,
 1 AS `dala_stores_payment_time`,
 1 AS `dala_stores_upload_limit_day`,
 1 AS `dala_stores_upload_limit_month`,
 1 AS `dala_users_ID`,
 1 AS `dala_users_date_created`,
 1 AS `dala_users_full_name`,
 1 AS `dala_users_password`,
 1 AS `dala_users_password_lost`,
 1 AS `dala_users_first_name`,
 1 AS `dala_users_last_name`,
 1 AS `dala_users_adress`,
 1 AS `dala_users_phone`,
 1 AS `dala_users_email`,
 1 AS `dala_users_api_version`,
 1 AS `dala_users_router_version`,
 1 AS `dala_users_view_version`,
 1 AS `dala_users_js_css_version`,
 1 AS `dala_users_users_type_id`,
 1 AS `dala_users_shipping_status`,
 1 AS `dala_users_status`,
 1 AS `dala_users_verification_status`,
 1 AS `dala_users_verification_code`,
 1 AS `dala_users_verification_time`,
 1 AS `dala_check_expired`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `dala_view_discount_program_details`
--

DROP TABLE IF EXISTS `dala_view_discount_program_details`;
/*!50001 DROP VIEW IF EXISTS `dala_view_discount_program_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dala_view_discount_program_details` AS SELECT 
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
 1 AS `dala_stores_ID`,
 1 AS `dala_stores_user_id`,
 1 AS `dala_stores_date_created`,
 1 AS `dala_stores_name`,
 1 AS `dala_stores_payment_limit`,
 1 AS `dala_stores_service_type_id`,
 1 AS `dala_stores_adress`,
 1 AS `dala_stores_province`,
 1 AS `dala_stores_district`,
 1 AS `dala_stores_wards`,
 1 AS `dala_stores_phone`,
 1 AS `dala_stores_logo_image`,
 1 AS `dala_stores_banner_image`,
 1 AS `dala_stores_information`,
 1 AS `dala_stores_status_admin`,
 1 AS `dala_stores_status_stores`,
 1 AS `dala_stores_info_banking`,
 1 AS `dala_stores_discount_price`,
 1 AS `dala_stores_local_x`,
 1 AS `dala_stores_local_y`,
 1 AS `dala_stores_local_adress`,
 1 AS `dala_stores_qoute`,
 1 AS `dala_stores_status_update`,
 1 AS `dala_stores_payment_methods`,
 1 AS `dala_stores_payment_time`,
 1 AS `dala_stores_upload_limit_day`,
 1 AS `dala_stores_upload_limit_month`,
 1 AS `dala_users_ID`,
 1 AS `dala_users_date_created`,
 1 AS `dala_users_full_name`,
 1 AS `dala_users_password`,
 1 AS `dala_users_password_lost`,
 1 AS `dala_users_first_name`,
 1 AS `dala_users_last_name`,
 1 AS `dala_users_adress`,
 1 AS `dala_users_phone`,
 1 AS `dala_users_email`,
 1 AS `dala_users_api_version`,
 1 AS `dala_users_router_version`,
 1 AS `dala_users_view_version`,
 1 AS `dala_users_js_css_version`,
 1 AS `dala_users_users_type_id`,
 1 AS `dala_users_shipping_status`,
 1 AS `dala_users_status`,
 1 AS `dala_users_verification_status`,
 1 AS `dala_users_verification_code`,
 1 AS `dala_users_verification_time`,
 1 AS `dala_check_expired`,
 1 AS `dala_discount_program_details_stores_id`,
 1 AS `dala_discount_program_details_stores_name`,
 1 AS `dala_discount_program_details_users_id`,
 1 AS `dala_discount_program_details_users_name`,
 1 AS `dala_check_date`*/;
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
 1 AS `dala_discount_program_product_link_sale_of_price`,
 1 AS `dala_discount_program_product_link_date_star`,
 1 AS `dala_discount_program_product_link_date_end`,
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
 1 AS `dala_stores_ID`,
 1 AS `dala_stores_user_id`,
 1 AS `dala_stores_date_created`,
 1 AS `dala_stores_name`,
 1 AS `dala_stores_payment_limit`,
 1 AS `dala_stores_service_type_id`,
 1 AS `dala_stores_adress`,
 1 AS `dala_stores_province`,
 1 AS `dala_stores_district`,
 1 AS `dala_stores_wards`,
 1 AS `dala_stores_phone`,
 1 AS `dala_stores_logo_image`,
 1 AS `dala_stores_banner_image`,
 1 AS `dala_stores_information`,
 1 AS `dala_stores_status_admin`,
 1 AS `dala_stores_status_stores`,
 1 AS `dala_stores_info_banking`,
 1 AS `dala_stores_discount_price`,
 1 AS `dala_stores_local_x`,
 1 AS `dala_stores_local_y`,
 1 AS `dala_stores_local_adress`,
 1 AS `dala_stores_qoute`,
 1 AS `dala_stores_status_update`,
 1 AS `dala_stores_payment_methods`,
 1 AS `dala_stores_payment_time`,
 1 AS `dala_stores_upload_limit_day`,
 1 AS `dala_stores_upload_limit_month`,
 1 AS `dala_users_ID`,
 1 AS `dala_users_date_created`,
 1 AS `dala_users_full_name`,
 1 AS `dala_users_password`,
 1 AS `dala_users_password_lost`,
 1 AS `dala_users_first_name`,
 1 AS `dala_users_last_name`,
 1 AS `dala_users_adress`,
 1 AS `dala_users_phone`,
 1 AS `dala_users_email`,
 1 AS `dala_users_api_version`,
 1 AS `dala_users_router_version`,
 1 AS `dala_users_view_version`,
 1 AS `dala_users_js_css_version`,
 1 AS `dala_users_users_type_id`,
 1 AS `dala_users_shipping_status`,
 1 AS `dala_users_status`,
 1 AS `dala_users_verification_status`,
 1 AS `dala_users_verification_code`,
 1 AS `dala_users_verification_time`,
 1 AS `dala_check_expired`,
 1 AS `dala_discount_program_details_stores_id`,
 1 AS `dala_discount_program_details_stores_name`,
 1 AS `dala_discount_program_details_users_id`,
 1 AS `dala_discount_program_details_users_name`,
 1 AS `dala_check_date`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `dala_view_order_count_product`
--

DROP TABLE IF EXISTS `dala_view_order_count_product`;
/*!50001 DROP VIEW IF EXISTS `dala_view_order_count_product`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dala_view_order_count_product` AS SELECT 
 1 AS `dala_orders_details_speciality_product_id`,
 1 AS `dala_users_ID`,
 1 AS `dala_users_full_name`,
 1 AS `dala_stores_ID`,
 1 AS `dala_stores_name`,
 1 AS `dala_orders_details_speciality_qty`,
 1 AS `dala_price_caution`*/;
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
 1 AS `dala_stores_ID`,
 1 AS `dala_stores_name`,
 1 AS `dala_users_ID`,
 1 AS `dala_orders_details_speciality_product_id`,
 1 AS `dala_orders_details_speciality_line_order`,
 1 AS `dala_orders_details_speciality_qty`,
 1 AS `dala_orders_details_speciality_price`,
 1 AS `dala_price_caution`*/;
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
 1 AS `dala_orders_speciality_store_id`,
 1 AS `dala_orders_speciality_shipper_id`,
 1 AS `dala_orders_speciality_date_orders`,
 1 AS `dala_orders_speciality_status_orders`,
 1 AS `dala_orders_speciality_company`,
 1 AS `dala_orders_speciality_status_pull_money`,
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
 1 AS `dala_stores_name`,
 1 AS `dala_stores_province`,
 1 AS `dala_stores_district`,
 1 AS `dala_stores_wards`,
 1 AS `dala_stores_adress`,
 1 AS `dala_stores_phone`*/;
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
 1 AS `dala_orders_speciality_store_id`,
 1 AS `dala_orders_speciality_shipper_id`,
 1 AS `dala_orders_speciality_date_orders`,
 1 AS `dala_orders_speciality_status_orders`,
 1 AS `dala_orders_speciality_company`,
 1 AS `dala_orders_speciality_status_pull_money`,
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
 1 AS `dala_stores_user_id`,
 1 AS `dala_stores_date_created`,
 1 AS `dala_stores_name`,
 1 AS `dala_stores_payment_limit`,
 1 AS `dala_stores_service_type_id`,
 1 AS `dala_stores_adress`,
 1 AS `dala_stores_province`,
 1 AS `dala_stores_district`,
 1 AS `dala_stores_wards`,
 1 AS `dala_stores_phone`,
 1 AS `dala_stores_logo_image`,
 1 AS `dala_stores_banner_image`,
 1 AS `dala_stores_information`,
 1 AS `dala_stores_status_admin`,
 1 AS `dala_stores_status_stores`,
 1 AS `dala_stores_info_banking`,
 1 AS `dala_stores_discount_price`,
 1 AS `dala_stores_local_x`,
 1 AS `dala_stores_local_y`,
 1 AS `dala_stores_local_adress`,
 1 AS `dala_stores_qoute`,
 1 AS `dala_stores_status_update`,
 1 AS `dala_stores_payment_methods`,
 1 AS `dala_stores_payment_time`,
 1 AS `dala_stores_upload_limit_day`,
 1 AS `dala_stores_upload_limit_month`,
 1 AS `dala_price_caution`,
 1 AS `dala_products_speciality_ID`,
 1 AS `dala_products_speciality_name`,
 1 AS `dala_users_ID`,
 1 AS `dala_users_full_name`*/;
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
  PRIMARY KEY (`dala_view_product_ID`),
  KEY `view_product_user_id` (`dala_view_product_user_id`),
  KEY `view_product_product_id` (`dala_view_product_product_id`),
  CONSTRAINT `view_product_product_id` FOREIGN KEY (`dala_view_product_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `view_product_user_id` FOREIGN KEY (`dala_view_product_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
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
/*!50001 VIEW `dala_view_count_order_by_user` AS select distinct `dala_orders_speciality`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_orders_speciality`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_orders` AS `dala_orders_speciality_status_orders`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name` from ((((`dala_orders_details_speciality` left join `dala_orders_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` = `dala_orders_speciality`.`dala_orders_speciality_ID`))) left join `dala_products_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_orders_speciality`.`dala_orders_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) */;
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
/*!50001 VIEW `dala_view_coupon` AS select `dala_coupon_speciality`.`dala_coupon_speciality_ID` AS `dala_coupon_speciality_ID`,`dala_coupon_speciality`.`dala_coupon_speciality_date_created` AS `dala_coupon_speciality_date_created`,`dala_coupon_speciality`.`dala_coupon_speciality_code` AS `dala_coupon_speciality_code`,`dala_coupon_speciality`.`dala_coupon_speciality_featured_image` AS `dala_coupon_speciality_featured_image`,`dala_coupon_speciality`.`dala_coupon_speciality_stores_id_created` AS `dala_coupon_speciality_stores_id_created`,`dala_coupon_speciality`.`dala_coupon_speciality_info` AS `dala_coupon_speciality_info`,`dala_coupon_speciality`.`dala_coupon_speciality_type` AS `dala_coupon_speciality_type`,`dala_coupon_speciality`.`dala_coupon_speciality_formula_price` AS `dala_coupon_speciality_formula_price`,`dala_coupon_speciality`.`dala_coupon_speciality_formula_price_value` AS `dala_coupon_speciality_formula_price_value`,`dala_coupon_speciality`.`dala_coupon_speciality_condition` AS `dala_coupon_speciality_condition`,`dala_coupon_speciality`.`dala_coupon_speciality_condition_value` AS `dala_coupon_speciality_condition_value`,`dala_coupon_speciality`.`dala_coupon_speciality_price_max` AS `dala_coupon_speciality_price_max`,`dala_coupon_speciality`.`dala_coupon_speciality_date_star` AS `dala_coupon_speciality_date_star`,`dala_coupon_speciality`.`dala_coupon_speciality_date_end` AS `dala_coupon_speciality_date_end`,`dala_coupon_speciality`.`dala_coupon_speciality_multiple` AS `dala_coupon_speciality_multiple`,`dala_coupon_speciality`.`dala_coupon_speciality_status_admin` AS `dala_coupon_speciality_status_admin`,`dala_coupon_speciality`.`dala_coupon_speciality_status_update` AS `dala_coupon_speciality_status_update`,`dala_coupon_speciality`.`dala_coupon_speciality_limit_user` AS `dala_coupon_speciality_limit_user`,`dala_coupon_speciality`.`dala_coupon_speciality_limit_number` AS `dala_coupon_speciality_limit_number`,`dala_coupon_speciality`.`dala_coupon_speciality_qoute` AS `dala_coupon_speciality_qoute`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,(case when ((`dala_coupon_speciality`.`dala_coupon_speciality_date_star` is null) and (`dala_coupon_speciality`.`dala_coupon_speciality_date_end` is null)) then 1 when ((`dala_coupon_speciality`.`dala_coupon_speciality_date_star` is null) and (`dala_coupon_speciality`.`dala_coupon_speciality_date_end` is not null)) then if(((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_end`)) < 0),1,0) when ((`dala_coupon_speciality`.`dala_coupon_speciality_date_star` is not null) and (`dala_coupon_speciality`.`dala_coupon_speciality_date_end` is null)) then if(((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_star`)) < 0),0,1) when ((`dala_coupon_speciality`.`dala_coupon_speciality_date_star` is not null) and (`dala_coupon_speciality`.`dala_coupon_speciality_date_end` is not null)) then (case when ((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_star`)) < 0) then 0 when ((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_star`)) > 0) then if(((unix_timestamp() - unix_timestamp(`dala_coupon_speciality`.`dala_coupon_speciality_date_end`)) < 0),1,0) end) else 100 end) AS `dala_check_expired` from ((`dala_coupon_speciality` left join `dala_stores` on((`dala_coupon_speciality`.`dala_coupon_speciality_stores_id_created` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) */;
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
/*!50001 VIEW `dala_view_discount_program` AS select `dala_discount_program`.`dala_discount_program_ID` AS `dala_discount_program_ID`,`dala_discount_program`.`dala_discount_program_date_created` AS `dala_discount_program_date_created`,`dala_discount_program`.`dala_discount_program_name` AS `dala_discount_program_name`,`dala_discount_program`.`dala_discount_program_store_id_created` AS `dala_discount_program_store_id_created`,`dala_discount_program`.`dala_discount_program_featured_image` AS `dala_discount_program_featured_image`,`dala_discount_program`.`dala_discount_program_price_created` AS `dala_discount_program_price_created`,`dala_discount_program`.`dala_discount_program_price_sale` AS `dala_discount_program_price_sale`,`dala_discount_program`.`dala_discount_program_position` AS `dala_discount_program_position`,`dala_discount_program`.`dala_discount_program_type` AS `dala_discount_program_type`,`dala_discount_program`.`dala_discount_program_time_type` AS `dala_discount_program_time_type`,`dala_discount_program`.`dala_discount_program_status_admin` AS `dala_discount_program_status_admin`,`dala_discount_program`.`dala_discount_program_status_update` AS `dala_discount_program_status_update`,`dala_discount_program`.`dala_discount_program_price_one_day` AS `dala_discount_program_price_one_day`,`dala_discount_program`.`dala_discount_program_price_one_product` AS `dala_discount_program_price_one_product`,`dala_discount_program`.`dala_discount_program_limit_product` AS `dala_discount_program_limit_product`,`dala_discount_program`.`dala_discount_program_limit_day` AS `dala_discount_program_limit_day`,`dala_discount_program`.`dala_discount_program_date_star` AS `dala_discount_program_date_star`,`dala_discount_program`.`dala_discount_program_date_end` AS `dala_discount_program_date_end`,`dala_discount_program`.`dala_discount_program_information` AS `dala_discount_program_information`,`dala_discount_program`.`dala_discount_program_qoute` AS `dala_discount_program_qoute`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_user_id` AS `dala_stores_user_id`,`dala_stores`.`dala_stores_date_created` AS `dala_stores_date_created`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_stores`.`dala_stores_payment_limit` AS `dala_stores_payment_limit`,`dala_stores`.`dala_stores_service_type_id` AS `dala_stores_service_type_id`,`dala_stores`.`dala_stores_adress` AS `dala_stores_adress`,`dala_stores`.`dala_stores_province` AS `dala_stores_province`,`dala_stores`.`dala_stores_district` AS `dala_stores_district`,`dala_stores`.`dala_stores_wards` AS `dala_stores_wards`,`dala_stores`.`dala_stores_phone` AS `dala_stores_phone`,`dala_stores`.`dala_stores_logo_image` AS `dala_stores_logo_image`,`dala_stores`.`dala_stores_banner_image` AS `dala_stores_banner_image`,`dala_stores`.`dala_stores_information` AS `dala_stores_information`,`dala_stores`.`dala_stores_status_admin` AS `dala_stores_status_admin`,`dala_stores`.`dala_stores_status_stores` AS `dala_stores_status_stores`,`dala_stores`.`dala_stores_info_banking` AS `dala_stores_info_banking`,`dala_stores`.`dala_stores_discount_price` AS `dala_stores_discount_price`,`dala_stores`.`dala_stores_local_x` AS `dala_stores_local_x`,`dala_stores`.`dala_stores_local_y` AS `dala_stores_local_y`,`dala_stores`.`dala_stores_local_adress` AS `dala_stores_local_adress`,`dala_stores`.`dala_stores_qoute` AS `dala_stores_qoute`,`dala_stores`.`dala_stores_status_update` AS `dala_stores_status_update`,`dala_stores`.`dala_stores_payment_methods` AS `dala_stores_payment_methods`,`dala_stores`.`dala_stores_payment_time` AS `dala_stores_payment_time`,`dala_stores`.`dala_stores_upload_limit_day` AS `dala_stores_upload_limit_day`,`dala_stores`.`dala_stores_upload_limit_month` AS `dala_stores_upload_limit_month`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_date_created` AS `dala_users_date_created`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_users`.`dala_users_password` AS `dala_users_password`,`dala_users`.`dala_users_password_lost` AS `dala_users_password_lost`,`dala_users`.`dala_users_first_name` AS `dala_users_first_name`,`dala_users`.`dala_users_last_name` AS `dala_users_last_name`,`dala_users`.`dala_users_adress` AS `dala_users_adress`,`dala_users`.`dala_users_phone` AS `dala_users_phone`,`dala_users`.`dala_users_email` AS `dala_users_email`,`dala_users`.`dala_users_api_version` AS `dala_users_api_version`,`dala_users`.`dala_users_router_version` AS `dala_users_router_version`,`dala_users`.`dala_users_view_version` AS `dala_users_view_version`,`dala_users`.`dala_users_js_css_version` AS `dala_users_js_css_version`,`dala_users`.`dala_users_users_type_id` AS `dala_users_users_type_id`,`dala_users`.`dala_users_shipping_status` AS `dala_users_shipping_status`,`dala_users`.`dala_users_status` AS `dala_users_status`,`dala_users`.`dala_users_verification_status` AS `dala_users_verification_status`,`dala_users`.`dala_users_verification_code` AS `dala_users_verification_code`,`dala_users`.`dala_users_verification_time` AS `dala_users_verification_time`,(case when (`dala_discount_program`.`dala_discount_program_time_type` = 0) then 1 when (unix_timestamp(`dala_discount_program`.`dala_discount_program_date_end`) < unix_timestamp()) then 1 else 0 end) AS `dala_check_expired` from ((`dala_discount_program` left join `dala_stores` on((`dala_discount_program`.`dala_discount_program_store_id_created` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `dala_view_discount_program_details`
--

/*!50001 DROP VIEW IF EXISTS `dala_view_discount_program_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dala_view_discount_program_details` AS select `dala_discount_program_details`.`dala_discount_program_details_ID` AS `dala_discount_program_details_ID`,`dala_discount_program_details`.`dala_discount_program_details_date_created` AS `dala_discount_program_details_date_created`,`dala_discount_program_details`.`dala_discount_program_details_discount_program_id` AS `dala_discount_program_details_discount_program_id`,`dala_discount_program_details`.`dala_discount_program_details_store_id` AS `dala_discount_program_details_store_id`,`dala_discount_program_details`.`dala_discount_program_details_status_admin` AS `dala_discount_program_details_status_admin`,`dala_discount_program_details`.`dala_discount_program_details_status_update` AS `dala_discount_program_details_status_update`,`dala_discount_program_details`.`dala_discount_program_details_price` AS `dala_discount_program_details_price`,`dala_discount_program_details`.`dala_discount_program_details_limit_day` AS `dala_discount_program_details_limit_day`,`dala_discount_program_details`.`dala_discount_program_details_limit_product` AS `dala_discount_program_details_limit_product`,`dala_discount_program_details`.`dala_discount_program_details_qoute` AS `dala_discount_program_details_qoute`,`dala_view_discount_program`.`dala_discount_program_ID` AS `dala_discount_program_ID`,`dala_view_discount_program`.`dala_discount_program_date_created` AS `dala_discount_program_date_created`,`dala_view_discount_program`.`dala_discount_program_name` AS `dala_discount_program_name`,`dala_view_discount_program`.`dala_discount_program_store_id_created` AS `dala_discount_program_store_id_created`,`dala_view_discount_program`.`dala_discount_program_featured_image` AS `dala_discount_program_featured_image`,`dala_view_discount_program`.`dala_discount_program_price_created` AS `dala_discount_program_price_created`,`dala_view_discount_program`.`dala_discount_program_price_sale` AS `dala_discount_program_price_sale`,`dala_view_discount_program`.`dala_discount_program_position` AS `dala_discount_program_position`,`dala_view_discount_program`.`dala_discount_program_type` AS `dala_discount_program_type`,`dala_view_discount_program`.`dala_discount_program_time_type` AS `dala_discount_program_time_type`,`dala_view_discount_program`.`dala_discount_program_status_admin` AS `dala_discount_program_status_admin`,`dala_view_discount_program`.`dala_discount_program_status_update` AS `dala_discount_program_status_update`,`dala_view_discount_program`.`dala_discount_program_price_one_day` AS `dala_discount_program_price_one_day`,`dala_view_discount_program`.`dala_discount_program_price_one_product` AS `dala_discount_program_price_one_product`,`dala_view_discount_program`.`dala_discount_program_limit_product` AS `dala_discount_program_limit_product`,`dala_view_discount_program`.`dala_discount_program_limit_day` AS `dala_discount_program_limit_day`,`dala_view_discount_program`.`dala_discount_program_date_star` AS `dala_discount_program_date_star`,`dala_view_discount_program`.`dala_discount_program_date_end` AS `dala_discount_program_date_end`,`dala_view_discount_program`.`dala_discount_program_information` AS `dala_discount_program_information`,`dala_view_discount_program`.`dala_discount_program_qoute` AS `dala_discount_program_qoute`,`dala_view_discount_program`.`dala_stores_ID` AS `dala_stores_ID`,`dala_view_discount_program`.`dala_stores_user_id` AS `dala_stores_user_id`,`dala_view_discount_program`.`dala_stores_date_created` AS `dala_stores_date_created`,`dala_view_discount_program`.`dala_stores_name` AS `dala_stores_name`,`dala_view_discount_program`.`dala_stores_payment_limit` AS `dala_stores_payment_limit`,`dala_view_discount_program`.`dala_stores_service_type_id` AS `dala_stores_service_type_id`,`dala_view_discount_program`.`dala_stores_adress` AS `dala_stores_adress`,`dala_view_discount_program`.`dala_stores_province` AS `dala_stores_province`,`dala_view_discount_program`.`dala_stores_district` AS `dala_stores_district`,`dala_view_discount_program`.`dala_stores_wards` AS `dala_stores_wards`,`dala_view_discount_program`.`dala_stores_phone` AS `dala_stores_phone`,`dala_view_discount_program`.`dala_stores_logo_image` AS `dala_stores_logo_image`,`dala_view_discount_program`.`dala_stores_banner_image` AS `dala_stores_banner_image`,`dala_view_discount_program`.`dala_stores_information` AS `dala_stores_information`,`dala_view_discount_program`.`dala_stores_status_admin` AS `dala_stores_status_admin`,`dala_view_discount_program`.`dala_stores_status_stores` AS `dala_stores_status_stores`,`dala_view_discount_program`.`dala_stores_info_banking` AS `dala_stores_info_banking`,`dala_view_discount_program`.`dala_stores_discount_price` AS `dala_stores_discount_price`,`dala_view_discount_program`.`dala_stores_local_x` AS `dala_stores_local_x`,`dala_view_discount_program`.`dala_stores_local_y` AS `dala_stores_local_y`,`dala_view_discount_program`.`dala_stores_local_adress` AS `dala_stores_local_adress`,`dala_view_discount_program`.`dala_stores_qoute` AS `dala_stores_qoute`,`dala_view_discount_program`.`dala_stores_status_update` AS `dala_stores_status_update`,`dala_view_discount_program`.`dala_stores_payment_methods` AS `dala_stores_payment_methods`,`dala_view_discount_program`.`dala_stores_payment_time` AS `dala_stores_payment_time`,`dala_view_discount_program`.`dala_stores_upload_limit_day` AS `dala_stores_upload_limit_day`,`dala_view_discount_program`.`dala_stores_upload_limit_month` AS `dala_stores_upload_limit_month`,`dala_view_discount_program`.`dala_users_ID` AS `dala_users_ID`,`dala_view_discount_program`.`dala_users_date_created` AS `dala_users_date_created`,`dala_view_discount_program`.`dala_users_full_name` AS `dala_users_full_name`,`dala_view_discount_program`.`dala_users_password` AS `dala_users_password`,`dala_view_discount_program`.`dala_users_password_lost` AS `dala_users_password_lost`,`dala_view_discount_program`.`dala_users_first_name` AS `dala_users_first_name`,`dala_view_discount_program`.`dala_users_last_name` AS `dala_users_last_name`,`dala_view_discount_program`.`dala_users_adress` AS `dala_users_adress`,`dala_view_discount_program`.`dala_users_phone` AS `dala_users_phone`,`dala_view_discount_program`.`dala_users_email` AS `dala_users_email`,`dala_view_discount_program`.`dala_users_api_version` AS `dala_users_api_version`,`dala_view_discount_program`.`dala_users_router_version` AS `dala_users_router_version`,`dala_view_discount_program`.`dala_users_view_version` AS `dala_users_view_version`,`dala_view_discount_program`.`dala_users_js_css_version` AS `dala_users_js_css_version`,`dala_view_discount_program`.`dala_users_users_type_id` AS `dala_users_users_type_id`,`dala_view_discount_program`.`dala_users_shipping_status` AS `dala_users_shipping_status`,`dala_view_discount_program`.`dala_users_status` AS `dala_users_status`,`dala_view_discount_program`.`dala_users_verification_status` AS `dala_users_verification_status`,`dala_view_discount_program`.`dala_users_verification_code` AS `dala_users_verification_code`,`dala_view_discount_program`.`dala_users_verification_time` AS `dala_users_verification_time`,`dala_view_discount_program`.`dala_check_expired` AS `dala_check_expired`,`dala_stores`.`dala_stores_ID` AS `dala_discount_program_details_stores_id`,`dala_stores`.`dala_stores_name` AS `dala_discount_program_details_stores_name`,`dala_users`.`dala_users_ID` AS `dala_discount_program_details_users_id`,`dala_users`.`dala_users_full_name` AS `dala_discount_program_details_users_name`,if((`dala_discount_program_details`.`dala_discount_program_details_limit_day` = 0),-(1),(unix_timestamp() - (unix_timestamp(`dala_discount_program_details`.`dala_discount_program_details_date_created`) + (((`dala_discount_program_details`.`dala_discount_program_details_limit_day` * 24) * 60) * 60)))) AS `dala_check_date` from (((`dala_discount_program_details` left join `dala_view_discount_program` on((`dala_discount_program_details`.`dala_discount_program_details_discount_program_id` = `dala_view_discount_program`.`dala_discount_program_ID`))) left join `dala_stores` on((`dala_discount_program_details`.`dala_discount_program_details_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) */;
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
/*!50001 VIEW `dala_view_discount_program_product` AS select `dala_discount_program_product_link`.`dala_discount_program_product_link_ID` AS `dala_discount_program_product_link_ID`,`dala_discount_program_product_link`.`dala_discount_program_product_link_date_created` AS `dala_discount_program_product_link_date_created`,`dala_discount_program_product_link`.`dala_discount_program_product_link_discount_program_details_id` AS `dala_discount_program_product_link_discount_program_details_id`,`dala_discount_program_product_link`.`dala_discount_program_product_link_product_speciality_id` AS `dala_discount_program_product_link_product_speciality_id`,`dala_discount_program_product_link`.`dala_discount_program_product_link_status` AS `dala_discount_program_product_link_status`,`dala_discount_program_product_link`.`dala_discount_program_product_link_qoute` AS `dala_discount_program_product_link_qoute`,`dala_discount_program_product_link`.`dala_discount_program_product_link_sale_of_price` AS `dala_discount_program_product_link_sale_of_price`,`dala_discount_program_product_link`.`dala_discount_program_product_link_date_star` AS `dala_discount_program_product_link_date_star`,`dala_discount_program_product_link`.`dala_discount_program_product_link_date_end` AS `dala_discount_program_product_link_date_end`,`dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_products_speciality`.`dala_products_speciality_type` AS `dala_products_speciality_type`,`dala_products_speciality`.`dala_products_speciality_date_created` AS `dala_products_speciality_date_created`,`dala_products_speciality`.`dala_products_speciality_sku` AS `dala_products_speciality_sku`,`dala_products_speciality`.`dala_products_speciality_store_id` AS `dala_products_speciality_store_id`,`dala_products_speciality`.`dala_products_speciality_parent_id` AS `dala_products_speciality_parent_id`,`dala_products_speciality`.`dala_products_speciality_featured_image` AS `dala_products_speciality_featured_image`,`dala_products_speciality`.`dala_products_speciality_image_slider` AS `dala_products_speciality_image_slider`,`dala_products_speciality`.`dala_products_speciality_origin` AS `dala_products_speciality_origin`,`dala_products_speciality`.`dala_products_speciality_contents` AS `dala_products_speciality_contents`,`dala_products_speciality`.`dala_products_speciality_price` AS `dala_products_speciality_price`,`dala_products_speciality`.`dala_products_speciality_sale_of_price` AS `dala_products_speciality_sale_of_price`,`dala_products_speciality`.`dala_products_speciality_date_start` AS `dala_products_speciality_date_start`,`dala_products_speciality`.`dala_products_speciality_date_end` AS `dala_products_speciality_date_end`,`dala_products_speciality`.`dala_products_speciality_stock` AS `dala_products_speciality_stock`,`dala_products_speciality`.`dala_products_speciality_brand` AS `dala_products_speciality_brand`,`dala_products_speciality`.`dala_products_speciality_status_admin` AS `dala_products_speciality_status_admin`,`dala_products_speciality`.`dala_products_speciality_status_store` AS `dala_products_speciality_status_store`,`dala_products_speciality`.`dala_products_speciality_status_update` AS `dala_products_speciality_status_update`,`dala_products_speciality`.`dala_products_speciality_variation_option` AS `dala_products_speciality_variation_option`,`dala_products_speciality`.`dala_products_speciality_excerpt` AS `dala_products_speciality_excerpt`,`dala_products_speciality`.`dala_products_speciality_qoute` AS `dala_products_speciality_qoute`,`dala_products_speciality`.`dala_products_speciality_height` AS `dala_products_speciality_height`,`dala_products_speciality`.`dala_products_speciality_width` AS `dala_products_speciality_width`,`dala_products_speciality`.`dala_products_speciality_length` AS `dala_products_speciality_length`,`dala_products_speciality`.`dala_products_speciality_weight` AS `dala_products_speciality_weight`,`dala_view_discount_program_details`.`dala_discount_program_details_ID` AS `dala_discount_program_details_ID`,`dala_view_discount_program_details`.`dala_discount_program_details_date_created` AS `dala_discount_program_details_date_created`,`dala_view_discount_program_details`.`dala_discount_program_details_discount_program_id` AS `dala_discount_program_details_discount_program_id`,`dala_view_discount_program_details`.`dala_discount_program_details_store_id` AS `dala_discount_program_details_store_id`,`dala_view_discount_program_details`.`dala_discount_program_details_status_admin` AS `dala_discount_program_details_status_admin`,`dala_view_discount_program_details`.`dala_discount_program_details_status_update` AS `dala_discount_program_details_status_update`,`dala_view_discount_program_details`.`dala_discount_program_details_price` AS `dala_discount_program_details_price`,`dala_view_discount_program_details`.`dala_discount_program_details_limit_day` AS `dala_discount_program_details_limit_day`,`dala_view_discount_program_details`.`dala_discount_program_details_limit_product` AS `dala_discount_program_details_limit_product`,`dala_view_discount_program_details`.`dala_discount_program_details_qoute` AS `dala_discount_program_details_qoute`,`dala_view_discount_program_details`.`dala_discount_program_ID` AS `dala_discount_program_ID`,`dala_view_discount_program_details`.`dala_discount_program_date_created` AS `dala_discount_program_date_created`,`dala_view_discount_program_details`.`dala_discount_program_name` AS `dala_discount_program_name`,`dala_view_discount_program_details`.`dala_discount_program_store_id_created` AS `dala_discount_program_store_id_created`,`dala_view_discount_program_details`.`dala_discount_program_featured_image` AS `dala_discount_program_featured_image`,`dala_view_discount_program_details`.`dala_discount_program_price_created` AS `dala_discount_program_price_created`,`dala_view_discount_program_details`.`dala_discount_program_price_sale` AS `dala_discount_program_price_sale`,`dala_view_discount_program_details`.`dala_discount_program_position` AS `dala_discount_program_position`,`dala_view_discount_program_details`.`dala_discount_program_type` AS `dala_discount_program_type`,`dala_view_discount_program_details`.`dala_discount_program_time_type` AS `dala_discount_program_time_type`,`dala_view_discount_program_details`.`dala_discount_program_status_admin` AS `dala_discount_program_status_admin`,`dala_view_discount_program_details`.`dala_discount_program_status_update` AS `dala_discount_program_status_update`,`dala_view_discount_program_details`.`dala_discount_program_price_one_day` AS `dala_discount_program_price_one_day`,`dala_view_discount_program_details`.`dala_discount_program_price_one_product` AS `dala_discount_program_price_one_product`,`dala_view_discount_program_details`.`dala_discount_program_limit_product` AS `dala_discount_program_limit_product`,`dala_view_discount_program_details`.`dala_discount_program_limit_day` AS `dala_discount_program_limit_day`,`dala_view_discount_program_details`.`dala_discount_program_date_star` AS `dala_discount_program_date_star`,`dala_view_discount_program_details`.`dala_discount_program_date_end` AS `dala_discount_program_date_end`,`dala_view_discount_program_details`.`dala_discount_program_information` AS `dala_discount_program_information`,`dala_view_discount_program_details`.`dala_discount_program_qoute` AS `dala_discount_program_qoute`,`dala_view_discount_program_details`.`dala_stores_ID` AS `dala_stores_ID`,`dala_view_discount_program_details`.`dala_stores_user_id` AS `dala_stores_user_id`,`dala_view_discount_program_details`.`dala_stores_date_created` AS `dala_stores_date_created`,`dala_view_discount_program_details`.`dala_stores_name` AS `dala_stores_name`,`dala_view_discount_program_details`.`dala_stores_payment_limit` AS `dala_stores_payment_limit`,`dala_view_discount_program_details`.`dala_stores_service_type_id` AS `dala_stores_service_type_id`,`dala_view_discount_program_details`.`dala_stores_adress` AS `dala_stores_adress`,`dala_view_discount_program_details`.`dala_stores_province` AS `dala_stores_province`,`dala_view_discount_program_details`.`dala_stores_district` AS `dala_stores_district`,`dala_view_discount_program_details`.`dala_stores_wards` AS `dala_stores_wards`,`dala_view_discount_program_details`.`dala_stores_phone` AS `dala_stores_phone`,`dala_view_discount_program_details`.`dala_stores_logo_image` AS `dala_stores_logo_image`,`dala_view_discount_program_details`.`dala_stores_banner_image` AS `dala_stores_banner_image`,`dala_view_discount_program_details`.`dala_stores_information` AS `dala_stores_information`,`dala_view_discount_program_details`.`dala_stores_status_admin` AS `dala_stores_status_admin`,`dala_view_discount_program_details`.`dala_stores_status_stores` AS `dala_stores_status_stores`,`dala_view_discount_program_details`.`dala_stores_info_banking` AS `dala_stores_info_banking`,`dala_view_discount_program_details`.`dala_stores_discount_price` AS `dala_stores_discount_price`,`dala_view_discount_program_details`.`dala_stores_local_x` AS `dala_stores_local_x`,`dala_view_discount_program_details`.`dala_stores_local_y` AS `dala_stores_local_y`,`dala_view_discount_program_details`.`dala_stores_local_adress` AS `dala_stores_local_adress`,`dala_view_discount_program_details`.`dala_stores_qoute` AS `dala_stores_qoute`,`dala_view_discount_program_details`.`dala_stores_status_update` AS `dala_stores_status_update`,`dala_view_discount_program_details`.`dala_stores_payment_methods` AS `dala_stores_payment_methods`,`dala_view_discount_program_details`.`dala_stores_payment_time` AS `dala_stores_payment_time`,`dala_view_discount_program_details`.`dala_stores_upload_limit_day` AS `dala_stores_upload_limit_day`,`dala_view_discount_program_details`.`dala_stores_upload_limit_month` AS `dala_stores_upload_limit_month`,`dala_view_discount_program_details`.`dala_users_ID` AS `dala_users_ID`,`dala_view_discount_program_details`.`dala_users_date_created` AS `dala_users_date_created`,`dala_view_discount_program_details`.`dala_users_full_name` AS `dala_users_full_name`,`dala_view_discount_program_details`.`dala_users_password` AS `dala_users_password`,`dala_view_discount_program_details`.`dala_users_password_lost` AS `dala_users_password_lost`,`dala_view_discount_program_details`.`dala_users_first_name` AS `dala_users_first_name`,`dala_view_discount_program_details`.`dala_users_last_name` AS `dala_users_last_name`,`dala_view_discount_program_details`.`dala_users_adress` AS `dala_users_adress`,`dala_view_discount_program_details`.`dala_users_phone` AS `dala_users_phone`,`dala_view_discount_program_details`.`dala_users_email` AS `dala_users_email`,`dala_view_discount_program_details`.`dala_users_api_version` AS `dala_users_api_version`,`dala_view_discount_program_details`.`dala_users_router_version` AS `dala_users_router_version`,`dala_view_discount_program_details`.`dala_users_view_version` AS `dala_users_view_version`,`dala_view_discount_program_details`.`dala_users_js_css_version` AS `dala_users_js_css_version`,`dala_view_discount_program_details`.`dala_users_users_type_id` AS `dala_users_users_type_id`,`dala_view_discount_program_details`.`dala_users_shipping_status` AS `dala_users_shipping_status`,`dala_view_discount_program_details`.`dala_users_status` AS `dala_users_status`,`dala_view_discount_program_details`.`dala_users_verification_status` AS `dala_users_verification_status`,`dala_view_discount_program_details`.`dala_users_verification_code` AS `dala_users_verification_code`,`dala_view_discount_program_details`.`dala_users_verification_time` AS `dala_users_verification_time`,`dala_view_discount_program_details`.`dala_check_expired` AS `dala_check_expired`,`dala_view_discount_program_details`.`dala_discount_program_details_stores_id` AS `dala_discount_program_details_stores_id`,`dala_view_discount_program_details`.`dala_discount_program_details_stores_name` AS `dala_discount_program_details_stores_name`,`dala_view_discount_program_details`.`dala_discount_program_details_users_id` AS `dala_discount_program_details_users_id`,`dala_view_discount_program_details`.`dala_discount_program_details_users_name` AS `dala_discount_program_details_users_name`,`dala_view_discount_program_details`.`dala_check_date` AS `dala_check_date` from ((`dala_discount_program_product_link` left join `dala_view_discount_program_details` on((`dala_discount_program_product_link`.`dala_discount_program_product_link_discount_program_details_id` = `dala_view_discount_program_details`.`dala_discount_program_details_ID`))) left join `dala_products_speciality` on((`dala_discount_program_product_link`.`dala_discount_program_product_link_product_speciality_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `dala_view_order_count_product`
--

/*!50001 DROP VIEW IF EXISTS `dala_view_order_count_product`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dala_view_order_count_product` AS select `dala_view_orders_users`.`dala_orders_details_speciality_product_id` AS `dala_orders_details_speciality_product_id`,`dala_view_orders_users`.`dala_users_ID` AS `dala_users_ID`,`dala_view_orders_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_view_orders_users`.`dala_stores_ID` AS `dala_stores_ID`,`dala_view_orders_users`.`dala_stores_name` AS `dala_stores_name`,sum(`dala_view_orders_users`.`dala_orders_details_speciality_qty`) AS `dala_orders_details_speciality_qty`,sum(`dala_view_orders_users`.`dala_price_caution`) AS `dala_price_caution` from `dala_view_orders_users` where ((`dala_view_orders_users`.`dala_orders_speciality_status_orders` = 100) and (`dala_view_orders_users`.`dala_orders_details_speciality_line_order` = 'product')) group by `dala_view_orders_users`.`dala_orders_details_speciality_product_id`,`dala_view_orders_users`.`dala_users_ID`,`dala_view_orders_users`.`dala_users_full_name`,`dala_view_orders_users`.`dala_stores_ID`,`dala_view_orders_users`.`dala_stores_name` order by `dala_orders_details_speciality_qty` desc */;
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
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dala_view_order_report` AS select `dala_view_orders_users`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_view_orders_users`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_view_orders_users`.`dala_stores_ID` AS `dala_stores_ID`,`dala_view_orders_users`.`dala_stores_name` AS `dala_stores_name`,`dala_view_orders_users`.`dala_users_ID` AS `dala_users_ID`,`dala_view_orders_users`.`dala_orders_details_speciality_product_id` AS `dala_orders_details_speciality_product_id`,`dala_view_orders_users`.`dala_orders_details_speciality_line_order` AS `dala_orders_details_speciality_line_order`,`dala_view_orders_users`.`dala_orders_details_speciality_qty` AS `dala_orders_details_speciality_qty`,`dala_view_orders_users`.`dala_orders_details_speciality_price` AS `dala_orders_details_speciality_price`,`dala_view_orders_users`.`dala_price_caution` AS `dala_price_caution` from `dala_view_orders_users` */;
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
/*!50001 VIEW `dala_view_orders_customer` AS select `dala_orders_speciality`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_orders_speciality`.`dala_orders_speciality_user_id` AS `dala_orders_speciality_user_id`,`dala_orders_speciality`.`dala_orders_speciality_store_id` AS `dala_orders_speciality_store_id`,`dala_orders_speciality`.`dala_orders_speciality_shipper_id` AS `dala_orders_speciality_shipper_id`,`dala_orders_speciality`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_orders` AS `dala_orders_speciality_status_orders`,`dala_orders_speciality`.`dala_orders_speciality_company` AS `dala_orders_speciality_company`,`dala_orders_speciality`.`dala_orders_speciality_status_pull_money` AS `dala_orders_speciality_status_pull_money`,`dala_orders_speciality`.`dala_orders_speciality_status_payment` AS `dala_orders_speciality_status_payment`,`dala_orders_speciality`.`dala_orders_speciality_province` AS `dala_orders_speciality_province`,`dala_orders_speciality`.`dala_orders_speciality_district` AS `dala_orders_speciality_district`,`dala_orders_speciality`.`dala_orders_speciality_wards` AS `dala_orders_speciality_wards`,`dala_orders_speciality`.`dala_orders_speciality_adress` AS `dala_orders_speciality_adress`,`dala_orders_speciality`.`dala_orders_speciality_notes` AS `dala_orders_speciality_notes`,`dala_orders_speciality`.`dala_orders_speciality_phone` AS `dala_orders_speciality_phone`,`dala_orders_speciality`.`dala_orders_speciality_name` AS `dala_orders_speciality_name`,`dala_orders_speciality`.`dala_orders_speciality_email` AS `dala_orders_speciality_email`,`dala_orders_speciality`.`dala_orders_speciality_shipping_code` AS `dala_orders_speciality_shipping_code`,`dala_orders_details_speciality`.`dala_orders_details_speciality_ID` AS `dala_orders_details_speciality_ID`,`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` AS `dala_orders_details_speciality_order_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_line_order` AS `dala_orders_details_speciality_line_order`,`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` AS `dala_orders_details_speciality_product_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` AS `dala_orders_details_speciality_qty`,`dala_orders_details_speciality`.`dala_orders_details_speciality_price` AS `dala_orders_details_speciality_price`,`dala_orders_details_speciality`.`dala_orders_details_medium_text` AS `dala_orders_details_medium_text`,(`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` * `dala_orders_details_speciality`.`dala_orders_details_speciality_price`) AS `dala_price_caution`,`dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_products_speciality`.`dala_products_speciality_featured_image` AS `dala_products_speciality_featured_image`,`dala_products_speciality`.`dala_products_speciality_weight` AS `dala_products_speciality_weight`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_stores`.`dala_stores_province` AS `dala_stores_province`,`dala_stores`.`dala_stores_district` AS `dala_stores_district`,`dala_stores`.`dala_stores_wards` AS `dala_stores_wards`,`dala_stores`.`dala_stores_adress` AS `dala_stores_adress`,`dala_stores`.`dala_stores_phone` AS `dala_stores_phone` from ((((`dala_orders_details_speciality` left join `dala_orders_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` = `dala_orders_speciality`.`dala_orders_speciality_ID`))) left join `dala_users` on((`dala_orders_speciality`.`dala_orders_speciality_user_id` = `dala_users`.`dala_users_ID`))) left join `dala_products_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_orders_speciality`.`dala_orders_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) */;
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
/*!50001 VIEW `dala_view_orders_users` AS select `dala_orders_speciality`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_orders_speciality`.`dala_orders_speciality_user_id` AS `dala_orders_speciality_user_id`,`dala_orders_speciality`.`dala_orders_speciality_store_id` AS `dala_orders_speciality_store_id`,`dala_orders_speciality`.`dala_orders_speciality_shipper_id` AS `dala_orders_speciality_shipper_id`,`dala_orders_speciality`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_orders` AS `dala_orders_speciality_status_orders`,`dala_orders_speciality`.`dala_orders_speciality_company` AS `dala_orders_speciality_company`,`dala_orders_speciality`.`dala_orders_speciality_status_pull_money` AS `dala_orders_speciality_status_pull_money`,`dala_orders_speciality`.`dala_orders_speciality_status_payment` AS `dala_orders_speciality_status_payment`,`dala_orders_speciality`.`dala_orders_speciality_province` AS `dala_orders_speciality_province`,`dala_orders_speciality`.`dala_orders_speciality_district` AS `dala_orders_speciality_district`,`dala_orders_speciality`.`dala_orders_speciality_wards` AS `dala_orders_speciality_wards`,`dala_orders_speciality`.`dala_orders_speciality_adress` AS `dala_orders_speciality_adress`,`dala_orders_speciality`.`dala_orders_speciality_notes` AS `dala_orders_speciality_notes`,`dala_orders_speciality`.`dala_orders_speciality_phone` AS `dala_orders_speciality_phone`,`dala_orders_speciality`.`dala_orders_speciality_name` AS `dala_orders_speciality_name`,`dala_orders_speciality`.`dala_orders_speciality_email` AS `dala_orders_speciality_email`,`dala_orders_speciality`.`dala_orders_speciality_shipping_code` AS `dala_orders_speciality_shipping_code`,`dala_orders_details_speciality`.`dala_orders_details_speciality_ID` AS `dala_orders_details_speciality_ID`,`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` AS `dala_orders_details_speciality_order_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_line_order` AS `dala_orders_details_speciality_line_order`,`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` AS `dala_orders_details_speciality_product_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` AS `dala_orders_details_speciality_qty`,`dala_orders_details_speciality`.`dala_orders_details_speciality_price` AS `dala_orders_details_speciality_price`,`dala_orders_details_speciality`.`dala_orders_details_medium_text` AS `dala_orders_details_medium_text`,`dala_coupon_speciality`.`dala_coupon_speciality_ID` AS `dala_coupon_speciality_ID`,`dala_coupon_speciality`.`dala_coupon_speciality_date_created` AS `dala_coupon_speciality_date_created`,`dala_coupon_speciality`.`dala_coupon_speciality_code` AS `dala_coupon_speciality_code`,`dala_coupon_speciality`.`dala_coupon_speciality_stores_id_created` AS `dala_coupon_speciality_stores_id_created`,`dala_coupon_speciality`.`dala_coupon_speciality_info` AS `dala_coupon_speciality_info`,`dala_coupon_speciality`.`dala_coupon_speciality_type` AS `dala_coupon_speciality_type`,`dala_coupon_speciality`.`dala_coupon_speciality_formula_price` AS `dala_coupon_speciality_formula_price`,`dala_coupon_speciality`.`dala_coupon_speciality_formula_price_value` AS `dala_coupon_speciality_formula_price_value`,`dala_coupon_speciality`.`dala_coupon_speciality_condition` AS `dala_coupon_speciality_condition`,`dala_coupon_speciality`.`dala_coupon_speciality_condition_value` AS `dala_coupon_speciality_condition_value`,`dala_coupon_speciality`.`dala_coupon_speciality_price_max` AS `dala_coupon_speciality_price_max`,`dala_coupon_speciality`.`dala_coupon_speciality_date_star` AS `dala_coupon_speciality_date_star`,`dala_coupon_speciality`.`dala_coupon_speciality_date_end` AS `dala_coupon_speciality_date_end`,`dala_coupon_speciality`.`dala_coupon_speciality_multiple` AS `dala_coupon_speciality_multiple`,`dala_coupon_speciality`.`dala_coupon_speciality_status_admin` AS `dala_coupon_speciality_status_admin`,`dala_coupon_speciality`.`dala_coupon_speciality_status_update` AS `dala_coupon_speciality_status_update`,`dala_coupon_speciality`.`dala_coupon_speciality_limit_user` AS `dala_coupon_speciality_limit_user`,`dala_coupon_speciality`.`dala_coupon_speciality_limit_number` AS `dala_coupon_speciality_limit_number`,`dala_coupon_speciality`.`dala_coupon_speciality_qoute` AS `dala_coupon_speciality_qoute`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_user_id` AS `dala_stores_user_id`,`dala_stores`.`dala_stores_date_created` AS `dala_stores_date_created`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_stores`.`dala_stores_payment_limit` AS `dala_stores_payment_limit`,`dala_stores`.`dala_stores_service_type_id` AS `dala_stores_service_type_id`,`dala_stores`.`dala_stores_adress` AS `dala_stores_adress`,`dala_stores`.`dala_stores_province` AS `dala_stores_province`,`dala_stores`.`dala_stores_district` AS `dala_stores_district`,`dala_stores`.`dala_stores_wards` AS `dala_stores_wards`,`dala_stores`.`dala_stores_phone` AS `dala_stores_phone`,`dala_stores`.`dala_stores_logo_image` AS `dala_stores_logo_image`,`dala_stores`.`dala_stores_banner_image` AS `dala_stores_banner_image`,`dala_stores`.`dala_stores_information` AS `dala_stores_information`,`dala_stores`.`dala_stores_status_admin` AS `dala_stores_status_admin`,`dala_stores`.`dala_stores_status_stores` AS `dala_stores_status_stores`,`dala_stores`.`dala_stores_info_banking` AS `dala_stores_info_banking`,`dala_stores`.`dala_stores_discount_price` AS `dala_stores_discount_price`,`dala_stores`.`dala_stores_local_x` AS `dala_stores_local_x`,`dala_stores`.`dala_stores_local_y` AS `dala_stores_local_y`,`dala_stores`.`dala_stores_local_adress` AS `dala_stores_local_adress`,`dala_stores`.`dala_stores_qoute` AS `dala_stores_qoute`,`dala_stores`.`dala_stores_status_update` AS `dala_stores_status_update`,`dala_stores`.`dala_stores_payment_methods` AS `dala_stores_payment_methods`,`dala_stores`.`dala_stores_payment_time` AS `dala_stores_payment_time`,`dala_stores`.`dala_stores_upload_limit_day` AS `dala_stores_upload_limit_day`,`dala_stores`.`dala_stores_upload_limit_month` AS `dala_stores_upload_limit_month`,(`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` * `dala_orders_details_speciality`.`dala_orders_details_speciality_price`) AS `dala_price_caution`,`dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name` from (((((`dala_orders_details_speciality` left join `dala_orders_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` = `dala_orders_speciality`.`dala_orders_speciality_ID`))) left join `dala_products_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_orders_speciality`.`dala_orders_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_coupon_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_coupon_speciality`.`dala_coupon_speciality_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) */;
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

-- Dump completed on 2021-10-22 11:19:03

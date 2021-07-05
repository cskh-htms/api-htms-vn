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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_adress_meta`
--

LOCK TABLES `dala_adress_meta` WRITE;
/*!40000 ALTER TABLE `dala_adress_meta` DISABLE KEYS */;
INSERT INTO `dala_adress_meta` VALUES (1,'2021-07-05 07:58:21',56,'TP đà lạt','Quận 1','Phường 5','số 27, hẻm 14/3','TP đà lạt, Quận 1, Phường 5, số 27, hẻm 14/3',1),(2,'2021-07-05 07:58:21',56,'TP đà lạt','Quận 3','Phường 7','số 33, hẻm 55','TP đà lạt, Quận 3, Phường 7, số 33, hẻm 55',0),(3,'2021-07-05 07:58:21',56,'TP đà lạt','Quận 5','Phường 4','số 2, hẻm 77','TP đà lạt, Quận 5, Phường 4, số 2, hẻm 77',0);
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
INSERT INTO `dala_brands` VALUES (1,'2021-07-05 07:58:21','Nông lâm food','https://appdala.com/images/dala-logo.png','Nông lâm food','',1,1,1,17,''),(2,'2021-07-05 07:58:21','BerryLand','https://appdala.com/images/dala-logo.png','BerryLand','',1,1,1,18,''),(3,'2021-07-05 07:58:21','Ladophar','https://appdala.com/images/dala-logo.png','Nông lâm food','',1,1,1,17,''),(4,'2021-07-05 07:58:21','Biofresh','https://appdala.com/images/dala-logo.png','BerryLand','',1,1,1,18,''),(5,'2021-07-05 07:58:21','Dalat Natural Food','https://appdala.com/images/dala-logo.png','Nông lâm food','',1,1,1,17,''),(6,'2021-07-05 07:58:21','Quốc Lộc Coffee','https://appdala.com/images/dala-logo.png','BerryLand','',1,1,1,18,''),(7,'2021-07-05 07:58:21','LaFresh','https://appdala.com/images/dala-logo.png','BerryLand','',1,1,1,18,'');
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_brands_stores_id_insert` BEFORE INSERT ON `dala_brands` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_brands_stores_id) <= 0  or NEW.dala_brands_stores_id is null or NEW.dala_brands_stores_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_brands_stores_id_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_brands_stores_id_update` BEFORE UPDATE ON `dala_brands` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_brands_stores_id) <= 0 or NEW.dala_brands_stores_id is null or NEW.dala_brands_stores_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_brands_stores_id_empty';   
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_category_general_speciality`
--

LOCK TABLES `dala_category_general_speciality` WRITE;
/*!40000 ALTER TABLE `dala_category_general_speciality` DISABLE KEYS */;
INSERT INTO `dala_category_general_speciality` VALUES (1,'2021-07-05 07:58:21','Mứt Đà Lạt',0,'Mứt Đà Lạt','https://appdala.com/images/dala-logo.png',0,0,1,17,1,1,0,''),(2,'2021-07-05 07:58:21','Trái cây sấy dẻo',0,'Trái cây sấy dẻo','https://appdala.com/images/dala-logo.png',0,0,1,18,1,1,0,''),(3,'2021-07-05 07:58:21','Trái cây sấy giòn',0,'Trái cây sấy giòn','https://appdala.com/images/dala-logo.png',0,0,1,17,1,1,0,''),(4,'2021-07-05 07:58:21','Trà Đà Lạt',0,'Trà Đà Lạt','https://appdala.com/images/dala-logo.png',0,0,1,18,1,1,0,''),(5,'2021-07-05 07:58:21','Kẹo dẻo',1,'Kẹo dẻo','https://appdala.com/images/dala-logo.png',0,0,1,17,1,1,0,''),(6,'2021-07-05 07:58:21','Mứt Atiso',1,'Mứt Atiso','https://appdala.com/images/dala-logo.png',0,0,1,17,1,1,0,''),(7,'2021-07-05 07:58:21','Mứt Bán chạy nhất',1,'Mứt Bán chạy nhất','https://appdala.com/images/dala-logo.png',0,0,1,17,1,1,0,''),(8,'2021-07-05 07:58:21','Bưởi sấy dẻo',2,'Bưởi sấy dẻo','https://appdala.com/images/dala-logo.png',0,0,1,18,1,1,0,''),(9,'2021-07-05 07:58:21','Cam sấy dẻo',2,'Cam sấy dẻo','https://appdala.com/images/dala-logo.png',0,0,1,18,1,1,0,''),(10,'2021-07-05 07:58:21','Chuối sấy dẻo',2,'Chuối sấy dẻo','https://appdala.com/images/dala-logo.png',0,0,1,18,1,1,0,''),(11,'2021-07-05 07:58:21','Chuối sấy giòn',3,'Chuối sấy giòn','https://appdala.com/images/dala-logo.png',0,0,1,18,1,1,0,''),(12,'2021-07-05 07:58:21','Khoai lang sấy giòn',3,'Khoai lang sấy giòn','https://appdala.com/images/dala-logo.png',0,0,1,18,1,1,0,''),(13,'2021-07-05 07:58:21','Mít sấy giòn',3,'Mít sấy giòn','https://appdala.com/images/dala-logo.png',0,0,1,18,1,1,0,''),(14,'2021-07-05 07:58:21','Trà Atiso',4,'Trà Atiso','https://appdala.com/images/dala-logo.png',0,0,1,18,1,1,0,''),(15,'2021-07-05 07:58:21','Trà Bán chạy nhất',4,'Trà Bán chạy nhất','https://appdala.com/images/dala-logo.png',0,0,1,18,1,1,0,''),(16,'2021-07-05 07:58:21','Trà Giảm giá Hót',4,'Trà Giảm giá Hót','https://appdala.com/images/dala-logo.png',0,0,1,18,1,1,0,''),(17,'2021-07-05 07:58:21','Dâu sấy dẻo',3,'Dâu sấy dẻo','https://appdala.com/images/dala-logo.png',0,0,1,18,1,1,0,'');
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_general_speciality_stores_id_update` BEFORE UPDATE ON `dala_category_general_speciality` FOR EACH ROW BEGIN  
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_general_speciality_category_parent_id_update` BEFORE UPDATE ON `dala_category_general_speciality` FOR EACH ROW BEGIN  

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_category_general_speciality_link`
--

LOCK TABLES `dala_category_general_speciality_link` WRITE;
/*!40000 ALTER TABLE `dala_category_general_speciality_link` DISABLE KEYS */;
INSERT INTO `dala_category_general_speciality_link` VALUES (1,1,5),(2,2,8),(3,3,12),(4,4,14),(5,5,17),(6,6,14);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_category_news`
--

LOCK TABLES `dala_category_news` WRITE;
/*!40000 ALTER TABLE `dala_category_news` DISABLE KEYS */;
INSERT INTO `dala_category_news` VALUES (1,'2021-07-05 07:58:21','Tin Tức',0,'https://appdala.com/images/dala-logo.png','Tin Tức',1,1,1),(2,'2021-07-05 07:58:21','Tin khuyến mãi',0,'https://appdala.com/images/dala-logo.png','Tin khuyến mãi',1,1,1),(3,'2021-07-05 07:58:21','Tin Tức App',0,'https://appdala.com/images/dala-logo.png','Tin Tức App',1,1,1);
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_news_name_insert` BEFORE INSERT ON `dala_category_news` FOR EACH ROW BEGIN  
IF(NEW.dala_category_news_name  is null or NEW.dala_category_news_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_category_news_name_name_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_news_parent_id_insert` BEFORE INSERT ON `dala_category_news` FOR EACH ROW BEGIN  

IF(NEW.dala_category_news_parent_id > 0 ) THEN 
	
	SET @checkID = (select category_news_ID   
	from dala_category_news  
	where dala_category_news_ID = NEW.dala_category_news_parent_id);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_category_news_parent_id_no_parent'; 
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_news_name_update` BEFORE UPDATE ON `dala_category_news` FOR EACH ROW BEGIN  
IF(NEW.dala_category_news_name  is null or NEW.dala_category_news_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_category_news_name_name_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_category_news_parent_id_update` BEFORE UPDATE ON `dala_category_news` FOR EACH ROW BEGIN  

IF(NEW.dala_category_news_parent_id > 0 ) THEN 
	
	SET @checkID = (select category_news_ID   
	from dala_category_news  
	where dala_category_news_ID = NEW.dala_category_news_parent_id);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_category_news_parent_id_no_parent'; 
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_category_news_link`
--

LOCK TABLES `dala_category_news_link` WRITE;
/*!40000 ALTER TABLE `dala_category_news_link` DISABLE KEYS */;
INSERT INTO `dala_category_news_link` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,3),(5,5,3),(6,6,3);
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
  `dala_comments_speciality_status_store` tinyint(1) NOT NULL DEFAULT '0',
  `dala_comments_speciality_status_admin` tinyint(1) NOT NULL DEFAULT '0',
  `dala_comments_speciality_status_update` tinyint(1) NOT NULL DEFAULT '0',
  `dala_comments_speciality_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_comments_speciality_ID`),
  KEY `comments_speciality_user_id` (`dala_comments_speciality_user_id`),
  KEY `comments_speciality_product_id` (`dala_comments_speciality_product_id`),
  CONSTRAINT `comments_speciality_product_id` FOREIGN KEY (`dala_comments_speciality_product_id`) REFERENCES `dala_products_speciality` (`dala_products_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comments_speciality_user_id` FOREIGN KEY (`dala_comments_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_comments_speciality`
--

LOCK TABLES `dala_comments_speciality` WRITE;
/*!40000 ALTER TABLE `dala_comments_speciality` DISABLE KEYS */;
INSERT INTO `dala_comments_speciality` VALUES (1,'2021-07-05 07:58:21',56,0,1,'sản phẩm tốt , rất hài lòng',0,1,0,''),(2,'2021-07-05 07:58:21',56,0,2,'sản phẩm tốt , rất hài lòng',0,1,0,''),(3,'2021-07-05 07:58:21',56,1,1,'sản phẩm tốt , rất hài lòng',0,1,0,''),(4,'2021-07-05 07:58:21',56,2,2,'sản phẩm tốt , rất hài lòng',0,1,0,''),(5,'2021-07-05 07:58:21',56,0,3,'sản phẩm tốt , rất hài lòng',0,1,0,'');
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
  `dala_coupon_speciality_qoute` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_coupon_speciality_ID`),
  KEY `coupon_speciality_stores_id_created` (`dala_coupon_speciality_stores_id_created`),
  CONSTRAINT `coupon_speciality_stores_id_created` FOREIGN KEY (`dala_coupon_speciality_stores_id_created`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_coupon_speciality`
--

LOCK TABLES `dala_coupon_speciality` WRITE;
/*!40000 ALTER TABLE `dala_coupon_speciality` DISABLE KEYS */;
INSERT INTO `dala_coupon_speciality` VALUES (1,'2021-07-05 07:58:21','MPVC500',17,'Miễn phí vận chuyển cho đơn hàng tổng tiền lớn hơn 500.000 đ',0,1,0,1,0,30000,NULL,NULL,0,1,1,0,''),(2,'2021-07-05 07:58:21','DHDT',17,'Đơn hàng đầu tiên giảm giá 10%',0,1,0,3,0,0,NULL,NULL,0,1,1,0,'');
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

IF(LENGTH(NEW.dala_coupon_speciality_date_star) > 0  and LENGTH(NEW.dala_coupon_speciality_date_end) > 0) THEN 
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

IF(LENGTH(NEW.dala_coupon_speciality_date_star) > 0  and LENGTH(NEW.dala_coupon_speciality_date_end) > 0) THEN 
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_discount_program`
--

LOCK TABLES `dala_discount_program` WRITE;
/*!40000 ALTER TABLE `dala_discount_program` DISABLE KEYS */;
INSERT INTO `dala_discount_program` VALUES (1,'2021-07-05 07:58:21','flash sale',17,'https://appdala.com/images/dala-logo.png',0,0,1,1,1,0,0,0,0,NULL,NULL,'Chương trình khuyến mãi Flash sale',''),(2,'2021-07-05 07:58:21','Mứt dâu giảm giá 40%',17,'https://appdala.com/images/dala-logo.png',0,0,2,1,1,0,0,0,0,NULL,NULL,'Chương trình khuyến mãi Mứt dâu giảm giá 40%',''),(3,'2021-07-05 07:58:21','Sản phẩm theo mùa',18,'https://appdala.com/images/dala-logo.png',0,0,3,1,1,0,0,0,0,NULL,NULL,'Chương trình khuyến mãi Sản phẩm theo mùa','');
/*!40000 ALTER TABLE `dala_discount_program` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_discount_program_details`
--

LOCK TABLES `dala_discount_program_details` WRITE;
/*!40000 ALTER TABLE `dala_discount_program_details` DISABLE KEYS */;
INSERT INTO `dala_discount_program_details` VALUES (1,'2021-07-05 07:58:21',1,18,2,1,0,0,10,''),(2,'2021-07-05 07:58:21',2,17,2,1,0,0,20,''),(3,'2021-07-05 07:58:21',3,18,2,1,0,0,30,'');
/*!40000 ALTER TABLE `dala_discount_program_details` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_discount_program_product_link`
--

LOCK TABLES `dala_discount_program_product_link` WRITE;
/*!40000 ALTER TABLE `dala_discount_program_product_link` DISABLE KEYS */;
INSERT INTO `dala_discount_program_product_link` VALUES (1,'2021-07-05 07:58:21',1,2,1,''),(2,'2021-07-05 07:58:21',1,4,1,''),(3,'2021-07-05 07:58:21',1,6,1,''),(4,'2021-07-05 07:58:21',3,2,1,''),(5,'2021-07-05 07:58:21',3,4,1,''),(6,'2021-07-05 07:58:21',2,1,1,''),(7,'2021-07-05 07:58:21',2,3,1,''),(8,'2021-07-05 07:58:21',2,5,1,'');
/*!40000 ALTER TABLE `dala_discount_program_product_link` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_like_product`
--

LOCK TABLES `dala_like_product` WRITE;
/*!40000 ALTER TABLE `dala_like_product` DISABLE KEYS */;
INSERT INTO `dala_like_product` VALUES (1,'2021-07-05 07:58:21',56,1,0),(2,'2021-07-05 07:58:21',56,2,0),(3,'2021-07-05 07:58:21',56,3,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_like_store`
--

LOCK TABLES `dala_like_store` WRITE;
/*!40000 ALTER TABLE `dala_like_store` DISABLE KEYS */;
INSERT INTO `dala_like_store` VALUES (1,'2021-07-05 07:58:21',56,17,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_news`
--

LOCK TABLES `dala_news` WRITE;
/*!40000 ALTER TABLE `dala_news` DISABLE KEYS */;
INSERT INTO `dala_news` VALUES (1,'Dala hoàn thành app vào cuối tháng 7','2021-07-05 07:58:21','https://appdala.com/images/dala-logo.png','Dala hoàn thành app vào cuối tháng 7','\n	\n	<div><img src=\"https://appdala.com/images/dala-logo.png\"/></div>\r\n<br>\r\n\n	dala hoàn thành app vào cuối tháng 7, Đội ngủ thiết kế đã hoàn thiện giao diện suất sắc\n	\n	\n	',1),(2,'Dala hoàn thành API','2021-07-05 07:58:21','https://appdala.com/images/dala-logo.png','Dala hoàn thành API chờ kết nối app','\n	\n	<div><img src=\"https://appdala.com/images/dala-logo.png\"/></div>\r\n<br>\r\n\n	Dala hoàn thành API chờ kết nối app. những màn hình đâu tiên của APP đã xuất hiện, Đội ngủ lập trình đang rất hào hứng\n	\n	\n	',1),(3,'Dala hoàn thành kết nối API với APP','2021-07-05 07:58:21','https://appdala.com/images/dala-logo.png','Dala hoàn thành kết nối API với APP','\n	\n	<div><img src=\"https://appdala.com/images/dala-logo.png\"/></div>\r\n<br>\r\n\n	Dala hoàn thành kết nối API với APP. những màn hình đâu tiên của APP đã xuất hiện, Đội ngủ lập trình đang rất hào hứng, Cam kết hoàn thành trong tháng 7\n	\n	\n	',1),(4,'Dala hoàn thành app vào cuối tháng 7','2021-07-05 07:58:21','https://appdala.com/images/dala-logo.png','Dala hoàn thành app vào cuối tháng 7','Dala hoàn thành app vào cuối tháng 7',1),(5,'Dala hoàn thành API','2021-07-05 07:58:21','https://appdala.com/images/dala-logo.png','Dala hoàn thành API chờ kết nối app','Dala hoàn thành API chờ kết nối app.',1),(6,'Dala hoàn thành kết nối API với APP','2021-07-05 07:58:21','https://appdala.com/images/dala-logo.png','Dala hoàn thành kết nối API với APP','Dala hoàn thành kết nối API với APP',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_options_product_speciality`
--

LOCK TABLES `dala_options_product_speciality` WRITE;
/*!40000 ALTER TABLE `dala_options_product_speciality` DISABLE KEYS */;
INSERT INTO `dala_options_product_speciality` VALUES (1,'Màu Sắc','https://appdala.com/images/dala-logo.png',0,17,1,1,1,'Màu Sắc','2021-07-05 07:58:21',''),(2,'Màu đỏ','https://appdala.com/images/dala-logo.png',1,17,1,1,1,'Màu đỏ','2021-07-05 07:58:21',''),(3,'Màu xanh','https://appdala.com/images/dala-logo.png',1,17,1,1,1,'Màu xanh','2021-07-05 07:58:21',''),(4,'Kích thướt','https://appdala.com/images/dala-logo.png',0,18,1,1,1,'Kích thướt','2021-07-05 07:58:21',''),(5,'Size lớn','https://appdala.com/images/dala-logo.png',4,18,1,1,1,'size lớn','2021-07-05 07:58:21',''),(6,'Size nhỏ','https://appdala.com/images/dala-logo.png',4,18,1,1,1,'size nhỏ','2021-07-05 07:58:21','');
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_options_product_speciality_name_insert` BEFORE INSERT ON `dala_options_product_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_options_product_speciality_name  is null or NEW.dala_options_product_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_options_product_speciality_name_name_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_options_product_speciality_stores_id_insert` BEFORE INSERT ON `dala_options_product_speciality` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_options_product_speciality_stores_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_options_product_speciality_stores_id_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_options_product_speciality_stores_id_update` BEFORE UPDATE ON `dala_options_product_speciality` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_options_product_speciality_stores_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_options_product_speciality_stores_id_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_options_product_speciality_parent_id` BEFORE UPDATE ON `dala_options_product_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_options_product_speciality_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_category_general_speciality_ID  
	from dala_category_general_speciality 
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_options_product_speciality_link`
--

LOCK TABLES `dala_options_product_speciality_link` WRITE;
/*!40000 ALTER TABLE `dala_options_product_speciality_link` DISABLE KEYS */;
INSERT INTO `dala_options_product_speciality_link` VALUES (1,1,2,0),(2,1,3,0),(3,2,5,0),(4,2,6,0),(5,3,2,0),(6,3,3,0),(7,4,5,0),(8,4,6,0);
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
  CONSTRAINT `orders_details_speciality_order_id` FOREIGN KEY (`dala_orders_details_speciality_order_id`) REFERENCES `dala_orders_speciality` (`dala_orders_speciality_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_orders_details_speciality`
--

LOCK TABLES `dala_orders_details_speciality` WRITE;
/*!40000 ALTER TABLE `dala_orders_details_speciality` DISABLE KEYS */;
INSERT INTO `dala_orders_details_speciality` VALUES (1,1,'product',1,2,65000,''),(2,1,'product',2,2,65000,''),(3,1,'product',3,2,29000,''),(4,2,'product',1,2,65000,''),(5,2,'product',2,5,65000,''),(6,2,'product',3,1,29000,''),(7,2,'product',4,3,29000,''),(8,3,'product',4,2,29000,''),(9,3,'product',5,5,120000,''),(10,3,'product',6,1,17000,''),(11,3,'product',1,3,65000,''),(12,4,'product',6,3,17000,''),(13,4,'product',5,3,120000,''),(14,4,'product',4,5,29000,''),(15,4,'product',3,3,29000,'');
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
  `dala_orders_speciality_date_orders` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dala_orders_speciality_status_orders` tinyint(1) NOT NULL DEFAULT '0',
  `dala_orders_speciality_status_payment` tinyint(1) NOT NULL DEFAULT '0',
  `dala_orders_speciality_adress` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_notes` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_phone` char(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_email` char(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_orders_speciality_shipping_code` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_orders_speciality_ID`),
  KEY `orders_speciality_user_id` (`dala_orders_speciality_user_id`),
  CONSTRAINT `orders_speciality_user_id` FOREIGN KEY (`dala_orders_speciality_user_id`) REFERENCES `dala_users` (`dala_users_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_orders_speciality`
--

LOCK TABLES `dala_orders_speciality` WRITE;
/*!40000 ALTER TABLE `dala_orders_speciality` DISABLE KEYS */;
INSERT INTO `dala_orders_speciality` VALUES (1,56,'2021-07-05 07:58:21',1,1,'Biên hòa','','0948036018','custommers@gmail.com',''),(2,56,'2021-07-05 07:58:21',1,1,'Đà lạt','','0948036011','custommer2@gmail.com',''),(3,56,'2021-07-05 07:58:21',1,1,'Đồng nai','','0948036012','custommer3@gmail.com',''),(4,56,'2021-07-05 07:58:21',1,1,'TP HCM','','0948036013','custommer4@gmail.com','');
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_orders_speciality_phone_insert` BEFORE INSERT ON `dala_orders_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_orders_speciality_phone is null or NEW.dala_orders_speciality_phone = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_orders_speciality_phone_empty';   
ELSE 
	IF (NEW.dala_orders_speciality_phone REGEXP '^[0-9]{10,11}+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_phone_data_type';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_orders_speciality_email_insert` BEFORE INSERT ON `dala_orders_speciality` FOR EACH ROW BEGIN  

IF(LENGTH(NEW.dala_orders_speciality_email) > 0 ) THEN 	
	IF (NEW.dala_orders_speciality_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_dala_orders_speciality_email_data_type';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_orders_speciality_user_id_insert` BEFORE INSERT ON `dala_orders_speciality` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_orders_speciality_user_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_orders_speciality_user_id_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_orders_speciality_phone_update` BEFORE UPDATE ON `dala_orders_speciality` FOR EACH ROW BEGIN  

IF(NEW.dala_orders_speciality_phone is null or NEW.dala_orders_speciality_phone = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_orders_speciality_phone_empty';   
ELSE 
	IF (NEW.dala_orders_speciality_phone REGEXP '^[0-9]{10,11}+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_phone_data_type';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_orders_speciality_email_update` BEFORE UPDATE ON `dala_orders_speciality` FOR EACH ROW BEGIN  

IF(LENGTH(NEW.dala_orders_speciality_email) > 0 ) THEN 	
	IF (NEW.dala_orders_speciality_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_dala_orders_speciality_email_data_type';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_orders_speciality_user_id_update` BEFORE UPDATE ON `dala_orders_speciality` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_orders_speciality_user_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_orders_speciality_user_id_empty';   
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
  PRIMARY KEY (`dala_products_speciality_ID`),
  UNIQUE KEY `dala_products_speciality_sku` (`dala_products_speciality_sku`),
  KEY `products_speciality_store_id` (`dala_products_speciality_store_id`),
  CONSTRAINT `products_speciality_store_id` FOREIGN KEY (`dala_products_speciality_store_id`) REFERENCES `dala_stores` (`dala_stores_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_products_speciality`
--

LOCK TABLES `dala_products_speciality` WRITE;
/*!40000 ALTER TABLE `dala_products_speciality` DISABLE KEYS */;
INSERT INTO `dala_products_speciality` VALUES (1,'Kẹo dẻo phủ chocolate loại đặc biệt-220gr',0,'2021-07-05 07:58:21','KD1',17,0,'https://appdala.com/images/dala-logo.png','https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;','Việt Nam',' Kẹo dẻo phủ socola có vị ngọt nhẹ và dai, phủ một lớp socola mỏng, cho ta vị hậu đắng nhẹ tăng thêm độ hoàn hảo và một hương vị đặc trưng của vùng cao nguyên Đà Lạt.\r\n\r\nMàu sắc: Kẹo có màu sắc tự nhiên, phủ bên trên là lớp socola mỏng tạo cái nhìn thiện cảm cho người dùng.\r\nMùi vị: mỗi màu sắc là một vị khác nhau, chua,ngọt trộn với vị hậu đắng nhẹ gây kích thích vị giác.\r\nĂn trực tiếp.\r\nChỉ sử dụng acid citrid để bảo quản và duy trì màu sắc cho sản phẩm. Trẻ em, phụ nữ mang thai có thể sử dụng được.\r\n – Thành phần: Kẹo dẻo trái cây (70%), chocolate đen.\r\n\r\n – KLT: 220g\r\n\r\n – Hướng dẫn sử dụng: Mở bao bì và dùng trực tiếp. Làm kín miệng sau mỗi lần sử dụng.\r\n\r\n – Bảo quản: Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp.\r\n\r\n                      Không sử dụng sản phẩm khi có dấu hiệu ẩm mốc, xuất hiện mùi lạ.\r\n\r\nSản phẩm được phân phối bởi Dala.vn.',70000,65000,NULL,NULL,NULL,2,1,1,1,'','⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\r\n⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\r\n⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\r\n\r\n⇒ Mua số lượng lớn khách hàng ','',10,10,10,200),(2,'Vỏ bưởi mật ong sấy dẻo-100gram',0,'2021-07-05 07:58:21','KD2',18,0,'https://appdala.com/images/dala-logo.png','https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;','Việt Nam','	⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng ⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\n		⇒ Mua số lượng lớn khách hàng vui lòng liên hệ Hotline: 0982900100 để có giá tốt nhất.\n	',70000,65000,NULL,NULL,NULL,2,1,1,1,'','⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\r\n⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\r\n⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\r\n\r\n⇒ Mua số lượng lớn khách hàng ','',10,10,10,200),(3,'Khoai lang Nhật sợi sấy dòn loại Đặc Biệt-100gram',0,'2021-07-05 07:58:21','CS1',17,0,'https://appdala.com/images/dala-logo.png','https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;','Việt Nam','	\n		KHOAI LANG NHẬT SỢI SẤY GIÒN\n		Ai trong chúng ta cũng đều biết đến khoai lang, một loại thực phẩm tuy giản dị, thô sơ nhưng lại mang trong mình hàm lượng dinh dưỡng và chất xơ cao đến không ngờ. Nhưng, có chắc rằng bạn biết đến khoai lang ở dạng sợi chưa? Trong hình dáng mới, cọng thuôn dài, độ dài khoảng tầm 7cm, sản phẩm mang lại cho người dùng. một cảm giác ăn thật ngon miệng.\n	',35000,29000,NULL,NULL,NULL,2,1,1,1,'','⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\r\n⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\r\n⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\r\n\r\n⇒ Mua số lượng lớn khách hàng ','',10,10,10,200),(4,'Trà Actisô Túi Lọc Ladophar – 100 túi',0,'2021-07-05 07:58:21','TRA1',18,0,'https://appdala.com/images/dala-logo.png','https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;','Việt Nam','	\n	\n	Trà túi lọc Actiso là sản phấm chiết xuất từ thiên nhiên, với hương thơm và vị ngọt hoàn toàn tự nhiên nay được bổ sung thêm thành phần cao Actisô giúp tăng cường hiệu quả phòng ngừa và bảo vệ gan mật.\n	Trà túi lọc Actiso được đóng gói theo quy cách 100 túi lọc x 2g, rất dễ dàng sử dụng cũng như bảo quản.\n	Trà túi lọc Actiso rất tốt. Với công dụng mát gan, lợi tiểu, thông mật, rất thích hợp cho người bị yếu gan, nổi mề đay, vàng da. Có thể dùng hằng ngày thay nước lọc. \n	\n   ',35000,29000,NULL,NULL,NULL,2,1,1,1,'','⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\r\n⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\r\n⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\r\n\r\n⇒ Mua số lượng lớn khách hàng ','',10,10,10,200),(5,'Dâu tây sấy dẻo-150gr',0,'2021-07-05 07:58:21','DAU1',17,0,'https://appdala.com/images/dala-logo.png','https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;','Việt Nam','	\n	\n		Từ lâu, những quả dâu tây đỏ mọng nước đã nổi tiếng là nguồn cung cấp vitamin C dồi dào cho cơ thể, nhưng ít người biết tới loại quả này còn rất giàu các chất chống oxy hóa có lợi. Việc ăn dâu tây mỗi ngày giúp ngăn ngừa lão hóa, tăng cường hệ miễn dịch, giảm chứng viêm khớp, phòng ngừa tiểu đường cũng như sự hình thành và lan rộng của các khối u. Đặc biệt, dâu tây còn giúp cơ thể sản sinh các hormore hạnh phúc (dopamine, serotonin) không chỉ chữa chứng trầm cảm còn giúp thúc đẩy máu mang dưỡng chất tới não.\n		Hiểu được được tầm quan trọng của dâu tây đối với sức khỏe, BerryLand đã sử dụng dây chuyền sản xuất hiện đại của mình để mang đến những quả dâu cô đặc đầy dinh dưỡng trong món Dâu Sấy Dẻo nổi tiếng của mình. Được sấy bằng công nghệ cao trong dây chuyền khép kín, Dâu sấy dẻo BerryLand không chỉ giữ được hàm lượng dinh dưỡng của trái cây tươi, mà còn làm giảm độ chua giúp tăng vị ngọt dịu cho những quả dâu thêm phần thơm ngon. Chính vì vậy, món ăn vặt dinh dưỡng này sẽ là lựa chọn phù hợp cho tất cả các đối tượng từ trẻ em, người lớn cho tới các mẹ bầu. Ngoài ra, sản phẩm được đóng gói nhỏ gọn, đẹp mắt phù hợp cho việc đãi khách, mang theo tới văn phòng, hay những chuyến du lịch xa.	\n   \n   ',140000,120000,NULL,NULL,NULL,2,1,1,1,'','⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\r\n⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\r\n⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\r\n\r\n⇒ Mua số lượng lớn khách hàng ','',10,10,10,200),(6,'Trà Lado Linh Chi bổ gan mật – Hộp 20 Túi Lọc',0,'2021-07-05 07:58:21','DAU2',18,0,'https://appdala.com/images/dala-logo.png','https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;https://appdala.com/images/dala-logo.png;','Việt Nam','	\n		⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\n		⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\n		⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\n		⇒ Mua số lượng lớn khách hàng vui lòng liên hệ Hotline: 0982900100 để có giá tốt nhất.\n   ',20000,17000,NULL,NULL,NULL,2,1,1,1,'','⇒ Khuyễn mãi giao hàng miễn phí trên toàn quốc với đơn hàng trên 1 triệu đồng\r\n⇒ Giao hàng Siêu tốc (Từ 1 tiếng – 3 tiếng) trong nội thành TP Đà Lạt\r\n⇒ Tuyển đại lý trên toàn quốc với nhiều chính sách ưu đãi, hấp dẫn dành cho đại lý.\r\n\r\n⇒ Mua số lượng lớn khách hàng ','',10,10,10,200);
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_products_speciality_name_insert` BEFORE INSERT ON `dala_products_speciality` FOR EACH ROW BEGIN  


IF(NEW.dala_products_speciality_name  is null or NEW.dala_products_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_name_empty';   
END IF;	

IF(NEW.dala_products_speciality_sku  is null or NEW.dala_products_speciality_sku = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_sku_empty';   
END IF;	


IF(LENGTH(NEW.dala_products_speciality_date_start) > 0  and LENGTH(NEW.dala_products_speciality_date_end) > 0) THEN 
	IF( (UNIX_TIMESTAMP(NEW.dala_products_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_products_speciality_date_start)) <= 0 ) THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_date_end_less_star';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_products_speciality_price_insert` BEFORE INSERT ON `dala_products_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_products_speciality_price  is null or NEW.dala_products_speciality_price = '' or NEW.dala_products_speciality_price < 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_price_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_products_speciality_store_id_insert` BEFORE INSERT ON `dala_products_speciality` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_products_speciality_store_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_store_id_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_products_speciality_brand_insert` BEFORE INSERT ON `dala_products_speciality` FOR EACH ROW BEGIN  

IF(LENGTH(NEW.dala_products_speciality_brand) > 0 ) THEN 
	
	SET @checkID = (select dala_brands_ID  from dala_brands where dala_brands_ID  = NEW.dala_products_speciality_brand);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_brand_no_refe'; 
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_products_speciality_parent_id_insert` BEFORE INSERT ON `dala_products_speciality` FOR EACH ROW BEGIN  

IF(LENGTH( NEW.dala_products_speciality_parent_id ) > 0 ) THEN 
	
	SET @checkID = (select dala_products_speciality_ID  from dala_products_speciality where dala_products_speciality_ID  = NEW.dala_products_speciality_parent_id );
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_parent_id_no_refe'; 
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_products_speciality_name_update` BEFORE UPDATE ON `dala_products_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_products_speciality_name  is null or NEW.dala_products_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_name_empty';   
END IF;	




IF(NEW.dala_products_speciality_sku  is null or NEW.dala_products_speciality_sku = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_sku_empty';   
END IF;	


IF(LENGTH(NEW.dala_products_speciality_date_start) > 0  and LENGTH(NEW.dala_products_speciality_date_end) > 0) THEN 
	IF( (UNIX_TIMESTAMP(NEW.dala_products_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_products_speciality_date_start)) <= 0 ) THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_date_end_less_star';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_products_speciality_price_update` BEFORE UPDATE ON `dala_products_speciality` FOR EACH ROW BEGIN  
IF(NEW.dala_products_speciality_price  is null or NEW.dala_products_speciality_price = '' or NEW.dala_products_speciality_price < 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_price_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_products_speciality_store_id_update` BEFORE UPDATE ON `dala_products_speciality` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_products_speciality_store_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_store_id_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_products_speciality_brand_update` BEFORE UPDATE ON `dala_products_speciality` FOR EACH ROW BEGIN  

IF(LENGTH(NEW.dala_products_speciality_brand) > 0 ) THEN 
	
	SET @checkID = (select dala_brands_ID  from dala_brands where dala_brands_ID  = NEW.dala_products_speciality_brand);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_brand_no_refe'; 
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_products_speciality_parent_id_update` BEFORE UPDATE ON `dala_products_speciality` FOR EACH ROW BEGIN  

IF(LENGTH( NEW.dala_products_speciality_parent_id ) > 0 ) THEN 
	
	SET @checkID = (select dala_products_speciality_ID  from dala_products_speciality where dala_products_speciality_ID  = NEW.dala_products_speciality_parent_id );
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_parent_id_no_refe'; 
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_reviews_speciality`
--

LOCK TABLES `dala_reviews_speciality` WRITE;
/*!40000 ALTER TABLE `dala_reviews_speciality` DISABLE KEYS */;
INSERT INTO `dala_reviews_speciality` VALUES (1,'2021-07-05 07:58:21',56,1,'Sản phẩm rất tốt, Đã mua và hài lòng vhới chất lượng và dịch vụ',1,5),(2,'2021-07-05 07:58:21',56,2,'Sản phẩm rất tốt, Đã mua và hài lòng vhới chất lượng và dịch vụ',1,4),(3,'2021-07-05 07:58:21',56,3,'Sản phẩm rất tốt, Đã mua và hài lòng vhới chất lượng và dịch vụ',1,3),(4,'2021-07-05 07:58:21',56,4,'Sản phẩm rất tốt, Đã mua và hài lòng vhới chất lượng và dịch vụ',1,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_reviews_store_speciality`
--

LOCK TABLES `dala_reviews_store_speciality` WRITE;
/*!40000 ALTER TABLE `dala_reviews_store_speciality` DISABLE KEYS */;
INSERT INTO `dala_reviews_store_speciality` VALUES (1,'2021-07-05 07:58:21',56,17,'Cửa hàng rất tốt- giao hàng nhanh, Chu đáo',1,5),(2,'2021-07-05 07:58:21',56,18,'Cửa hàng rất tốt- giao hàng nhanh, Chu đáo',1,4);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_shipping_company`
--

LOCK TABLES `dala_shipping_company` WRITE;
/*!40000 ALTER TABLE `dala_shipping_company` DISABLE KEYS */;
INSERT INTO `dala_shipping_company` VALUES (1,'DALA company ','Số 11 trương định, Dà lạt'),(2,'Giao hàng tiết kiệm ','Số 11 quận 8, TP hồ chí minh');
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
  `dala_shipping_speciality_parent_id` int NOT NULL DEFAULT '0',
  `dala_shipping_speciality_information` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_shipping_speciality_price` float DEFAULT NULL,
  `dala_shipping_speciality_show` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`dala_shipping_speciality_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_shipping_speciality`
--

LOCK TABLES `dala_shipping_speciality` WRITE;
/*!40000 ALTER TABLE `dala_shipping_speciality` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_shipping_tracking`
--

LOCK TABLES `dala_shipping_tracking` WRITE;
/*!40000 ALTER TABLE `dala_shipping_tracking` DISABLE KEYS */;
INSERT INTO `dala_shipping_tracking` VALUES (1,'2021-07-05 07:58:21',63,1,'giao hàng trong ngày',0,'giao hàng trong ngày'),(2,'2021-07-05 07:58:21',63,1,'giao hàng trong ngày',1,'giao hàng trong ngày'),(3,'2021-07-05 07:58:21',63,1,'giao hàng trong ngày',2,'giao hàng trong ngày'),(4,'2021-07-05 07:58:21',63,1,'giao hàng trong ngày',3,'giao hàng trong ngày'),(5,'2021-07-05 07:58:21',63,2,'giao hàng trong ngày',0,'giao hàng trong ngày'),(6,'2021-07-05 07:58:21',63,2,'giao hàng trong ngày',1,'giao hàng trong ngày'),(7,'2021-07-05 07:58:21',63,2,'giao hàng trong ngày',2,'giao hàng trong ngày');
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
INSERT INTO `dala_stores` VALUES (17,51,'2021-05-19 15:32:45','Cửa hàng đặt sản đà lạt DALA',10000000,3,'asdasdasd','','','',1,0,'','','','asdasdasd','asdasdasd',1,0,28,20,300),(18,52,'2021-05-19 15:32:45','Cửa hàng sao kim',10000000,3,'asdasdasd','','','',1,0,'','','','asdasdasd','asdasdasd',1,0,28,20,300);
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_stores_name_insert` BEFORE INSERT ON `dala_stores` FOR EACH ROW BEGIN  
IF(NEW.dala_stores_name  is null or NEW.dala_stores_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_stores_name_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_stores_user_id_insert` BEFORE INSERT ON `dala_stores` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_stores_user_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_stores_user_id_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_stores_service_type_id_insert` BEFORE INSERT ON `dala_stores` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_stores_service_type_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_stores_service_type_id_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_stores_user_id_update` BEFORE UPDATE ON `dala_stores` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_stores_user_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_stores_user_id_empty';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_stores_service_type_id_update` BEFORE UPDATE ON `dala_stores` FOR EACH ROW BEGIN  
IF(LENGTH(NEW.dala_stores_service_type_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_stores_service_type_id_empty';   
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
  `dala_token_value` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_token_date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`dala_token_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_token`
--

LOCK TABLES `dala_token` WRITE;
/*!40000 ALTER TABLE `dala_token` DISABLE KEYS */;
INSERT INTO `dala_token` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJfcm9sZSI6ImRlZmF1bHQiLCJpYXQiOjE2MjMyMjg3NTl9.iQrzkanw_3SAyFT03Kq3GbWLdpcZtvkuswhKaKtsn0M','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NTcsInVzZXJzX2Z1bGxfbmFtZSI6Ikd1ZXN0RGFsYUFsbCIsInVzZXJzX3Bob25lIjoiMDk0ODAzNjAxMDciLCJ1c2Vyc19lbWFpbCI6Ikd1ZXN0RGFsYUFsbEBnbWFpbC5jb20iLCJ1c2Vyc19wYXNzd29yZCI6IjQxMjc4OTUzNGY1Y2Q1YjI2M2JiNTc0YmEyZjA5NTg1IiwidXNlcl9yb2xlIjoiZGVmYXVsdCIsImlhdCI6MTYyMzIyODc1OX0.q5Qv9zG_ynJsnOFFqcB4mDpMftZ9fxHToXbFfuAxXBo','2021-07-05 07:58:21'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2VyX3JvbGUiOiJzdXBwZXItam9iIiwiaWF0IjoxNjIzNTUxNTE3fQ.lPM-4c93GPDnmwHwayVp94AXPtG0Zn7oyt5U8djJVwQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2Vyc19waG9uZSI6IjA4ODk0NTAzMDciLCJ1c2Vyc19lbWFpbCI6InN1cHBlci1qb2JAZ21haWwuY29tIiwidXNlcnNfcGFzc3dvcmQiOiJlNmY2YzE4NTY5MDlmZDRiNTI3YjNhYjA0ZDBlOTlhMyIsInVzZXJfcm9sZSI6InN1cHBlci1qb2IiLCJpYXQiOjE2MjM1NTE1MTd9.S37Ab2vDod4e9YErqdqeLEFTUt18WgEcxMUtsROdC7o','2021-07-05 07:58:21');
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
  `dala_uploads_infomation_stores_id` int NOT NULL,
  `dala_uploads_infomation_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_uploads_infomation_ip` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dala_uploads_infomation_ID`),
  KEY `dala_uploads_infomation_stores_id__ dala_stores_ID` (`dala_uploads_infomation_stores_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_uploads_infomation`
--

LOCK TABLES `dala_uploads_infomation` WRITE;
/*!40000 ALTER TABLE `dala_uploads_infomation` DISABLE KEYS */;
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
  `dala_users_verification_status` tinyint(1) NOT NULL DEFAULT '0',
  `dala_users_verification_code` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dala_users_verification_time` datetime DEFAULT NULL,
  PRIMARY KEY (`dala_users_ID`),
  UNIQUE KEY `check_users_phone_unique` (`dala_users_phone`),
  KEY `users_users_type_id` (`dala_users_users_type_id`),
  CONSTRAINT `users_users_type_id` FOREIGN KEY (`dala_users_users_type_id`) REFERENCES `dala_users_type` (`dala_users_type_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_users`
--

LOCK TABLES `dala_users` WRITE;
/*!40000 ALTER TABLE `dala_users` DISABLE KEYS */;
INSERT INTO `dala_users` VALUES (50,'2021-05-19 14:36:30','manage-dala','a3dcb4d229de6fde0db5686dee47145d','','manage-dala','manage-dala','manage-dala','0948036018','htms.group.vn@gmail.com','v4','v4','v4','v4',13,0,0,'',NULL),(51,'2021-05-19 14:37:36','dala-store','a3dcb4d229de6fde0db5686dee47145d','','dala-store','dala-store','dala-store','09480360101','dala-store@gmail.com','v4','v4','v4','v4',14,0,0,'',NULL),(52,'2021-05-19 14:39:27','saokim','a3dcb4d229de6fde0db5686dee47145d','','Cua hang','Sao Kim','11 Dang Duc Thuat','09480360102','saokim.team@gmail.com','v4','v4','v4','v4',14,0,0,'',NULL),(55,'2021-05-19 14:45:47','tuanbao','a3dcb4d229de6fde0db5686dee47145d','','tuanbao','tuanbao','tuanbao','09480360105','tuanbao@gmail.com','v4','v4','v4','v4',14,0,0,'',NULL),(56,'2021-05-19 14:47:18','custommer','a3dcb4d229de6fde0db5686dee47145d','','custommer','custommer','custommer','09480360106','custommer@gmail.com','v4','v4','v4','v4',15,0,0,'',NULL),(57,'2021-05-19 14:48:49','GuestDalaAll','412789534f5cd5b263bb574ba2f09585','','GuestDalaAll','GuestDalaAll','GuestDalaAll','09480360107','GuestDalaAll@gmail.com','v4','v4','v4','v4',16,0,0,'',NULL),(62,'2021-05-19 14:48:49','supper-job','e6f6c1856909fd4b527b3ab04d0e99a3','','supper-job','supper-job','supper-job','0889450307','supper-job@gmail.com','v4','v4','v4','v4',17,0,0,'',NULL),(63,'2021-05-19 14:48:49','shipping 1','a3dcb4d229de6fde0db5686dee47145d','','shipping 1','shipping 1','shipping 1','09480360121','shipping1@gmail.com','v4','v4','v4','v4',18,0,0,'',NULL);
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_check_users_phone_data_insert` BEFORE INSERT ON `dala_users` FOR EACH ROW BEGIN  

IF(NEW.dala_users_phone is null or NEW.dala_users_phone = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_check_users_phone_data_empty';   
ELSE 
	IF (NEW.dala_users_phone REGEXP '^[0-9]{10,11}+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_users_phone_data_type';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_check_users_email_data_insert` BEFORE INSERT ON `dala_users` FOR EACH ROW BEGIN  

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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_check_users_phone_data_update` BEFORE UPDATE ON `dala_users` FOR EACH ROW BEGIN  


IF(LENGTH(NEW.dala_users_phone) > 0 ) THEN 
	IF (NEW.dala_users_phone REGEXP '^[0-9]{10,11}+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_users_phone_data_type';   
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_check_users_email_data_update` BEFORE UPDATE ON `dala_users` FOR EACH ROW BEGIN  

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
 1 AS `dala_orders_speciality_date_orders`,
 1 AS `dala_orders_speciality_status_orders`,
 1 AS `dala_orders_speciality_status_payment`,
 1 AS `dala_orders_speciality_adress`,
 1 AS `dala_orders_speciality_notes`,
 1 AS `dala_orders_speciality_phone`,
 1 AS `dala_orders_speciality_email`,
 1 AS `dala_orders_speciality_shipping_code`,
 1 AS `dala_orders_details_speciality_ID`,
 1 AS `dala_orders_details_speciality_order_id`,
 1 AS `dala_orders_details_speciality_line_order`,
 1 AS `dala_orders_details_speciality_product_id`,
 1 AS `dala_orders_details_speciality_qty`,
 1 AS `dala_orders_details_speciality_price`,
 1 AS `dala_orders_details_medium_text`,
 1 AS `dala_products_speciality_ID`,
 1 AS `dala_products_speciality_name`,
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
 1 AS `dala_orders_speciality_date_orders`,
 1 AS `dala_orders_speciality_status_orders`,
 1 AS `dala_orders_speciality_status_payment`,
 1 AS `dala_orders_speciality_adress`,
 1 AS `dala_orders_speciality_notes`,
 1 AS `dala_orders_speciality_phone`,
 1 AS `dala_orders_speciality_email`,
 1 AS `dala_orders_speciality_shipping_code`,
 1 AS `dala_orders_details_speciality_ID`,
 1 AS `dala_orders_details_speciality_order_id`,
 1 AS `dala_orders_details_speciality_line_order`,
 1 AS `dala_orders_details_speciality_product_id`,
 1 AS `dala_orders_details_speciality_qty`,
 1 AS `dala_orders_details_speciality_price`,
 1 AS `dala_orders_details_medium_text`,
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dala_view_product`
--

LOCK TABLES `dala_view_product` WRITE;
/*!40000 ALTER TABLE `dala_view_product` DISABLE KEYS */;
INSERT INTO `dala_view_product` VALUES (1,'2021-07-05 07:58:21',56,1),(2,'2021-07-05 07:58:21',56,2),(3,'2021-07-05 07:58:21',56,3);
/*!40000 ALTER TABLE `dala_view_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `dala_view_products`
--

DROP TABLE IF EXISTS `dala_view_products`;
/*!50001 DROP VIEW IF EXISTS `dala_view_products`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dala_view_products` AS SELECT 
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
/*!50001 VIEW `dala_view_discount_program_product` AS select `dala_discount_program_product_link`.`dala_discount_program_product_link_ID` AS `dala_discount_program_product_link_ID`,`dala_discount_program_product_link`.`dala_discount_program_product_link_date_created` AS `dala_discount_program_product_link_date_created`,`dala_discount_program_product_link`.`dala_discount_program_product_link_discount_program_details_id` AS `dala_discount_program_product_link_discount_program_details_id`,`dala_discount_program_product_link`.`dala_discount_program_product_link_product_speciality_id` AS `dala_discount_program_product_link_product_speciality_id`,`dala_discount_program_product_link`.`dala_discount_program_product_link_status` AS `dala_discount_program_product_link_status`,`dala_discount_program_product_link`.`dala_discount_program_product_link_qoute` AS `dala_discount_program_product_link_qoute`,`dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_products_speciality`.`dala_products_speciality_type` AS `dala_products_speciality_type`,`dala_products_speciality`.`dala_products_speciality_date_created` AS `dala_products_speciality_date_created`,`dala_products_speciality`.`dala_products_speciality_sku` AS `dala_products_speciality_sku`,`dala_products_speciality`.`dala_products_speciality_store_id` AS `dala_products_speciality_store_id`,`dala_products_speciality`.`dala_products_speciality_parent_id` AS `dala_products_speciality_parent_id`,`dala_products_speciality`.`dala_products_speciality_featured_image` AS `dala_products_speciality_featured_image`,`dala_products_speciality`.`dala_products_speciality_image_slider` AS `dala_products_speciality_image_slider`,`dala_products_speciality`.`dala_products_speciality_origin` AS `dala_products_speciality_origin`,`dala_products_speciality`.`dala_products_speciality_contents` AS `dala_products_speciality_contents`,`dala_products_speciality`.`dala_products_speciality_price` AS `dala_products_speciality_price`,`dala_products_speciality`.`dala_products_speciality_sale_of_price` AS `dala_products_speciality_sale_of_price`,`dala_products_speciality`.`dala_products_speciality_date_start` AS `dala_products_speciality_date_start`,`dala_products_speciality`.`dala_products_speciality_date_end` AS `dala_products_speciality_date_end`,`dala_products_speciality`.`dala_products_speciality_stock` AS `dala_products_speciality_stock`,`dala_products_speciality`.`dala_products_speciality_brand` AS `dala_products_speciality_brand`,`dala_products_speciality`.`dala_products_speciality_status_admin` AS `dala_products_speciality_status_admin`,`dala_products_speciality`.`dala_products_speciality_status_store` AS `dala_products_speciality_status_store`,`dala_products_speciality`.`dala_products_speciality_status_update` AS `dala_products_speciality_status_update`,`dala_products_speciality`.`dala_products_speciality_variation_option` AS `dala_products_speciality_variation_option`,`dala_products_speciality`.`dala_products_speciality_excerpt` AS `dala_products_speciality_excerpt`,`dala_products_speciality`.`dala_products_speciality_qoute` AS `dala_products_speciality_qoute`,`dala_products_speciality`.`dala_products_speciality_height` AS `dala_products_speciality_height`,`dala_products_speciality`.`dala_products_speciality_width` AS `dala_products_speciality_width`,`dala_products_speciality`.`dala_products_speciality_length` AS `dala_products_speciality_length`,`dala_products_speciality`.`dala_products_speciality_weight` AS `dala_products_speciality_weight`,`dala_discount_program_details`.`dala_discount_program_details_ID` AS `dala_discount_program_details_ID`,`dala_discount_program_details`.`dala_discount_program_details_date_created` AS `dala_discount_program_details_date_created`,`dala_discount_program_details`.`dala_discount_program_details_discount_program_id` AS `dala_discount_program_details_discount_program_id`,`dala_discount_program_details`.`dala_discount_program_details_store_id` AS `dala_discount_program_details_store_id`,`dala_discount_program_details`.`dala_discount_program_details_status_admin` AS `dala_discount_program_details_status_admin`,`dala_discount_program_details`.`dala_discount_program_details_status_update` AS `dala_discount_program_details_status_update`,`dala_discount_program_details`.`dala_discount_program_details_price` AS `dala_discount_program_details_price`,`dala_discount_program_details`.`dala_discount_program_details_limit_day` AS `dala_discount_program_details_limit_day`,`dala_discount_program_details`.`dala_discount_program_details_limit_product` AS `dala_discount_program_details_limit_product`,`dala_discount_program_details`.`dala_discount_program_details_qoute` AS `dala_discount_program_details_qoute`,`dala_discount_program`.`dala_discount_program_ID` AS `dala_discount_program_ID`,`dala_discount_program`.`dala_discount_program_date_created` AS `dala_discount_program_date_created`,`dala_discount_program`.`dala_discount_program_name` AS `dala_discount_program_name`,`dala_discount_program`.`dala_discount_program_store_id_created` AS `dala_discount_program_store_id_created`,`dala_discount_program`.`dala_discount_program_featured_image` AS `dala_discount_program_featured_image`,`dala_discount_program`.`dala_discount_program_price_created` AS `dala_discount_program_price_created`,`dala_discount_program`.`dala_discount_program_price_sale` AS `dala_discount_program_price_sale`,`dala_discount_program`.`dala_discount_program_position` AS `dala_discount_program_position`,`dala_discount_program`.`dala_discount_program_status_admin` AS `dala_discount_program_status_admin`,`dala_discount_program`.`dala_discount_program_status_update` AS `dala_discount_program_status_update`,`dala_discount_program`.`dala_discount_program_price_one_day` AS `dala_discount_program_price_one_day`,`dala_discount_program`.`dala_discount_program_price_one_product` AS `dala_discount_program_price_one_product`,`dala_discount_program`.`dala_discount_program_limit_product` AS `dala_discount_program_limit_product`,`dala_discount_program`.`dala_discount_program_limit_day` AS `dala_discount_program_limit_day`,`dala_discount_program`.`dala_discount_program_date_star` AS `dala_discount_program_date_star`,`dala_discount_program`.`dala_discount_program_date_end` AS `dala_discount_program_date_end`,`dala_discount_program`.`dala_discount_program_information` AS `dala_discount_program_information`,`dala_discount_program`.`dala_discount_program_qoute` AS `dala_discount_program_qoute`,if((`dala_discount_program_details`.`dala_discount_program_details_limit_day` = 0),-(1),(unix_timestamp() - (unix_timestamp(`dala_discount_program_details`.`dala_discount_program_details_date_created`) + (((`dala_discount_program_details`.`dala_discount_program_details_limit_day` * 24) * 60) * 60)))) AS `dala_check_date`,(case when ((`dala_discount_program`.`dala_discount_program_date_star` is null) and (`dala_discount_program`.`dala_discount_program_date_end` is null)) then 1 when ((`dala_discount_program`.`dala_discount_program_date_star` is null) and (`dala_discount_program`.`dala_discount_program_date_end` is not null)) then if(((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_end`)) < 0),1,0) when ((`dala_discount_program`.`dala_discount_program_date_star` is not null) and (`dala_discount_program`.`dala_discount_program_date_end` is null)) then if(((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_star`)) < 0),0,1) when ((`dala_discount_program`.`dala_discount_program_date_star` is not null) and (`dala_discount_program`.`dala_discount_program_date_end` is not null)) then (case when ((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_star`)) < 0) then 0 when ((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_star`)) > 0) then if(((unix_timestamp() - unix_timestamp(`dala_discount_program`.`dala_discount_program_date_end`)) < 0),1,0) end) else 100 end) AS `dala_check_expired`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_stores`.`dala_stores_status_admin` AS `dala_stores_status_admin` from (((((`dala_discount_program_product_link` left join `dala_discount_program_details` on((`dala_discount_program_product_link`.`dala_discount_program_product_link_discount_program_details_id` = `dala_discount_program_details`.`dala_discount_program_details_ID`))) left join `dala_discount_program` on((`dala_discount_program_details`.`dala_discount_program_details_discount_program_id` = `dala_discount_program`.`dala_discount_program_ID`))) left join `dala_products_speciality` on((`dala_discount_program_product_link`.`dala_discount_program_product_link_product_speciality_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_discount_program_details`.`dala_discount_program_details_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) having (`dala_check_date` < 0) */;
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
/*!50001 VIEW `dala_view_orders_customer` AS select `dala_orders_speciality`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_orders_speciality`.`dala_orders_speciality_user_id` AS `dala_orders_speciality_user_id`,`dala_orders_speciality`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_orders` AS `dala_orders_speciality_status_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_payment` AS `dala_orders_speciality_status_payment`,`dala_orders_speciality`.`dala_orders_speciality_adress` AS `dala_orders_speciality_adress`,`dala_orders_speciality`.`dala_orders_speciality_notes` AS `dala_orders_speciality_notes`,`dala_orders_speciality`.`dala_orders_speciality_phone` AS `dala_orders_speciality_phone`,`dala_orders_speciality`.`dala_orders_speciality_email` AS `dala_orders_speciality_email`,`dala_orders_speciality`.`dala_orders_speciality_shipping_code` AS `dala_orders_speciality_shipping_code`,`dala_orders_details_speciality`.`dala_orders_details_speciality_ID` AS `dala_orders_details_speciality_ID`,`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` AS `dala_orders_details_speciality_order_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_line_order` AS `dala_orders_details_speciality_line_order`,`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` AS `dala_orders_details_speciality_product_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` AS `dala_orders_details_speciality_qty`,`dala_orders_details_speciality`.`dala_orders_details_speciality_price` AS `dala_orders_details_speciality_price`,`dala_orders_details_speciality`.`dala_orders_details_medium_text` AS `dala_orders_details_medium_text`,`dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name` from ((((`dala_orders_speciality` left join `dala_orders_details_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` = `dala_orders_speciality`.`dala_orders_speciality_ID`))) left join `dala_products_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_products_speciality`.`dala_products_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_orders_speciality`.`dala_orders_speciality_user_id` = `dala_users`.`dala_users_ID`))) */;
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
/*!50001 VIEW `dala_view_orders_users` AS select `dala_orders_speciality`.`dala_orders_speciality_ID` AS `dala_orders_speciality_ID`,`dala_orders_speciality`.`dala_orders_speciality_user_id` AS `dala_orders_speciality_user_id`,`dala_orders_speciality`.`dala_orders_speciality_date_orders` AS `dala_orders_speciality_date_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_orders` AS `dala_orders_speciality_status_orders`,`dala_orders_speciality`.`dala_orders_speciality_status_payment` AS `dala_orders_speciality_status_payment`,`dala_orders_speciality`.`dala_orders_speciality_adress` AS `dala_orders_speciality_adress`,`dala_orders_speciality`.`dala_orders_speciality_notes` AS `dala_orders_speciality_notes`,`dala_orders_speciality`.`dala_orders_speciality_phone` AS `dala_orders_speciality_phone`,`dala_orders_speciality`.`dala_orders_speciality_email` AS `dala_orders_speciality_email`,`dala_orders_speciality`.`dala_orders_speciality_shipping_code` AS `dala_orders_speciality_shipping_code`,`dala_orders_details_speciality`.`dala_orders_details_speciality_ID` AS `dala_orders_details_speciality_ID`,`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` AS `dala_orders_details_speciality_order_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_line_order` AS `dala_orders_details_speciality_line_order`,`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` AS `dala_orders_details_speciality_product_id`,`dala_orders_details_speciality`.`dala_orders_details_speciality_qty` AS `dala_orders_details_speciality_qty`,`dala_orders_details_speciality`.`dala_orders_details_speciality_price` AS `dala_orders_details_speciality_price`,`dala_orders_details_speciality`.`dala_orders_details_medium_text` AS `dala_orders_details_medium_text`,`dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name` from ((((`dala_orders_speciality` left join `dala_orders_details_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_order_id` = `dala_orders_speciality`.`dala_orders_speciality_ID`))) left join `dala_products_speciality` on((`dala_orders_details_speciality`.`dala_orders_details_speciality_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_stores` on((`dala_products_speciality`.`dala_products_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_users` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `dala_view_products`
--

/*!50001 DROP VIEW IF EXISTS `dala_view_products`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dala_view_products` AS select `dala_products_speciality`.`dala_products_speciality_ID` AS `dala_products_speciality_ID`,`dala_products_speciality`.`dala_products_speciality_name` AS `dala_products_speciality_name`,`dala_products_speciality`.`dala_products_speciality_type` AS `dala_products_speciality_type`,`dala_products_speciality`.`dala_products_speciality_date_created` AS `dala_products_speciality_date_created`,`dala_products_speciality`.`dala_products_speciality_sku` AS `dala_products_speciality_sku`,`dala_products_speciality`.`dala_products_speciality_store_id` AS `dala_products_speciality_store_id`,`dala_products_speciality`.`dala_products_speciality_parent_id` AS `dala_products_speciality_parent_id`,`dala_products_speciality`.`dala_products_speciality_featured_image` AS `dala_products_speciality_featured_image`,`dala_products_speciality`.`dala_products_speciality_image_slider` AS `dala_products_speciality_image_slider`,`dala_products_speciality`.`dala_products_speciality_origin` AS `dala_products_speciality_origin`,`dala_products_speciality`.`dala_products_speciality_contents` AS `dala_products_speciality_contents`,`dala_products_speciality`.`dala_products_speciality_price` AS `dala_products_speciality_price`,`dala_products_speciality`.`dala_products_speciality_sale_of_price` AS `dala_products_speciality_sale_of_price`,`dala_products_speciality`.`dala_products_speciality_date_start` AS `dala_products_speciality_date_start`,`dala_products_speciality`.`dala_products_speciality_date_end` AS `dala_products_speciality_date_end`,`dala_products_speciality`.`dala_products_speciality_stock` AS `dala_products_speciality_stock`,`dala_products_speciality`.`dala_products_speciality_brand` AS `dala_products_speciality_brand`,`dala_products_speciality`.`dala_products_speciality_status_admin` AS `dala_products_speciality_status_admin`,`dala_products_speciality`.`dala_products_speciality_status_store` AS `dala_products_speciality_status_store`,`dala_products_speciality`.`dala_products_speciality_status_update` AS `dala_products_speciality_status_update`,`dala_products_speciality`.`dala_products_speciality_variation_option` AS `dala_products_speciality_variation_option`,`dala_products_speciality`.`dala_products_speciality_excerpt` AS `dala_products_speciality_excerpt`,`dala_products_speciality`.`dala_products_speciality_qoute` AS `dala_products_speciality_qoute`,`dala_products_speciality`.`dala_products_speciality_height` AS `dala_products_speciality_height`,`dala_products_speciality`.`dala_products_speciality_width` AS `dala_products_speciality_width`,`dala_products_speciality`.`dala_products_speciality_length` AS `dala_products_speciality_length`,`dala_products_speciality`.`dala_products_speciality_weight` AS `dala_products_speciality_weight`,`dala_users`.`dala_users_ID` AS `dala_users_ID`,`dala_users`.`dala_users_full_name` AS `dala_users_full_name`,`dala_stores`.`dala_stores_ID` AS `dala_stores_ID`,`dala_stores`.`dala_stores_name` AS `dala_stores_name`,`dala_stores`.`dala_stores_status_admin` AS `dala_stores_status_admin`,`dala_brands`.`dala_brands_ID` AS `dala_brands_ID`,`dala_brands`.`dala_brands_name` AS `dala_brands_name`,`dala_brands`.`dala_brands_featured_image` AS `dala_brands_featured_image`,`dala_category_general_speciality`.`dala_category_general_speciality_ID` AS `dala_category_general_speciality_ID`,`dala_category_general_speciality`.`dala_category_general_speciality_name` AS `dala_category_general_speciality_name`,`dala_options_product_speciality`.`dala_options_product_speciality_ID` AS `dala_options_product_speciality_ID`,`dala_options_product_speciality`.`dala_options_product_speciality_name` AS `dala_options_product_speciality_name`,`dala_service_type`.`dala_service_type_ID` AS `dala_service_type_ID`,`dala_service_type`.`dala_service_type_name` AS `dala_service_type_name` from ((((((((`dala_users` left join `dala_stores` on((`dala_stores`.`dala_stores_user_id` = `dala_users`.`dala_users_ID`))) left join `dala_service_type` on((`dala_stores`.`dala_stores_service_type_id` = `dala_service_type`.`dala_service_type_ID`))) left join `dala_products_speciality` on((`dala_products_speciality`.`dala_products_speciality_store_id` = `dala_stores`.`dala_stores_ID`))) left join `dala_brands` on((`dala_products_speciality`.`dala_products_speciality_brand` = `dala_brands`.`dala_brands_ID`))) left join `dala_options_product_speciality_link` on((`dala_options_product_speciality_link`.`dala_options_product_speciality_link_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_options_product_speciality` on((`dala_options_product_speciality_link`.`dala_options_product_speciality_link_option_id` = `dala_options_product_speciality`.`dala_options_product_speciality_ID`))) left join `dala_category_general_speciality_link` on((`dala_category_general_speciality_link`.`dala_category_general_speciality_link_product_id` = `dala_products_speciality`.`dala_products_speciality_ID`))) left join `dala_category_general_speciality` on((`dala_category_general_speciality_link`.`dala_category_general_speciality_link_category_general_id` = `dala_category_general_speciality`.`dala_category_general_speciality_ID`))) */;
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

-- Dump completed on 2021-07-05 14:59:35

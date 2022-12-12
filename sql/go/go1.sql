	
START TRANSACTION;	
	--
	--
	--
	DROP TABLE IF EXISTS `dala_products_speciality_price_meta`;
	CREATE TABLE IF NOT EXISTS `dala_products_speciality_price_meta` (
	  `dala_products_speciality_price_meta_ID` int NOT NULL AUTO_INCREMENT,
	  `dala_products_speciality_price_meta_discount_product_link_id` int NOT NULL,
	  `dala_products_speciality_price_meta_product_id` int NOT NULL,
	  `dala_products_speciality_price_meta_from` int NOT NULL,
	  `dala_products_speciality_price_meta_to` int NOT NULL,
	  `dala_products_speciality_price_meta_price` double NOT NULL,
	  PRIMARY KEY (`dala_products_speciality_price_meta_ID`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='giá càng nhiều càng rẻ';
	COMMIT;
	
	
	ALTER TABLE `dala_discount_program` 
	CHANGE `dala_discount_program_gift_type` `dala_discount_program_gift_type` INT NOT NULL DEFAULT '0' 
	COMMENT '[0:discount thuong] [1: discount mua 1 tang 1] [2 : gia sỉ]';	
	
	
	ALTER TABLE `dala_stores` 
	ADD `dala_stores_email` VARCHAR(200) 
	CHARACTER SET utf8 COLLATE utf8_unicode_ci 
	NOT NULL AFTER `dala_stores_upload_limit_month`;


	ALTER TABLE `dala_discount_program_product_link` 
	ADD `dala_discount_program_product_link_discount_program_id` INT NOT NULL 
	AFTER `dala_discount_program_product_link_discount_program_details_id`;


	--
--
--
-- commit 
COMMIT;

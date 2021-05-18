
-- 
-- 
-- 
-- 
-- 
--
--   
-- 
START TRANSACTION;


-- 


-- 
-- 
-- check products_speciality_name insert
DROP TRIGGER  IF EXISTS  trig_products_speciality_name_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_name_insert BEFORE INSERT ON dala_products_speciality 
FOR EACH ROW  
BEGIN  
IF(NEW.dala_products_speciality_name  is null or NEW.dala_products_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_name_empty';   
END IF;	
END $$ 
DELIMITER ;







-- 
-- 
-- 
-- check products_speciality_price insert
DROP TRIGGER  IF EXISTS  trig_products_speciality_price_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_price_insert BEFORE INSERT ON dala_products_speciality 
FOR EACH ROW  
BEGIN  
IF(NEW.dala_products_speciality_price  is null or NEW.dala_products_speciality_price = '' or NEW.dala_products_speciality_price < 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_price_empty';   
END IF;	
END $$ 
DELIMITER ;
















-- 
-- 
-- check products_speciality_store_id
DROP TRIGGER  IF EXISTS  trig_products_speciality_store_id_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_store_id_insert BEFORE INSERT ON dala_products_speciality
FOR EACH ROW  
BEGIN  
IF(LENGTH(NEW.dala_products_speciality_store_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_store_id_empty';   
END IF;
END $$ 
DELIMITER ;








--
-- *data type
DROP TRIGGER  IF EXISTS  trig_products_speciality_brand_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_brand_insert BEFORE INSERT ON dala_products_speciality 
FOR EACH ROW  
BEGIN  

IF(LENGTH(NEW.dala_products_speciality_brand) > 0 ) THEN 
	
	SET @checkID = (select dala_brands_ID  from dala_brands where dala_brands_ID  = NEW.dala_products_speciality_brand);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_brand_no_refe'; 
	END IF;	
END IF;


END $$
DELIMITER ;




--
--
--
-- commit 
COMMIT ;
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
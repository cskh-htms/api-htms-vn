
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
DROP TRIGGER  IF EXISTS  trig_products_speciality_name_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_name_update BEFORE UPDATE ON dala_products_speciality 
FOR EACH ROW  
BEGIN  



-- 
-- 
-- @ nếu tên sản phẩm trống thì báo lỗi
IF(NEW.dala_products_speciality_name  is null or NEW.dala_products_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_name_empty';   
END IF;	



-- 
-- 
-- @ nếu sku trống thì báo lỗi
IF(NEW.dala_products_speciality_sku  is null or NEW.dala_products_speciality_sku = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_sku_empty';   
END IF;	



-- 
-- 
-- @ nếu ngày kết thúc nhỏ hơn ngày bắt đầu thì báo lỗi
IF(LENGTH(NEW.dala_products_speciality_date_start) > 0  and LENGTH(NEW.dala_products_speciality_date_end) > 0) THEN 
	IF( (UNIX_TIMESTAMP(NEW.dala_products_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_products_speciality_date_start)) <= 0 ) THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_date_end_less_star';   
	END IF;
END IF;	




-- 
-- 
-- @ nếu giá < 0 hoặc không nhập giá thì báo lỗi
IF(NEW.dala_products_speciality_price  is null or NEW.dala_products_speciality_price = '' or NEW.dala_products_speciality_price < 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_price_empty';   
END IF;	



END $$ 
DELIMITER ;







-- 
-- 
-- 
-- check products_speciality_price insert
DROP TRIGGER  IF EXISTS  trig_products_speciality_price_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_price_update BEFORE UPDATE ON dala_products_speciality 
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
DROP TRIGGER  IF EXISTS  trig_products_speciality_store_id_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_store_id_update BEFORE UPDATE ON dala_products_speciality
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
DROP TRIGGER  IF EXISTS  trig_products_speciality_brand_update;
--

DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_brand_update BEFORE UPDATE ON dala_products_speciality 
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
-- products_speciality_parent_id
--

DROP TRIGGER  IF EXISTS  trig_products_speciality_parent_id_update;
--

DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_parent_id_update BEFORE UPDATE ON dala_products_speciality 
FOR EACH ROW  
BEGIN  

IF(LENGTH( NEW.dala_products_speciality_parent_id ) > 0 ) THEN 

	SET @parent_old = (select dala_products_speciality_ID  from dala_products_speciality where dala_products_speciality_parent_id  = NEW.dala_products_speciality_parent_id );
	
	IF ( @parent_old = NEW.dala_products_speciality_parent_id ) THEN 
		SIGNAL SQLSTATE '01000'; 
	ELSE 
	
		SET @checkID = (select dala_products_speciality_ID  from dala_products_speciality where dala_products_speciality_ID  = NEW.dala_products_speciality_parent_id );
		IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_products_speciality_parent_id_no_refe'; 
		END IF;		
	
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
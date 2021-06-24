
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
-- check options_product_speciality_name insert
DROP TRIGGER  IF EXISTS  trig_options_product_speciality_name_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_options_product_speciality_name_insert BEFORE INSERT ON dala_options_product_speciality 
FOR EACH ROW  
BEGIN  
IF(NEW.dala_options_product_speciality_name  is null or NEW.dala_options_product_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_options_product_speciality_name_name_empty';   
ELSE 
	IF (NEW.dala_options_product_speciality_name REGEXP '^[\-_ A-Za-z0-9 áàảãạaăâáàảãắặằẳẵấầẩẫậeêéèẻẽẹếềểễệiíìỉĩịoôơóòỏõọốồổỗộớờởỡợuưúùủũụứừửữựAĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬEÊÉÈẺẼẸẾỀỂỄỆIÍÌỈĨỊOÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢUƯÚÙỦŨỤỨỪỬỮỰđĐMm\ ]+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_options_product_speciality_name_data_type';   
	END IF; 
END IF;
END $$ 
DELIMITER ;





-- 
-- 
-- check options_product_speciality_stores_id
DROP TRIGGER  IF EXISTS  trig_options_product_speciality_stores_id_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_options_product_speciality_stores_id_insert BEFORE INSERT ON dala_options_product_speciality 
FOR EACH ROW  
BEGIN  
IF(LENGTH(NEW.dala_options_product_speciality_stores_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_options_product_speciality_stores_id_empty';   
END IF;
END $$ 
DELIMITER ;



--
--
--
-- 
--       
-- 


-- 
--
-- options_product_speciality_parent_id
DROP TRIGGER  IF EXISTS  trig_options_product_speciality_parent_id;
--

DELIMITER $$ 
CREATE TRIGGER trig_options_product_speciality_parent_id BEFORE INSERT ON dala_options_product_speciality 
FOR EACH ROW  
BEGIN  

IF(NEW.dala_options_product_speciality_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_category_general_speciality_ID  
	from dala_category_general_speciality 
	where dala_options_product_speciality_ID  = NEW.dala_options_product_speciality_parent_id);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_options_product_speciality_parent_id_no_parent'; 
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
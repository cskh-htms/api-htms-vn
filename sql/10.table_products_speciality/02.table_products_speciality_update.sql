
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
-- check stores_name insert
DROP TRIGGER  IF EXISTS  trig_stores_name;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_stores_name BEFORE UPDATE ON dala_stores 
FOR EACH ROW  
BEGIN  
IF(NEW.dala_stores_name  is null or NEW.dala_stores_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_stores_name_empty';   
ELSE 
	IF (NEW.dala_stores_name REGEXP '^[A-Za-z0-9 áàảãạaăâáàảãắặằẳẵấầẩẫậeêéèẻẽẹếềểễệiíìỉĩịoôơóòỏõọốồổỗộớờởỡợuưúùủũụứừửữựAĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬEÊÉÈẺẼẸẾỀỂỄỆIÍÌỈĨỊOÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢUƯÚÙỦŨỤỨỪỬỮỰđĐ]+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_stores_name_data_type';   
	END IF; 
END IF;
END $$ 
DELIMITER ;





-- 
-- 
-- check stores_user_id
DROP TRIGGER  IF EXISTS  trig_stores_user_id;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_stores_user_id BEFORE UPDATE ON dala_stores 
FOR EACH ROW  
BEGIN  
IF(LENGTH(NEW.dala_stores_user_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_stores_user_id_empty';   
END IF;
END $$ 
DELIMITER ;



--
--
--
-- 
--       
-- stores_service_type_id
-- 
DROP TRIGGER  IF EXISTS  trig_stores_service_type_id;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_stores_service_type_id BEFORE UPDATE ON dala_stores 
FOR EACH ROW  
BEGIN  
IF(LENGTH(NEW.dala_stores_service_type_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_stores_service_type_id_empty';   
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
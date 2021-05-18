-- 
-- 
-- 
-- 
-- 
-- 
--
--   table SERVICE_TYPE
-- 
START TRANSACTION;


-- 


-- 
-- 
-- check brands_name insert
DROP TRIGGER  IF EXISTS  trig_brands_name_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_brands_name_update BEFORE UPDATE ON dala_brands 
FOR EACH ROW  
BEGIN  
IF(NEW.dala_brands_name  is null or NEW.dala_brands_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_brands_name_name_empty';   
ELSE 
	IF (NEW.dala_brands_name REGEXP '^[A-Za-z0-9 áàảãạaăâáàảãắặằẳẵấầẩẫậeêéèẻẽẹếềểễệiíìỉĩịoôơóòỏõọốồổỗộớờởỡợuưúùủũụứừửữựAĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬEÊÉÈẺẼẸẾỀỂỄỆIÍÌỈĨỊOÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢUƯÚÙỦŨỤỨỪỬỮỰđĐ]+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_brands_name_data_type';   
	END IF; 
END IF;
END $$ 
DELIMITER ;





-- 
-- 
-- check brands_stores_id
DROP TRIGGER  IF EXISTS  trig_brands_stores_id_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_brands_stores_id_update UPDATE INSERT ON dala_brands 
FOR EACH ROW  
BEGIN  
IF(LENGTH(NEW.dala_brands_stores_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_brands_stores_id_empty';   
END IF;
END $$ 
DELIMITER ;



--
--
--
-- 
--         end of table SERVICE_TYPE
-- 



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
-- 





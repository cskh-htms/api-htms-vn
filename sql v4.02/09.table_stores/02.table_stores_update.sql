
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
-- check stores_user_id
DROP TRIGGER  IF EXISTS  trig_stores_user_id_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_stores_user_id_update BEFORE UPDATE ON dala_stores 
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
DROP TRIGGER  IF EXISTS  trig_stores_service_type_id_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_stores_service_type_id_update BEFORE UPDATE ON dala_stores 
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
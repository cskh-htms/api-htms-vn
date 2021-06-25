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
-- check brands_stores_id
DROP TRIGGER  IF EXISTS  trig_brands_stores_id_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_brands_stores_id_update BEFORE UPDATE ON dala_brands 
FOR EACH ROW  
BEGIN  
IF(LENGTH(NEW.dala_brands_stores_id) <= 0 or NEW.dala_brands_stores_id is null or NEW.dala_brands_stores_id = '') THEN 
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





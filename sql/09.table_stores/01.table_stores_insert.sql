
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
DROP TRIGGER  IF EXISTS  trig_stores_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_stores_insert BEFORE INSERT ON dala_stores 
FOR EACH ROW  
BEGIN  




-- 
--
-- check store name
IF(NEW.dala_stores_name is null or NEW.dala_stores_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_stores_name_empty';   
END IF;


-- 
--
-- check store exists
SET @checkID = (select dala_stores_ID from dala_stores where dala_stores_user_id = NEW.dala_stores_user_id);
IF (@checkID > 0) THEN  
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_check_store_double'; 
END IF;	


-- 
-- 
-- check exit


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
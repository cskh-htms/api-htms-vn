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
DROP TRIGGER  IF EXISTS  trig_brands_name_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_brands_name_insert BEFORE INSERT ON dala_brands 
FOR EACH ROW  
BEGIN  


-- 
-- 
-- tên brand không để trống
IF(NEW.dala_brands_name  is null or NEW.dala_brands_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_brands_name_name_empty';   
END IF;


-- 
-- 
-- @ end trigger
END $$ 
DELIMITER ;







--
--
--
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





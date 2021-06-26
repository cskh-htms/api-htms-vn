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
-- check service_type name insert
DROP TRIGGER  IF EXISTS  trig_service_type_name_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_service_type_name_insert BEFORE INSERT ON dala_service_type  
FOR EACH ROW  
BEGIN  

IF(NEW.dala_service_type_name  is null or NEW.dala_service_type_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_service_type_name_empty';   
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






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
DROP TRIGGER  IF EXISTS  trig_stores_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_stores_update BEFORE UPDATE ON dala_stores 
FOR EACH ROW  
BEGIN  




-- 
--
-- check store name
IF(NEW.dala_stores_name is null or NEW.dala_stores_name = '') THEN 
	SIGNAL SQLSTATE '12301' 
	SET MESSAGE_TEXT = 'trig_stores_name_empty';   
END IF;




-- 
-- 
-- check phone type and empty
IF(NEW.dala_stores_phone is null or NEW.dala_stores_phone = '') THEN 
	SIGNAL SQLSTATE '12302' 
	SET MESSAGE_TEXT = 'trig_stores_phone_empty';   
ELSE 
	IF (NEW.dala_stores_phone REGEXP '^[0-9]{10,11}$' ) = 0 THEN 
		SIGNAL SQLSTATE '12303' 
		SET MESSAGE_TEXT = 'trig_stores_phone_data_type';   
	END IF;   
END IF;



-- 
-- 
-- check dia chỉ  empty
IF( 
	(NEW.dala_stores_province is null or  NEW.dala_stores_province = '' ) or 
	(NEW.dala_stores_district is null or  NEW.dala_stores_district = '' ) or 
	(NEW.dala_stores_wards  is null or  NEW.dala_stores_wards = '' ) or 
	(NEW.dala_stores_adress is null or  NEW.dala_stores_adress = '' ) 
) THEN 	
	SIGNAL SQLSTATE '12303' 
	SET MESSAGE_TEXT = 'trig_stores_insert_adress_empty';   
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
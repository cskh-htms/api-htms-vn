
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
-- check trig_shipping_speciality_name_insert
DROP TRIGGER  IF EXISTS  trig_shipping_speciality_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_shipping_speciality_insert BEFORE INSERT ON dala_shipping_speciality 
FOR EACH ROW  
BEGIN  



IF(NEW.dala_shipping_speciality_name  is null or NEW.dala_shipping_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_shipping_speciality_name_empty';   
END IF;





-- 
-- 
-- @ check parrent existed
IF(NEW.dala_shipping_speciality_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_shipping_speciality_ID   
	from dala_shipping_speciality  
	where dala_shipping_speciality_code = NEW.dala_shipping_speciality_parent_id);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_shipping_speciality_insert_no_parent'; 
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

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
-- check category_general_speciality_stores_id
DROP TRIGGER  IF EXISTS  trig_category_general_speciality_stores_id_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_category_general_speciality_stores_id_update BEFORE UPDATE ON dala_category_general_speciality 
FOR EACH ROW  
BEGIN  
IF(LENGTH(NEW.dala_category_general_speciality_stores_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_category_general_speciality_stores_id_empty';   
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
-- category_general_speciality_category_parent_id
DROP TRIGGER  IF EXISTS  trig_category_general_speciality_category_parent_id_update;
--

DELIMITER $$ 
CREATE TRIGGER trig_category_general_speciality_category_parent_id_update BEFORE UPDATE ON dala_category_general_speciality 
FOR EACH ROW  
BEGIN  

IF(NEW.dala_category_general_speciality_category_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_category_general_speciality_ID  
	from dala_category_general_speciality 
	where dala_category_general_speciality_ID = NEW.dala_category_general_speciality_category_parent_id);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_category_general_speciality_category_parent_id_no_parent'; 
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
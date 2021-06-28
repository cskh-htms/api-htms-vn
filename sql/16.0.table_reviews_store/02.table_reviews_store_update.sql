
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
-- check reviews_store_speciality_user_id
DROP TRIGGER  IF EXISTS  trig_reviews_store_speciality_user_id_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_reviews_store_speciality_user_id_update BEFORE INSERT ON dala_reviews_store_speciality  
FOR EACH ROW  
BEGIN  
IF(NEW.dala_reviews_store_speciality_user_id  is null or NEW.dala_reviews_store_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_dala_reviews_store_speciality_user_id_empty';   
END IF;
END $$ 
DELIMITER ;





-- 
-- 
-- check reviews_user_id
DROP TRIGGER  IF EXISTS  trig_reviews_store_speciality_store_id_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_reviews_store_speciality_store_id_update BEFORE INSERT ON dala_reviews_store_speciality 
FOR EACH ROW  
BEGIN  
IF(NEW.dala_reviews_store_speciality_store_id  is null or NEW.dala_reviews_store_speciality_store_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_store_speciality_store_id_empty';   
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
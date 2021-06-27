
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
-- check reviews_name insert
DROP TRIGGER  IF EXISTS  trig_reviews_speciality_user_id_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_reviews_speciality_user_id_insert BEFORE INSERT ON dala_reviews_speciality  
FOR EACH ROW  
BEGIN  
IF(NEW.dala_reviews_speciality_user_id  is null or NEW.dala_reviews_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_user_id_empty';   
END IF;
END $$ 
DELIMITER ;





-- 
-- 
-- check reviews_user_id
DROP TRIGGER  IF EXISTS  trig_reviews_speciality_product_id_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_reviews_speciality_product_id_insert BEFORE INSERT ON dala_reviews_speciality 
FOR EACH ROW  
BEGIN  
IF(NEW.dala_reviews_speciality_product_id  is null or NEW.dala_reviews_speciality_product_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_product_id_empty';   
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
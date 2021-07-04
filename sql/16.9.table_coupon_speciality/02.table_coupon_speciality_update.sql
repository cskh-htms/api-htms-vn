
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
-- check coupon_speciality_code
DROP TRIGGER  IF EXISTS  trig_coupon_speciality_code_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_coupon_speciality_code_update BEFORE UPDATE ON dala_coupon_speciality 
FOR EACH ROW  
BEGIN  
IF(NEW.dala_coupon_speciality_code  is null or NEW.dala_coupon_speciality_code = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_coupon_speciality_code_empty';   
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

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
DROP TRIGGER  IF EXISTS  trig_coupon_speciality_code_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_coupon_speciality_code_insert BEFORE INSERT ON dala_coupon_speciality 
FOR EACH ROW  
BEGIN  

IF(NEW.dala_coupon_speciality_code  is null or NEW.dala_coupon_speciality_code = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_coupon_speciality_code_empty';   
END IF;	


-- 
-- 
-- ckeck day
IF(NEW.dala_coupon_speciality_date_star is null  and  NEW.dala_coupon_speciality_date_end is null) THEN 
	SIGNAL SQLSTATE '01000';
ELSE 
	IF( (UNIX_TIMESTAMP(NEW.dala_coupon_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_coupon_speciality_date_star)) <= 0 ) THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_coupon_speciality_code_date_end_less_star';   
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
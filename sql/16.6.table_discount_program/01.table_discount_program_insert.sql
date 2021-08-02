
-- 

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
DROP TRIGGER  IF EXISTS  trig_discount_program_name_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_discount_program_name_insert BEFORE INSERT ON dala_discount_program 
FOR EACH ROW  
BEGIN  



IF(NEW.dala_discount_program_name  is null or NEW.dala_discount_program_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_discount_program_name_empty';   
END IF;


-- 
-- 
-- 
-- check date
IF(NEW.dala_discount_program_date_star is null  and  NEW.dala_discount_program_date_end is null) THEN 
	SIGNAL SQLSTATE '01000';
ELSE 
	IF( (UNIX_TIMESTAMP(NEW.dala_discount_program_date_end) - UNIX_TIMESTAMP(NEW.dala_discount_program_date_star)) <= 0 ) THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_discount_program_date_end_less_star';   
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

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



-- ----------------------
-- orders_speciality_phone field
-- ----------------------

--
-- *data type
DROP TRIGGER  IF EXISTS  trig_orders_speciality_phone_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_orders_speciality_phone_insert BEFORE INSERT ON dala_orders_speciality 
FOR EACH ROW  
BEGIN  

IF(NEW.dala_orders_speciality_phone is null or NEW.dala_orders_speciality_phone = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_orders_speciality_phone_empty';   
ELSE 
	IF (NEW.dala_orders_speciality_phone REGEXP '^[0-9]{10,11}+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_phone_data_type';   
	END IF;   
END IF;


END $$ 
DELIMITER ;







-- ---------------------
-- orders_speciality_email field
-- --------------------

--
-- *data type
DROP TRIGGER  IF EXISTS  trig_orders_speciality_email_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_orders_speciality_email_insert BEFORE INSERT ON dala_orders_speciality  
FOR EACH ROW  
BEGIN  

IF(LENGTH(NEW.dala_orders_speciality_email) > 0 ) THEN 	
	IF (NEW.dala_orders_speciality_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_dala_orders_speciality_email_data_type';   
	END IF;	
END IF;

END $$
DELIMITER ;





-- 
--       
-- orders_speciality_user_id
-- 
DROP TRIGGER  IF EXISTS  trig_orders_speciality_user_id_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_orders_speciality_user_id_insert BEFORE INSERT ON dala_orders_speciality   
FOR EACH ROW  
BEGIN  
IF(LENGTH(NEW.dala_orders_speciality_user_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_orders_speciality_user_id_empty';   
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
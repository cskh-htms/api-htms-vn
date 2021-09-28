
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
DROP TRIGGER  IF EXISTS  trig_orders_speciality_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_orders_speciality_insert BEFORE INSERT ON dala_orders_speciality 
FOR EACH ROW  
BEGIN  


-- 
-- 
-- check phone type and empty
IF(NEW.dala_orders_speciality_phone is null or NEW.dala_orders_speciality_phone = '') THEN 
	SIGNAL SQLSTATE '12301' 
	SET MESSAGE_TEXT = 'trig_orders_speciality_phone_empty';   
ELSE 
	IF (NEW.dala_orders_speciality_phone REGEXP '^[0-9]{10,11}$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_phone_data_type';   
	END IF;   
END IF;


-- 
-- 
-- check email type
IF(LENGTH(NEW.dala_orders_speciality_email) > 0 ) THEN 	
	IF (NEW.dala_orders_speciality_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN  
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_dala_orders_speciality_email_data_type';   
	END IF;	
END IF;



-- 
-- 
-- check dia chỉ  empty
IF( 
	(NEW.dala_orders_speciality_province is null or  NEW.dala_orders_speciality_province = '' ) or 
	(NEW.dala_orders_speciality_district is null or  NEW.dala_orders_speciality_district = '' ) or 
	(NEW.dala_orders_speciality_wards  is null or  NEW.dala_orders_speciality_wards = '' ) or 
	(NEW.dala_orders_speciality_adress is null or  NEW.dala_orders_speciality_adress = '' ) 
) THEN 	
	SIGNAL SQLSTATE '12303' 
	SET MESSAGE_TEXT = 'trig_dala_orders_speciality_adress_empty';   
END IF;


-- 
-- 
-- check tên người nhận hàng  empty
IF( NEW.dala_orders_speciality_name is null or  NEW.dala_orders_speciality_name = ''  ) THEN 	
	SIGNAL SQLSTATE '12304' 
	SET MESSAGE_TEXT = 'trig_dala_orders_speciality_name_empty';   
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
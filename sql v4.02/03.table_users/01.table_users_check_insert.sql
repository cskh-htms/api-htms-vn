-- 
-- 
-- 
-- 
-- 
-- 
-- star
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";





-- ----------------------
-- user phone field
-- ----------------------

--
-- *data type
DROP TRIGGER  IF EXISTS  trig_check_users_phone_data_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_check_users_phone_data_insert BEFORE INSERT ON dala_users 
FOR EACH ROW  
BEGIN  

IF(NEW.dala_users_phone is null or NEW.dala_users_phone = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_check_users_phone_data_empty';   
ELSE 
	IF (NEW.dala_users_phone REGEXP '^[0-9]{10,11}+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_users_phone_data_type';   
	END IF;   
END IF;


END $$ 
DELIMITER ;





-- ---------------------
-- user email field
-- --------------------

--
-- *data type
DROP TRIGGER  IF EXISTS  trig_check_users_email_data_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_check_users_email_data_insert BEFORE INSERT ON dala_users 
FOR EACH ROW  
BEGIN  

IF(LENGTH(NEW.dala_users_email) > 0 ) THEN 	
	IF (NEW.dala_users_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_dala_users_email_data_type';   
	ELSE   
		SET @checkID = (select dala_users_ID from dala_users where dala_users_email = NEW.dala_users_email);
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_check_users_email_data_double'; 
		END IF;	
	END IF;	
END IF;

END $$
DELIMITER ;





-- 
--        end of table USERS
-- 



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
-- 





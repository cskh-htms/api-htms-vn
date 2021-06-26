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





-- 
--         table user USERS
-- 






-- ----------------------
-- user phone field
-- ----------------------

--
-- *data type
DROP TRIGGER  IF EXISTS  trig_check_users_phone_data_update;
--

DELIMITER $$ 
CREATE TRIGGER trig_check_users_phone_data_update BEFORE UPDATE ON dala_users 
FOR EACH ROW  
BEGIN  


IF(LENGTH(NEW.dala_users_phone) > 0 ) THEN 
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
DROP TRIGGER  IF EXISTS  trig_check_users_email_data_update;
--

DELIMITER $$ 
CREATE TRIGGER trig_check_users_email_data_update BEFORE UPDATE ON dala_users 
FOR EACH ROW  
BEGIN  

IF(LENGTH(NEW.dala_users_email) > 0 ) THEN 
	
	IF(NEW.dala_users_email !=  OLD.dala_users_email ) THEN 
		SET @checkID = (select dala_users_ID from dala_users where dala_users_email = NEW.dala_users_email);
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_check_users_email_double'; 
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





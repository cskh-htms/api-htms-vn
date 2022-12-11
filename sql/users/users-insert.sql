-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_users_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_users_before_insert BEFORE INSERT ON dala_users 
FOR EACH ROW  
BEGIN  
	-- check phone number
	IF (NEW.dala_users_phone REGEXP '^[0-9]{10,11}+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_users_before_insert_phone_type';   
	END IF;   

	-- check email
	IF(LENGTH(NEW.dala_users_email) > 0 ) THEN 	
		IF (NEW.dala_users_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN 
			SIGNAL SQLSTATE '12302' 
			SET MESSAGE_TEXT = 'trig_users_before_insert_email_type';   
		END IF;	
	END IF;	
	
	
	-- check user type
	SET @checkID = (
		select dala_users_type_ID 
		from dala_users_type  
		where dala_users_type_ID = NEW.dala_users_ID 
		);
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '12303' 
		SET MESSAGE_TEXT = 'trig_users_before_insert_user_type'; 
	END IF;		
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




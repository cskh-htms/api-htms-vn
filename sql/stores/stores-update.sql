-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_stores_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_stores_before_update BEFORE UPDATE ON dala_stores 
FOR EACH ROW  
BEGIN  

	--
	-- check user link
	IF(NEW.dala_stores_user_id > 0 ) THEN 
		SET @checkID = (
				select dala_users_ID  
				from dala_users 
				where dala_users_ID  = NEW.dala_stores_user_id 
			);		
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '12311' 
			SET MESSAGE_TEXT = 'trig_stores_before_update_user_not_refer'; 
		END IF;	
	END IF;
	
	
	
	
	
	--
	-- check phone 
	IF(LENGTH(NEW.dala_stores_phone) > 0 ) THEN 	
		IF (NEW.dala_stores_phone REGEXP '^[0-9]{10,11}+$' ) = 0 THEN 
			SIGNAL SQLSTATE '12312' 
			SET MESSAGE_TEXT = 'trig_stores_before_update_phone_type';   
		END IF;   
	END IF;	
	
	
	

	--
	-- check email
	IF(LENGTH(NEW.dala_stores_email) > 0 ) THEN 	
		IF (NEW.dala_stores_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN 
			SIGNAL SQLSTATE '12313' 
			SET MESSAGE_TEXT = 'trig_stores_before_update_email_type';   
		END IF;	
	END IF;		
	
	
	
	--
	-- check service link
	IF(LENGTH(NEW.dala_stores_service_type_id ) > 0 ) THEN 
		SET @checkID2 = (
				select dala_service_type_ID 
				from dala_service_type 
				where dala_service_type_ID  = NEW.dala_stores_service_type_id 
			);		
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '12314' 
			SET MESSAGE_TEXT = 'trig_stores_before_update_service_not_refer'; 
		END IF;		
	END IF;	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_stores_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_stores_before_insert BEFORE INSERT ON dala_stores 
FOR EACH ROW  
BEGIN  

	--
	-- check  store name empty
	IF (LENGTH(NEW.dala_stores_name) > 0 ) THEN 
		SIGNAL SQLSTATE '01000';  
	ELSE 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_stores_before_insert_name_empty';   
	END IF;   






	--
	-- check user link
	SET @checkID = (
			select dala_users_ID  
			from dala_users 
			where dala_users_ID  = NEW.dala_stores_user_id 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_stores_before_insert_user_not_refer'; 
	END IF;	
	
	
	
	
	
	
	--
	-- check phone 
	IF(LENGTH(NEW.dala_stores_phone) > 0 ) THEN 	
		IF (NEW.dala_stores_phone REGEXP '^[0-9]{10,11}+$' ) = 0 THEN 
			SIGNAL SQLSTATE '12303' 
			SET MESSAGE_TEXT = 'trig_stores_before_insert_phone_type';   
		END IF;   
	END IF;	
	
	
	

	--
	-- check email
	IF(LENGTH(NEW.dala_stores_email) > 0 ) THEN 	
		IF (NEW.dala_stores_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN 
			SIGNAL SQLSTATE '12304' 
			SET MESSAGE_TEXT = 'trig_stores_before_insert_email_type';   
		END IF;	
	END IF;		
	
	
	
	
	--
	-- check service link
	SET @checkID2 = (
			select dala_service_type_ID 
			from dala_service_type 
			where dala_service_type_ID  = NEW.dala_stores_service_type_id 
		);		
	IF (@checkID2 > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12305' 
		SET MESSAGE_TEXT = 'trig_stores_before_insert_service_not_refer'; 
	END IF;	
		
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




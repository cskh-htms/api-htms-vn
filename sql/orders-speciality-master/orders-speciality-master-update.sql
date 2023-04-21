-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_speciality_master_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_orders_speciality_master_before_update BEFORE UPDATE ON dala_orders_speciality_master  
FOR EACH ROW  
BEGIN  



	--
	--
	IF(LENGTH(NEW.dala_orders_speciality_master_phone) > 0) THEN 
		IF (NEW.dala_orders_speciality_master_phone REGEXP '^[0-9]{10,11}$' ) = 0 THEN 
			SIGNAL SQLSTATE '22201' 
			SET MESSAGE_TEXT = 'trig_orders_speciality_master_phone_data_type';   
		END IF;   
	END IF;




	--
	--
	IF(LENGTH(NEW.dala_orders_speciality_master_email) > 0 ) THEN 	
		IF (NEW.dala_orders_speciality_master_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN  
			SIGNAL SQLSTATE '22202' 
			SET MESSAGE_TEXT = 'trig_orders_speciality_master_before_update_email_data_type';   
		END IF;	
	END IF;


	

	--
	-- check user link
	IF(NEW.dala_orders_speciality_master_user_id > 0) THEN 	
		SET @checkID2 = (
				select dala_users_ID 
				from dala_users 
				where dala_users_ID  = NEW.dala_orders_speciality_master_user_id   
			);		
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '22203' 
			SET MESSAGE_TEXT = 'trig_orders_speciality_master_before_update_user_not_refer'; 
		END IF;		
	END IF;	
	
	

	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




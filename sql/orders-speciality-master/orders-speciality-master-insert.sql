-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_speciality_master_before_insert_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_orders_speciality_master_before_insert_before_insert BEFORE INSERT ON dala_orders_speciality_master   
FOR EACH ROW  
BEGIN  

	

	
	--
	-- check service link
	SET @checkID2 = (
			select dala_users_ID 
			from dala_users 
			where dala_users_ID  = NEW.dala_orders_speciality_master_user_id   
		);		
	IF (@checkID2 > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '11101' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_master_before_insert_before_insert_store_not_refer'; 
	END IF;	
	
	
	
	--
	--	
	IF(NEW.dala_orders_speciality_master_phone is null or NEW.dala_orders_speciality_master_phone = '') THEN 
		SIGNAL SQLSTATE '11102' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_master_before_insert_phone_empty';   
	ELSE 
		IF (NEW.dala_orders_speciality_master_phone REGEXP '^[0-9]{10,11}$' ) = 0 THEN 
			SIGNAL SQLSTATE '11103' 
			SET MESSAGE_TEXT = 'trig_orders_speciality_master_before_insert_phone_data_type';   
		END IF;   
	END IF;




	--
	--	
	IF(LENGTH(NEW.dala_orders_speciality_master_email) > 0 ) THEN 	
		IF (NEW.dala_orders_speciality_master_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN  
			SIGNAL SQLSTATE '11104' 
			SET MESSAGE_TEXT = 'trig_dala_orders_speciality_master_email_data_type';   
		END IF;	
	END IF;





	--
	--	
	IF( 
		(NEW.dala_orders_speciality_master_province is null or  NEW.dala_orders_speciality_master_province = '' ) or 
		(NEW.dala_orders_speciality_master_district is null or  NEW.dala_orders_speciality_master_district = '' ) or 
		(NEW.dala_orders_speciality_master_wards  is null or  NEW.dala_orders_speciality_master_wards = '' ) or 
		(NEW.dala_orders_speciality_master_adress is null or  NEW.dala_orders_speciality_master_adress = '' ) 
	) THEN 	
		SIGNAL SQLSTATE '11105' 
		SET MESSAGE_TEXT = 'trig_dala_orders_speciality_master_adress_empty';   
	END IF;




	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




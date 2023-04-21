-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_speciality_before_insert_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_orders_speciality_before_insert_before_insert BEFORE INSERT ON dala_orders_speciality  
FOR EACH ROW  
BEGIN  

	
	
	--
	-- check service link
	SET @checkID2 = (
			select dala_stores_ID 
			from dala_stores 
			where dala_stores_ID  = NEW.dala_orders_speciality_store_id  
		);		
	IF (@checkID2 > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_before_insert_before_insert_store_not_refer'; 
	END IF;	
		
	

	--
	-- check order master
	SET @checkID1 = (
			select dala_orders_speciality_master_ID 
			from dala_orders_speciality_master 
			where dala_orders_speciality_master_ID = NEW.dala_orders_speciality_orders_speciality_master_id  
		);		
	IF (@checkID1 > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '11301' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_before_insert_before_insert_order_master_not_refer'; 
	END IF;	
		

	
	
	--
	-- check service link
	SET @checkID2 = (
			select dala_users_ID 
			from dala_users 
			where dala_users_ID  = NEW.dala_orders_speciality_user_id   
		);		
	IF (@checkID2 > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_before_insert_before_insert_store_not_refer'; 
	END IF;	
	
	
	
	--
	--	
	IF(NEW.dala_orders_speciality_phone is null or NEW.dala_orders_speciality_phone = '') THEN 
		SIGNAL SQLSTATE '12303' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_before_insert_phone_empty';   
	ELSE 
		IF (NEW.dala_orders_speciality_phone REGEXP '^[0-9]{10,11}$' ) = 0 THEN 
			SIGNAL SQLSTATE '12304' 
			SET MESSAGE_TEXT = 'trig_orders_speciality_before_insert_phone_data_type';   
		END IF;   
	END IF;




	--
	--	
	IF(LENGTH(NEW.dala_orders_speciality_email) > 0 ) THEN 	
		IF (NEW.dala_orders_speciality_email REGEXP '^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$' ) = 0 THEN  
			SIGNAL SQLSTATE '12305' 
			SET MESSAGE_TEXT = 'trig_dala_orders_speciality_email_data_type';   
		END IF;	
	END IF;





	--
	--	
	IF( 
		(NEW.dala_orders_speciality_province is null or  NEW.dala_orders_speciality_province = '' ) or 
		(NEW.dala_orders_speciality_district is null or  NEW.dala_orders_speciality_district = '' ) or 
		(NEW.dala_orders_speciality_wards  is null or  NEW.dala_orders_speciality_wards = '' ) or 
		(NEW.dala_orders_speciality_adress is null or  NEW.dala_orders_speciality_adress = '' ) 
	) THEN 	
		SIGNAL SQLSTATE '12306' 
		SET MESSAGE_TEXT = 'trig_dala_orders_speciality_adress_empty';   
	END IF;




	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_speciality_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_orders_speciality_before_update BEFORE UPDATE ON dala_orders_speciality  
FOR EACH ROW  
BEGIN  




	--
	-- check store link
	IF(NEW.dala_orders_speciality_store_id > 0) THEN 	
		SET @checkID2 = (
				select dala_stores_ID 
				from dala_stores 
				where dala_stores_ID  = NEW.dala_orders_speciality_store_id  
			);		
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '12313' 
			SET MESSAGE_TEXT = 'trig_orders_speciality_before_update_store_not_refer'; 
		END IF;	
	END IF;			
	
	
	
	

	--
	-- check shipping link
	IF(NEW.dala_orders_speciality_shipper_id > 0) THEN 	
		SET @checkID2 = (
				select dala_users_ID 
				from dala_users 
				where dala_users_ID  = NEW.dala_orders_speciality_shipper_id   
			);		
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '12315' 
			SET MESSAGE_TEXT = 'trig_orders_speciality_before_update_shipping_not_refer'; 
		END IF;		
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
		SET MESSAGE_TEXT = 'trig_orders_speciality_before_update_master_not_refer'; 
	END IF;	
			
	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_coupon_speciality_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_coupon_speciality_before_update BEFORE UPDATE ON dala_coupon_speciality 
FOR EACH ROW  
BEGIN  
--
--

	--
	--
	IF(length(NEW.dala_coupon_speciality_code) > 0 ) THEN 
		IF (NEW.dala_coupon_speciality_code REGEXP '^[a-zA-Z0-9-]*$' ) THEN 		
			set NEW.dala_coupon_speciality_code = UPPER(NEW.dala_coupon_speciality_code);
			SIGNAL SQLSTATE '01000';
		else 
			SIGNAL SQLSTATE '12311' 
			SET MESSAGE_TEXT = 'trig_coupon_speciality_before_update_data_type';   
		END IF;   	
	END IF;	




	--
	--
	IF(NEW.dala_coupon_speciality_date_star is null  and  NEW.dala_coupon_speciality_date_end is null) THEN 
		SIGNAL SQLSTATE '01000';
	ELSE 
		IF( (UNIX_TIMESTAMP(NEW.dala_coupon_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_coupon_speciality_date_star)) <= 0 ) THEN 
			SIGNAL SQLSTATE '12313' 
			SET MESSAGE_TEXT = 'trig_coupon_speciality_before_update_date_end_less_star';   
		END IF;
	END IF;	
	
	
	
	
	--
	-- check store link
	IF(NEW.dala_coupon_speciality_stores_id_created > 0 ) THEN 
		SET @checkID = (
				select dala_stores_ID   
				from dala_stores  
				where dala_stores_ID  = NEW.dala_coupon_speciality_stores_id_created 
			);		
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '12304' 
			SET MESSAGE_TEXT = 'trig_coupon_speciality_before_insert_user_not_refer'; 
		END IF;		
	END IF;		
	
	
	
	
	
	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_adress_meta_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_adress_meta_before_insert BEFORE INSERT ON dala_adress_meta 
FOR EACH ROW  
BEGIN  
--
-- 
	
	IF(LENGTH(NEW.dala_adress_meta_user_id ) > 0 ) THEN 
	
		SET @check_user_relation = (select dala_users_ID 
			from dala_users  
			where dala_users_ID = NEW.dala_adress_meta_user_id 
			);	
		
		if(@check_user_relation > 0) then 
			SIGNAL SQLSTATE '01000'; 
		else 
			SIGNAL SQLSTATE '12301' 
			SET MESSAGE_TEXT = 'trig_adress_meta_before_insert_user_id_no_relation'; 
		end if;
		
		
		
		-- 
		--
		IF(  NEW.dala_adress_meta_phone REGEXP '^[0-9]*$' ) THEN 	
			SIGNAL SQLSTATE '01000'; 
		else 
			SIGNAL SQLSTATE '12302' 
			SET MESSAGE_TEXT = 'trig_adress_meta_before_insert_phone_data_type'; 	
		END IF;
		
		
		
		
		
		SET @check_user_id = (select dala_adress_meta_ID    
			from dala_adress_meta  
			where dala_adress_meta_user_id  = NEW.dala_adress_meta_user_id 
			limit 1
			);	

		SET @check_all = (select dala_adress_meta_ID    
			from dala_adress_meta  
			where dala_adress_meta_user_id  = NEW.dala_adress_meta_user_id  
			and dala_adress_meta_name  = NEW.dala_adress_meta_name 
			and dala_adress_meta_phone  = NEW.dala_adress_meta_phone  
			and dala_adress_meta_province  = NEW.dala_adress_meta_province  
			and dala_adress_meta_district  = NEW.dala_adress_meta_district   
			and dala_adress_meta_wards  = NEW.dala_adress_meta_wards    
			and dala_adress_meta_street  = NEW.dala_adress_meta_street  
			);
			
			
		if(@check_user_id > 0) then 
			IF ( @check_all > 0 ) THEN 	
				SIGNAL SQLSTATE '12303' 
				SET MESSAGE_TEXT = 'trig_adress_meta_before_insert_douple'; 
			end if;
		else 
			SET NEW.dala_adress_meta_status = 1;
		end if;	
	END IF;
	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




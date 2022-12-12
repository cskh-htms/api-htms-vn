-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_discount_program_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_discount_program_before_update BEFORE UPDATE ON dala_discount_program  
FOR EACH ROW  
BEGIN  


	--
	-- check store link
	IF(NEW.dala_discount_program_store_id_created > 0) THEN 
		SET @checkID2 = (
				select dala_stores_ID 
				from dala_stores 
				where dala_stores_ID  = NEW.dala_discount_program_store_id_created 
			);		
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '12311' 
			SET MESSAGE_TEXT = 'trig_discount_program_before_update_store_not_refer'; 
		END IF;	
	END IF;		
	
	
	
	--
	-- check date
	IF(NEW.dala_discount_program_date_star is null  and  NEW.dala_discount_program_date_end is null) THEN 
		SIGNAL SQLSTATE '01000';
	ELSE 
		IF( (UNIX_TIMESTAMP(NEW.dala_discount_program_date_end) - UNIX_TIMESTAMP(NEW.dala_discount_program_date_star)) <= 0 ) THEN 
			SIGNAL SQLSTATE '12312' 
			SET MESSAGE_TEXT = 'trig_discount_program_before_update_date_end_less_star';   
		END IF;
	END IF;		
	
	
	
	
	
	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




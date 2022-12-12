-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_discount_program_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_discount_program_before_insert BEFORE INSERT ON dala_discount_program  
FOR EACH ROW  
BEGIN  

	--
	-- check  store name empty
	IF (LENGTH(NEW.dala_discount_program_name) > 0 ) THEN 
		SIGNAL SQLSTATE '01000';  
	ELSE 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_discount_program_before_insert_name_empty';   
	END IF;   



	
	
	--
	-- check service link
	SET @checkID2 = (
			select dala_stores_ID 
			from dala_stores 
			where dala_stores_ID  = NEW.dala_discount_program_store_id_created 
		);		
	IF (@checkID2 > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_discount_program_before_insert_store_not_refer'; 
	END IF;	
		
	
	
	
	--
	-- check date
	IF(NEW.dala_discount_program_date_star is null  and  NEW.dala_discount_program_date_end is null) THEN 
		SIGNAL SQLSTATE '01000';
	ELSE 
		IF( (UNIX_TIMESTAMP(NEW.dala_discount_program_date_end) - UNIX_TIMESTAMP(NEW.dala_discount_program_date_star)) <= 0 ) THEN 
			SIGNAL SQLSTATE '12303' 
			SET MESSAGE_TEXT = 'trig_discount_program_before_insert_date_end_less_star';   
		END IF;
	END IF;		
	
	
	
	
	
	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




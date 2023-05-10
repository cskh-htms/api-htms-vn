-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_brands_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_brands_before_update BEFORE UPDATE ON dala_brands 
FOR EACH ROW  
BEGIN  


	--
	-- check store referen
	IF (NEW.dala_brands_stores_id > 0 ) THEN 
		SET @checkID = (
				select dala_stores_ID   
				from dala_stores  
				where dala_stores_ID  = NEW.dala_brands_stores_id
			);		
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '22201' 
			SET MESSAGE_TEXT = 'trig_brands_before_update_user_not_refer'; 
		END IF;	
	END IF;	
	
	
-- @
-- @	
END $$
DELIMITER ;






-- @
-- @
DROP TRIGGER  IF EXISTS  trig_brands_after_update;
DELIMITER $$ 
CREATE TRIGGER trig_brands_after_update BEFORE UPDATE ON dala_brands 
FOR EACH ROW  
BEGIN  


	--
	-- check  brand name empty
	IF (LENGTH(NEW.dala_brands_name) > 0 ) THEN 
		SIGNAL SQLSTATE '01000';  
	ELSE 
		SIGNAL SQLSTATE '23201' 
		SET MESSAGE_TEXT = 'trig_brands_after_update_name_empty';   
	END IF;   
	
	
	--
	-- check store referen
	SET @checkID = (
			select dala_stores_ID   
			from dala_stores  
			where dala_stores_ID  = NEW.dala_brands_stores_id limit 1 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '23202' 
		SET MESSAGE_TEXT = 'trig_brands_after_update_store_not_refer'; 
	END IF;	

	
	
	
-- @
-- @	
END $$
DELIMITER ;









-- @
-- @
COMMIT ;




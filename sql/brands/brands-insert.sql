-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_brands_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_brands_before_insert BEFORE INSERT ON dala_brands 
FOR EACH ROW  
BEGIN  

	--
	-- check  brand name empty
	IF (LENGTH(NEW.dala_brands_name) > 0 ) THEN 
		SIGNAL SQLSTATE '01000';  
	ELSE 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_brands_before_insert_name_empty';   
	END IF;   






	--
	-- check user link
	SET @checkID = (
			select dala_stores_ID   
			from dala_stores  
			where dala_stores_ID  = NEW.dala_brands_stores_id
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_brands_before_insert_user_not_refer'; 
	END IF;	
	
	

	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




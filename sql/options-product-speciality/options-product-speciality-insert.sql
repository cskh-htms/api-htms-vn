-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_options_product_speciality_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_options_product_speciality_before_insert BEFORE INSERT ON dala_options_product_speciality 
FOR EACH ROW  
BEGIN  

	--
	-- check  category name empty
	IF (LENGTH(NEW.dala_options_product_speciality_name) > 0 ) THEN 
		SIGNAL SQLSTATE '01000';  
	ELSE 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_options_product_speciality_before_insert_name_empty';   
	END IF;   




	-- 
	-- check store link
	SET @checkID = (
			select dala_stores_ID  
			from dala_stores 
			where dala_stores_ID  = NEW.dala_options_product_speciality_stores_id 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_options_product_speciality_before_insert_user_not_refer'; 
	END IF;		
	






	-- 
	-- check parent id
	IF(NEW.dala_options_product_speciality_parent_id > 0 ) THEN 	
		SET @checkID = (select dala_options_product_speciality_ID  
		from dala_options_product_speciality 
		where dala_options_product_speciality_ID = NEW.dala_options_product_speciality_parent_id);
		IF (@checkID > 0 ) THEN  
			SIGNAL SQLSTATE '01000' ;
		ELSE 	
			SIGNAL SQLSTATE '12303' 
			SET MESSAGE_TEXT = 'trig_options_product_speciality_before_insert_parent_id_not_refer'; 
		END IF;	
	END IF;
	

	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




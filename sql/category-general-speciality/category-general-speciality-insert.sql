-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_category_general_speciality_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_category_general_speciality_before_insert BEFORE INSERT ON dala_category_general_speciality 
FOR EACH ROW  
BEGIN  

	--
	-- check  category name empty
	IF (LENGTH(NEW.dala_category_general_speciality_name) > 0 ) THEN 
		SIGNAL SQLSTATE '01000';  
	ELSE 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_category_general_speciality_before_insert_name_empty';   
	END IF;   




	-- 
	-- check store link
	SET @checkID = (
			select dala_stores_ID  
			from dala_stores 
			where dala_stores_ID  = NEW.dala_category_general_speciality_stores_id 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_category_general_speciality_before_insert_user_not_refer'; 
	END IF;		
	






	-- 
	-- check parent id
	IF(NEW.dala_category_general_speciality_category_parent_id > 0 ) THEN 	
		SET @checkID = (select dala_category_general_speciality_ID  
		from dala_category_general_speciality 
		where dala_category_general_speciality_ID = NEW.dala_category_general_speciality_category_parent_id);
		IF (@checkID > 0 ) THEN  
			SIGNAL SQLSTATE '01000' ;
		ELSE 	
			SIGNAL SQLSTATE '12303' 
			SET MESSAGE_TEXT = 'trig_category_general_speciality_before_insert_parent_id_not_refer'; 
		END IF;	
	END IF;
	

	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




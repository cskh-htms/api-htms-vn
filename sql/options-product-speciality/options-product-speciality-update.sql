-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_options_product_speciality_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_options_product_speciality_before_update BEFORE UPDATE ON dala_options_product_speciality
FOR EACH ROW  
BEGIN  



	-- 
	-- check store link
	IF(NEW.dala_options_product_speciality_stores_id  > 0 ) THEN 		
		SET @checkID = (
				select dala_stores_ID  
				from dala_stores 
				where dala_stores_ID  = NEW.dala_options_product_speciality_stores_id 
			);		
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '12311' 
			SET MESSAGE_TEXT = 'trig_options_product_speciality_before_update_user_not_refer'; 
		END IF;		
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
			SIGNAL SQLSTATE '12312' 
			SET MESSAGE_TEXT = 'trig_options_product_speciality_before_update_parent_id_not_refer'; 
		END IF;	
	END IF;
	

	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




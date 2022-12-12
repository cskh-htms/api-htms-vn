-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_options_product_speciality_link_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_options_product_speciality_link_before_update BEFORE UPDATE ON dala_options_product_speciality_link  
FOR EACH ROW  
BEGIN  
--
--


	--
	-- check product refer
	IF( NEW.dala_options_product_speciality_link_product_id   > 0) THEN 
		SET @check_produt_id = ( select dala_products_speciality_ID   
			 from dala_products_speciality 
			 where dala_products_speciality_ID = NEW.dala_options_product_speciality_link_product_id  
			);	
		IF( @check_produt_id > 0 ) THEN 
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '12311' 
			SET MESSAGE_TEXT = 'trig_options_product_speciality_link_before_update_product_id_not_refer'; 
		END IF;	
	END IF;	
	
	
	
	--
	-- check option refer
	IF( NEW.dala_options_product_speciality_link_option_id  > 0) THEN 
		SET @check_produt_id = ( select dala_options_product_speciality_ID     
			 from dala_options_product_speciality   
			 where dala_options_product_speciality_ID = NEW.dala_options_product_speciality_link_option_id  
			);	
		IF( @check_produt_id > 0 ) THEN 
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '12312' 
			SET MESSAGE_TEXT = 'trig_options_product_speciality_link_before_update_option_id_not_refer'; 
		END IF;		
	END IF;	
	
	
	
	


	
-- 
-- 	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




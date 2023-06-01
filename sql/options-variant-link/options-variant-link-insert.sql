-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_options_variant_link_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_options_variant_link_before_insert BEFORE INSERT ON dala_options_variant_link  
FOR EACH ROW  
BEGIN  
--
--


	--
	-- check product refer
	SET @check_produt_id = ( select dala_products_speciality_ID   
		 from dala_products_speciality 
		 where dala_products_speciality_ID = NEW.dala_options_variant_link_product_id  
		);	
	IF( @check_produt_id > 0 ) THEN 
		SIGNAL SQLSTATE '01000'; 
	ELSE
		SIGNAL SQLSTATE '11101' 
		SET MESSAGE_TEXT = 'trig_options_variant_link_insert_product_id_not_refer'; 
	END IF;	

	
	

	
-- 
-- 	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




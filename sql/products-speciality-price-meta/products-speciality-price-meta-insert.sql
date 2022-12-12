-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_products_speciality_price_meta_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_price_meta_before_insert BEFORE INSERT ON dala_products_speciality_price_meta 
FOR EACH ROW  
BEGIN  


	--
	-- check discount product link link
	SET @checkID = (
			select dala_discount_program_product_link_ID  
			from dala_discount_program_product_link 
			where dala_discount_program_product_link_ID  = NEW.dala_products_speciality_price_meta_discount_product_link_id 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_products_speciality_price_meta_before_insert_discount_product_not_refer'; 
	END IF;	
	



	--
	-- check product link
	SET @checkID = (
			select dala_products_speciality_ID  
			from dala_products_speciality  
			where dala_products_speciality_ID = NEW.dala_products_speciality_price_meta_product_id  
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_products_speciality_price_meta_before_insert_product_not_refer'; 
	END IF;	

	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




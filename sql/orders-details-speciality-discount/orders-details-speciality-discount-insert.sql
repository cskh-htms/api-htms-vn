-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_details_speciality_discount_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_orders_details_speciality_discount_before_insert BEFORE INSERT ON dala_orders_details_speciality_discount 
FOR EACH ROW  
BEGIN  




	--
	-- check order refer
	SET @checkID = (
			select 	dala_orders_speciality_ID    
			from dala_orders_speciality 
			where dala_orders_speciality_ID  = NEW.dala_orders_details_speciality_discount_order_id  
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '32301' 
		SET MESSAGE_TEXT = 'trig_orders_details_speciality_discount_before_insert_order_not_refer'; 
	END IF;	








	--
	-- check order details refer
	SET @checkID = (
			select dala_orders_details_speciality_ID   
			from dala_orders_details_speciality 
			where dala_orders_details_speciality_ID = NEW.dala_orders_details_speciality_discount_order_details_id  
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '32302' 
		SET MESSAGE_TEXT = 'trig_orders_details_speciality_discount_before_insert_order_details_not_refer'; 
	END IF;	
	



	--
	-- check discount refer
	SET @checkID = (
			select dala_discount_program_ID   
			from dala_discount_program 
			where dala_discount_program_ID  = NEW.dala_orders_details_speciality_discount_discount_id 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '32303' 
		SET MESSAGE_TEXT = 'trig_orders_details_speciality_discount_before_insert_discount_not_refer'; 
	END IF;
	
	
	
	

	--
	-- check product refer
	SET @checkID = (
			select dala_products_speciality_ID  
			from dala_products_speciality  
			where dala_products_speciality_ID = NEW.dala_orders_details_speciality_discount_product_id  
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '32304' 
		SET MESSAGE_TEXT = 'trig_orders_details_speciality_discount_before_insert_product_not_refer'; 
	END IF;	


	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




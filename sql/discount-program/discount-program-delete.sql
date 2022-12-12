
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_discount_program_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_discount_program_after_delete AFTER DELETE ON dala_discount_program 
FOR EACH ROW  
BEGIN  

	--
	-- check store link
	SET @checkID = (
			select count(dala_orders_details_speciality_discount_ID)   
			from dala_orders_details_speciality_discount    
			WHERE  
				dala_orders_details_speciality_discount_order_id  = 
				OLD.dala_discount_program_ID 				
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '34501' 
		SET MESSAGE_TEXT = 'trig_discount_program_after_delete_refer'; 
		
	ELSE 	

		DELETE FROM dala_discount_program_product_link 
		where dala_discount_program_product_link_discount_program_id = OLD.dala_discount_program_ID;

	END IF;	
	
		
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



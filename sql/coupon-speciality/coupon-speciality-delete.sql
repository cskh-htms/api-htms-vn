
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_coupon_speciality_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_coupon_speciality_after_delete AFTER DELETE ON dala_coupon_speciality 
FOR EACH ROW  
BEGIN  

	--
	-- check store link
	SET @checkID = (
			select count(dala_orders_details_speciality_ID)   
			from dala_orders_details_speciality   
			WHERE  
				dala_orders_details_medium_text  = 
				OLD.dala_coupon_speciality_code				
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '34501' 
		SET MESSAGE_TEXT = 'trig_coupon_speciality_after_delete'; 
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



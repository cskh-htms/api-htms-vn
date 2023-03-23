
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_speciality_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_orders_speciality_after_delete AFTER DELETE ON dala_orders_speciality  
FOR EACH ROW  
BEGIN  

	--
	-- 
	delete from dala_orders_details_speciality 
	where dala_orders_details_speciality_order_id = OLD.dala_orders_speciality_ID;
	
	delete from dala_shipping_tracking 
	where dala_shipping_tracking_orders_id = OLD.dala_orders_speciality_ID;	
		
	delete from dala_payment_period 
	where dala_payment_period_order_id = OLD.dala_orders_speciality_ID;		
	
	delete from dala_payment_coupon  
	where dala_payment_coupon_order_id = OLD.dala_orders_speciality_ID;	
	
		
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



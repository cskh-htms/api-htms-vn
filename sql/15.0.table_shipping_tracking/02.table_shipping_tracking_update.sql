
-- 
-- 
-- 
-- 
-- 
--
--   
-- 
START TRANSACTION;


-- 
--
-- 
DROP TRIGGER  IF EXISTS  trig_shipping_tracking_update;
--

DELIMITER $$ 
CREATE TRIGGER trig_shipping_tracking_update BEFORE UPDATE ON dala_shipping_tracking 
FOR EACH ROW  
BEGIN  
	-- kiểm tra có product id chưa
	SET @check_order_id = ( select dala_orders_speciality_ID   
						 from dala_orders_speciality 
						 where dala_orders_speciality_ID = NEW.dala_shipping_tracking_orders_id 
						);	
	IF( @check_order_id > 0 ) THEN 
		SIGNAL SQLSTATE '01000'; 
	ELSE
		SIGNAL SQLSTATE '19002' 
		SET MESSAGE_TEXT = 'trig_shipping_tracking_update_order_id_not_refer'; 
	END IF;	

	

END $$
DELIMITER ;




--
--
--
-- commit 
COMMIT ;
-- 
-- 
-- 
-- 

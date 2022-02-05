
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
DROP TRIGGER  IF EXISTS  trig_orders_speciality_delete;
--

DELIMITER $$ 
CREATE TRIGGER trig_orders_speciality_delete AFTER DELETE ON dala_orders_speciality 
FOR EACH ROW  
BEGIN  
	-- xoa line bên discont details
		DELETE FROM dala_orders_details_speciality_discount 
		where dala_orders_details_speciality_discount_order_id = OLD.dala_orders_speciality_ID;
		
	-- xoa line bên orders details
		DELETE FROM dala_orders_details_speciality 
		where dala_orders_details_speciality_order_id = OLD.dala_orders_speciality_ID;
		
	-- xoa line bên dala_shipping_tracking 
		DELETE FROM dala_shipping_tracking 
		where dala_shipping_tracking_orders_id = OLD.dala_orders_speciality_ID;	

	
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
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
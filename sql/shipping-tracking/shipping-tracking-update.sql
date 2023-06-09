-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_shipping_tracking_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_shipping_tracking_before_update BEFORE UPDATE ON dala_shipping_tracking 
FOR EACH ROW  
BEGIN  
--
--
	IF(NEW.dala_shipping_tracking_orders_id  > 0) THEN 
		SET @check_order_id = ( select dala_orders_speciality_ID   
			from dala_orders_speciality 
			where dala_orders_speciality_ID = NEW.dala_shipping_tracking_orders_id 
							);	
		IF( @check_order_id > 0 ) THEN 
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '12311' 
			SET MESSAGE_TEXT = 'trig_shipping_tracking_before_update_order_id_not_refer'; 
		END IF;	
	END IF;	




	--
	-- check user
	IF(NEW.dala_shipping_tracking_users_id   > 0) THEN 
		SET @check = ( select dala_users_ID    
			from dala_users 
			where dala_users_ID = NEW.dala_shipping_tracking_users_id  
			);	
		IF( @check > 0 ) THEN 
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '12312' 
			SET MESSAGE_TEXT = 'trig_shipping_tracking_before_update_user_id_not_refer'; 
		END IF;	
	END IF;	
	
-- 
-- 	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




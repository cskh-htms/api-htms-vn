
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_speciality_master_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_orders_speciality_master_after_delete AFTER DELETE ON dala_orders_speciality_master  
FOR EACH ROW  
BEGIN  

	--
	-- 
	delete from dala_orders_speciality 
	where dala_orders_speciality_orders_speciality_master_id = OLD.dala_orders_speciality_master_ID;
	
		
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



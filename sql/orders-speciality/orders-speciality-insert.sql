-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_speciality_before_insert_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_orders_speciality_before_insert_before_insert BEFORE INSERT ON dala_orders_speciality  
FOR EACH ROW  
BEGIN  

	
	
	--
	-- kiem tra cua hang da co tren he thong chua
	SET @checkID2 = (
			select dala_stores_ID 
			from dala_stores 
			where dala_stores_ID  = NEW.dala_orders_speciality_store_id  
		);		
	IF (@checkID2 > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '11001' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_before_insert_before_insert_store_not_refer'; 
	END IF;	
		
	

	--
	-- check order master
	SET @checkID1 = (
			select dala_orders_speciality_master_ID 
			from dala_orders_speciality_master 
			where dala_orders_speciality_master_ID = NEW.dala_orders_speciality_orders_speciality_master_id  
		);		
	IF (@checkID1 > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '11101' 
		SET MESSAGE_TEXT = 'trig_orders_speciality_before_insert_before_insert_order_master_not_refer'; 
	END IF;	
		
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




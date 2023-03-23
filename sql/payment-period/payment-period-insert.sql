-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_payment_period_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_payment_period_before_insert BEFORE INSERT ON dala_payment_period 
FOR EACH ROW  
BEGIN  



	--
	-- check  order id empty
	IF (LENGTH(NEW.dala_payment_period_order_id) > 0 ) THEN 
		SIGNAL SQLSTATE '01000';  
	ELSE 
		SIGNAL SQLSTATE '11101' 
		SET MESSAGE_TEXT = 'trig_payment_period_before_insert_order_id_empty';   
	END IF;   



	

	--
	-- check order refer
	SET @checkID = (
			select dala_orders_speciality_ID  
			from dala_orders_speciality 
			where dala_orders_speciality_ID = NEW.dala_payment_period_order_id   
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '11102' 
		SET MESSAGE_TEXT = 'trig_payment_period_before_insert_order_id_not_refer'; 
	END IF;		
	


	--
	-- don hang da hoan thanh moi cho cong no
	SET @checkID = (
			select dala_orders_speciality_ID  
			from dala_orders_speciality 
			where dala_orders_speciality_ID = NEW.dala_payment_period_order_id   
			and dala_orders_speciality_status_orders = 100 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '11103' 
		SET MESSAGE_TEXT = 'trig_payment_period_before_insert_status_not_ok'; 
	END IF;	


	--
	-- neu da thanh toan rui thi khong thanh toan nua
	SET @checkID = (
			select dala_payment_period_ID 
			from dala_payment_period 
			where dala_payment_period_order_id = NEW.dala_payment_period_order_id 
			limit 1 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '11104' 
		SET MESSAGE_TEXT = 'trig_payment_period_before_insert_douple'; 
	END IF;	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




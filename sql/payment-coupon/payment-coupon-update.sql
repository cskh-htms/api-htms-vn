-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_payment_coupon_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_payment_coupon_before_update BEFORE UPDATE ON dala_payment_coupon 
FOR EACH ROW  
BEGIN  

	--
	-- khong cho update
	SIGNAL SQLSTATE '22201' 
	SET MESSAGE_TEXT = 'trig_payment_coupon_before_update_table_not_update';   

	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




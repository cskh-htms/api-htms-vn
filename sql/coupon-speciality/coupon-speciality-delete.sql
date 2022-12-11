
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

/*
		DELETE FROM dala_users_tracking 
		where dala_users_tracking_user_id = OLD.dala_users_ID;

		DELETE FROM dala_token  
		where dala_token_user_id = OLD.dala_users_ID;
*/
		
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



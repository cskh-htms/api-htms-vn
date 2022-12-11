
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_users_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_users_after_delete AFTER DELETE ON dala_users 
FOR EACH ROW  
BEGIN  

	DELETE FROM dala_stores 
	where dala_stores_user_id = OLD.dala_users_ID;

	DELETE FROM dala_users_tracking 
	where dala_users_tracking_user_id = OLD.dala_users_ID;
	
	DELETE FROM dala_token  
	where dala_token_user_id = OLD.dala_users_ID;	
	
	DELETE FROM dala_shipping_tracking 
	where dala_shipping_tracking_users_id = OLD.dala_users_ID;		
	
	DELETE FROM dala_orders_speciality	  	     
	where dala_orders_speciality_user_id = OLD.dala_users_ID;			
	
	DELETE FROM dala_reviews_speciality   	     
	where dala_reviews_speciality_user_id = OLD.dala_users_ID;		

	DELETE FROM dala_comments_speciality    	     
	where dala_comments_speciality_user_id = OLD.dala_users_ID;

	DELETE FROM dala_adress_meta    	     
	where dala_adress_meta_user_id = OLD.dala_users_ID;	
	
	
	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



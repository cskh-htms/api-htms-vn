
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_stores_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_stores_after_delete AFTER DELETE ON dala_stores  
FOR EACH ROW  
BEGIN  

		DELETE FROM dala_category_general_speciality  
		where dala_category_general_speciality_stores_id = OLD.dala_stores_ID;

		DELETE FROM dala_options_product_speciality   
		where dala_options_product_speciality_stores_id = OLD.dala_stores_ID;
		
		DELETE FROM dala_products_speciality    
		where dala_products_speciality_store_id = OLD.dala_stores_ID;	

		DELETE FROM dala_discount_program     
		where dala_discount_program_store_id_created = OLD.dala_stores_ID;	

		DELETE FROM dala_coupon_speciality	     
		where dala_coupon_speciality_stores_id_created = OLD.dala_stores_ID;

		DELETE FROM dala_brands 	     
		where dala_brands_stores_id = OLD.dala_stores_ID;
		
		DELETE FROM dala_orders_speciality	  	     
		where dala_orders_speciality_store_id = OLD.dala_stores_ID;			
		
		DELETE FROM dala_payment_period	   	     
		where dala_payment_period_stores_id = OLD.dala_stores_ID;			

-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



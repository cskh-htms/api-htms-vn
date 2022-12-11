
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_products_speciality_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_after_delete AFTER DELETE ON dala_products_speciality 
FOR EACH ROW  
BEGIN  


	DELETE FROM dala_category_general_speciality_link  
	where dala_category_general_speciality_link_product_id = OLD.dala_products_speciality_ID;

	DELETE FROM dala_options_product_speciality_link  
	where dala_options_product_speciality_link_product_id = OLD.dala_products_speciality_ID;

	DELETE FROM dala_orders_details_speciality   
	where dala_orders_details_speciality_product_id = OLD.dala_products_speciality_ID;

	DELETE FROM dala_discount_program_product_link 
	where dala_discount_program_product_link_product_speciality_id = OLD.dala_products_speciality_ID;

	
	DELETE FROM dala_comments_speciality 
	where dala_comments_speciality_product_id = OLD.dala_products_speciality_ID;

	DELETE FROM dala_reviews_speciality 
	where dala_reviews_speciality_product_id = OLD.dala_products_speciality_ID;	
	
	
		
		
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



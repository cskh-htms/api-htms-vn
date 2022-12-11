	-- 
	-- 
	-- 
	START TRANSACTION;
	--
	-- 
	DROP TRIGGER  IF EXISTS  trig_discount_program_product_link_after_delete;
	--

	DELIMITER $$ 
	CREATE TRIGGER trig_discount_program_product_link_after_delete AFTER DELETE ON dala_discount_program_product_link 
	FOR EACH ROW  
	BEGIN  

		DELETE FROM  dala_discount_program_gift_link 
		where 	
		dala_discount_program_gift_link_discount_program_product_link_id  =  
		OLD.dala_discount_program_product_link_ID ;
		
		DELETE FROM  dala_products_speciality_price_meta 
		where 	
		dala_products_speciality_price_meta_discount_product_link_id  =  
		OLD.dala_discount_program_product_link_ID ;	


	
	END $$
	DELIMITER ;
	--
	--
	--
	-- commit 
	COMMIT;
	-- 
	-- 
	-- 
	-- 
	-- 
	-- 
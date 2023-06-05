-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_options_variant_link_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_options_variant_link_before_insert BEFORE INSERT ON dala_options_variant_link  
FOR EACH ROW  
BEGIN  
--
--






	--
	-- check product refer
	SET @check_produt_id = ( select dala_products_speciality_ID   
		 from dala_products_speciality 
		 where dala_products_speciality_ID = NEW.dala_options_variant_link_product_id  
		);	
	IF( @check_produt_id > 0 ) THEN 
		SIGNAL SQLSTATE '01000'; 
	ELSE
		SIGNAL SQLSTATE '11101' 
		SET MESSAGE_TEXT = 'trig_options_variant_link_insert_product_id_not_refer'; 
	END IF;	



	update dala_products_speciality 
		set dala_products_speciality_sale_of_price = null  
		where 
			dala_products_speciality_ID = 
			NEW.dala_options_variant_link_product_id;		
	
	
	
	update dala_products_speciality 
		set dala_products_speciality_price = 0  
		where 
			dala_products_speciality_ID = 
			NEW.dala_options_variant_link_product_id;
		


	
-- 
-- 	
END $$
DELIMITER ;






-- @
-- @
DROP TRIGGER  IF EXISTS  trig_options_variant_link_after_insert;
DELIMITER $$ 
CREATE TRIGGER trig_options_variant_link_after_insert AFTER INSERT ON dala_options_variant_link  
FOR EACH ROW  
BEGIN  
--
--


	-- 
	-- update gia khuyen mai ban cho product
	set @sale_price = (
		SELECT MIN(dala_options_variant_link_sale_of_price) 
		FROM dala_options_variant_link 
		where 
			dala_options_variant_link_product_id = 
			NEW.dala_options_variant_link_product_id ) ;			

	set @price = (
		SELECT MAX(dala_options_variant_link_price) 
		FROM dala_options_variant_link 
		where 
			dala_options_variant_link_product_id = 
			NEW.dala_options_variant_link_product_id);

	set @stock = (
		SELECT SUM(dala_options_variant_link_stock) 
		FROM dala_options_variant_link 
		where 
			dala_options_variant_link_product_id = 
			NEW.dala_options_variant_link_product_id);
		
	-- 
	-- update price product
	update dala_products_speciality 
		set dala_products_speciality_price = @price  
		where 
			dala_products_speciality_ID = 
			NEW.dala_options_variant_link_product_id;


	-- 
	-- update price sale product	
	if(@sale_price = 0 ) then 
		set @sale_price = null;
	END IF;	
	
	update dala_products_speciality 
		set dala_products_speciality_sale_of_price = @sale_price 
		where 
			dala_products_speciality_ID = 
			NEW.dala_options_variant_link_product_id;
	
	
	-- 
	-- update ton kho	
	update dala_products_speciality 
		set dala_products_speciality_stock = @stock  
		where 
			dala_products_speciality_ID = 
			NEW.dala_options_variant_link_product_id;
	
-- 
-- 	
END $$
DELIMITER ;









-- @
-- @
COMMIT ;




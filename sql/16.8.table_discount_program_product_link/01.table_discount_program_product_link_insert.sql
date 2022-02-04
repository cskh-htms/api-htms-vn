-- 
-- 
-- 
-- 
-- 
-- 
-- star
START TRANSACTION;



-- ---------------------
-- keim tra quyen tham gia chương trình
-- --------------------

--
-- *data type
DROP TRIGGER  IF EXISTS  trig_discount_program_product_link_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_discount_program_product_link_insert BEFORE INSERT ON dala_discount_program_product_link 
FOR EACH ROW  
BEGIN  

	-- kiểm tra id detail program refer
	SET @program_detail_id = (select dala_discount_program_details_ID     
		from dala_discount_program_details 
		where dala_discount_program_details_ID = NEW.dala_discount_program_product_link_discount_program_details_id);
	IF( @program_detail_id > 0 ) THEN 
		SIGNAL SQLSTATE '01000'; 
	ELSE
		SIGNAL SQLSTATE '12001' 
		SET MESSAGE_TEXT = 'trig_discount_program_product_link_insert_dicount_details_id_not_refer'; 
	END IF;	


	-- kiểm tra id product refer
	SET @product_id = (select dala_products_speciality_ID     
		from dala_products_speciality 
		where dala_products_speciality_ID = NEW.dala_discount_program_product_link_product_speciality_id);
	IF( @product_id  > 0 ) THEN 
		SIGNAL SQLSTATE '01000'; 
	ELSE
		SIGNAL SQLSTATE '12801' 
		SET MESSAGE_TEXT = 'trig_discount_program_product_link_insert_product_id_not_refer'; 
	END IF;	



	IF(LENGTH(NEW.dala_discount_program_product_link_discount_program_details_id ) > 0 and  LENGTH(NEW.dala_discount_program_product_link_product_speciality_id) > 0 ) THEN 
		-- 
		-- kiểm tra sản phẩm này có thuộc cửa hàng tham gia chương trình này không
		-- 	
		SET @store_product_id = (select dala_products_speciality_store_id   
			from dala_products_speciality 
			where dala_products_speciality_ID  = NEW.dala_discount_program_product_link_product_speciality_id);
			
		SET @store_program_id = (select dala_discount_program_details_store_id  
			from dala_discount_program_details  
			where dala_discount_program_details_ID  = NEW.dala_discount_program_product_link_discount_program_details_id);		
			
		IF (@store_product_id <> @store_program_id ) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_discount_program_product_link_no_owner'; 	
		END IF;	
		
		
		
		
		-- 
		-- neu sản phẩm da tham gia rui thi ko the add them
		--
		SET @checkID2 = (select dala_discount_program_product_link_ID  
			from dala_discount_program_product_link  
			where dala_discount_program_product_link_product_speciality_id = NEW.dala_discount_program_product_link_product_speciality_id);	
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_discount_program_product_link_double'; 	
		END IF;			
			
			
			
		--	kiểm tra số sản phẩm đã tham gia	
		-- @ số sản phẩm tối đa cửa chươgn trình
		SET @limit_product = (select dala_discount_program_details_limit_product    
			from dala_discount_program_details  
			where dala_discount_program_details_ID  = NEW.dala_discount_program_product_link_discount_program_details_id);

		-- @ số sản phẩm đã tham gia		
		SET @sum_product_add = (select COUNT(dala_discount_program_product_link_ID)   as count_data  
			from dala_discount_program_product_link 
			where dala_discount_program_product_link_discount_program_details_id = NEW.dala_discount_program_product_link_discount_program_details_id);	
			
		IF ( @sum_product_add >= @limit_product ) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_discount_program_product_link_limit_product';
		END IF;	
	END IF;

END $$
DELIMITER ;




-- 
-- 
--
-- * update product
DROP TRIGGER  IF EXISTS  trig_discount_program_product_link_after_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_discount_program_product_link_after_insert AFTER INSERT ON dala_discount_program_product_link 
FOR EACH ROW  
BEGIN  

	IF(NEW.dala_discount_program_product_link_status = 1) THEN 
	
		UPDATE dala_products_speciality 
		SET dala_products_speciality_sale_of_price = NEW.dala_discount_program_product_link_sale_of_price,  
			dala_products_speciality_date_start = NEW.dala_discount_program_product_link_date_star,  
			dala_products_speciality_date_end = NEW.dala_discount_program_product_link_date_end  
			
		WHERE dala_products_speciality_ID = NEW.dala_discount_program_product_link_product_speciality_id ;
		
	END IF;	

END $$
DELIMITER ;



--
--
--
-- commit 
COMMIT ;
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 





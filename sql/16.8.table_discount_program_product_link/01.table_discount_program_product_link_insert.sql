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
	-- neu cua hang da tham gia rui thi ko the add them
	--
	SET @checkID2 = (select dala_discount_program_product_link_ID  
		from dala_discount_program_product_link  
		where dala_discount_program_product_link_product_speciality_id = NEW.dala_discount_program_product_link_product_speciality_id);	
	IF (@checkID2 > 0) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_discount_program_product_link_double'; 	
	END IF;			
		
		
		
	-- 
	-- kiểm tra số sản phẩm tham gia chương trình đấy chưa
	-- nếu đầu rùi thì không tham gia nữa
	--		
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
--        end of 
-- 



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





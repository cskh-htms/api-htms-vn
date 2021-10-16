
-- -- 
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
DROP TRIGGER  IF EXISTS  trig_discount_program_product_link_delete;
--

DELIMITER $$ 
CREATE TRIGGER trig_discount_program_product_link_delete AFTER DELETE ON dala_discount_program_product_link 
FOR EACH ROW  
BEGIN  

	UPDATE dala_products_speciality 
	SET dala_products_speciality_sale_of_price = NULL,   
	dala_products_speciality_date_start =  NULL,  
	dala_products_speciality_date_end =  NULL    	
	
	WHERE dala_products_speciality_ID = OLD.dala_discount_program_product_link_product_speciality_id;
		
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





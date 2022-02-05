
-- 
-- 
-- 
-- 
-- 
--
--   
-- 
START TRANSACTION;


-- 
--
-- 
DROP TRIGGER  IF EXISTS  trig_products_speciality_delete;
--

DELIMITER $$ 
CREATE TRIGGER products_speciality_delete AFTER DELETE ON dala_products_speciality  
FOR EACH ROW  
BEGIN  
	-- xoa line bên dala_category_general_speciality_link 
		DELETE FROM dala_category_general_speciality_link 
		where dala_category_general_speciality_link_product_id = OLD.dala_products_speciality_ID;

	-- xoa line bên dala_options_product_speciality_link 
		DELETE FROM dala_options_product_speciality_link 
		where dala_options_product_speciality_link_product_id = OLD.dala_products_speciality_ID;

		
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
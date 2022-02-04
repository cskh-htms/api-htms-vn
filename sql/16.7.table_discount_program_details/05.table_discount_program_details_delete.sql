
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
DROP TRIGGER  IF EXISTS  trig_discount_program_details_delete;
--

DELIMITER $$ 
CREATE TRIGGER trig_discount_program_details_delete AFTER DELETE ON dala_discount_program_details 
FOR EACH ROW  
BEGIN  
	-- xoa line bên dala_discount_program_product_link
		DELETE FROM dala_discount_program_product_link 
		where dala_discount_program_product_link_discount_program_details_id = OLD.dala_discount_program_details_ID;
		
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

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
DROP TRIGGER  IF EXISTS  trig_discount_program_delete;
--

DELIMITER $$ 
CREATE TRIGGER trig_discount_program_delete AFTER DELETE ON dala_discount_program 
FOR EACH ROW  
BEGIN  
	-- xoa line bên dala_discount_program_product_link
		DELETE FROM  dala_discount_program_details  
		where dala_discount_program_details_discount_program_id = OLD.dala_discount_program_ID;
		
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
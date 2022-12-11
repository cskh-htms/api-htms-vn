
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_options_product_speciality_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_options_product_speciality_after_delete AFTER DELETE ON dala_options_product_speciality 
FOR EACH ROW  
BEGIN  


	DELETE FROM dala_options_product_speciality_link   
	where dala_options_product_speciality_link_option_id = OLD.dala_options_product_speciality_ID;


-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



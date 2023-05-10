
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_brands_after_update;
DELIMITER $$ 
CREATE TRIGGER trig_brands_after_update AFTER DELETE ON dala_brands 
FOR EACH ROW  
BEGIN  

	--
	-- 
	UPDATE dala_products_speciality  
	set dala_products_speciality_brand = null 
	where dala_products_speciality_brand = OLD.dala_brands_ID;
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



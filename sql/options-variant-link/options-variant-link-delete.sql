
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_options_variant_link_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_options_variant_link_after_delete AFTER DELETE ON dala_options_variant_link  
FOR EACH ROW  
BEGIN  





-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



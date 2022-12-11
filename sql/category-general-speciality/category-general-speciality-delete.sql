
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_category_general_speciality_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_category_general_speciality_after_delete AFTER DELETE ON dala_category_general_speciality 
FOR EACH ROW  
BEGIN  


	DELETE FROM dala_category_general_speciality_link  
	where dala_category_general_speciality_link_category_general_id = OLD.dala_category_general_speciality_ID;


-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



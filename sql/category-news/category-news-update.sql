-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_category_news_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_category_news_before_update BEFORE UPDATE ON dala_category_news 
FOR EACH ROW  
BEGIN  


	--
	-- check parent link
	IF(NEW.dala_category_news_parent_id > 0) THEN 
		SET @checkID = (
				select 	dala_category_news_ID 
				from dala_category_news  
				where dala_category_news_ID  = NEW.dala_category_news_parent_id 
			);		
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '12302' 
			SET MESSAGE_TEXT = 'trig_category_news_before_update_parent_not_refer'; 
		END IF;	
	END IF;	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




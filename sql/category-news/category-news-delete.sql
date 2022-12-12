
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_category_news_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_category_news_after_delete  AFTER DELETE ON dala_category_news 
FOR EACH ROW  
BEGIN  

		DELETE FROM dala_category_news_link 
		where dala_category_news_link_news_id = OLD.dala_category_news_ID;	

-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



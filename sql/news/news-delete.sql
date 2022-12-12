
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_news_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_news_after_delete  AFTER DELETE ON dala_news 
FOR EACH ROW  
BEGIN  

		DELETE FROM dala_category_news_link 
		where dala_category_news_link_news_id = OLD.dala_news_ID;	

-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;



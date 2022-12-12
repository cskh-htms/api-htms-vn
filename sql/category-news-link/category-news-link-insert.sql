-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_category_news_link_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_category_news_link_before_insert BEFORE INSERT ON dala_category_news_link 
FOR EACH ROW  
BEGIN  


	--
	-- check category new id link
	SET @checkID = (
			select 	dala_category_news_ID 
			from dala_category_news   
			where dala_category_news_ID  = NEW.dala_category_news_link_category_news_id 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_category_news_link_before_insert_category_news_not_refer'; 
	END IF;	
	
	

	--
	-- check news id link
	SET @checkID = (
			select 	dala_news_ID 
			from dala_news   
			where dala_news_ID  = NEW.dala_category_news_link_news_id 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_category_news_link_before_insert_news_not_refer'; 
	END IF;	


	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




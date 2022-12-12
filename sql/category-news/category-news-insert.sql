-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_category_news_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_category_news_before_insert BEFORE INSERT ON dala_category_news 
FOR EACH ROW  
BEGIN  

	--
	-- check  category name empty
	IF (LENGTH(NEW.dala_category_news_name) > 0 ) THEN 
		SIGNAL SQLSTATE '01000';  
	ELSE 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_category_news_before_insert_name_empty';   
	END IF;   




	--
	-- check parent link
	SET @checkID = (
			select 	dala_category_news_ID 
			from dala_category_news  
			where dala_category_news_ID  = NEW.dala_category_news_parent_id 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_category_news_before_insert_parent_not_refer'; 
	END IF;	
	
	




	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_news_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_news_before_insert BEFORE INSERT ON dala_news 
FOR EACH ROW  
BEGIN  

	--
	-- check  title name empty
	IF (LENGTH(NEW.dala_news_title) > 0 ) THEN 
		SIGNAL SQLSTATE '01000';  
	ELSE 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_news_before_insert_name_empty';   
	END IF;   


-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;




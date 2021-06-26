
-- 
-- 
-- 
-- 
-- 
--
-- 
-- 
START TRANSACTION;


-- 


-- 
-- 
-- check category_news_name insert
DROP TRIGGER  IF EXISTS  trig_category_news_name_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_category_news_name_insert BEFORE INSERT ON dala_category_news 
FOR EACH ROW  
BEGIN  
IF(NEW.dala_category_news_name  is null or NEW.dala_category_news_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_category_news_name_name_empty';   
END IF;
END $$ 
DELIMITER ;




-- 
--
-- category_news_parent_id
DROP TRIGGER  IF EXISTS  trig_category_news_parent_id_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_category_news_parent_id_insert BEFORE INSERT ON dala_category_news  
FOR EACH ROW  
BEGIN  

IF(NEW.dala_category_news_parent_id > 0 ) THEN 
	
	SET @checkID = (select category_news_ID   
	from dala_category_news  
	where dala_category_news_ID = NEW.dala_category_news_parent_id);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_category_news_parent_id_no_parent'; 
	END IF;	
END IF;


END $$
DELIMITER ;













--
--
--
-- commit 
COMMIT ;
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
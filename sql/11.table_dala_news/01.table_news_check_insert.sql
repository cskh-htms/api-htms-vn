-- 
-- 
-- 
-- 
-- 
-- 
--
--   table SERVICE_TYPE
-- 
START TRANSACTION;


-- 


-- 
-- 
-- check news_title insert
DROP TRIGGER  IF EXISTS  trig_news_title_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_news_title_insert BEFORE INSERT ON dala_news 
FOR EACH ROW  
BEGIN  
IF(NEW.dala_news_title  is null or NEW.dala_news_title = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_news_title_name_empty';   
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
-- 





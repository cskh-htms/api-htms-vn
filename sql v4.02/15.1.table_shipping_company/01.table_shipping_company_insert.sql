
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
-- check trig_news_name_insert
DROP TRIGGER  IF EXISTS  trig_shipping_company_name_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_shipping_company_name_insert BEFORE INSERT ON dala_shipping_company  
FOR EACH ROW  
BEGIN  
IF(NEW.dala_shipping_company_name  is null or NEW.dala_shipping_company_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_shipping_company_name_empty';   
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
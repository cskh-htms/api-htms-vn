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
DROP TRIGGER  IF EXISTS  trig_news_title_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_news_title_update BEFORE UPDATE ON dala_news 
FOR EACH ROW  
BEGIN  
IF(NEW.dala_news_title  is null or NEW.dala_news_title = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_news_title_name_empty';   
ELSE 
	IF (NEW.dala_news_title REGEXP '^[A-Za-z0-9 áàảãạaăâáàảãắặằẳẵấầẩẫậeêéèẻẽẹếềểễệiíìỉĩịoôơóòỏõọốồổỗộớờởỡợuưúùủũụứừửữựAĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬEÊÉÈẺẼẸẾỀỂỄỆIÍÌỈĨỊOÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢUƯÚÙỦŨỤỨỪỬỮỰđĐ]+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_news_title_data_type';   
	END IF; 
END IF;
END $$ 
DELIMITER ;





-- 
-- 
-- check news_stores_id
DROP TRIGGER  IF EXISTS  trig_news_stores_id_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_news_stores_id_update BEFORE UPDATE ON dala_news 
FOR EACH ROW  
BEGIN  
IF(LENGTH(NEW.dala_news_stores_id) <= 0) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_news_stores_id_empty';   
END IF;
END $$ 
DELIMITER ;



--
--
--
-- 
--         end of table SERVICE_TYPE
-- 



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





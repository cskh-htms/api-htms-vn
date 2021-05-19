-- 
-- 
-- 
-- 
-- 
-- 
-- star
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";


-- 
--         table USERS_TYPE
-- 


-- 
-- 
-- check users_type name
DROP TRIGGER  IF EXISTS  trig_users_type_name_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_users_type_name_insert BEFORE INSERT ON dala_users_type  
FOR EACH ROW  
BEGIN  


IF(NEW.dala_users_type_name is null or NEW.dala_users_type_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_users_type_name_empty';   
ELSE 
	IF (NEW.dala_users_type_name REGEXP '^[\-_ A-Za-z0-9 áàảãạaăâáàảãắặằẳẵấầẩẫậeêéèẻẽẹếềểễệiíìỉĩịoôơóòỏõọốồổỗộớờởỡợuưúùủũụứừửữựAĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬEÊÉÈẺẼẸẾỀỂỄỆIÍÌỈĨỊOÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢUƯÚÙỦŨỤỨỪỬỮỰđĐ]+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_users_type_name_data_type';   
	END IF;	
END IF;



END $$ 
DELIMITER  ;




-- 
-- 
-- check users_users_type_infomation empty
DROP TRIGGER  IF EXISTS  trig_users_type_infomation_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_users_type_infomation_insert BEFORE INSERT ON dala_users_type  
FOR EACH ROW  
BEGIN  
	IF(NEW.dala_users_type_infomation is null or NEW.dala_users_type_infomation = '') THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_users_type_infomation_empty';   
	END IF;
END $$ 
DELIMITER  ;






-- 
--        end of table USERS_TYPE
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





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


-- =====================================================
--         table USERS_TYPE
-- =====================================================


-- 
-- 
-- check users_type name
DROP TRIGGER  IF EXISTS  trig_users_type_name;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_users_type_name BEFORE INSERT ON dala_users_type  
FOR EACH ROW  
BEGIN  


IF(NEW.dala_users_type_name is null or NEW.dala_users_type_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_users_type_name_empty';   
ELSE 
	IF (NEW.dala_users_type_name REGEXP '^[A-Za-z0-9 áàảãạaăâáàảãắặằẳẵấầẩẫậeêéèẻẽẹếềểễệiíìỉĩịoôơóòỏõọốồổỗộớờởỡợuưúùủũụứừửữựAĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬEÊÉÈẺẼẸẾỀỂỄỆIÍÌỈĨỊOÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢUƯÚÙỦŨỤỨỪỬỮỰđĐ]+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_users_type_name_data_type';   
	END IF;	
END IF;



END $$ 
DELIMITER  ;




-- 
-- 
-- check users_users_type_infomation empty
DROP TRIGGER  IF EXISTS  trig_users_type_infomation;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_users_type_infomation BEFORE INSERT ON dala_users_type  
FOR EACH ROW  
BEGIN  
	IF(NEW.dala_users_type_infomation is null or NEW.dala_users_type_infomation = '') THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_users_type_infomation_empty';   
	END IF;
END $$ 
DELIMITER  ;






-- =====================================================
--        end of table USERS_TYPE
-- =====================================================






-- =====================================================
--         table SERVICE_TYPE
-- =====================================================



-- 
-- 
-- check service_type name
DROP TRIGGER  IF EXISTS  trig_service_type_name;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_service_type_name BEFORE INSERT ON dala_service_type  
FOR EACH ROW  
BEGIN  

IF(NEW.dala_service_type_name  is null or NEW.dala_service_type_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_service_type_name_empty';   
ELSE 
	IF (NEW.dala_service_type_name REGEXP '^[A-Za-z0-9 áàảãạaăâáàảãắặằẳẵấầẩẫậeêéèẻẽẹếềểễệiíìỉĩịoôơóòỏõọốồổỗộớờởỡợuưúùủũụứừửữựAĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬEÊÉÈẺẼẸẾỀỂỄỆIÍÌỈĨỊOÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢUƯÚÙỦŨỤỨỪỬỮỰđĐ]+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_service_type_name_data_type';   
	END IF; 
END IF;




END $$ 
DELIMITER ;





-- =====================================================
--         end of table SERVICE_TYPE
-- =====================================================










-- =====================================================
--         table user USERS
-- =====================================================



-- ----------------------
-- users_name field
-- ----------------------


-- 
-- *data type

DROP TRIGGER  IF EXISTS  trig_check_users_name;
-- 

-- DELIMITER $$ 
DELIMITER $$ 
CREATE TRIGGER trig_check_users_name BEFORE INSERT ON dala_users 
FOR EACH ROW  
BEGIN  

IF(NEW.dala_users_name is null or NEW.dala_users_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_check_users_name_empty';   
ELSE 
	IF (NEW.dala_users_name REGEXP '^[A-Za-z0-9-_]+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_users_name_data_type';   
	END IF;   
END IF;

END $$ 
DELIMITER ; 


-- ----------------------
-- users_first_name fields
-- ----------------------

-- 
-- *data type

DROP TRIGGER  IF EXISTS  trig_check_users_first_name;
-- 
-- 
DELIMITER $$ 
CREATE TRIGGER trig_users_first_name BEFORE INSERT ON dala_users 
FOR EACH ROW  
BEGIN  

IF(LENGTH(NEW.dala_users_first_name) > 0 ) THEN 
	
	IF (NEW.dala_users_first_name REGEXP '^[A-Za-z0-9 áàảãạaăâáàảãắặằẳẵấầẩẫậeêéèẻẽẹếềểễệiíìỉĩịoôơóòỏõọốồổỗộớờởỡợuưúùủũụứừửữựAĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬEÊÉÈẺẼẸẾỀỂỄỆIÍÌỈĨỊOÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢUƯÚÙỦŨỤỨỪỬỮỰđĐ]+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_users_first_name_data_type';   
	END IF;   
END IF; 	

END $$ 
DELIMITER ; 


-- 
-- 
-- 
-- ----------------------
-- users_last_name fields
-- ----------------------

-- 
-- *data type

DROP TRIGGER  IF EXISTS  trig_check_users_last_name;
-- 
-- 
DELIMITER $$ 
CREATE TRIGGER trig_users_last_name BEFORE INSERT ON dala_users 
FOR EACH ROW  
BEGIN  

IF(LENGTH(NEW.dala_users_last_name) > 0 ) THEN 
	
	IF (NEW.dala_users_last_name REGEXP '^[A-Za-z0-9 áàảãạaăâáàảãắặằẳẵấầẩẫậeêéèẻẽẹếềểễệiíìỉĩịoôơóòỏõọốồổỗộớờởỡợuưúùủũụứừửữựAĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬEÊÉÈẺẼẸẾỀỂỄỆIÍÌỈĨỊOÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢUƯÚÙỦŨỤỨỪỬỮỰđĐ]+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_users_last_name_data_type';   
	END IF;   
END IF; 	

END $$ 
DELIMITER ; 


















-- ----------------------
-- user phone field
-- ----------------------

-- 
-- *unique-------
-- alter table dala_users drop index check_users_phone_unique;
-- 
ALTER TABLE   dala_users 
ADD CONSTRAINT check_users_phone_unique  
UNIQUE (dala_users_phone);

--
-- *data type
DROP TRIGGER  IF EXISTS  trig_check_users_phone_data;
--

DELIMITER $$ 
CREATE TRIGGER trig_check_users_phone_data BEFORE INSERT ON dala_users 
FOR EACH ROW  
BEGIN  

IF(NEW.dala_users_phone is null or NEW.dala_users_phone = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_check_users_phone_data_empty';   
ELSE 
	IF (NEW.dala_users_phone REGEXP '^[0-9]{10,11}+$' ) = 0 THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_users_phone_data_type';   
	END IF;   
END IF;


END $$ 
DELIMITER ;





-- ---------------------
-- user email field
-- --------------------

--
-- *data type
DROP TRIGGER  IF EXISTS  trig_check_users_email_data;
--

DELIMITER $$ 
CREATE TRIGGER trig_check_users_email_data BEFORE INSERT ON dala_users 
FOR EACH ROW  
BEGIN  

IF(LENGTH(NEW.dala_users_email) > 0 ) THEN 
	
	SET @checkID = (select dala_users_ID from dala_users where dala_users_email = NEW.dala_users_email);
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_users_email_double'; 
	END IF;	
END IF;


END $$
DELIMITER ;




-- =====================================================
--        end of table USERS
-- =====================================================









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




